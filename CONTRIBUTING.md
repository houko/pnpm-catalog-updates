# Contributing to pnpm-catalog-updates

Thank you for your interest in contributing to pnpm-catalog-updates! This document provides guidelines and information about contributing to this project.

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.15.0
- Git

### Setup Development Environment

1. **Fork and Clone**
   ```bash
   git clone https://github.com/houko/pnpm-catalog-updates.git
   cd pnpm-catalog-updates
   ```

2. **Install Dependencies**
   ```bash
   pnpm install
   ```

3. **Build the Project**
   ```bash
   pnpm build
   ```

4. **Run Tests**
   ```bash
   pnpm test
   ```

5. **Start Development**
   ```bash
   pnpm dev --help
   ```

## 📋 Development Workflow

### Branch Naming

Use descriptive branch names with prefixes:
- `feat/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation changes
- `refactor/description` - Code refactoring
- `test/description` - Test improvements
- `chore/description` - Maintenance tasks

### Commit Messages

We follow [Conventional Commits](https://conventionalcommits.org/) specification:

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat`: New features
- `fix`: Bug fixes
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `perf`: Performance improvements
- `ci`: CI/CD changes
- `build`: Build system changes

**Examples:**
```bash
feat(cli): add interactive update mode
fix(parser): handle malformed yaml files
docs: update installation instructions
test(workspace): add catalog parsing tests
```

### Code Quality Standards

1. **TypeScript**: All code must be written in TypeScript with proper type definitions
2. **ESLint**: Code must pass ESLint checks (`pnpm lint`)
3. **Prettier**: Code must be formatted with Prettier (`pnpm format`)
4. **Tests**: New features must include tests
5. **Coverage**: Maintain test coverage above 80%

### Running Quality Checks

```bash
# Type checking
pnpm typecheck

# Linting
pnpm lint
pnpm lint:fix

# Formatting
pnpm format
pnpm format:check

# All quality checks
pnpm lint && pnpm typecheck && pnpm format:check
```

## 🧪 Testing

### Test Types

1. **Unit Tests** (`test/unit/`)
   - Test individual functions and classes
   - Mock external dependencies
   - Fast execution

2. **Integration Tests** (`test/integration/`)
   - Test component interactions
   - Use real file system (in temp directories)
   - Mock external APIs

3. **E2E Tests** (`test/e2e/`)
   - Test complete CLI workflows
   - Use built binary
   - Test real scenarios

### Writing Tests

```typescript
// Unit test example
import { describe, it, expect } from 'vitest';
import { VersionParser } from '@/domain/value-objects/VersionParser';

describe('VersionParser', () => {
  it('should parse semantic version', () => {
    const parser = new VersionParser();
    const version = parser.parse('1.2.3');

    expect(version.major).toBe(1);
    expect(version.minor).toBe(2);
    expect(version.patch).toBe(3);
  });
});
```

```typescript
// E2E test example
import { describe, it, expect } from 'vitest';

describe('CLI E2E', () => {
  it('should check for updates', async () => {
    const workspace = await global.createE2EWorkspace({
      'pnpm-workspace.yaml': 'catalog:\n  react: ^17.0.0',
    });

    const result = await global.runCLI(['check'], workspace);

    expect(result.exitCode).toBe(0);
    await global.cleanupE2EWorkspace(workspace);
  });
});
```

### Test Commands

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage

# Run E2E tests only
pnpm test:e2e

# Run specific test file
pnpm test src/domain/entities/Workspace.test.ts
```

## 🏗️ Architecture Guidelines

### Domain-Driven Design (DDD)

This project follows DDD principles:

1. **Domain Layer** (`src/domain/`)
   - Contains business logic
   - No dependencies on external frameworks
   - Pure TypeScript with minimal dependencies

2. **Application Layer** (`src/application/`)
   - Orchestrates domain objects
   - Handles use cases
   - Coordinates with infrastructure

3. **Infrastructure Layer** (`src/infrastructure/`)
   - Implements repository interfaces
   - Handles external services
   - File system operations

4. **CLI Layer** (`src/cli/`)
   - User interface
   - Command parsing
   - Output formatting

### Adding New Features

1. **Start with Domain Model**
   ```typescript
   // src/domain/entities/NewEntity.ts
   export class NewEntity {
     constructor(private id: EntityId) {}

     // Business methods
   }
   ```

2. **Add Repository Interface**
   ```typescript
   // src/domain/repositories/NewEntityRepository.ts
   export interface NewEntityRepository {
     save(entity: NewEntity): Promise<void>;
     findById(id: EntityId): Promise<NewEntity | null>;
   }
   ```

3. **Implement Repository**
   ```typescript
   // src/infrastructure/repositories/FileNewEntityRepository.ts
   export class FileNewEntityRepository implements NewEntityRepository {
     // Implementation
   }
   ```

4. **Add Application Service**
   ```typescript
   // src/application/services/NewEntityService.ts
   export class NewEntityService {
     constructor(private repository: NewEntityRepository) {}

     // Use cases
   }
   ```

5. **Add CLI Command**
   ```typescript
   // src/cli/commands/NewCommand.ts
   export class NewCommand {
     // CLI handling
   }
   ```

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Environment Information**
   - Node.js version
   - pnpm version
   - Operating system
   - Project setup

2. **Steps to Reproduce**
   - Exact commands run
   - Expected behavior
   - Actual behavior

3. **Additional Context**
   - Error messages
   - Log output
   - Configuration files

**Use the bug report template:**

```markdown
### Bug Description
A clear description of the bug.

### Steps to Reproduce
1. Step 1
2. Step 2
3. Step 3

### Expected Behavior
What should happen.

### Actual Behavior
What actually happens.

### Environment
- Node.js version:
- pnpm version:
- OS:
- Project type:

### Additional Context
Any additional information.
```

## 💡 Feature Requests

For feature requests, please:

1. **Check Existing Issues** - Search for existing feature requests
2. **Provide Use Case** - Explain why this feature is needed
3. **Suggest Implementation** - If you have ideas on how to implement it
4. **Consider Scope** - Keep features focused and well-defined

## 📚 Documentation

### Types of Documentation

1. **Code Documentation**
   - TSDoc comments for public APIs
   - README files for complex modules
   - Inline comments for complex logic

2. **User Documentation**
   - README.md updates
   - CLI help text
   - Configuration examples

3. **Developer Documentation**
   - Architecture decisions
   - API documentation
   - Contributing guidelines

### Documentation Standards

```typescript
/**
 * Parses a version string into semantic version components.
 *
 * @param versionString - The version string to parse (e.g., "1.2.3")
 * @returns Parsed version object with major, minor, patch properties
 * @throws {InvalidVersionError} When the version string is malformed
 *
 * @example
 * ```typescript
 * const parser = new VersionParser();
 * const version = parser.parse("1.2.3");
 * console.log(version.major); // 1
 * ```
 */
public parse(versionString: string): SemanticVersion {
  // Implementation
}
```

## 🔧 Tools and Extensions

### Recommended VS Code Extensions

The project includes recommended extensions in `.vscode/extensions.json`:
- TypeScript and JavaScript support
- ESLint and Prettier
- Testing extensions
- Git integration
- Utilities for productivity

### Development Tools

- **TypeScript**: Static type checking
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Vitest**: Testing framework
- **Husky**: Git hooks
- **lint-staged**: Pre-commit linting

## 🚀 Release Process

### Version Management

We use [Changesets](https://github.com/changesets/changesets) for version management:

1. **Add Changeset**
   ```bash
   pnpm changeset
   ```

2. **Version Packages**
   ```bash
   pnpm changeset version
   ```

3. **Publish**
   ```bash
   pnpm changeset publish
   ```

### Release Types

- **Major** (1.0.0 → 2.0.0): Breaking changes
- **Minor** (1.0.0 → 1.1.0): New features (backward compatible)
- **Patch** (1.0.0 → 1.0.1): Bug fixes (backward compatible)

## 🤝 Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive experience for everyone.

### Our Standards

- **Be Respectful**: Treat everyone with respect and kindness
- **Be Collaborative**: Work together constructively
- **Be Patient**: Help others learn and grow
- **Be Inclusive**: Welcome diverse perspectives

### Unacceptable Behavior

- Harassment or discrimination
- Trolling or insulting comments
- Personal attacks
- Publishing others' private information

### Enforcement

Report unacceptable behavior to the project maintainers. All reports will be reviewed and investigated promptly.

## 📞 Getting Help

- **Documentation**: Check the README and docs
- **Issues**: Search existing issues or create a new one
- **Discussions**: Use GitHub Discussions for questions
- **Discord**: Join our community Discord (link in README)

## 🎉 Recognition

Contributors will be recognized in:
- README contributors section
- Release notes
- Hall of fame (for significant contributions)

Thank you for contributing to pnpm-catalog-updates! 🙏
