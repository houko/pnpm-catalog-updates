# pnpm-catalog-updates

A powerful CLI tool to check and update pnpm workspace catalog dependencies,
inspired by
[npm-check-updates](https://github.com/raineorshine/npm-check-updates).

**📖 Documentation Languages**: [English](README.md) | [中文](README.zh-CN.md) |
[日本語](README.ja.md)

[![CI](https://img.shields.io/github/actions/workflow/status/houko/pnpm-catalog-updates/ci.yml?label=CI&logo=github)](https://github.com/houko/pnpm-catalog-updates/actions)
[![npm](https://img.shields.io/npm/v/pnpm-catalog-updates)](https://www.npmjs.com/package/pnpm-catalog-updates)
[![Coverage](https://img.shields.io/coveralls/github/houko/pnpm-catalog-updates/main)](https://coveralls.io/github/houko/pnpm-catalog-updates)

## ✨ Features

- 🔍 **Smart Detection**: Automatically discovers pnpm workspaces and catalog
  configurations
- 🎯 **Catalog Focused**: Specialized for pnpm catalog dependency management
- 🚀 **Interactive Mode**: Choose which dependencies to update with an intuitive
  interface
- 📊 **Impact Analysis**: Understand which packages will be affected by catalog
  changes
- 🔒 **Safe Updates**: Dry-run mode and backup options for safe dependency
  updates
- ⚡ **High Performance**: Parallel API queries and intelligent caching
- 🛡️ **Security Aware**: Built-in security vulnerability scanning
- 🎨 **Beautiful UI**: Enhanced progress bars, color themes, and interactive
  prompts
- 🎭 **Customizable Themes**: Multiple color themes (default, modern, minimal,
  neon)
- 📈 **Progress Tracking**: Real-time progress indicators for all operations
- 🔧 **Configurable**: Flexible configuration options and update strategies

## 🚀 Quick Start

```bash
pcu -c
```

![Image](https://github.com/user-attachments/assets/f05a970e-c58c-44f1-b3f1-351ae30b4a35)

### Installation

```bash
# Global installation
npm install -g pnpm-catalog-updates
# or
npm install -g pcu

# Or use with npx
npx pnpm-catalog-updates
# or
npx pcu

# Or use the short alias
pcu
```

### Basic Usage

```bash
# Quick check for updates
pcu -c

# Quick update (interactive)
pcu -i

# Quick update (dry run)
pcu -u -d

# Get workspace info
pcu -s
```

### Common Commands

| Command  | Description                       | Example                   |
| -------- | --------------------------------- | ------------------------- |
| `pcu -c` | Check for updates                 | `pcu -c --catalog node18` |
| `pcu -i` | Update dependencies (interactive) | `pcu -i -b`               |
| `pcu -a` | Analyze impact                    | `pcu -a default react`    |
| `pcu -s` | Workspace info                    | `pcu -s --validate`       |
| `pcu -t` | Configure color theme             | `pcu -t --set modern`     |
| `pcu -h` | Show help                         | `pcu -h update`           |

## 📖 Complete Usage Guide

### All Commands & Shortcuts

| Full Command    | Shorthand | Description                               |
| --------------- | --------- | ----------------------------------------- |
| `pcu check`     | `pcu -c`  | Check for outdated catalog dependencies   |
| `pcu update`    | `pcu -u`  | Update catalog dependencies               |
| `pcu analyze`   | `pcu -a`  | Analyze impact of dependency updates      |
| `pcu workspace` | `pcu -s`  | Show workspace information and validation |
| `pcu theme`     | `pcu -t`  | Configure color themes and UI settings    |
| `pcu help`      | `pcu -h`  | Display help information                  |

### Commands

#### `pcu check` / `pcu -c` / `pcu chk`

Check for outdated dependencies in your pnpm workspace catalogs.

```bash
pcu check [options]
pcu -c [options]
pcu chk [options]

Options:
  --catalog <name>      Check specific catalog only
  -f, --format <type>   Output format: table, json, yaml, minimal (default: table)
                        - table: Rich table format with colors and details
                        - minimal: Simple npm-check-updates style (package → version)
                        - json: JSON output for programmatic use
                        - yaml: YAML output for configuration files
  -t, --target <type>   Update target: latest, greatest, minor, patch, newest (default: latest)
  --prerelease          Include prerelease versions
  --include <pattern>   Include packages matching pattern
  --exclude <pattern>   Exclude packages matching pattern
  -w, --workspace <path> Workspace directory (default: current directory)
  -v, --verbose         Show detailed information
```

#### `pcu update` / `pcu -u`

Update catalog dependencies to newer versions.

```bash
pcu update [options]
pcu -u [options]
pcu u [options]

Options:
  -i, --interactive     Interactive mode to choose updates
  -d, --dry-run         Preview changes without writing files
  -t, --target <type>   Update target: latest, greatest, minor, patch, newest (default: latest)
  --catalog <name>      Update specific catalog only
  --include <pattern>   Include packages matching pattern
  --exclude <pattern>   Exclude packages matching pattern
  --force               Force updates even if risky
  --prerelease          Include prerelease versions
  -b, --create-backup   Create backup files before updating
  -f, --format <type>   Output format: table, json, yaml, minimal (default: table)
                        - table: Rich table format with colors and details
                        - minimal: Simple npm-check-updates style (package → version)
                        - json: JSON output for programmatic use
                        - yaml: YAML output for configuration files
  -w, --workspace <path> Workspace directory (default: current directory)
  -v, --verbose         Show detailed information
```

#### `pcu analyze` / `pcu -a`

Analyze the impact of updating a specific dependency.

```bash
pcu analyze <catalog> <package> [version]
pcu -a <catalog> <package> [version]
pcu a <catalog> <package> [version]

Arguments:
  catalog               Catalog name (e.g., 'default', 'react17')
  package               Package name (e.g., 'react', '@types/node')
  version               New version (optional, defaults to latest)

Options:
  -f, --format <type>   Output format: table, json, yaml, minimal (default: table)
  -w, --workspace <path> Workspace directory (default: current directory)
  -v, --verbose         Show detailed information

Examples:
  pcu analyze default react
  pcu a default react 18.3.0
  pcu -a react17 @types/react
```

#### `pcu workspace` / `pcu -s`

Show workspace information and validation.

```bash
pcu workspace [options]
pcu -s [options]
pcu w [options]

Options:
  --validate            Validate workspace configuration
  -s, --stats           Show workspace statistics
  -f, --format <type>   Output format: table, json, yaml, minimal (default: table)
  -w, --workspace <path> Workspace directory (default: current directory)
  -v, --verbose         Show detailed information

Examples:
  pcu workspace           # Show basic workspace info
  pcu -s --stats         # Show detailed statistics
  pcu w --validate       # Validate workspace configuration
```

#### `pcu help` / `pcu -h`

Display help information.

```bash
pcu help [command]
pcu -h [command]

Examples:
  pcu help              # Show general help
  pcu help update       # Show help for update command
  pcu -h check          # Show help for check command
```

#### `pcu theme` / `pcu -t`

Configure color themes and UI appearance.

```bash
pcu theme [options]
pcu -t [options]

Options:
  -s, --set <theme>     Set color theme: default, modern, minimal, neon
  -l, --list            List all available themes
  -i, --interactive     Interactive theme configuration wizard

Examples:
  pcu theme             # Show current theme info
  pcu -t --list         # List all available themes
  pcu theme --set modern # Set to modern theme
  pcu -t --interactive  # Launch theme configuration wizard
```

**Available Themes:**

- `default` - Balanced colors for general use
- `modern` - Vibrant colors for development environments
- `minimal` - Clean and simple for production environments
- `neon` - High contrast colors for presentations

### Global Options

These options work with all commands:

```bash
-w, --workspace <path>   Workspace directory path
-v, --verbose            Enable verbose logging
--no-color               Disable colored output
-V, --version            Output the version number
-h, --help               Display help for command
```

### Common Usage Patterns

```bash
# Quick check for updates
pcu -c

# Check with simple output (like npm-check-updates)
pcu -c --format minimal

# Interactive update with backup
pcu -i -b

# Update only minor and patch versions
pcu -u --target minor

# Check specific catalog
pcu -c --catalog node18

# Update excluding certain packages
pcu -u --exclude "eslint*"

# Dry run with verbose output
pcu -u -d -v

# Update with simple output format
pcu -u --format minimal

# Analyze impact before updating
pcu -a default react
pcu -u --catalog default --include react

# Validate workspace configuration
pcu -s --validate

# Theme customization
pcu -t --list                # List available themes
pcu -t --set modern         # Set modern theme
pcu -t --interactive        # Interactive theme setup
```

### Configuration

Create a `.pcurc.json` file (PCU configuration file) in your project root:

```json
{
  "defaults": {
    "target": "latest",
    "timeout": 30000,
    "parallel": 5
  },
  "workspace": {
    "autoDiscover": true,
    "catalogMode": "strict"
  },
  "update": {
    "interactive": true,
    "dryRunFirst": true,
    "skipPrereleases": false
  },
  "output": {
    "format": "table",
    "color": true,
    "verbose": false
  },
  "ui": {
    "theme": "default",
    "progressBars": true,
    "animations": true
  }
}
```

#### Package Filtering Configuration

You can also configure package-specific update rules by creating a `.pcurc.json`
(PCU configuration file) with filtering options:

```json
{
  // Exclude packages you never want to update
  "exclude": ["typescript", "@types/node", "react", "react-dom"],

  // Only update specific packages (optional - if not specified, all packages are considered)
  "include": ["lodash*", "chalk", "commander"],

  // Package-specific update rules
  "packageRules": [
    {
      "patterns": ["react", "react-dom"],
      "target": "minor", // Only minor updates for React
      "requireConfirmation": true, // Always ask before updating
      "relatedPackages": ["@types/react", "@types/react-dom"] // Related packages automatically follow same strategy
    },
    {
      "patterns": ["vue"],
      "target": "minor",
      "relatedPackages": ["@vue/compiler-sfc", "@vue/runtime-core"] // Vue ecosystem packages
    },
    {
      "patterns": ["@types/node"],
      "target": "minor", // Conservative updates for Node.js type definitions
      "requireConfirmation": true
    },
    {
      "patterns": ["@types/*"],
      "target": "latest", // Other type definitions can update more freely
      "autoUpdate": true
    },
    {
      "patterns": ["eslint*", "prettier"],
      "target": "minor", // Minor updates for dev tools
      "groupUpdate": true // Update related packages together
    }
  ],

  // Security configuration
  "security": {
    "autoFixVulnerabilities": true, // Automatically check and fix security vulnerabilities
    "allowMajorForSecurity": true, // Allow major version upgrades for security fixes
    "notifyOnSecurityUpdate": true // Show notifications on security updates
  },

  // Advanced configuration
  "advanced": {
    "concurrency": 5, // Number of concurrent network requests (default: 5)
    "timeout": 30000, // Network request timeout in ms (default: 30000)
    "retries": 3, // Number of retries on failure (default: 3)
    "cacheValidityMinutes": 60, // Cache validity period in minutes (default: 60, set to 0 to disable caching)
    "checkForUpdates": true // Check for tool updates on startup (default: true)
  },

  // Monorepo configuration
  "monorepo": {
    "syncVersions": ["react", "react-dom"], // Packages that need version sync across multiple catalogs
    "catalogPriority": ["default", "latest", "react17"] // Catalog priority order
  },

  // Override defaults
  "defaults": {
    "target": "minor",
    "createBackup": true
  }
}
```

**Related Packages Feature**: `relatedPackages` allows related packages to
automatically follow the same version strategy

- When you configure `react` with `target: "minor"`, `@types/react` will
  automatically apply the same strategy
- Avoid manually duplicating update rules for related packages
- Ensures version consistency across ecosystem packages

**Configuration priority**: relatedPackages > direct pattern matching > CLI
options > default configuration

**Priority Examples**:

```bash
@types/react → matches react rule's relatedPackages → uses "minor" strategy
@types/node → matches @types/node specific rule → uses "minor" strategy
@types/lodash → matches @types/* general rule → uses "latest" strategy
```

**Pattern matching**: Supports glob patterns like `react*`, `@types/*`,
`eslint*`

## 📁 Project Structure

This project follows Domain-Driven Design (DDD) principles:

```text
src/
├── cli/                    # CLI interface layer
│   ├── commands/           # Command handlers
│   ├── options/            # Option parsers
│   ├── formatters/         # Output formatters & progress bars
│   ├── interactive/        # Interactive prompts & UI
│   ├── themes/             # Color themes & styling
│   └── validators/         # Input validation
├── application/            # Application services
│   ├── services/           # Application services
│   ├── handlers/           # Command handlers
│   └── mappers/            # Data mappers
├── domain/                 # Domain model
│   ├── entities/           # Domain entities
│   ├── value-objects/      # Value objects
│   ├── aggregates/         # Aggregate roots
│   ├── services/           # Domain services
│   └── repositories/       # Repository interfaces
├── infrastructure/         # Infrastructure layer
│   ├── repositories/       # Repository implementations
│   ├── external-services/  # External service clients
│   └── file-system/        # File system operations
├── adapters/               # Adapter layer
│   ├── registry/           # Package registry adapters
│   └── package-managers/   # Package manager adapters
└── common/                 # Common utilities
    ├── types/              # Type definitions
    ├── utils/              # Utility functions
    ├── config/             # Configuration
    └── logger/             # Logging
```

## 🧪 Development

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.15.0

### Setup

```bash
# Clone the repository
git clone https://github.com/houko/pnpm-catalog-updates.git
cd pnpm-catalog-updates

# Install dependencies
pnpm install

# Build the project
pnpm build

# Run tests
pnpm test

# Run in development mode
pnpm dev --help
```

### Scripts

```bash
# Development
pnpm dev                    # Run in development mode
pnpm build                  # Build the project
pnpm build:watch           # Build in watch mode

# Testing
pnpm test                   # Run unit tests
pnpm test:watch            # Run tests in watch mode
pnpm test:coverage         # Run tests with coverage
pnpm test:e2e              # Run E2E tests

# Code Quality
pnpm lint                   # Lint code
pnpm lint:fix              # Fix linting issues
pnpm format                 # Format code
pnpm typecheck             # Type checking

# Utilities
pnpm clean                  # Clean build artifacts
```

### Testing

The project uses a comprehensive testing strategy:

- **Unit Tests**: Test individual components in isolation
- **Integration Tests**: Test component interactions
- **E2E Tests**: Test the complete CLI workflow

```bash
# Run all tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Run E2E tests
pnpm test:e2e

# Run tests in watch mode
pnpm test:watch
```

## 📊 Examples

### Basic Workspace

```yaml
# pnpm-workspace.yaml
packages:
  - 'packages/*'

catalog:
  react: ^18.2.0
  lodash: ^4.17.21
  typescript: ^5.0.0
```

### Multi-Catalog Setup

```yaml
# pnpm-workspace.yaml
packages:
  - "apps/*"
  - "packages/*"

catalog:
  # Default catalog
  react: ^18.2.0
  typescript: ^5.0.0

catalogs:
  # Legacy versions
  react17:
    react: ^17.0.2
    @types/react: ^17.0.62

  # Latest versions
  latest:
    react: ^18.2.0
    typescript: ^5.2.0
```

### Usage in package.json

```json
{
  "dependencies": {
    "react": "catalog:",
    "lodash": "catalog:",
    "legacy-lib": "catalog:react17"
  }
}
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md)
for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Add tests for your changes
5. Ensure all tests pass: `pnpm test`
6. Lint your code: `pnpm lint:fix`
7. Commit your changes: `git commit -m 'feat: add amazing feature'`
8. Push to the branch: `git push origin feature/amazing-feature`
9. Open a Pull Request

### Commit Message Convention

We use [Conventional Commits](https://conventionalcommits.org/):

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file
for details.

## 🙏 Acknowledgments

- Inspired by
  [npm-check-updates](https://github.com/raineorshine/npm-check-updates)
- Built with love for the pnpm community
- Thanks to all contributors and users

## 📞 Support

- 📖 [Documentation](https://github.com/houko/pnpm-catalog-updates#readme)
- 🐛 [Issue Tracker](https://github.com/houko/pnpm-catalog-updates/issues)
- 💬 [Discussions](https://github.com/houko/pnpm-catalog-updates/discussions)

---

Made with ❤️ for the pnpm community
