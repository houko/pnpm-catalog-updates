---
'pcu': patch
---

fix: resolve catalog dependencies in published packages

Fix dual publication script to properly resolve pnpm catalog dependencies to
actual version numbers before publishing to NPM. This prevents
"EUNSUPPORTEDPROTOCOL catalog:" errors when installing the package globally.
