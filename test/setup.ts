import fs from 'fs-extra';
import os from 'os';
import path from 'path';
import { afterAll, afterEach, beforeAll, beforeEach, vi } from 'vitest';

// Global test setup
let tempDir: string;

// Global test utilities
declare global {
  var testTempDir: string;
  var createTempWorkspace: (files: Record<string, string>) => Promise<string>;
  var cleanupTempWorkspace: (workspacePath: string) => Promise<void>;
}

beforeAll(async () => {
  // Create temporary directory for tests
  tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'pcu-test-'));

  // Make temp directory available globally
  global.testTempDir = tempDir;

  // Helper to create temporary workspace for testing
  global.createTempWorkspace = async (files: Record<string, string>): Promise<string> => {
    const workspaceDir = await fs.mkdtemp(path.join(tempDir, 'workspace-'));

    for (const [filePath, content] of Object.entries(files)) {
      const fullPath = path.join(workspaceDir, filePath);
      await fs.ensureDir(path.dirname(fullPath));
      await fs.writeFile(fullPath, content, 'utf-8');
    }

    return workspaceDir;
  };

  // Helper to cleanup temporary workspace
  global.cleanupTempWorkspace = async (workspacePath: string): Promise<void> => {
    if (workspacePath.startsWith(tempDir)) {
      await fs.remove(workspacePath);
    }
  };

  // Set environment variables for testing
  process.env.NODE_ENV = 'test';
  process.env.PCU_TEST_MODE = 'true';
  process.env.PCU_CACHE_DISABLED = 'true';

  // Mock console methods to reduce noise in tests
  const originalConsoleLog = console.log;
  const originalConsoleWarn = console.warn;
  const originalConsoleError = console.error;

  console.log = (...args) => {
    if (process.env.PCU_VERBOSE_TESTS === 'true') {
      originalConsoleLog(...args);
    }
  };

  console.warn = (...args) => {
    if (process.env.PCU_VERBOSE_TESTS === 'true') {
      originalConsoleWarn(...args);
    }
  };

  console.error = (...args) => {
    if (process.env.PCU_VERBOSE_TESTS === 'true') {
      originalConsoleError(...args);
    }
  };
});

afterAll(async () => {
  // Cleanup temporary directory
  if (tempDir) {
    await fs.remove(tempDir);
  }
});

beforeEach(() => {
  // Reset modules before each test
  vi.clearAllMocks();
});

afterEach(() => {
  // Cleanup after each test
  vi.restoreAllMocks();
});
