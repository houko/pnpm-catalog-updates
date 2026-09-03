import path from 'node:path'
import type { CatalogUpdateService, FileSystemService, UpdateTarget } from '@pcu/core'
import { createUpdatePlanArtifact, createWorkspaceFingerprint } from '@pcu/core'
import { CommandExitError } from '@pcu/utils'
import {
  getWorkspaceFilePath,
  printWorkflowJson,
  resolveWorkspacePath,
  WORKFLOW_EXIT_CODES,
} from './workflowCommandHelpers.js'

export interface PlanCommandOptions {
  workspace?: string
  catalog?: string
  target?: UpdateTarget
  prerelease?: boolean
  include?: string[]
  exclude?: string[]
  security?: boolean
  out?: string
}

export class PlanCommand {
  constructor(
    private readonly updateService: CatalogUpdateService,
    private readonly fileSystemService: FileSystemService
  ) {}

  async execute(options: PlanCommandOptions = {}): Promise<void> {
    const workspacePath = resolveWorkspacePath(options.workspace)
    const workspaceFile = getWorkspaceFilePath(workspacePath)
    const sourceContentBeforePlanning = await this.fileSystemService.readTextFile(workspaceFile)
    const sourceSha256 = createWorkspaceFingerprint(sourceContentBeforePlanning)
    const target = options.target ?? 'latest'
    const include = options.include ?? []
    const exclude = options.exclude ?? []
    const securityChecks = options.security ?? false

    const plan = await this.updateService.planUpdates({
      workspacePath,
      catalogName: options.catalog,
      target,
      includePrerelease: options.prerelease ?? false,
      include,
      exclude,
      progressReporter: null,
      noSecurity: !securityChecks,
    })

    const sourceContentAfterPlanning = await this.fileSystemService.readTextFile(workspaceFile)
    const finalSourceSha256 = createWorkspaceFingerprint(sourceContentAfterPlanning)
    if (sourceSha256 !== finalSourceSha256) {
      printWorkflowJson({
        kind: 'pcu.plan-result',
        schemaVersion: 1,
        success: false,
        error: {
          code: 'SOURCE_CHANGED_DURING_PLANNING',
          message: 'pnpm-workspace.yaml changed while the plan was being created; retry planning',
        },
      })
      throw CommandExitError.withCode(
        WORKFLOW_EXIT_CODES.stalePlan,
        'Workspace changed while planning'
      )
    }

    const artifact = createUpdatePlanArtifact(plan, sourceSha256, {
      target,
      includePrerelease: options.prerelease ?? false,
      securityChecks,
      catalogName: options.catalog,
      include,
      exclude,
    })

    if (options.out) {
      await this.fileSystemService.writeJsonFile(path.resolve(options.out), artifact)
    }

    printWorkflowJson(artifact)
  }
}
