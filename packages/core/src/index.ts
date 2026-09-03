/**
 * @pcu/core - Core domain and application exports for pnpm-catalog-updates
 *
 * ARCH-001: Refactored to use barrel exports reducing God Object pattern.
 * Consumers can import from specific modules for better tree-shaking:
 *   - import { ... } from '@pcu/core/application'
 *   - import { ... } from '@pcu/core/domain'
 *   - import { ... } from '@pcu/core/infrastructure'
 */

export type {
  // AI Analysis types
  AIAnalysisServiceOptions,
  AnalysisRequestOptions,
  ArtifactPlannedUpdate,
  ArtifactVersionConflict,
  // Backup types
  BackupInfo,
  BackupServiceOptions,
  // Catalog Update types
  CatalogUpdateInfo,
  CatalogUpdateServiceDeps,
  CheckOptions,
  ChunkingConfig,
  ChunkProgress,
  ImpactAnalysis,
  MultiAnalysisResult,
  OutdatedDependencyInfo,
  OutdatedReport,
  // Impact Analysis types
  PackageImpact,
  PlannedUpdate,
  PlanPreconditionMismatch,
  PlanPreconditionMismatchReason,
  // Interface types
  ProgressReporter,
  ProgressReporterOptions,
  SecurityImpact,
  SkippedDependency,
  // Update Executor types
  UpdatedDependency,
  UpdateError,
  UpdateOptions,
  UpdatePlan,
  UpdatePlanArtifact,
  UpdatePlanCriteria,
  UpdatePlanPreconditionVerification,
  UpdatePlanVerification,
  UpdateResult,
  UpdateTarget,
  // Utility types
  UpdateTypeCounts,
  VerificationMismatch,
  VerificationMismatchReason,
  VersionConflict,
  // Workspace types
  WorkspaceStats,
  WorkspaceValidationReport,
} from './application/index.js'
// ============================================================
// Application Layer
// Services, interfaces, and utilities for business logic
// ============================================================
export {
  // Services
  AIAnalysisService,
  BackupService,
  CatalogCheckService,
  CatalogUpdateService,
  // Interfaces
  ConcurrentProgressTracker,
  // Utilities
  countUpdateTypes,
  countUpdateTypesFromCatalogs,
  createUpdatePlanArtifact,
  createWorkspaceFingerprint,
  ImpactAnalysisService,
  parseUpdatePlanArtifact,
  UPDATE_PLAN_ARTIFACT_KIND,
  UPDATE_PLAN_ARTIFACT_SCHEMA_VERSION,
  UPDATE_VERIFICATION_KIND,
  UpdateExecutorService,
  UpdatePlanService,
  updatePlanArtifactSchema,
  updatePlanFromArtifact,
  verifyUpdatePlanArtifact,
  verifyUpdatePlanPreconditions,
  WorkspaceService,
} from './application/index.js'
export type {
  // AI Domain interfaces
  AIConfig,
  AIProvider,
  AIProviderConfig,
  AIProviderInfo,
  AnalysisContext,
  AnalysisResult,
  AnalysisType,
  PackageUpdateInfo,
  Recommendation,
  RiskLevel,
  WorkspaceInfo,
  // Repository interfaces
  WorkspaceRepository,
} from './domain/index.js'
// ============================================================
// Domain Layer
// Core business entities, value objects, and interfaces
// ============================================================
export {
  // Entities
  Catalog,
  // Value Objects
  CatalogCollection,
  Package,
  PackageCollection,
  Version,
  VersionRange,
  Workspace,
  WorkspaceConfig,
  WorkspaceId,
  WorkspacePath,
} from './domain/index.js'
export type {
  // AI types
  AnalysisCacheOptions,
  AnalysisCacheStats,
  BaseProviderOptions,
  // NPM Registry types
  BatchQueryFailure,
  BatchQueryResult,
  // Cache types
  CacheStats,
  // Changelog types
  ChangelogEntry,
  ClaudeProviderOptions,
  CodexProviderOptions,
  GeminiProviderOptions,
  // Package Manager types
  IPackageManagerService,
  PackageChangelog,
  PackageManagerOptions,
  PackageManagerResult,
  // Security Advisory types
  SecurityAdvisoryReport,
  VulnerabilityInfo,
} from './infrastructure/index.js'
// ============================================================
// Infrastructure Layer
// Concrete implementations (use through DI when possible)
// ============================================================
export {
  // AI Infrastructure
  AIDetector,
  AnalysisCache,
  analysisCache,
  BaseAIProvider,
  // Cache Infrastructure
  Cache,
  // External Services
  ChangelogService,
  ClaudeProvider,
  CodexProvider,
  // File System
  FileSystemService,
  // Repository
  FileWorkspaceRepository,
  GeminiProvider,
  initializeCaches,
  NpmRegistryService,
  // Utilities
  NpmrcParser,
  PnpmPackageManagerService,
  RegistryCache,
  RuleEngine,
  registryCache,
  resetAllCaches,
  SecurityAdvisoryService,
  startCacheInitialization,
  WorkspaceCache,
  workspaceCache,
} from './infrastructure/index.js'
