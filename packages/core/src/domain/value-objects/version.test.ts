import { describe, it, expect } from 'vitest'
import { VersionRange } from './version'

describe('VersionRange', () => {
  describe('getMaxVersion', () => {
    it('should correctly handle exact major version boundary', () => {
      // This was the actual bug that existed for 6 months
      // exact major version was incorrectly excluded
      const range = VersionRange.fromString('^16.0.0')
      expect(range.getMaxVersion()?.toString()).toBe('17.0.0')
    })

    it('should handle caret range with minor', () => {
      const range = VersionRange.fromString('^16.2.0')
      expect(range.getMaxVersion()?.toString()).toBe('17.0.0')
    })

    it('should handle caret range with patch', () => {
      const range = VersionRange.fromString('^16.2.6')
      expect(range.getMaxVersion()?.toString()).toBe('17.0.0')
    })

    it('should handle tilde range', () => {
      const range = VersionRange.fromString('~16.2.0')
      expect(range.getMaxVersion()?.toString()).toBe('16.3.0')
    })

    it('should handle tilde range with patch', () => {
      const range = VersionRange.fromString('~16.2.6')
      expect(range.getMaxVersion()?.toString()).toBe('16.3.0')
    })
  })
})
