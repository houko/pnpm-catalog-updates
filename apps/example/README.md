# PNPM Catalog Updates - Example Workspace

This example workspace demonstrates best practices for using
**pnpm-catalog-updates** (PCU) in a monorepo environment with multiple catalogs
and packages.

## 🏗️ Workspace Structure

```text
example/
├── 📁 apps/                        # Applications
│   ├── react-app/                  # React 18 app (default catalog)
│   ├── legacy-react-app/           # React 17 app (react17 catalog)
│   ├── mui-app/                    # Material-UI app (material-ui catalog)
│   └── api-server/                 # Express server (server catalog)
├── 📁 packages/                    # Shared packages
│   └── utils/                      # Utility library
├── 📄 pnpm-workspace.yaml          # Workspace & catalog configuration
├── 📄 package.json                 # Root package with PCU scripts
├── 📄 .pcurc.json                  # PCU configuration
└── 📄 README.md                    # This file
```

## 🎯 Catalog Strategies Demonstrated

### 1. **Default Catalog** (`catalog:`)

Used by most packages for current stable versions:

- `apps/react-app` - Modern React 18 application
- `packages/utils` - Shared utility library

### 2. **Legacy Support** (`catalog:react17`)

Maintains older versions for legacy compatibility:

- `apps/legacy-react-app` - React 17 for legacy support

### 3. **Bleeding Edge** (`catalog:latest`)

Latest versions for experimental features:

- Demonstrates version management strategies

### 4. **Framework-Specific** (`catalog:material-ui`)

Grouped dependencies for specific UI frameworks:

- `apps/mui-app` - Material-UI components and theming

### 5. **Environment-Specific** (`catalog:server`, `catalog:node18/20`)

Server and Node.js version-specific dependencies:

- `apps/api-server` - Express.js API server

## 🚀 Getting Started

### 1. Initialize the Example

```bash
# Navigate to the example directory
cd apps/example

# Install dependencies
pnpm install

# Initialize PCU configuration (optional - already configured)
pnpm dlx pnpm-catalog-updates init --force
```

### 2. Basic PCU Operations

```bash
# Check for available updates
pnpm run pcu:check

# Check specific catalog
pnpm dlx pnpm-catalog-updates check --catalog react17

# Interactive update (recommended)
pnpm run pcu:update

# Dry run to preview changes
pnpm dlx pnpm-catalog-updates update --dry-run

# Update only minor/patch versions
pnpm run pcu:update-minor
```

### 3. Advanced Usage Examples

```bash
# Analyze impact of updating React
pnpm run example:react-analyze

# Update only development tools
pnpm dlx pnpm-catalog-updates update --catalog devtools

# Check workspace statistics
pnpm run pcu:workspace

# Update excluding certain packages
pnpm dlx pnpm-catalog-updates update --exclude "react*"

# Format output as JSON
pnpm dlx pnpm-catalog-updates check --format json
```

## 📖 Common Scenarios

### Scenario 1: Updating React Ecosystem

When updating React, you often want to update related packages together:

```bash
# Check React-related updates
pnpm dlx pnpm-catalog-updates check --include "react*" --include "@types/react*"

# Update React 17 catalog
pnpm dlx pnpm-catalog-updates update --catalog react17 --interactive

# Analyze impact before updating
pnpm dlx pnpm-catalog-updates analyze default react 18.3.0
```

### Scenario 2: Security Updates

Handle security vulnerabilities across all catalogs:

```bash
# Check for security issues (requires .pcurc.json config)
pnpm dlx pnpm-catalog-updates check --include-security

# Update with security priority
pnpm dlx pnpm-catalog-updates update --security-first
```

### Scenario 3: Development vs Production

Separate development and production dependency management:

```bash
# Update only development tools
pnpm dlx pnpm-catalog-updates update --catalog devtools

# Conservative updates for production dependencies
pnpm dlx pnpm-catalog-updates update --target minor --exclude "devtools"
```

### Scenario 4: Migration Planning

When planning major version migrations:

```bash
# Check what would break with major updates
pnpm dlx pnpm-catalog-updates check --target greatest --format table

# Analyze specific package impact
pnpm dlx pnpm-catalog-updates analyze default typescript 5.0.0

# Create backup before major changes
pnpm dlx pnpm-catalog-updates update --create-backup --target minor
```

## 🔧 Configuration Examples

The `.pcurc.json` file demonstrates various configuration patterns:

### Package Rules

```json
{
  "packageRules": [
    {
      "patterns": ["react", "react-dom"],
      "target": "minor",
      "requireConfirmation": true,
      "relatedPackages": ["@types/react", "@types/react-dom"]
    }
  ]
}
```

### Catalog-Specific Rules

```json
{
  "catalogs": {
    "react17": {
      "target": "patch",
      "requireConfirmation": true
    },
    "latest": {
      "target": "greatest",
      "autoUpdate": false
    }
  }
}
```

## 📊 Package Demonstrations

### React App (`apps/react-app`)

- ✅ Uses default catalog for React 18
- ✅ Demonstrates lodash and axios usage
- ✅ Shows TypeScript integration
- ✅ Includes testing setup with Vitest

### Legacy React App (`apps/legacy-react-app`)

- ✅ Uses react17 catalog for compatibility
- ✅ Shows version pinning strategy
- ✅ Demonstrates legacy support patterns

### Material-UI App (`apps/mui-app`)

- ✅ Uses material-ui catalog for grouped dependencies
- ✅ Shows emotion styling integration
- ✅ Demonstrates framework-specific catalogs

### API Server (`apps/api-server`)

- ✅ Uses server catalog for backend dependencies
- ✅ Shows Express.js and security middleware
- ✅ Demonstrates Node.js version targeting

### Utils Package (`packages/utils`)

- ✅ Shared library with minimal dependencies
- ✅ Shows rollup build configuration
- ✅ Demonstrates package export patterns

## 🧪 Testing PCU Features

### 1. Test Update Detection

```bash
# Temporarily modify a version in pnpm-workspace.yaml
# Change react: ^18.2.0 to react: ^17.0.0
# Then run:
pnpm dlx pnpm-catalog-updates check

# Should show React as outdated
```

### 2. Test Catalog Filtering

```bash
# Only check specific catalogs
pnpm dlx pnpm-catalog-updates check --catalog react17
pnpm dlx pnpm-catalog-updates check --catalog server
```

### 3. Test Output Formats

```bash
# Try different output formats
pnpm dlx pnpm-catalog-updates check --format table
pnpm dlx pnpm-catalog-updates check --format json
pnpm dlx pnpm-catalog-updates check --format minimal
```

### 4. Test Interactive Mode

```bash
# Use interactive mode to selectively update
pnpm dlx pnpm-catalog-updates update --interactive
```

## 🎨 Workspace Benefits

This example demonstrates several monorepo advantages:

1. **Shared Dependency Management**: All packages use consistent versions
   through catalogs
2. **Selective Versioning**: Different catalogs for different requirements
   (legacy, latest, framework-specific)
3. **Impact Analysis**: See which packages are affected by catalog changes
4. **Batch Operations**: Update multiple packages consistently
5. **Configuration Inheritance**: Shared PCU configuration across all packages

## 💡 Best Practices Shown

### 1. Catalog Organization

- **Default catalog**: Most common, stable dependencies
- **Framework catalogs**: Group related ecosystem packages
- **Version catalogs**: Separate old/new versions for migration
- **Environment catalogs**: Server vs client-specific dependencies

### 2. Package Structure

- Use `catalog:` for default versions
- Use `catalog:name` for specific catalog versions
- Group related dependencies in the same catalog
- Keep dev dependencies in appropriate catalogs

### 3. Update Strategies

- Conservative: `target: "minor"` for production apps
- Aggressive: `target: "latest"` for experimental packages
- Security-first: Allow major updates for security fixes
- Interactive: Always review changes before applying

### 4. Workflow Integration

- Add PCU commands to package.json scripts
- Use pre-commit hooks for validation
- Integrate with CI/CD for automated checks
- Document update procedures for team members

## 🔗 Additional Resources

- [PCU Documentation](../../README.md)
- [PNPM Workspaces](https://pnpm.io/workspaces)
- [PNPM Catalogs](https://pnpm.io/catalogs)
- [Troubleshooting Guide](./TROUBLESHOOTING.md)

## 🤝 Contributing

To contribute improvements to this example:

1. Test your changes with: `pnpm dlx pnpm-catalog-updates check`
2. Ensure all packages build: `pnpm build`
3. Update documentation as needed
4. Submit a pull request with your improvements

---

**Happy updating! 🚀**

Run `pnpm dlx pnpm-catalog-updates --help` to explore all available commands and
options.
