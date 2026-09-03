/**
 * Stable, portable update-plan artifacts for automation and agent workflows.
 *
 * The artifact deliberately excludes timestamps, absolute paths, and localized
 * display text so identical inputs produce identical JSON.
 */

import { createHash } from 'node:crypto'
import { z } from 'zod'
import type { Workspace } from '../../domain/entities/workspace.js'
import { Version } from '../../domain/value-objects/version.js'
import type { UpdateTarget } from './catalogCheckService.js'
import type { PlannedUpdate, UpdatePlan, VersionConflict } from './updatePlanService.js'

export const UPDATE_PLAN_ARTIFACT_KIND = 'pcu.update-plan' as const
export const UPDATE_PLAN_ARTIFACT_SCHEMA_VERSION = 1 as const
export const UPDATE_VERIFICATION_KIND = 'pcu.verification' as const

const updateTypeSchema = z.enum(['major', 'minor', 'patch'])
const updateTargetSchema = z.enum(['latest', 'greatest', 'minor', 'patch', 'newest'])

const artifactUpdateSchema = z
  .object({
    catalogName: z.string().min(1),
    packageName: z.string().min(1),
    currentVersion: z.string().refine(isSemanticVersion, 'Must be a semantic version'),
    newVersion: z.string().refine(isSemanticVersion, 'Must be a semantic version'),
    updateType: updateTypeSchema,
    affectedPackages: z.array(z.string()),
    requireConfirmation: z.boolean(),
    autoUpdate: z.boolean(),
    groupUpdate: z.boolean(),
  })
  .strict()

const artifactConflictSchema = z
  .object({
    packageName: z.string().min(1),
    catalogs: z.array(
      z
        .object({
          catalogName: z.string().min(1),
          currentVersion: z.string().min(1),
          proposedVersion: z.string().min(1),
        })
        .strict()
    ),
  })
  .strict()

export const updatePlanArtifactSchema = z
  .object({
    kind: z.literal(UPDATE_PLAN_ARTIFACT_KIND),
    schemaVersion: z.literal(UPDATE_PLAN_ARTIFACT_SCHEMA_VERSION),
    workspace: z
      .object({
        name: z.string().min(1),
      })
      .strict(),
    source: z
      .object({
        file: z.literal('pnpm-workspace.yaml'),
        sha256: z.string().regex(/^[a-f0-9]{64}$/),
      })
      .strict(),
    criteria: z
      .object({
        target: updateTargetSchema,
        includePrerelease: z.boolean(),
        securityChecks: z.boolean(),
        catalogName: z.string().min(1).optional(),
        include: z.array(z.string()),
        exclude: z.array(z.string()),
      })
      .strict(),
    updates: z.array(artifactUpdateSchema),
    conflicts: z.array(artifactConflictSchema),
    totalUpdates: z.number().int().nonnegative(),
    hasConflicts: z.boolean(),
  })
  .strict()
  .superRefine((artifact, context) => {
    if (artifact.totalUpdates !== artifact.updates.length) {
      context.addIssue({
        code: 'custom',
        message: 'totalUpdates must match updates.length',
        path: ['totalUpdates'],
      })
    }
    if (artifact.hasConflicts !== artifact.conflicts.length > 0) {
      context.addIssue({
        code: 'custom',
        message: 'hasConflicts must match conflicts.length',
        path: ['hasConflicts'],
      })
    }

    const updateKeys = new Set<string>()
    for (const [index, update] of artifact.updates.entries()) {
      const key = `${update.catalogName}\0${update.packageName}`
      if (updateKeys.has(key)) {
        context.addIssue({
          code: 'custom',
          message: 'Each catalog package may appear only once',
          path: ['updates', index],
        })
      }
      updateKeys.add(key)
    }
  })

export type UpdatePlanArtifact = z.infer<typeof updatePlanArtifactSchema>
export type ArtifactPlannedUpdate = UpdatePlanArtifact['updates'][number]
export type ArtifactVersionConflict = UpdatePlanArtifact['conflicts'][number]

export interface UpdatePlanCriteria {
  target?: UpdateTarget
  includePrerelease?: boolean
  securityChecks?: boolean
  catalogName?: string
  include?: string[]
  exclude?: string[]
}

export type VerificationMismatchReason = 'catalog-missing' | 'package-missing' | 'version-mismatch'

export interface VerificationMismatch {
  catalogName: string
  packageName: string
  expectedVersion: string
  actualVersion: string | null
  reason: VerificationMismatchReason
}

export interface UpdatePlanVerification {
  kind: typeof UPDATE_VERIFICATION_KIND
  schemaVersion: typeof UPDATE_PLAN_ARTIFACT_SCHEMA_VERSION
  success: boolean
  checkedUpdates: number
  mismatches: VerificationMismatch[]
}

function isSemanticVersion(value: string): boolean {
  try {
    Version.fromString(value)
    return true
  } catch {
    return false
  }
}

function compareUpdate(a: ArtifactPlannedUpdate, b: ArtifactPlannedUpdate): number {
  return (
    a.catalogName.localeCompare(b.catalogName) ||
    a.packageName.localeCompare(b.packageName) ||
    a.newVersion.localeCompare(b.newVersion)
  )
}

function compareConflict(a: ArtifactVersionConflict, b: ArtifactVersionConflict): number {
  return a.packageName.localeCompare(b.packageName)
}

function toArtifactUpdate(update: PlannedUpdate): ArtifactPlannedUpdate {
  return {
    catalogName: update.catalogName,
    packageName: update.packageName,
    currentVersion: update.currentVersion,
    newVersion: update.newVersion,
    updateType: update.updateType,
    affectedPackages: [...update.affectedPackages].sort(),
    requireConfirmation: update.requireConfirmation ?? false,
    autoUpdate: update.autoUpdate ?? false,
    groupUpdate: update.groupUpdate ?? false,
  }
}

function toArtifactConflict(conflict: VersionConflict): ArtifactVersionConflict {
  return {
    packageName: conflict.packageName,
    catalogs: conflict.catalogs
      .map((catalog) => ({ ...catalog }))
      .sort((a, b) => a.catalogName.localeCompare(b.catalogName)),
  }
}

export function createWorkspaceFingerprint(content: string): string {
  return createHash('sha256').update(content).digest('hex')
}

export function createUpdatePlanArtifact(
  plan: UpdatePlan,
  sourceSha256: string,
  criteria: UpdatePlanCriteria = {}
): UpdatePlanArtifact {
  const candidate = {
    kind: UPDATE_PLAN_ARTIFACT_KIND,
    schemaVersion: UPDATE_PLAN_ARTIFACT_SCHEMA_VERSION,
    workspace: {
      name: plan.workspace.name,
    },
    source: {
      file: 'pnpm-workspace.yaml' as const,
      sha256: sourceSha256,
    },
    criteria: {
      target: criteria.target ?? 'latest',
      includePrerelease: criteria.includePrerelease ?? false,
      securityChecks: criteria.securityChecks ?? false,
      ...(criteria.catalogName ? { catalogName: criteria.catalogName } : {}),
      include: [...(criteria.include ?? [])].sort(),
      exclude: [...(criteria.exclude ?? [])].sort(),
    },
    updates: plan.updates.map(toArtifactUpdate).sort(compareUpdate),
    conflicts: plan.conflicts.map(toArtifactConflict).sort(compareConflict),
    totalUpdates: plan.updates.length,
    hasConflicts: plan.conflicts.length > 0,
  }

  return updatePlanArtifactSchema.parse(candidate)
}

export function parseUpdatePlanArtifact(input: unknown): UpdatePlanArtifact {
  const result = updatePlanArtifactSchema.safeParse(input)
  if (!result.success) {
    const details = result.error.issues
      .map((issue) => `${issue.path.join('.') || 'artifact'}: ${issue.message}`)
      .join('; ')
    throw new Error(`Invalid update plan artifact: ${details}`)
  }
  return result.data
}

export function updatePlanFromArtifact(
  artifact: UpdatePlanArtifact,
  workspacePath: string
): UpdatePlan {
  return {
    workspace: {
      path: workspacePath,
      name: artifact.workspace.name,
    },
    updates: artifact.updates.map((update) => ({
      ...update,
      reason: `${update.updateType} update`,
    })),
    conflicts: artifact.conflicts.map((conflict) => ({
      ...conflict,
      catalogs: conflict.catalogs.map((catalog) => ({ ...catalog })),
      recommendation: 'Resolve the recorded conflict or apply with force',
    })),
    totalUpdates: artifact.totalUpdates,
    hasConflicts: artifact.hasConflicts,
  }
}

export function verifyUpdatePlanArtifact(
  artifact: UpdatePlanArtifact,
  workspace: Workspace
): UpdatePlanVerification {
  const mismatches: VerificationMismatch[] = []
  const catalogs = workspace.getCatalogs()

  for (const update of artifact.updates) {
    const catalog = catalogs.get(update.catalogName)
    if (!catalog) {
      mismatches.push({
        catalogName: update.catalogName,
        packageName: update.packageName,
        expectedVersion: update.newVersion,
        actualVersion: null,
        reason: 'catalog-missing',
      })
      continue
    }

    const version = catalog.getDependencyVersion(update.packageName)
    if (!version) {
      mismatches.push({
        catalogName: update.catalogName,
        packageName: update.packageName,
        expectedVersion: update.newVersion,
        actualVersion: null,
        reason: 'package-missing',
      })
      continue
    }

    const actualVersion = version.toString()
    if (actualVersion !== update.newVersion) {
      mismatches.push({
        catalogName: update.catalogName,
        packageName: update.packageName,
        expectedVersion: update.newVersion,
        actualVersion,
        reason: 'version-mismatch',
      })
    }
  }

  return {
    kind: UPDATE_VERIFICATION_KIND,
    schemaVersion: UPDATE_PLAN_ARTIFACT_SCHEMA_VERSION,
    success: mismatches.length === 0,
    checkedUpdates: artifact.updates.length,
    mismatches,
  }
}
