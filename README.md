# pnpm-catalog-updates

The deterministic update engine for pnpm catalogs.

PCU turns dependency discovery into a reviewable plan, applies exactly that plan, verifies the
result, and keeps a rollback backup. It is designed to be a safe execution layer for developers,
CI jobs, and coding agents—not another AI wrapper around `package.json` edits.

[![npm version](https://img.shields.io/npm/v/pcu.svg)](https://www.npmjs.com/package/pcu)
[![npm weekly downloads](https://img.shields.io/npm/dw/pcu.svg)](https://www.npmjs.com/package/pcu)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen.svg)](https://nodejs.org/)
[![CI](https://img.shields.io/github/actions/workflow/status/yldm-tech/pnpm-catalog-updates/ci.yml?label=CI&logo=github)](https://github.com/yldm-tech/pnpm-catalog-updates/actions)

## Why PCU still matters in the AI era

An agent can propose a version change. Production automation still needs guarantees:

- the reviewed change is the change that gets applied;
- a changed workspace invalidates an old plan before any write;
- commands do not prompt, invoke AI, or add prose to JSON output;
- the final catalog state can be verified mechanically;
- every normal apply has a recovery path.

PCU provides that trust boundary specifically for pnpm catalogs.

## The workflow

```bash
# 1. Discover updates and save a portable plan
pcu plan --target minor --out pcu-plan.json

# 2. Review or let an agent inspect the JSON diff
git diff -- pcu-plan.json

# 3. Apply only if pnpm-workspace.yaml still matches the reviewed source
pcu apply pcu-plan.json

# 4. Assert the exact target state in CI
pcu verify pcu-plan.json

# Recover the exact backup path returned by apply
pcu rollback --from <backupPath> --yes --json
```

`pcu plan` writes schema-versioned JSON with sorted fields, no timestamp, no localized reason text,
and no absolute workspace path. The artifact includes a SHA-256 fingerprint of
`pnpm-workspace.yaml`, so it can be reviewed on one machine and safely applied in another checkout.

`pcu apply` is deliberately boring: it does not query the registry or call an AI provider. It
validates the artifact, checks the source fingerprint, writes through PCU's atomic repository, makes
a backup by default, and verifies the result. Reapplying an already-satisfied plan is a successful
no-op.

Run `pnpm install` explicitly when lockfile regeneration belongs in the same step:

```bash
pcu apply pcu-plan.json --install
```

## Stable exit codes

| Code | Meaning |
| ---: | --- |
| `0` | Success, including an already-applied plan |
| `2` | Invalid input or execution/install failure |
| `3` | Stale plan: the source workspace fingerprint changed |
| `4` | Verification failed: catalog state differs from the plan |
| `5` | The plan contains unresolved conflicts; review or use `--force` |

Workflow commands emit JSON only. Expected failures also return structured JSON, making the
contract suitable for CI and tool calling.

For rollback automation, pass the exact `update.backupPath` returned by `apply` to
`pcu rollback --from <backupPath> --yes --json`. Interactive `pcu rollback` remains available for
humans.

## Install

```bash
npm install --global pcu
# or
pnpm add --global pcu
```

Node.js 20 or newer and pnpm 9 or newer are supported.

## Planning options

```bash
pcu plan --target latest
pcu plan --catalog default
pcu plan --include "react*" "@types/*"
pcu plan --exclude "*-alpha"
pcu plan --prerelease
pcu plan --security
```

Security advisory lookups are opt-in for deterministic planning with `--security`. They never run
during `apply`.

## Human-oriented commands

The existing commands remain available for exploration and interactive use:

| Command | Purpose |
| --- | --- |
| `pcu check` | Inspect outdated catalog dependencies |
| `pcu update` | Interactive/convenience plan-and-apply flow |
| `pcu analyze` | Explain update impact |
| `pcu security` | Run vulnerability checks |
| `pcu workspace` | Inspect or validate a workspace |
| `pcu graph` | Render catalog dependency relationships |
| `pcu rollback` | List or restore workspace backups |

AI analysis is optional and never participates in the deterministic execution path. Use
`pcu update --ai` or `pcu analyze` when an explanation is useful; use
`plan → apply → verify` when correctness and automation matter.

## Using PCU from an agent

A reliable agent loop is small:

1. Run `pcu plan --out pcu-plan.json`.
2. Inspect `updates`, `conflicts`, and the repository diff.
3. Run tests appropriate to the proposed versions.
4. Run `pcu apply pcu-plan.json` only after approval.
5. Run `pcu verify pcu-plan.json` and report its JSON result.

The agent decides whether a plan is desirable. PCU guarantees what the plan means and whether it
was applied faithfully.

## Documentation and support

- [Documentation](https://pcu-cli.dev/en)
- [Issue tracker](https://github.com/yldm-tech/pnpm-catalog-updates/issues)
- [Discussions](https://github.com/yldm-tech/pnpm-catalog-updates/discussions)
- [Contributing guide](CONTRIBUTING.md)

## License

MIT — see [LICENSE](LICENSE).
