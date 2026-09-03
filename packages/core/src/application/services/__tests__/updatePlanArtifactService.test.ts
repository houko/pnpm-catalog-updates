import { describe, expect, it, vi } from 'vitest'
import type { Workspace } from '../../../domain/entities/workspace.js'
import {
  createUpdatePlanArtifact,
  createWorkspaceFingerprint,
  parseUpdatePlanArtifact,
  updatePlanFromArtifact,
  verifyUpdatePlanArtifact,
  verifyUpdatePlanPreconditions,
} from '../updatePlanArtifactService.js'
import type { UpdatePlan } from '../updatePlanService.js'

const source = `packages:\n  - packages/*\ncatalog:\n  zod: 4.3.6\n`

function createPlan(): UpdatePlan {
  return {
    workspace: { path: '/machine-specific/path', name: 'example' },
    updates: [
      {
        catalogName: 'tools',
        packageName: 'zod',
        currentVersion: '4.3.5',
        newVersion: '4.3.6',
        updateType: 'patch',
        reason: '本地化文本不会进入制品',
        affectedPackages: ['web', 'api'],
      },
      {
        catalogName: 'default',
        packageName: 'typescript',
        currentVersion: '5.8.0',
        newVersion: '5.9.2',
        updateType: 'minor',
        reason: 'Localized display text is excluded',
        affectedPackages: ['web'],
      },
    ],
    conflicts: [],
    totalUpdates: 2,
    hasConflicts: false,
  }
}

describe('update plan artifacts', () => {
  it('creates deterministic, portable artifacts', () => {
    const plan = createPlan()
    const fingerprint = createWorkspaceFingerprint(source)
    const first = createUpdatePlanArtifact(plan, fingerprint, {
      include: ['z*', '@types/*'],
      exclude: ['legacy'],
    })
    const second = createUpdatePlanArtifact(
      {
        ...plan,
        workspace: { path: '/different/agent/path', name: 'example' },
        updates: [...plan.updates].reverse(),
      },
      fingerprint,
      {
        include: ['@types/*', 'z*'],
        exclude: ['legacy'],
      }
    )

    expect(JSON.stringify(first)).toBe(JSON.stringify(second))
    expect(JSON.stringify(first)).not.toContain('/machine-specific/path')
    expect(JSON.stringify(first)).not.toContain('本地化文本')
    expect(first.updates.map((update) => update.catalogName)).toEqual(['default', 'tools'])
    expect(first.updates[1]?.affectedPackages).toEqual(['api', 'web'])
  })

  it('uses locale-independent ordering for deterministic JSON', () => {
    const base = createPlan().updates[0]!
    const artifact = createUpdatePlanArtifact(
      {
        ...createPlan(),
        updates: [
          { ...base, catalogName: 'ä-catalog', packageName: 'ä-package' },
          { ...base, catalogName: 'z-catalog', packageName: 'z-package' },
        ],
        totalUpdates: 2,
      },
      createWorkspaceFingerprint(source),
      { include: ['ä-*', 'z-*'] }
    )

    expect(artifact.updates.map((update) => update.catalogName)).toEqual(['z-catalog', 'ä-catalog'])
    expect(artifact.criteria.include).toEqual(['z-*', 'ä-*'])
  })

  it('rejects malformed and internally inconsistent artifacts', () => {
    const artifact = createUpdatePlanArtifact(createPlan(), createWorkspaceFingerprint(source))

    expect(() =>
      parseUpdatePlanArtifact({
        ...artifact,
        totalUpdates: 99,
      })
    ).toThrow('totalUpdates must match updates.length')

    expect(() =>
      parseUpdatePlanArtifact({
        ...artifact,
        source: { ...artifact.source, sha256: 'not-a-sha' },
      })
    ).toThrow('Invalid update plan artifact')

    expect(() =>
      parseUpdatePlanArtifact({
        ...artifact,
        updates: [artifact.updates[0], artifact.updates[0]],
        totalUpdates: 2,
      })
    ).toThrow('Each catalog package may appear only once')

    expect(() =>
      parseUpdatePlanArtifact({
        ...artifact,
        updates: [{ ...artifact.updates[0], newVersion: 'latest' }],
        totalUpdates: 1,
      })
    ).toThrow('Must be a semantic version')
  })

  it('reconstructs an executable plan at the caller-selected workspace', () => {
    const artifact = createUpdatePlanArtifact(createPlan(), createWorkspaceFingerprint(source))
    const plan = updatePlanFromArtifact(artifact, '/ci/checkout')

    expect(plan.workspace.path).toBe('/ci/checkout')
    expect(plan.updates[0]?.reason).toBe('minor update')
  })

  it('reports exact catalog drift in a stable verification result', () => {
    const artifact = createUpdatePlanArtifact(createPlan(), createWorkspaceFingerprint(source))
    const defaultCatalog = {
      getDependencyVersion: vi.fn().mockReturnValue({ toString: () => '5.9.2' }),
    }
    const toolsCatalog = {
      getDependencyVersion: vi.fn().mockReturnValue({ toString: () => '4.3.5' }),
    }
    const workspace = {
      getCatalogs: () => ({
        get: (name: string) => (name === 'default' ? defaultCatalog : toolsCatalog),
      }),
    } as unknown as Workspace

    expect(verifyUpdatePlanArtifact(artifact, workspace)).toEqual({
      kind: 'pcu.verification',
      schemaVersion: 1,
      success: false,
      checkedUpdates: 2,
      mismatches: [
        {
          catalogName: 'tools',
          packageName: 'zod',
          expectedVersion: '4.3.6',
          actualVersion: '4.3.5',
          reason: 'version-mismatch',
        },
      ],
    })
  })

  it('rejects missing packages and changed source versions before apply', () => {
    const artifact = createUpdatePlanArtifact(createPlan(), createWorkspaceFingerprint(source))
    const defaultCatalog = {
      getDependencyVersion: vi.fn().mockReturnValue({
        toString: () => '^5.7.0',
        getMinVersion: () => ({ toString: () => '5.7.0' }),
      }),
    }
    const toolsCatalog = {
      getDependencyVersion: vi.fn().mockReturnValue(null),
    }
    const workspace = {
      getCatalogs: () => ({
        get: (name: string) => (name === 'default' ? defaultCatalog : toolsCatalog),
      }),
    } as unknown as Workspace

    expect(verifyUpdatePlanPreconditions(artifact, workspace)).toEqual({
      success: false,
      checkedUpdates: 2,
      mismatches: [
        {
          catalogName: 'default',
          packageName: 'typescript',
          expectedCurrentVersion: '5.8.0',
          actualVersion: '^5.7.0',
          reason: 'current-version-mismatch',
        },
        {
          catalogName: 'tools',
          packageName: 'zod',
          expectedCurrentVersion: '4.3.5',
          actualVersion: null,
          reason: 'package-missing',
        },
      ],
    })
  })
})
