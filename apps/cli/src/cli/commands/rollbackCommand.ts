/**
 * Rollback Command
 *
 * CLI command to rollback catalog updates to a previous state.
 * Supports listing backups and restoring from a specific backup.
 *
 * QUAL-006/QUAL-016: Refactored to use unified output helpers (cliOutput, StyledText).
 * QUAL-007: Extracted common restore logic to reduce code duplication.
 */

import path from 'node:path'
import { type BackupInfo, BackupService } from '@pcu/core'
import { CommandExitError, t } from '@pcu/utils'
import inquirer from 'inquirer'
import { StyledText } from '../themes/colorTheme.js'
import { cliOutput } from '../utils/cliOutput.js'
import { handleCommandError } from '../utils/commandHelpers.js'
import { WORKFLOW_EXIT_CODES } from './workflowCommandHelpers.js'

export interface RollbackCommandOptions {
  workspace?: string
  list?: boolean
  latest?: boolean
  from?: string
  yes?: boolean
  json?: boolean
  select?: boolean
  deleteAll?: boolean
  verbose?: boolean
  color?: boolean
}

export class RollbackCommand {
  private readonly backupService: BackupService

  constructor() {
    this.backupService = new BackupService({ maxBackups: 10 })
  }

  /**
   * Execute the rollback command
   */
  async execute(options: RollbackCommandOptions = {}): Promise<void> {
    try {
      const workspacePath = options.workspace || process.cwd()
      const workspaceConfigPath = path.join(workspacePath, 'pnpm-workspace.yaml')

      if (options.json) {
        await this.executeJsonWorkflow(workspaceConfigPath, options)
        return
      }

      if (options.from || options.yes) {
        throw new Error('--from and --yes are only supported with --json')
      }

      // List backups
      if (options.list) {
        await this.listBackups(workspaceConfigPath, options.verbose)
        return
      }

      // Delete all backups
      if (options.deleteAll) {
        await this.deleteAllBackups(workspaceConfigPath)
        return
      }

      // Restore from latest backup
      if (options.latest) {
        await this.restoreLatest(workspaceConfigPath)
        return
      }

      // Interactive selection (default behavior if no flags)
      await this.interactiveRestore(workspaceConfigPath)
    } catch (error) {
      if (options.json) {
        throw error
      }
      handleCommandError(error, {
        verbose: options.verbose,
        errorMessage: 'Rollback command failed',
        context: { options },
      })
      throw error
    }
  }

  /**
   * Non-interactive rollback contract for CI and agents.
   */
  private async executeJsonWorkflow(
    workspaceConfigPath: string,
    options: RollbackCommandOptions
  ): Promise<void> {
    if (options.list) {
      const backups = await this.backupService.listBackups(workspaceConfigPath)
      cliOutput.print(
        JSON.stringify(
          {
            kind: 'pcu.rollback-list',
            schemaVersion: 1,
            success: true,
            backups: backups.map((backup) => ({
              path: backup.path,
              timestamp: backup.timestamp.toISOString(),
              size: backup.size,
            })),
          },
          null,
          2
        )
      )
      return
    }

    if (!options.yes) {
      this.failJson('CONFIRMATION_REQUIRED', 'JSON rollback requires --yes')
    }

    let backupPath = options.from
      ? this.resolveWorkspaceBackup(workspaceConfigPath, options.from)
      : ''
    if (!backupPath && options.latest) {
      const backups = await this.backupService.listBackups(workspaceConfigPath)
      backupPath = backups[0]?.path ?? ''
    }

    if (!backupPath) {
      this.failJson('BACKUP_REQUIRED', 'Use --from <backup-file> or --latest with --json --yes')
    }

    const preRestoreBackupPath = await this.backupService.restoreFromBackup(
      workspaceConfigPath,
      backupPath
    )
    const verification = await this.backupService.verifyRestoredFile(workspaceConfigPath)

    cliOutput.print(
      JSON.stringify(
        {
          kind: 'pcu.rollback-result',
          schemaVersion: 1,
          success: verification.success,
          restoredFromPath: backupPath,
          preRestoreBackupPath,
          verification,
        },
        null,
        2
      )
    )

    if (!verification.success) {
      throw CommandExitError.withCode(
        WORKFLOW_EXIT_CODES.verificationFailed,
        'Restored workspace did not pass verification'
      )
    }
  }

  private resolveWorkspaceBackup(workspaceConfigPath: string, backupPath: string): string {
    const resolvedWorkspaceFile = path.resolve(workspaceConfigPath)
    const resolvedBackup = path.resolve(backupPath)
    const expectedPrefix = `${path.basename(resolvedWorkspaceFile)}.backup.`

    if (
      path.dirname(resolvedBackup) !== path.dirname(resolvedWorkspaceFile) ||
      !path.basename(resolvedBackup).startsWith(expectedPrefix)
    ) {
      this.failJson(
        'INVALID_BACKUP_PATH',
        'Backup must be a pnpm-workspace.yaml backup in the selected workspace'
      )
    }

    return resolvedBackup
  }

  private failJson(code: string, message: string): never {
    cliOutput.print(
      JSON.stringify(
        {
          kind: 'pcu.rollback-result',
          schemaVersion: 1,
          success: false,
          error: { code, message },
        },
        null,
        2
      )
    )
    throw CommandExitError.withCode(WORKFLOW_EXIT_CODES.invalidInput, message)
  }

  /**
   * List all available backups
   */
  private async listBackups(workspaceConfigPath: string, verbose?: boolean): Promise<void> {
    const backups = await this.backupService.listBackups(workspaceConfigPath)

    if (backups.length === 0) {
      cliOutput.print(StyledText.iconWarning(t('command.rollback.noBackups')))
      cliOutput.print(StyledText.muted(t('command.rollback.createBackupHint')))
      return
    }

    cliOutput.print(
      StyledText.info(`\n📋 ${t('command.rollback.availableBackups', { count: backups.length })}`)
    )
    cliOutput.print(StyledText.muted('─'.repeat(60)))

    for (let i = 0; i < backups.length; i++) {
      const backup = backups[i]
      if (!backup) continue

      const sizeKB = (backup.size / 1024).toFixed(2)
      const isLatest = i === 0 ? StyledText.success(' (latest)') : ''

      cliOutput.print(`  ${StyledText.accent(`[${i + 1}]`)} ${backup.formattedTime}${isLatest}`)

      if (verbose) {
        cliOutput.print(StyledText.muted(`      Path: ${backup.path}`))
        cliOutput.print(StyledText.muted(`      Size: ${sizeKB} KB`))
      }
    }

    cliOutput.print(StyledText.muted('─'.repeat(60)))
    cliOutput.print(StyledText.muted(t('command.rollback.restoreHint')))
  }

  /**
   * QUAL-007: Common restore execution logic
   * Performs the actual restore operation after user confirmation
   */
  private async executeRestore(
    workspaceConfigPath: string,
    backup: BackupInfo,
    promptMessage: string
  ): Promise<void> {
    cliOutput.print(StyledText.success(`   ✓ ${t('command.rollback.autoBackupNote')}`))

    const { confirmed } = await inquirer.prompt<{ confirmed: boolean }>({
      type: 'confirm',
      name: 'confirmed',
      message: promptMessage,
      default: false,
    })

    if (!confirmed) {
      cliOutput.print(StyledText.iconWarning(t('command.rollback.cancelled')))
      return
    }

    const preRestoreBackupPath = await this.backupService.restoreFromBackup(
      workspaceConfigPath,
      backup.path
    )

    // Verify the restored file
    const verification = await this.backupService.verifyRestoredFile(workspaceConfigPath)
    await this.displayVerificationResult(verification, preRestoreBackupPath)
  }

  /**
   * Restore from the latest backup
   */
  private async restoreLatest(workspaceConfigPath: string): Promise<void> {
    const backups = await this.backupService.listBackups(workspaceConfigPath)

    if (backups.length === 0) {
      cliOutput.print(StyledText.iconWarning(t('command.rollback.noBackups')))
      return
    }

    const latestBackup = backups[0]
    if (!latestBackup) {
      cliOutput.print(StyledText.iconWarning(t('command.rollback.noBackups')))
      return
    }

    cliOutput.print(StyledText.info(`\n🔄 ${t('command.rollback.restoringLatest')}`))
    cliOutput.print(
      StyledText.muted(`   ${t('command.rollback.from')}: ${latestBackup.formattedTime}`)
    )

    await this.executeRestore(
      workspaceConfigPath,
      latestBackup,
      t('command.rollback.confirmRestore')
    )
  }

  /**
   * Display rollback verification results
   */
  private async displayVerificationResult(
    verification: Awaited<ReturnType<BackupService['verifyRestoredFile']>> | undefined,
    preRestoreBackupPath: string
  ): Promise<void> {
    if (!verification) {
      cliOutput.print(StyledText.iconWarning(t('command.rollback.verification.skipped')))
      cliOutput.print(
        StyledText.muted(
          t('command.rollback.preRestoreBackupCreated', { path: preRestoreBackupPath })
        )
      )
      cliOutput.print(StyledText.muted(t('command.rollback.runPnpmInstall')))
      return
    }

    if (verification.success) {
      cliOutput.print(StyledText.iconSuccess(t('command.rollback.success')))
      cliOutput.print(StyledText.success(`   ✓ ${t('command.rollback.verification.validYaml')}`))
      cliOutput.print(
        StyledText.success(
          `   ✓ ${t('command.rollback.verification.catalogsFound', { count: verification.catalogs.length })}`
        )
      )
      if (verification.catalogs.length > 0) {
        cliOutput.print(
          StyledText.muted(
            `     ${t('command.rollback.verification.catalogs')}: ${verification.catalogs.join(', ')}`
          )
        )
      }
      cliOutput.print(
        StyledText.muted(
          `     ${t('command.rollback.verification.dependencies', { count: verification.dependencyCount })}`
        )
      )
    } else {
      cliOutput.print(StyledText.iconWarning(t('command.rollback.verification.warning')))
      if (!verification.isValidYaml) {
        cliOutput.print(StyledText.error(`   ✗ ${t('command.rollback.verification.invalidYaml')}`))
      }
      if (!verification.hasCatalogStructure) {
        cliOutput.print(StyledText.warning(`   ⚠ ${t('command.rollback.verification.noCatalogs')}`))
      }
      if (verification.errorMessage) {
        cliOutput.print(StyledText.muted(`     ${verification.errorMessage}`))
      }
    }

    cliOutput.print(
      StyledText.muted(
        t('command.rollback.preRestoreBackupCreated', { path: preRestoreBackupPath })
      )
    )
    cliOutput.print(StyledText.muted(t('command.rollback.safetyNote')))
    cliOutput.print(StyledText.muted(t('command.rollback.runPnpmInstall')))
  }

  /**
   * Interactive backup selection and restore
   */
  private async interactiveRestore(workspaceConfigPath: string): Promise<void> {
    const backups = await this.backupService.listBackups(workspaceConfigPath)

    if (backups.length === 0) {
      cliOutput.print(StyledText.iconWarning(t('command.rollback.noBackups')))
      cliOutput.print(StyledText.muted(t('command.rollback.createBackupHint')))
      return
    }

    cliOutput.print(StyledText.info(`\n🔄 ${t('command.rollback.selectBackup')}`))

    const choices = backups.map((backup, index) => ({
      name: `${backup.formattedTime}${index === 0 ? ' (latest)' : ''} - ${(backup.size / 1024).toFixed(2)} KB`,
      value: backup,
    }))

    const { selectedBackup } = await inquirer.prompt<{ selectedBackup: BackupInfo }>({
      type: 'list',
      name: 'selectedBackup',
      message: t('command.rollback.chooseBackup'),
      choices,
    })

    cliOutput.print(StyledText.warning(`\n⚠️  ${t('command.rollback.warning')}`))
    cliOutput.print(
      StyledText.muted(
        `   ${t('command.rollback.willRestore', { time: selectedBackup.formattedTime })}`
      )
    )

    await this.executeRestore(
      workspaceConfigPath,
      selectedBackup,
      t('command.rollback.confirmRestore')
    )
  }

  /**
   * Delete all backups
   */
  private async deleteAllBackups(workspaceConfigPath: string): Promise<void> {
    const backups = await this.backupService.listBackups(workspaceConfigPath)

    if (backups.length === 0) {
      cliOutput.print(StyledText.iconWarning(t('command.rollback.noBackups')))
      return
    }

    cliOutput.print(
      StyledText.warning(`\n⚠️  ${t('command.rollback.deleteWarning', { count: backups.length })}`)
    )

    const { confirmed } = await inquirer.prompt<{ confirmed: boolean }>({
      type: 'confirm',
      name: 'confirmed',
      message: t('command.rollback.confirmDelete'),
      default: false,
    })

    if (!confirmed) {
      cliOutput.print(StyledText.iconWarning(t('command.rollback.cancelled')))
      return
    }

    const deleted = await this.backupService.deleteAllBackups(workspaceConfigPath)
    cliOutput.print(
      StyledText.iconSuccess(t('command.rollback.deletedBackups', { count: deleted }))
    )
  }

  /**
   * Get command help text
   */
  static getHelpText(): string {
    return `
Rollback catalog updates to a previous state

Usage:
  pcu rollback [options]

Options:
  --workspace <path>    Workspace directory (default: current directory)
  -l, --list            List available backups
  --latest              Restore from the most recent backup
  --from <backup-file>  Restore an exact backup returned by pcu apply
  --yes                 Confirm a non-interactive JSON restore
  --json                Emit the stable machine-readable rollback contract
  --delete-all          Delete all backups
  --verbose             Show detailed information

Examples:
  pcu rollback              # Interactive backup selection
  pcu rollback --list       # List all available backups
  pcu rollback --latest     # Restore from the most recent backup
  pcu rollback --from <path> --yes --json # Restore an exact backup without prompts
  pcu rollback --delete-all # Delete all backups

Notes:
  - Backups are automatically created when using 'pcu update -b'
  - Before restoring, a new backup of the current state is created
  - After rollback, run 'pnpm install' to sync the lock file
    `
  }
}
