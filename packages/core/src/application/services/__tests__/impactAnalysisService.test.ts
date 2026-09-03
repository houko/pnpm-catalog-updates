/**
 * Impact Analysis Service Tests
 */

import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { NpmRegistryService } from '../../../infrastructure/external-services/npmRegistryService.js'
import { ImpactAnalysisService } from '../impactAnalysisService.js'

describe('ImpactAnalysisService', () => {
  let service: ImpactAnalysisService
  let mockRegistryService: NpmRegistryService

  beforeEach(() => {
    mockRegistryService = {
      checkSecurityVulnerabilities: vi.fn(),
    } as unknown as NpmRegistryService

    service = new ImpactAnalysisService(mockRegistryService)
  })

  describe('analyzeSecurityImpact', () => {
    it('should detect fixed vulnerabilities when new version has fewer issues', async () => {
      vi.mocked(mockRegistryService.checkSecurityVulnerabilities)
        .mockResolvedValueOnce({
          hasVulnerabilities: true,
          vulnerabilities: [{ id: 'vuln1' }, { id: 'vuln2' }],
        } as never)
        .mockResolvedValueOnce({
          hasVulnerabilities: false,
          vulnerabilities: [],
        } as never)

      const result = await service.analyzeSecurityImpact('lodash', '4.17.0', '4.17.21')

      expect(result.fixedVulnerabilities).toBe(2)
      expect(result.newVulnerabilities).toBe(0)
      expect(result.severityChange).toBe('better')
    })

    it('should detect new vulnerabilities when new version has more issues', async () => {
      vi.mocked(mockRegistryService.checkSecurityVulnerabilities)
        .mockResolvedValueOnce({
          hasVulnerabilities: false,
          vulnerabilities: [],
        } as never)
        .mockResolvedValueOnce({
          hasVulnerabilities: true,
          vulnerabilities: [{ id: 'vuln1' }],
        } as never)

      const result = await service.analyzeSecurityImpact('lodash', '4.17.0', '4.17.21')

      expect(result.fixedVulnerabilities).toBe(0)
      expect(result.newVulnerabilities).toBe(1)
      expect(result.severityChange).toBe('worse')
    })

    it('should return same severity when vulnerability count is unchanged', async () => {
      vi.mocked(mockRegistryService.checkSecurityVulnerabilities).mockResolvedValue({
        hasVulnerabilities: false,
        vulnerabilities: [],
      } as never)

      const result = await service.analyzeSecurityImpact('lodash', '4.17.0', '4.17.21')

      expect(result.severityChange).toBe('same')
    })

    it('should handle errors gracefully', async () => {
      vi.mocked(mockRegistryService.checkSecurityVulnerabilities).mockRejectedValue(
        new Error('Network error')
      )

      const result = await service.analyzeSecurityImpact('lodash', '4.17.0', '4.17.21')

      expect(result.hasVulnerabilities).toBe(false)
      expect(result.fixedVulnerabilities).toBe(0)
      expect(result.newVulnerabilities).toBe(0)
      expect(result.severityChange).toBe('same')
    })

    it('should set analysisIncomplete flag and errorMessage on error', async () => {
      vi.mocked(mockRegistryService.checkSecurityVulnerabilities).mockRejectedValue(
        new Error('Network error')
      )

      const result = await service.analyzeSecurityImpact('lodash', '4.17.0', '4.17.21')

      expect(result.analysisIncomplete).toBe(true)
      expect(result.errorMessage).toBe('Network error')
    })

    it('should handle non-Error objects in catch block', async () => {
      // A non-Error (string) rejection that is also transient, so it exercises the
      // String(error) branch and returns analysisIncomplete instead of propagating (SEC-001).
      vi.mocked(mockRegistryService.checkSecurityVulnerabilities).mockRejectedValue(
        'network connection timeout'
      )

      const result = await service.analyzeSecurityImpact('lodash', '4.17.0', '4.17.21')

      expect(result.analysisIncomplete).toBe(true)
      expect(result.errorMessage).toBe('network connection timeout')
    })
  })

  describe('assessCompatibilityRisk', () => {
    it('should return low risk for patch updates', () => {
      expect(service.assessCompatibilityRisk('patch')).toBe('low')
    })

    it('should return medium risk for minor updates', () => {
      expect(service.assessCompatibilityRisk('minor')).toBe('medium')
    })

    it('should return high risk for major updates', () => {
      expect(service.assessCompatibilityRisk('major')).toBe('high')
    })

    it('should return medium risk for unknown update types', () => {
      expect(service.assessCompatibilityRisk('unknown')).toBe('medium')
    })
  })

  describe('assessOverallRisk', () => {
    const noSecurityIssues = {
      hasVulnerabilities: false,
      fixedVulnerabilities: 0,
      newVulnerabilities: 0,
      severityChange: 'same' as const,
    }

    it('should reduce risk when security vulnerabilities are fixed', () => {
      const securityImpact = {
        ...noSecurityIssues,
        fixedVulnerabilities: 2,
        severityChange: 'better' as const,
      }

      expect(service.assessOverallRisk('major', [], securityImpact)).toBe('medium')
      expect(service.assessOverallRisk('minor', [], securityImpact)).toBe('low')
    })

    it('should increase risk when new vulnerabilities are introduced', () => {
      const securityImpact = {
        ...noSecurityIssues,
        newVulnerabilities: 1,
        severityChange: 'worse' as const,
      }

      expect(service.assessOverallRisk('patch', [], securityImpact)).toBe('high')
    })

    it('should increase risk for major updates with many affected packages', () => {
      const manyPackages = Array(6).fill({
        packageName: 'pkg',
        packagePath: '/path',
        dependencyType: 'dependencies' as const,
        isBreakingChange: false,
        compatibilityRisk: 'low' as const,
      })

      expect(service.assessOverallRisk('major', manyPackages, noSecurityIssues)).toBe('high')
      expect(service.assessOverallRisk('major', manyPackages.slice(0, 3), noSecurityIssues)).toBe(
        'medium'
      )
    })

    it('should return low risk for patch updates with few affected packages', () => {
      expect(service.assessOverallRisk('patch', [], noSecurityIssues)).toBe('low')
    })

    it('should return elevated risk when security analysis is incomplete', () => {
      const incompleteAnalysis = {
        hasVulnerabilities: false,
        fixedVulnerabilities: 0,
        newVulnerabilities: 0,
        severityChange: 'same' as const,
        analysisIncomplete: true,
        errorMessage: 'Security check failed',
      }

      // QUAL-001: Incomplete analysis should be treated as elevated risk
      expect(service.assessOverallRisk('major', [], incompleteAnalysis)).toBe('high')
      expect(service.assessOverallRisk('minor', [], incompleteAnalysis)).toBe('medium')
      expect(service.assessOverallRisk('patch', [], incompleteAnalysis)).toBe('medium')
    })
  })

  describe('generateRecommendations', () => {
    const noSecurityIssues = {
      hasVulnerabilities: false,
      fixedVulnerabilities: 0,
      newVulnerabilities: 0,
      severityChange: 'same' as const,
    }

    it('should recommend security updates when vulnerabilities are fixed', () => {
      const securityImpact = {
        ...noSecurityIssues,
        fixedVulnerabilities: 2,
      }

      const recommendations = service.generateRecommendations('patch', securityImpact, [])

      expect(recommendations).toContain('Security update recommended - fixes known vulnerabilities')
    })

    it('should warn about new vulnerabilities', () => {
      const securityImpact = {
        ...noSecurityIssues,
        newVulnerabilities: 1,
      }

      const recommendations = service.generateRecommendations('patch', securityImpact, [])

      expect(recommendations).toContain(
        'New vulnerabilities detected - review carefully before updating'
      )
    })

    it('should recommend changelog review for major updates', () => {
      const recommendations = service.generateRecommendations('major', noSecurityIssues, [])

      expect(recommendations).toContain('Review changelog for breaking changes before updating')
      expect(recommendations).toContain('Test thoroughly in development environment')
    })

    it('should warn about breaking changes in affected packages', () => {
      const packageImpacts = [
        {
          packageName: 'pkg1',
          packagePath: '/path1',
          dependencyType: 'dependencies' as const,
          isBreakingChange: true,
          compatibilityRisk: 'high' as const,
        },
        {
          packageName: 'pkg2',
          packagePath: '/path2',
          dependencyType: 'dependencies' as const,
          isBreakingChange: true,
          compatibilityRisk: 'high' as const,
        },
      ]

      const recommendations = service.generateRecommendations(
        'minor',
        noSecurityIssues,
        packageImpacts
      )

      expect(recommendations).toContain('2 package(s) may need code changes')
    })

    it('should recommend batch updates for many affected packages', () => {
      const manyPackages = Array(6).fill({
        packageName: 'pkg',
        packagePath: '/path',
        dependencyType: 'dependencies' as const,
        isBreakingChange: false,
        compatibilityRisk: 'low' as const,
      })

      const recommendations = service.generateRecommendations(
        'minor',
        noSecurityIssues,
        manyPackages
      )

      expect(recommendations).toContain('Many packages affected - consider updating in batches')
    })

    it('should indicate low risk for safe updates', () => {
      const recommendations = service.generateRecommendations('patch', noSecurityIssues, [])

      expect(recommendations).toContain('Low risk update - safe to proceed')
    })

    it('should recommend manual review when analysis is incomplete', () => {
      const incompleteSecurityImpact = {
        ...noSecurityIssues,
        analysisIncomplete: true,
        errorMessage: 'Network timeout',
      }

      const recommendations = service.generateRecommendations('patch', incompleteSecurityImpact, [])

      expect(recommendations).toContain(
        'Security analysis incomplete - manual review recommended before updating'
      )
    })
  })
})
