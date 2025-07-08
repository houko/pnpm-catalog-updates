/**
 * File System Service
 *
 * Provides abstracted file system operations for the application.
 * Handles reading/writing workspace files, package.json, and pnpm-workspace.yaml.
 */

import fs from 'fs/promises';
import { glob } from 'glob';
import path from 'path';
import YAML from 'yaml';
import { PackageJsonData } from '../../domain/entities/Package.js';
import { PnpmWorkspaceData } from '../../domain/value-objects/WorkspaceConfig.js';
import { WorkspacePath } from '../../domain/value-objects/WorkspacePath.js';

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
   * Write a YAML file while preserving comments and formatting
   */
  async writeYamlFilePreservingFormat(filePath: string, data: any): Promise<void> {
    try {
      // Read the original file to preserve comments and formatting
      const originalContent = await this.readTextFile(filePath);

      // Use smart YAML updating that preserves comments and formatting
      const updatedContent = this.updateYamlPreservingFormat(originalContent, data);

      await this.writeTextFile(filePath, updatedContent);
    } catch (error) {
      // If reading the original file fails, fall back to regular YAML writing
      console.warn(
        `Could not preserve YAML format for ${filePath}, falling back to standard formatting`
      );
      await this.writeYamlFile(filePath, data);
    }
  }

  /**
   * Update YAML content while preserving comments and formatting
   */
  private updateYamlPreservingFormat(originalContent: string, newData: any): string {
    const lines = originalContent.split('\n');
    const result: string[] = [];
    let i = 0;

    // Helper function to update a specific section
    const updateSection = (sectionName: string, newValue: any): boolean => {
      if (!(sectionName in newData)) {
        return false;
      }

      // Find the section in the original content
      let sectionStartIndex = -1;
      let sectionEndIndex = -1;
      let indentLevel = 0;

      for (let j = i; j < lines.length; j++) {
        const fullLine = lines[j];
        if (!fullLine) continue;

        const line = fullLine.trim();

        if (line.startsWith(`${sectionName}:`)) {
          sectionStartIndex = j;
          indentLevel = fullLine.length - fullLine.trimStart().length;

          // Find the end of this section
          for (let k = j + 1; k < lines.length; k++) {
            const nextLine = lines[k];
            if (!nextLine) continue;

            const nextLineTrimmed = nextLine.trim();
            const nextIndentLevel = nextLine.length - nextLine.trimStart().length;

            // If we find a line with same or less indentation that defines a new section, stop
            if (
              nextIndentLevel <= indentLevel &&
              nextLineTrimmed.includes(':') &&
              !nextLineTrimmed.startsWith('#')
            ) {
              sectionEndIndex = k - 1;
              break;
            }

            // If we find a line that's not empty, not indented enough to be part of this section, stop
            // Special case: comments at the same level after an empty line should end the section
            if (nextLineTrimmed !== '' && nextIndentLevel <= indentLevel) {
              if (nextLineTrimmed.startsWith('#') && nextIndentLevel === indentLevel) {
                // Check if there was an empty line before this comment
                let hasEmptyLineBefore = false;
                for (let m = k - 1; m > j; m--) {
                  const prevLine = lines[m];
                  if (!prevLine || prevLine.trim() === '') {
                    hasEmptyLineBefore = true;
                    break;
                  }
                  if (prevLine.trim() !== '') {
                    break;
                  }
                }
                if (hasEmptyLineBefore) {
                  sectionEndIndex = k - 1;
                  break;
                }
              } else if (!nextLineTrimmed.startsWith('#')) {
                sectionEndIndex = k - 1;
                break;
              }
            }
          }

          if (sectionEndIndex === -1) {
            sectionEndIndex = lines.length - 1;
          }
          break;
        }
      }

      if (sectionStartIndex !== -1) {
        // Update the section
        const sectionContent = this.formatYamlSection(
          sectionName,
          newValue,
          indentLevel,
          lines,
          sectionStartIndex,
          sectionEndIndex
        );

        // Add lines before the section
        for (let j = i; j < sectionStartIndex; j++) {
          const lineContent = lines[j];
          if (lineContent !== undefined) {
            result.push(lineContent);
          }
        }

        // Add the updated section
        result.push(...sectionContent);

        // Update the position to after this section
        i = sectionEndIndex + 1;
        return true;
      }

      return false;
    };

    // Process the file line by line
    while (i < lines.length) {
      const currentLine = lines[i];
      if (!currentLine) {
        result.push('');
        i++;
        continue;
      }

      const line = currentLine.trim();

      // Handle main sections
      if (line.startsWith('packages:')) {
        if (updateSection('packages', newData.packages)) {
          continue;
        }
      } else if (line.startsWith('catalog:')) {
        if (updateSection('catalog', newData.catalog)) {
          continue;
        }
      } else if (line.startsWith('catalogs:')) {
        if (updateSection('catalogs', newData.catalogs)) {
          continue;
        }
      } else if (line.startsWith('catalogMode:')) {
        if ('catalogMode' in newData) {
          const indent = currentLine.length - currentLine.trimStart().length;
          result.push(' '.repeat(indent) + `catalogMode: ${newData.catalogMode}`);
          i++;
          continue;
        }
      } else if (line.startsWith('shamefullyHoist:')) {
        if ('shamefullyHoist' in newData) {
          const indent = currentLine.length - currentLine.trimStart().length;
          result.push(' '.repeat(indent) + `shamefullyHoist: ${newData.shamefullyHoist}`);
          i++;
          continue;
        }
      } else if (line.startsWith('linkWorkspacePackages:')) {
        if ('linkWorkspacePackages' in newData) {
          const indent = currentLine.length - currentLine.trimStart().length;
          result.push(
            ' '.repeat(indent) + `linkWorkspacePackages: ${newData.linkWorkspacePackages}`
          );
          i++;
          continue;
        }
      }

      // Keep the original line if not updated
      result.push(currentLine);
      i++;
    }

    return result.join('\n');
  }

  /**
   * Format a YAML section with proper indentation while preserving internal structure
   */
  private formatYamlSection(
    sectionName: string,
    value: any,
    baseIndent: number = 0,
    originalLines?: string[],
    sectionStart?: number,
    sectionEnd?: number
  ): string[] {
    const lines: string[] = [];
    const indent = ' '.repeat(baseIndent);

    if (sectionName === 'packages' && Array.isArray(value)) {
      lines.push(`${indent}packages:`);
      for (const pkg of value) {
        lines.push(`${indent}  - "${pkg}"`);
      }
    } else if (
      (sectionName === 'catalog' || sectionName === 'catalogs') &&
      typeof value === 'object'
    ) {
      if (sectionName === 'catalog') {
        lines.push(`${indent}catalog:`);

        // Try to preserve original structure and comments if available
        if (originalLines && sectionStart !== undefined && sectionEnd !== undefined) {
          const valueEntries = Object.entries(value);
          const processedPackages = new Set<string>();

          // First pass: update existing packages while preserving comments
          for (let i = sectionStart + 1; i <= sectionEnd; i++) {
            const line = originalLines[i];
            if (!line) continue;

            const trimmed = line.trim();

            // Preserve comments and empty lines
            if (trimmed.startsWith('#') || trimmed === '') {
              lines.push(line);
              continue;
            }

            // Check if this line defines a package (with or without quotes)
            const packageMatch = trimmed.match(/^(['"]?)([a-zA-Z0-9@\-_.\\/]+)\1:\s*(.+)$/);
            if (packageMatch && packageMatch[2]) {
              const packageName = packageMatch[2];
              const newVersion = value[packageName];

              if (newVersion !== undefined) {
                // Update with new version while preserving indentation and quotes
                const originalIndent = line.length - line.trimStart().length;
                const quote = packageMatch[1] || ''; // Preserve original quote style
                lines.push(
                  ' '.repeat(originalIndent) + `${quote}${packageName}${quote}: ${newVersion}`
                );
                processedPackages.add(packageName);
              } else {
                // Keep the line as is if package not in new data
                lines.push(line);
              }
            } else {
              // Keep other lines as is
              lines.push(line);
            }
          }

          // Second pass: add any new packages that weren't in the original
          for (const [pkg, version] of valueEntries) {
            if (!processedPackages.has(pkg)) {
              lines.push(`${indent}  ${pkg}: ${version}`);
            }
          }
        } else {
          // Fallback to simple formatting
          for (const [pkg, version] of Object.entries(value)) {
            lines.push(`${indent}  ${pkg}: ${version}`);
          }
        }
      } else {
        lines.push(`${indent}catalogs:`);
        for (const [catalogName, catalog] of Object.entries(value as Record<string, any>)) {
          lines.push(`${indent}  ${catalogName}:`);
          for (const [pkg, version] of Object.entries(catalog)) {
            lines.push(`${indent}    ${pkg}: ${version}`);
          }
        }
      }
    }

    return lines;
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
