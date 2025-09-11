/**
 * Workspace Service
 *
 * Application service for workspace discovery, validation, and management.
 * Provides high-level operations for working with pnpm workspaces.
 */

import { WorkspaceRepository } from '../../domain/repositories/workspaceRepository.js';
import { Workspace } from '../../domain/entities/workspace.js';
import { WorkspacePath } from '../../domain/value-objects/workspacePath.js';

export interface WorkspaceInfo {
  path: string;
  name: string;
  isValid: boolean;
  hasPackages: boolean;
  hasCatalogs: boolean;
  packageCount: number;
  catalogCount: number;
  catalogNames: string[];
}

export interface WorkspaceValidationReport {
  isValid: boolean;
  workspace: WorkspaceInfo;
  errors: string[];
  warnings: string[];
  recommendations: string[];
}

export interface CatalogInfo {
  name: string;
  packageCount: number;
  packages: string[];
  mode: string;
}

export interface PackageInfo {
  name: string;
  path: string;
  hasPackageJson: boolean;
  catalogReferences: CatalogReferenceInfo[];
  dependencies: DependencyInfo[];
}

export interface CatalogReferenceInfo {
  catalogName: string;
  packageName: string;
  dependencyType: string;
}

export interface DependencyInfo {
  name: string;
  version: string;
  type: string;
  isCatalogReference: boolean;
}

export class WorkspaceService {
  constructor(private readonly workspaceRepository: WorkspaceRepository) {}

  /**
   * Discover workspace from current directory or specified path
   */
  async discoverWorkspace(searchPath?: string): Promise<Workspace> {
    const path = searchPath ? WorkspacePath.fromString(searchPath) : undefined;

    const workspace = await this.workspaceRepository.discoverWorkspace(path);

    if (!workspace) {
      throw new Error(
        searchPath
          ? `No pnpm workspace found at or above ${searchPath}`
          : 'No pnpm workspace found in current directory or parent directories'
      );
    }

    return workspace;
  }

  /**
   * Get workspace information
   */
  async getWorkspaceInfo(workspacePath?: string): Promise<WorkspaceInfo> {
    const path = WorkspacePath.fromString(workspacePath || process.cwd());

    // Try to load workspace
    const workspace = await this.workspaceRepository.findByPath(path);

    if (!workspace) {
      return {
        path: path.toString(),
        name: path.getDirectoryName(),
        isValid: false,
        hasPackages: false,
        hasCatalogs: false,
        packageCount: 0,
        catalogCount: 0,
        catalogNames: [],
      };
    }

    const packages = workspace.getPackages();
    const catalogs = workspace.getCatalogs();

    return {
      path: path.toString(),
      name: path.getDirectoryName(),
      isValid: true,
      hasPackages: !packages.isEmpty(),
      hasCatalogs: !catalogs.isEmpty(),
      packageCount: packages.size(),
      catalogCount: catalogs.size(),
      catalogNames: catalogs.getCatalogNames(),
    };
  }

  /**
   * Validate workspace integrity and configuration
   */
  async validateWorkspace(workspacePath?: string): Promise<WorkspaceValidationReport> {
    const path = WorkspacePath.fromString(workspacePath || process.cwd());
    const workspaceInfo = await this.getWorkspaceInfo(workspacePath);

    if (!workspaceInfo.isValid) {
      return {
        isValid: false,
        workspace: workspaceInfo,
        errors: ['Not a valid pnpm workspace'],
        warnings: [],
        recommendations: [
          'Initialize a pnpm workspace with: pnpm init',
          'Create pnpm-workspace.yaml file',
          'Define package patterns in pnpm-workspace.yaml',
        ],
      };
    }

    // Load workspace for detailed validation
    const workspace = await this.workspaceRepository.findByPath(path);
    if (!workspace) {
      throw new Error('Workspace validation failed - workspace not found');
    }

    // Validate workspace consistency
    const validationResult = workspace.validateConsistency();
    const recommendations: string[] = [];

    // Generate recommendations based on workspace state
    if (!workspaceInfo.hasCatalogs) {
      recommendations.push('Consider using catalogs to centralize dependency management');
    }

    if (workspaceInfo.packageCount === 0) {
      recommendations.push(
        'No packages found - check your package patterns in pnpm-workspace.yaml'
      );
    }

    if (workspaceInfo.packageCount > 20) {
      recommendations.push(
        'Large workspace detected - consider organizing packages into logical groups'
      );
    }

    // Validate catalogs
    const catalogValidation = workspace.getCatalogs().validate();
    const allErrors = [...validationResult.getErrors(), ...catalogValidation.getErrors()];
    const allWarnings = [...validationResult.getWarnings(), ...catalogValidation.getWarnings()];

    return {
      isValid: validationResult.getIsValid() && catalogValidation.getIsValid(),
      workspace: workspaceInfo,
      errors: allErrors,
      warnings: allWarnings,
      recommendations,
    };
  }

  /**
   * Get detailed catalog information
   */
  async getCatalogs(workspacePath?: string): Promise<CatalogInfo[]> {
    const workspace = await this.discoverWorkspace(workspacePath);
    const catalogs = workspace.getCatalogs();

    return catalogs.getAll().map((catalog) => ({
      name: catalog.getName(),
      packageCount: catalog.getPackageNames().length,
      packages: catalog.getPackageNames(),
      mode: catalog.getMode(),
    }));
  }

  /**
   * Get detailed package information
   */
  async getPackages(workspacePath?: string): Promise<PackageInfo[]> {
    const workspace = await this.discoverWorkspace(workspacePath);
    const packages = workspace.getPackages();

    return packages.getAll().map((pkg) => {
      const catalogReferences = pkg.getCatalogReferences();
      const dependencies = pkg.getDependencies();

      // Collect all dependencies from all types
      const allDependencies: DependencyInfo[] = [];
      const depTypes = [
        'dependencies',
        'devDependencies',
        'peerDependencies',
        'optionalDependencies',
      ] as const;

      for (const depType of depTypes) {
        const deps = dependencies.getDependenciesByType(depType);
        for (const [name, version] of deps) {
          allDependencies.push({
            name,
            version,
            type: depType,
            isCatalogReference: version.startsWith('catalog:'),
          });
        }
      }

      return {
        name: pkg.getName(),
        path: pkg.getPath().toString(),
        hasPackageJson: true, // If package was loaded, it has package.json
        catalogReferences: catalogReferences.map((ref) => ({
          catalogName: ref.getCatalogName(),
          packageName: ref.getPackageName(),
          dependencyType: ref.getDependencyType(),
        })),
        dependencies: allDependencies,
      };
    });
  }

  /**
   * Check if workspace uses catalogs
   */
  async usesCatalogs(workspacePath?: string): Promise<boolean> {
    try {
      const workspace = await this.discoverWorkspace(workspacePath);
      return !workspace.getCatalogs().isEmpty();
    } catch {
      return false;
    }
  }

  /**
   * Get packages that use a specific catalog
   */
  async getPackagesUsingCatalog(
    catalogName: string,
    workspacePath?: string
  ): Promise<PackageInfo[]> {
    const workspace = await this.discoverWorkspace(workspacePath);
    const packagesUsingCatalog = workspace.getPackages().findPackagesUsingCatalog(catalogName);

    return packagesUsingCatalog.map((pkg) => {
      const catalogReferences = pkg
        .getCatalogReferences()
        .filter((ref) => ref.getCatalogName() === catalogName);

      const dependencies = pkg.getDependencies();
      const allDependencies: DependencyInfo[] = [];
      const depTypes = [
        'dependencies',
        'devDependencies',
        'peerDependencies',
        'optionalDependencies',
      ] as const;

      for (const depType of depTypes) {
        const deps = dependencies.getDependenciesByType(depType);
        for (const [name, version] of deps) {
          allDependencies.push({
            name,
            version,
            type: depType,
            isCatalogReference: version.startsWith('catalog:'),
          });
        }
      }

      return {
        name: pkg.getName(),
        path: pkg.getPath().toString(),
        hasPackageJson: true,
        catalogReferences: catalogReferences.map((ref) => ({
          catalogName: ref.getCatalogName(),
          packageName: ref.getPackageName(),
          dependencyType: ref.getDependencyType(),
        })),
        dependencies: allDependencies,
      };
    });
  }

  /**
   * Get workspace statistics
   */
  async getWorkspaceStats(workspacePath?: string): Promise<WorkspaceStats> {
    const workspace = await this.discoverWorkspace(workspacePath);
    const packages = workspace.getPackages();
    const catalogs = workspace.getCatalogs();

    // Count dependencies
    let totalDependencies = 0;
    let catalogDependencies = 0;
    const dependencyTypes = {
      dependencies: 0,
      devDependencies: 0,
      peerDependencies: 0,
      optionalDependencies: 0,
    };

    for (const pkg of packages.getAll()) {
      const deps = pkg.getDependencies();
      const catalogRefs = pkg.getCatalogReferences();

      catalogDependencies += catalogRefs.length;

      for (const depType of Object.keys(dependencyTypes) as Array<keyof typeof dependencyTypes>) {
        const typeDeps = deps.getDependenciesByType(depType);
        dependencyTypes[depType] += typeDeps.size;
        totalDependencies += typeDeps.size;
      }
    }

    // Count catalog definitions
    let totalCatalogEntries = 0;
    for (const catalog of catalogs.getAll()) {
      totalCatalogEntries += catalog.getPackageNames().length;
    }

    return {
      workspace: {
        path: workspace.getPath().toString(),
        name: workspace.getPath().getDirectoryName(),
      },
      packages: {
        total: packages.size(),
        withCatalogReferences: packages.findPackagesWithCatalogReferences().length,
      },
      catalogs: {
        total: catalogs.size(),
        totalEntries: totalCatalogEntries,
      },
      dependencies: {
        total: totalDependencies,
        catalogReferences: catalogDependencies,
        byType: dependencyTypes,
      },
    };
  }

  /**
   * Find workspaces in a directory tree
   */
  async findWorkspaces(searchRoot: string): Promise<WorkspaceInfo[]> {
    // This would implement a recursive search for pnpm workspaces
    // For now, we'll just check the provided directory
    const workspaceInfo = await this.getWorkspaceInfo(searchRoot);
    return workspaceInfo.isValid ? [workspaceInfo] : [];
  }

  /**
   * Check workspace health
   */
  async checkHealth(workspacePath?: string): Promise<WorkspaceHealthReport> {
    const validation = await this.validateWorkspace(workspacePath);
    const stats = await this.getWorkspaceStats(workspacePath);

    const issues: HealthIssue[] = [];
    const score = this.calculateHealthScore(validation, stats, issues);

    return {
      score,
      status: this.getHealthStatus(score),
      validation,
      stats,
      issues,
      lastChecked: new Date(),
    };
  }

  /**
   * Calculate workspace health score (0-100)
   */
  private calculateHealthScore(
    validation: WorkspaceValidationReport,
    stats: WorkspaceStats,
    issues: HealthIssue[]
  ): number {
    let score = 100;

    // Deduct points for errors
    score -= validation.errors.length * 20;

    // Deduct points for warnings
    score -= validation.warnings.length * 5;

    // Deduct points for workspace issues
    if (!stats.workspace) {
      score -= 30;
    }

    if (stats.packages.total === 0) {
      score -= 20;
      issues.push({
        type: 'warning',
        message: 'No packages found in workspace',
        suggestion: 'Check package patterns in pnpm-workspace.yaml',
      });
    }

    if (stats.catalogs.total === 0) {
      score -= 10;
      issues.push({
        type: 'info',
        message: 'No catalogs defined',
        suggestion: 'Consider using catalogs for better dependency management',
      });
    }

    // Bonus for good practices
    if (stats.dependencies.catalogReferences > 0) {
      score += 5;
    }

    return Math.max(0, Math.min(100, score));
  }

  /**
   * Get health status from score
   */
  private getHealthStatus(score: number): 'excellent' | 'good' | 'fair' | 'poor' {
    if (score >= 90) return 'excellent';
    if (score >= 70) return 'good';
    if (score >= 50) return 'fair';
    return 'poor';
  }
}

export interface WorkspaceStats {
  workspace: {
    path: string;
    name: string;
  };
  packages: {
    total: number;
    withCatalogReferences: number;
  };
  catalogs: {
    total: number;
    totalEntries: number;
  };
  dependencies: {
    total: number;
    catalogReferences: number;
    byType: {
      dependencies: number;
      devDependencies: number;
      peerDependencies: number;
      optionalDependencies: number;
    };
  };
}

export interface HealthIssue {
  type: 'error' | 'warning' | 'info';
  message: string;
  suggestion: string;
}

export interface WorkspaceHealthReport {
  score: number;
  status: 'excellent' | 'good' | 'fair' | 'poor';
  validation: WorkspaceValidationReport;
  stats: WorkspaceStats;
  issues: HealthIssue[];
  lastChecked: Date;
}
