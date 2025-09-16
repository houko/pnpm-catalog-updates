# pcu

## 0.7.18

### Patch Changes

- df70383: # feat: update homepage to <https://pcu-cli.dev>

  Update package homepage URL from GitHub repository to the new dedicated
  documentation site at <https://pcu-cli.dev>. This change affects:
  - CLI package.json homepage field
  - Root package.json homepage field
  - Documentation links in TROUBLESHOOTING.md
  - Release workflow documentation links

## 0.7.17

### Patch Changes

- 6aefdbb: feat: update readme

  add some content to readme

## 0.7.16

### Patch Changes

- 0141ffb: Simplify CLI README and migrate documentation to website
  - Streamline CLI package README for better focus and clarity
  - Remove verbose documentation content from CLI package
  - Redirect users to comprehensive documentation site at pcu-cli.dev
  - Maintain essential quick start guide and installation instructions
  - Improve package discoverability with cleaner README structure
  - Keep only core usage examples in CLI package documentation

## 0.7.15

### Patch Changes

- a5b6083: feat: hide write docs

  because write docs category is not necessray for end users hide it.

## 0.7.14

### Patch Changes

- 620d185: fix: add docs i18n

  add next-intl i18n and translation

## 0.7.13

### Patch Changes

- 28edc97: fix: remove yaml dependency from publish script

  Replace yaml module dependency with fallback catalog resolution to fix CI
  publication errors. The script now uses pnpm list output or hardcoded catalog
  values to resolve dependencies without requiring additional modules in CI.

## 0.7.12

### Patch Changes

- 2361acb: fix: resolve catalog dependencies in published packages

  Fix dual publication script to properly resolve pnpm catalog dependencies to
  actual version numbers before publishing to NPM. This prevents
  "EUNSUPPORTEDPROTOCOL catalog:" errors when installing the package globally.

## 0.7.11

### Patch Changes

- defe921: fix: resolve tag duplication issue in GitHub Release creation

  Fix GitHub Release workflow to handle existing tags gracefully and ensure
  proper version bumping for future releases.

## 0.7.10

### Patch Changes

- 989d0b6: fix: resolve pcu --update command functionality

  Fix issues with the `pcu --update` command to ensure proper catalog dependency
  updates work correctly.

## 0.7.9

### Patch Changes

- 9f42525: Enable dual package publication to NPM registries

  This release implements simultaneous publication to both:
  - pcu package (new short name)
  - pnpm-catalog-updates package (original name)

  Both packages will maintain version synchronization and identical
  functionality for backward compatibility.

## 0.7.8

### Patch Changes

- d667680: Test dual package publication system

  Verify that both pcu and pnpm-catalog-updates packages are published
  simultaneously with the same version number using the new dual publication
  script.

## 0.7.7

### Patch Changes

- 5d5eb5e: Enhanced GitHub Release format with complete documentation
  - Add full Installation and Usage sections to GitHub Releases
  - Include all commands, shortcuts, and common examples
  - Provide comprehensive documentation in release notes
  - Maintain consistent formatting across all releases

## 0.7.6

### Patch Changes

- aa0bd56: Test GitHub Release creation

  Verify that GitHub Releases are properly created when packages are published
  to NPM through the Release workflow.

## 0.7.5

### Patch Changes

- 144a9b2: Verify no infinite loop in Release workflow

  Test that the Release workflow runs once and completes without triggering
  itself again after consuming this changeset file.

## 0.7.4

### Patch Changes

- 78a4530: Fix infinite loop in Release workflow
  - Remove automatic changeset generation that caused infinite loops
  - Implement standard Changesets workflow requiring manual changeset creation
  - Add validation step to ensure changeset files exist before processing
  - Prevent Release workflow from triggering itself endlessly

## 0.7.3

### Patch Changes

- Automated release
  - chore(cli): bump version to 0.7.2
  - fix(ci): resolve GitHub Actions PR creation permission issue
  - fix(ci): resolve GitHub Actions PR creation permission issue
  - Delete .deployment-trigger
  - chore(cli): bump version to 0.7.1
  - docs: add documentation README to trigger deployment
  - fix(ci): add missing GitHub Pages environment configuration
  - chore(cli): bump version to 0.7.0
  - fix: update CI workflow and bump CLI version to 0.6.9
  - fix(ci): use pnpm build instead of next command for docs build
  - feat: remove types
  - feat: d.ts
  - fix(docs): correct SVG type declaration for Next.js static imports
  - chore(ci): simplify CI workflow for faster builds
  - chore(docs): clean up unnecessary TypeScript configurations and remove any
    types
  - chore(docs): clean up unnecessary TypeScript and type configurations
  - chore(docs): remove unnecessary webpack debugging configuration
  - fix(docs): add missing lib/remToPx.ts file to repository
  - chore(docs): add file existence checking to Next.js webpack config
  - fix(docs): add extensive logging to Next.js webpack configuration
  - fix: add explicit webpack aliases and update TypeScript config
  - fix: add comprehensive type declarations for TypeScript path resolution
  - fix: simplify baseUrl in tsconfig for workspace root compatibility
  - fix: run TypeScript typecheck from workspace root in CI
  - fix: resolve TypeScript path mapping and module declaration issues
  - fix: add rootDir to TypeScript config for better path resolution
  - fix: run docs typecheck from correct directory in CI
  - fix: remove ./ prefix from TypeScript paths in docs tsconfig
  - fix: build dependencies before typecheck in CI
  - fix: resolve CI TypeScript path resolution issues for docs
  - feat: fix docs package.json typecheck script
  - feat: fix
  - fix: finalize TypeScript and webpack configuration for CI compatibility
  - feat: ci
  - fix: resolve webpack alias path resolution for CI builds
  - feat: fix ci
  - fix: adjust TypeScript baseUrl for CI monorepo context
  - fix: improve webpack alias resolution for CI environment
  - fix: resolve TypeScript path mapping and type declaration issues
  - fix: add GitHub Pages basePath and assetPrefix configuration
  - feat: enable GitHub Pages support with static export
  - fix: improve path resolution in next.config.mjs for CI
  - fix: update CLI version to 0.6.8 and remove unnecessary deployment condition
  - fix: rename postcss.config.js to .cjs for ES module compatibility
  - fix: resolve docs build path alias issue
  - fix: update version to 0.6.7 in package.json
  - feat: add docs
  - feat: add format and typecheck scripts to docs app
  - fix: prettier configuration for monorepo
  - feat: integrate docs app into monorepo
  - fix: create CLI-specific README and update version to 0.6.6
  - feat: setup dual package publishing (pcu + pnpm-catalog-updates) and include
    README files
