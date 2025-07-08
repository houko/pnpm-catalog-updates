/**
 * WorkspaceConfig Value Object
 * 
 * Represents the configuration settings for a pnpm workspace.
 * Includes catalog mode, package patterns, and other workspace-specific settings.
 */

import { CatalogMode } from '../entities/Catalog.js';

export class WorkspaceConfig {
  private readonly catalogMode: CatalogMode;
  private readonly packagePatterns: string[];
  private readonly catalogs: Map<string, CatalogDefinition>;
  private readonly shamefullyHoist: boolean;
  private readonly linkWorkspacePackages: boolean | 'deep';

  private constructor(
    catalogMode: CatalogMode,
    packagePatterns: string[],
    catalogs: Map<string, CatalogDefinition>,
    shamefullyHoist: boolean = false,
    linkWorkspacePackages: boolean | 'deep' = true
  ) {
    this.catalogMode = catalogMode;
    this.packagePatterns = [...packagePatterns];
    this.catalogs = new Map(catalogs);
    this.shamefullyHoist = shamefullyHoist;
    this.linkWorkspacePackages = linkWorkspacePackages;
  }

  /**
   * Create a WorkspaceConfig from pnpm-workspace.yaml data
   */
  public static fromWorkspaceData(data: PnpmWorkspaceData): WorkspaceConfig {
    const packagePatterns = data.packages || [];
    const catalogMode = data.catalogMode || CatalogMode.MANUAL;
    
    // Process catalogs
    const catalogs = new Map<string, CatalogDefinition>();
    
    // Add default catalog if exists
    if (data.catalog) {
      catalogs.set('default', new CatalogDefinition('default', data.catalog));
    }
    
    // Add named catalogs if they exist
    if (data.catalogs) {
      for (const [name, dependencies] of Object.entries(data.catalogs)) {
        catalogs.set(name, new CatalogDefinition(name, dependencies));
      }
    }

    return new WorkspaceConfig(
      catalogMode,
      packagePatterns,
      catalogs,
      data.shamefullyHoist,
      data.linkWorkspacePackages
    );
  }

  /**
   * Create a default WorkspaceConfig
   */
  public static createDefault(): WorkspaceConfig {
    return new WorkspaceConfig(
      CatalogMode.MANUAL,
      ['packages/*'],
      new Map(),
      false,
      true
    );
  }

  /**
   * Get catalog mode
   */
  public getCatalogMode(): CatalogMode {
    return this.catalogMode;
  }

  /**
   * Get package patterns
   */
  public getPackagePatterns(): string[] {
    return [...this.packagePatterns];
  }

  /**
   * Get catalog definitions
   */
  public getCatalogDefinitions(): Map<string, CatalogDefinition> {
    return new Map(this.catalogs);
  }

  /**
   * Get a specific catalog definition
   */
  public getCatalogDefinition(name: string): CatalogDefinition | undefined {
    return this.catalogs.get(name);
  }

  /**
   * Check if a catalog is defined
   */
  public hasCatalog(name: string): boolean {
    return this.catalogs.has(name);
  }

  /**
   * Get all catalog names
   */
  public getCatalogNames(): string[] {
    return Array.from(this.catalogs.keys());
  }

  /**
   * Check if shamefully hoist is enabled
   */
  public isShamefullyHoist(): boolean {
    return this.shamefullyHoist;
  }

  /**
   * Get link workspace packages setting
   */
  public getLinkWorkspacePackages(): boolean | 'deep' {
    return this.linkWorkspacePackages;
  }

  /**
   * Check if workspace has any catalogs
   */
  public hasCatalogs(): boolean {
    return this.catalogs.size > 0;
  }

  /**
   * Get the default catalog definition
   */
  public getDefaultCatalog(): CatalogDefinition | undefined {
    return this.catalogs.get('default');
  }

  /**
   * Validate workspace configuration
   */
  public validate(): WorkspaceConfigValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Validate package patterns
    if (this.packagePatterns.length === 0) {
      warnings.push('No package patterns defined - workspace may not discover any packages');
    }

    // Validate package patterns format
    for (const pattern of this.packagePatterns) {
      if (!pattern || pattern.trim().length === 0) {
        errors.push('Empty package pattern found');
      }
      
      // Basic glob pattern validation
      if (pattern.includes('**') && pattern.indexOf('**') !== pattern.lastIndexOf('**')) {
        warnings.push(`Complex glob pattern may be inefficient: ${pattern}`);
      }
    }

    // Validate catalog definitions
    for (const [name, catalogDef] of this.catalogs) {
      const validationResult = catalogDef.validate();
      errors.push(...validationResult.getErrors().map(err => `Catalog "${name}": ${err}`));
      warnings.push(...validationResult.getWarnings().map(warn => `Catalog "${name}": ${warn}`));
    }

    // Check for conflicting settings
    if (this.catalogMode === CatalogMode.STRICT && this.catalogs.size === 0) {
      errors.push('Catalog mode is set to "strict" but no catalogs are defined');
    }

    return new WorkspaceConfigValidationResult(errors.length === 0, errors, warnings);
  }

  /**
   * Convert to pnpm-workspace.yaml data format
   */
  public toPnpmWorkspaceData(): PnpmWorkspaceData {
    const data: PnpmWorkspaceData = {
      packages: this.packagePatterns,
    };

    // Add catalog mode if not default
    if (this.catalogMode !== CatalogMode.MANUAL) {
      data.catalogMode = this.catalogMode;
    }

    // Add catalogs
    const defaultCatalog = this.catalogs.get('default');
    if (defaultCatalog) {
      data.catalog = defaultCatalog.getDependencies();
    }

    const namedCatalogs: Record<string, Record<string, string>> = {};
    for (const [name, catalogDef] of this.catalogs) {
      if (name !== 'default') {
        namedCatalogs[name] = catalogDef.getDependencies();
      }
    }

    if (Object.keys(namedCatalogs).length > 0) {
      data.catalogs = namedCatalogs;
    }

    // Add other settings if not default
    if (this.shamefullyHoist) {
      data.shamefullyHoist = this.shamefullyHoist;
    }

    if (this.linkWorkspacePackages !== true) {
      data.linkWorkspacePackages = this.linkWorkspacePackages;
    }

    return data;
  }

  /**
   * Check equality with another WorkspaceConfig
   */
  public equals(other: WorkspaceConfig): boolean {
    return (
      this.catalogMode === other.catalogMode &&
      JSON.stringify(this.packagePatterns) === JSON.stringify(other.packagePatterns) &&
      this.shamefullyHoist === other.shamefullyHoist &&
      this.linkWorkspacePackages === other.linkWorkspacePackages &&
      this.catalogsEqual(other.catalogs)
    );
  }

  /**
   * Check if catalog definitions are equal
   */
  private catalogsEqual(otherCatalogs: Map<string, CatalogDefinition>): boolean {
    if (this.catalogs.size !== otherCatalogs.size) {
      return false;
    }

    for (const [name, catalogDef] of this.catalogs) {
      const otherCatalogDef = otherCatalogs.get(name);
      if (!otherCatalogDef || !catalogDef.equals(otherCatalogDef)) {
        return false;
      }
    }

    return true;
  }
}

/**
 * Catalog Definition Value Object
 */
export class CatalogDefinition {
  private readonly name: string;
  private readonly dependencies: Record<string, string>;

  constructor(name: string, dependencies: Record<string, string>) {
    this.name = name;
    this.dependencies = { ...dependencies };
  }

  public getName(): string {
    return this.name;
  }

  public getDependencies(): Record<string, string> {
    return { ...this.dependencies };
  }

  public getDependencyNames(): string[] {
    return Object.keys(this.dependencies);
  }

  public hasDependency(packageName: string): boolean {
    return packageName in this.dependencies;
  }

  public getDependencyVersion(packageName: string): string | undefined {
    return this.dependencies[packageName];
  }

  public validate(): CatalogDefinitionValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Validate name
    if (!this.name || this.name.trim().length === 0) {
      errors.push('Catalog name cannot be empty');
    }

    // Validate dependencies
    for (const [packageName, version] of Object.entries(this.dependencies)) {
      if (!packageName || packageName.trim().length === 0) {
        errors.push('Package name cannot be empty');
      }

      if (!version || version.trim().length === 0) {
        errors.push(`Version for package "${packageName}" cannot be empty`);
      }

      // Basic package name validation
      if (!/^(@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(packageName)) {
        warnings.push(`Package name "${packageName}" may not be valid`);
      }
    }

    return new CatalogDefinitionValidationResult(errors.length === 0, errors, warnings);
  }

  public equals(other: CatalogDefinition): boolean {
    return (
      this.name === other.name &&
      JSON.stringify(this.dependencies) === JSON.stringify(other.dependencies)
    );
  }
}

/**
 * pnpm-workspace.yaml data interface
 */
export interface PnpmWorkspaceData {
  packages: string[];
  catalog?: Record<string, string>;
  catalogs?: Record<string, Record<string, string>>;
  catalogMode?: CatalogMode;
  shamefullyHoist?: boolean;
  linkWorkspacePackages?: boolean | 'deep';
  [key: string]: any;
}

/**
 * Workspace Config Validation Result
 */
export class WorkspaceConfigValidationResult {
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

/**
 * Catalog Definition Validation Result
 */
export class CatalogDefinitionValidationResult {
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