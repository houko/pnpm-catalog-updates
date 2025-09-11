---
'pcu': patch
---

Fix infinite loop in Release workflow

- Remove automatic changeset generation that caused infinite loops
- Implement standard Changesets workflow requiring manual changeset creation
- Add validation step to ensure changeset files exist before processing
- Prevent Release workflow from triggering itself endlessly
