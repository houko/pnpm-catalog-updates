# pcu

[![npm version](https://img.shields.io/npm/v/pcu.svg)](https://www.npmjs.com/package/pcu)
[![npm downloads](https://img.shields.io/npm/dm/pcu.svg)](https://www.npmjs.com/package/pcu)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D22.0.0-brightgreen.svg)](https://nodejs.org/)

A powerful CLI tool for managing pnpm workspace catalog dependencies with ease.

**Complete Documentation**: [https://pcu-cli.dev](https://pcu-cli.dev/en)

## Quick Start

### Installation

```bash
# Install globally
npm install -g pcu

# Or use with pnpm
pnpm add -g pcu

# Or use legacy package name
npm install -g pcu
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

**[Complete Command Reference & Examples](https://pcu-cli.dev/en/command-reference)**

## Links

- [Complete Documentation](https://pcu-cli.dev/en)
- [Report Issues](https://github.com/houko/pnpm-catalog-updates/issues)
- [GitHub Repository](https://github.com/houko/pnpm-catalog-updates)

## License

MIT © [Evan Hu](https://github.com/houko)
