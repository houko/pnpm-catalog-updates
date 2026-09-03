/**
 * Update Executor Service Tests
 */

import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { WorkspaceRepository } from '../../../domain/repositories/workspaceRepository.js'
import type { NpmRegistryService } from '../../../infrastructure/external-services/npmRegistryService.js'
import type { UpdatePlan } from '../updatePlanService.js'

// Mock ConfigLoader
const configLoaderMocks = vi.hoisted(() => ({
  loadConfig: vi.fn(),
}))

// Mock logger for testing
const loggerMocks = vi.hoisted(() => ({
  error: vi.fn(),
  warn: vi.fn(),
  info: vi.fn(),
  debug: vi.fn(),
}))

vi.mock('@pcu/utils', () => ({
  ConfigLoader: {
    loadConfig: configLoaderMocks.loadConfig,
  },
  UserFriendlyErrorHandler: {
    handleSecurityCheckFailure: vi.fn(),
  },
  logger: loggerMocks,
  toError: (e: unknown) => (e instanceof Error ? e : new Error(String(e))),
  parallelLimit: vi.fn(
    async <T, R>(
      items: T[],
      callback: (item: T) => Promise<R>,
      _concurrency?: number
    ): Promise<R[]> => {
      const results: R[] = []
      for (const item of items) {
        results.push(await callback(item))
      }
      return results
    }
  ),
}))

// Mock WorkspacePath
vi.mock('../../../domain/value-objects/workspacePath.js', () => ({
  WorkspacePath: {
    fromString: vi.fn((path: string) => ({
      toString: () => path,
    })),
  },
}))

// Mock NpmRegistryService
const registryServiceMocks = vi.hoisted(() => ({
  checkSecurityVulnerabilities: vi.fn(),
}))

vi.mock('../../../infrastructure/external-services/npmRegistryService.js', () => ({
  NpmRegistryService: class MockNpmRegistryService {
    checkSecurityVulnerabilities = registryServiceMocks.checkSecurityVulnerabilities
  },
}))

const { UpdateExecutorService } = await import('../updateExecutorService.js')

describe('UpdateExecutorService', () => {
  let service: InstanceType<typeof UpdateExecutorService>
  let mockWorkspaceRepository: {
    getByPath: ReturnType<typeof vi.fn>
    save: ReturnType<typeof vi.fn>
  }
  let mockRegistryService: {
    checkSecurityVulnerabilities: ReturnType<typeof vi.fn>
  }
  let mockWorkspace: {
    updateCatalogDependency: ReturnType<typeof vi.fn>
  }

  const mockUpdatePlan: UpdatePlan = {
    workspace: {
      path: '/workspace',
      name: 'test-workspace',
    },
    updates: [
      {
        catalogName: 'default',
        packageName: 'lodash',
        currentVersion: '4.17.20',
        newVersion: '4.17.21',
        updateType: 'patch',
        reason: 'Security fix',
        affectedPackages: ['app1', 'app2'],
      },
      {
        catalogName: 'react17',
        packageName: 'react',
        currentVersion: '17.0.0',
        newVersion: '17.0.2',
        updateType: 'patch',
        reason: 'Bug fix',
        affectedPackages: ['web'],
      },
    ],
    conflicts: [],
    totalUpdates: 2,
    hasConflicts: false,
  }

  beforeEach(() => {
    vi.clearAllMocks()

    mockWorkspace = {
      updateCatalogDependency: vi.fn(),
    }

    mockWorkspaceRepository = {
      getByPath: vi.fn().mockResolvedValue(mockWorkspace),
      save: vi.fn().mockResolvedValue(undefined),
    }

    mockRegistryService = {
      checkSecurityVulnerabilities: registryServiceMocks.checkSecurityVulnerabilities,
    }

    configLoaderMocks.loadConfig.mockResolvedValue({
      security: {
        notifyOnSecurityUpdate: false,
      },
    })

    service = new UpdateExecutorService(
      mockWorkspaceRepository as unknown as WorkspaceRepository,
      mockRegistryService as unknown as NpmRegistryService
    )
  })

  describe('executeUpdates', () => {
    it('should execute all updates successfully', async () => {
      const result = await service.executeUpdates(mockUpdatePlan, {})

      expect(result.success).toBe(true)
      expect(result.totalUpdated).toBe(2)
      expect(result.totalSkipped).toBe(0)
      expect(result.totalErrors).toBe(0)
      expect(mockWorkspace.updateCatalogDependency).toHaveBeenCalledTimes(2)
      expect(mockWorkspaceRepository.save).toHaveBeenCalled()
    })

    it('should not save workspace in dry-run mode', async () => {
      const result = await service.executeUpdates(mockUpdatePlan, { dryRun: true })

      expect(result.success).toBe(true)
      expect(result.totalUpdated).toBe(2)
      expect(mockWorkspace.updateCatalogDependency).toHaveBeenCalledTimes(2)
      expect(mockWorkspaceRepository.save).not.toHaveBeenCalled()
    })

    it('does not run security checks during deterministic apply', async () => {
      configLoaderMocks.loadConfig.mockResolvedValue({
        security: {
          notifyOnSecurityUpdate: true,
        },
      })

      await service.executeUpdates(mockUpdatePlan, { noSecurity: true })

      expect(mockRegistryService.checkSecurityVulnerabilities).not.toHaveBeenCalled()
    })

    it('should skip conflicting packages when force is not enabled', async () => {
      const planWithConflicts: UpdatePlan = {
        ...mockUpdatePlan,
        hasConflicts: true,
        conflicts: [
          {
            packageName: 'lodash',
            catalogs: [
              { catalogName: 'default', currentVersion: '4.17.20', proposedVersion: '4.17.21' },
              { catalogName: 'utils', currentVersion: '4.17.19', proposedVersion: '4.17.21' },
            ],
            recommendation: 'Use force to override',
          },
        ],
      }

      const result = await service.executeUpdates(planWithConflicts, { force: false })

      expect(result.success).toBe(true)
      expect(result.totalUpdated).toBe(1) // Only react updated
      expect(result.totalSkipped).toBe(1) // lodash skipped
      expect(result.skippedDependencies[0]?.packageName).toBe('lodash')
      expect(result.skippedDependencies[0]?.reason).toContain('Version conflict')
    })

    it('should update conflicting packages when force is enabled', async () => {
      const planWithConflicts: UpdatePlan = {
        ...mockUpdatePlan,
        hasConflicts: true,
        conflicts: [
          {
            packageName: 'lodash',
            catalogs: [
              { catalogName: 'default', currentVersion: '4.17.20', proposedVersion: '4.17.21' },
            ],
            recommendation: 'Use force to override',
          },
        ],
      }

      const result = await service.executeUpdates(planWithConflicts, { force: true })

      expect(result.success).toBe(true)
      expect(result.totalUpdated).toBe(2)
      expect(result.totalSkipped).toBe(0)
    })

    it('should check security vulnerabilities when notifyOnSecurityUpdate is enabled', async () => {
      configLoaderMocks.loadConfig.mockResolvedValue({
        security: {
          notifyOnSecurityUpdate: true,
        },
      })

      registryServiceMocks.checkSecurityVulnerabilities.mockResolvedValue({
        hasVulnerabilities: true,
        vulnerabilities: [{ severity: 'high', title: 'RCE' }],
      })

      const result = await service.executeUpdates(mockUpdatePlan, {})

      expect(registryServiceMocks.checkSecurityVulnerabilities).toHaveBeenCalled()
      expect(result.success).toBe(true)
      expect(loggerMocks.info).toHaveBeenCalledWith(expect.stringContaining('Security fix applied'))
    })

    it('should handle security check failures gracefully', async () => {
      configLoaderMocks.loadConfig.mockResolvedValue({
        security: {
          notifyOnSecurityUpdate: true,
        },
      })

      registryServiceMocks.checkSecurityVulnerabilities.mockRejectedValue(
        new Error('Network error')
      )

      const result = await service.executeUpdates(mockUpdatePlan, {})

      expect(result.success).toBe(true)
      expect(result.totalUpdated).toBe(2)
    })

    it('should handle update errors for individual packages', async () => {
      mockWorkspace.updateCatalogDependency.mockImplementation((_catalog, pkg) => {
        if (pkg === 'lodash') {
          throw new Error('Update failed')
        }
      })

      const result = await service.executeUpdates(mockUpdatePlan, {})

      expect(result.success).toBe(true) // Non-fatal errors
      expect(result.totalUpdated).toBe(1)
      expect(result.totalErrors).toBe(1)
      expect(result.errors[0]?.packageName).toBe('lodash')
      expect(result.errors[0]?.fatal).toBe(false)
    })

    it('should handle workspace save failure as fatal error', async () => {
      mockWorkspaceRepository.save.mockRejectedValue(new Error('Disk full'))

      const result = await service.executeUpdates(mockUpdatePlan, {})

      expect(result.success).toBe(false)
      expect(result.errors.some((e) => e.fatal)).toBe(true)
      expect(result.errors.some((e) => e.error.includes('Failed to save workspace'))).toBe(true)
    })

    it('should log version sync summary for synchronized updates', async () => {
      const planWithSyncUpdates: UpdatePlan = {
        ...mockUpdatePlan,
        updates: [
          {
            catalogName: 'default',
            packageName: 'typescript',
            currentVersion: '5.0.0',
            newVersion: '5.3.0',
            updateType: 'minor',
            reason: 'Sync version across catalogs',
            affectedPackages: ['app1'],
          },
          {
            catalogName: 'react17',
            packageName: 'typescript',
            currentVersion: '5.1.0',
            newVersion: '5.3.0',
            updateType: 'minor',
            reason: 'Sync version across catalogs',
            affectedPackages: ['web'],
          },
        ],
      }

      await service.executeUpdates(planWithSyncUpdates, {})

      expect(loggerMocks.info).toHaveBeenCalledWith(expect.stringContaining('Version Sync Summary'))
    })

    it('should log catalog priority resolutions when present', async () => {
      const planWithPriorityConflicts: UpdatePlan = {
        ...mockUpdatePlan,
        hasConflicts: true,
        conflicts: [
          {
            packageName: 'react',
            catalogs: [
              { catalogName: 'default', currentVersion: '17.0.0', proposedVersion: '18.0.0' },
            ],
            recommendation: 'Priority catalog: default wins',
          },
        ],
      }

      await service.executeUpdates(planWithPriorityConflicts, { force: true })

      expect(loggerMocks.info).toHaveBeenCalledWith(
        expect.stringContaining('Catalog Priority Resolutions')
      )
    })

    it('should return correct update result structure', async () => {
      const result = await service.executeUpdates(mockUpdatePlan, {})

      expect(result).toMatchObject({
        success: expect.any(Boolean),
        workspace: {
          path: '/workspace',
          name: 'test-workspace',
        },
        updatedDependencies: expect.any(Array),
        skippedDependencies: expect.any(Array),
        errors: expect.any(Array),
        totalUpdated: expect.any(Number),
        totalSkipped: expect.any(Number),
        totalErrors: expect.any(Number),
      })

      expect(result.updatedDependencies[0]).toMatchObject({
        catalogName: 'default',
        packageName: 'lodash',
        fromVersion: '4.17.20',
        toVersion: '4.17.21',
        updateType: 'patch',
      })
    })

    it('should not save workspace when no dependencies are updated', async () => {
      const emptyPlan: UpdatePlan = {
        ...mockUpdatePlan,
        updates: [],
        totalUpdates: 0,
      }

      await service.executeUpdates(emptyPlan, {})

      expect(mockWorkspaceRepository.save).not.toHaveBeenCalled()
    })

    it('should show security summary when multiple security updates applied', async () => {
      configLoaderMocks.loadConfig.mockResolvedValue({
        security: {
          notifyOnSecurityUpdate: true,
        },
      })

      registryServiceMocks.checkSecurityVulnerabilities.mockResolvedValue({
        hasVulnerabilities: true,
        vulnerabilities: [{ severity: 'high', title: 'XSS' }],
      })

      await service.executeUpdates(mockUpdatePlan, {})

      expect(loggerMocks.info).toHaveBeenCalledWith(
        expect.stringContaining('Security Updates Summary')
      )
    })
  })

  describe('constructor', () => {
    it('should accept workspace repository and registry service', () => {
      const instance = new UpdateExecutorService(
        mockWorkspaceRepository as unknown as WorkspaceRepository,
        mockRegistryService as unknown as NpmRegistryService
      )
      expect(instance).toBeDefined()
    })
  })
})
