/**
 * Catalog Check Service
 *
 * Responsible for checking outdated catalog dependencies.
 * Extracted from CatalogUpdateService for better separation of concerns.
 */

import {
  CatalogNotFoundError,
  ConfigLoader,
  InvalidVersionError,
  logger,
  type PackageFilterConfig,
  PackageNotFoundError,
  parallelLimit,
  t,
  toError,
  UserFriendlyErrorHandler,
} from '@pcu/utils'
import type { Catalog } from '../../domain/entities/catalog.js'
import type { Workspace } from '../../domain/entities/workspace.js'
import type { WorkspaceRepository } from '../../domain/repositories/workspaceRepository.js'
import { Version, type VersionRange } from '../../domain/value-objects/version.js'
import { WorkspacePath } from '../../domain/value-objects/workspacePath.js'
import type { NpmRegistryService } from '../../infrastructure/external-services/npmRegistryService.js'
import { ConcurrentProgressTracker, type ProgressReporter } from '../interfaces/progressReporter.js'

export interface CheckOptions {
  workspacePath?: string | undefined
  catalogName?: string | undefined
  target?: UpdateTarget | undefined
  includePrerelease?: boolean | undefined
  exclude?: string[] | undefined
  include?: string[] | undefined
  progressReporter?: ProgressReporter | null
  /** Skip security vulnerability checks (default: false) */
  noSecurity?: boolean | undefined
}

export interface OutdatedReport {
  workspace: {
    path: string
    name: string
  }
  catalogs: CatalogUpdateInfo[]
  totalOutdated: number
  hasUpdates: boolean
}

export interface CatalogUpdateInfo {
  catalogName: string
  outdatedDependencies: OutdatedDependencyInfo[]
  totalPackages: number
  outdatedCount: number
}

export interface OutdatedDependencyInfo {
  packageName: string
  currentVersion: string
  latestVersion: string
  wantedVersion: string
  updateType: 'major' | 'minor' | 'patch'
  isSecurityUpdate: boolean
  affectedPackages: string[]
}

export type UpdateTarget = 'latest' | 'greatest' | 'minor' | 'patch' | 'newest'

export class CatalogCheckService {
  constructor(
    private readonly workspaceRepository: WorkspaceRepository,
    private readonly registryService: NpmRegistryService
  ) {}

  /**
   * Check for outdated catalog dependencies
   */
  async checkOutdatedDependencies(options: CheckOptions = {}): Promise<OutdatedReport> {
    const workspacePath = WorkspacePath.fromString(options.workspacePath || process.cwd())

    // Load configuration and merge CLI options into config defaults
    // This ensures --target and other CLI options are passed to the filtering logic
    const config = await ConfigLoader.loadConfig(workspacePath.toString())
    const configWithOptions: PackageFilterConfig = {
      ...config,
      include:
        options.include && options.include.length > 0 ? options.include : (config.include ?? []),
      exclude:
        options.exclude && options.exclude.length > 0 ? options.exclude : (config.exclude ?? []),
      defaults: {
        ...config.defaults,
        target: options.target ?? config.defaults?.target,
        includePrerelease: options.includePrerelease ?? config.defaults?.includePrerelease ?? false,
      },
    }

    // Load workspace (getByPath throws WorkspaceNotFoundError if not found)
    const workspace = await this.workspaceRepository.getByPath(workspacePath)

    const catalogs = workspace.getCatalogs()
    const catalogInfos: CatalogUpdateInfo[] = []
    let totalOutdated = 0

    // Filter catalogs if specific catalog requested
    const catalogsToCheck = options.catalogName
      ? [catalogs.get(options.catalogName)].filter(Boolean)
      : catalogs.getAll()

    if (catalogsToCheck.length === 0) {
      if (options.catalogName) {
        throw new CatalogNotFoundError(options.catalogName, catalogs.getCatalogNames())
      }
      throw new CatalogNotFoundError('default', [])
    }

    // Get filtered packages from all catalogs
    const filteredPackagesByCatalog = this.getFilteredPackagesFromCatalogs(
      catalogsToCheck,
      configWithOptions
    )

    // Calculate total packages across all catalogs
    let totalPackages = 0
    for (const packages of filteredPackagesByCatalog.values()) {
      totalPackages += packages.length
    }

    // Create a concurrent progress tracker for thread-safe progress updates
    const progressTracker = new ConcurrentProgressTracker(
      options.progressReporter ?? null,
      totalPackages
    )

    if (progressTracker.isActive()) {
      progressTracker.start(t('progress.checkingPackages', { count: totalPackages }))
    }

    // Process catalogs in parallel
    const catalogPromises = catalogsToCheck.map(async (catalog) => {
      if (!catalog) {
        throw new CatalogNotFoundError(
          catalogsToCheck[0]?.getName() || 'unknown',
          catalogs.getCatalogNames()
        )
      }

      // Get pre-filtered packages for this catalog
      const packagesToCheck = filteredPackagesByCatalog.get(catalog) || []

      // Process packages in parallel with concurrency control
      const outdatedDependencies = await this.processPackagesInParallel(
        packagesToCheck,
        catalog,
        workspace,
        config,
        options,
        progressTracker
      )

      const catalogInfo: CatalogUpdateInfo = {
        catalogName: catalog.getName(),
        outdatedDependencies,
        totalPackages: catalog.getDependencies().size,
        outdatedCount: outdatedDependencies.length,
      }

      return catalogInfo
    })

    // Wait for all catalogs to be processed in parallel
    const catalogResults = await Promise.all(catalogPromises)

    // Aggregate results
    for (const catalogInfo of catalogResults) {
      catalogInfos.push(catalogInfo)
      totalOutdated += catalogInfo.outdatedCount
    }

    // Complete the progress bar
    if (progressTracker.isActive()) {
      if (totalOutdated > 0) {
        progressTracker.success(t('progress.checkCompleteWithUpdates', { count: totalOutdated }))
      } else {
        progressTracker.success(t('progress.checkCompleteNoUpdates'))
      }
    }

    return {
      workspace: {
        path: workspacePath.toString(),
        name: workspacePath.getDirectoryName(),
      },
      catalogs: catalogInfos,
      totalOutdated,
      hasUpdates: totalOutdated > 0,
    }
  }

  /**
   * Get filtered packages from catalogs based on configuration
   */
  getFilteredPackagesFromCatalogs(
    catalogsToCheck: (Catalog | undefined)[],
    config: PackageFilterConfig
  ): Map<Catalog, Array<[string, VersionRange]>> {
    const result = new Map<Catalog, Array<[string, VersionRange]>>()

    for (const catalog of catalogsToCheck) {
      if (!catalog) continue

      const dependencies = catalog.getDependencies()
      const packageArray = Array.from(dependencies)

      const packagesToCheck = packageArray.filter(([packageName]) => {
        const packageConfig = ConfigLoader.getPackageConfig(packageName, config)
        return packageConfig.shouldUpdate
      })

      result.set(catalog, packagesToCheck)
    }

    return result
  }

  /**
   * Process packages in parallel with concurrency control and progress tracking
   */
  private async processPackagesInParallel(
    packagesToCheck: Array<[string, VersionRange]>,
    catalog: Catalog,
    workspace: Workspace,
    config: PackageFilterConfig,
    options: CheckOptions,
    progressTracker: ConcurrentProgressTracker
  ): Promise<OutdatedDependencyInfo[]> {
    const concurrency = config.advanced?.concurrency || 8
    const outdatedDependencies: OutdatedDependencyInfo[] = []

    await parallelLimit(
      packagesToCheck,
      async ([packageName, currentRange]) => {
        try {
          const result = await this.processPackageCheck(
            packageName,
            currentRange,
            catalog,
            workspace,
            config,
            options
          )

          if (progressTracker.isActive()) {
            await progressTracker.increment(t('progress.checkingPackage', { packageName }))
          }

          if (result) {
            outdatedDependencies.push(result)
          }
        } catch (error) {
          if (progressTracker.isActive()) {
            await progressTracker.increment(t('progress.skippingPackage', { packageName }))
          }

          UserFriendlyErrorHandler.handlePackageQueryFailure(packageName, toError(error), {
            operation: 'check',
          })
        }
      },
      concurrency
    )

    return outdatedDependencies
  }

  /**
   * Process a single package check
   */
  private async processPackageCheck(
    packageName: string,
    currentRange: VersionRange,
    catalog: Catalog,
    workspace: Workspace,
    config: PackageFilterConfig,
    options: CheckOptions
  ): Promise<OutdatedDependencyInfo | null> {
    const packageConfig = ConfigLoader.getPackageConfig(packageName, config)
    const effectiveTarget = (options.target || packageConfig.target || 'latest') as UpdateTarget
    // PERF-003: Determine skipSecurityCheck once and pass to checkPackageUpdate
    const skipSecurityCheck = options.noSecurity || config.security?.enableCheck === false

    const outdatedInfo = await this.checkPackageUpdate(
      packageName,
      currentRange,
      effectiveTarget,
      options.includePrerelease || config.defaults?.includePrerelease || false,
      skipSecurityCheck
    )

    if (!outdatedInfo) {
      return null
    }

    // PERF-003: Use the security check result from checkPackageUpdate instead of calling again
    // The security check was already done in checkPackageUpdate and result is in outdatedInfo.isSecurityUpdate
    const hasSecurityVulnerabilities = outdatedInfo.isSecurityUpdate

    // If autoFixVulnerabilities is enabled and package has vulnerabilities, try to find a major update
    if (
      !skipSecurityCheck &&
      config.security?.autoFixVulnerabilities &&
      hasSecurityVulnerabilities &&
      config.security.allowMajorForSecurity
    ) {
      try {
        const securityFixInfo = await this.checkPackageUpdate(
          packageName,
          currentRange,
          'latest',
          options.includePrerelease || config.defaults?.includePrerelease || false,
          true // Skip security check for this call since we already know there are vulnerabilities
        )
        if (securityFixInfo) {
          Object.assign(outdatedInfo, securityFixInfo)
        }
      } catch (error) {
        UserFriendlyErrorHandler.handleSecurityCheckFailure(packageName, toError(error))
      }
    }

    const affectedPackages = workspace
      .getPackagesUsingCatalogDependency(catalog.getName(), packageName)
      .getPackageNames()

    if (hasSecurityVulnerabilities && config.security?.notifyOnSecurityUpdate) {
      logger.warn(
        `🔒 Security vulnerability detected in ${packageName}@${outdatedInfo.currentVersion}`
      )
    }

    return {
      ...outdatedInfo,
      affectedPackages,
      isSecurityUpdate: hasSecurityVulnerabilities || outdatedInfo.isSecurityUpdate,
    }
  }

  /**
   * Check if a package needs updating
   */
  async checkPackageUpdate(
    packageName: string,
    currentRange: VersionRange,
    target: UpdateTarget,
    includePrerelease: boolean,
    skipSecurityCheck = false
  ): Promise<OutdatedDependencyInfo | null> {
    try {
      const versionInfo = await this.registryService.getPackageVersions(packageName)

      let targetVersion: Version

      switch (target) {
        case 'latest':
          targetVersion = Version.fromString(versionInfo.latestVersion)
          break
        case 'greatest':
          targetVersion = await this.registryService.getGreatestVersion(packageName)
          break
        case 'newest': {
          const newestVersions = await this.registryService.getNewestVersions(packageName, 1)
          if (!newestVersions[0]) {
            throw new PackageNotFoundError(packageName, undefined, new Error('No versions found'))
          }
          targetVersion = newestVersions[0]
          break
        }
        case 'minor':
        case 'patch':
          targetVersion = await this.getConstrainedVersion(packageName, currentRange, target)
          break
        default:
          targetVersion = Version.fromString(versionInfo.latestVersion)
      }

      if (!includePrerelease && targetVersion.isPrerelease()) {
        return null
      }

      const currentVersion = currentRange.getMinVersion()
      if (!currentVersion) {
        return null
      }

      if (!targetVersion.isNewerThan(currentVersion)) {
        return null
      }

      const updateType = currentVersion.getDifferenceType(targetVersion)

      let isSecurityUpdate = false
      if (!skipSecurityCheck) {
        try {
          const securityReport = await this.registryService.checkSecurityVulnerabilities(
            packageName,
            currentVersion.toString()
          )
          isSecurityUpdate = securityReport.hasVulnerabilities
        } catch (error) {
          UserFriendlyErrorHandler.handleSecurityCheckFailure(packageName, toError(error))
        }
      }

      return {
        packageName,
        currentVersion: currentVersion.toString(),
        latestVersion: targetVersion.toString(),
        wantedVersion: targetVersion.toString(),
        updateType: updateType as 'major' | 'minor' | 'patch',
        isSecurityUpdate,
        affectedPackages: [],
      }
    } catch (error) {
      UserFriendlyErrorHandler.handlePackageQueryFailure(packageName, toError(error), {
        operation: 'update-check',
      })
      return null
    }
  }

  /**
   * Get version constrained by update type
   */
  private async getConstrainedVersion(
    packageName: string,
    currentRange: VersionRange,
    constraint: 'minor' | 'patch'
  ): Promise<Version> {
    const currentVersion = currentRange.getMinVersion()
    if (!currentVersion) {
      throw new InvalidVersionError(
        currentRange.toString(),
        `Cannot determine current version for ${packageName}`
      )
    }

    const versionInfo = await this.registryService.getPackageVersions(packageName)

    const compatibleVersions = versionInfo.versions.filter((v) => {
      try {
        const version = Version.fromString(v)
        const diff = currentVersion.getDifferenceType(version)

        if (constraint === 'patch') {
          return diff === 'patch' || diff === 'same'
        } else if (constraint === 'minor') {
          return diff === 'minor' || diff === 'patch' || diff === 'same'
        }

        return false
      } catch (error) {
        logger.error(String(error))
        throw error
      }
    })

    if (compatibleVersions.length === 0) {
      return currentVersion
    }

    if (!compatibleVersions[0]) {
      throw new PackageNotFoundError(
        packageName,
        undefined,
        new Error('No compatible versions found')
      )
    }
    return Version.fromString(compatibleVersions[0])
  }
}
