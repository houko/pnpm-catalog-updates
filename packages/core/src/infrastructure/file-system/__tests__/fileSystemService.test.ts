/**
 * FileSystemService Tests
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

// Use vi.hoisted to ensure mocks are available during vi.mock hoisting
const mocks = vi.hoisted(() => ({
  access: vi.fn(),
  stat: vi.fn(),
  readFile: vi.fn(),
  writeFile: vi.fn(),
  mkdir: vi.fn(),
  copyFile: vi.fn(),
  unlink: vi.fn(),
  readdir: vi.fn(),
  glob: vi.fn(),
  yamlParse: vi.fn(),
  yamlStringify: vi.fn(),
}))

// Mock logger and error classes
const mockUtils = vi.hoisted(() => {
  const mockLogger = {
    error: vi.fn(),
    warn: vi.fn(),
    info: vi.fn(),
    debug: vi.fn(),
  }

  // Mock FileSystemError class
  class MockFileSystemError extends Error {
    constructor(
      public readonly path: string,
      public readonly operation: string,
      public readonly reason: string,
      cause?: Error
    ) {
      super(`File system ${operation} failed for "${path}": ${reason}`, { cause })
      this.name = 'FileSystemError'
    }
  }

  // Mock FileSizeExceededError class
  class MockFileSizeExceededError extends Error {
    constructor(filePath: string, actualSize: number, maxSize: number, cause?: Error) {
      const actualSizeMB = (actualSize / 1024 / 1024).toFixed(2)
      const maxSizeMB = (maxSize / 1024 / 1024).toFixed(2)
      super(
        `File "${filePath}" exceeds maximum allowed size (${actualSizeMB}MB > ${maxSizeMB}MB)`,
        { cause }
      )
      this.name = 'FileSizeExceededError'
    }
  }

  return {
    logger: mockLogger,
    FileSystemError: MockFileSystemError,
    FileSizeExceededError: MockFileSizeExceededError,
  }
})

// Mock @pcu/utils with logger and error classes
vi.mock('@pcu/utils', () => ({
  logger: mockUtils.logger,
  FileSystemError: mockUtils.FileSystemError,
  FileSizeExceededError: mockUtils.FileSizeExceededError,
}))

// Mock fs/promises with default export
vi.mock('node:fs/promises', () => ({
  default: {
    access: mocks.access,
    stat: mocks.stat,
    readFile: mocks.readFile,
    writeFile: mocks.writeFile,
    mkdir: mocks.mkdir,
    copyFile: mocks.copyFile,
    unlink: mocks.unlink,
    readdir: mocks.readdir,
  },
  access: mocks.access,
  stat: mocks.stat,
  readFile: mocks.readFile,
  writeFile: mocks.writeFile,
  mkdir: mocks.mkdir,
  copyFile: mocks.copyFile,
  unlink: mocks.unlink,
  readdir: mocks.readdir,
}))

// Mock glob
vi.mock('glob', () => ({
  glob: mocks.glob,
}))

// Mock YAML
vi.mock('yaml', () => ({
  default: {
    parse: mocks.yamlParse,
    stringify: mocks.yamlStringify,
  },
}))

// Import after mocks
const { FileSystemService } = await import('../fileSystemService.js')
const { WorkspacePath } = await import('../../../domain/value-objects/workspacePath.js')

describe('FileSystemService', () => {
  let service: FileSystemService

  beforeEach(() => {
    vi.clearAllMocks()
    service = new FileSystemService()
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  describe('exists', () => {
    it('should return true when file exists', async () => {
      mocks.access.mockResolvedValue(undefined)

      const result = await service.exists('/path/to/file.txt')

      expect(result).toBe(true)
      expect(mocks.access).toHaveBeenCalledWith('/path/to/file.txt')
    })

    it('should return false when file does not exist', async () => {
      mocks.access.mockRejectedValue(new Error('ENOENT'))

      const result = await service.exists('/path/to/nonexistent.txt')

      expect(result).toBe(false)
    })
  })

  describe('isDirectory', () => {
    it('should return true when path is a directory', async () => {
      mocks.stat.mockResolvedValue({
        isDirectory: () => true,
      })

      const result = await service.isDirectory('/path/to/dir')

      expect(result).toBe(true)
      expect(mocks.stat).toHaveBeenCalledWith('/path/to/dir')
    })

    it('should return false when path is a file', async () => {
      mocks.stat.mockResolvedValue({
        isDirectory: () => false,
      })

      const result = await service.isDirectory('/path/to/file.txt')

      expect(result).toBe(false)
    })

    it('should return false when path does not exist', async () => {
      mocks.stat.mockRejectedValue(new Error('ENOENT'))

      const result = await service.isDirectory('/path/to/nonexistent')

      expect(result).toBe(false)
    })
  })

  describe('readTextFile', () => {
    it('should read file content', async () => {
      mocks.readFile.mockResolvedValue('file content')

      const result = await service.readTextFile('/path/to/file.txt')

      expect(result).toBe('file content')
      expect(mocks.readFile).toHaveBeenCalledWith('/path/to/file.txt', 'utf-8')
    })

    it('should throw error when read fails', async () => {
      mocks.readFile.mockRejectedValue(new Error('ENOENT'))

      await expect(service.readTextFile('/path/to/nonexistent.txt')).rejects.toThrow(
        'File system read failed for "/path/to/nonexistent.txt"'
      )
    })
  })

  describe('writeTextFile', () => {
    it('should write file content and create directory', async () => {
      mocks.mkdir.mockResolvedValue(undefined)
      mocks.writeFile.mockResolvedValue(undefined)

      await service.writeTextFile('/path/to/file.txt', 'content')

      expect(mocks.mkdir).toHaveBeenCalledWith('/path/to', { recursive: true })
      expect(mocks.writeFile).toHaveBeenCalledWith('/path/to/file.txt', 'content', 'utf-8')
    })

    it('should throw error when write fails', async () => {
      mocks.mkdir.mockResolvedValue(undefined)
      mocks.writeFile.mockRejectedValue(new Error('EACCES'))

      await expect(service.writeTextFile('/path/to/file.txt', 'content')).rejects.toThrow(
        'File system write failed for "/path/to/file.txt"'
      )
    })
  })

  describe('readJsonFile', () => {
    it('should read and parse JSON file', async () => {
      mocks.stat.mockResolvedValue({ size: 100 })
      mocks.readFile.mockResolvedValue('{"name": "test", "version": "1.0.0"}')

      const result = await service.readJsonFile('/path/to/package.json')

      expect(result).toEqual({ name: 'test', version: '1.0.0' })
    })

    it('should throw error for invalid JSON', async () => {
      mocks.readFile.mockResolvedValue('invalid json')

      await expect(service.readJsonFile('/path/to/invalid.json')).rejects.toThrow(
        'File system readJSON failed for "/path/to/invalid.json"'
      )
    })
  })

  describe('writeJsonFile', () => {
    it('should stringify and write JSON file with default indent', async () => {
      mocks.mkdir.mockResolvedValue(undefined)
      mocks.writeFile.mockResolvedValue(undefined)

      await service.writeJsonFile('/path/to/file.json', { name: 'test' })

      expect(mocks.writeFile).toHaveBeenCalledWith(
        '/path/to/file.json',
        JSON.stringify({ name: 'test' }, null, 2),
        'utf-8'
      )
    })

    it('should use custom indent', async () => {
      mocks.mkdir.mockResolvedValue(undefined)
      mocks.writeFile.mockResolvedValue(undefined)

      await service.writeJsonFile('/path/to/file.json', { name: 'test' }, 4)

      expect(mocks.writeFile).toHaveBeenCalledWith(
        '/path/to/file.json',
        JSON.stringify({ name: 'test' }, null, 4),
        'utf-8'
      )
    })
  })

  describe('readYamlFile', () => {
    it('should read and parse YAML file', async () => {
      mocks.stat.mockResolvedValue({ size: 100 })
      mocks.readFile.mockResolvedValue('packages:\n  - "packages/*"')
      mocks.yamlParse.mockReturnValue({ packages: ['packages/*'] })

      const result = await service.readYamlFile('/path/to/pnpm-workspace.yaml')

      expect(result).toEqual({ packages: ['packages/*'] })
      expect(mocks.yamlParse).toHaveBeenCalledWith('packages:\n  - "packages/*"')
    })

    it('should throw error for invalid YAML', async () => {
      mocks.readFile.mockResolvedValue('invalid: yaml: content')
      mocks.yamlParse.mockImplementation(() => {
        throw new Error('YAML parse error')
      })

      await expect(service.readYamlFile('/path/to/invalid.yaml')).rejects.toThrow(
        'File system readYAML failed for "/path/to/invalid.yaml"'
      )
    })
  })

  describe('writeYamlFile', () => {
    it('should stringify and write YAML file', async () => {
      mocks.mkdir.mockResolvedValue(undefined)
      mocks.writeFile.mockResolvedValue(undefined)
      mocks.yamlStringify.mockReturnValue('packages:\n  - "packages/*"\n')

      await service.writeYamlFile('/path/to/file.yaml', { packages: ['packages/*'] })

      expect(mocks.yamlStringify).toHaveBeenCalledWith({ packages: ['packages/*'] }, { indent: 2 })
      expect(mocks.writeFile).toHaveBeenCalledWith(
        '/path/to/file.yaml',
        'packages:\n  - "packages/*"\n',
        'utf-8'
      )
    })
  })

  describe('writeYamlFilePreservingFormat', () => {
    it('should preserve format when original file exists', async () => {
      const originalContent = `# Comment
packages:
  - "packages/*"

catalog:
  lodash: 4.17.21
`
      mocks.readFile.mockResolvedValue(originalContent)
      mocks.mkdir.mockResolvedValue(undefined)
      mocks.writeFile.mockResolvedValue(undefined)

      const newData = {
        packages: ['packages/*'],
        catalog: { lodash: '4.17.22' },
      }

      await service.writeYamlFilePreservingFormat('/path/to/file.yaml', newData)

      expect(mocks.writeFile).toHaveBeenCalled()
      const writtenContent = mocks.writeFile.mock.calls[0][1]
      expect(writtenContent).toContain('# Comment')
      expect(writtenContent).toContain('4.17.22')
    })

    it('should fall back to regular YAML write if reading fails', async () => {
      mocks.readFile.mockRejectedValue(new Error('ENOENT'))
      mocks.mkdir.mockResolvedValue(undefined)
      mocks.writeFile.mockResolvedValue(undefined)
      mocks.yamlStringify.mockReturnValue('packages:\n  - "packages/*"\n')

      await service.writeYamlFilePreservingFormat('/path/to/file.yaml', {
        packages: ['packages/*'],
      })

      expect(mockUtils.logger.warn).toHaveBeenCalled()
      expect(mocks.yamlStringify).toHaveBeenCalled()
    })
  })

  describe('readPnpmWorkspaceConfig', () => {
    it('should read workspace config', async () => {
      mocks.access.mockResolvedValue(undefined)
      mocks.stat.mockResolvedValue({ size: 100 })
      mocks.readFile.mockResolvedValue('packages:\n  - "packages/*"')
      mocks.yamlParse.mockReturnValue({ packages: ['packages/*'] })

      const workspacePath = WorkspacePath.fromString('/workspace')
      const result = await service.readPnpmWorkspaceConfig(workspacePath)

      expect(result).toEqual({ packages: ['packages/*'] })
    })

    it('should throw error if config does not exist', async () => {
      mocks.access.mockRejectedValue(new Error('ENOENT'))

      const workspacePath = WorkspacePath.fromString('/workspace')

      await expect(service.readPnpmWorkspaceConfig(workspacePath)).rejects.toThrow(
        'pnpm-workspace.yaml not found'
      )
    })
  })

  describe('writePnpmWorkspaceConfig', () => {
    it('should write workspace config preserving format', async () => {
      mocks.readFile.mockResolvedValue('packages:\n  - "packages/*"')
      mocks.mkdir.mockResolvedValue(undefined)
      mocks.writeFile.mockResolvedValue(undefined)

      const workspacePath = WorkspacePath.fromString('/workspace')
      await service.writePnpmWorkspaceConfig(workspacePath, { packages: ['packages/*'] })

      expect(mocks.writeFile).toHaveBeenCalled()
    })
  })

  describe('readPackageJson', () => {
    it('should read package.json', async () => {
      mocks.access.mockResolvedValue(undefined)
      mocks.stat.mockResolvedValue({ size: 100 })
      mocks.readFile.mockResolvedValue('{"name": "test", "version": "1.0.0"}')

      const packagePath = WorkspacePath.fromString('/package')
      const result = await service.readPackageJson(packagePath)

      expect(result).toEqual({ name: 'test', version: '1.0.0' })
    })

    it('should throw error if package.json does not exist', async () => {
      mocks.access.mockRejectedValue(new Error('ENOENT'))

      const packagePath = WorkspacePath.fromString('/package')

      await expect(service.readPackageJson(packagePath)).rejects.toThrow('package.json not found')
    })
  })

  describe('writePackageJson', () => {
    it('should write package.json', async () => {
      mocks.mkdir.mockResolvedValue(undefined)
      mocks.writeFile.mockResolvedValue(undefined)

      const packagePath = WorkspacePath.fromString('/package')
      await service.writePackageJson(packagePath, { name: 'test', version: '1.0.0' })

      expect(mocks.writeFile).toHaveBeenCalled()
      const writtenContent = JSON.parse(mocks.writeFile.mock.calls[0][1])
      expect(writtenContent).toEqual({ name: 'test', version: '1.0.0' })
    })
  })

  describe('findPackageJsonFiles', () => {
    it('should find package.json files matching patterns', async () => {
      mocks.glob.mockResolvedValue([
        '/workspace/packages/a/package.json',
        '/workspace/packages/b/package.json',
      ])

      const workspacePath = WorkspacePath.fromString('/workspace')
      const result = await service.findPackageJsonFiles(workspacePath, ['packages/*'])

      expect(result).toHaveLength(2)
      expect(result).toContain('/workspace/packages/a/package.json')
      expect(result).toContain('/workspace/packages/b/package.json')
    })

    it('should remove duplicate files', async () => {
      mocks.glob
        .mockResolvedValueOnce(['/workspace/packages/a/package.json'])
        .mockResolvedValueOnce(['/workspace/packages/a/package.json'])

      const workspacePath = WorkspacePath.fromString('/workspace')
      const result = await service.findPackageJsonFiles(workspacePath, ['packages/*', 'packages/a'])

      expect(result).toHaveLength(1)
    })

    it('should continue on pattern failure', async () => {
      mocks.glob
        .mockRejectedValueOnce(new Error('Pattern error'))
        .mockResolvedValueOnce(['/workspace/apps/app/package.json'])

      const workspacePath = WorkspacePath.fromString('/workspace')
      const result = await service.findPackageJsonFiles(workspacePath, ['invalid/**', 'apps/*'])

      expect(result).toContain('/workspace/apps/app/package.json')
      expect(mockUtils.logger.warn).toHaveBeenCalled()
    })
  })

  describe('findDirectories', () => {
    it('should find directories matching patterns', async () => {
      mocks.glob.mockResolvedValue(['/workspace/packages/a', '/workspace/packages/b'])

      const workspacePath = WorkspacePath.fromString('/workspace')
      const result = await service.findDirectories(workspacePath, ['packages/*'])

      expect(result).toHaveLength(2)
    })
  })

  describe('isPnpmWorkspace', () => {
    it('should return true when both pnpm-workspace.yaml and package.json exist', async () => {
      mocks.access.mockResolvedValue(undefined)

      const result = await service.isPnpmWorkspace('/workspace')

      expect(result).toBe(true)
      expect(mocks.access).toHaveBeenCalledTimes(2)
    })

    it('should return false when pnpm-workspace.yaml is missing', async () => {
      mocks.access.mockRejectedValueOnce(new Error('ENOENT'))

      const result = await service.isPnpmWorkspace('/workspace')

      expect(result).toBe(false)
    })

    it('should return false when package.json is missing', async () => {
      mocks.access.mockResolvedValueOnce(undefined).mockRejectedValueOnce(new Error('ENOENT'))

      const result = await service.isPnpmWorkspace('/workspace')

      expect(result).toBe(false)
    })
  })

  describe('findNearestWorkspace', () => {
    it('should find workspace in current directory', async () => {
      mocks.access.mockResolvedValue(undefined)

      const result = await service.findNearestWorkspace('/workspace/packages/a')

      expect(result).toBe('/workspace/packages/a')
    })

    it('should find workspace in parent directory', async () => {
      // First directory is not a workspace
      mocks.access
        .mockRejectedValueOnce(new Error('ENOENT'))
        // Second directory (parent) is a workspace
        .mockResolvedValue(undefined)

      const result = await service.findNearestWorkspace('/workspace/packages/a')

      expect(result).not.toBeNull()
    })

    it('should return null if no workspace found', async () => {
      mocks.access.mockRejectedValue(new Error('ENOENT'))

      const result = await service.findNearestWorkspace('/some/random/path')

      expect(result).toBeNull()
    })
  })

  describe('getModificationTime', () => {
    it('should return modification time', async () => {
      const mtime = new Date('2024-01-01')
      mocks.stat.mockResolvedValue({ mtime })

      const result = await service.getModificationTime('/path/to/file.txt')

      expect(result).toEqual(mtime)
    })

    it('should throw error when file does not exist', async () => {
      mocks.stat.mockRejectedValue(new Error('ENOENT'))

      await expect(service.getModificationTime('/path/to/nonexistent.txt')).rejects.toThrow(
        'File system stat failed for "/path/to/nonexistent.txt"'
      )
    })
  })

  describe('createBackup', () => {
    it('should create backup with timestamp', async () => {
      mocks.copyFile.mockResolvedValue(undefined)

      // Mock Date to have predictable timestamp
      const mockDate = new Date('2024-01-15T10:30:00.000Z')
      vi.setSystemTime(mockDate)

      const result = await service.createBackup('/path/to/file.txt')

      expect(result).toContain('/path/to/file.txt.transaction-backup.')
      expect(result).toContain('2024-01-15')
      expect(mocks.copyFile).toHaveBeenCalled()

      vi.useRealTimers()
    })

    it('should throw error when copy fails', async () => {
      mocks.copyFile.mockRejectedValue(new Error('EACCES'))

      await expect(service.createBackup('/path/to/file.txt')).rejects.toThrow(
        'File system backup failed for "/path/to/file.txt"'
      )
    })
  })

  describe('restoreFromBackup', () => {
    it('should restore file from backup', async () => {
      mocks.copyFile.mockResolvedValue(undefined)

      await service.restoreFromBackup('/path/to/file.txt', '/path/to/file.txt.backup')

      expect(mocks.copyFile).toHaveBeenCalledWith('/path/to/file.txt.backup', '/path/to/file.txt')
    })

    it('should throw error when restore fails', async () => {
      mocks.copyFile.mockRejectedValue(new Error('ENOENT'))

      await expect(
        service.restoreFromBackup('/path/to/file.txt', '/path/to/backup')
      ).rejects.toThrow('File system restore failed for "/path/to/file.txt"')
    })
  })

  describe('removeFile', () => {
    it('should remove file', async () => {
      mocks.unlink.mockResolvedValue(undefined)

      await service.removeFile('/path/to/file.txt')

      expect(mocks.unlink).toHaveBeenCalledWith('/path/to/file.txt')
    })

    it('should throw error when removal fails', async () => {
      mocks.unlink.mockRejectedValue(new Error('EACCES'))

      await expect(service.removeFile('/path/to/file.txt')).rejects.toThrow(
        'File system delete failed for "/path/to/file.txt"'
      )
    })
  })

  describe('listFiles', () => {
    it('should list files in directory', async () => {
      mocks.readdir.mockResolvedValue([
        { name: 'file1.txt', isFile: () => true, isDirectory: () => false },
        { name: 'file2.txt', isFile: () => true, isDirectory: () => false },
        { name: 'subdir', isFile: () => false, isDirectory: () => true },
      ])

      const result = await service.listFiles('/path/to/dir')

      expect(result).toHaveLength(2)
      expect(result).toContain('/path/to/dir/file1.txt')
      expect(result).toContain('/path/to/dir/file2.txt')
    })

    it('should throw error when listing fails', async () => {
      mocks.readdir.mockRejectedValue(new Error('ENOENT'))

      await expect(service.listFiles('/path/to/nonexistent')).rejects.toThrow(
        'File system listFiles failed for "/path/to/nonexistent"'
      )
    })
  })

  describe('listDirectories', () => {
    it('should list directories in directory', async () => {
      mocks.readdir.mockResolvedValue([
        { name: 'file1.txt', isFile: () => true, isDirectory: () => false },
        { name: 'subdir1', isFile: () => false, isDirectory: () => true },
        { name: 'subdir2', isFile: () => false, isDirectory: () => true },
      ])

      const result = await service.listDirectories('/path/to/dir')

      expect(result).toHaveLength(2)
      expect(result).toContain('/path/to/dir/subdir1')
      expect(result).toContain('/path/to/dir/subdir2')
    })

    it('should throw error when listing fails', async () => {
      mocks.readdir.mockRejectedValue(new Error('EACCES'))

      await expect(service.listDirectories('/path/to/protected')).rejects.toThrow(
        'File system listDirs failed for "/path/to/protected"'
      )
    })
  })

  describe('YAML format preservation', () => {
    it('should preserve comments in catalog section', async () => {
      const originalContent = `packages:
  - "packages/*"

# Production dependencies
catalog:
  # Utility library
  lodash: 4.17.21
  # Type definitions
  typescript: 5.0.0
`
      mocks.readFile.mockResolvedValue(originalContent)
      mocks.mkdir.mockResolvedValue(undefined)
      mocks.writeFile.mockResolvedValue(undefined)

      const newData = {
        packages: ['packages/*'],
        catalog: {
          lodash: '4.17.22',
          typescript: '5.1.0',
        },
      }

      await service.writeYamlFilePreservingFormat('/path/to/file.yaml', newData)

      const writtenContent = mocks.writeFile.mock.calls[0][1]
      expect(writtenContent).toContain('# Production dependencies')
      expect(writtenContent).toContain('# Utility library')
      expect(writtenContent).toContain('4.17.22')
      expect(writtenContent).toContain('5.1.0')
    })

    it('should handle catalogs section with multiple catalogs', async () => {
      const originalContent = `packages:
  - "packages/*"

catalogs:
  default:
    lodash: 4.17.21
  react17:
    react: 17.0.2
`
      mocks.readFile.mockResolvedValue(originalContent)
      mocks.mkdir.mockResolvedValue(undefined)
      mocks.writeFile.mockResolvedValue(undefined)

      const newData = {
        packages: ['packages/*'],
        catalogs: {
          default: { lodash: '4.17.22' },
          react17: { react: '17.0.3' },
        },
      }

      await service.writeYamlFilePreservingFormat('/path/to/file.yaml', newData)

      const writtenContent = mocks.writeFile.mock.calls[0][1]
      expect(writtenContent).toContain('default:')
      expect(writtenContent).toContain('react17:')
      expect(writtenContent).toContain('4.17.22')
      expect(writtenContent).toContain('17.0.3')
    })

    it('should add new packages to existing catalog', async () => {
      const originalContent = `catalog:
  lodash: 4.17.21
`
      mocks.readFile.mockResolvedValue(originalContent)
      mocks.mkdir.mockResolvedValue(undefined)
      mocks.writeFile.mockResolvedValue(undefined)

      const newData = {
        catalog: {
          lodash: '4.17.21',
          typescript: '5.0.0',
        },
      }

      await service.writeYamlFilePreservingFormat('/path/to/file.yaml', newData)

      const writtenContent = mocks.writeFile.mock.calls[0][1]
      expect(writtenContent).toContain('lodash: 4.17.21')
      expect(writtenContent).toContain('typescript: 5.0.0')
    })
  })
})
