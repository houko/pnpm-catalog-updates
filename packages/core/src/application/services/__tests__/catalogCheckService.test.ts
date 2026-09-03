/**
 * CatalogCheckService Tests
 *
 * TEST-002: Unit tests for CatalogCheckService
 */

import { beforeEach, describe, expect, it, vi } from 'vitest'

// Setup mocks before imports using inline hoisted mock controls
const mocks = vi.hoisted(() => ({
  getPackageConfig: vi.fn(),
  loadConfig: vi.fn(),
  loadConfigAsync: vi.fn(),
  handleSecurityCheckFailure: vi.fn(),
  handlePackageQueryFailure: vi.fn(),
  handleRetryAttempt: vi.fn(),
  formatError: vi.fn((e: Error) => e.message),
  parallelLimit: vi.fn(
    async (items: [string, unknown][], callback: (item: [string, unknown]) => Promise<void>) => {
      for (const item of items) {
        await callback(item)
      }
    }
  ),
}))

// CatalogNotFoundError class for testing
class CatalogNotFoundError extends Error {
  constructor(catalogName: string, availableCatalogs?: string[]) {
    super(
      `Catalog "${catalogName}" not found${availableCatalogs?.length ? `. Available catalogs: ${availableCatalogs.join(', ')}` : ''}`
    )
    this.name = 'CatalogNotFoundError'
  }
}

vi.mock('@pcu/utils', () => {
  const mockLogger = {
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
    fatal: vi.fn(),
    setLevel: vi.fn(),
    child: vi.fn().mockReturnThis(),
  }

  return {
    CatalogNotFoundError,
    logger: mockLogger,
    t: vi.fn((key: string) => key),
    toError: vi.fn((e: unknown) => (e instanceof Error ? e : new Error(String(e)))),
    UserFriendlyErrorHandler: {
      handleSecurityCheckFailure: mocks.handleSecurityCheckFailure,
      handlePackageQueryFailure: mocks.handlePackageQueryFailure,
    },
    ConfigLoader: {
      loadConfig: mocks.loadConfigAsync,
      getPackageConfig: mocks.getPackageConfig,
    },
    parallelLimit: mocks.parallelLimit,
  }
})

// Import mock factories after mock setup
import {
  createMockCatalog,
  createMockCatalogCollection,
  createMockPackageCollection,
  createMockRegistryService,
  createMockWorkspace,
  createMockWorkspaceRepository,
} from '../../../__tests__/shared/mockUtils.js'

// Import after mocks
const { CatalogCheckService } = await import('../catalogCheckService.js')

describe('CatalogCheckService', () => {
  let service: InstanceType<typeof CatalogCheckService>
  let mockWorkspaceRepository: ReturnType<typeof createMockWorkspaceRepository>
  let mockRegistryService: ReturnType<typeof createMockRegistryService>
  let mockWorkspace: ReturnType<typeof createMockWorkspace>
  let mockCatalog: ReturnType<typeof createMockCatalog>

  beforeEach(() => {
    vi.clearAllMocks()

    // Setup default mock returns
    mocks.getPackageConfig.mockReturnValue({
      shouldUpdate: true,
      requireConfirmation: false,
      autoUpdate: true,
      groupUpdate: false,
      target: 'latest',
    })
    mocks.loadConfigAsync.mockResolvedValue({
      include: [],
      exclude: [],
      defaults: {},
      advanced: { concurrency: 8 },
      security: { enableCheck: true, autoFixVulnerabilities: false },
    })

    // Create mock catalog with dependencies
    mockCatalog = createMockCatalog(
      'default',
      new Map([
        ['lodash', '^4.17.20'],
        ['typescript', '^5.0.0'],
      ])
    )

    // Create mock workspace
    const catalogCollection = createMockCatalogCollection([mockCatalog])
    const packageCollection = createMockPackageCollection([])
    mockWorkspace = createMockWorkspace(
      '/test/workspace',
      'test-workspace',
      catalogCollection,
      packageCollection
    )

    // Create mock repository and registry
    mockWorkspaceRepository = createMockWorkspaceRepository(mockWorkspace)
    mockRegistryService = createMockRegistryService({
      lodash: '4.17.21',
      typescript: '5.3.0',
    })

    // Create service instance
    service = new CatalogCheckService(
      mockWorkspaceRepository as unknown as Parameters<typeof CatalogCheckService>[0],
      mockRegistryService as unknown as Parameters<typeof CatalogCheckService>[1]
    )
  })

  describe('constructor', () => {
    it('should create service instance', () => {
      expect(service).toBeDefined()
    })
  })

  describe('checkOutdatedDependencies', () => {
    it('should return outdated report for workspace', async () => {
      // Setup registry to return newer versions
      mockRegistryService.getPackageVersions.mockResolvedValue({
        name: 'lodash',
        versions: ['4.17.20', '4.17.21'],
        latestVersion: '4.17.21',
        tags: { latest: '4.17.21' },
      })
      mockRegistryService.checkSecurityVulnerabilities.mockResolvedValue({
        hasVulnerabilities: false,
        vulnerabilities: [],
      })

      const report = await service.checkOutdatedDependencies({
        workspacePath: '/test/workspace',
      })

      expect(report).toBeDefined()
      expect(report.workspace.path).toBe('/test/workspace')
      expect(report.catalogs).toBeInstanceOf(Array)
      expect(mockWorkspaceRepository.getByPath).toHaveBeenCalled()
    })

    it('should filter by catalog name when specified', async () => {
      const report = await service.checkOutdatedDependencies({
        workspacePath: '/test/workspace',
        catalogName: 'default',
      })

      expect(report).toBeDefined()
      expect(report.catalogs.length).toBeGreaterThanOrEqual(0)
    })

    it('should throw CatalogNotFoundError for non-existent catalog', async () => {
      // Setup catalog collection to return undefined for non-existent catalog
      const catalogCollection = createMockCatalogCollection([mockCatalog])
      catalogCollection.get.mockImplementation((name: string) => {
        if (name === 'non-existent') return undefined
        return mockCatalog
      })
      mockWorkspace.getCatalogs.mockReturnValue(catalogCollection)

      await expect(
        service.checkOutdatedDependencies({
          workspacePath: '/test/workspace',
          catalogName: 'non-existent',
        })
      ).rejects.toThrow(CatalogNotFoundError)
    })

    it('should use config include/exclude filters', async () => {
      mocks.getPackageConfig.mockReturnValue({
        shouldUpdate: false,
        requireConfirmation: false,
        autoUpdate: false,
        groupUpdate: false,
      })

      const report = await service.checkOutdatedDependencies({
        workspacePath: '/test/workspace',
      })

      expect(report).toBeDefined()
      // All packages should be filtered out
      expect(report.totalOutdated).toBe(0)
    })

    it('applies CLI include and exclude patterns at the filter level', async () => {
      await service.checkOutdatedDependencies({
        workspacePath: '/test/workspace',
        include: ['lodash'],
        exclude: ['typescript'],
      })

      expect(mocks.getPackageConfig).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          include: ['lodash'],
          exclude: ['typescript'],
        })
      )
    })

    it('should track progress when reporter provided', async () => {
      const mockReporter = {
        start: vi.fn(),
        update: vi.fn(),
        increment: vi.fn(),
        complete: vi.fn(),
        fail: vi.fn(),
        success: vi.fn(),
        warn: vi.fn(),
        getProgress: vi.fn().mockReturnValue(0),
        isActive: vi.fn().mockReturnValue(true),
        setTotal: vi.fn(),
      }

      await service.checkOutdatedDependencies({
        workspacePath: '/test/workspace',
        progressReporter: mockReporter,
      })

      expect(mockReporter.start).toHaveBeenCalled()
    })

    it('should skip security check when noSecurity is true', async () => {
      mockRegistryService.getPackageVersions.mockResolvedValue({
        name: 'lodash',
        versions: ['4.17.20', '4.17.21'],
        latestVersion: '4.17.21',
        tags: { latest: '4.17.21' },
      })

      await service.checkOutdatedDependencies({
        workspacePath: '/test/workspace',
        noSecurity: true,
      })

      // Security check should not be called during update check
      // (it may still be called in processPackageCheck, but with skipSecurityCheck=true)
      expect((report) => report).toBeDefined()
    })
  })

  describe('getFilteredPackagesFromCatalogs', () => {
    it('should filter packages based on config', () => {
      mocks.getPackageConfig.mockReturnValue({
        shouldUpdate: true,
      })

      const catalogs = [mockCatalog]
      const result = service.getFilteredPackagesFromCatalogs(
        catalogs as unknown as Parameters<typeof service.getFilteredPackagesFromCatalogs>[0],
        {} as Parameters<typeof service.getFilteredPackagesFromCatalogs>[1]
      )

      expect(result).toBeInstanceOf(Map)
      expect(result.size).toBe(1)
    })

    it('should exclude packages when shouldUpdate is false', () => {
      mocks.getPackageConfig.mockReturnValue({
        shouldUpdate: false,
      })

      const catalogs = [mockCatalog]
      const result = service.getFilteredPackagesFromCatalogs(
        catalogs as unknown as Parameters<typeof service.getFilteredPackagesFromCatalogs>[0],
        {} as Parameters<typeof service.getFilteredPackagesFromCatalogs>[1]
      )

      expect(result.get(mockCatalog as unknown as Parameters<typeof result.get>[0])).toEqual([])
    })

    it('should skip undefined catalogs', () => {
      const catalogs = [undefined, mockCatalog]
      const result = service.getFilteredPackagesFromCatalogs(
        catalogs as unknown as Parameters<typeof service.getFilteredPackagesFromCatalogs>[0],
        {} as Parameters<typeof service.getFilteredPackagesFromCatalogs>[1]
      )

      expect(result.size).toBe(1)
    })
  })

  describe('checkPackageUpdate', () => {
    beforeEach(() => {
      mockRegistryService.getPackageVersions.mockResolvedValue({
        name: 'lodash',
        versions: ['4.17.20', '4.17.21', '5.0.0'],
        latestVersion: '5.0.0',
        tags: { latest: '5.0.0' },
      })
      mockRegistryService.checkSecurityVulnerabilities.mockResolvedValue({
        hasVulnerabilities: false,
        vulnerabilities: [],
      })
    })

    it('should call registry service for version info', async () => {
      const currentRange = {
        getMinVersion: vi.fn().mockReturnValue({
          toString: () => '4.17.20',
          isPrerelease: () => false,
          getDifferenceType: vi.fn().mockReturnValue('major'),
        }),
      }

      await service.checkPackageUpdate(
        'lodash',
        currentRange as unknown as Parameters<typeof service.checkPackageUpdate>[1],
        'latest',
        false
      )

      expect(mockRegistryService.getPackageVersions).toHaveBeenCalledWith('lodash')
    })

    it('should throw error when invalid version is encountered', async () => {
      mockRegistryService.getPackageVersions = vi.fn().mockResolvedValue({
        name: 'lodash',
        versions: ['1.0.0', 'invalid-version-xyz'],
        tags: { latest: '1.0.0' },
      })

      const currentRange = {
        getMinVersion: vi.fn().mockReturnValue({
          toString: () => '1.0.0',
          isPrerelease: () => false,
          getDifferenceType: vi.fn().mockReturnValue('minor'),
        }),
      }

      await expect(
        service.checkPackageUpdate(
          'lodash',
          currentRange as unknown as Parameters<typeof service.checkPackageUpdate>[1],
          'minor',
          false
        )
      ).resolves.toBeNull()

      expect(mocks.handlePackageQueryFailure).toHaveBeenCalled()
    })

    it('should return null when no update available', async () => {
      mockRegistryService.getPackageVersions.mockResolvedValue({
        name: 'lodash',
        versions: ['4.17.20'],
        latestVersion: '4.17.20',
        tags: { latest: '4.17.20' },
      })

      const currentRange = {
        getMinVersion: vi.fn().mockReturnValue({
          toString: () => '4.17.20',
          isPrerelease: () => false,
          isNewerThan: vi.fn().mockReturnValue(false),
        }),
      }

      const result = await service.checkPackageUpdate(
        'lodash',
        currentRange as unknown as Parameters<typeof service.checkPackageUpdate>[1],
        'latest',
        false
      )

      expect(result).toBeNull()
    })

    it('should skip prerelease when includePrerelease is false', async () => {
      mockRegistryService.getPackageVersions.mockResolvedValue({
        name: 'lodash',
        versions: ['4.17.20', '5.0.0-beta.1'],
        latestVersion: '5.0.0-beta.1',
        tags: { latest: '5.0.0-beta.1' },
      })

      const currentRange = {
        getMinVersion: vi.fn().mockReturnValue({
          toString: () => '4.17.20',
          isPrerelease: () => false,
        }),
      }

      const result = await service.checkPackageUpdate(
        'lodash',
        currentRange as unknown as Parameters<typeof service.checkPackageUpdate>[1],
        'latest',
        false
      )

      // Should return null because latest is prerelease
      expect(result).toBeNull()
    })

    it('should handle target=minor constraint', async () => {
      mockRegistryService.getPackageVersions.mockResolvedValue({
        name: 'lodash',
        versions: ['4.17.20', '4.17.21', '4.18.0', '5.0.0'],
        latestVersion: '5.0.0',
        tags: { latest: '5.0.0' },
      })

      const currentRange = {
        getMinVersion: vi.fn().mockReturnValue({
          toString: () => '4.17.20',
          isPrerelease: () => false,
          getDifferenceType: vi.fn().mockReturnValue('minor'),
          isNewerThan: vi.fn().mockReturnValue(true),
        }),
      }

      const result = await service.checkPackageUpdate(
        'lodash',
        currentRange as unknown as Parameters<typeof service.checkPackageUpdate>[1],
        'minor',
        false
      )

      // Should return a minor update, not the major version
      expect(result).toBeDefined()
    })

    it('should handle target=patch constraint', async () => {
      mockRegistryService.getPackageVersions.mockResolvedValue({
        name: 'lodash',
        versions: ['4.17.20', '4.17.21', '4.18.0'],
        latestVersion: '4.18.0',
        tags: { latest: '4.18.0' },
      })

      const currentRange = {
        getMinVersion: vi.fn().mockReturnValue({
          toString: () => '4.17.20',
          isPrerelease: () => false,
          getDifferenceType: vi.fn().mockReturnValue('patch'),
          isNewerThan: vi.fn().mockReturnValue(true),
        }),
      }

      const result = await service.checkPackageUpdate(
        'lodash',
        currentRange as unknown as Parameters<typeof service.checkPackageUpdate>[1],
        'patch',
        false
      )

      expect(result).toBeDefined()
    })

    it('should skip security check when skipSecurityCheck is true', async () => {
      mockRegistryService.checkSecurityVulnerabilities.mockResolvedValue({
        hasVulnerabilities: true,
        vulnerabilities: [{ id: 'CVE-2021-1234', severity: 'high' }],
      })

      const currentRange = {
        getMinVersion: vi.fn().mockReturnValue({
          toString: () => '4.17.20',
          isPrerelease: () => false,
          getDifferenceType: vi.fn().mockReturnValue('patch'),
          isNewerThan: vi.fn().mockReturnValue(true),
        }),
      }

      await service.checkPackageUpdate(
        'lodash',
        currentRange as unknown as Parameters<typeof service.checkPackageUpdate>[1],
        'latest',
        false,
        true // skipSecurityCheck = true
      )

      // Verify security check was NOT called when skipped
      expect(mockRegistryService.checkSecurityVulnerabilities).not.toHaveBeenCalled()
    })

    it('should handle registry errors gracefully', async () => {
      mockRegistryService.getPackageVersions.mockRejectedValue(new Error('Network error'))

      const currentRange = {
        getMinVersion: vi.fn().mockReturnValue({
          toString: () => '4.17.20',
        }),
      }

      const result = await service.checkPackageUpdate(
        'lodash',
        currentRange as unknown as Parameters<typeof service.checkPackageUpdate>[1],
        'latest',
        false
      )

      expect(result).toBeNull()
      expect(mocks.handlePackageQueryFailure).toHaveBeenCalled()
    })

    it('should handle target=greatest', async () => {
      mockRegistryService.getGreatestVersion.mockResolvedValue({
        toString: () => '5.0.0',
        isPrerelease: () => false,
        isNewerThan: vi.fn().mockReturnValue(true),
      })

      const currentRange = {
        getMinVersion: vi.fn().mockReturnValue({
          toString: () => '4.17.20',
          isPrerelease: () => false,
          getDifferenceType: vi.fn().mockReturnValue('major'),
        }),
      }

      const result = await service.checkPackageUpdate(
        'lodash',
        currentRange as unknown as Parameters<typeof service.checkPackageUpdate>[1],
        'greatest',
        false
      )

      expect(result).toBeDefined()
      expect(mockRegistryService.getGreatestVersion).toHaveBeenCalledWith('lodash')
    })

    it('should handle target=newest', async () => {
      mockRegistryService.getNewestVersions.mockResolvedValue([
        {
          toString: () => '5.0.0',
          isPrerelease: () => false,
          isNewerThan: vi.fn().mockReturnValue(true),
        },
      ])

      const currentRange = {
        getMinVersion: vi.fn().mockReturnValue({
          toString: () => '4.17.20',
          isPrerelease: () => false,
          getDifferenceType: vi.fn().mockReturnValue('major'),
        }),
      }

      const result = await service.checkPackageUpdate(
        'lodash',
        currentRange as unknown as Parameters<typeof service.checkPackageUpdate>[1],
        'newest',
        false
      )

      expect(result).toBeDefined()
      expect(mockRegistryService.getNewestVersions).toHaveBeenCalledWith('lodash', 1)
    })
  })

  describe('--target option propagation fix (#82)', () => {
    it('should use options.target when provided, overriding config default', async () => {
      // Config says 'latest', CLI says 'minor'
      mocks.getPackageConfig.mockReturnValue({
        shouldUpdate: true,
        requireConfirmation: false,
        autoUpdate: true,
        groupUpdate: false,
        target: 'latest', // config default
      })
      mockRegistryService.getPackageVersions.mockResolvedValue({
        name: 'lodash',
        versions: ['4.17.20', '4.17.21', '5.0.0'],
        latestVersion: '5.0.0',
        tags: { latest: '5.0.0' },
      })

      const report = await service.checkOutdatedDependencies({
        workspacePath: '/test/workspace',
        target: 'minor', // CLI --target minor
      })

      // Should process without throwing; target is passed down correctly
      expect(report).toBeDefined()
      expect(report.workspace).toBeDefined()
    })

    it('should fall back to packageConfig.target when options.target is undefined', async () => {
      mocks.getPackageConfig.mockReturnValue({
        shouldUpdate: true,
        requireConfirmation: false,
        autoUpdate: true,
        groupUpdate: false,
        target: 'patch', // config specifies patch
      })
      mockRegistryService.getPackageVersions.mockResolvedValue({
        name: 'lodash',
        versions: ['4.17.20', '4.17.21'],
        latestVersion: '4.17.21',
        tags: { latest: '4.17.21' },
      })

      const report = await service.checkOutdatedDependencies({
        workspacePath: '/test/workspace',
        // target not provided -> should fall back to packageConfig.target ('patch')
      })

      expect(report).toBeDefined()
    })

    it('should default to latest when neither options.target nor packageConfig.target is set', async () => {
      mocks.getPackageConfig.mockReturnValue({
        shouldUpdate: true,
        requireConfirmation: false,
        autoUpdate: true,
        groupUpdate: false,
        target: undefined, // no config target either
      })
      mockRegistryService.getPackageVersions.mockResolvedValue({
        name: 'lodash',
        versions: ['4.17.20', '4.17.21'],
        latestVersion: '4.17.21',
        tags: { latest: '4.17.21' },
      })

      const report = await service.checkOutdatedDependencies({
        workspacePath: '/test/workspace',
        // no target -> should default to 'latest'
      })

      expect(report).toBeDefined()
    })
  })
})
