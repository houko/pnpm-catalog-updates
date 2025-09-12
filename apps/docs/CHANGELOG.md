# @pcu/docs

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
