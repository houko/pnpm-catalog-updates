/**
 * Catalog Entity
 * 
 * Represents a pnpm catalog that manages dependency versions centrally.
 * A catalog contains a collection of dependencies with their version ranges.
 */

import { VersionRange } from '../value-objects/Version.js';

export type CatalogId = string;
export type PackageName = string;
export type CatalogName = string;

export class Catalog {
  private readonly id: CatalogId;
  private readonly name: CatalogName;
  private readonly dependencies: Map<PackageName, VersionRange>;
  private readonly mode: CatalogMode;

  private constructor(
    id: CatalogId,
    name: CatalogName,
    dependencies: Map<PackageName, VersionRange>,
    mode: CatalogMode = CatalogMode.MANUAL
  ) {
    this.id = id;
    this.name = name;
    this.dependencies = new Map(dependencies);
    this.mode = mode;
  }

  /**
   * Create a new Catalog
   */
  public static create(
    id: CatalogId,
    name: CatalogName,
    dependencies: Record<string, string> = {},
    mode: CatalogMode = CatalogMode.MANUAL
  ): Catalog {
    const dependencyMap = new Map<PackageName, VersionRange>();

    for (const [packageName, versionRange] of Object.entries(dependencies)) {
      try {
        dependencyMap.set(packageName, VersionRange.fromString(versionRange));
      } catch (error) {
        throw new Error(
          `Invalid version range for package "${packageName}" in catalog "${name}": ${versionRange}`
        );
      }
    }

    return new Catalog(id, name, dependencyMap, mode);
  }

  /**
   * Get catalog identifier
   */
  public getId(): CatalogId {
    return this.id;
  }

  /**
   * Get catalog name
   */
  public getName(): CatalogName {
    return this.name;
  }

  /**
   * Get catalog mode
   */
  public getMode(): CatalogMode {
    return this.mode;
  }

  /**
   * Get all dependencies in this catalog
   */
  public getDependencies(): ReadonlyMap<PackageName, VersionRange> {
    return this.dependencies;
  }

  /**
   * Get all package names in this catalog
   */
  public getPackageNames(): PackageName[] {
    return Array.from(this.dependencies.keys());
  }

  /**
   * Check if catalog contains a specific package
   */
  public hasDependency(packageName: PackageName): boolean {
    return this.dependencies.has(packageName);
  }

  /**
   * Get version range for a specific package
   */
  public getDependencyVersion(packageName: PackageName): VersionRange | null {
    return this.dependencies.get(packageName) || null;
  }

  /**
   * Add or update a dependency
   */
  public updateDependencyVersion(packageName: PackageName, versionRange: string): void {
    try {
      const parsedRange = VersionRange.fromString(versionRange);
      this.dependencies.set(packageName, parsedRange);
    } catch (error) {
      throw new Error(
        `Invalid version range for package "${packageName}": ${versionRange}`
      );
    }
  }

  /**
   * Remove a dependency from the catalog
   */
  public removeDependency(packageName: PackageName): boolean {
    return this.dependencies.delete(packageName);
  }

  /**
   * Check version compatibility for a package
   */
  public checkVersionCompatibility(packageName: PackageName, requestedVersion: string): boolean {
    const catalogVersion = this.dependencies.get(packageName);
    if (!catalogVersion) {
      return false;
    }

    try {
      const requestedRange = VersionRange.fromString(requestedVersion);
      return catalogVersion.isCompatibleWith(requestedRange);
    } catch {
      return false;
    }
  }

  /**
   * Get packages that would be affected by changing a dependency version
   */
  public getAffectedPackagesByDependencyChange(
    packageName: PackageName,
    newVersionRange: string
  ): PackageName[] {
    if (!this.hasDependency(packageName)) {
      return [];
    }

    try {
      const newRange = VersionRange.fromString(newVersionRange);
      const currentRange = this.dependencies.get(packageName)!;

      // If the ranges are compatible, no packages are affected
      if (currentRange.isCompatibleWith(newRange)) {
        return [];
      }

      // Return all packages that use this catalog (this would typically be resolved
      // at the aggregate level with workspace information)
      return [packageName];
    } catch {
      return [packageName];
    }
  }

  /**
   * Validate catalog integrity
   */
  public validate(): CatalogValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Check for empty catalog
    if (this.dependencies.size === 0) {
      warnings.push(`Catalog "${this.name}" is empty`);
    }

    // Validate each dependency
    for (const [packageName, versionRange] of this.dependencies) {
      // Check package name format
      if (!this.isValidPackageName(packageName)) {
        errors.push(`Invalid package name: "${packageName}"`);
      }

      // Check for common issues
      if (versionRange.toString().includes('*')) {
        warnings.push(`Package "${packageName}" uses wildcard version which may be unstable`);
      }
    }

    return new CatalogValidationResult(errors.length === 0, errors, warnings);
  }

  /**
   * Convert catalog to plain object for serialization
   */
  public toPlainObject(): CatalogData {
    const dependencies: Record<string, string> = {};
    
    for (const [packageName, versionRange] of this.dependencies) {
      dependencies[packageName] = versionRange.toString();
    }

    return {
      id: this.id,
      name: this.name,
      dependencies,
      mode: this.mode,
    };
  }

  /**
   * Create catalog from plain object
   */
  public static fromPlainObject(data: CatalogData): Catalog {
    return Catalog.create(data.id, data.name, data.dependencies, data.mode);
  }

  /**
   * Check if a package name is valid
   */
  private isValidPackageName(packageName: string): boolean {
    // Basic npm package name validation
    const validPackageNameRegex = /^(@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/;
    return validPackageNameRegex.test(packageName);
  }

  /**
   * Check equality with another catalog
   */
  public equals(other: Catalog): boolean {
    if (this.id !== other.id || this.name !== other.name || this.mode !== other.mode) {
      return false;
    }

    if (this.dependencies.size !== other.dependencies.size) {
      return false;
    }

    for (const [packageName, versionRange] of this.dependencies) {
      const otherRange = other.dependencies.get(packageName);
      if (!otherRange || !versionRange.equals(otherRange)) {
        return false;
      }
    }

    return true;
  }
}

/**
 * Catalog Mode Enum
 */
export enum CatalogMode {
  MANUAL = 'manual',
  STRICT = 'strict',
  PREFER = 'prefer',
}

/**
 * Catalog Data Interface for serialization
 */
export interface CatalogData {
  id: CatalogId;
  name: CatalogName;
  dependencies: Record<string, string>;
  mode: CatalogMode;
}

/**
 * Catalog Validation Result
 */
export class CatalogValidationResult {
  constructor(
    private readonly isValid: boolean,
    private readonly errors: string[],
    private readonly warnings: string[]
  ) {}

  public getIsValid(): boolean {
    return this.isValid;
  }

  public getErrors(): string[] {
    return [...this.errors];
  }

  public getWarnings(): string[] {
    return [...this.warnings];
  }

  public hasErrors(): boolean {
    return this.errors.length > 0;
  }

  public hasWarnings(): boolean {
    return this.warnings.length > 0;
  }
}