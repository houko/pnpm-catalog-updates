/**
 * Logging System
 * 
 * Provides structured logging with multiple output targets and log levels.
 * Integrates with the configuration system for runtime control.
 */

import { writeFileSync, existsSync, mkdirSync, statSync } from 'fs';
import { dirname, resolve } from 'path';
import { getConfig } from '../config/Config.js';

export type LogLevel = 'error' | 'warn' | 'info' | 'debug';

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: string;
  data?: any;
  error?: Error;
}

export interface LoggerOptions {
  context?: string | undefined;
  level?: LogLevel | undefined;
  file?: string | undefined;
  console?: boolean | undefined;
  json?: boolean | undefined;
}

export class Logger {
  private context: string;
  private options: {
    context: string;
    level: LogLevel;
    file: string | undefined;
    console: boolean;
    json: boolean;
  };
  private static instances = new Map<string, Logger>();

  private constructor(context: string, options: Partial<LoggerOptions> = {}) {
    this.context = context;
    
    const config = getConfig().getConfig();
    
    this.options = {
      context: options.context || context,
      level: options.level || config.logging.level,
      file: options.file || config.logging.file,
      console: options.console !== undefined ? options.console : !config.output.silent,
      json: options.json || false,
    } as any;
  }

  /**
   * Get or create logger instance for a specific context
   */
  static getLogger(context: string, options?: Partial<LoggerOptions>): Logger {
    const key = `${context}:${JSON.stringify(options || {})}`;
    
    if (!Logger.instances.has(key)) {
      Logger.instances.set(key, new Logger(context, options));
    }
    
    return Logger.instances.get(key)!;
  }

  /**
   * Create a child logger with additional context
   */
  child(childContext: string, options?: Partial<LoggerOptions>): Logger {
    const fullContext = `${this.context}:${childContext}`;
    return Logger.getLogger(fullContext, { ...this.options, ...options });
  }

  /**
   * Log error message
   */
  error(message: string, error?: Error, data?: any): void {
    this.log('error', message, { ...(error && { error }), ...(data && { data }) });
  }

  /**
   * Log warning message
   */
  warn(message: string, data?: any): void {
    this.log('warn', message, { data });
  }

  /**
   * Log info message
   */
  info(message: string, data?: any): void {
    this.log('info', message, { data });
  }

  /**
   * Log debug message
   */
  debug(message: string, data?: any): void {
    this.log('debug', message, { data });
  }

  /**
   * Log with specific level
   */
  log(level: LogLevel, message: string, extra: { error?: Error; data?: any } = {}): void {
    if (!this.shouldLog(level)) {
      return;
    }

    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      context: this.context,
      ...extra,
    };

    this.writeLog(entry);
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
    };

    return levels[level] <= levels[this.options.level];
  }

  /**
   * Write log entry to configured outputs
   */
  private writeLog(entry: LogEntry): void {
    // Write to console
    if (this.options.console) {
      this.writeToConsole(entry);
    }

    // Write to file
    if (this.options.file) {
      this.writeToFile(entry);
    }
  }

  /**
   * Write to console with colors
   */
  private writeToConsole(entry: LogEntry): void {
    const config = getConfig().getConfig();
    const useColors = config.output.color;
    
    let colorFn: (text: string) => string;
    let consoleMethod: 'error' | 'warn' | 'info' | 'log';

    if (useColors) {
      // Simple color functions (avoiding external dependencies)
      const colors = {
        error: (text: string) => `\u001b[31m${text}\u001b[0m`, // Red
        warn: (text: string) => `\u001b[33m${text}\u001b[0m`,  // Yellow
        info: (text: string) => `\u001b[36m${text}\u001b[0m`,  // Cyan
        debug: (text: string) => `\u001b[90m${text}\u001b[0m`, // Gray
      };
      colorFn = colors[entry.level];
      consoleMethod = entry.level === 'debug' ? 'log' : entry.level;
    } else {
      colorFn = (text: string) => text;
      consoleMethod = entry.level === 'debug' ? 'log' : entry.level;
    }

    const timestamp = new Date(entry.timestamp).toLocaleTimeString();
    const levelStr = entry.level.toUpperCase().padEnd(5);
    const contextStr = entry.context ? `[${entry.context}]` : '';
    
    let logMessage = `${timestamp} ${colorFn(levelStr)} ${contextStr} ${entry.message}`;

    // Add data if present and in debug mode
    if (entry.data && entry.level === 'debug') {
      logMessage += `\n${JSON.stringify(entry.data, null, 2)}`;
    }

    // Add error stack if present
    if (entry.error && entry.error.stack) {
      logMessage += `\n${entry.error.stack}`;
    }

    console[consoleMethod](logMessage);
  }

  /**
   * Write to file
   */
  private writeToFile(entry: LogEntry): void {
    if (!this.options.file) return;

    try {
      const filePath = resolve(this.options.file);
      
      // Ensure directory exists
      const dir = dirname(filePath);
      if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
      }

      // Check file size and rotate if necessary
      this.rotateLogFile(filePath);

      // Format log entry
      let logLine: string;
      
      if (this.options.json) {
        logLine = JSON.stringify(entry) + '\n';
      } else {
        const timestamp = entry.timestamp;
        const level = entry.level.toUpperCase().padEnd(5);
        const context = entry.context ? `[${entry.context}]` : '';
        
        logLine = `${timestamp} ${level} ${context} ${entry.message}`;
        
        if (entry.data) {
          logLine += ` | Data: ${JSON.stringify(entry.data)}`;
        }
        
        if (entry.error) {
          logLine += ` | Error: ${entry.error.message}`;
          if (entry.error.stack) {
            logLine += `\n${entry.error.stack}`;
          }
        }
        
        logLine += '\n';
      }

      // Append to file
      writeFileSync(filePath, logLine, { flag: 'a', encoding: 'utf-8' });

    } catch (error) {
      // Fallback to console if file writing fails
      console.error('Failed to write to log file:', error);
      this.writeToConsole(entry);
    }
  }

  /**
   * Rotate log file if it exceeds size limit
   */
  private rotateLogFile(filePath: string): void {
    if (!existsSync(filePath)) return;

    const config = getConfig().getConfig();
    const maxSize = this.parseSize(config.logging.maxSize);
    const maxFiles = config.logging.maxFiles;

    try {
      const stats = statSync(filePath);
      
      if (stats.size < maxSize) {
        return;
      }

      // Rotate files
      for (let i = maxFiles - 1; i > 0; i--) {
        const oldFile = `${filePath}.${i}`;
        const newFile = `${filePath}.${i + 1}`;
        
        if (existsSync(oldFile)) {
          if (i === maxFiles - 1) {
            // Delete oldest file
            require('fs').unlinkSync(oldFile);
          } else {
            // Rename file
            require('fs').renameSync(oldFile, newFile);
          }
        }
      }

      // Move current file to .1
      require('fs').renameSync(filePath, `${filePath}.1`);

    } catch (error) {
      console.warn('Failed to rotate log file:', error);
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
    };

    const match = sizeStr.match(/^(\d+(?:\.\d+)?)\s*([A-Z]+)$/i);
    if (!match) {
      return 10 * 1024 * 1024; // Default to 10MB
    }

    const [, size, unit] = match;
    const multiplier = units[unit?.toUpperCase() || ''] || 1;
    
    return Math.floor(parseFloat(size || '0') * multiplier);
  }

  /**
   * Set log level for this logger
   */
  setLevel(level: LogLevel): void {
    this.options.level = level;
  }

  /**
   * Get current log level
   */
  getLevel(): LogLevel {
    return this.options.level;
  }

  /**
   * Enable/disable console output
   */
  setConsole(enabled: boolean): void {
    this.options.console = enabled;
  }

  /**
   * Set log file path
   */
  setFile(filePath: string | undefined): void {
    this.options.file = filePath;
  }

  /**
   * Create a timer logger for performance measurement
   */
  timer(label: string): () => void {
    const start = Date.now();
    this.debug(`Timer started: ${label}`);
    
    return () => {
      const duration = Date.now() - start;
      this.debug(`Timer finished: ${label} (${duration}ms)`);
    };
  }

  /**
   * Clear all logger instances (useful for testing)
   */
  static clearInstances(): void {
    Logger.instances.clear();
  }
}

// Default logger instance
export const logger = Logger.getLogger('pcu');

// Convenience functions
export const createLogger = (context: string, options?: Partial<LoggerOptions>) => 
  Logger.getLogger(context, options);