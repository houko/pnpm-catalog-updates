/**
 * Git Utilities
 */

import { execSync, spawnSync } from 'child_process';
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
    const branch = execSync('git branch --show-current', {
      cwd,
      encoding: 'utf8',
      stdio: 'pipe',
    }).trim();
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
    const status = execSync('git status --porcelain', {
      cwd,
      encoding: 'utf8',
      stdio: 'pipe',
    }).trim();
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
    const hash = execSync('git rev-parse HEAD', {
      cwd,
      encoding: 'utf8',
      stdio: 'pipe',
    }).trim();
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
    const url = execSync('git config --get remote.origin.url', {
      cwd,
      encoding: 'utf8',
      stdio: 'pipe',
    }).trim();
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
    const cmd = message ? `git tag -a "${tag}" -m "${message}"` : `git tag "${tag}"`;

    execSync(cmd, { cwd, stdio: 'pipe' });
    return true;
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
    const output = execSync('git status --porcelain', {
      cwd,
      encoding: 'utf8',
      stdio: 'pipe',
    }).trim();

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
