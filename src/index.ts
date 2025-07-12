// Main library entry point for pnpm-catalog-updates
// This file exports the core API for programmatic usage

// Core Services
export { CatalogUpdateService } from './application/services/CatalogUpdateService';
export { WorkspaceService } from './application/services/WorkspaceService';

// Domain Entities
export { Catalog } from './domain/entities/Catalog';
export { Package } from './domain/entities/Package';
export { Workspace } from './domain/entities/Workspace';

// Value Objects
export { CatalogCollection } from './domain/value-objects/CatalogCollection';
export { PackageCollection } from './domain/value-objects/PackageCollection';
export { Version } from './domain/value-objects/Version';
export { WorkspaceConfig } from './domain/value-objects/WorkspaceConfig';
export { WorkspaceId } from './domain/value-objects/WorkspaceId';
export { WorkspacePath } from './domain/value-objects/WorkspacePath';

// CLI Components
export { OutputFormatter } from './cli/formatters/OutputFormatter';
export { EnhancedProgressBar } from './cli/formatters/ProgressBar';
export { InteractivePrompts } from './cli/interactive/InteractivePrompts';
export { StyledText, ThemeManager } from './cli/themes/ColorTheme';

// Configuration and Utilities
export { ConfigManager } from './common/config/Config';
export { Logger } from './common/logger/Logger';

// Types
export * from './common/types/cli';
export * from './common/types/core';

// Infrastructure
export { Cache } from './infrastructure/cache/Cache';
export { NpmRegistryService } from './infrastructure/external-services/NpmRegistryService';
export { FileSystemService } from './infrastructure/file-system/FileSystemService';
export { FileWorkspaceRepository } from './infrastructure/repositories/FileWorkspaceRepository';

// Repository Interface
export type { WorkspaceRepository } from './domain/repositories/WorkspaceRepository';
