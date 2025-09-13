# @pcu/docs

## 0.1.3

### Patch Changes

- 0f4e4ea: Complete multi-language documentation translation
  - Add comprehensive translations for 4 new languages:
    - German (de): All 17 MDX files + navigation translations
    - Spanish (es): All 17 MDX files + navigation translations
    - French (fr): All 17 MDX files + navigation translations
    - Korean (ko): All 17 MDX files + navigation translations
  - Translated documentation includes:
    - Core documentation (quickstart, configuration, command-reference, etc.)
    - Writing guides (writing-basics, writing-code, writing-components, etc.)
    - Advanced topics (best-practices, performance, troubleshooting, etc.)
  - Update message files for all languages with navigation translations
  - Ensure consistent technical terminology across all translated content
  - Maintain MDX component compatibility and code block formatting
  - Complete localization support for the documentation site

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
