import { exec, spawn } from 'child_process';
import fs from 'fs-extra';
import os from 'os';
import path from 'path';
import { promisify } from 'util';
import { afterAll, afterEach, beforeAll, beforeEach, vi } from 'vitest';

const execAsync = promisify(exec);

// Global E2E test setup
let tempDir: string;
let binaryPath: string;

// Global E2E test utilities
declare global {
  var e2eTempDir: string;
  var binaryPath: string;
  var runCLI: (
    args: string[],
    cwd?: string
  ) => Promise<{ stdout: string; stderr: string; exitCode: number }>;
  var createE2EWorkspace: (files: Record<string, string>) => Promise<string>;
  var cleanupE2EWorkspace: (workspacePath: string) => Promise<void>;
}

beforeAll(async () => {
  // Create temporary directory for E2E tests
  tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'pcu-e2e-'));

  // Build the project first
  console.log('Building project for E2E tests...');
  try {
    await execAsync('pnpm build', { cwd: process.cwd() });
    console.log('✅ Project built successfully');
  } catch (error) {
    console.error('❌ Failed to build project:', error);
    throw error;
  }

  // Set binary path
  binaryPath = path.join(process.cwd(), 'bin', 'pcu.js');

  // Ensure binary exists
  if (!(await fs.pathExists(binaryPath))) {
    throw new Error(`Binary not found at ${binaryPath}`);
  }

  // Make utilities available globally
  global.e2eTempDir = tempDir;
  global.binaryPath = binaryPath;

  // Helper to run CLI command
  global.runCLI = async (
    args: string[],
    cwd: string = tempDir
  ): Promise<{ stdout: string; stderr: string; exitCode: number }> => {
    return new Promise((resolve) => {
      // Check if directory exists
      if (!fs.existsSync(cwd)) {
        return resolve({
          stdout: '',
          stderr: `Error: Workspace not found at ${cwd}`,
          exitCode: 1,
        });
      }

      const child = spawn('node', [binaryPath, ...args], {
        cwd,
        shell: false,
        stdio: ['inherit', 'pipe', 'pipe'],
      });

      let stdout = '';
      let stderr = '';

      if (child.stdout) {
        child.stdout.on('data', (data) => {
          stdout += data.toString();
        });
      }

      if (child.stderr) {
        child.stderr.on('data', (data) => {
          stderr += data.toString();
        });
      }

      child.on('error', (error) => {
        resolve({
          stdout,
          stderr: error.message,
          exitCode: 1,
        });
      });

      child.on('close', (code) => {
        resolve({
          stdout: stdout.trim(),
          stderr: stderr.trim(),
          exitCode: code || 0,
        });
      });
    });
  };

  // Helper to create E2E workspace
  global.createE2EWorkspace = async (files: Record<string, string>): Promise<string> => {
    const workspaceDir = await fs.mkdtemp(path.join(tempDir, 'e2e-workspace-'));

    for (const [filePath, content] of Object.entries(files)) {
      const fullPath = path.join(workspaceDir, filePath);
      await fs.ensureDir(path.dirname(fullPath));
      await fs.writeFile(fullPath, content, 'utf-8');
    }

    return workspaceDir;
  };

  // Helper to cleanup E2E workspace
  global.cleanupE2EWorkspace = async (workspacePath: string): Promise<void> => {
    if (workspacePath.startsWith(tempDir)) {
      await fs.remove(workspacePath);
    }
  };

  // Set environment variables for E2E testing
  process.env.NODE_ENV = 'test';
  process.env.PCU_E2E_MODE = 'true';
  process.env.PCU_CACHE_DISABLED = 'true';
  process.env.PCU_NO_UPDATE_CHECK = 'true';

  console.log(`✅ E2E test environment ready`);
  console.log(`   Temp directory: ${tempDir}`);
  console.log(`   Binary path: ${binaryPath}`);
});

afterAll(async () => {
  // Cleanup temporary directory
  if (tempDir) {
    await fs.remove(tempDir);
  }

  console.log('✅ E2E test cleanup completed');
});

beforeEach(() => {
  // Clear any cached modules
  vi.clearAllMocks();
});

afterEach(() => {
  // Reset mocks
  vi.restoreAllMocks();
});
