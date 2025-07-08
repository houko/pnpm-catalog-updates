/**
 * Package Entity
 *
 * Represents a package in a pnpm workspace that may reference catalog dependencies.
 * Handles package.json structure and catalog dependency references.
 */

import { WorkspacePath } from '../value-objects/WorkspacePath.js';

export type PackageId = string;
export type PackageName = string;
export type DependencyType =
  | 'dependencies'
  | 'devDependencies'
  | 'peerDependencies'
  | 'optionalDependencies';

export class Package {
  private readonly id: PackageId;
  private readonly name: PackageName;
  private readonly path: WorkspacePath;
  private readonly dependencies: DependencyCollection;
  private readonly catalogReferences: CatalogReference[];
  private readonly originalData: PackageJsonData;

  private constructor(
    id: PackageId,
    name: PackageName,
    path: WorkspacePath,
    dependencies: DependencyCollection,
    catalogReferences: CatalogReference[],
    originalData: PackageJsonData
  ) {
    this.id = id;
    this.name = name;
    this.path = path;
    this.dependencies = dependencies;
    this.catalogReferences = [...catalogReferences];
    this.originalData = { ...originalData };
  }

  /**
   * Create a new Package
   */
  public static create(
    id: PackageId,
    name: PackageName,
    path: WorkspacePath,
    packageJsonData: PackageJsonData
  ): Package {
    const dependencies = DependencyCollection.fromPackageJson(packageJsonData);
    const catalogReferences = Package.extractCatalogReferences(packageJsonData);

    return new Package(id, name, path, dependencies, catalogReferences, packageJsonData);
  }

  /**
   * Get package identifier
   */
  public getId(): PackageId {
    return this.id;
  }

  /**
   * Get package name
   */
  public getName(): PackageName {
    return this.name;
  }

  /**
   * Get package path
   */
  public getPath(): WorkspacePath {
    return this.path;
  }

  /**
   * Get all dependencies
   */
  public getDependencies(): DependencyCollection {
    return this.dependencies;
  }

  /**
   * Get catalog references
   */
  public getCatalogReferences(): CatalogReference[] {
    return [...this.catalogReferences];
  }

  /**
   * Get catalog dependencies only
   */
  public getCatalogDependencies(): CatalogDependency[] {
    return this.catalogReferences.map(
      (ref) =>
        new CatalogDependency(ref.getPackageName(), ref.getCatalogName(), ref.getDependencyType())
    );
  }

  /**
   * Check if package uses a specific catalog dependency
   */
  public usesCatalogDependency(catalogName: string, packageName: string): boolean {
    return this.catalogReferences.some(
      (ref) => ref.getCatalogName() === catalogName && ref.getPackageName() === packageName
    );
  }

  /**
   * Update a dependency from catalog
   */
  public updateDependencyFromCatalog(
    catalogName: string,
    packageName: string,
    _newVersion: string
  ): void {
    const reference = this.catalogReferences.find(
      (ref) => ref.getCatalogName() === catalogName && ref.getPackageName() === packageName
    );

    if (!reference) {
      throw new Error(
        `Package "${this.name}" does not reference "${packageName}" from catalog "${catalogName}"`
      );
    }

    // Update the dependency in the collection
    this.dependencies.updateDependency(
      reference.getDependencyType(),
      packageName,
      `catalog:${catalogName === 'default' ? '' : catalogName}`
    );
  }

  /**
   * Get dependencies of a specific type
   */
  public getDependenciesByType(type: DependencyType): Map<string, string> {
    return this.dependencies.getDependenciesByType(type);
  }

  /**
   * Get package.json data representation
   */
  public toPackageJsonData(): PackageJsonData {
    // Start with original package.json to preserve fields like scripts, author, etc.
    const data: PackageJsonData = { ...this.originalData };

    // Replace dependency sections with updated versions
    data.dependencies = Object.fromEntries(this.dependencies.getDependenciesByType('dependencies'));
    data.devDependencies = Object.fromEntries(
      this.dependencies.getDependenciesByType('devDependencies')
    );
    data.peerDependencies = Object.fromEntries(
      this.dependencies.getDependenciesByType('peerDependencies')
    );
    data.optionalDependencies = Object.fromEntries(
      this.dependencies.getDependenciesByType('optionalDependencies')
    );

    return data;
  }

  /**
   * Extract catalog references from package.json data
   */
  private static extractCatalogReferences(packageJsonData: PackageJsonData): CatalogReference[] {
    const references: CatalogReference[] = [];
    const dependencyTypes: DependencyType[] = [
      'dependencies',
      'devDependencies',
      'peerDependencies',
      'optionalDependencies',
    ];

    for (const depType of dependencyTypes) {
      const deps = packageJsonData[depType] || {};

      for (const [packageName, version] of Object.entries(deps)) {
        if (typeof version === 'string' && version.startsWith('catalog:')) {
          const catalogName = version === 'catalog:' ? 'default' : version.substring(8);
          references.push(new CatalogReference(catalogName, packageName, depType));
        }
      }
    }

    return references;
  }

  /**
   * Validate package structure
   */
  public validate(): PackageValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Validate package name
    if (!this.isValidPackageName(this.name)) {
      errors.push(`Invalid package name: "${this.name}"`);
    }

    // Validate catalog references
    for (const ref of this.catalogReferences) {
      if (!this.isValidPackageName(ref.getPackageName())) {
        errors.push(`Invalid dependency name in catalog reference: "${ref.getPackageName()}"`);
      }
    }

    return new PackageValidationResult(errors.length === 0, errors, warnings);
  }

  /**
   * Check if package name is valid
   */
  private isValidPackageName(packageName: string): boolean {
    const validPackageNameRegex = /^(@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/;
    return validPackageNameRegex.test(packageName);
  }

  /**
   * Check equality with another package
   */
  public equals(other: Package): boolean {
    return this.id === other.id && this.name === other.name && this.path.equals(other.path);
  }
}

/**
 * Catalog Reference Value Object
 */
export class CatalogReference {
  constructor(
    private readonly catalogName: string,
    private readonly packageName: string,
    private readonly dependencyType: DependencyType
  ) {}

  public getCatalogName(): string {
    return this.catalogName;
  }

  public getPackageName(): string {
    return this.packageName;
  }

  public getDependencyType(): DependencyType {
    return this.dependencyType;
  }

  public equals(other: CatalogReference): boolean {
    return (
      this.catalogName === other.catalogName &&
      this.packageName === other.packageName &&
      this.dependencyType === other.dependencyType
    );
  }
}

/**
 * Catalog Dependency Value Object
 */
export class CatalogDependency {
  constructor(
    private readonly packageName: string,
    private readonly catalogName: string,
    private readonly dependencyType: DependencyType
  ) {}

  public getPackageName(): string {
    return this.packageName;
  }

  public getCatalogName(): string {
    return this.catalogName;
  }

  public getDependencyType(): DependencyType {
    return this.dependencyType;
  }
}

/**
 * Dependency Collection Value Object
 */
export class DependencyCollection {
  private readonly dependencies: Map<DependencyType, Map<string, string>>;

  private constructor(dependencies: Map<DependencyType, Map<string, string>>) {
    this.dependencies = dependencies;
  }

  public static empty(): DependencyCollection {
    const deps = new Map<DependencyType, Map<string, string>>();
    deps.set('dependencies', new Map());
    deps.set('devDependencies', new Map());
    deps.set('peerDependencies', new Map());
    deps.set('optionalDependencies', new Map());
    return new DependencyCollection(deps);
  }

  public static fromPackageJson(packageJsonData: PackageJsonData): DependencyCollection {
    const deps = new Map<DependencyType, Map<string, string>>();

    deps.set('dependencies', new Map(Object.entries(packageJsonData.dependencies || {})));
    deps.set('devDependencies', new Map(Object.entries(packageJsonData.devDependencies || {})));
    deps.set('peerDependencies', new Map(Object.entries(packageJsonData.peerDependencies || {})));
    deps.set(
      'optionalDependencies',
      new Map(Object.entries(packageJsonData.optionalDependencies || {}))
    );

    return new DependencyCollection(deps);
  }

  public getDependenciesByType(type: DependencyType): Map<string, string> {
    return new Map(this.dependencies.get(type) || []);
  }

  public updateDependency(type: DependencyType, packageName: string, version: string): void {
    const typeMap = this.dependencies.get(type);
    if (typeMap) {
      typeMap.set(packageName, version);
    }
  }

  public filterByCatalogDependency(
    _catalogName: string,
    _packageName: string
  ): DependencyCollection {
    // This would filter dependencies that match catalog references
    // Implementation would require catalog reference information
    return this;
  }
}

/**
 * Package.json Data Interface
 */
export interface PackageJsonData {
  name: string;
  version?: string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
  optionalDependencies?: Record<string, string>;
  [key: string]: any;
}

/**
 * Package Validation Result
 */
export class PackageValidationResult {
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
