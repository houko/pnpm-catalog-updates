/**
 * Backup Service
 *
 * Manages backup and rollback operations for pnpm-workspace.yaml files.
 * Provides functionality to list, create, and restore backups.
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { logger } from '@pcu/utils'
import { parse as parseYaml } from 'yaml'

export interface BackupInfo {
  /** Full path to the backup file */
  path: string
  /** Timestamp of the backup */
  timestamp: Date
  /** Size of the backup file in bytes */
  size: number
  /** Formatted timestamp string */
  formattedTime: string
}

export interface BackupServiceOptions {
  /** Maximum number of backups to keep */
  maxBackups?: number
  /** Directory to store backups (defaults to same directory as original file) */
  backupDir?: string
}

export interface RollbackVerificationResult {
  /** Whether the verification passed */
  success: boolean
  /** Whether the restored file is valid YAML */
  isValidYaml: boolean
  /** Whether the file contains valid catalog structure */
  hasCatalogStructure: boolean
  /** List of detected catalogs in the restored file */
  catalogs: string[]
  /** Number of dependencies in catalogs */
  dependencyCount: number
  /** Error message if verification failed */
  errorMessage?: string
}

export class BackupService {
  private readonly maxBackups: number
  private readonly backupDir?: string

  constructor(options: BackupServiceOptions = {}) {
    this.maxBackups = options.maxBackups ?? 10
    this.backupDir = options.backupDir
  }

  /**
   * Create a backup of the specified file
   */
  async createBackup(filePath: string): Promise<string> {
    return this.createBackupFile(filePath, true)
  }

  private async createBackupFile(filePath: string, cleanup: boolean): Promise<string> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const fileName = path.basename(filePath)
    const dir = this.backupDir || path.dirname(filePath)
    const backupPath = path.join(dir, `${fileName}.backup.${timestamp}`)

    try {
      // Ensure backup directory exists
      await fs.mkdir(dir, { recursive: true })

      // Copy the file to backup location
      await fs.copyFile(filePath, backupPath)

      logger.info('Backup created', { original: filePath, backup: backupPath })

      // Clean up old backups if necessary
      if (cleanup) {
        await this.cleanupOldBackups(filePath)
      }

      return backupPath
    } catch (error) {
      logger.error('Failed to create backup', error instanceof Error ? error : undefined, {
        filePath,
        backupPath,
      })
      throw error
    }
  }

  /**
   * List all available backups for a file
   */
  async listBackups(originalFilePath: string): Promise<BackupInfo[]> {
    const fileName = path.basename(originalFilePath)
    const dir = this.backupDir || path.dirname(originalFilePath)
    const backupPattern = `${fileName}.backup.`

    try {
      const files = await fs.readdir(dir)
      const backups: BackupInfo[] = []

      for (const file of files) {
        if (file.startsWith(backupPattern)) {
          const backupPath = path.join(dir, file)
          const stat = await fs.stat(backupPath)

          // Parse timestamp from filename
          const timestamp = this.parseBackupTimestamp(file.replace(backupPattern, ''))

          backups.push({
            path: backupPath,
            timestamp,
            size: stat.size,
            formattedTime: this.formatTimestamp(timestamp),
          })
        }
      }

      // Sort by timestamp, newest first
      backups.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())

      return backups
    } catch (error) {
      logger.error('Failed to list backups', error instanceof Error ? error : undefined, {
        originalFilePath,
      })
      return []
    }
  }

  /**
   * Restore a file from a specific backup
   * @returns The path to the pre-restore backup created for safety
   */
  async restoreFromBackup(originalFilePath: string, backupPath: string): Promise<string> {
    try {
      // Verify backup exists
      await fs.access(backupPath)

      // Create a backup of current state before restoring (safety net)
      // Do not run retention before reading the selected backup: it may be the oldest retained file.
      const preRestoreBackup = await this.createBackupFile(originalFilePath, false)
      logger.info('Created pre-restore backup', { path: preRestoreBackup })

      // Restore from backup
      await fs.copyFile(backupPath, originalFilePath)

      await this.cleanupOldBackups(originalFilePath)

      logger.info('Restored from backup', { original: originalFilePath, backup: backupPath })

      return preRestoreBackup
    } catch (error) {
      logger.error('Failed to restore from backup', error instanceof Error ? error : undefined, {
        originalFilePath,
        backupPath,
      })
      throw error
    }
  }

  /**
   * Restore from the most recent backup
   * @returns Object containing restored backup path and pre-restore backup path, or null if no backups found
   */
  async restoreLatest(
    originalFilePath: string
  ): Promise<{ restoredFromPath: string; preRestoreBackupPath: string } | null> {
    const backups = await this.listBackups(originalFilePath)

    if (backups.length === 0) {
      logger.warn('No backups found', { originalFilePath })
      return null
    }

    const latestBackup = backups[0]
    if (!latestBackup) {
      return null
    }

    const preRestoreBackupPath = await this.restoreFromBackup(originalFilePath, latestBackup.path)
    return {
      restoredFromPath: latestBackup.path,
      preRestoreBackupPath,
    }
  }

  /**
   * Delete a specific backup
   */
  async deleteBackup(backupPath: string): Promise<void> {
    try {
      await fs.unlink(backupPath)
      logger.info('Deleted backup', { path: backupPath })
    } catch (error) {
      logger.error('Failed to delete backup', error instanceof Error ? error : undefined, {
        backupPath,
      })
      throw error
    }
  }

  /**
   * Delete all backups for a file
   */
  async deleteAllBackups(originalFilePath: string): Promise<number> {
    const backups = await this.listBackups(originalFilePath)
    let deleted = 0

    for (const backup of backups) {
      try {
        await this.deleteBackup(backup.path)
        deleted++
      } catch {
        // Continue deleting other backups
      }
    }

    return deleted
  }

  /**
   * Verify that a restored file is valid
   * Checks YAML syntax and catalog structure
   */
  async verifyRestoredFile(filePath: string): Promise<RollbackVerificationResult> {
    try {
      // Read the file
      const content = await fs.readFile(filePath, 'utf-8')

      // Parse YAML
      let parsedData: unknown
      try {
        parsedData = parseYaml(content)
      } catch (parseError) {
        return {
          success: false,
          isValidYaml: false,
          hasCatalogStructure: false,
          catalogs: [],
          dependencyCount: 0,
          errorMessage: `Invalid YAML: ${parseError instanceof Error ? parseError.message : 'Unknown parse error'}`,
        }
      }

      // Check for catalog structure
      const data = parsedData as Record<string, unknown> | null
      if (!data || typeof data !== 'object') {
        return {
          success: false,
          isValidYaml: true,
          hasCatalogStructure: false,
          catalogs: [],
          dependencyCount: 0,
          errorMessage: 'File does not contain valid workspace data',
        }
      }

      // Check for catalog or catalogs key
      const hasCatalog = 'catalog' in data || 'catalogs' in data
      const catalogs: string[] = []
      let dependencyCount = 0

      if ('catalog' in data && data.catalog && typeof data.catalog === 'object') {
        catalogs.push('default')
        dependencyCount += Object.keys(data.catalog as Record<string, unknown>).length
      }

      if ('catalogs' in data && data.catalogs && typeof data.catalogs === 'object') {
        const catalogsData = data.catalogs as Record<string, unknown>
        for (const [name, catalogDeps] of Object.entries(catalogsData)) {
          catalogs.push(name)
          if (catalogDeps && typeof catalogDeps === 'object') {
            dependencyCount += Object.keys(catalogDeps as Record<string, unknown>).length
          }
        }
      }

      logger.debug('Rollback verification completed', {
        filePath,
        isValidYaml: true,
        hasCatalogStructure: hasCatalog,
        catalogCount: catalogs.length,
        dependencyCount,
      })

      return {
        success: hasCatalog,
        isValidYaml: true,
        hasCatalogStructure: hasCatalog,
        catalogs,
        dependencyCount,
        errorMessage: hasCatalog ? undefined : 'No catalog or catalogs section found',
      }
    } catch (error) {
      logger.error('Failed to verify restored file', error instanceof Error ? error : undefined, {
        filePath,
      })

      return {
        success: false,
        isValidYaml: false,
        hasCatalogStructure: false,
        catalogs: [],
        dependencyCount: 0,
        errorMessage: error instanceof Error ? error.message : 'Unknown verification error',
      }
    }
  }

  /**
   * Clean up old backups, keeping only the most recent ones
   */
  private async cleanupOldBackups(originalFilePath: string): Promise<void> {
    const backups = await this.listBackups(originalFilePath)

    if (backups.length > this.maxBackups) {
      // Delete oldest backups
      const toDelete = backups.slice(this.maxBackups)
      for (const backup of toDelete) {
        try {
          await this.deleteBackup(backup.path)
          logger.debug('Cleaned up old backup', { path: backup.path })
        } catch {
          // Continue with other deletions
        }
      }
    }
  }

  /**
   * Parse backup timestamp from filename-safe format
   */
  private parseBackupTimestamp(timestampStr: string): Date {
    // Format: 2023-01-15T10-30-45-123Z
    // Convert to: 2023-01-15T10:30:45.123Z
    try {
      const parts = timestampStr.split('T')
      if (parts.length !== 2 || !parts[0] || !parts[1]) {
        return new Date()
      }

      const datePart = parts[0]
      const timePart = parts[1].replace(/-/g, (_, idx) => {
        if (idx === 2 || idx === 5) return ':'
        if (idx === 8) return '.'
        return '-'
      })

      const isoString = `${datePart}T${timePart}`
      const date = new Date(isoString)

      return Number.isNaN(date.getTime()) ? new Date() : date
    } catch {
      return new Date()
    }
  }

  /**
   * Format timestamp for display
   */
  private formatTimestamp(date: Date): string {
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
  }
}
