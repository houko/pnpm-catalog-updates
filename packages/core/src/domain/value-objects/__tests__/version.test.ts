/**
 * Version and VersionRange Value Object Tests
 */

// Mock @pcu/utils before importing Version classes
import { describe, expect, it, vi } from 'vitest'

vi.mock('@pcu/utils', () => {
  const ErrorCode = {
    INVALID_VERSION: 'INVALID_VERSION',
    INVALID_VERSION_RANGE: 'INVALID_VERSION_RANGE',
  }

  class BaseError extends Error {
    code: string
    context: Record<string, unknown>
    cause?: Error
    constructor(
      message: string,
      code: string,
      context: Record<string, unknown> = {},
      cause?: Error
    ) {
      super(message)
      this.name = this.constructor.name
      this.code = code
      this.context = context
      this.cause = cause
    }
  }

  class DomainError extends BaseError {}

  class InvalidVersionError extends DomainError {
    constructor(version: string, reason?: string, cause?: Error) {
      super(
        `Invalid version "${version}"${reason ? `: ${reason}` : ''}`,
        ErrorCode.INVALID_VERSION,
        { version, reason },
        cause
      )
    }
  }

  class InvalidVersionRangeError extends DomainError {
    constructor(range: string, reason?: string, cause?: Error) {
      super(
        `Invalid version range "${range}"${reason ? `: ${reason}` : ''}`,
        ErrorCode.INVALID_VERSION_RANGE,
        { range, reason },
        cause
      )
    }
  }

  return {
    ErrorCode,
    BaseError,
    DomainError,
    InvalidVersionError,
    InvalidVersionRangeError,
    logger: {
      debug: vi.fn(),
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
    },
  }
})

import { Version, VersionRange } from '../version.js'

describe('Version', () => {
  describe('fromString', () => {
    it('should parse valid semver version', () => {
      const version = Version.fromString('1.2.3')
      expect(version.toString()).toBe('1.2.3')
    })

    it('should parse version with prerelease', () => {
      const version = Version.fromString('1.2.3-beta.1')
      expect(version.toString()).toBe('1.2.3-beta.1')
    })

    it('should parse version with build metadata', () => {
      const version = Version.fromString('1.2.3+build.123')
      expect(version.toString()).toBe('1.2.3+build.123')
    })

    it('should throw InvalidVersionError for invalid version', () => {
      expect(() => Version.fromString('invalid')).toThrow('Invalid version')
    })

    it('should throw InvalidVersionError for empty string', () => {
      expect(() => Version.fromString('')).toThrow('Invalid version')
    })
  })

  describe('getMajor/getMinor/getPatch', () => {
    it('should return correct version components', () => {
      const version = Version.fromString('1.2.3')
      expect(version.getMajor()).toBe(1)
      expect(version.getMinor()).toBe(2)
      expect(version.getPatch()).toBe(3)
    })
  })

  describe('getPrerelease', () => {
    it('should return prerelease tags if present', () => {
      const version = Version.fromString('1.2.3-alpha.1')
      expect(version.getPrerelease()).toEqual(['alpha', '1'])
    })

    it('should return empty array if no prerelease', () => {
      const version = Version.fromString('1.2.3')
      expect(version.getPrerelease()).toEqual([])
    })
  })

  describe('isPrerelease', () => {
    it('should return true for prerelease versions', () => {
      expect(Version.fromString('1.0.0-alpha').isPrerelease()).toBe(true)
      expect(Version.fromString('1.0.0-beta.1').isPrerelease()).toBe(true)
    })

    it('should return false for stable versions', () => {
      expect(Version.fromString('1.0.0').isPrerelease()).toBe(false)
    })
  })

  describe('compareTo', () => {
    it('should return 0 for equal versions', () => {
      const v1 = Version.fromString('1.2.3')
      const v2 = Version.fromString('1.2.3')
      expect(v1.compareTo(v2)).toBe(0)
    })

    it('should return positive for greater version', () => {
      const v1 = Version.fromString('2.0.0')
      const v2 = Version.fromString('1.0.0')
      expect(v1.compareTo(v2)).toBeGreaterThan(0)
    })

    it('should return negative for lesser version', () => {
      const v1 = Version.fromString('1.0.0')
      const v2 = Version.fromString('2.0.0')
      expect(v1.compareTo(v2)).toBeLessThan(0)
    })

    it('should compare minor versions correctly', () => {
      const v1 = Version.fromString('1.2.0')
      const v2 = Version.fromString('1.1.0')
      expect(v1.compareTo(v2)).toBeGreaterThan(0)
    })

    it('should compare patch versions correctly', () => {
      const v1 = Version.fromString('1.0.2')
      const v2 = Version.fromString('1.0.1')
      expect(v1.compareTo(v2)).toBeGreaterThan(0)
    })
  })

  describe('isNewerThan/isOlderThan', () => {
    it('should correctly compare versions', () => {
      const v1 = Version.fromString('2.0.0')
      const v2 = Version.fromString('1.0.0')
      expect(v1.isNewerThan(v2)).toBe(true)
      expect(v1.isOlderThan(v2)).toBe(false)
      expect(v2.isNewerThan(v1)).toBe(false)
      expect(v2.isOlderThan(v1)).toBe(true)
    })
  })

  describe('equals', () => {
    it('should return true for equal versions', () => {
      const v1 = Version.fromString('1.2.3')
      const v2 = Version.fromString('1.2.3')
      expect(v1.equals(v2)).toBe(true)
    })

    it('should return false for different versions', () => {
      const v1 = Version.fromString('1.2.3')
      const v2 = Version.fromString('1.2.4')
      expect(v1.equals(v2)).toBe(false)
    })
  })

  describe('getDifferenceType', () => {
    it('should detect major difference', () => {
      const v1 = Version.fromString('1.0.0')
      const v2 = Version.fromString('2.0.0')
      expect(v1.getDifferenceType(v2)).toBe('major')
    })

    it('should detect minor difference', () => {
      const v1 = Version.fromString('1.0.0')
      const v2 = Version.fromString('1.1.0')
      expect(v1.getDifferenceType(v2)).toBe('minor')
    })

    it('should detect patch difference', () => {
      const v1 = Version.fromString('1.0.0')
      const v2 = Version.fromString('1.0.1')
      expect(v1.getDifferenceType(v2)).toBe('patch')
    })

    it('should return same for equal versions', () => {
      const v1 = Version.fromString('1.0.0')
      const v2 = Version.fromString('1.0.0')
      expect(v1.getDifferenceType(v2)).toBe('same')
    })
  })

  describe('increment', () => {
    it('should increment major version', () => {
      const version = Version.fromString('1.2.3')
      const incremented = version.increment('major')
      expect(incremented.toString()).toBe('2.0.0')
    })

    it('should increment minor version', () => {
      const version = Version.fromString('1.2.3')
      const incremented = version.increment('minor')
      expect(incremented.toString()).toBe('1.3.0')
    })

    it('should increment patch version', () => {
      const version = Version.fromString('1.2.3')
      const incremented = version.increment('patch')
      expect(incremented.toString()).toBe('1.2.4')
    })
  })
})

describe('VersionRange', () => {
  describe('fromString', () => {
    it('should parse caret range', () => {
      const range = VersionRange.fromString('^1.2.3')
      expect(range.toString()).toBe('^1.2.3')
    })

    it('should parse tilde range', () => {
      const range = VersionRange.fromString('~1.2.3')
      expect(range.toString()).toBe('~1.2.3')
    })

    it('should parse exact version', () => {
      const range = VersionRange.fromString('1.2.3')
      expect(range.toString()).toBe('1.2.3')
    })

    it('should parse greater than range', () => {
      const range = VersionRange.fromString('>1.0.0')
      expect(range.toString()).toBe('>1.0.0')
    })

    it('should parse greater than or equal range', () => {
      const range = VersionRange.fromString('>=1.0.0')
      expect(range.toString()).toBe('>=1.0.0')
    })

    it('should parse less than range', () => {
      const range = VersionRange.fromString('<2.0.0')
      expect(range.toString()).toBe('<2.0.0')
    })

    it('should parse combined range', () => {
      const range = VersionRange.fromString('>=1.0.0 <2.0.0')
      expect(range.toString()).toBe('>=1.0.0 <2.0.0')
    })

    it('should throw InvalidVersionRangeError for invalid range', () => {
      expect(() => VersionRange.fromString('invalid')).toThrow()
    })
  })

  describe('includes', () => {
    it('should include version in caret range', () => {
      const range = VersionRange.fromString('^1.2.3')
      expect(range.includes(Version.fromString('1.2.3'))).toBe(true)
      expect(range.includes(Version.fromString('1.2.4'))).toBe(true)
      expect(range.includes(Version.fromString('1.3.0'))).toBe(true)
      expect(range.includes(Version.fromString('2.0.0'))).toBe(false)
    })

    it('should include version in tilde range', () => {
      const range = VersionRange.fromString('~1.2.3')
      expect(range.includes(Version.fromString('1.2.3'))).toBe(true)
      expect(range.includes(Version.fromString('1.2.4'))).toBe(true)
      expect(range.includes(Version.fromString('1.3.0'))).toBe(false)
    })

    it('should handle exact version', () => {
      const range = VersionRange.fromString('1.2.3')
      expect(range.includes(Version.fromString('1.2.3'))).toBe(true)
      expect(range.includes(Version.fromString('1.2.4'))).toBe(false)
    })
  })

  describe('isCompatibleWith', () => {
    it('should detect compatible ranges', () => {
      const range1 = VersionRange.fromString('^1.0.0')
      const range2 = VersionRange.fromString('^1.2.0')
      expect(range1.isCompatibleWith(range2)).toBe(true)
    })

    it('should detect incompatible ranges', () => {
      const range1 = VersionRange.fromString('^1.0.0')
      const range2 = VersionRange.fromString('^2.0.0')
      expect(range1.isCompatibleWith(range2)).toBe(false)
    })
  })

  describe('getMinVersion/getMaxVersion', () => {
    it('should return min version for caret range', () => {
      const range = VersionRange.fromString('^1.2.3')
      const minVersion = range.getMinVersion()
      expect(minVersion?.toString()).toBe('1.2.3')
    })

    it('should return max version for caret range', () => {
      const range = VersionRange.fromString('^1.2.3')
      const maxVersion = range.getMaxVersion()
      // getMaxVersion returns the max *satisfying* version; for ^1.2.3 that is 1.x (< 2.0.0)
      expect(maxVersion?.getMajor()).toBe(1)
    })
  })

  describe('isCaret/isTilde/isExact', () => {
    it('should detect caret range', () => {
      const range = VersionRange.fromString('^1.2.3')
      expect(range.isCaret()).toBe(true)
      expect(range.isTilde()).toBe(false)
      expect(range.isExact()).toBe(false)
    })

    it('should detect tilde range', () => {
      const range = VersionRange.fromString('~1.2.3')
      expect(range.isCaret()).toBe(false)
      expect(range.isTilde()).toBe(true)
      expect(range.isExact()).toBe(false)
    })

    it('should detect exact version', () => {
      const range = VersionRange.fromString('1.2.3')
      expect(range.isCaret()).toBe(false)
      expect(range.isTilde()).toBe(false)
      expect(range.isExact()).toBe(true)
    })

    it('should not detect exact for range operators', () => {
      const range = VersionRange.fromString('>=1.0.0 <2.0.0')
      expect(range.isCaret()).toBe(false)
      expect(range.isTilde()).toBe(false)
      expect(range.isExact()).toBe(false)
    })
  })

  describe('equals', () => {
    it('should return true for equal ranges', () => {
      const range1 = VersionRange.fromString('^1.2.3')
      const range2 = VersionRange.fromString('^1.2.3')
      expect(range1.equals(range2)).toBe(true)
    })

    it('should return false for different ranges', () => {
      const range1 = VersionRange.fromString('^1.2.3')
      const range2 = VersionRange.fromString('~1.2.3')
      expect(range1.equals(range2)).toBe(false)
    })
  })
})
