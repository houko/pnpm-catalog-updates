# pnpm-catalog-updates

A powerful CLI tool to check and update pnpm workspace catalog dependencies,
inspired by
[npm-check-updates](https://github.com/raineorshine/npm-check-updates).

[![CI](https://github.com/houko/pnpm-catalog-updates/workflows/CI/badge.svg)](https://github.com/houko/pnpm-catalog-updater/actions)
[![npm version](https://badge.fury.io/js/pnpm-catalog-updates.svg)](https://badge.fury.io/js/pnpm-catalog-updates)
[![Coverage Status](https://coveralls.io/repos/github/houko/pnpm-catalog-updates/badge.svg?branch=main)](https://coveralls.io/github/houko/pnpm-catalog-updates?branch=main)

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
- 🔧 **Configurable**: Flexible configuration options and update strategies

## 🚀 Quick Start

### Installation

```bash
# Global installation
npm install -g pnpm-catalog-updates

# Or use with npx
npx pnpm-catalog-updates

# Or use the short alias
pcu
```

### Basic Usage

```bash
# Quick check for updates
pcu -c

# Quick update (interactive)
pcu -u -i

# Quick update (dry run)
pcu -u -d

# Get workspace info
pcu -s
```

### Common Commands

| Command  | Description         | Example                   |
| -------- | ------------------- | ------------------------- |
| `pcu -c` | Check for updates   | `pcu -c --catalog node18` |
| `pcu -u` | Update dependencies | `pcu -u -i -b`            |
| `pcu -a` | Analyze impact      | `pcu -a default react`    |
| `pcu -s` | Workspace info      | `pcu -s --validate`       |
| `pcu -h` | Show help           | `pcu -h update`           |

## 📖 Complete Usage Guide

### All Commands & Shortcuts

| Full Command    | Shorthand             | Description                               |
| --------------- | --------------------- | ----------------------------------------- |
| `pcu check`     | `pcu -c` or `pcu chk` | Check for outdated catalog dependencies   |
| `pcu update`    | `pcu -u` or `pcu u`   | Update catalog dependencies               |
| `pcu analyze`   | `pcu -a` or `pcu a`   | Analyze impact of dependency updates      |
| `pcu workspace` | `pcu -s` or `pcu w`   | Show workspace information and validation |
| `pcu help`      | `pcu -h` or `pcu h`   | Display help information                  |

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
  -t, --target <type>   Update target: latest, greatest, minor, patch, newest (default: latest)
  --prerelease          Include prerelease versions
  --include <pattern>   Include packages matching pattern
  --exclude <pattern>   Exclude packages matching pattern
  -w, --workspace <path> Workspace directory (default: current directory)
  -v, --verbose         Show detailed information
```

#### `pcu update` / `pcu -u` / `pcu u`

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
  -w, --workspace <path> Workspace directory (default: current directory)
  -v, --verbose         Show detailed information
```

#### `pcu analyze` / `pcu -a` / `pcu a`

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

#### `pcu workspace` / `pcu -s` / `pcu w`

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

#### `pcu help` / `pcu -h` / `pcu h`

Display help information.

```bash
pcu help [command]
pcu -h [command]
pcu h [command]

Examples:
  pcu help              # Show general help
  pcu help update       # Show help for update command
  pcu -h check          # Show help for check command
```

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

# Interactive update with backup
pcu -u -i -b

# Update only minor and patch versions
pcu -u --target minor

# Check specific catalog
pcu -c --catalog node18

# Update excluding certain packages
pcu -u --exclude "eslint*"

# Dry run with verbose output
pcu -u -d -v

# Analyze impact before updating
pcu -a default react
pcu -u --catalog default --include react

# Validate workspace configuration
pcu -s --validate
```

### Configuration

Create a `.pcurc.json` file in your project root:

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
  }
}
```

## 📁 Project Structure

This project follows Domain-Driven Design (DDD) principles:

```
src/
├── cli/                    # CLI interface layer
│   ├── commands/           # Command handlers
│   ├── options/            # Option parsers
│   ├── formatters/         # Output formatters
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
