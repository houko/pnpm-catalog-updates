/**
 * WorkspacePath Value Object
 * 
 * Represents a file system path to a pnpm workspace.
 * This is an immutable value object that validates and normalizes workspace paths.
 */

import path from 'path';
import { fileURLToPath } from 'url';

export class WorkspacePath {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  /**
   * Create a WorkspacePath from a string
   */
  public static fromString(pathString: string): WorkspacePath {
    if (!pathString || pathString.trim().length === 0) {
      throw new Error('WorkspacePath cannot be empty');
    }

    // Normalize the path
    const normalized = path.resolve(pathString.trim());
    
    return new WorkspacePath(normalized);
  }

  /**
   * Create a WorkspacePath from the current working directory
   */
  public static current(): WorkspacePath {
    return new WorkspacePath(process.cwd());
  }

  /**
   * Create a WorkspacePath from file URL (useful for ES modules)
   */
  public static fromFileURL(fileUrl: string): WorkspacePath {
    const filePath = fileURLToPath(fileUrl);
    const directory = path.dirname(filePath);
    return new WorkspacePath(directory);
  }

  /**
   * Get the absolute path as a string
   */
  public toString(): string {
    return this.value;
  }

  /**
   * Get the directory name (last part of the path)
   */
  public getDirectoryName(): string {
    return path.basename(this.value);
  }

  /**
   * Join with another path segment
   */
  public join(...segments: string[]): WorkspacePath {
    const joined = path.join(this.value, ...segments);
    return new WorkspacePath(joined);
  }

  /**
   * Get the parent directory
   */
  public getParent(): WorkspacePath {
    const parent = path.dirname(this.value);
    return new WorkspacePath(parent);
  }

  /**
   * Check if this path is a subdirectory of another path
   */
  public isSubdirectoryOf(other: WorkspacePath): boolean {
    const relativePath = path.relative(other.value, this.value);
    return !relativePath.startsWith('..') && !path.isAbsolute(relativePath);
  }

  /**
   * Get relative path from another WorkspacePath
   */
  public relativeTo(other: WorkspacePath): string {
    return path.relative(other.value, this.value);
  }

  /**
   * Check equality with another WorkspacePath
   */
  public equals(other: WorkspacePath): boolean {
    return path.resolve(this.value) === path.resolve(other.value);
  }

  /**
   * Get the value for serialization
   */
  public getValue(): string {
    return this.value;
  }

  /**
   * Convert to JSON representation
   */
  public toJSON(): string {
    return this.value;
  }

  /**
   * Create from JSON representation
   */
  public static fromJSON(json: string): WorkspacePath {
    return WorkspacePath.fromString(json);
  }

  /**
   * Check if this path exists (requires async validation in infrastructure layer)
   */
  public async exists(): Promise<boolean> {
    try {
      const fs = await import('fs/promises');
      await fs.access(this.value);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get the path to pnpm-workspace.yaml
   */
  public getPnpmWorkspaceConfigPath(): WorkspacePath {
    return this.join('pnpm-workspace.yaml');
  }

  /**
   * Get the path to package.json
   */
  public getPackageJsonPath(): WorkspacePath {
    return this.join('package.json');
  }
}