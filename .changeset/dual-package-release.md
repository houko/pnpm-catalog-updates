---
'pcu': patch
---

Enable dual package publication to NPM registries

This release implements simultaneous publication to both:

- pcu package (new short name)
- pnpm-catalog-updates package (original name)

Both packages will maintain version synchronization and identical functionality
for backward compatibility.
