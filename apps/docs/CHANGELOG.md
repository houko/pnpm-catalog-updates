# @pcu/docs

## 0.1.2

### Patch Changes

- 6ad0a2b: Update documentation site branding and UI improvements
  - Change logo text from "Protocol" to "PCU" with new 3D cube design
  - Update site theme from emerald green to amber yellow
  - Fix production environment navigation visibility issue
  - Improve logo positioning and alignment
  - Add comprehensive favicon and logo PNG assets
  - Fix page title internationalization
  - Update homepage background gradient colors

## 0.1.1

### Patch Changes

- d80bc2e: fix: remove unsafe type assertions and fix build errors
  - Remove all `as any` type assertions from navigation and components
  - Implement type-safe solutions for next-intl Link components using type
    guards
  - Fix MDX syntax errors in performance documentation
  - Add missing routing utilities for proper module resolution
  - Create Resource component for MDX usage
  - All packages now build successfully with no TypeScript or lint errors
