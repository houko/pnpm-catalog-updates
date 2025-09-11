/**
 * CatalogCollection Value Object
 *
 * Represents a collection of catalogs in a workspace.
 * Provides operations for managing and querying multiple catalogs.
 */

import { Catalog, CatalogName } from '../entities/catalog.js';

export class CatalogCollection {
  private readonly catalogs: Map<CatalogName, Catalog>;

  private constructor(catalogs: Map<CatalogName, Catalog>) {
    this.catalogs = new Map(catalogs);
  }

  /**
   * Create an empty catalog collection
   */
  public static empty(): CatalogCollection {
    return new CatalogCollection(new Map());
  }

  /**
   * Create a catalog collection from an array of catalogs
   */
  public static fromCatalogs(catalogs: Catalog[]): CatalogCollection {
    const catalogMap = new Map<CatalogName, Catalog>();

    for (const catalog of catalogs) {
      catalogMap.set(catalog.getName(), catalog);
    }

    return new CatalogCollection(catalogMap);
  }

  /**
   * Create a catalog collection from a Map
   */
  public static fromMap(catalogMap: Map<CatalogName, Catalog>): CatalogCollection {
    return new CatalogCollection(catalogMap);
  }

  /**
   * Check if collection contains a catalog with the given name
   */
  public has(catalogName: CatalogName): boolean {
    return this.catalogs.has(catalogName);
  }

  /**
   * Get a catalog by name
   */
  public get(catalogName: CatalogName): Catalog | undefined {
    return this.catalogs.get(catalogName);
  }

  /**
   * Get all catalogs as an array
   */
  public getAll(): Catalog[] {
    return Array.from(this.catalogs.values());
  }

  /**
   * Get all catalog names
   */
  public getCatalogNames(): CatalogName[] {
    return Array.from(this.catalogs.keys());
  }

  /**
   * Get the number of catalogs
   */
  public size(): number {
    return this.catalogs.size;
  }

  /**
   * Check if collection is empty
   */
  public isEmpty(): boolean {
    return this.catalogs.size === 0;
  }

  /**
   * Add a catalog to the collection
   */
  public add(catalog: Catalog): CatalogCollection {
    const newCatalogs = new Map(this.catalogs);
    newCatalogs.set(catalog.getName(), catalog);
    return new CatalogCollection(newCatalogs);
  }

  /**
   * Remove a catalog from the collection
   */
  public remove(catalogName: CatalogName): CatalogCollection {
    const newCatalogs = new Map(this.catalogs);
    newCatalogs.delete(catalogName);
    return new CatalogCollection(newCatalogs);
  }

  /**
   * Update a catalog in the collection
   */
  public update(catalog: Catalog): CatalogCollection {
    if (!this.has(catalog.getName())) {
      throw new Error(`Catalog "${catalog.getName()}" not found in collection`);
    }

    const newCatalogs = new Map(this.catalogs);
    newCatalogs.set(catalog.getName(), catalog);
    return new CatalogCollection(newCatalogs);
  }

  /**
   * Get the default catalog (named 'default' or the first one)
   */
  public getDefault(): Catalog | undefined {
    // First, try to find a catalog named 'default'
    const defaultCatalog = this.catalogs.get('default');
    if (defaultCatalog) {
      return defaultCatalog;
    }

    // If no 'default' catalog, return the first one
    const firstCatalog = this.catalogs.values().next().value;
    return firstCatalog;
  }

  /**
   * Filter catalogs by a predicate function
   */
  public filter(predicate: (catalog: Catalog) => boolean): CatalogCollection {
    const filteredCatalogs = new Map<CatalogName, Catalog>();

    for (const [name, catalog] of this.catalogs) {
      if (predicate(catalog)) {
        filteredCatalogs.set(name, catalog);
      }
    }

    return new CatalogCollection(filteredCatalogs);
  }

  /**
   * Find catalogs that contain a specific package
   */
  public findCatalogsWithPackage(packageName: string): Catalog[] {
    return this.getAll().filter((catalog) => catalog.hasDependency(packageName));
  }

  /**
   * Get all unique package names across all catalogs
   */
  public getAllPackageNames(): string[] {
    const packageNames = new Set<string>();

    for (const catalog of this.catalogs.values()) {
      for (const packageName of catalog.getPackageNames()) {
        packageNames.add(packageName);
      }
    }

    return Array.from(packageNames);
  }

  /**
   * Validate all catalogs in the collection
   */
  public validate(): CatalogCollectionValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Check for empty collection
    if (this.isEmpty()) {
      warnings.push('No catalogs found in workspace');
    }

    // Validate each catalog
    for (const catalog of this.catalogs.values()) {
      const result = catalog.validate();
      errors.push(...result.getErrors().map((err) => `Catalog "${catalog.getName()}": ${err}`));
      warnings.push(
        ...result.getWarnings().map((warn) => `Catalog "${catalog.getName()}": ${warn}`)
      );
    }

    // Check for duplicate package definitions across catalogs
    const packageCatalogMap = new Map<string, string[]>();

    for (const catalog of this.catalogs.values()) {
      for (const packageName of catalog.getPackageNames()) {
        if (!packageCatalogMap.has(packageName)) {
          packageCatalogMap.set(packageName, []);
        }
        packageCatalogMap.get(packageName)!.push(catalog.getName());
      }
    }

    // Warn about packages defined in multiple catalogs
    for (const [packageName, catalogNames] of packageCatalogMap) {
      if (catalogNames.length > 1) {
        warnings.push(
          `Package "${packageName}" is defined in multiple catalogs: ${catalogNames.join(', ')}`
        );
      }
    }

    return new CatalogCollectionValidationResult(errors.length === 0, errors, warnings);
  }

  /**
   * Convert to a Map for serialization
   */
  public toMap(): Map<CatalogName, Catalog> {
    return new Map(this.catalogs);
  }

  /**
   * Iterate over catalogs
   */
  public *[Symbol.iterator](): Iterator<[CatalogName, Catalog]> {
    yield* this.catalogs;
  }

  /**
   * Check equality with another catalog collection
   */
  public equals(other: CatalogCollection): boolean {
    if (this.size() !== other.size()) {
      return false;
    }

    for (const [name, catalog] of this.catalogs) {
      const otherCatalog = other.get(name);
      if (!otherCatalog || !catalog.equals(otherCatalog)) {
        return false;
      }
    }

    return true;
  }
}

/**
 * Catalog Collection Validation Result
 */
export class CatalogCollectionValidationResult {
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
