import { describe, it, expect, beforeEach } from 'vitest';

// Example E2E test file - delete this when adding real tests
describe('CLI E2E Tests', () => {
  let workspacePath: string;

  beforeEach(async () => {
    // Create a test workspace with catalog configuration
    workspacePath = await global.createE2EWorkspace({
      'package.json': JSON.stringify(
        {
          name: 'test-workspace',
          version: '1.0.0',
          dependencies: {
            react: 'catalog:',
            lodash: 'catalog:',
          },
        },
        null,
        2
      ),
      'pnpm-workspace.yaml': `
packages:
  - "."

catalog:
  react: ^17.0.0
  lodash: ^4.17.20
`,
    });
  });

  it('should show version', async () => {
    const result = await global.runCLI(['--version']);

    expect(result.exitCode).toBe(0);
    expect(result.stdout).toMatch(/\d+\.\d+\.\d+/);
  });

  it('should show help', async () => {
    const result = await global.runCLI(['--help']);

    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain('Usage:');
    expect(result.stdout).toContain('Options:');
  });

  it('should check for outdated dependencies', async () => {
    const result = await global.runCLI(['check'], workspacePath);

    // Should succeed even if no updates are available
    expect(result.exitCode).toBe(0);
  });

  it('should handle dry-run mode', async () => {
    const result = await global.runCLI(['update', '--dry-run'], workspacePath);

    // Dry run should not modify files
    expect(result.exitCode).toBe(0);
  });

  it('should handle non-existent workspace', async () => {
    const nonExistentPath = '/non/existent/path';
    const result = await global.runCLI(['check'], nonExistentPath);

    expect(result.exitCode).toBe(1);
    expect(result.stderr).toContain(`Error: Workspace not found at ${nonExistentPath}`);
  });
});
