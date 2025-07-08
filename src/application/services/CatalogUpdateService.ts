/**
 * Catalog Update Service
 * 
 * Core application service that handles catalog dependency updates.
 * Orchestrates domain objects and infrastructure services to provide 
 * high-level use cases for checking and updating catalog dependencies.
 */

import { WorkspaceRepository } from '../../domain/repositories/WorkspaceRepository.js';
import { WorkspacePath } from '../../domain/value-objects/WorkspacePath.js';
import { Version, VersionRange } from '../../domain/value-objects/Version.js';
import { NpmRegistryService } from '../../infrastructure/external-services/NpmRegistryService.js';

export interface CheckOptions {
  workspacePath?: string | undefined;
  catalogName?: string | undefined;
  target?: UpdateTarget | undefined;
  includePrerelease?: boolean | undefined;
  exclude?: string[] | undefined;
  include?: string[] | undefined;
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
   * Check for outdated catalog dependencies
   */
  async checkOutdatedDependencies(options: CheckOptions = {}): Promise<OutdatedReport> {
    const workspacePath = WorkspacePath.fromString(options.workspacePath || process.cwd());
    
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
      throw new Error(options.catalogName 
        ? `Catalog "${options.catalogName}" not found`
        : 'No catalogs found in workspace'
      );
    }

    // Check each catalog for outdated dependencies
    for (const catalog of catalogsToCheck) {
      const outdatedDependencies: OutdatedDependencyInfo[] = [];
      if (!catalog) {
        throw new Error(`Catalog "${catalogsToCheck[0]?.getName() || 'unknown'}" not found`);
      }
      const dependencies = catalog.getDependencies();

      for (const [packageName, currentRange] of dependencies) {
        // Apply include/exclude filters
        if (!this.shouldCheckPackage(packageName, options.include, options.exclude)) {
          continue;
        }

        try {
          const outdatedInfo = await this.checkPackageUpdate(
            packageName, 
            currentRange, 
            options.target || 'latest',
            options.includePrerelease || false
          );

          if (outdatedInfo) {
            // Get affected packages
            const affectedPackages = workspace
              .getPackagesUsingCatalogDependency(catalog!.getName(), packageName)
              .getPackageNames();

            outdatedDependencies.push({
              ...outdatedInfo,
              affectedPackages
            });
          }
        } catch (error) {
          console.warn(`Failed to check ${packageName}:`, error);
        }
      }

      const catalogInfo: CatalogUpdateInfo = {
        catalogName: catalog!.getName(),
        outdatedDependencies,
        totalPackages: dependencies.size,
        outdatedCount: outdatedDependencies.length
      };

      catalogInfos.push(catalogInfo);
      totalOutdated += outdatedDependencies.length;
    }

    return {
      workspace: {
        path: workspacePath.toString(),
        name: workspacePath.getDirectoryName()
      },
      catalogs: catalogInfos,
      totalOutdated,
      hasUpdates: totalOutdated > 0
    };
  }

  /**
   * Plan catalog dependency updates
   */
  async planUpdates(options: UpdateOptions): Promise<UpdatePlan> {
    const outdatedReport = await this.checkOutdatedDependencies(options);
    
    const updates: PlannedUpdate[] = [];
    const conflicts: VersionConflict[] = [];

    // Convert outdated dependencies to planned updates
    for (const catalogInfo of outdatedReport.catalogs) {
      for (const outdated of catalogInfo.outdatedDependencies) {
        const update: PlannedUpdate = {
          catalogName: catalogInfo.catalogName,
          packageName: outdated.packageName,
          currentVersion: outdated.currentVersion,
          newVersion: outdated.latestVersion,
          updateType: outdated.updateType,
          reason: this.getUpdateReason(outdated),
          affectedPackages: outdated.affectedPackages
        };

        updates.push(update);
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

    for (const [packageName, packageUpdates] of packageCatalogMap) {
      if (packageUpdates.length > 1) {
        const uniqueVersions = new Set(packageUpdates.map(u => u.newVersion));
        if (uniqueVersions.size > 1) {
          const conflict: VersionConflict = {
            packageName,
            catalogs: packageUpdates.map(u => ({
              catalogName: u.catalogName,
              currentVersion: u.currentVersion,
              proposedVersion: u.newVersion
            })),
            recommendation: `Consider using the same version across all catalogs`
          };
          conflicts.push(conflict);
        }
      }
    }

    return {
      workspace: outdatedReport.workspace,
      updates,
      conflicts,
      totalUpdates: updates.length,
      hasConflicts: conflicts.length > 0
    };
  }

  /**
   * Execute catalog dependency updates
   */
  async executeUpdates(plan: UpdatePlan, options: UpdateOptions): Promise<UpdateResult> {
    const workspacePath = WorkspacePath.fromString(plan.workspace.path);
    
    // Load workspace
    const workspace = await this.workspaceRepository.findByPath(workspacePath);
    if (!workspace) {
      throw new Error(`Workspace not found at ${workspacePath.toString()}`);
    }

    const updatedDependencies: UpdatedDependency[] = [];
    const skippedDependencies: SkippedDependency[] = [];
    const errors: UpdateError[] = [];

    // Execute updates
    for (const update of plan.updates) {
      try {
        // Skip if conflicts exist and force is not enabled
        if (plan.hasConflicts && !options.force) {
          const hasConflict = plan.conflicts.some(c => c.packageName === update.packageName);
          if (hasConflict) {
            skippedDependencies.push({
              catalogName: update.catalogName,
              packageName: update.packageName,
              currentVersion: update.currentVersion,
              reason: 'Version conflict - use --force to override'
            });
            continue;
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
          updateType: update.updateType
        });

      } catch (error) {
        errors.push({
          catalogName: update.catalogName,
          packageName: update.packageName,
          error: String(error),
          fatal: false
        });
      }
    }

    // Save workspace if not in dry-run mode
    if (!options.dryRun && updatedDependencies.length > 0) {
      try {
        await this.workspaceRepository.save(workspace);
      } catch (error) {
        errors.push({
          catalogName: '',
          packageName: '',
          error: `Failed to save workspace: ${error}`,
          fatal: true
        });
      }
    }

    return {
      success: errors.filter(e => e.fatal).length === 0,
      workspace: plan.workspace,
      updatedDependencies,
      skippedDependencies,
      errors,
      totalUpdated: updatedDependencies.length,
      totalSkipped: skippedDependencies.length,
      totalErrors: errors.length
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
    const affectedPackagesCollection = workspace.getPackagesUsingCatalogDependency(catalogName, packageName);
    const packageImpacts: PackageImpact[] = [];

    for (const pkg of affectedPackagesCollection.getAll()) {
      const catalogRefs = pkg.getCatalogReferences().filter(
        ref => ref.getCatalogName() === catalogName && ref.getPackageName() === packageName
      );

      for (const ref of catalogRefs) {
        const isBreakingChange = updateType === 'major';
        const compatibilityRisk = this.assessCompatibilityRisk(updateType);

        packageImpacts.push({
          packageName: pkg.getName(),
          packagePath: pkg.getPath().toString(),
          dependencyType: ref.getDependencyType(),
          isBreakingChange,
          compatibilityRisk
        });
      }
    }

    // Check security impact
    const securityImpact = await this.analyzeSecurityImpact(packageName, currentVersion, newVersion);

    // Assess overall risk
    const riskLevel = this.assessOverallRisk(updateType, packageImpacts, securityImpact);

    // Generate recommendations
    const recommendations = this.generateRecommendations(updateType, securityImpact, packageImpacts);

    return {
      packageName,
      catalogName,
      currentVersion,
      proposedVersion: newVersion,
      updateType: updateType as 'major' | 'minor' | 'patch',
      affectedPackages: packageImpacts,
      riskLevel,
      securityImpact,
      recommendations
    };
  }

  /**
   * Check if a specific package should be updated based on filters
   */
  private shouldCheckPackage(packageName: string, include?: string[], exclude?: string[]): boolean {
    // Check exclude patterns first
    if (exclude && exclude.length > 0) {
      for (const pattern of exclude) {
        if (this.matchesPattern(packageName, pattern)) {
          return false;
        }
      }
    }

    // Check include patterns
    if (include && include.length > 0) {
      for (const pattern of include) {
        if (this.matchesPattern(packageName, pattern)) {
          return true;
        }
      }
      return false; // If include patterns exist, package must match one
    }

    return true; // Include by default if no patterns
  }

  /**
   * Check if package matches a pattern (simple glob-like matching)
   */
  private matchesPattern(packageName: string, pattern: string): boolean {
    // Convert glob pattern to regex
    const regexPattern = pattern
      .replace(/\*/g, '.*')
      .replace(/\?/g, '.');
    
    const regex = new RegExp(`^${regexPattern}$`, 'i');
    return regex.test(packageName);
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
      const packageInfo = await this.registryService.getPackageInfo(packageName);
      
      let targetVersion: Version;
      
      switch (target) {
        case 'latest':
          targetVersion = Version.fromString(packageInfo.latestVersion);
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
          targetVersion = Version.fromString(packageInfo.latestVersion);
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
        affectedPackages: [] // Will be filled by caller
      };

    } catch (error) {
      console.warn(`Failed to check updates for ${packageName}:`, error);
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

    const packageInfo = await this.registryService.getPackageInfo(packageName);
    
    // Filter versions based on constraint
    const compatibleVersions = packageInfo.versions.filter(v => {
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
        this.registryService.checkSecurityVulnerabilities(packageName, newVersion)
      ]);

      const fixedVulnerabilities = currentSecurity.vulnerabilities.length - newSecurity.vulnerabilities.length;
      const newVulnerabilities = Math.max(0, newSecurity.vulnerabilities.length - currentSecurity.vulnerabilities.length);

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
        severityChange
      };
    } catch {
      return {
        hasVulnerabilities: false,
        fixedVulnerabilities: 0,
        newVulnerabilities: 0,
        severityChange: 'same'
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

    const breakingChangePackages = packageImpacts.filter(p => p.isBreakingChange);
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
}