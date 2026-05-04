# pnpm-catalog-updates

A powerful CLI tool to check and update pnpm workspace catalog dependencies, inspired by [npm-check-updates](https://github.com/raineorshine/npm-check-updates).

[![npm version](https://img.shields.io/npm/v/pcu.svg)](https://www.npmjs.com/package/pcu)
[![npm weekly downloads](https://img.shields.io/npm/dw/pcu.svg)](https://www.npmjs.com/package/pcu)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D22.13.0-brightgreen.svg)](https://nodejs.org/)
[![CI](https://img.shields.io/github/actions/workflow/status/yldm-tech/pnpm-catalog-updates/ci.yml?label=CI&logo=github)](https://github.com/yldm-tech/pnpm-catalog-updates/actions)

## Documentation

**[https://pcu-cli.dev](https://pcu-cli.dev/en)** - Full documentation with examples, configuration guides, and API reference.

## Quick Start

```bash
# Install globally
npm install -g pcu

# Initialize workspace
pcu init

# Check for updates
pcu -c

# Interactive update mode
pcu -i
```

![Screenshot](https://github.com/user-attachments/assets/f05a970e-c58c-44f1-b3f1-351ae30b4a35)

## Features

- **Catalog Focused** - Specialized for pnpm workspace catalog dependency management
- **Hybrid Mode** - Commands auto-enter interactive prompts when no flags provided
- **Interactive Mode** - Choose which dependencies to update with intuitive interface
- **AI-Powered Analysis** - Intelligent recommendations using Claude, Gemini, or Codex CLI
- **Security Scanning** - Built-in vulnerability detection with auto-fix capability
- **High Performance** - Parallel API queries and intelligent caching
- **Beautiful UI** - Multiple themes and progress bar styles
- **i18n Support** - English, Chinese, Japanese, Korean, Spanish, German, French

**[See all features](https://pcu-cli.dev/en)**

## Commands

| Command | Description |
|---------|-------------|
| `pcu init` | Initialize PNPM workspace and PCU configuration |
| `pcu check` (`pcu -c`) | Check for outdated catalog dependencies |
| `pcu update` (`pcu -u`) | Update catalog dependencies |
| `pcu -i` | Interactive update mode |
| `pcu security` | Security vulnerability scanning |
| `pcu ai` | AI provider management |
| `pcu cache` | Cache management |
| `pcu workspace` | Workspace information |
| `pcu theme` | Theme configuration |

**[Complete Command Reference](https://pcu-cli.dev/en/command-reference)**

## Documentation Links

- [Quick Start Guide](https://pcu-cli.dev/en/quickstart)
- [Command Reference](https://pcu-cli.dev/en/command-reference)
- [Configuration Guide](https://pcu-cli.dev/en/configuration)
- [Examples & Use Cases](https://pcu-cli.dev/en/examples)
- [Development Guide](https://pcu-cli.dev/en/development)

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

MIT License - see [LICENSE](LICENSE) for details.

## Support

- [Documentation](https://pcu-cli.dev/en)
- [Issue Tracker](https://github.com/yldm-tech/pnpm-catalog-updates/issues)
- [Discussions](https://github.com/yldm-tech/pnpm-catalog-updates/discussions)

---

Made with love for the pnpm community
# CI re-run 2026-05-04T15:35:41Z
