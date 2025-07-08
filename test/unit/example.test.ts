import { describe, it, expect, beforeEach, afterEach } from 'vitest';

// Example unit test file - delete this when adding real tests
describe('Example Unit Test', () => {
  beforeEach(() => {
    // Setup before each test
  });

  afterEach(() => {
    // Cleanup after each test
  });

  it('should be a placeholder test', () => {
    expect(true).toBe(true);
  });

  it('should have access to test utilities', () => {
    expect(global.testTempDir).toBeDefined();
    expect(global.createTempWorkspace).toBeDefined();
    expect(global.cleanupTempWorkspace).toBeDefined();
  });

  describe('Workspace creation helper', () => {
    it('should create temporary workspace with files', async () => {
      const workspacePath = await global.createTempWorkspace({
        'package.json': JSON.stringify({ name: 'test-workspace' }, null, 2),
        'pnpm-workspace.yaml': 'packages:\n  - "packages/*"\n',
      });

      expect(workspacePath).toBeDefined();
      expect(workspacePath).toContain(global.testTempDir);

      // Cleanup
      await global.cleanupTempWorkspace(workspacePath);
    });
  });
});