# pcu

[![npm version](https://img.shields.io/npm/v/pcu.svg)](https://www.npmjs.com/package/pcu)
[![npm downloads](https://img.shields.io/npm/dm/pcu.svg)](https://www.npmjs.com/package/pcu)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D22.0.0-brightgreen.svg)](https://nodejs.org/)

A powerful CLI tool for managing pnpm workspace catalog dependencies with ease.

## Quick Start

### Installation

```bash
# Install globally
npm install -g pcu

# Or use with pnpm
pnpm add -g pcu

# Or use legacy package name
npm install -g pnpm-catalog-updates
```

### Usage

```bash
# Check for outdated catalog dependencies
pcu check
# or
pcu -c

# Update catalog dependencies interactively
pcu update --interactive
# or
pcu -i

# Update to latest versions
pcu update
# or
pcu -u

# Analyze impact of updates
pcu analyze
# or
pcu -a

# Show workspace information
pcu workspace
# or
pcu -s
```

![PCU Showcase](https://github.com/user-attachments/assets/f05a970e-c58c-44f1-b3f1-351ae30b4a35)

## Commands

| Command         | Shorthand | Description                                     |
| --------------- | --------- | ----------------------------------------------- |
| `pcu check`     | `pcu -c`  | Check for outdated catalog dependencies         |
| `pcu update`    | `pcu -u`  | Update catalog dependencies                     |
| `pcu analyze`   | `pcu -a`  | Analyze impact of dependency updates            |
| `pcu workspace` | `pcu -s`  | Show workspace information and validation       |
| `pcu init`      |           | Initialize workspace with catalog configuration |
| `pcu help`      | `pcu -h`  | Display help information                        |

## Common Examples

```bash
# Interactive update with backup
pcu update --interactive --backup

# Update only minor versions
pcu update --target minor

# Check specific catalog
pcu check --catalog node18

# Analyze before updating
pcu analyze default react

# Validate workspace
pcu workspace --validate

# Dry run update
pcu update --dry-run
```

## Options

### Global Options

- `--help, -h`: Show help
- `--version, -v`: Show version
- `--verbose`: Enable verbose logging
- `--quiet`: Suppress non-error output

### Update Options

- `--interactive, -i`: Interactive mode
- `--dry-run, -d`: Show what would be updated without making changes
- `--backup, -b`: Create backup before updating
- `--target <level>`: Update target (patch|minor|major|latest)
- `--catalog <name>`: Target specific catalog

## Configuration

Create a `.pcurc.json` file in your project root:

```json
{
  "catalogs": ["default", "node18", "dev"],
  "updateTarget": "minor",
  "backup": true,
  "interactive": false
}
```

## Requirements

- Node.js >= 22.0.0
- pnpm workspace with catalog configuration
- pnpm-workspace.yaml with catalog entries

## Documentation

For complete documentation, visit:
[pnpm-catalog-updates](https://github.com/houko/pnpm-catalog-updates#readme)

## Contributing

Found a bug or want to contribute? Visit our
[GitHub repository](https://github.com/houko/pnpm-catalog-updates).

## License

MIT © [Evan Hu](https://github.com/houko)
