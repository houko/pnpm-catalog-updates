/**
 * PackageCollection Value Object
 *
 * Represents a collection of packages in a workspace.
 * Provides operations for managing and querying multiple packages.
 */

import { Package, PackageName } from '../entities/package.js';

export class PackageCollection {
  private readonly packages: Map<PackageName, Package>;

  private constructor(packages: Map<PackageName, Package>) {
    this.packages = new Map(packages);
  }

  /**
   * Create an empty package collection
   */
  public static empty(): PackageCollection {
    return new PackageCollection(new Map());
  }

  /**
   * Create a package collection from an array of packages
   */
  public static fromPackages(packages: Package[]): PackageCollection {
    const packageMap = new Map<PackageName, Package>();

    for (const pkg of packages) {
      packageMap.set(pkg.getName(), pkg);
    }

    return new PackageCollection(packageMap);
  }

  /**
   * Create a package collection from a Map
   */
  public static fromMap(packageMap: Map<PackageName, Package>): PackageCollection {
    return new PackageCollection(packageMap);
  }

  /**
   * Check if collection contains a package with the given name
   */
  public has(packageName: PackageName): boolean {
    return this.packages.has(packageName);
  }

  /**
   * Get a package by name
   */
  public get(packageName: PackageName): Package | undefined {
    return this.packages.get(packageName);
  }

  /**
   * Get all packages as an array
   */
  public getAll(): Package[] {
    return Array.from(this.packages.values());
  }

  /**
   * Get all package names
   */
  public getPackageNames(): PackageName[] {
    return Array.from(this.packages.keys());
  }

  /**
   * Get the number of packages
   */
  public size(): number {
    return this.packages.size;
  }

  /**
   * Check if collection is empty
   */
  public isEmpty(): boolean {
    return this.packages.size === 0;
  }

  /**
   * Add a package to the collection
   */
  public add(pkg: Package): PackageCollection {
    const newPackages = new Map(this.packages);
    newPackages.set(pkg.getName(), pkg);
    return new PackageCollection(newPackages);
  }

  /**
   * Remove a package from the collection
   */
  public remove(packageName: PackageName): PackageCollection {
    const newPackages = new Map(this.packages);
    newPackages.delete(packageName);
    return new PackageCollection(newPackages);
  }

  /**
   * Update a package in the collection
   */
  public update(pkg: Package): PackageCollection {
    if (!this.has(pkg.getName())) {
      throw new Error(`Package "${pkg.getName()}" not found in collection`);
    }

    const newPackages = new Map(this.packages);
    newPackages.set(pkg.getName(), pkg);
    return new PackageCollection(newPackages);
  }

  /**
   * Filter packages by a predicate function
   */
  public filter(predicate: (pkg: Package) => boolean): PackageCollection {
    const filteredPackages = new Map<PackageName, Package>();

    for (const [name, pkg] of this.packages) {
      if (predicate(pkg)) {
        filteredPackages.set(name, pkg);
      }
    }

    return new PackageCollection(filteredPackages);
  }

  /**
   * Filter packages that use a specific catalog dependency
   */
  public filterByCatalogDependency(catalogName: string, packageName: string): PackageCollection {
    return this.filter((pkg) => pkg.usesCatalogDependency(catalogName, packageName));
  }

  /**
   * Find packages that have catalog references
   */
  public findPackagesWithCatalogReferences(): Package[] {
    return this.getAll().filter((pkg) => pkg.getCatalogReferences().length > 0);
  }

  /**
   * Find packages that reference a specific catalog
   */
  public findPackagesUsingCatalog(catalogName: string): Package[] {
    return this.getAll().filter((pkg) =>
      pkg.getCatalogReferences().some((ref) => ref.getCatalogName() === catalogName)
    );
  }

  /**
   * Get all unique catalog names referenced by packages
   */
  public getReferencedCatalogNames(): string[] {
    const catalogNames = new Set<string>();

    for (const pkg of this.packages.values()) {
      for (const ref of pkg.getCatalogReferences()) {
        catalogNames.add(ref.getCatalogName());
      }
    }

    return Array.from(catalogNames);
  }

  /**
   * Get all unique dependency names across all packages
   */
  public getAllDependencyNames(): string[] {
    const dependencyNames = new Set<string>();

    for (const pkg of this.packages.values()) {
      const deps = pkg.getDependencies();

      // Add dependencies from all types
      for (const depType of [
        'dependencies',
        'devDependencies',
        'peerDependencies',
        'optionalDependencies',
      ] as const) {
        for (const depName of deps.getDependenciesByType(depType).keys()) {
          dependencyNames.add(depName);
        }
      }
    }

    return Array.from(dependencyNames);
  }

  /**
   * Find packages that have a specific dependency
   */
  public findPackagesWithDependency(dependencyName: string): Package[] {
    return this.getAll().filter((pkg) => {
      const deps = pkg.getDependencies();
      return ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies'].some(
        (depType) => deps.getDependenciesByType(depType as any).has(dependencyName)
      );
    });
  }

  /**
   * Validate all packages in the collection
   */
  public validate(): PackageCollectionValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Check for empty collection
    if (this.isEmpty()) {
      warnings.push('No packages found in workspace');
    }

    // Validate each package
    for (const pkg of this.packages.values()) {
      const result = pkg.validate();
      errors.push(...result.getErrors().map((err) => `Package "${pkg.getName()}": ${err}`));
      warnings.push(...result.getWarnings().map((warn) => `Package "${pkg.getName()}": ${warn}`));
    }

    // Check for duplicate package names (shouldn't happen with Map, but good to verify)
    const packageNames = this.getPackageNames();
    const uniqueNames = new Set(packageNames);
    if (packageNames.length !== uniqueNames.size) {
      errors.push('Duplicate package names found in collection');
    }

    return new PackageCollectionValidationResult(errors.length === 0, errors, warnings);
  }

  /**
   * Group packages by workspace path
   */
  public groupByWorkspacePath(): Map<string, Package[]> {
    const grouped = new Map<string, Package[]>();

    for (const pkg of this.packages.values()) {
      const pathKey = pkg.getPath().toString();
      if (!grouped.has(pathKey)) {
        grouped.set(pathKey, []);
      }
      grouped.get(pathKey)!.push(pkg);
    }

    return grouped;
  }

  /**
   * Convert to a Map for serialization
   */
  public toMap(): Map<PackageName, Package> {
    return new Map(this.packages);
  }

  /**
   * Iterate over packages
   */
  public *[Symbol.iterator](): Iterator<[PackageName, Package]> {
    yield* this.packages;
  }

  /**
   * Check equality with another package collection
   */
  public equals(other: PackageCollection): boolean {
    if (this.size() !== other.size()) {
      return false;
    }

    for (const [name, pkg] of this.packages) {
      const otherPackage = other.get(name);
      if (!otherPackage || !pkg.equals(otherPackage)) {
        return false;
      }
    }

    return true;
  }
}

/**
 * Package Collection Validation Result
 */
export class PackageCollectionValidationResult {
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
