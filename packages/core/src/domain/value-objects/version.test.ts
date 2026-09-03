import { describe, expect, it } from 'vitest'
import { VersionRange } from './version'

describe('VersionRange', () => {
  describe('getMaxVersion', () => {
    it('should stay below the next major version boundary', () => {
      const range = VersionRange.fromString('^16.0.0')
      expect(range.getMaxVersion()?.toString()).toBe('16.99999.99999')
    })

    it('should handle caret range with minor', () => {
      const range = VersionRange.fromString('^16.2.0')
      expect(range.getMaxVersion()?.toString()).toBe('16.99999.99999')
    })

    it('should handle caret range with patch', () => {
      const range = VersionRange.fromString('^16.2.6')
      expect(range.getMaxVersion()?.toString()).toBe('16.99999.99999')
    })

    it('should handle tilde range', () => {
      const range = VersionRange.fromString('~16.2.0')
      expect(range.getMaxVersion()?.toString()).toBe('16.2.99999')
    })

    it('should handle tilde range with patch', () => {
      const range = VersionRange.fromString('~16.2.6')
      expect(range.getMaxVersion()?.toString()).toBe('16.2.99999')
    })
  })
})
