# pnpm-catalog-updater

A powerful CLI tool to check and update pnpm workspace catalog dependencies, inspired by [npm-check-updates](https://github.com/raineorshine/npm-check-updates).

[![CI](https://github.com/houko/pnpm-catalog-updater/workflows/CI/badge.svg)](https://github.com/houko/pnpm-catalog-updater/actions)
[![npm version](https://badge.fury.io/js/pnpm-catalog-updater.svg)](https://badge.fury.io/js/pnpm-catalog-updater)
[![Coverage Status](https://coveralls.io/repos/github/houko/pnpm-catalog-updater/badge.svg?branch=main)](https://coveralls.io/github/houko/pnpm-catalog-updater?branch=main)

## ✨ Features

- 🔍 **Smart Detection**: Automatically discovers pnpm workspaces and catalog configurations
- 🎯 **Catalog Focused**: Specialized for pnpm catalog dependency management
- 🚀 **Interactive Mode**: Choose which dependencies to update with an intuitive interface
- 📊 **Impact Analysis**: Understand which packages will be affected by catalog changes
- 🔒 **Safe Updates**: Dry-run mode and backup options for safe dependency updates
- ⚡ **High Performance**: Parallel API queries and intelligent caching
- 🛡️ **Security Aware**: Built-in security vulnerability scanning
- 🔧 **Configurable**: Flexible configuration options and update strategies

## 🚀 Quick Start

### Installation

```bash
# Global installation
npm install -g pnpm-catalog-updater

# Or use with npx
npx pnpm-catalog-updater

# Or use the short alias
pcu
```

### Basic Usage

```bash
# Check for outdated catalog dependencies
pcu check

# Update catalog dependencies interactively
pcu update --interactive

# Update to latest versions (dry run)
pcu update --dry-run

# Update specific catalog
pcu update --catalog react17

# Update with specific target
pcu update --target minor
```

## 📖 Usage

### Commands

#### `pcu check`

Check for outdated dependencies in your pnpm workspace catalogs.

```bash
pcu check [options]

Options:
  --workspace <path>    Workspace directory (default: current directory)
  --catalog <name>      Check specific catalog only
  --format <type>       Output format: table, json, yaml (default: table)
  --verbose             Show detailed information
```

#### `pcu update`

Update catalog dependencies to newer versions.

```bash
pcu update [options]

Options:
  --interactive, -i     Interactive mode to choose updates
  --dry-run, -d         Preview changes without writing files
  --target <type>       Update target: latest, greatest, minor, patch (default: latest)
  --catalog <name>      Update specific catalog only
  --include <pattern>   Include packages matching pattern
  --exclude <pattern>   Exclude packages matching pattern
  --force              Force updates even if risky
```

#### `pcu analyze`

Analyze the impact of updating a specific dependency.

```bash
pcu analyze <catalog> <package>

Example:
  pcu analyze default react
  pcu analyze react17 @types/react
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
git clone https://github.com/houko/pnpm-catalog-updater.git
cd pnpm-catalog-updater

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
  - "packages/*"

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

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

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

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by [npm-check-updates](https://github.com/raineorshine/npm-check-updates)
- Built with love for the pnpm community
- Thanks to all contributors and users

## 📞 Support

- 📖 [Documentation](https://github.com/houko/pnpm-catalog-updater#readme)
- 🐛 [Issue Tracker](https://github.com/houko/pnpm-catalog-updater/issues)
- 💬 [Discussions](https://github.com/houko/pnpm-catalog-updater/discussions)

---

Made with ❤️ for the pnpm community
