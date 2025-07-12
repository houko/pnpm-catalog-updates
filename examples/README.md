# Usage Examples

This directory contains comprehensive examples demonstrating how to use
**pnpm-catalog-updates** in various scenarios.

## 📁 Example Structure

```text
examples/
├── basic-usage/           # Simple single-catalog workspace
├── multi-catalog/         # Complex multi-catalog setup
├── monorepo/             # Large monorepo example
├── ci-integration/       # CI/CD integration examples
├── custom-config/        # Advanced configuration
└── interactive-mode/     # Interactive usage patterns
```

## 🚀 Quick Start Examples

### Basic Check for Updates

```bash
# Navigate to your workspace
cd my-project

# Quick check
pcu -c

# Check with specific format
pcu check --format table
pcu check --format json > updates.json
```

### Interactive Update

```bash
# Interactive update with backup
pcu update --interactive --backup

# Update specific catalog
pcu update --catalog react17 --interactive

# Dry run first
pcu update --dry-run --verbose
```

## 🏗️ Basic Usage Examples

### Example 1: Simple Single-Catalog Workspace

**Structure:**

```text
simple-workspace/
├── pnpm-workspace.yaml
├── package.json
├── packages/
│   ├── app/
│   │   └── package.json
│   └── lib/
│       └── package.json
```

**pnpm-workspace.yaml:**

```yaml
packages:
  - 'packages/*'

catalog:
  react: ^18.2.0
  typescript: ^5.0.0
  lodash: ^4.17.21
```

**Usage:**

```bash
cd simple-workspace

# Check what's outdated
pcu check

# Update interactively
pcu update -i

# Update with specific strategy
pcu update --target minor
```

### Example 2: Multi-Catalog Setup

**Structure:**

```text
multi-catalog/
├── pnpm-workspace.yaml
├── apps/
│   ├── web/
│   └── mobile/
├── packages/
│   ├── ui/
│   └── utils/
```

**pnpm-workspace.yaml:**

```yaml
packages:
  - 'apps/*'
  - 'packages/*'

catalog:
  # Default catalog
  react: ^18.2.0
  typescript: ^5.0.0

catalogs:
  # Legacy React 17
  react17:
    react: ^17.0.2
    @types/react: ^17.0.62

  # Latest versions
  latest:
    react: ^18.2.0
    typescript: ^5.2.0
    next: ^13.5.0

  # Development tools
  devtools:
    eslint: ^8.0.0
    prettier: ^3.0.0
    typescript: ^5.0.0
```

**Usage:**

```bash
cd multi-catalog

# Check all catalogs
pcu check

# Check specific catalog
pcu check --catalog react17

# Update specific catalog
pcu update --catalog latest --interactive

# Analyze impact before updating
pcu analyze latest react
```

### Example 3: Large Monorepo

**Structure:**

```text
large-monorepo/
├── pnpm-workspace.yaml
├── apps/
│   ├── web-app/
│   ├── admin-app/
│   └── api/
├── packages/
│   ├── ui/
│   ├── shared/
│   ├── config/
│   └── utils/
├── tooling/
│   ├── eslint-config/
│   └── typescript-config/
```

**pnpm-workspace.yaml:**

```yaml
packages:
  - 'apps/*'
  - 'packages/*'
  - 'tooling/*'

catalog:
  # Core dependencies
  react: ^18.2.0
  next: ^13.5.0
  typescript: ^5.0.0

  # UI libraries
  @headlessui/react: ^1.7.0
  clsx: ^2.0.0
  tailwindcss: ^3.3.0

catalogs:
  # Production runtime
  prod:
    react: ^18.2.0
    next: ^13.5.0

  # Development tools
  dev:
    eslint: ^8.0.0
    prettier: ^3.0.0
    typescript: ^5.0.0
    vitest: ^0.34.0

  # Testing
  test:
    vitest: ^0.34.0
    @testing-library/react: ^14.0.0
    jsdom: ^22.0.0
```

**Usage:**

```bash
cd large-monorepo

# Check with statistics
pcu workspace --stats

# Check specific catalog with format
pcu check --catalog prod --format json

# Update with impact analysis
pcu update --catalog prod --dry-run --verbose

# Analyze impact before major update
pcu analyze prod react
```

## 🔧 Advanced Configuration Examples

### Custom Configuration File

**.pcurc.json:**

```json
{
  "defaults": {
    "target": "latest",
    "timeout": 30000,
    "parallel": 5,
    "theme": "modern"
  },
  "workspace": {
    "autoDiscover": true,
    "catalogMode": "strict",
    "exclude": ["node_modules", ".git", "dist"]
  },
  "update": {
    "interactive": true,
    "dryRunFirst": true,
    "skipPrereleases": false,
    "createBackup": true,
    "backupDir": ".pcu-backups"
  },
  "output": {
    "format": "table",
    "color": true,
    "verbose": false,
    "theme": "modern"
  },
  "filter": {
    "include": ["react*", "@types/*"],
    "exclude": ["@internal/*", "private-*"]
  }
}
```

### JavaScript Configuration

**pcu.config.js:**

```javascript
module.exports = {
  defaults: {
    target: 'latest',
    timeout: 30000,
  },
  update: {
    interactive: process.env.NODE_ENV !== 'production',
    createBackup: true,
  },
  output: {
    format: process.env.CI ? 'json' : 'table',
    color: !process.env.NO_COLOR,
  },
  // Dynamic filtering
  filter: {
    include: (packageName) => !packageName.startsWith('@internal'),
    exclude: (packageName) => packageName.includes('beta'),
  },
};
```

## 🔄 CI/CD Integration Examples

### GitHub Actions

**.github/workflows/update-dependencies.yml:**

```yaml
name: Update Dependencies

on:
  schedule:
    - cron: '0 9 * * 1' # Every Monday at 9 AM
  workflow_dispatch:

jobs:
  update-deps:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v2
        with:
          version: latest

      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install

      - name: Check for updates
        id: check
        run: |
          UPDATES=$(pcu check --format json)
          echo "updates=$UPDATES" >> $GITHUB_OUTPUT

      - name: Create Pull Request
        if: fromJson(steps.check.outputs.updates).hasUpdates
        uses: peter-evans/create-pull-request@v5
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          commit-message: 'chore: update dependencies'
          title: 'chore: weekly dependency updates'
          body: |
            This PR updates dependencies to their latest versions.

            Changes were generated automatically by pnpm-catalog-updates.
          branch: deps/weekly-updates
          delete-branch: true
```

### GitLab CI

**.gitlab-ci.yml:**

```yaml
update-dependencies:
  stage: maintenance
  image: node:18
  before_script:
    - npm install -g pnpm
    - pnpm config set store-dir .pnpm-store
  script:
    - pcu check --format json > updates.json
    - |
      if [ $(node -e "console.log(require('./updates.json').hasUpdates)") = "true" ]; then
        pcu update --format minimal
        pnpm install --frozen-lockfile=false
        git checkout -b deps/weekly-updates
        git add .
        git commit -m "chore: update dependencies [skip ci]"
        git push origin deps/weekly-updates
      fi
  only:
    - schedules
```

## 🎯 Interactive Mode Examples

### Interactive Update Session

```bash
$ pcu update -i

📋 Progress Steps:

→ Scanning workspace
  Loading workspace configuration...
✅ Found workspace: my-project
  Reading catalogs...

🔄 Found 5 outdated dependencies

📋 Catalog: default

? Select packages to update: (Press <space> to select, <a> to toggle all, <i> to invert selection)
❯◯ react ^18.2.0 → ^18.2.37 (patch)
 ◯ typescript ^5.0.0 → ^5.2.2 (minor)
 ◯ lodash ^4.17.21 → ^4.17.21 (no change)
 ◯ next ^13.5.0 → ^13.5.6 (patch)
 ◯ eslint ^8.0.0 → ^8.52.0 (minor)

? Select update strategy: (Use arrow keys)
❯ Latest (recommended)
  Greatest (highest version)
  Minor (non-breaking)
  Patch (bug fixes only)

⚠️  Warning: This will update 3 packages
? Are you sure you want to update packages? (Y/n)

✅ Update completed successfully!

📦 Updated 3 dependencies:

┌─────────────┬─────────┬────────┬────────┬──────┐
│ Catalog     │ Package │ From   │ To     │ Type │
├─────────────┼─────────┼────────┼────────┼──────┤
│ default     │ react   │ 18.2.0 │ 18.2.37│ patch│
│ default     │ next    │ 13.5.0 │ 13.5.6 │ patch│
│ default     │ eslint  │ 8.0.0  │ 8.52.0 │ minor│
└─────────────┴─────────┴────────┴────────┴──────┘
```

### Configuration Wizard

```bash
$ pcu --wizard

🧙‍♂️ Configuration Wizard

? Select color theme: (Use arrow keys)
❯ Default - Balanced colors
  Modern - Vibrant colors
  Minimal - Clean and simple
  Neon - High contrast

? Enable interactive mode by default? (Y/n)
? Create backups before updates? (Y/n)
? Default update strategy: (Use arrow keys)
❯ Latest stable versions
  Minor updates (non-breaking)
  Patch updates (bug fixes)
? Network timeout (seconds): (30)

✅ Configuration saved to .pcurc.json
```

## 📊 Output Format Examples

### Table Format (Default)

```bash
$ pcu check

📦 Workspace: my-project
Path: /Users/me/my-project

🔄 Found 3 outdated dependencies

📋 Catalog: default
┌─────────────────┬─────────┬────────┬────────┬────────────┐
│ Package         │ Current │ Latest │ Type   │ Packages   │
├─────────────────┼─────────┼────────┼────────┼────────────┤
│ react           │ 18.2.0  │ 18.2.37│ patch  │ 5 package(s)│
│ typescript      │ 5.0.0   │ 5.2.2  │ minor  │ 8 package(s)│
│ 🔒 lodash       │ 4.17.20 │ 4.17.21│ patch  │ 3 package(s)│
└─────────────────┴─────────┴────────┴────────┴────────────┘
```

### JSON Format

```bash
$ pcu check --format json

{
  "workspace": {
    "name": "my-project",
    "path": "/Users/me/my-project"
  },
  "hasUpdates": true,
  "totalOutdated": 3,
  "catalogs": [
    {
      "catalogName": "default",
      "outdatedCount": 3,
      "outdatedDependencies": [
        {
          "packageName": "react",
          "currentVersion": "^18.2.0",
          "latestVersion": "^18.2.37",
          "updateType": "patch",
          "isSecurityUpdate": false,
          "affectedPackages": ["app", "lib", "utils"]
        }
      ]
    }
  ]
}
```

### Minimal Format

```bash
$ pcu check --format minimal

react          ^18.2.0  → ^18.2.37
typescript     ^5.0.0   → ^5.2.2
lodash         ^4.17.20 → ^4.17.21
```

## 🎨 Theme Examples

### Available Themes

```bash
# Set theme via CLI
pcu check --theme modern

# Set theme via environment
PCU_THEME=neon pcu check

# Set theme via config
echo '{"output":{"theme":"minimal"}}' > .pcurc.json
```

### Theme Showcase

**Default Theme:**

```text
📦 Workspace: my-project
✅ All catalog dependencies are up to date!
```

**Modern Theme:**

```text
📦 Workspace: my-project
✅ All catalog dependencies are up to date!
```

**Minimal Theme:**

```text
Workspace: my-project
Status: All dependencies up to date
```

## 🚨 Advanced Error Handling

### Error Recovery

```text
$ pcu update

❌ Update failed with 2 errors

💥 default:react - Network timeout
⚠️  default:eslint - Version conflict

? Error: Network timeout
❯ Retry operation
  Skip this package
  Continue with remaining
  Abort operation
```

## 🔍 Debug Mode

```bash
# Verbose output
pcu check --verbose

# Debug with timing
DEBUG=pcu:* pcu check

# Debug specific module
DEBUG=pcu:network pcu check
```

## 📈 Performance Tips

### Large Workspaces

```bash
# Increase parallel processing
pcu check --parallel 10

# Use cached results
pcu check --cache

# Skip heavy operations
pcu check --skip-security
```

### Memory Optimization

```bash
# For very large workspaces
NODE_OPTIONS="--max-old-space-size=4096" pcu check

# Use streaming output
pcu check --format json | jq .
```

## 🧪 Testing Examples

### Test Configuration

```bash
# Test with sample data
pcu --config examples/test-config.json check

# Validate configuration
pcu workspace --validate

# Dry run with validation
pcu update --dry-run --validate-config
```

These examples cover the most common usage patterns. For more specific use
cases, refer to the individual example directories above.
