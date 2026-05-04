/**
 * Catalog Update Service
 *
 * Facade service that orchestrates catalog dependency updates.
 * Delegates to specialized services for check, plan, and execute operations.
 *
 * Refactored from a god class (~1163 lines) to a facade pattern
 * delegating to:
 * - CatalogCheckService: Check for outdated dependencies
 * - UpdatePlanService: Plan updates with conflict resolution
 * - UpdateExecutorService: Execute updates with rollback support
 *
 * Default workspace path resolution is configurable via deps.getDefaultPath
 * to decouple core business logic from runtime environment (process.cwd).
 */

import {
  type AdvancedConfig,
  CatalogNotFoundError,
  ConfigLoader,
  InvalidVersionError,
  PackageNotFoundError,
} from '@pcu/utils'
import type { WorkspaceRepository } from '../../domain/repositories/workspaceRepository.js'
import { Version } from '../../domain/value-objects/version.js'
import { WorkspacePath } from '../../domain/value-objects/workspacePath.js'
import { NpmRegistryService } from '../../infrastructure/external-services/npmRegistryService.js'
import { BackupService } from './backupService.js'
import {
  CatalogCheckService,
  type CatalogUpdateInfo,
  type CheckOptions,
  type OutdatedDependencyInfo,
  type OutdatedReport,
  type UpdateTarget,
} from './catalogCheckService.js'
import {
  ImpactAnalysisService,
  type PackageImpact,
  type SecurityImpact,
} from './impactAnalysisService.js'
import {
  type SkippedDependency,
  type UpdatedDependency,
  type UpdateError,
  UpdateExecutorService,
  type UpdateResult,
} from './updateExecutorService.js'
import {
  type PlannedUpdate,
  type UpdateOptions,
  type UpdatePlan,
  UpdatePlanService,
  type VersionConflict,
} from './updatePlanService.js'

// Re-export all types for backward compatibility
export type {
  CatalogUpdateInfo,
  CheckOptions,
  OutdatedDependencyInfo,
  OutdatedReport,
  PackageImpact,
  PlannedUpdate,
  SecurityImpact,
  SkippedDependency,
  UpdatedDependency,
  UpdateError,
  UpdateOptions,
  UpdatePlan,
  UpdateResult,
  UpdateTarget,
  VersionConflict,
}

export interface ImpactAnalysis {
  packageName: string
  catalogName: string
  currentVersion: string
  proposedVersion: string
  updateType: 'major' | 'minor' | 'patch'
  affectedPackages: PackageImpact[]
  riskLevel: 'low' | 'medium' | 'high'
  securityImpact: SecurityImpact
  recommendations: string[]
}

/**
 * Optional service dependencies for CatalogUpdateService.
 * Enables dependency injection for better testability while maintaining backward compatibility.
 * Added getDefaultPath to decouple from process.cwd().
 */
export interface CatalogUpdateServiceDeps {
  checkService?: CatalogCheckService
  planService?: UpdatePlanService
  executorService?: UpdateExecutorService
  impactAnalysisService?: ImpactAnalysisService
  backupService?: BackupService
  /** Override default path resolution (defaults to process.cwd) */
  getDefaultPath?: () => string
}

export class CatalogUpdateService {
  private readonly checkService: CatalogCheckService
  private readonly planService: UpdatePlanService
  private readonly executorService: UpdateExecutorService
  private readonly impactAnalysisService: ImpactAnalysisService
  /** Configurable default path resolver */
  private readonly getDefaultPath: () => string

  /**
   * Create a CatalogUpdateService
   *
   * Refactored to support dependency injection:
   * - Optional deps parameter allows injecting mock services for testing
   * - Backward compatible: falls back to creating default instances
   * - Added getDefaultPath for decoupling from process.cwd()
   *
   * @param workspaceRepository - Repository for workspace operations
   * @param registryService - NPM registry service
   * @param deps - Optional service dependencies for testing/customization
   */
  constructor(
    private readonly workspaceRepository: WorkspaceRepository,
    registryService: NpmRegistryService,
    deps: CatalogUpdateServiceDeps = {}
  ) {
    // Use injected path resolver or default to process.cwd
    this.getDefaultPath = deps.getDefaultPath ?? (() => process.cwd())

    // Use injected services or create defaults
    this.checkService =
      deps.checkService ?? new CatalogCheckService(workspaceRepository, registryService)

    this.planService =
      deps.planService ??
      new UpdatePlanService(workspaceRepository, registryService, this.checkService)

    const backupService = deps.backupService ?? new BackupService()

    this.executorService =
      deps.executorService ??
      new UpdateExecutorService(workspaceRepository, registryService, backupService)

    this.impactAnalysisService =
      deps.impactAnalysisService ?? new ImpactAnalysisService(registryService)
  }

  /**
   * Create a new CatalogUpdateService with advanced configuration (async version)
   * This properly handles async npmrc parsing for scoped registries
   */
  static async createWithConfig(
    workspaceRepository: WorkspaceRepository,
    workspacePath?: string
  ): Promise<CatalogUpdateService> {
    const config = await ConfigLoader.loadConfig(workspacePath || process.cwd())

    // Create registry service with advanced configuration
    const advancedConfig: AdvancedConfig = {}

    if (config.advanced?.concurrency !== undefined) {
      advancedConfig.concurrency = config.advanced.concurrency
    }
    if (config.advanced?.timeout !== undefined) {
      advancedConfig.timeout = config.advanced.timeout
    }
    if (config.advanced?.retries !== undefined) {
      advancedConfig.retries = config.advanced.retries
    }
    if (config.advanced?.cacheValidityMinutes !== undefined) {
      advancedConfig.cacheValidityMinutes = config.advanced.cacheValidityMinutes
    }
    if (config.advanced?.npmDownloadsApiUrl !== undefined) {
      advancedConfig.npmDownloadsApiUrl = config.advanced.npmDownloadsApiUrl
    }

    // Use configured registry or default, npmrc will handle scoped registries
    const registryUrl = config.advanced?.registry || 'https://registry.npmjs.org/'
    const workingDirectory = workspacePath || process.cwd()

    // Use async factory method for proper npmrc parsing
    const registryService = await NpmRegistryService.create(
      registryUrl,
      advancedConfig,
      workingDirectory
    )

    return new CatalogUpdateService(workspaceRepository, registryService)
  }

  /**
   * Check for outdated catalog dependencies
   * Delegates to CatalogCheckService
   */
  async checkOutdatedDependencies(options: CheckOptions = {}): Promise<OutdatedReport> {
    return this.checkService.checkOutdatedDependencies(options)
  }

  /**
   * Plan catalog dependency updates
   * Delegates to UpdatePlanService
   */
  async planUpdates(options: UpdateOptions): Promise<UpdatePlan> {
    return this.planService.planUpdates(options)
  }

  /**
   * Execute catalog dependency updates
   * Delegates to UpdateExecutorService
   */
  async executeUpdates(plan: UpdatePlan, options: UpdateOptions): Promise<UpdateResult> {
    return this.executorService.executeUpdates(plan, options)
  }

  /**
   * Find which catalog contains a specific package
   * Returns the first catalog found containing the package, or null if not found
   */
  async findCatalogForPackage(packageName: string, workspacePath?: string): Promise<string | null> {
    // Use configurable path resolver instead of direct process.cwd()
    const wsPath = WorkspacePath.fromString(workspacePath || this.getDefaultPath())

    const workspace = await this.workspaceRepository.findByPath(wsPath)
    if (!workspace) {
      return null
    }

    const catalogs = workspace.getCatalogs()
    for (const catalog of catalogs.getAll()) {
      if (catalog?.getDependencyVersion(packageName)) {
        return catalog.getName()
      }
    }

    return null
  }

  /**
   * Analyze the impact of updating a specific dependency
   */
  async analyzeImpact(
    catalogName: string,
    packageName: string,
    newVersion: string,
    workspacePath?: string
  ): Promise<ImpactAnalysis> {
    // Use configurable path resolver instead of direct process.cwd()
    const wsPath = WorkspacePath.fromString(workspacePath || this.getDefaultPath())

    // Load workspace (getByPath throws WorkspaceNotFoundError if not found)
    const workspace = await this.workspaceRepository.getByPath(wsPath)

    const catalog = workspace.getCatalogs().get(catalogName)
    if (!catalog) {
      throw new CatalogNotFoundError(catalogName, workspace.getCatalogs().getCatalogNames())
    }

    const currentRange = catalog.getDependencyVersion(packageName)
    if (!currentRange) {
      throw new PackageNotFoundError(packageName, catalogName)
    }

    const currentVersion = currentRange.toString()
    const proposedVersion = Version.fromString(newVersion)
    const currentVersionObj = currentRange.getMinVersion()

    if (!currentVersionObj) {
      throw new InvalidVersionError(
        currentRange.toString(),
        `Cannot determine current version for ${packageName}`
      )
    }

    const updateType = currentVersionObj.getDifferenceType(proposedVersion)

    // Get affected packages
    const affectedPackagesCollection = workspace.getPackagesUsingCatalogDependency(
      catalogName,
      packageName
    )
    const packageImpacts: PackageImpact[] = []

    for (const pkg of affectedPackagesCollection.getAll()) {
      const catalogRefs = pkg
        .getCatalogReferences()
        .filter(
          (ref) => ref.getCatalogName() === catalogName && ref.getPackageName() === packageName
        )

      for (const ref of catalogRefs) {
        const isBreakingChange = updateType === 'major'
        const compatibilityRisk = this.impactAnalysisService.assessCompatibilityRisk(updateType)

        packageImpacts.push({
          packageName: pkg.getName(),
          packagePath: pkg.getPath().toString(),
          dependencyType: ref.getDependencyType(),
          isBreakingChange,
          compatibilityRisk,
        })
      }
    }

    // Check security impact
    const securityImpact = await this.impactAnalysisService.analyzeSecurityImpact(
      packageName,
      currentVersion,
      newVersion
    )

    // Assess overall risk
    const riskLevel = this.impactAnalysisService.assessOverallRisk(
      updateType,
      packageImpacts,
      securityImpact
    )

    // Generate recommendations
    const recommendations = this.impactAnalysisService.generateRecommendations(
      updateType,
      securityImpact,
      packageImpacts
    )

    return {
      packageName,
      catalogName,
      currentVersion,
      proposedVersion: newVersion,
      updateType: updateType as 'major' | 'minor' | 'patch',
      affectedPackages: packageImpacts,
      riskLevel,
      securityImpact,
      recommendations,
    }
  }

  /**
   * Get the underlying check service for advanced usage
   */
  getCheckService(): CatalogCheckService {
    return this.checkService
  }

  /**
   * Get the underlying plan service for advanced usage
   */
  getPlanService(): UpdatePlanService {
    return this.planService
  }

  /**
   * Get the underlying executor service for advanced usage
   */
  getExecutorService(): UpdateExecutorService {
    return this.executorService
  }
}
