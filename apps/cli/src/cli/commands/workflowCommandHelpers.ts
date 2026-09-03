import path from 'node:path'
import type { FileSystemService, UpdatePlanArtifact } from '@pcu/core'
import { parseUpdatePlanArtifact } from '@pcu/core'
import { cliOutput } from '../utils/cliOutput.js'

export const WORKFLOW_EXIT_CODES = {
  success: 0,
  invalidInput: 2,
  stalePlan: 3,
  verificationFailed: 4,
  unresolvedConflicts: 5,
} as const

export function resolveWorkspacePath(workspace?: string): string {
  return path.resolve(workspace ?? process.cwd())
}

export function getWorkspaceFilePath(workspacePath: string): string {
  return path.join(workspacePath, 'pnpm-workspace.yaml')
}

export async function readUpdatePlanArtifact(
  fileSystemService: FileSystemService,
  planPath: string
): Promise<UpdatePlanArtifact> {
  const input = await fileSystemService.readJsonFile<unknown>(path.resolve(planPath))
  return parseUpdatePlanArtifact(input)
}

export function printWorkflowJson(value: unknown): void {
  cliOutput.print(JSON.stringify(value, null, 2))
}
