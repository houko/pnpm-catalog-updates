import type { FileSystemService, WorkspaceRepository } from '@pcu/core'
import { verifyUpdatePlanArtifact, WorkspacePath } from '@pcu/core'
import { CommandExitError } from '@pcu/utils'
import {
  printWorkflowJson,
  readUpdatePlanArtifact,
  resolveWorkspacePath,
  WORKFLOW_EXIT_CODES,
} from './workflowCommandHelpers.js'

export interface VerifyCommandOptions {
  workspace?: string
}

export class VerifyCommand {
  constructor(
    private readonly workspaceRepository: WorkspaceRepository,
    private readonly fileSystemService: FileSystemService
  ) {}

  async execute(planPath: string, options: VerifyCommandOptions = {}): Promise<void> {
    const artifact = await readUpdatePlanArtifact(this.fileSystemService, planPath)
    const workspacePath = resolveWorkspacePath(options.workspace)
    const workspace = await this.workspaceRepository.getByPath(
      WorkspacePath.fromString(workspacePath)
    )
    const verification = verifyUpdatePlanArtifact(artifact, workspace)

    printWorkflowJson(verification)

    if (!verification.success) {
      throw CommandExitError.withCode(
        WORKFLOW_EXIT_CODES.verificationFailed,
        'Workspace does not match the update plan'
      )
    }
  }
}
