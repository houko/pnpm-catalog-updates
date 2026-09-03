import type {
  CatalogUpdateService,
  FileSystemService,
  IPackageManagerService,
  WorkspaceRepository,
} from '@pcu/core'
import {
  createWorkspaceFingerprint,
  updatePlanFromArtifact,
  verifyUpdatePlanArtifact,
  verifyUpdatePlanPreconditions,
  WorkspacePath,
} from '@pcu/core'
import { CommandExitError } from '@pcu/utils'
import {
  getWorkspaceFilePath,
  printWorkflowJson,
  readUpdatePlanArtifact,
  resolveWorkspacePath,
  WORKFLOW_EXIT_CODES,
} from './workflowCommandHelpers.js'

export interface ApplyCommandOptions {
  workspace?: string
  force?: boolean
  backup?: boolean
  install?: boolean
}

export class ApplyCommand {
  constructor(
    private readonly updateService: CatalogUpdateService,
    private readonly workspaceRepository: WorkspaceRepository,
    private readonly fileSystemService: FileSystemService,
    private readonly packageManagerService: IPackageManagerService
  ) {}

  async execute(planPath: string, options: ApplyCommandOptions = {}): Promise<void> {
    const artifact = await readUpdatePlanArtifact(this.fileSystemService, planPath)
    const workspacePath = resolveWorkspacePath(options.workspace)
    const workspacePathValue = WorkspacePath.fromString(workspacePath)
    const currentWorkspace = await this.workspaceRepository.getByPath(workspacePathValue)
    const beforeVerification = verifyUpdatePlanArtifact(artifact, currentWorkspace)

    if (beforeVerification.success) {
      const installResult = options.install
        ? await this.packageManagerService.install({ cwd: workspacePath, verbose: false })
        : undefined
      const success = installResult?.success ?? true
      printWorkflowJson({
        kind: 'pcu.apply-result',
        schemaVersion: 1,
        success,
        changed: false,
        alreadyApplied: true,
        verification: beforeVerification,
        ...(installResult
          ? {
              install: {
                packageManager: this.packageManagerService.getName(),
                success: installResult.success,
                exitCode: installResult.code,
              },
            }
          : {}),
      })
      if (!success) {
        throw CommandExitError.withCode(
          WORKFLOW_EXIT_CODES.invalidInput,
          'Catalog updates are present, but pnpm install failed'
        )
      }
      return
    }

    const workspaceFile = getWorkspaceFilePath(workspacePath)
    const sourceContent = await this.fileSystemService.readTextFile(workspaceFile)
    const actualSha256 = createWorkspaceFingerprint(sourceContent)

    if (actualSha256 !== artifact.source.sha256) {
      printWorkflowJson({
        kind: 'pcu.apply-result',
        schemaVersion: 1,
        success: false,
        changed: false,
        error: {
          code: 'STALE_PLAN',
          message: 'pnpm-workspace.yaml changed after this plan was created',
          expectedSha256: artifact.source.sha256,
          actualSha256,
        },
      })
      throw CommandExitError.withCode(WORKFLOW_EXIT_CODES.stalePlan, 'Update plan is stale')
    }

    const preconditions = verifyUpdatePlanPreconditions(artifact, currentWorkspace)
    if (!preconditions.success) {
      printWorkflowJson({
        kind: 'pcu.apply-result',
        schemaVersion: 1,
        success: false,
        changed: false,
        error: {
          code: 'PLAN_PRECONDITION_FAILED',
          message: 'The workspace does not contain every planned source version',
          mismatches: preconditions.mismatches,
        },
      })
      throw CommandExitError.withCode(
        WORKFLOW_EXIT_CODES.stalePlan,
        'Update plan preconditions do not match the workspace'
      )
    }

    if (artifact.hasConflicts && !options.force) {
      printWorkflowJson({
        kind: 'pcu.apply-result',
        schemaVersion: 1,
        success: false,
        changed: false,
        error: {
          code: 'UNRESOLVED_CONFLICTS',
          message: 'The plan contains conflicts; review them or apply with --force',
          packages: artifact.conflicts.map((conflict) => conflict.packageName),
        },
      })
      throw CommandExitError.withCode(
        WORKFLOW_EXIT_CODES.unresolvedConflicts,
        'Update plan contains conflicts'
      )
    }

    const result = await this.updateService.executeUpdates(
      updatePlanFromArtifact(artifact, workspacePath),
      {
        workspacePath,
        force: options.force ?? false,
        createBackup: options.backup ?? true,
        requireBackup: options.backup ?? true,
        dryRun: false,
        noSecurity: true,
      }
    )

    const savedWorkspace = await this.workspaceRepository.getByPath(workspacePathValue)
    const verification = verifyUpdatePlanArtifact(artifact, savedWorkspace)
    const executionSucceeded = result.success && result.totalErrors === 0
    const updateSucceeded = executionSucceeded && verification.success
    const installResult =
      options.install && updateSucceeded
        ? await this.packageManagerService.install({ cwd: workspacePath, verbose: false })
        : undefined
    const completeSuccess = updateSucceeded && (installResult?.success ?? true)

    printWorkflowJson({
      kind: 'pcu.apply-result',
      schemaVersion: 1,
      success: completeSuccess,
      changed: executionSucceeded && result.totalUpdated > 0,
      alreadyApplied: false,
      update: {
        totalUpdated: result.totalUpdated,
        totalSkipped: result.totalSkipped,
        totalErrors: result.totalErrors,
        backupPath: result.backupPath,
        errors: result.errors,
      },
      verification,
      ...(installResult
        ? {
            install: {
              packageManager: this.packageManagerService.getName(),
              success: installResult.success,
              exitCode: installResult.code,
            },
          }
        : {}),
    })

    if (!updateSucceeded) {
      const exitCode = executionSucceeded
        ? WORKFLOW_EXIT_CODES.verificationFailed
        : WORKFLOW_EXIT_CODES.invalidInput
      throw CommandExitError.withCode(exitCode, 'Failed to apply the complete update plan')
    }

    if (installResult && !installResult.success) {
      throw CommandExitError.withCode(
        WORKFLOW_EXIT_CODES.invalidInput,
        'Catalog updates applied, but pnpm install failed'
      )
    }
  }
}
