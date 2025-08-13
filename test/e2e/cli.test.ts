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

  it('should show user-friendly error for non-existent packages', async () => {
    // Create workspace with non-existent packages
    const testWorkspacePath = await global.createE2EWorkspace({
      'package.json': JSON.stringify(
        {
          name: 'error-test-workspace',
          version: '1.0.0',
          dependencies: {
            sveltekit: 'catalog:',
            'prime-ng': 'catalog:',
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
  sveltekit: 1.0.0
  prime-ng: 15.0.0
`,
    });

    const result = await global.runCLI(['check'], testWorkspacePath);

    // Should complete successfully even with missing packages
    expect(result.exitCode).toBe(0);

    // Should show user-friendly messages instead of technical errors
    expect(result.stdout).toContain('⚠️'); // Warning emoji
    expect(result.stdout).toContain('💡'); // Suggestion emoji

    // Should suggest correct package names
    expect(result.stdout).toContain('@sveltejs/kit');
    expect(result.stdout).toContain('primeng');

    // Should not show technical stack traces or 404 error details
    expect(result.stdout).not.toContain('Error:');
    expect(result.stdout).not.toContain('404');
    expect(result.stdout).not.toContain('Not found');
    expect(result.stderr).not.toContain('Error:');
  });
});
