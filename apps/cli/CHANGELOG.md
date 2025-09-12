# pcu

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
