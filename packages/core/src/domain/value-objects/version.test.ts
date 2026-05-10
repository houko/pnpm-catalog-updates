import { describe, it, expect } from 'vitest'
import { VersionRange } from './version'

describe('VersionRange', () => {
  describe('getMaxVersion', () => {
    it('should correctly handle exact major version boundary', () => {
      // This was the actual bug that existed for 6 months
      // exact major version was incorrectly excluded
      const range = VersionRange.from('^16.0.0')
      expect(range.getMaxVersion()).toBe('17.0.0')
    })

    it('should handle caret range with minor', () => {
      const range = VersionRange.from('^16.2.0')
      expect(range.getMaxVersion()).toBe('17.0.0')
    })

    it('should handle caret range with patch', () => {
      const range = VersionRange.from('^16.2.6')
      expect(range.getMaxVersion()).toBe('17.0.0')
    })

    it('should handle tilde range', () => {
      const range = VersionRange.from('~16.2.0')
      expect(range.getMaxVersion()).toBe('16.3.0')
    })

    it('should handle tilde range with patch', () => {
      const range = VersionRange.from('~16.2.6')
      expect(range.getMaxVersion()).toBe('16.3.0')
    })

    it('should handle exact version range', () => {
      const range = VersionRange.from('16.2.6')
      expect(range.getMaxVersion()).toBe('16.2.6')
    })

    it('should handle >= range', () => {
      const range = VersionRange.from('>=16.0.0')
      expect(range.getMaxVersion()).toBeNull()
    })

    it('should handle mixed range', () => {
      const range = VersionRange.from('>=16.0.0 <17.0.0')
      expect(range.getMaxVersion()).toBe('17.0.0')
    })
  })
})
