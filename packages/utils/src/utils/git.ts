/**
 * Git Utilities
 */

import { spawnSync } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';

/**
 * Check if directory is a git repository
 */
export function isGitRepository(path: string = process.cwd()): boolean {
  try {
    return existsSync(join(path, '.git'));
  } catch {
    return false;
  }
}

/**
 * Get current git branch
 */
export function getCurrentBranch(cwd: string = process.cwd()): string | null {
  try {
    const result = spawnSync('git', ['branch', '--show-current'], {
      cwd,
      encoding: 'utf8',
      stdio: 'pipe',
    });
    if (result.error || result.status !== 0) {
      return null;
    }
    const branch = result.stdout.trim();
    return branch || null;
  } catch {
    return null;
  }
}

/**
 * Check if working directory is clean
 */
export function isWorkingDirectoryClean(cwd: string = process.cwd()): boolean {
  try {
    const result = spawnSync('git', ['status', '--porcelain'], {
      cwd,
      encoding: 'utf8',
      stdio: 'pipe',
    });
    if (result.error || result.status !== 0) {
      return false;
    }
    const status = result.stdout.trim();
    return status === '';
  } catch {
    return false;
  }
}

/**
 * Get last commit hash
 */
export function getLastCommitHash(cwd: string = process.cwd()): string | null {
  try {
    const result = spawnSync('git', ['rev-parse', 'HEAD'], {
      cwd,
      encoding: 'utf8',
      stdio: 'pipe',
    });
    if (result.error || result.status !== 0) {
      return null;
    }
    const hash = result.stdout.trim();
    return hash || null;
  } catch {
    return null;
  }
}

/**
 * Get git repository URL
 */
export function getRepositoryUrl(cwd: string = process.cwd()): string | null {
  try {
    const result = spawnSync('git', ['config', '--get', 'remote.origin.url'], {
      cwd,
      encoding: 'utf8',
      stdio: 'pipe',
    });
    if (result.error || result.status !== 0) {
      return null;
    }
    const url = result.stdout.trim();
    return url || null;
  } catch {
    return null;
  }
}

/**
 * Create git tag
 */
export function createTag(tag: string, message?: string, cwd: string = process.cwd()): boolean {
  try {
    const args = message ? ['tag', '-a', tag, '-m', message] : ['tag', tag];

    const result = spawnSync('git', args, { cwd, stdio: 'pipe' });
    return result.status === 0;
  } catch {
    return false;
  }
}

/**
 * Check if there are uncommitted changes
 */
export function hasUncommittedChanges(cwd: string = process.cwd()): boolean {
  return !isWorkingDirectoryClean(cwd);
}

/**
 * Get list of modified files
 */
export function getModifiedFiles(cwd: string = process.cwd()): string[] {
  try {
    const result = spawnSync('git', ['status', '--porcelain'], {
      cwd,
      encoding: 'utf8',
      stdio: 'pipe',
    });

    if (result.error || result.status !== 0) {
      return [];
    }

    const output = result.stdout.trim();
    if (!output) return [];

    return output
      .split('\n')
      .map((line) => line.substring(3)) // Remove status indicators
      .filter(Boolean);
  } catch {
    return [];
  }
}

/**
 * Stage files for commit
 */
export function stageFiles(files: string[], cwd: string = process.cwd()): boolean {
  try {
    const result = spawnSync('git', ['add', ...files], {
      cwd,
      stdio: 'pipe',
    });
    return result.status === 0;
  } catch {
    return false;
  }
}

/**
 * Commit changes
 */
export function commit(message: string, cwd: string = process.cwd()): boolean {
  try {
    const result = spawnSync('git', ['commit', '-m', message], {
      cwd,
      stdio: 'pipe',
    });
    return result.status === 0;
  } catch {
    return false;
  }
}
