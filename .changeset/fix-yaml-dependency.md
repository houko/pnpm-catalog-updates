---
'pcu': patch
---

fix: remove yaml dependency from publish script

Replace yaml module dependency with fallback catalog resolution to fix CI
publication errors. The script now uses pnpm list output or hardcoded catalog
values to resolve dependencies without requiring additional modules in CI.
