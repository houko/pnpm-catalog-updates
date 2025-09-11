/**
 * File-based Workspace Repository Implementation
 *
 * Implements WorkspaceRepository interface using the file system.
 * Handles loading and saving workspace data from pnpm-workspace.yaml and package.json files.
 */

import path from 'path';

import { Catalog } from '../../domain/entities/catalog.js';
import { Package } from '../../domain/entities/package.js';
import { Workspace } from '../../domain/entities/workspace.js';
import { WorkspaceRepository } from '../../domain/repositories/workspaceRepository.js';
import { CatalogCollection } from '../../domain/value-objects/catalogCollection.js';
import { PackageCollection } from '../../domain/value-objects/packageCollection.js';
import { WorkspaceConfig } from '../../domain/value-objects/workspaceConfig.js';
import { WorkspaceId } from '../../domain/value-objects/workspaceId.js';
import { WorkspacePath } from '../../domain/value-objects/workspacePath.js';
import { FileSystemService } from '../file-system/fileSystemService.js';

export class FileWorkspaceRepository implements WorkspaceRepository {
  constructor(private readonly fileSystemService: FileSystemService) {}

  /**
   * Find a workspace by its path
   */
  async findByPath(path: WorkspacePath): Promise<Workspace | null> {
    try {
      // Check if the path contains a valid workspace
      if (!(await this.isValidWorkspace(path))) {
        return null;
      }

      // Load workspace configuration
      const config = await this.loadConfiguration(path);

      // Create workspace ID from path
      const id = WorkspaceId.fromPath(path.toString());

      // Load packages
      const packages = await this.loadPackages(path, config);

      // Load catalogs
      const catalogs = await this.loadCatalogs(config);

      return Workspace.create(id, path, config, catalogs, packages);
    } catch (error) {
      console.error(`Failed to load workspace from ${path.toString()}:`, error);
      return null;
    }
  }

  /**
   * Find a workspace by its ID
   */
  async findById(_id: WorkspaceId): Promise<Workspace | null> {
    // For file-based implementation, we would need to maintain a mapping
    // of IDs to paths. For now, this is not implemented.
    throw new Error('Finding workspace by ID is not implemented in file-based repository');
  }

  /**
   * Save a workspace
   */
  async save(workspace: Workspace): Promise<void> {
    try {
      // Save workspace configuration
      await this.saveConfiguration(workspace.getPath(), workspace.getConfig());

      // Save packages (update their package.json files)
      await this.savePackages(workspace.getPackages());
    } catch (error) {
      throw new Error(`Failed to save workspace: ${error}`);
    }
  }

  /**
   * Load workspace configuration from path
   */
  async loadConfiguration(path: WorkspacePath): Promise<WorkspaceConfig> {
    try {
      const workspaceData = await this.fileSystemService.readPnpmWorkspaceConfig(path);
      return WorkspaceConfig.fromWorkspaceData(workspaceData);
    } catch (error) {
      throw new Error(`Failed to load workspace configuration from ${path.toString()}: ${error}`);
    }
  }

  /**
   * Save workspace configuration to path
   */
  async saveConfiguration(path: WorkspacePath, config: WorkspaceConfig): Promise<void> {
    try {
      const workspaceData = config.toPnpmWorkspaceData();
      await this.fileSystemService.writePnpmWorkspaceConfig(path, workspaceData);
    } catch (error) {
      throw new Error(`Failed to save workspace configuration to ${path.toString()}: ${error}`);
    }
  }

  /**
   * Check if a path contains a valid pnpm workspace
   */
  async isValidWorkspace(path: WorkspacePath): Promise<boolean> {
    return await this.fileSystemService.isPnpmWorkspace(path.toString());
  }

  /**
   * Discover workspace from current working directory or given path
   */
  async discoverWorkspace(searchPath?: WorkspacePath): Promise<Workspace | null> {
    const startPath = searchPath?.toString() || process.cwd();

    try {
      const workspacePath = await this.fileSystemService.findNearestWorkspace(startPath);

      if (!workspacePath) {
        return null;
      }

      return await this.findByPath(WorkspacePath.fromString(workspacePath));
    } catch (error) {
      console.error(`Failed to discover workspace from ${startPath}:`, error);
      return null;
    }
  }

  /**
   * Load packages from workspace
   */
  private async loadPackages(
    workspacePath: WorkspacePath,
    config: WorkspaceConfig
  ): Promise<PackageCollection> {
    try {
      const packagePatterns = config.getPackagePatterns();

      // Find all package.json files matching the patterns
      const packageJsonFiles = await this.fileSystemService.findPackageJsonFiles(
        workspacePath,
        packagePatterns
      );

      const packages: Package[] = [];

      for (const packageJsonPath of packageJsonFiles) {
        try {
          const packageDir = path.dirname(packageJsonPath);
          const packagePath = WorkspacePath.fromString(packageDir);

          // Read package.json
          const packageData = await this.fileSystemService.readPackageJson(packagePath);

          // Create package
          const packageId = `${packageData.name}-${packageDir}`;
          const pkg = Package.create(packageId, packageData.name, packagePath, packageData);

          packages.push(pkg);
        } catch (error) {
          console.warn(`Failed to load package from ${packageJsonPath}:`, error);
          // Continue with other packages
        }
      }

      return PackageCollection.fromPackages(packages);
    } catch (error) {
      throw new Error(`Failed to load packages: ${error}`);
    }
  }

  /**
   * Load catalogs from workspace configuration
   */
  private async loadCatalogs(config: WorkspaceConfig): Promise<CatalogCollection> {
    try {
      const catalogs: Catalog[] = [];
      const catalogDefinitions = config.getCatalogDefinitions();

      for (const [catalogName, catalogDef] of catalogDefinitions) {
        const catalogId = `catalog-${catalogName}`;
        const catalog = Catalog.create(
          catalogId,
          catalogName,
          catalogDef.getDependencies(),
          config.getCatalogMode()
        );
        catalogs.push(catalog);
      }

      return CatalogCollection.fromCatalogs(catalogs);
    } catch (error) {
      throw new Error(`Failed to load catalogs: ${error}`);
    }
  }

  /**
   * Save packages (update their package.json files)
   */
  private async savePackages(packages: PackageCollection): Promise<void> {
    for (const pkg of packages.getAll()) {
      try {
        const packageData = pkg.toPackageJsonData();
        await this.fileSystemService.writePackageJson(pkg.getPath(), packageData);
      } catch (error) {
        console.error(`Failed to save package ${pkg.getName()}:`, error);
        // Continue with other packages
      }
    }
  }
}
