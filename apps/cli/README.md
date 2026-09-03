# pcu

The deterministic update engine for pnpm workspace catalogs.

PCU creates a portable dependency update plan, applies exactly the reviewed plan, verifies the
result, and creates a rollback backup by default. Its JSON workflow is suitable for developers, CI,
and coding agents.

## Install

```bash
npm install --global pcu
# or
pnpm add --global pcu
```

## Safe automation workflow

```bash
pcu plan --target minor --out pcu-plan.json
pcu apply pcu-plan.json
pcu verify pcu-plan.json
pcu rollback --from <backupPath> --yes --json
```

The plan contains a SHA-256 fingerprint of `pnpm-workspace.yaml`. `apply` refuses stale plans before
writing, performs atomic catalog updates, creates a backup, and verifies the exact target state.
Applying an already-satisfied plan is a successful no-op.

Use `--install` only when the apply step should also regenerate the lockfile:

```bash
pcu apply pcu-plan.json --install
```

Workflow exit codes are stable: `0` success, `2` invalid input/execution failure, `3` stale plan,
`4` verification drift, and `5` unresolved conflicts.

## Interactive and advisory tools

```bash
pcu check
pcu update --interactive
pcu analyze react 19.0.0
pcu security
pcu rollback --latest
```

AI analysis is opt-in with `pcu update --ai`. It can explain risk, but it is never called by
`plan`, `apply`, or `verify`.

See the [complete documentation](https://pcu-cli.dev/en) and the
[GitHub repository](https://github.com/yldm-tech/pnpm-catalog-updates).
