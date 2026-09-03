/**
 * Logging System
 *
 * Uses fs.createWriteStream for non-blocking file writes.
 * Provides structured logging with multiple output targets and log levels.
 * Integrates with the configuration system for runtime control.
 */

import {
  createWriteStream,
  existsSync,
  mkdirSync,
  renameSync,
  unlinkSync,
  type WriteStream,
} from 'node:fs'
import { stat } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import chalk from 'chalk'
import { getErrorCode, getErrorMessage } from '../error-handling/errors.js'

export type LogLevel = 'error' | 'warn' | 'info' | 'debug'

// Default logging configuration
// Logger uses sensible defaults to avoid circular dependency with ConfigManager
// These defaults match the values in DEFAULT_CONFIG in config.ts
const DEFAULT_LOGGING_CONFIG = {
  logging: {
    level: 'info' as LogLevel,
    file: undefined as string | undefined,
    maxSize: '10MB',
    maxFiles: 5,
  },
  output: {
    color: true,
    silent: false,
  },
}

/**
 * Get logging config - uses defaults to avoid bundling order issues
 * The Logger system works independently of ConfigManager to prevent
 * circular dependencies during module initialization.
 */
function getLoggerConfig(): typeof DEFAULT_LOGGING_CONFIG {
  return DEFAULT_LOGGING_CONFIG
}

export interface LogEntry {
  timestamp: string
  level: LogLevel
  message: string
  context?: string
  data?: unknown
  error?: Error
}

export interface LoggerOptions {
  context?: string | undefined
  level?: LogLevel | undefined
  file?: string | undefined
  console?: boolean | undefined
  json?: boolean | undefined
}

export class Logger {
  private context: string
  private options: {
    context: string
    level: LogLevel
    file: string | undefined
    console: boolean
    json: boolean
  }
  private static instances = new Map<string, Logger>()

  // File stream for non-blocking writes
  private fileStream: WriteStream | null = null
  private currentFilePath: string | null = null
  private writeCount = 0
  private static readonly ROTATION_CHECK_INTERVAL = 100 // Check rotation every N writes

  private constructor(context: string, options: Partial<LoggerOptions> = {}) {
    this.context = context

    const config = getLoggerConfig()

    this.options = {
      context: options.context || context,
      level: options.level || config.logging.level,
      file: options.file || config.logging.file,
      console: options.console !== undefined ? options.console : !config.output.silent,
      json: options.json || false,
    }
  }

  /**
   * Get or create logger instance for a specific context
   */
  static getLogger(context: string, options?: Partial<LoggerOptions>): Logger {
    const key = `${context}:${JSON.stringify(options || {})}`

    if (!Logger.instances.has(key)) {
      Logger.instances.set(key, new Logger(context, options))
    }

    return Logger.instances.get(key)!
  }

  /**
   * Create a child logger with additional context
   */
  child(childContext: string, options?: Partial<LoggerOptions>): Logger {
    const fullContext = `${this.context}:${childContext}`
    return Logger.getLogger(fullContext, { ...this.options, ...options })
  }

  /**
   * Log error message
   */
  error(message: string, error?: Error, data?: unknown): void {
    const extra: { error?: Error; data?: unknown } = {}
    if (error) extra.error = error
    if (data !== undefined) extra.data = data
    this.log('error', message, extra)
  }

  /**
   * Log warning message
   */
  warn(message: string, data?: unknown): void {
    this.log('warn', message, { data })
  }

  /**
   * Log info message
   */
  info(message: string, data?: unknown): void {
    this.log('info', message, { data })
  }

  /**
   * Log debug message
   */
  debug(message: string, data?: unknown): void {
    this.log('debug', message, { data })
  }

  /**
   * Log debug message with error (preserves stack trace)
   */
  debugError(message: string, error?: Error, data?: unknown): void {
    const extra: { error?: Error; data?: unknown } = {}
    if (error) extra.error = error
    if (data !== undefined) extra.data = data
    this.log('debug', message, extra)
  }

  /**
   * Log with specific level
   */
  log(level: LogLevel, message: string, extra: { error?: Error; data?: unknown } = {}): void {
    if (!this.shouldLog(level)) {
      return
    }

    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      context: this.context,
      ...extra,
    }

    this.writeLog(entry)
  }

  /**
   * Check if should log at given level
   */
  private shouldLog(level: LogLevel): boolean {
    const levels: Record<LogLevel, number> = {
      error: 0,
      warn: 1,
      info: 2,
      debug: 3,
    }

    return levels[level] <= levels[this.options.level]
  }

  /**
   * Write log entry to configured outputs
   */
  private writeLog(entry: LogEntry): void {
    // Write to console
    if (this.options.console) {
      this.writeToConsole(entry)
    }

    // Write to file
    if (this.options.file) {
      this.writeToFile(entry)
    }
  }

  /**
   * Write to console with colors
   */
  private writeToConsole(entry: LogEntry): void {
    const config = getLoggerConfig()
    const useColors = config.output.color

    // QUAL-002: Use chalk for consistent color handling across the codebase.
    // chalk automatically handles terminal color support detection.
    const colorFn: (text: string) => string = useColors
      ? {
          error: chalk.red,
          warn: chalk.yellow,
          info: chalk.cyan,
          debug: chalk.gray,
        }[entry.level]
      : (text: string) => text

    const consoleMethod: 'error' | 'warn' | 'info' | 'log' =
      entry.level === 'debug' ? 'log' : entry.level

    const timestamp = new Date(entry.timestamp).toLocaleTimeString()
    const levelStr = entry.level.toUpperCase().padEnd(5)
    const contextStr = entry.context ? `[${entry.context}]` : ''

    let logMessage = `${timestamp} ${colorFn(levelStr)} ${contextStr} ${entry.message}`

    // Add data if present and in debug mode
    if (entry.data && entry.level === 'debug') {
      logMessage += `\n${JSON.stringify(entry.data, null, 2)}`
    }

    // Add error stack if present
    if (entry.error?.stack) {
      logMessage += `\n${entry.error.stack}`
    }

    console[consoleMethod](logMessage)
  }

  /**
   * Write to file
   *
   * Uses fs.createWriteStream for non-blocking writes instead of writeFileSync.
   * The stream is reused across writes, avoiding repeated file open/close overhead.
   * Rotation is checked periodically rather than on every write for better performance.
   */
  private writeToFile(entry: LogEntry): void {
    if (!this.options.file) return

    try {
      const filePath = resolve(this.options.file)

      // Initialize or recreate stream if needed
      if (!this.fileStream || this.currentFilePath !== filePath) {
        // Ensure directory exists (only on first write or path change)
        const dir = dirname(filePath)
        if (!existsSync(dir)) {
          mkdirSync(dir, { recursive: true })
        }

        // Close existing stream if any
        if (this.fileStream) {
          this.fileStream.end()
        }

        // Create new write stream (append mode)
        this.fileStream = createWriteStream(filePath, { flags: 'a', encoding: 'utf-8' })
        this.currentFilePath = filePath
        this.writeCount = 0

        this.fileStream.on('error', (err: NodeJS.ErrnoException) => {
          // Close the failed stream
          this.fileStream = null
          this.currentFilePath = null

          // Log error with context for debugging
          // Use console.error as we can't use the logger itself here
          const errorMessage = err.code
            ? `Log file stream error [${err.code}]: ${err.message}`
            : `Log file stream error: ${err.message}`
          console.error(errorMessage)

          // For permission errors, disable file logging to prevent repeated failures
          if (err.code === 'EACCES' || err.code === 'EPERM') {
            this.options.file = undefined
            console.warn('File logging disabled due to permission error')
          }
        })
      }

      // Check file size and rotate periodically (not on every write)
      // PERF-001: Use async rotation check to avoid blocking the event loop
      this.writeCount++
      if (this.writeCount >= Logger.ROTATION_CHECK_INTERVAL) {
        this.writeCount = 0
        // Fire-and-forget: rotation check runs in background, errors are handled internally
        this.checkAndRotateAsync(filePath).catch(() => {
          // Error already logged in checkAndRotateAsync
        })
      }

      // Format log entry
      let logLine: string

      if (this.options.json) {
        logLine = `${JSON.stringify(entry)}\n`
      } else {
        const timestamp = entry.timestamp
        const level = entry.level.toUpperCase().padEnd(5)
        const context = entry.context ? `[${entry.context}]` : ''

        logLine = `${timestamp} ${level} ${context} ${entry.message}`

        if (entry.data) {
          logLine += ` | Data: ${JSON.stringify(entry.data)}`
        }

        if (entry.error) {
          logLine += ` | Error: ${entry.error.message}`
          if (entry.error.stack) {
            logLine += `\n${entry.error.stack}`
          }
        }

        logLine += '\n'
      }

      // Write to stream (buffered, non-blocking)
      this.fileStream.write(logLine)
    } catch (error) {
      // ERR-003: Use type-safe error code extraction
      const code = getErrorCode(error)

      if (code === 'ENOSPC') {
        // Disk full - disable file logging to prevent repeated failures
        console.error('Disk full - file logging disabled')
        this.options.file = undefined
      } else if (code === 'EACCES' || code === 'EPERM') {
        // Permission denied - disable file logging
        console.error(`Permission denied for log file: ${this.options.file}`)
        this.options.file = undefined
      } else {
        // Other errors - log once and continue
        console.error('Failed to write to log file:', getErrorMessage(error))
      }

      // Fallback to console for this entry
      this.writeToConsole(entry)
    }
  }

  /**
   * Check file size and rotate if necessary (async version).
   * Called periodically instead of on every write.
   *
   * PERF-001: Use async stat to avoid blocking the event loop during rotation checks.
   * This method is called in fire-and-forget mode since rotation is non-critical.
   */
  private async checkAndRotateAsync(filePath: string): Promise<void> {
    if (!existsSync(filePath)) return

    const config = getLoggerConfig()
    const maxSize = this.parseSize(config.logging.maxSize)

    try {
      const stats = await stat(filePath)

      if (stats.size >= maxSize) {
        // Close current stream before rotation
        if (this.fileStream) {
          this.fileStream.end()
          this.fileStream = null
        }

        this.rotateLogFile(filePath)

        // Stream will be recreated on next write
      }
    } catch (error) {
      // ERR-003: Use type-safe error code extraction
      const code = getErrorCode(error)
      if (code !== 'ENOENT') {
        // Only log non-file-not-found errors (ENOENT is expected during rotation)
        console.warn(`Log rotation check failed [${code}]: ${getErrorMessage(error)}`)
      }
    }
  }

  /**
   * Rotate log file if it exceeds size limit
   *
   * Uses imported functions instead of dynamic require('node:fs').
   * This method is called only when rotation is needed, not on every write.
   */
  private rotateLogFile(filePath: string): void {
    if (!existsSync(filePath)) return

    const config = getLoggerConfig()
    const maxFiles = config.logging.maxFiles

    try {
      // Rotate files
      for (let i = maxFiles - 1; i > 0; i--) {
        const oldFile = `${filePath}.${i}`
        const newFile = `${filePath}.${i + 1}`

        if (existsSync(oldFile)) {
          if (i === maxFiles - 1) {
            // Delete oldest file
            unlinkSync(oldFile)
          } else {
            // Rename file
            renameSync(oldFile, newFile)
          }
        }
      }

      // Move current file to .1
      renameSync(filePath, `${filePath}.1`)
    } catch (error) {
      // ERR-003: Use type-safe error code extraction
      const code = getErrorCode(error)
      const errorContext = code ? `[${code}]` : ''
      console.warn(`Failed to rotate log file ${errorContext}: ${getErrorMessage(error)}`)

      // If rotation fails due to permissions, disable file logging
      if (code === 'EACCES' || code === 'EPERM') {
        this.options.file = undefined
        console.warn('File logging disabled due to rotation permission error')
      }
    }
  }

  /**
   * Parse size string (e.g., '10MB') to bytes
   */
  private parseSize(sizeStr: string): number {
    const units: Record<string, number> = {
      B: 1,
      KB: 1024,
      MB: 1024 * 1024,
      GB: 1024 * 1024 * 1024,
    }

    const match = sizeStr.match(/^(\d+(?:\.\d+)?)\s*([A-Z]+)$/i)
    if (!match) {
      return 10 * 1024 * 1024 // Default to 10MB
    }

    const [, size, unit] = match
    const multiplier = units[unit?.toUpperCase() || ''] || 1

    return Math.floor(parseFloat(size || '0') * multiplier)
  }

  /**
   * Set log level for this logger
   */
  setLevel(level: LogLevel): void {
    this.options.level = level
  }

  /**
   * Get current log level
   */
  getLevel(): LogLevel {
    return this.options.level
  }

  /**
   * Enable/disable console output
   */
  setConsole(enabled: boolean): void {
    this.options.console = enabled
  }

  /**
   * Set log file path
   */
  setFile(filePath: string | undefined): void {
    this.options.file = filePath
  }

  /**
   * Create a timer logger for performance measurement
   */
  timer(label: string): () => void {
    const start = Date.now()
    this.debug(`Timer started: ${label}`)

    return () => {
      const duration = Date.now() - start
      this.debug(`Timer finished: ${label} (${duration}ms)`)
    }
  }

  /**
   * Close the file stream for this logger
   */
  close(): void {
    if (this.fileStream) {
      this.fileStream.end()
      this.fileStream = null
      this.currentFilePath = null
    }
  }

  /**
   * Flush pending writes to the file stream
   *
   * Returns a promise that resolves when all pending writes are flushed.
   */
  flush(): Promise<void> {
    return new Promise((resolve) => {
      if (this.fileStream && !this.fileStream.writableEnded) {
        this.fileStream.once('drain', () => resolve())
        // If already drained, resolve immediately
        if (!this.fileStream.writableNeedDrain) {
          resolve()
        }
      } else {
        resolve()
      }
    })
  }

  /**
   * Clear all logger instances (useful for testing)
   *
   * Also closes all file streams.
   */
  static clearInstances(): void {
    for (const instance of Logger.instances.values()) {
      instance.close()
    }
    Logger.instances.clear()
  }

  /**
   * Close all logger file streams
   *
   * Call this before process exit to ensure all logs are written.
   */
  static closeAll(): void {
    for (const instance of Logger.instances.values()) {
      instance.close()
    }
  }

  /**
   * Flush all pending writes across all loggers
   *
   * Returns a promise that resolves when all pending writes are flushed.
   */
  static async flushAll(): Promise<void> {
    const flushPromises: Promise<void>[] = []
    for (const instance of Logger.instances.values()) {
      flushPromises.push(instance.flush())
    }
    await Promise.all(flushPromises)
  }

  /**
   * Set log level for all existing logger instances
   * Useful when --verbose flag is passed to CLI
   */
  static setGlobalLevel(level: LogLevel): void {
    for (const instance of Logger.instances.values()) {
      instance.setLevel(level)
    }
    // Also update the default config for new loggers
    DEFAULT_LOGGING_CONFIG.logging.level = level
  }

  /**
   * Enable or disable console output for existing and future logger instances.
   * Machine-readable commands use this to keep their protocol output clean.
   */
  static setGlobalConsole(enabled: boolean): void {
    for (const instance of Logger.instances.values()) {
      instance.setConsole(enabled)
    }
    DEFAULT_LOGGING_CONFIG.output.silent = !enabled
  }

  /**
   * Configure global logger defaults at runtime
   *
   * Provides runtime configuration without circular dependencies.
   * This allows updating the default configuration that will be used
   * for all new logger instances. Existing instances are NOT affected
   * (use setGlobalLevel() to update existing instances' log level).
   *
   * @example
   * ```typescript
   * // Configure from CLI options
   * Logger.configure({
   *   level: 'debug',
   *   silent: false,
   *   color: true,
   *   file: './logs/app.log',
   * })
   * ```
   */
  static configure(options: {
    level?: LogLevel
    silent?: boolean
    color?: boolean
    file?: string
    maxSize?: string
    maxFiles?: number
  }): void {
    if (options.level !== undefined) {
      DEFAULT_LOGGING_CONFIG.logging.level = options.level
    }
    if (options.silent !== undefined) {
      DEFAULT_LOGGING_CONFIG.output.silent = options.silent
    }
    if (options.color !== undefined) {
      DEFAULT_LOGGING_CONFIG.output.color = options.color
    }
    if (options.file !== undefined) {
      DEFAULT_LOGGING_CONFIG.logging.file = options.file
    }
    if (options.maxSize !== undefined) {
      DEFAULT_LOGGING_CONFIG.logging.maxSize = options.maxSize
    }
    if (options.maxFiles !== undefined) {
      DEFAULT_LOGGING_CONFIG.logging.maxFiles = options.maxFiles
    }
  }

  /**
   * Reset logger configuration to defaults
   * Useful for testing to ensure clean state
   */
  static resetConfig(): void {
    DEFAULT_LOGGING_CONFIG.logging.level = 'info'
    DEFAULT_LOGGING_CONFIG.logging.file = undefined
    DEFAULT_LOGGING_CONFIG.logging.maxSize = '10MB'
    DEFAULT_LOGGING_CONFIG.logging.maxFiles = 5
    DEFAULT_LOGGING_CONFIG.output.color = true
    DEFAULT_LOGGING_CONFIG.output.silent = false
  }
}

// Default logger instance
export const logger = Logger.getLogger('pcu')

// Convenience functions
export const createLogger = (context: string, options?: Partial<LoggerOptions>) =>
  Logger.getLogger(context, options)
