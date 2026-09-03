/**
 * Application Layer Exports
 *
 * ARCH-001: Barrel file for application layer to reduce God Object pattern.
 * Contains application services, interfaces, and utilities.
 */

// Application Interfaces
export type {
  ProgressReporter,
  ProgressReporterOptions,
} from './interfaces/progressReporter.js'
export { ConcurrentProgressTracker } from './interfaces/progressReporter.js'

// AI Analysis Service
export type {
  AIAnalysisServiceOptions,
  AnalysisRequestOptions,
  ChunkingConfig,
  ChunkProgress,
  MultiAnalysisResult,
} from './services/aiAnalysisService.js'
export { AIAnalysisService } from './services/aiAnalysisService.js'

// Backup Service
export type {
  BackupInfo,
  BackupServiceOptions,
  RollbackVerificationResult,
} from './services/backupService.js'
export { BackupService } from './services/backupService.js'
// Extracted Services
export { CatalogCheckService } from './services/catalogCheckService.js'
// Catalog Update Service and Types
export type {
  CatalogUpdateInfo,
  CatalogUpdateServiceDeps,
  CheckOptions,
  ImpactAnalysis,
  OutdatedDependencyInfo,
  OutdatedReport,
  PlannedUpdate,
  UpdateOptions,
  UpdatePlan,
  UpdateResult,
  UpdateTarget,
  VersionConflict,
} from './services/catalogUpdateService.js'
export { CatalogUpdateService } from './services/catalogUpdateService.js'
// Impact Analysis Service
export type { PackageImpact, SecurityImpact } from './services/impactAnalysisService.js'
export { ImpactAnalysisService } from './services/impactAnalysisService.js'
export type {
  SkippedDependency,
  UpdatedDependency,
  UpdateError,
} from './services/updateExecutorService.js'
export { UpdateExecutorService } from './services/updateExecutorService.js'
export type {
  ArtifactPlannedUpdate,
  ArtifactVersionConflict,
  UpdatePlanArtifact,
  UpdatePlanCriteria,
  UpdatePlanVerification,
  VerificationMismatch,
  VerificationMismatchReason,
} from './services/updatePlanArtifactService.js'
export {
  createUpdatePlanArtifact,
  createWorkspaceFingerprint,
  parseUpdatePlanArtifact,
  UPDATE_PLAN_ARTIFACT_KIND,
  UPDATE_PLAN_ARTIFACT_SCHEMA_VERSION,
  UPDATE_VERIFICATION_KIND,
  updatePlanArtifactSchema,
  updatePlanFromArtifact,
  verifyUpdatePlanArtifact,
} from './services/updatePlanArtifactService.js'
export { UpdatePlanService } from './services/updatePlanService.js'

// Workspace Service
export type {
  WorkspaceStats,
  WorkspaceValidationReport,
} from './services/workspaceService.js'
export { WorkspaceService } from './services/workspaceService.js'

// Application Utilities
export type { UpdateTypeCounts } from './utils/statisticsUtils.js'
export { countUpdateTypes, countUpdateTypesFromCatalogs } from './utils/statisticsUtils.js'
