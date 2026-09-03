/**
 * Update Executor Service
 *
 * Responsible for executing catalog dependency updates.
 * Extracted from CatalogUpdateService for better separation of concerns.
 */

import path from 'node:path'
import { ConfigLoader, logger, parallelLimit, toError, UserFriendlyErrorHandler } from '@pcu/utils'
import type { WorkspaceRepository } from '../../domain/repositories/workspaceRepository.js'
import { WorkspacePath } from '../../domain/value-objects/workspacePath.js'
import type { NpmRegistryService } from '../../infrastructure/external-services/npmRegistryService.js'
import type { BackupService } from './backupService.js'
import type { UpdateOptions, UpdatePlan } from './updatePlanService.js'

export interface UpdateResult {
  success: boolean
  workspace: {
    path: string
    name: string
  }
  updatedDependencies: UpdatedDependency[]
  skippedDependencies: SkippedDependency[]
  errors: UpdateError[]
  totalUpdated: number
  totalSkipped: number
  totalErrors: number
  /** Path to the backup file created before updates (if createBackup was enabled) */
  backupPath?: string
}

export interface UpdatedDependency {
  catalogName: string
  packageName: string
  fromVersion: string
  toVersion: string
  updateType: 'major' | 'minor' | 'patch'
}

export interface SkippedDependency {
  catalogName: string
  packageName: string
  currentVersion: string
  reason: string
}

export interface UpdateError {
  catalogName: string
  packageName: string
  error: string
  fatal: boolean
}

export class UpdateExecutorService {
  constructor(
    private readonly workspaceRepository: WorkspaceRepository,
    private readonly registryService: NpmRegistryService,
    private readonly backupService?: BackupService
  ) {}

  /**
   * Execute catalog dependency updates
   */
  async executeUpdates(plan: UpdatePlan, options: UpdateOptions): Promise<UpdateResult> {
    const workspacePath = WorkspacePath.fromString(plan.workspace.path)

    // Load configuration for security settings
    const config = await ConfigLoader.loadConfig(workspacePath.toString())

    // Load workspace (getByPath throws WorkspaceNotFoundError if not found)
    const workspace = await this.workspaceRepository.getByPath(workspacePath)

    const updatedDependencies: UpdatedDependency[] = []
    const skippedDependencies: SkippedDependency[] = []
    const errors: UpdateError[] = []

    // Track security updates for notification
    const securityUpdates: string[] = []

    // PERF-004: Pre-build Set of conflicting package names for O(1) lookup
    const conflictingPackages = new Set(plan.conflicts.map((c) => c.packageName))

    // PERF-001: Run security checks in parallel before processing updates
    const securityCheckResults = new Map<string, boolean>()
    if (!options.noSecurity && config.security?.notifyOnSecurityUpdate) {
      const concurrency = config.advanced?.concurrency ?? 8
      await parallelLimit(
        plan.updates,
        async (update) => {
          const key = `${update.packageName}@${update.currentVersion}`
          try {
            const securityReport = await this.registryService.checkSecurityVulnerabilities(
              update.packageName,
              update.currentVersion
            )
            securityCheckResults.set(key, securityReport.hasVulnerabilities)
          } catch (error) {
            UserFriendlyErrorHandler.handleSecurityCheckFailure(
              update.packageName,
              toError(error),
              { operation: 'update' }
            )
            securityCheckResults.set(key, false)
          }
        },
        concurrency
      )
    }

    // Execute updates with pre-computed security check results
    for (const update of plan.updates) {
      try {
        // Skip if conflicts exist and force is not enabled
        // PERF-004: Use Set for O(1) lookup instead of array.some() O(n)
        if (plan.hasConflicts && !options.force && conflictingPackages.has(update.packageName)) {
          skippedDependencies.push({
            catalogName: update.catalogName,
            packageName: update.packageName,
            currentVersion: update.currentVersion,
            reason: 'Version conflict - use --force to override',
          })
          continue
        }

        // Check if this is a security update using pre-computed results
        const key = `${update.packageName}@${update.currentVersion}`
        const isSecurityUpdate = securityCheckResults.get(key) ?? false
        if (isSecurityUpdate) {
          securityUpdates.push(
            `${update.packageName}@${update.currentVersion} → ${update.newVersion}`
          )
        }

        // Perform the update
        workspace.updateCatalogDependency(update.catalogName, update.packageName, update.newVersion)

        updatedDependencies.push({
          catalogName: update.catalogName,
          packageName: update.packageName,
          fromVersion: update.currentVersion,
          toVersion: update.newVersion,
          updateType: update.updateType,
        })

        // Log security update notification
        if (isSecurityUpdate && config.security?.notifyOnSecurityUpdate) {
          logger.info(
            `✅ Security fix applied: ${update.packageName}@${update.currentVersion} → ${update.newVersion}`
          )
        }
      } catch (error) {
        errors.push({
          catalogName: update.catalogName,
          packageName: update.packageName,
          error: error instanceof Error ? error.message : String(error),
          fatal: false,
        })
      }
    }

    // Track backup path for result
    let backupPath: string | undefined

    // Save workspace if not in dry-run mode
    if (!options.dryRun && updatedDependencies.length > 0) {
      try {
        // Create backup before saving if requested
        if (options.createBackup && this.backupService) {
          const workspaceYamlPath = path.join(workspacePath.toString(), 'pnpm-workspace.yaml')
          try {
            backupPath = await this.backupService.createBackup(workspaceYamlPath)
            logger.info(`Backup created before update`, { backupPath })
          } catch (backupError) {
            // Backup failure should not block updates, but log warning
            logger.warn(`Failed to create backup, proceeding with update`, {
              error: backupError instanceof Error ? backupError.message : String(backupError),
              workspacePath: workspacePath.toString(),
            })
          }
        } else if (options.createBackup && !this.backupService) {
          logger.warn(`createBackup option is enabled but BackupService is not configured`)
        }

        await this.workspaceRepository.save(workspace)

        // Show summary of security updates if any
        if (securityUpdates.length > 0 && config.security?.notifyOnSecurityUpdate) {
          logger.info(`\n🔒 Security Updates Summary:`)
          logger.info(`   Applied ${securityUpdates.length} security fix(es):`)
          securityUpdates.forEach((update) => logger.info(`   • ${update}`))
        }

        // Show summary of synced version updates
        this.logSyncUpdateSummary(updatedDependencies, plan)

        // Show catalog priority resolution if any
        this.logCatalogPriorityResolution(plan)
      } catch (error) {
        errors.push({
          catalogName: '',
          packageName: '',
          error: `Failed to save workspace: ${error}`,
          fatal: true,
        })
      }
    }

    return {
      success: errors.filter((e) => e.fatal).length === 0,
      workspace: plan.workspace,
      updatedDependencies,
      skippedDependencies,
      errors,
      totalUpdated: updatedDependencies.length,
      totalSkipped: skippedDependencies.length,
      totalErrors: errors.length,
      backupPath,
    }
  }

  /**
   * Log summary of synced version updates
   */
  private logSyncUpdateSummary(updatedDependencies: UpdatedDependency[], plan: UpdatePlan): void {
    const syncUpdates = updatedDependencies.filter((u) =>
      plan.updates.find(
        (pu) =>
          pu.packageName === u.packageName &&
          pu.catalogName === u.catalogName &&
          pu.reason.includes('Sync version')
      )
    )

    if (syncUpdates.length > 0) {
      logger.info(`\n🔄 Version Sync Summary:`)
      const syncedPackages = new Set(syncUpdates.map((u) => u.packageName))
      logger.info(`   Synchronized ${syncedPackages.size} package(s) across catalogs:`)

      // Group by package name
      const syncByPackage = new Map<string, typeof syncUpdates>()
      syncUpdates.forEach((update) => {
        const updates = syncByPackage.get(update.packageName)
        if (updates) {
          updates.push(update)
        } else {
          syncByPackage.set(update.packageName, [update])
        }
      })

      syncByPackage.forEach((updates, packageName) => {
        const catalogs = updates.map((u) => u.catalogName).join(', ')
        const version = updates[0]?.toVersion
        logger.info(`   • ${packageName}@${version} in catalogs: ${catalogs}`)
      })
    }
  }

  /**
   * Log catalog priority resolution if any
   */
  private logCatalogPriorityResolution(plan: UpdatePlan): void {
    if (
      plan.hasConflicts &&
      plan.conflicts.some((c) => c.recommendation.includes('Priority catalog'))
    ) {
      logger.info(`\n📋 Catalog Priority Resolutions:`)
      plan.conflicts
        .filter((c) => c.recommendation.includes('Priority catalog'))
        .forEach((conflict) => {
          logger.info(`   • ${conflict.packageName}: ${conflict.recommendation}`)
        })
    }
  }
}
