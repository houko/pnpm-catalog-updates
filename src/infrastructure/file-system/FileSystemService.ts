/**
 * File System Service
 *
 * Provides abstracted file system operations for the application.
 * Handles reading/writing workspace files, package.json, and pnpm-workspace.yaml.
 */

import fs from 'fs/promises';
import path from 'path';
import { glob } from 'glob';
import YAML from 'yaml';

import { WorkspacePath } from '../../domain/value-objects/WorkspacePath.js';
import { PnpmWorkspaceData } from '../../domain/value-objects/WorkspaceConfig.js';
import { PackageJsonData } from '../../domain/entities/Package.js';

export class FileSystemService {
  /**
   * Check if a file exists
   */
  async exists(filePath: string): Promise<boolean> {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Check if a path is a directory
   */
  async isDirectory(dirPath: string): Promise<boolean> {
    try {
      const stat = await fs.stat(dirPath);
      return stat.isDirectory();
    } catch {
      return false;
    }
  }

  /**
   * Read a text file
   */
  async readTextFile(filePath: string): Promise<string> {
    try {
      return await fs.readFile(filePath, 'utf-8');
    } catch (error) {
      throw new Error(`Failed to read file ${filePath}: ${error}`);
    }
  }

  /**
   * Write a text file
   */
  async writeTextFile(filePath: string, content: string): Promise<void> {
    try {
      // Ensure directory exists
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.writeFile(filePath, content, 'utf-8');
    } catch (error) {
      throw new Error(`Failed to write file ${filePath}: ${error}`);
    }
  }

  /**
   * Read and parse a JSON file
   */
  async readJsonFile<T = any>(filePath: string): Promise<T> {
    try {
      const content = await this.readTextFile(filePath);
      return JSON.parse(content) as T;
    } catch (error) {
      throw new Error(`Failed to read JSON file ${filePath}: ${error}`);
    }
  }

  /**
   * Write a JSON file
   */
  async writeJsonFile(filePath: string, data: any, indent: number = 2): Promise<void> {
    try {
      const content = JSON.stringify(data, null, indent);
      await this.writeTextFile(filePath, content);
    } catch (error) {
      throw new Error(`Failed to write JSON file ${filePath}: ${error}`);
    }
  }

  /**
   * Read and parse a YAML file
   */
  async readYamlFile<T = any>(filePath: string): Promise<T> {
    try {
      const content = await this.readTextFile(filePath);
      return YAML.parse(content) as T;
    } catch (error) {
      throw new Error(`Failed to read YAML file ${filePath}: ${error}`);
    }
  }

  /**
   * Write a YAML file
   */
  async writeYamlFile(filePath: string, data: any): Promise<void> {
    try {
      const content = YAML.stringify(data, {
        indent: 2,
      });
      await this.writeTextFile(filePath, content);
    } catch (error) {
      throw new Error(`Failed to write YAML file ${filePath}: ${error}`);
    }
  }

  /**
   * Read pnpm-workspace.yaml configuration
   */
  async readPnpmWorkspaceConfig(workspacePath: WorkspacePath): Promise<PnpmWorkspaceData> {
    const configPath = workspacePath.getPnpmWorkspaceConfigPath().toString();

    if (!(await this.exists(configPath))) {
      throw new Error(`pnpm-workspace.yaml not found at ${configPath}`);
    }

    return await this.readYamlFile<PnpmWorkspaceData>(configPath);
  }

  /**
   * Write pnpm-workspace.yaml configuration
   */
  async writePnpmWorkspaceConfig(
    workspacePath: WorkspacePath,
    config: PnpmWorkspaceData
  ): Promise<void> {
    const configPath = workspacePath.getPnpmWorkspaceConfigPath().toString();
    await this.writeYamlFilePreservingFormat(configPath, config);
  }

  /**
   * Read package.json file
   */
  async readPackageJson(packagePath: WorkspacePath): Promise<PackageJsonData> {
    const packageJsonPath = packagePath.getPackageJsonPath().toString();

    if (!(await this.exists(packageJsonPath))) {
      throw new Error(`package.json not found at ${packageJsonPath}`);
    }

    return await this.readJsonFile<PackageJsonData>(packageJsonPath);
  }

  /**
   * Write package.json file
   */
  async writePackageJson(packagePath: WorkspacePath, packageData: PackageJsonData): Promise<void> {
    const packageJsonPath = packagePath.getPackageJsonPath().toString();
    await this.writeJsonFile(packageJsonPath, packageData);
  }

  /**
   * Find package.json files using glob patterns
   */
  async findPackageJsonFiles(workspacePath: WorkspacePath, patterns: string[]): Promise<string[]> {
    const results: string[] = [];

    for (const pattern of patterns) {
      try {
        // Convert pattern to absolute path and look for package.json
        const absolutePattern = path.resolve(workspacePath.toString(), pattern, 'package.json');
        const matches = await glob(absolutePattern, {
          ignore: ['**/node_modules/**'],
          absolute: true,
        });
        results.push(...matches);
      } catch (error) {
        // Continue with other patterns if one fails
        console.warn(`Failed to process pattern ${pattern}:`, error);
      }
    }

    // Remove duplicates and return
    return Array.from(new Set(results));
  }

  /**
   * Find directories matching patterns
   */
  async findDirectories(workspacePath: WorkspacePath, patterns: string[]): Promise<string[]> {
    const results: string[] = [];

    for (const pattern of patterns) {
      try {
        const absolutePattern = path.resolve(workspacePath.toString(), pattern);
        const matches = await glob(absolutePattern, {
          ignore: ['**/node_modules/**'],
          absolute: true,
        });
        results.push(...matches);
      } catch (error) {
        console.warn(`Failed to process pattern ${pattern}:`, error);
      }
    }

    return Array.from(new Set(results));
  }

  /**
   * Check if a directory contains a pnpm workspace
   */
  async isPnpmWorkspace(dirPath: string): Promise<boolean> {
    const workspaceConfigPath = path.join(dirPath, 'pnpm-workspace.yaml');
    const packageJsonPath = path.join(dirPath, 'package.json');

    // Must have both pnpm-workspace.yaml and package.json
    return (await this.exists(workspaceConfigPath)) && (await this.exists(packageJsonPath));
  }

  /**
   * Find the nearest pnpm workspace by traversing up the directory tree
   */
  async findNearestWorkspace(startPath: string): Promise<string | null> {
    let currentPath = path.resolve(startPath);

    while (currentPath !== path.dirname(currentPath)) {
      if (await this.isPnpmWorkspace(currentPath)) {
        return currentPath;
      }
      currentPath = path.dirname(currentPath);
    }

    return null;
  }

  /**
   * Get file modification time
   */
  async getModificationTime(filePath: string): Promise<Date> {
    try {
      const stat = await fs.stat(filePath);
      return stat.mtime;
    } catch (error) {
      throw new Error(`Failed to get modification time for ${filePath}: ${error}`);
    }
  }

  /**
   * Create a backup of a file
   */
  async createBackup(filePath: string): Promise<string> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = `${filePath}.backup.${timestamp}`;

    try {
      await fs.copyFile(filePath, backupPath);
      return backupPath;
    } catch (error) {
      throw new Error(`Failed to create backup of ${filePath}: ${error}`);
    }
  }

  /**
   * Restore a file from backup
   */
  async restoreFromBackup(originalPath: string, backupPath: string): Promise<void> {
    try {
      await fs.copyFile(backupPath, originalPath);
    } catch (error) {
      throw new Error(`Failed to restore ${originalPath} from backup: ${error}`);
    }
  }

  /**
   * Remove a file
   */
  async removeFile(filePath: string): Promise<void> {
    try {
      await fs.unlink(filePath);
    } catch (error) {
      throw new Error(`Failed to remove file ${filePath}: ${error}`);
    }
  }

  /**
   * List files in a directory
   */
  async listFiles(dirPath: string): Promise<string[]> {
    try {
      const items = await fs.readdir(dirPath, { withFileTypes: true });
      return items.filter((item) => item.isFile()).map((item) => path.join(dirPath, item.name));
    } catch (error) {
      throw new Error(`Failed to list files in ${dirPath}: ${error}`);
    }
  }

  /**
   * List directories in a directory
   */
  async listDirectories(dirPath: string): Promise<string[]> {
    try {
      const items = await fs.readdir(dirPath, { withFileTypes: true });
      return items
        .filter((item) => item.isDirectory())
        .map((item) => path.join(dirPath, item.name));
    } catch (error) {
      throw new Error(`Failed to list directories in ${dirPath}: ${error}`);
    }
  }
}
