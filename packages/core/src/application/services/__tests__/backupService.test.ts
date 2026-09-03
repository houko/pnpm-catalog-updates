/**
 * Backup Service Tests
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

// Mock fs/promises
const fsMocks = vi.hoisted(() => ({
  mkdir: vi.fn(),
  copyFile: vi.fn(),
  readdir: vi.fn(),
  stat: vi.fn(),
  unlink: vi.fn(),
  access: vi.fn(),
}))

vi.mock('node:fs/promises', () => ({
  default: fsMocks,
}))

// Mock @pcu/utils
vi.mock('@pcu/utils', () => ({
  logger: {
    error: vi.fn(),
    warn: vi.fn(),
    info: vi.fn(),
    debug: vi.fn(),
  },
}))

const { BackupService } = await import('../backupService.js')

describe('BackupService', () => {
  let service: InstanceType<typeof BackupService>

  beforeEach(() => {
    vi.clearAllMocks()
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2024-01-15T10:30:45.123Z'))
    service = new BackupService({ maxBackups: 3 })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('constructor', () => {
    it('should use default maxBackups when not specified', () => {
      const defaultService = new BackupService()
      // Default is 10, we test indirectly via cleanupOldBackups behavior
      expect(defaultService).toBeDefined()
    })

    it('should use custom maxBackups when specified', () => {
      const customService = new BackupService({ maxBackups: 5 })
      expect(customService).toBeDefined()
    })

    it('should use custom backupDir when specified', () => {
      const customService = new BackupService({ backupDir: '/custom/backup' })
      expect(customService).toBeDefined()
    })
  })

  describe('createBackup', () => {
    it('should create a backup with timestamp in filename', async () => {
      fsMocks.mkdir.mockResolvedValue(undefined)
      fsMocks.copyFile.mockResolvedValue(undefined)
      fsMocks.readdir.mockResolvedValue([])

      const result = await service.createBackup('/workspace/pnpm-workspace.yaml')

      expect(fsMocks.mkdir).toHaveBeenCalledWith('/workspace', { recursive: true })
      expect(fsMocks.copyFile).toHaveBeenCalledWith(
        '/workspace/pnpm-workspace.yaml',
        expect.stringContaining('pnpm-workspace.yaml.backup.2024-01-15T10-30-45-123Z')
      )
      expect(result).toContain('pnpm-workspace.yaml.backup.')
    })

    it('should use custom backup directory when configured', async () => {
      const customService = new BackupService({ backupDir: '/backups' })
      fsMocks.mkdir.mockResolvedValue(undefined)
      fsMocks.copyFile.mockResolvedValue(undefined)
      fsMocks.readdir.mockResolvedValue([])

      await customService.createBackup('/workspace/pnpm-workspace.yaml')

      expect(fsMocks.mkdir).toHaveBeenCalledWith('/backups', { recursive: true })
      expect(fsMocks.copyFile).toHaveBeenCalledWith(
        '/workspace/pnpm-workspace.yaml',
        expect.stringContaining('/backups/pnpm-workspace.yaml.backup.')
      )
    })

    it('should throw and log error when backup fails', async () => {
      const error = new Error('Copy failed')
      fsMocks.mkdir.mockResolvedValue(undefined)
      fsMocks.copyFile.mockRejectedValue(error)

      await expect(service.createBackup('/workspace/pnpm-workspace.yaml')).rejects.toThrow(
        'Copy failed'
      )
    })

    it('should cleanup old backups after creating new one', async () => {
      fsMocks.mkdir.mockResolvedValue(undefined)
      fsMocks.copyFile.mockResolvedValue(undefined)
      // Return 4 backups when maxBackups is 3
      fsMocks.readdir.mockResolvedValue([
        'pnpm-workspace.yaml.backup.2024-01-15T10-30-45-123Z',
        'pnpm-workspace.yaml.backup.2024-01-14T10-30-45-123Z',
        'pnpm-workspace.yaml.backup.2024-01-13T10-30-45-123Z',
        'pnpm-workspace.yaml.backup.2024-01-12T10-30-45-123Z',
      ])
      fsMocks.stat.mockResolvedValue({ size: 1024 })
      fsMocks.unlink.mockResolvedValue(undefined)

      await service.createBackup('/workspace/pnpm-workspace.yaml')

      // Should delete the oldest backup
      expect(fsMocks.unlink).toHaveBeenCalled()
    })
  })

  describe('listBackups', () => {
    it('should return empty array when no backups exist', async () => {
      fsMocks.readdir.mockResolvedValue(['other-file.txt'])

      const result = await service.listBackups('/workspace/pnpm-workspace.yaml')

      expect(result).toEqual([])
    })

    it('should return backups sorted by timestamp (newest first)', async () => {
      fsMocks.readdir.mockResolvedValue([
        'pnpm-workspace.yaml.backup.2024-01-13T08-00-00-000Z',
        'pnpm-workspace.yaml.backup.2024-01-15T10-30-00-000Z',
        'pnpm-workspace.yaml.backup.2024-01-14T09-00-00-000Z',
      ])
      fsMocks.stat.mockResolvedValue({ size: 1024 })

      const result = await service.listBackups('/workspace/pnpm-workspace.yaml')

      expect(result).toHaveLength(3)
      expect(result[0]?.path).toContain('2024-01-15')
      expect(result[1]?.path).toContain('2024-01-14')
      expect(result[2]?.path).toContain('2024-01-13')
    })

    it('should include backup info with size and formatted time', async () => {
      fsMocks.readdir.mockResolvedValue(['pnpm-workspace.yaml.backup.2024-01-15T10-30-00-000Z'])
      fsMocks.stat.mockResolvedValue({ size: 2048 })

      const result = await service.listBackups('/workspace/pnpm-workspace.yaml')

      expect(result[0]).toMatchObject({
        path: expect.stringContaining('pnpm-workspace.yaml.backup.2024-01-15'),
        size: 2048,
        formattedTime: expect.any(String),
        timestamp: expect.any(Date),
      })
    })

    it('should return empty array when readdir fails', async () => {
      fsMocks.readdir.mockRejectedValue(new Error('Permission denied'))

      const result = await service.listBackups('/workspace/pnpm-workspace.yaml')

      expect(result).toEqual([])
    })

    it('should use custom backup directory when configured', async () => {
      const customService = new BackupService({ backupDir: '/backups' })
      fsMocks.readdir.mockResolvedValue([])

      await customService.listBackups('/workspace/pnpm-workspace.yaml')

      expect(fsMocks.readdir).toHaveBeenCalledWith('/backups')
    })
  })

  describe('restoreFromBackup', () => {
    it('should restore file from backup and create pre-restore backup', async () => {
      fsMocks.access.mockResolvedValue(undefined)
      fsMocks.mkdir.mockResolvedValue(undefined)
      fsMocks.copyFile.mockResolvedValue(undefined)
      fsMocks.readdir.mockResolvedValue([])

      await service.restoreFromBackup(
        '/workspace/pnpm-workspace.yaml',
        '/workspace/pnpm-workspace.yaml.backup.2024-01-14T09-00-00-000Z'
      )

      // Should create pre-restore backup first
      expect(fsMocks.copyFile).toHaveBeenNthCalledWith(
        1,
        '/workspace/pnpm-workspace.yaml',
        expect.stringContaining('pnpm-workspace.yaml.backup.')
      )
      // Then restore from the specified backup
      expect(fsMocks.copyFile).toHaveBeenNthCalledWith(
        2,
        '/workspace/pnpm-workspace.yaml.backup.2024-01-14T09-00-00-000Z',
        '/workspace/pnpm-workspace.yaml'
      )
    })

    it('does not apply retention until after the selected backup is restored', async () => {
      const selectedBackup = '/workspace/pnpm-workspace.yaml.backup.2024-01-12T10-30-45-123Z'
      fsMocks.access.mockResolvedValue(undefined)
      fsMocks.mkdir.mockResolvedValue(undefined)
      fsMocks.copyFile.mockResolvedValue(undefined)
      fsMocks.readdir.mockResolvedValue([
        'pnpm-workspace.yaml.backup.2024-01-15T10-30-45-123Z',
        'pnpm-workspace.yaml.backup.2024-01-14T10-30-45-123Z',
        'pnpm-workspace.yaml.backup.2024-01-13T10-30-45-123Z',
        'pnpm-workspace.yaml.backup.2024-01-12T10-30-45-123Z',
      ])
      fsMocks.stat.mockResolvedValue({ size: 1024 })
      fsMocks.unlink.mockResolvedValue(undefined)

      await service.restoreFromBackup('/workspace/pnpm-workspace.yaml', selectedBackup)

      const restoreOrder = fsMocks.copyFile.mock.invocationCallOrder[1]!
      const deleteOrder = fsMocks.unlink.mock.invocationCallOrder[0]!
      expect(restoreOrder).toBeLessThan(deleteOrder)
    })

    it('should throw error when backup file does not exist', async () => {
      fsMocks.access.mockRejectedValue(new Error('File not found'))

      await expect(
        service.restoreFromBackup('/workspace/pnpm-workspace.yaml', '/workspace/nonexistent.backup')
      ).rejects.toThrow('File not found')
    })
  })

  describe('restoreLatest', () => {
    it('should restore from the most recent backup', async () => {
      fsMocks.readdir.mockResolvedValue([
        'pnpm-workspace.yaml.backup.2024-01-15T10-30-00-000Z',
        'pnpm-workspace.yaml.backup.2024-01-14T09-00-00-000Z',
      ])
      fsMocks.stat.mockResolvedValue({ size: 1024 })
      fsMocks.access.mockResolvedValue(undefined)
      fsMocks.mkdir.mockResolvedValue(undefined)
      fsMocks.copyFile.mockResolvedValue(undefined)

      const result = await service.restoreLatest('/workspace/pnpm-workspace.yaml')

      expect(result).not.toBeNull()
      expect(result?.restoredFromPath).toContain('2024-01-15')
      expect(result?.preRestoreBackupPath).toBeDefined()
    })

    it('should return null when no backups exist', async () => {
      fsMocks.readdir.mockResolvedValue([])

      const result = await service.restoreLatest('/workspace/pnpm-workspace.yaml')

      expect(result).toBeNull()
    })
  })

  describe('deleteBackup', () => {
    it('should delete a specific backup', async () => {
      fsMocks.unlink.mockResolvedValue(undefined)

      await service.deleteBackup('/workspace/pnpm-workspace.yaml.backup.2024-01-14')

      expect(fsMocks.unlink).toHaveBeenCalledWith(
        '/workspace/pnpm-workspace.yaml.backup.2024-01-14'
      )
    })

    it('should throw error when delete fails', async () => {
      fsMocks.unlink.mockRejectedValue(new Error('Permission denied'))

      await expect(
        service.deleteBackup('/workspace/pnpm-workspace.yaml.backup.2024-01-14')
      ).rejects.toThrow('Permission denied')
    })
  })

  describe('deleteAllBackups', () => {
    it('should delete all backups and return count', async () => {
      fsMocks.readdir.mockResolvedValue([
        'pnpm-workspace.yaml.backup.2024-01-15T10-30-00-000Z',
        'pnpm-workspace.yaml.backup.2024-01-14T09-00-00-000Z',
        'pnpm-workspace.yaml.backup.2024-01-13T08-00-00-000Z',
      ])
      fsMocks.stat.mockResolvedValue({ size: 1024 })
      fsMocks.unlink.mockResolvedValue(undefined)

      const result = await service.deleteAllBackups('/workspace/pnpm-workspace.yaml')

      expect(result).toBe(3)
      expect(fsMocks.unlink).toHaveBeenCalledTimes(3)
    })

    it('should return 0 when no backups exist', async () => {
      fsMocks.readdir.mockResolvedValue([])

      const result = await service.deleteAllBackups('/workspace/pnpm-workspace.yaml')

      expect(result).toBe(0)
    })

    it('should continue deleting even when some deletions fail', async () => {
      fsMocks.readdir.mockResolvedValue([
        'pnpm-workspace.yaml.backup.2024-01-15T10-30-00-000Z',
        'pnpm-workspace.yaml.backup.2024-01-14T09-00-00-000Z',
        'pnpm-workspace.yaml.backup.2024-01-13T08-00-00-000Z',
      ])
      fsMocks.stat.mockResolvedValue({ size: 1024 })
      fsMocks.unlink
        .mockResolvedValueOnce(undefined)
        .mockRejectedValueOnce(new Error('Failed'))
        .mockResolvedValueOnce(undefined)

      const result = await service.deleteAllBackups('/workspace/pnpm-workspace.yaml')

      // Should return 2 (successful deletions)
      expect(result).toBe(2)
    })
  })

  describe('timestamp parsing', () => {
    it('should handle valid backup timestamps', async () => {
      fsMocks.readdir.mockResolvedValue(['pnpm-workspace.yaml.backup.2024-01-15T10-30-45-123Z'])
      fsMocks.stat.mockResolvedValue({ size: 1024 })

      const result = await service.listBackups('/workspace/pnpm-workspace.yaml')

      expect(result[0]?.timestamp).toBeInstanceOf(Date)
    })

    it('should handle malformed timestamps gracefully', async () => {
      fsMocks.readdir.mockResolvedValue(['pnpm-workspace.yaml.backup.invalid-timestamp'])
      fsMocks.stat.mockResolvedValue({ size: 1024 })

      const result = await service.listBackups('/workspace/pnpm-workspace.yaml')

      // Should return current date as fallback
      expect(result[0]?.timestamp).toBeInstanceOf(Date)
    })
  })
})
