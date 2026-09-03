/**
 * Logger Tests
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

// Use vi.hoisted for mock values
const mocks = vi.hoisted(() => ({
  existsSync: vi.fn(),
  mkdirSync: vi.fn(),
  renameSync: vi.fn(),
  unlinkSync: vi.fn(),
  createWriteStream: vi.fn(),
  stat: vi.fn(),
  consoleError: vi.fn(),
  consoleWarn: vi.fn(),
  consoleInfo: vi.fn(),
  consoleLog: vi.fn(),
}))

// Mock file stream
const mockFileStream = {
  write: vi.fn(),
  end: vi.fn(),
  on: vi.fn(),
  once: vi.fn(),
  writableEnded: false,
  writableNeedDrain: false,
}

// Mock node:fs
vi.mock('node:fs', () => ({
  existsSync: mocks.existsSync,
  mkdirSync: mocks.mkdirSync,
  renameSync: mocks.renameSync,
  unlinkSync: mocks.unlinkSync,
  createWriteStream: mocks.createWriteStream,
}))

// Mock node:fs/promises
vi.mock('node:fs/promises', () => ({
  stat: mocks.stat,
}))

// Mock error-handling
vi.mock('../../error-handling/errors.js', () => ({
  getErrorCode: (error: unknown) => {
    if (error && typeof error === 'object' && 'code' in error) {
      return (error as { code: string }).code
    }
    return undefined
  },
  getErrorMessage: (error: unknown) => {
    if (error instanceof Error) return error.message
    return String(error)
  },
}))

// Spy on console methods
const originalConsole = {
  error: console.error,
  warn: console.warn,
  info: console.info,
  log: console.log,
}

// Import after mock setup
const { Logger, logger, createLogger } = await import('../logger.js')

describe('Logger', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    Logger.clearInstances()
    Logger.resetConfig()

    // Reset mock file stream
    mockFileStream.write.mockReset()
    mockFileStream.end.mockReset()
    mockFileStream.on.mockReset()
    mockFileStream.once.mockReset()
    mockFileStream.writableEnded = false
    mockFileStream.writableNeedDrain = false
    mocks.createWriteStream.mockReturnValue(mockFileStream)

    // Mock console methods
    console.error = mocks.consoleError
    console.warn = mocks.consoleWarn
    console.info = mocks.consoleInfo
    console.log = mocks.consoleLog
  })

  afterEach(() => {
    // Restore console methods
    console.error = originalConsole.error
    console.warn = originalConsole.warn
    console.info = originalConsole.info
    console.log = originalConsole.log
  })

  describe('getLogger', () => {
    it('should return a logger instance', () => {
      const log = Logger.getLogger('test')

      expect(log).toBeDefined()
      expect(typeof log.info).toBe('function')
      expect(typeof log.error).toBe('function')
      expect(typeof log.warn).toBe('function')
      expect(typeof log.debug).toBe('function')
    })

    it('should return same instance for same context', () => {
      const log1 = Logger.getLogger('test-context')
      const log2 = Logger.getLogger('test-context')

      expect(log1).toBe(log2)
    })

    it('should return different instances for different contexts', () => {
      const log1 = Logger.getLogger('context-a')
      const log2 = Logger.getLogger('context-b')

      expect(log1).not.toBe(log2)
    })

    it('should accept options and create unique instances for different options', () => {
      const log1 = Logger.getLogger('test', { level: 'debug' })
      const log2 = Logger.getLogger('test', { level: 'error' })

      expect(log1).not.toBe(log2)
    })
  })

  describe('log level methods', () => {
    it('should log error messages', () => {
      const log = Logger.getLogger('test')

      log.error('Test error message')

      expect(mocks.consoleError).toHaveBeenCalled()
      expect(mocks.consoleError.mock.calls[0][0]).toContain('ERROR')
      expect(mocks.consoleError.mock.calls[0][0]).toContain('Test error message')
    })

    it('should log error with Error object', () => {
      const log = Logger.getLogger('test')
      const error = new Error('Test error')

      log.error('Error occurred', error)

      expect(mocks.consoleError).toHaveBeenCalled()
      expect(mocks.consoleError.mock.calls[0][0]).toContain('Error occurred')
    })

    it('should log warning messages', () => {
      const log = Logger.getLogger('test')

      log.warn('Test warning')

      expect(mocks.consoleWarn).toHaveBeenCalled()
      expect(mocks.consoleWarn.mock.calls[0][0]).toContain('WARN')
    })

    it('should log info messages', () => {
      const log = Logger.getLogger('test')

      log.info('Test info')

      expect(mocks.consoleInfo).toHaveBeenCalled()
      expect(mocks.consoleInfo.mock.calls[0][0]).toContain('INFO')
    })

    it('should log debug messages when level is debug', () => {
      const log = Logger.getLogger('test', { level: 'debug' })

      log.debug('Test debug')

      expect(mocks.consoleLog).toHaveBeenCalled()
      expect(mocks.consoleLog.mock.calls[0][0]).toContain('DEBUG')
    })

    it('should not log debug messages when level is info', () => {
      const log = Logger.getLogger('test', { level: 'info' })

      log.debug('Test debug')

      expect(mocks.consoleLog).not.toHaveBeenCalled()
    })

    it('should log debugError with error stack', () => {
      const log = Logger.getLogger('test', { level: 'debug' })
      const error = new Error('Debug error')

      log.debugError('Debug error occurred', error)

      expect(mocks.consoleLog).toHaveBeenCalled()
    })
  })

  describe('log level filtering', () => {
    it('should filter based on error level', () => {
      const log = Logger.getLogger('test-filter', { level: 'error' })

      log.error('should show')
      log.warn('should not show')
      log.info('should not show')
      log.debug('should not show')

      expect(mocks.consoleError).toHaveBeenCalledTimes(1)
      expect(mocks.consoleWarn).not.toHaveBeenCalled()
      expect(mocks.consoleInfo).not.toHaveBeenCalled()
      expect(mocks.consoleLog).not.toHaveBeenCalled()
    })

    it('should filter based on warn level', () => {
      const log = Logger.getLogger('test-filter-warn', { level: 'warn' })

      log.error('should show')
      log.warn('should show')
      log.info('should not show')
      log.debug('should not show')

      expect(mocks.consoleError).toHaveBeenCalledTimes(1)
      expect(mocks.consoleWarn).toHaveBeenCalledTimes(1)
      expect(mocks.consoleInfo).not.toHaveBeenCalled()
      expect(mocks.consoleLog).not.toHaveBeenCalled()
    })

    it('should show all messages at debug level', () => {
      const log = Logger.getLogger('test-filter-debug', { level: 'debug' })

      log.error('error')
      log.warn('warn')
      log.info('info')
      log.debug('debug')

      expect(mocks.consoleError).toHaveBeenCalledTimes(1)
      expect(mocks.consoleWarn).toHaveBeenCalledTimes(1)
      expect(mocks.consoleInfo).toHaveBeenCalledTimes(1)
      expect(mocks.consoleLog).toHaveBeenCalledTimes(1)
    })
  })

  describe('child logger', () => {
    it('should create child logger with combined context', () => {
      const parent = Logger.getLogger('parent')
      const child = parent.child('child')

      child.info('Child message')

      expect(mocks.consoleInfo.mock.calls[0][0]).toContain('[parent:child]')
    })

    it('should inherit parent options', () => {
      const parent = Logger.getLogger('parent-inherit', { level: 'debug' })
      const child = parent.child('child-inherit')

      child.debug('Debug message')

      expect(mocks.consoleLog).toHaveBeenCalled()
    })

    it('should allow overriding options', () => {
      const parent = Logger.getLogger('parent-override', { level: 'debug' })
      const child = parent.child('child-override', { level: 'error' })

      child.debug('Should not show')
      child.error('Should show')

      expect(mocks.consoleLog).not.toHaveBeenCalled()
      expect(mocks.consoleError).toHaveBeenCalled()
    })
  })

  describe('setLevel and getLevel', () => {
    it('should change log level', () => {
      const log = Logger.getLogger('test-set-level')

      log.setLevel('error')
      expect(log.getLevel()).toBe('error')

      log.info('Should not show')
      expect(mocks.consoleInfo).not.toHaveBeenCalled()

      log.setLevel('info')
      log.info('Should show')
      expect(mocks.consoleInfo).toHaveBeenCalled()
    })
  })

  describe('setConsole', () => {
    it('should disable console output', () => {
      const log = Logger.getLogger('test-console')

      log.setConsole(false)
      log.info('Should not show')

      expect(mocks.consoleInfo).not.toHaveBeenCalled()
    })

    it('should re-enable console output', () => {
      const log = Logger.getLogger('test-console-re')

      log.setConsole(false)
      log.info('Should not show')

      log.setConsole(true)
      log.info('Should show')

      expect(mocks.consoleInfo).toHaveBeenCalledTimes(1)
    })
  })

  describe('file logging', () => {
    it('should write to file when file option is set', () => {
      mocks.existsSync.mockReturnValue(true)

      const log = Logger.getLogger('test-file', { file: '/tmp/test.log' })

      log.info('File log message')

      expect(mocks.createWriteStream).toHaveBeenCalled()
      expect(mockFileStream.write).toHaveBeenCalled()
    })

    it('should create directory if it does not exist', () => {
      mocks.existsSync.mockReturnValue(false)

      const log = Logger.getLogger('test-file-dir', { file: '/tmp/logs/test.log' })

      log.info('File log message')

      expect(mocks.mkdirSync).toHaveBeenCalledWith(expect.any(String), { recursive: true })
    })

    it('should handle file stream errors', () => {
      mocks.existsSync.mockReturnValue(true)
      let errorHandler: ((err: NodeJS.ErrnoException) => void) | undefined
      mockFileStream.on.mockImplementation(
        (event: string, handler: (err: NodeJS.ErrnoException) => void) => {
          if (event === 'error') {
            errorHandler = handler
          }
          return mockFileStream
        }
      )

      const log = Logger.getLogger('test-file-error', { file: '/tmp/test.log' })
      log.info('Trigger stream creation')

      // Simulate error
      const error = new Error('Permission denied') as NodeJS.ErrnoException
      error.code = 'EACCES'
      errorHandler?.(error)

      expect(mocks.consoleError).toHaveBeenCalled()
    })
  })

  describe('timer', () => {
    it('should create a timer that logs start and end', () => {
      const log = Logger.getLogger('test-timer', { level: 'debug' })

      const endTimer = log.timer('test-operation')

      expect(mocks.consoleLog).toHaveBeenCalledWith(expect.stringContaining('Timer started'))

      endTimer()

      expect(mocks.consoleLog).toHaveBeenCalledWith(expect.stringContaining('Timer finished'))
    })
  })

  describe('static methods', () => {
    describe('clearInstances', () => {
      it('should clear all logger instances', () => {
        Logger.getLogger('instance1')
        Logger.getLogger('instance2')

        Logger.clearInstances()

        // After clear, getting the same context should create new instance
        const newLog = Logger.getLogger('instance1')
        expect(newLog).toBeDefined()
      })
    })

    describe('setGlobalLevel', () => {
      it('should set level for all existing loggers', () => {
        const log1 = Logger.getLogger('global-level-1')
        const log2 = Logger.getLogger('global-level-2')

        Logger.setGlobalLevel('error')

        expect(log1.getLevel()).toBe('error')
        expect(log2.getLevel()).toBe('error')
      })

      it('should affect new loggers', () => {
        Logger.setGlobalLevel('debug')

        const log = Logger.getLogger('new-global-level')

        expect(log.getLevel()).toBe('debug')
      })
    })

    describe('setGlobalConsole', () => {
      it('silences existing and future logger instances', () => {
        const existing = Logger.getLogger('existing-console')

        Logger.setGlobalConsole(false)
        existing.error('existing should be silent')
        Logger.getLogger('future-console').error('future should be silent')

        expect(mocks.consoleError).not.toHaveBeenCalled()
      })
    })

    describe('configure', () => {
      it('should configure default log level', () => {
        Logger.configure({ level: 'debug' })

        const log = Logger.getLogger('config-test')

        expect(log.getLevel()).toBe('debug')
      })

      it('should configure silent mode', () => {
        Logger.configure({ silent: true })

        const log = Logger.getLogger('silent-test')

        log.info('Should not show')

        expect(mocks.consoleInfo).not.toHaveBeenCalled()
      })

      it('should configure file path', () => {
        mocks.existsSync.mockReturnValue(true)

        Logger.configure({ file: '/tmp/configured.log' })

        const log = Logger.getLogger('file-config-test')
        log.info('File log')

        expect(mocks.createWriteStream).toHaveBeenCalledWith(
          expect.stringContaining('configured.log'),
          expect.any(Object)
        )
      })
    })

    describe('resetConfig', () => {
      it('should reset configuration to defaults', () => {
        Logger.configure({ level: 'debug', silent: true })
        Logger.resetConfig()

        const log = Logger.getLogger('reset-test')

        // Default level is info
        log.debug('Should not show')
        log.info('Should show')

        expect(mocks.consoleLog).not.toHaveBeenCalled()
        expect(mocks.consoleInfo).toHaveBeenCalled()
      })
    })

    describe('closeAll', () => {
      it('should close all file streams', () => {
        mocks.existsSync.mockReturnValue(true)

        const log1 = Logger.getLogger('close-1', { file: '/tmp/close1.log' })
        const log2 = Logger.getLogger('close-2', { file: '/tmp/close2.log' })

        log1.info('Write')
        log2.info('Write')

        Logger.closeAll()

        expect(mockFileStream.end).toHaveBeenCalled()
      })
    })

    describe('flushAll', () => {
      it('should flush all pending writes', async () => {
        mocks.existsSync.mockReturnValue(true)

        const log = Logger.getLogger('flush-test', { file: '/tmp/flush.log' })
        log.info('Write')

        await Logger.flushAll()

        // Should resolve without error
        expect(true).toBe(true)
      })
    })
  })

  describe('exported singleton', () => {
    it('should export default logger instance', () => {
      expect(logger).toBeDefined()
      expect(typeof logger.info).toBe('function')
    })

    it('should have context "pcu"', () => {
      logger.info('Test message')

      expect(mocks.consoleInfo.mock.calls[0][0]).toContain('[pcu]')
    })
  })

  describe('createLogger helper', () => {
    it('should create logger with given context', () => {
      const log = createLogger('my-module')

      log.info('Test')

      expect(mocks.consoleInfo.mock.calls[0][0]).toContain('[my-module]')
    })

    it('should accept options', () => {
      const log = createLogger('my-module-opts', { level: 'debug' })

      log.debug('Debug message')

      expect(mocks.consoleLog).toHaveBeenCalled()
    })
  })

  describe('log entry formatting', () => {
    it('should include timestamp in logs', () => {
      const log = Logger.getLogger('format-test')

      log.info('Test message')

      // Check that timestamp is included (time format like "10:30:45")
      expect(mocks.consoleInfo.mock.calls[0][0]).toMatch(/\d{1,2}:\d{2}:\d{2}/)
    })

    it('should include context in logs', () => {
      const log = Logger.getLogger('my-context')

      log.info('Test message')

      expect(mocks.consoleInfo.mock.calls[0][0]).toContain('[my-context]')
    })

    it('should format data in debug mode', () => {
      const log = Logger.getLogger('data-test', { level: 'debug' })

      log.debug('With data', { key: 'value' })

      expect(mocks.consoleLog.mock.calls[0][0]).toContain('key')
    })
  })
})

describe('Logger isolation', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    Logger.clearInstances()
    Logger.resetConfig()

    console.error = mocks.consoleError
    console.warn = mocks.consoleWarn
    console.info = mocks.consoleInfo
    console.log = mocks.consoleLog
  })

  afterEach(() => {
    console.error = originalConsole.error
    console.warn = originalConsole.warn
    console.info = originalConsole.info
    console.log = originalConsole.log
  })

  it('should maintain separate state for different instances', () => {
    const log1 = Logger.getLogger('iso-1')
    const log2 = Logger.getLogger('iso-2')

    log1.setLevel('error')
    log2.setLevel('debug')

    expect(log1.getLevel()).toBe('error')
    expect(log2.getLevel()).toBe('debug')
  })

  it('should not affect other instances when closed', () => {
    mocks.existsSync.mockReturnValue(true)

    const log1 = Logger.getLogger('close-iso-1', { file: '/tmp/iso1.log' })
    const log2 = Logger.getLogger('close-iso-2', { file: '/tmp/iso2.log' })

    log1.info('Write')
    log2.info('Write')

    log1.close()

    // log2 should still work
    log2.info('Still works')

    expect(mockFileStream.write).toHaveBeenCalledTimes(3)
  })
})
