/**
 * Catalog Update Service
 *
 * Core application service that handles catalog dependency updates.
 * Orchestrates domain objects and infrastructure services to provide
 * high-level use cases for checking and updating catalog dependencies.
 */

import { AdvancedConfig, ConfigLoader, UserFriendlyErrorHandler } from '@pcu/utils';
import { WorkspaceRepository } from '../../domain/repositories/workspaceRepository.js';
import { Version, VersionRange } from '../../domain/value-objects/version.js';
import { WorkspacePath } from '../../domain/value-objects/workspacePath.js';
import { NpmRegistryService } from '../../infrastructure/external-services/npmRegistryService.js';
import { ProgressReporter } from '../interfaces/progressReporter.js';

export interface CheckOptions {
  workspacePath?: string | undefined;
  catalogName?: string | undefined;
  target?: UpdateTarget | undefined;
  includePrerelease?: boolean | undefined;
  exclude?: string[] | undefined;
  include?: string[] | undefined;
  progressReporter?: ProgressReporter | null;
}

export interface UpdateOptions extends CheckOptions {
  interactive?: boolean;
  dryRun?: boolean;
  force?: boolean;
  createBackup?: boolean;
}

export interface OutdatedReport {
  workspace: {
    path: string;
    name: string;
  };
  catalogs: CatalogUpdateInfo[];
  totalOutdated: number;
  hasUpdates: boolean;
}

export interface CatalogUpdateInfo {
  catalogName: string;
  outdatedDependencies: OutdatedDependencyInfo[];
  totalPackages: number;
  outdatedCount: number;
}

export interface OutdatedDependencyInfo {
  packageName: string;
  currentVersion: string;
  latestVersion: string;
  wantedVersion: string;
  updateType: 'major' | 'minor' | 'patch';
  isSecurityUpdate: boolean;
  affectedPackages: string[];
}

export interface UpdatePlan {
  workspace: {
    path: string;
    name: string;
  };
  updates: PlannedUpdate[];
  conflicts: VersionConflict[];
  totalUpdates: number;
  hasConflicts: boolean;
}

export interface PlannedUpdate {
  catalogName: string;
  packageName: string;
  currentVersion: string;
  newVersion: string;
  updateType: 'major' | 'minor' | 'patch';
  reason: string;
  affectedPackages: string[];
  requireConfirmation?: boolean;
  autoUpdate?: boolean;
  groupUpdate?: boolean;
}

export interface VersionConflict {
  packageName: string;
  catalogs: Array<{
    catalogName: string;
    currentVersion: string;
    proposedVersion: string;
  }>;
  recommendation: string;
}

export interface UpdateResult {
  success: boolean;
  workspace: {
    path: string;
    name: string;
  };
  updatedDependencies: UpdatedDependency[];
  skippedDependencies: SkippedDependency[];
  errors: UpdateError[];
  totalUpdated: number;
  totalSkipped: number;
  totalErrors: number;
}

export interface UpdatedDependency {
  catalogName: string;
  packageName: string;
  fromVersion: string;
  toVersion: string;
  updateType: 'major' | 'minor' | 'patch';
}

export interface SkippedDependency {
  catalogName: string;
  packageName: string;
  currentVersion: string;
  reason: string;
}

export interface UpdateError {
  catalogName: string;
  packageName: string;
  error: string;
  fatal: boolean;
}

export interface ImpactAnalysis {
  packageName: string;
  catalogName: string;
  currentVersion: string;
  proposedVersion: string;
  updateType: 'major' | 'minor' | 'patch';
  affectedPackages: PackageImpact[];
  riskLevel: 'low' | 'medium' | 'high';
  securityImpact: SecurityImpact;
  recommendations: string[];
}

export interface PackageImpact {
  packageName: string;
  packagePath: string;
  dependencyType: 'dependencies' | 'devDependencies' | 'peerDependencies' | 'optionalDependencies';
  isBreakingChange: boolean;
  compatibilityRisk: 'low' | 'medium' | 'high';
}

export interface SecurityImpact {
  hasVulnerabilities: boolean;
  fixedVulnerabilities: number;
  newVulnerabilities: number;
  severityChange: 'better' | 'worse' | 'same';
}

export type UpdateTarget = 'latest' | 'greatest' | 'minor' | 'patch' | 'newest';

export class CatalogUpdateService {
  constructor(
    private readonly workspaceRepository: WorkspaceRepository,
    private readonly registryService: NpmRegistryService
  ) {}

  /**
   * Create a new CatalogUpdateService with advanced configuration
   */
  static createWithConfig(
    workspaceRepository: WorkspaceRepository,
    workspacePath?: string
  ): CatalogUpdateService {
    const config = ConfigLoader.loadConfig(workspacePath || process.cwd());

    // Create registry service with advanced configuration
    const advancedConfig: AdvancedConfig = {};

    if (config.advanced?.concurrency !== undefined) {
      advancedConfig.concurrency = config.advanced.concurrency;
    }
    if (config.advanced?.timeout !== undefined) {
      advancedConfig.timeout = config.advanced.timeout;
    }
    if (config.advanced?.retries !== undefined) {
      advancedConfig.retries = config.advanced.retries;
    }
    if (config.advanced?.cacheValidityMinutes !== undefined) {
      advancedConfig.cacheValidityMinutes = config.advanced.cacheValidityMinutes;
    }

    // Use default registry for now, npmrc will handle scoped registries
    const registryUrl = 'https://registry.npmjs.org/';
    const workingDirectory = workspacePath || process.cwd();

    const registryService = new NpmRegistryService(registryUrl, advancedConfig, workingDirectory);

    return new CatalogUpdateService(workspaceRepository, registryService);
  }

  /**
   * Check for outdated catalog dependencies
   */
  async checkOutdatedDependencies(options: CheckOptions = {}): Promise<OutdatedReport> {
    const workspacePath = WorkspacePath.fromString(options.workspacePath || process.cwd());

    // Load configuration
    const config = ConfigLoader.loadConfig(workspacePath.toString());

    // Load workspace
    const workspace = await this.workspaceRepository.findByPath(workspacePath);
    if (!workspace) {
      throw new Error(`No pnpm workspace found at ${workspacePath.toString()}`);
    }

    const catalogs = workspace.getCatalogs();
    const catalogInfos: CatalogUpdateInfo[] = [];
    let totalOutdated = 0;

    // Filter catalogs if specific catalog requested
    const catalogsToCheck = options.catalogName
      ? [catalogs.get(options.catalogName)].filter(Boolean)
      : catalogs.getAll();

    if (catalogsToCheck.length === 0) {
      throw new Error(
        options.catalogName
          ? `Catalog "${options.catalogName}" not found`
          : 'No catalogs found in workspace'
      );
    }

    // Calculate total packages across all catalogs
    let totalPackages = 0;
    const allPackagesToCheck: Array<[string, any, any]> = [];

    for (const catalog of catalogsToCheck) {
      if (!catalog) continue;
      const dependencies = catalog.getDependencies();
      const packageArray = Array.from(dependencies);

      const packagesToCheck = packageArray.filter(([packageName]) => {
        const packageConfig = ConfigLoader.getPackageConfig(packageName, config);
        return packageConfig.shouldUpdate;
      });

      // Add catalog info to each package for processing
      packagesToCheck.forEach(([packageName, range]) => {
        allPackagesToCheck.push([packageName, range, catalog]);
      });

      totalPackages += packagesToCheck.length;
    }

    // Create a single progress bar for all catalogs
    let progressReporter: ProgressReporter | null = null;
    if (totalPackages > 0 && options.progressReporter) {
      progressReporter = options.progressReporter;
      progressReporter.start(`正在检查 ${totalPackages} 个依赖包...`, totalPackages);
    }

    let completed = 0;

    // Check each catalog for outdated dependencies
    for (const catalog of catalogsToCheck) {
      if (!catalog) {
        throw new Error(`Catalog "${catalogsToCheck[0]?.getName() || 'unknown'}" not found`);
      }
      const dependencies = catalog.getDependencies();

      // Convert to array for parallel processing
      const packageArray = Array.from(dependencies);

      // Filter packages that should be updated based on configuration
      const packagesToCheck = packageArray.filter(([packageName]) => {
        const packageConfig = ConfigLoader.getPackageConfig(packageName, config);
        return packageConfig.shouldUpdate;
      });

      // Process packages in parallel with concurrency control (pass progress info)
      const outdatedDependencies = await this.processPackagesInParallel(
        packagesToCheck,
        catalog,
        workspace,
        config,
        options,
        progressReporter,
        completed,
        totalPackages
      );

      // Update completed count
      completed += packagesToCheck.length;

      const catalogInfo: CatalogUpdateInfo = {
        catalogName: catalog!.getName(),
        outdatedDependencies,
        totalPackages: dependencies.size,
        outdatedCount: outdatedDependencies.length,
      };

      catalogInfos.push(catalogInfo);
      totalOutdated += outdatedDependencies.length;
    }

    // Complete the progress bar
    if (progressReporter) {
      if (totalOutdated > 0) {
        progressReporter.success(`✅ 检查完成! 发现 ${totalOutdated} 个可更新的依赖包`);
      } else {
        progressReporter.success('✅ 检查完成! 所有依赖包都是最新的');
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
    };
  }

  /**
   * Plan catalog dependency updates
   */
  async planUpdates(options: UpdateOptions): Promise<UpdatePlan> {
    const outdatedReport = await this.checkOutdatedDependencies(options);

    const updates: PlannedUpdate[] = [];
    const conflicts: VersionConflict[] = [];

    // Load configuration for package rules and monorepo settings
    const workspacePath = options.workspacePath || process.cwd();
    const config = ConfigLoader.loadConfig(workspacePath);

    // Convert outdated dependencies to planned updates
    for (const catalogInfo of outdatedReport.catalogs) {
      for (const outdated of catalogInfo.outdatedDependencies) {
        // Get package-specific configuration
        const packageConfig = ConfigLoader.getPackageConfig(outdated.packageName, config);

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
        };

        updates.push(update);
      }
    }

    // Handle syncVersions - ensure packages in syncVersions list are synchronized across catalogs
    if (config.monorepo?.syncVersions && config.monorepo.syncVersions.length > 0) {
      const workspacePathObj = WorkspacePath.fromString(workspacePath);
      const workspace = await this.workspaceRepository.findByPath(workspacePathObj);

      if (workspace) {
        updates.push(
          ...(await this.createSyncVersionUpdates(config.monorepo.syncVersions, workspace, updates))
        );
      }
    }

    // Detect conflicts (same package in multiple catalogs with different versions)
    const packageCatalogMap = new Map<string, PlannedUpdate[]>();

    for (const update of updates) {
      if (!packageCatalogMap.has(update.packageName)) {
        packageCatalogMap.set(update.packageName, []);
      }
      packageCatalogMap.get(update.packageName)!.push(update);
    }

    // Handle conflicts with catalogPriority
    for (const [packageName, packageUpdates] of packageCatalogMap) {
      if (packageUpdates.length > 1) {
        const uniqueVersions = new Set(packageUpdates.map((u) => u.newVersion));
        if (uniqueVersions.size > 1) {
          const resolvedConflict = this.resolveVersionConflict(
            packageName,
            packageUpdates,
            config.monorepo?.catalogPriority || ['default']
          );

          if (resolvedConflict) {
            conflicts.push(resolvedConflict);
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
    };
  }

  /**
   * Execute catalog dependency updates
   */
  async executeUpdates(plan: UpdatePlan, options: UpdateOptions): Promise<UpdateResult> {
    const workspacePath = WorkspacePath.fromString(plan.workspace.path);

    // Load configuration for security settings
    const config = ConfigLoader.loadConfig(workspacePath.toString());

    // Load workspace
    const workspace = await this.workspaceRepository.findByPath(workspacePath);
    if (!workspace) {
      throw new Error(`Workspace not found at ${workspacePath.toString()}`);
    }

    const updatedDependencies: UpdatedDependency[] = [];
    const skippedDependencies: SkippedDependency[] = [];
    const errors: UpdateError[] = [];

    // Track security updates for notification
    const securityUpdates: string[] = [];

    // Execute updates
    for (const update of plan.updates) {
      try {
        // Skip if conflicts exist and force is not enabled
        if (plan.hasConflicts && !options.force) {
          const hasConflict = plan.conflicts.some((c) => c.packageName === update.packageName);
          if (hasConflict) {
            skippedDependencies.push({
              catalogName: update.catalogName,
              packageName: update.packageName,
              currentVersion: update.currentVersion,
              reason: 'Version conflict - use --force to override',
            });
            continue;
          }
        }

        // Check if this is a security update and track it
        let isSecurityUpdate = false;
        if (config.security?.notifyOnSecurityUpdate) {
          try {
            const securityReport = await this.registryService.checkSecurityVulnerabilities(
              update.packageName,
              update.currentVersion
            );
            if (securityReport.hasVulnerabilities) {
              isSecurityUpdate = true;
              securityUpdates.push(
                `${update.packageName}@${update.currentVersion} → ${update.newVersion}`
              );
            }
          } catch (error) {
            UserFriendlyErrorHandler.handleSecurityCheckFailure(
              update.packageName,
              error as Error,
              { operation: 'update' }
            );
          }
        }

        // Perform the update
        workspace.updateCatalogDependency(
          update.catalogName,
          update.packageName,
          update.newVersion
        );

        updatedDependencies.push({
          catalogName: update.catalogName,
          packageName: update.packageName,
          fromVersion: update.currentVersion,
          toVersion: update.newVersion,
          updateType: update.updateType,
        });

        // Log security update notification
        if (isSecurityUpdate && config.security?.notifyOnSecurityUpdate) {
          console.log(
            `✅ Security fix applied: ${update.packageName}@${update.currentVersion} → ${update.newVersion}`
          );
        }
      } catch (error) {
        errors.push({
          catalogName: update.catalogName,
          packageName: update.packageName,
          error: String(error),
          fatal: false,
        });
      }
    }

    // Save workspace if not in dry-run mode
    if (!options.dryRun && updatedDependencies.length > 0) {
      try {
        await this.workspaceRepository.save(workspace);

        // Show summary of security updates if any
        if (securityUpdates.length > 0 && config.security?.notifyOnSecurityUpdate) {
          console.log(`\n🔒 Security Updates Summary:`);
          console.log(`   Applied ${securityUpdates.length} security fix(es):`);
          securityUpdates.forEach((update) => console.log(`   • ${update}`));
        }

        // Show summary of synced version updates
        const syncUpdates = updatedDependencies.filter((u) =>
          plan.updates.find(
            (pu) =>
              pu.packageName === u.packageName &&
              pu.catalogName === u.catalogName &&
              pu.reason.includes('Sync version')
          )
        );

        if (syncUpdates.length > 0) {
          console.log(`\n🔄 Version Sync Summary:`);
          const syncedPackages = new Set(syncUpdates.map((u) => u.packageName));
          console.log(`   Synchronized ${syncedPackages.size} package(s) across catalogs:`);

          // Group by package name
          const syncByPackage = new Map<string, typeof syncUpdates>();
          syncUpdates.forEach((update) => {
            if (!syncByPackage.has(update.packageName)) {
              syncByPackage.set(update.packageName, []);
            }
            syncByPackage.get(update.packageName)!.push(update);
          });

          syncByPackage.forEach((updates, packageName) => {
            const catalogs = updates.map((u) => u.catalogName).join(', ');
            const version = updates[0]?.toVersion;
            console.log(`   • ${packageName}@${version} in catalogs: ${catalogs}`);
          });
        }

        // Show catalog priority resolution if any
        if (
          plan.hasConflicts &&
          plan.conflicts.some((c) => c.recommendation.includes('Priority catalog'))
        ) {
          console.log(`\n📋 Catalog Priority Resolutions:`);
          plan.conflicts
            .filter((c) => c.recommendation.includes('Priority catalog'))
            .forEach((conflict) => {
              console.log(`   • ${conflict.packageName}: ${conflict.recommendation}`);
            });
        }
      } catch (error) {
        errors.push({
          catalogName: '',
          packageName: '',
          error: `Failed to save workspace: ${error}`,
          fatal: true,
        });
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
    };
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
    const wsPath = WorkspacePath.fromString(workspacePath || process.cwd());

    // Load workspace
    const workspace = await this.workspaceRepository.findByPath(wsPath);
    if (!workspace) {
      throw new Error(`No pnpm workspace found at ${wsPath.toString()}`);
    }

    const catalog = workspace.getCatalogs().get(catalogName);
    if (!catalog) {
      throw new Error(`Catalog "${catalogName}" not found`);
    }

    const currentRange = catalog.getDependencyVersion(packageName);
    if (!currentRange) {
      throw new Error(`Package "${packageName}" not found in catalog "${catalogName}"`);
    }

    const currentVersion = currentRange.toString();
    const proposedVersion = Version.fromString(newVersion);
    const currentVersionObj = currentRange.getMinVersion();

    if (!currentVersionObj) {
      throw new Error(`Cannot determine current version for ${packageName}`);
    }

    const updateType = currentVersionObj.getDifferenceType(proposedVersion);

    // Get affected packages
    const affectedPackagesCollection = workspace.getPackagesUsingCatalogDependency(
      catalogName,
      packageName
    );
    const packageImpacts: PackageImpact[] = [];

    for (const pkg of affectedPackagesCollection.getAll()) {
      const catalogRefs = pkg
        .getCatalogReferences()
        .filter(
          (ref) => ref.getCatalogName() === catalogName && ref.getPackageName() === packageName
        );

      for (const ref of catalogRefs) {
        const isBreakingChange = updateType === 'major';
        const compatibilityRisk = this.assessCompatibilityRisk(updateType);

        packageImpacts.push({
          packageName: pkg.getName(),
          packagePath: pkg.getPath().toString(),
          dependencyType: ref.getDependencyType(),
          isBreakingChange,
          compatibilityRisk,
        });
      }
    }

    // Check security impact
    const securityImpact = await this.analyzeSecurityImpact(
      packageName,
      currentVersion,
      newVersion
    );

    // Assess overall risk
    const riskLevel = this.assessOverallRisk(updateType, packageImpacts, securityImpact);

    // Generate recommendations
    const recommendations = this.generateRecommendations(
      updateType,
      securityImpact,
      packageImpacts
    );

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
    };
  }

  /**
   * Process packages in parallel with concurrency control and progress tracking
   */
  private async processPackagesInParallel(
    packagesToCheck: Array<[string, any]>,
    catalog: any,
    workspace: any,
    config: any,
    options: CheckOptions,
    progressReporter: ProgressReporter | null,
    startingCompleted: number = 0,
    totalPackages: number = 0
  ): Promise<OutdatedDependencyInfo[]> {
    const concurrency = config.advanced?.concurrency || 8; // Increased from 5 to match NCU
    const outdatedDependencies: OutdatedDependencyInfo[] = [];
    let completed = startingCompleted;

    // Process packages in chunks with true parallelism within each chunk
    const chunks = this.chunkArray(packagesToCheck, concurrency);

    for (const chunk of chunks) {
      const chunkResults = await Promise.all(
        chunk.map(async ([packageName, currentRange]) => {
          try {
            const result = await this.processPackageCheck(
              packageName,
              currentRange,
              catalog,
              workspace,
              config,
              options
            );

            // Update progress for successful package
            completed++;
            if (progressReporter && totalPackages > 0) {
              progressReporter.update(completed, `正在检查依赖包: ${packageName}`);
            }

            return result;
          } catch (error) {
            // Update progress even for failed packages
            completed++;
            if (progressReporter && totalPackages > 0) {
              progressReporter.update(completed, `跳过包 ${packageName} (检查失败)`);
            }

            UserFriendlyErrorHandler.handlePackageQueryFailure(packageName, error as Error, {
              operation: 'check',
            });
            return null;
          }
        })
      );

      // Add successful results to the array
      chunkResults.forEach((result) => {
        if (result) {
          outdatedDependencies.push(result);
        }
      });
    }

    return outdatedDependencies;
  }

  /**
   * Process a single package check (extracted from the main loop)
   */
  private async processPackageCheck(
    packageName: string,
    currentRange: any,
    catalog: any,
    workspace: any,
    config: any,
    options: CheckOptions
  ): Promise<OutdatedDependencyInfo | null> {
    // Get package-specific configuration
    const packageConfig = ConfigLoader.getPackageConfig(packageName, config);
    const effectiveTarget = packageConfig.target as UpdateTarget;

    // Defer security checks - only do them after we know the package needs updating
    const outdatedInfo = await this.checkPackageUpdate(
      packageName,
      currentRange,
      effectiveTarget,
      options.includePrerelease || config.defaults?.includePrerelease || false
    );

    if (!outdatedInfo) {
      return null; // Package doesn't need updating
    }

    // Now check for security vulnerabilities only for packages that need updating
    let hasSecurityVulnerabilities = false;
    if (config.security?.autoFixVulnerabilities) {
      try {
        const currentVersion = currentRange.getMinVersion()?.toString();
        if (currentVersion) {
          const securityReport = await this.registryService.checkSecurityVulnerabilities(
            packageName,
            currentVersion
          );
          hasSecurityVulnerabilities = securityReport.hasVulnerabilities;

          // Allow major updates for security fixes if configured
          if (hasSecurityVulnerabilities && config.security.allowMajorForSecurity) {
            // Re-check with 'latest' target if security fix requires it
            const securityFixInfo = await this.checkPackageUpdate(
              packageName,
              currentRange,
              'latest',
              options.includePrerelease || config.defaults?.includePrerelease || false
            );
            if (securityFixInfo) {
              Object.assign(outdatedInfo, securityFixInfo);
            }
          }
        }
      } catch (error) {
        UserFriendlyErrorHandler.handleSecurityCheckFailure(packageName, error as Error);
      }
    }

    // Get affected packages
    const affectedPackages = workspace
      .getPackagesUsingCatalogDependency(catalog.getName(), packageName)
      .getPackageNames();

    // Log security notifications if enabled
    if (hasSecurityVulnerabilities && config.security?.notifyOnSecurityUpdate) {
      console.warn(
        `🔒 Security vulnerability detected in ${packageName}@${outdatedInfo.currentVersion}`
      );
    }

    return {
      ...outdatedInfo,
      affectedPackages,
      isSecurityUpdate: hasSecurityVulnerabilities || outdatedInfo.isSecurityUpdate,
    };
  }

  /**
   * Split array into chunks for parallel processing
   */
  private chunkArray<T>(array: T[], chunkSize: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }

  /**
   * Check if a package needs updating
   */
  private async checkPackageUpdate(
    packageName: string,
    currentRange: VersionRange,
    target: UpdateTarget,
    includePrerelease: boolean
  ): Promise<OutdatedDependencyInfo | null> {
    try {
      // Use lightweight version API for better performance
      const versionInfo = await this.registryService.getPackageVersions(packageName);

      let targetVersion: Version;

      switch (target) {
        case 'latest':
          targetVersion = Version.fromString(versionInfo.latestVersion);
          break;
        case 'greatest':
          targetVersion = await this.registryService.getGreatestVersion(packageName);
          break;
        case 'newest':
          const newestVersions = await this.registryService.getNewestVersions(packageName, 1);
          if (!newestVersions[0]) {
            throw new Error(`No versions found for ${packageName}`);
          }
          targetVersion = newestVersions[0];
          break;
        case 'minor':
        case 'patch':
          targetVersion = await this.getConstrainedVersion(packageName, currentRange, target);
          break;
        default:
          targetVersion = Version.fromString(versionInfo.latestVersion);
      }

      // Skip prereleases unless explicitly requested
      if (!includePrerelease && targetVersion.isPrerelease()) {
        return null;
      }

      const currentVersion = currentRange.getMinVersion();
      if (!currentVersion) {
        return null;
      }

      // Check if update is needed
      if (!targetVersion.isNewerThan(currentVersion)) {
        return null;
      }

      const updateType = currentVersion.getDifferenceType(targetVersion);

      // Check for security vulnerabilities
      const securityReport = await this.registryService.checkSecurityVulnerabilities(
        packageName,
        currentVersion.toString()
      );

      return {
        packageName,
        currentVersion: currentVersion.toString(),
        latestVersion: targetVersion.toString(),
        wantedVersion: targetVersion.toString(),
        updateType: updateType as 'major' | 'minor' | 'patch',
        isSecurityUpdate: securityReport.hasVulnerabilities,
        affectedPackages: [], // Will be filled by caller
      };
    } catch (error) {
      UserFriendlyErrorHandler.handlePackageQueryFailure(packageName, error as Error, {
        operation: 'update-check',
      });
      return null;
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
    const currentVersion = currentRange.getMinVersion();
    if (!currentVersion) {
      throw new Error(`Cannot determine current version for ${packageName}`);
    }

    const versionInfo = await this.registryService.getPackageVersions(packageName);

    // Filter versions based on constraint
    const compatibleVersions = versionInfo.versions.filter((v) => {
      try {
        const version = Version.fromString(v);
        const diff = currentVersion.getDifferenceType(version);

        if (constraint === 'patch') {
          return diff === 'patch' || diff === 'same';
        } else if (constraint === 'minor') {
          return diff === 'minor' || diff === 'patch' || diff === 'same';
        }

        return false;
      } catch {
        return false;
      }
    });

    if (compatibleVersions.length === 0) {
      return currentVersion;
    }

    // Return the highest compatible version
    if (!compatibleVersions[0]) {
      throw new Error(`No compatible versions found for ${packageName}`);
    }
    return Version.fromString(compatibleVersions[0]);
  }

  /**
   * Generate update reason description
   */
  private getUpdateReason(outdated: OutdatedDependencyInfo): string {
    if (outdated.isSecurityUpdate) {
      return 'Security update available';
    }

    switch (outdated.updateType) {
      case 'major':
        return 'Major version update available';
      case 'minor':
        return 'Minor version update available';
      case 'patch':
        return 'Patch version update available';
      default:
        return 'Update available';
    }
  }

  /**
   * Analyze security impact of version change
   */
  private async analyzeSecurityImpact(
    packageName: string,
    currentVersion: string,
    newVersion: string
  ): Promise<SecurityImpact> {
    try {
      const [currentSecurity, newSecurity] = await Promise.all([
        this.registryService.checkSecurityVulnerabilities(packageName, currentVersion),
        this.registryService.checkSecurityVulnerabilities(packageName, newVersion),
      ]);

      const fixedVulnerabilities =
        currentSecurity.vulnerabilities.length - newSecurity.vulnerabilities.length;
      const newVulnerabilities = Math.max(
        0,
        newSecurity.vulnerabilities.length - currentSecurity.vulnerabilities.length
      );

      let severityChange: SecurityImpact['severityChange'] = 'same';
      if (fixedVulnerabilities > 0) {
        severityChange = 'better';
      } else if (newVulnerabilities > 0) {
        severityChange = 'worse';
      }

      return {
        hasVulnerabilities: currentSecurity.hasVulnerabilities || newSecurity.hasVulnerabilities,
        fixedVulnerabilities: Math.max(0, fixedVulnerabilities),
        newVulnerabilities,
        severityChange,
      };
    } catch {
      return {
        hasVulnerabilities: false,
        fixedVulnerabilities: 0,
        newVulnerabilities: 0,
        severityChange: 'same',
      };
    }
  }

  /**
   * Assess compatibility risk for update type
   */
  private assessCompatibilityRisk(updateType: string): 'low' | 'medium' | 'high' {
    switch (updateType) {
      case 'patch':
        return 'low';
      case 'minor':
        return 'medium';
      case 'major':
        return 'high';
      default:
        return 'medium';
    }
  }

  /**
   * Assess overall risk level
   */
  private assessOverallRisk(
    updateType: string,
    packageImpacts: PackageImpact[],
    securityImpact: SecurityImpact
  ): 'low' | 'medium' | 'high' {
    // Security fixes reduce risk
    if (securityImpact.fixedVulnerabilities > 0) {
      return updateType === 'major' ? 'medium' : 'low';
    }

    // New vulnerabilities increase risk
    if (securityImpact.newVulnerabilities > 0) {
      return 'high';
    }

    // Base risk on update type and number of affected packages
    const affectedPackageCount = packageImpacts.length;

    if (updateType === 'major') {
      return affectedPackageCount > 5 ? 'high' : 'medium';
    } else if (updateType === 'minor') {
      return affectedPackageCount > 10 ? 'medium' : 'low';
    } else {
      return 'low';
    }
  }

  /**
   * Generate recommendations based on analysis
   */
  private generateRecommendations(
    updateType: string,
    securityImpact: SecurityImpact,
    packageImpacts: PackageImpact[]
  ): string[] {
    const recommendations: string[] = [];

    if (securityImpact.fixedVulnerabilities > 0) {
      recommendations.push('🔒 Security update recommended - fixes known vulnerabilities');
    }

    if (securityImpact.newVulnerabilities > 0) {
      recommendations.push('⚠️  New vulnerabilities detected - review carefully before updating');
    }

    if (updateType === 'major') {
      recommendations.push('📖 Review changelog for breaking changes before updating');
      recommendations.push('🧪 Test thoroughly in development environment');
    }

    const breakingChangePackages = packageImpacts.filter((p) => p.isBreakingChange);
    if (breakingChangePackages.length > 0) {
      recommendations.push(`🔧 ${breakingChangePackages.length} package(s) may need code changes`);
    }

    if (packageImpacts.length > 5) {
      recommendations.push('📦 Many packages affected - consider updating in batches');
    }

    if (recommendations.length === 0) {
      recommendations.push('✅ Low risk update - safe to proceed');
    }

    return recommendations;
  }

  /**
   * Create sync version updates for packages that should be synchronized across catalogs
   */
  private async createSyncVersionUpdates(
    syncVersions: string[],
    workspace: any,
    existingUpdates: PlannedUpdate[]
  ): Promise<PlannedUpdate[]> {
    const syncUpdates: PlannedUpdate[] = [];
    const catalogs = workspace.getCatalogs();
    const allCatalogs = catalogs.getAll();

    for (const packageName of syncVersions) {
      // Check if this package exists in multiple catalogs
      const catalogsWithPackage = allCatalogs.filter(
        (catalog: any) => catalog && catalog.getDependencyVersion(packageName)
      );

      if (catalogsWithPackage.length <= 1) {
        continue; // No need to sync if package is only in one catalog
      }

      // Find the highest version from existing updates or determine target version
      let targetVersion: string | null = null;
      let targetUpdateType: 'major' | 'minor' | 'patch' = 'patch';

      // Check if this package has any existing updates
      const existingUpdate = existingUpdates.find((u) => u.packageName === packageName);
      if (existingUpdate) {
        targetVersion = existingUpdate.newVersion;
        targetUpdateType = existingUpdate.updateType;
      } else {
        // Get latest version for this package using lightweight API
        try {
          const versionInfo = await this.registryService.getPackageVersions(packageName);
          targetVersion = versionInfo.latestVersion;
        } catch (error) {
          UserFriendlyErrorHandler.handlePackageQueryFailure(packageName, error as Error, {
            operation: 'sync',
          });
          continue;
        }
      }

      if (!targetVersion) continue;

      // Create sync updates for all catalogs that need updating
      for (const catalog of catalogsWithPackage) {
        const currentRange = catalog.getDependencyVersion(packageName);
        if (!currentRange) continue;

        const currentVersion = currentRange.getMinVersion();
        if (!currentVersion) continue;

        const currentVersionString = currentVersion.toString();

        // Skip if already at target version
        if (currentVersionString === targetVersion) continue;

        // Check if this update already exists
        const existingUpdateForCatalog = existingUpdates.find(
          (u) => u.packageName === packageName && u.catalogName === catalog.getName()
        );

        if (existingUpdateForCatalog) {
          // Update the existing update to use the sync version
          existingUpdateForCatalog.newVersion = targetVersion;
          existingUpdateForCatalog.reason = `Sync version across catalogs: ${existingUpdateForCatalog.reason}`;
        } else {
          // Create new sync update
          const affectedPackages = workspace
            .getPackagesUsingCatalogDependency(catalog.getName(), packageName)
            .getPackageNames();

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
          };

          syncUpdates.push(syncUpdate);
        }
      }
    }

    return syncUpdates;
  }

  /**
   * Resolve version conflicts using catalog priority
   */
  private resolveVersionConflict(
    packageName: string,
    packageUpdates: PlannedUpdate[],
    catalogPriority: string[]
  ): VersionConflict | null {
    // Find the highest priority catalog with an update for this package
    let priorityCatalog: PlannedUpdate | null = null;

    for (const catalogName of catalogPriority) {
      const catalogUpdate = packageUpdates.find((u) => u.catalogName === catalogName);
      if (catalogUpdate) {
        priorityCatalog = catalogUpdate;
        break;
      }
    }

    // If no priority catalog found, use the first one
    if (!priorityCatalog) {
      priorityCatalog = packageUpdates[0] || null;
    }

    // Update all other catalogs to use the priority catalog's version
    const priorityVersion = priorityCatalog?.newVersion;
    if (priorityVersion && priorityCatalog) {
      for (const update of packageUpdates) {
        if (update.catalogName !== priorityCatalog.catalogName) {
          update.newVersion = priorityVersion;
          update.reason = `Using version from priority catalog (${priorityCatalog.catalogName}): ${update.reason}`;
        }
      }
    }

    // Create conflict record for reporting
    const uniqueVersions = new Set(packageUpdates.map((u) => u.newVersion));
    if (uniqueVersions.size > 1) {
      return {
        packageName,
        catalogs: packageUpdates.map((u) => ({
          catalogName: u.catalogName,
          currentVersion: u.currentVersion,
          proposedVersion: u.newVersion,
        })),
        recommendation: `Resolved using catalog priority. Priority catalog '${priorityCatalog?.catalogName}' version '${priorityVersion}' selected.`,
      };
    }

    return null;
  }
}
