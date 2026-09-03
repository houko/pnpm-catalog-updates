/**
 * Update Plan Service
 *
 * Responsible for planning catalog dependency updates.
 * Extracted from CatalogUpdateService for better separation of concerns.
 */

import { ConfigLoader, t } from '@pcu/utils'
import type { Catalog } from '../../domain/entities/catalog.js'
import type { Workspace } from '../../domain/entities/workspace.js'
import type { WorkspaceRepository } from '../../domain/repositories/workspaceRepository.js'
import { WorkspacePath } from '../../domain/value-objects/workspacePath.js'
import type { NpmRegistryService } from '../../infrastructure/external-services/npmRegistryService.js'
import type {
  CatalogCheckService,
  CheckOptions,
  OutdatedDependencyInfo,
} from './catalogCheckService.js'

export interface UpdateOptions extends CheckOptions {
  interactive?: boolean
  dryRun?: boolean
  force?: boolean
  createBackup?: boolean
  /** Fail without saving when a requested backup cannot be created. */
  requireBackup?: boolean
}

export interface UpdatePlan {
  workspace: {
    path: string
    name: string
  }
  updates: PlannedUpdate[]
  conflicts: VersionConflict[]
  totalUpdates: number
  hasConflicts: boolean
}

export interface PlannedUpdate {
  catalogName: string
  packageName: string
  currentVersion: string
  newVersion: string
  updateType: 'major' | 'minor' | 'patch'
  reason: string
  affectedPackages: string[]
  requireConfirmation?: boolean
  autoUpdate?: boolean
  groupUpdate?: boolean
}

export interface VersionConflict {
  packageName: string
  catalogs: Array<{
    catalogName: string
    currentVersion: string
    proposedVersion: string
  }>
  recommendation: string
}

export class UpdatePlanService {
  constructor(
    private readonly workspaceRepository: WorkspaceRepository,
    private readonly registryService: NpmRegistryService,
    private readonly checkService: CatalogCheckService
  ) {}

  /**
   * Plan catalog dependency updates
   */
  async planUpdates(options: UpdateOptions): Promise<UpdatePlan> {
    const outdatedReport = await this.checkService.checkOutdatedDependencies(options)

    const updates: PlannedUpdate[] = []
    const conflicts: VersionConflict[] = []

    // Load configuration for package rules and monorepo settings
    const workspacePath = options.workspacePath || process.cwd()
    const config = await ConfigLoader.loadConfig(workspacePath)

    // Convert outdated dependencies to planned updates
    for (const catalogInfo of outdatedReport.catalogs) {
      for (const outdated of catalogInfo.outdatedDependencies) {
        // Get package-specific configuration
        const packageConfig = ConfigLoader.getPackageConfig(outdated.packageName, config)

        const update: PlannedUpdate = {
          catalogName: catalogInfo.catalogName,
          packageName: outdated.packageName,
          currentVersion: outdated.currentVersion,
          newVersion: outdated.latestVersion,
          updateType: outdated.updateType,
          reason: this.getUpdateReason(outdated),
          affectedPackages: outdated.affectedPackages,
          requireConfirmation: packageConfig.requireConfirmation,
          autoUpdate: packageConfig.autoUpdate,
          groupUpdate: packageConfig.groupUpdate,
        }

        updates.push(update)
      }
    }

    // Handle syncVersions - ensure packages in syncVersions list are synchronized across catalogs
    if (config.monorepo?.syncVersions && config.monorepo.syncVersions.length > 0) {
      const workspacePathObj = WorkspacePath.fromString(workspacePath)
      const workspace = await this.workspaceRepository.findByPath(workspacePathObj)

      if (workspace) {
        updates.push(
          ...(await this.createSyncVersionUpdates(config.monorepo.syncVersions, workspace, updates))
        )
      }
    }

    // Detect conflicts (same package in multiple catalogs with different versions)
    const packageCatalogMap = new Map<string, PlannedUpdate[]>()

    for (const update of updates) {
      const packageUpdates = packageCatalogMap.get(update.packageName)
      if (packageUpdates) {
        packageUpdates.push(update)
      } else {
        packageCatalogMap.set(update.packageName, [update])
      }
    }

    // Handle conflicts with catalogPriority
    for (const [packageName, packageUpdates] of packageCatalogMap) {
      if (packageUpdates.length > 1) {
        const uniqueVersions = new Set(packageUpdates.map((u) => u.newVersion))
        if (uniqueVersions.size > 1) {
          const resolvedConflict = this.resolveVersionConflict(
            packageName,
            packageUpdates,
            config.monorepo?.catalogPriority || ['default']
          )

          if (resolvedConflict) {
            conflicts.push(resolvedConflict)
          }
        }
      }
    }

    return {
      workspace: outdatedReport.workspace,
      updates,
      conflicts,
      totalUpdates: updates.length,
      hasConflicts: conflicts.length > 0,
    }
  }

  /**
   * Generate update reason description
   * DOC-001: Uses i18n translation keys for localization
   */
  getUpdateReason(outdated: OutdatedDependencyInfo): string {
    if (outdated.isSecurityUpdate) {
      return t('update.reason.security')
    }

    switch (outdated.updateType) {
      case 'major':
        return t('update.reason.major')
      case 'minor':
        return t('update.reason.minor')
      case 'patch':
        return t('update.reason.patch')
      default:
        return t('update.reason.default')
    }
  }

  /**
   * Create sync version updates for packages that should be synchronized across catalogs
   * PERF-001: Optimized to use batch queries instead of sequential network requests
   */
  async createSyncVersionUpdates(
    syncVersions: string[],
    workspace: Workspace,
    existingUpdates: PlannedUpdate[]
  ): Promise<PlannedUpdate[]> {
    const syncUpdates: PlannedUpdate[] = []
    const catalogs = workspace.getCatalogs()
    const allCatalogs = catalogs.getAll()

    // Phase 1: Collect packages that need version queries (not in existingUpdates)
    // and filter to only those in multiple catalogs
    const packagesNeedingQuery: string[] = []
    const packageCatalogMap = new Map<
      string,
      { catalogs: Catalog[]; existingUpdate?: PlannedUpdate }
    >()

    for (const packageName of syncVersions) {
      // Check if this package exists in multiple catalogs
      const catalogsWithPackage = allCatalogs.filter((catalog: Catalog | undefined) =>
        catalog?.getDependencyVersion(packageName)
      ) as Catalog[]

      if (catalogsWithPackage.length <= 1) {
        continue // No need to sync if package is only in one catalog
      }

      const existingUpdate = existingUpdates.find((u) => u.packageName === packageName)
      packageCatalogMap.set(packageName, {
        catalogs: catalogsWithPackage,
        existingUpdate,
      })

      // Only query if no existing update provides the version
      if (!existingUpdate) {
        packagesNeedingQuery.push(packageName)
      }
    }

    // Phase 2: Batch query all packages that need version info (parallel)
    const versionMap = new Map<string, string>()

    if (packagesNeedingQuery.length > 0) {
      const batchResult = await this.registryService.batchQueryVersions(packagesNeedingQuery)

      // Extract latest versions from successful queries
      for (const [packageName, packageInfo] of batchResult.results) {
        versionMap.set(packageName, packageInfo.latestVersion)
      }

      // Log failures (already handled by batchQueryVersions)
      // Failed packages will simply not be in versionMap
    }

    // Phase 3: Create sync updates using collected version info
    for (const [
      packageName,
      { catalogs: catalogsWithPackage, existingUpdate },
    ] of packageCatalogMap) {
      let targetVersion: string | null = null
      let targetUpdateType: 'major' | 'minor' | 'patch' = 'patch'

      if (existingUpdate) {
        targetVersion = existingUpdate.newVersion
        targetUpdateType = existingUpdate.updateType
      } else {
        targetVersion = versionMap.get(packageName) || null
      }

      if (!targetVersion) continue

      // Create sync updates for all catalogs that need updating
      for (const catalog of catalogsWithPackage) {
        const currentRange = catalog.getDependencyVersion(packageName)
        if (!currentRange) continue

        const currentVersion = currentRange.getMinVersion()
        if (!currentVersion) continue

        const currentVersionString = currentVersion.toString()

        // Skip if already at target version
        if (currentVersionString === targetVersion) continue

        // Check if this update already exists
        const existingUpdateForCatalog = existingUpdates.find(
          (u) => u.packageName === packageName && u.catalogName === catalog.getName()
        )

        if (existingUpdateForCatalog) {
          // Update the existing update to use the sync version
          existingUpdateForCatalog.newVersion = targetVersion
          existingUpdateForCatalog.reason = `Sync version across catalogs: ${existingUpdateForCatalog.reason}`
        } else {
          // Create new sync update
          const affectedPackages = workspace
            .getPackagesUsingCatalogDependency(catalog.getName(), packageName)
            .getPackageNames()

          const syncUpdate: PlannedUpdate = {
            catalogName: catalog.getName(),
            packageName: packageName,
            currentVersion: currentVersionString,
            newVersion: targetVersion,
            updateType: targetUpdateType,
            reason: `Sync version with other catalogs`,
            affectedPackages,
            requireConfirmation: true, // Sync updates should be confirmed
            autoUpdate: false,
            groupUpdate: true,
          }

          syncUpdates.push(syncUpdate)
        }
      }
    }

    return syncUpdates
  }

  /**
   * Resolve version conflicts using catalog priority
   */
  resolveVersionConflict(
    packageName: string,
    packageUpdates: PlannedUpdate[],
    catalogPriority: string[]
  ): VersionConflict | null {
    // Find the highest priority catalog with an update for this package
    let priorityCatalog: PlannedUpdate | null = null

    for (const catalogName of catalogPriority) {
      const catalogUpdate = packageUpdates.find((u) => u.catalogName === catalogName)
      if (catalogUpdate) {
        priorityCatalog = catalogUpdate
        break
      }
    }

    // If no priority catalog found, use the first one
    if (!priorityCatalog) {
      priorityCatalog = packageUpdates[0] || null
    }

    // Update all other catalogs to use the priority catalog's version
    const priorityVersion = priorityCatalog?.newVersion
    if (priorityVersion && priorityCatalog) {
      for (const update of packageUpdates) {
        if (update.catalogName !== priorityCatalog.catalogName) {
          update.newVersion = priorityVersion
          update.reason = `Using version from priority catalog (${priorityCatalog.catalogName}): ${update.reason}`
        }
      }
    }

    // Create conflict record for reporting
    const uniqueVersions = new Set(packageUpdates.map((u) => u.newVersion))
    if (uniqueVersions.size > 1) {
      return {
        packageName,
        catalogs: packageUpdates.map((u) => ({
          catalogName: u.catalogName,
          currentVersion: u.currentVersion,
          proposedVersion: u.newVersion,
        })),
        recommendation: `Resolved using catalog priority. Priority catalog '${priorityCatalog?.catalogName}' version '${priorityVersion}' selected.`,
      }
    }

    return null
  }
}
