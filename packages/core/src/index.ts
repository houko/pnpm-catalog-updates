// Core domain and application exports for pnpm-catalog-updates

// Application Services
export { CatalogUpdateService } from './application/services/catalogUpdateService';
export { WorkspaceService } from './application/services/workspaceService';

// Application Service Types
export type {
  CheckOptions,
  ImpactAnalysis,
  OutdatedReport,
  UpdateOptions,
  UpdatePlan,
  UpdateResult,
  UpdateTarget,
} from './application/services/catalogUpdateService';

export type {
  WorkspaceStats,
  WorkspaceValidationReport,
} from './application/services/workspaceService';

// Domain Entities
export { Catalog } from './domain/entities/catalog';
export { Package } from './domain/entities/package';
export { Workspace } from './domain/entities/workspace';

// Value Objects
export { CatalogCollection } from './domain/value-objects/catalogCollection';
export { PackageCollection } from './domain/value-objects/packageCollection';
export { Version } from './domain/value-objects/version';
export { WorkspaceConfig } from './domain/value-objects/workspaceConfig';
export { WorkspaceId } from './domain/value-objects/workspaceId';
export { WorkspacePath } from './domain/value-objects/workspacePath';

// Repository Interface
export type { WorkspaceRepository } from './domain/repositories/workspaceRepository';

// Application Interfaces
export type {
  ProgressReporter,
  ProgressReporterOptions,
} from './application/interfaces/progressReporter';

// Infrastructure
export { Cache } from './infrastructure/cache/cache';
export { NpmRegistryService } from './infrastructure/external-services/npmRegistryService';
export { FileSystemService } from './infrastructure/file-system/fileSystemService';
export { FileWorkspaceRepository } from './infrastructure/repositories/fileWorkspaceRepository';
export { NpmrcParser } from './infrastructure/utils/npmrcParser';
