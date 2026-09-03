import path from 'node:path'
import type { CatalogUpdateService, FileSystemService, UpdatePlan } from '@pcu/core'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createMockCliOutput, resetCliOutput, setCliOutput } from '../../utils/cliOutput.js'
import { PlanCommand } from '../planCommand.js'

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
      reason: 'display only',
      affectedPackages: [],
    },
  ],
  conflicts: [],
  totalUpdates: 1,
  hasConflicts: false,
}

describe('PlanCommand', () => {
  const output = createMockCliOutput()
  const planUpdates = vi.fn().mockResolvedValue(plan)
  const readTextFile = vi.fn().mockResolvedValue(source)
  const writeJsonFile = vi.fn().mockResolvedValue(undefined)

  beforeEach(() => {
    vi.clearAllMocks()
    readTextFile.mockResolvedValue(source)
    setCliOutput(output.mock)
    output.clear()
  })

  afterEach(() => {
    resetCliOutput()
  })

  function createCommand(): PlanCommand {
    return new PlanCommand(
      { planUpdates } as unknown as CatalogUpdateService,
      { readTextFile, writeJsonFile } as unknown as FileSystemService
    )
  }

  it('prints and optionally writes the same portable artifact', async () => {
    const command = createCommand()

    await command.execute({
      workspace: '/workspace',
      target: 'minor',
      include: ['lodash'],
      out: 'review/plan.json',
    })

    expect(planUpdates).toHaveBeenCalledWith(
      expect.objectContaining({
        workspacePath: '/workspace',
        target: 'minor',
        include: ['lodash'],
        progressReporter: null,
        noSecurity: true,
      })
    )
    const writtenArtifact = writeJsonFile.mock.calls[0]?.[1]
    expect(writeJsonFile).toHaveBeenCalledWith(path.resolve('review/plan.json'), writtenArtifact)
    expect(JSON.parse(String(output.prints[0]?.[0]))).toEqual(writtenArtifact)
  })

  it('refuses to publish a plan when the source changes during discovery', async () => {
    readTextFile.mockResolvedValueOnce(source).mockResolvedValueOnce(`${source}# concurrent edit\n`)

    await expect(createCommand().execute({ workspace: '/workspace' })).rejects.toMatchObject({
      exitCode: 3,
    })

    expect(writeJsonFile).not.toHaveBeenCalled()
    expect(JSON.parse(String(output.prints[0]?.[0]))).toMatchObject({
      success: false,
      error: { code: 'SOURCE_CHANGED_DURING_PLANNING' },
    })
  })
})
