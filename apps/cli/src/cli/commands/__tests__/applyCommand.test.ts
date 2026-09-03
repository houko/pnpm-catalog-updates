import type {
  CatalogUpdateService,
  FileSystemService,
  IPackageManagerService,
  UpdatePlan,
  Workspace,
  WorkspaceRepository,
} from '@pcu/core'
import { createUpdatePlanArtifact, createWorkspaceFingerprint } from '@pcu/core'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createMockCliOutput, resetCliOutput, setCliOutput } from '../../utils/cliOutput.js'
import { ApplyCommand } from '../applyCommand.js'

const source = `packages: []\ncatalog:\n  lodash: 4.17.20\n`
const plan: UpdatePlan = {
  workspace: { path: '/workspace', name: 'workspace' },
  updates: [
    {
      catalogName: 'default',
      packageName: 'lodash',
      currentVersion: '4.17.20',
      newVersion: '4.17.21',
      updateType: 'patch',
      reason: 'patch update',
      affectedPackages: [],
    },
  ],
  conflicts: [],
  totalUpdates: 1,
  hasConflicts: false,
}
const artifact = createUpdatePlanArtifact(plan, createWorkspaceFingerprint(source))

function workspaceWithVersion(version: string | null): Workspace {
  return {
    getCatalogs: () => ({
      get: () => ({
        getDependencyVersion: () =>
          version === null
            ? null
            : {
                toString: () => version,
                getMinVersion: () => ({ toString: () => version.replace(/^[~^]/, '') }),
              },
      }),
    }),
  } as unknown as Workspace
}

describe('ApplyCommand', () => {
  const output = createMockCliOutput()
  const executeUpdates = vi.fn()
  const getByPath = vi.fn()
  const readJsonFile = vi.fn().mockResolvedValue(artifact)
  const readTextFile = vi.fn().mockResolvedValue(source)
  const install = vi.fn().mockResolvedValue({ success: true, code: 0 })
  const getName = vi.fn().mockReturnValue('pnpm')

  beforeEach(() => {
    vi.clearAllMocks()
    readJsonFile.mockResolvedValue(artifact)
    readTextFile.mockResolvedValue(source)
    install.mockResolvedValue({ success: true, code: 0 })
    setCliOutput(output.mock)
    output.clear()
  })

  afterEach(() => resetCliOutput())

  function createCommand(): ApplyCommand {
    return new ApplyCommand(
      { executeUpdates } as unknown as CatalogUpdateService,
      { getByPath } as unknown as WorkspaceRepository,
      { readJsonFile, readTextFile } as unknown as FileSystemService,
      { install, getName } as unknown as IPackageManagerService
    )
  }

  it('retries install when catalog updates are already applied', async () => {
    getByPath.mockResolvedValue(workspaceWithVersion('4.17.21'))

    await createCommand().execute('/plan.json', { workspace: '/workspace', install: true })

    expect(install).toHaveBeenCalledWith({ cwd: '/workspace', verbose: false })
    expect(executeUpdates).not.toHaveBeenCalled()
    expect(JSON.parse(String(output.prints[0]?.[0]))).toMatchObject({
      success: true,
      changed: false,
      alreadyApplied: true,
      install: { packageManager: 'pnpm', success: true, exitCode: 0 },
    })
  })

  it('fails before mutation when a planned package is missing', async () => {
    getByPath.mockResolvedValue(workspaceWithVersion(null))

    await expect(
      createCommand().execute('/plan.json', { workspace: '/workspace' })
    ).rejects.toMatchObject({ exitCode: 3 })

    expect(executeUpdates).not.toHaveBeenCalled()
    expect(JSON.parse(String(output.prints[0]?.[0]))).toMatchObject({
      success: false,
      changed: false,
      error: {
        code: 'PLAN_PRECONDITION_FAILED',
        mismatches: [{ reason: 'package-missing' }],
      },
    })
  })
})
