/**
 * Version Checker Utility
 *
 * Checks for newer versions of the PCU tool and provides update prompts.
 */

import chalk from 'chalk';
import { exec } from 'child_process';
import { promisify } from 'util';
import { InteractivePrompts } from '../../cli/interactive/InteractivePrompts.js';

const execAsync = promisify(exec);

export interface VersionCheckResult {
  isLatest: boolean;
  currentVersion: string;
  latestVersion: string;
  shouldPrompt: boolean;
}

export interface VersionCheckOptions {
  skipPrompt?: boolean;
  timeout?: number;
  packageName?: string;
}

export class VersionChecker {
  private static readonly DEFAULT_TIMEOUT = 5000; // 5 seconds
  private static readonly DEFAULT_PACKAGE = 'pnpm-catalog-updates';

  /**
   * Check if current version is the latest
   */
  static async checkVersion(
    currentVersion: string,
    options: VersionCheckOptions = {}
  ): Promise<VersionCheckResult> {
    const {
      skipPrompt = false,
      timeout = this.DEFAULT_TIMEOUT,
      packageName = this.DEFAULT_PACKAGE,
    } = options;

    try {
      // Get latest version from npm with timeout
      const latestVersion = await this.getLatestVersion(packageName, timeout);

      const isLatest = this.compareVersions(currentVersion, latestVersion) >= 0;

      return {
        isLatest,
        currentVersion,
        latestVersion,
        shouldPrompt: !isLatest && !skipPrompt,
      };
    } catch (error) {
      console.warn(chalk.yellow('⚠️  Failed to check for updates:'), error);
      return {
        isLatest: true, // Assume latest if check fails
        currentVersion,
        latestVersion: currentVersion,
        shouldPrompt: false,
      };
    }
  }

  /**
   * Prompt user for update and execute if confirmed
   */
  static async promptAndUpdate(versionResult: VersionCheckResult): Promise<boolean> {
    if (!versionResult.shouldPrompt) {
      return false;
    }

    console.log();
    console.log(chalk.cyan('📦 Update Available!'));
    console.log(
      chalk.gray(
        `Current version: ${versionResult.currentVersion} → Latest: ${versionResult.latestVersion}`
      )
    );
    console.log();

    const interactive = new InteractivePrompts();
    const shouldUpdate = await interactive.confirmUpdate(
      'Would you like to update to the latest version?'
    );

    if (shouldUpdate) {
      console.log(chalk.blue('🔄 Updating pnpm-catalog-updates...'));
      try {
        await this.performUpdate();
        console.log(chalk.green('✅ Successfully updated! Please restart the command.'));
        return true;
      } catch (error) {
        console.error(chalk.red('❌ Update failed:'), error);
        console.log(
          chalk.gray('You can manually update with: npm install -g pnpm-catalog-updates@latest')
        );
        return false;
      }
    }

    return false;
  }

  /**
   * Get latest version from npm registry
   */
  private static async getLatestVersion(packageName: string, timeout: number): Promise<string> {
    const command = `npm view ${packageName} version`;

    try {
      const { stdout } = await this.executeWithTimeout(command, timeout);
      return stdout.trim();
    } catch (error) {
      // Fallback: try with different npm commands
      try {
        const { stdout } = await this.executeWithTimeout(
          `npm info ${packageName} version`,
          timeout
        );
        return stdout.trim();
      } catch (fallbackError) {
        throw new Error(`Failed to get latest version: ${error}`);
      }
    }
  }

  /**
   * Execute update command
   */
  private static async performUpdate(): Promise<void> {
    // Try global update first, then fallback to different methods
    const commands = [
      'npm install -g pnpm-catalog-updates@latest',
      'npm update -g pnpm-catalog-updates',
      'pnpm add -g pnpm-catalog-updates@latest',
      'yarn global add pnpm-catalog-updates@latest',
    ];

    for (const command of commands) {
      try {
        console.log(chalk.gray(`Executing: ${command}`));
        await execAsync(command, { timeout: 30000 });
        return; // Success
      } catch (error) {
        console.warn(chalk.yellow(`Command failed: ${command}`));
        // Continue to next command
      }
    }

    throw new Error('All update commands failed');
  }

  /**
   * Execute command with timeout
   */
  private static async executeWithTimeout(
    command: string,
    timeout: number
  ): Promise<{ stdout: string; stderr: string }> {
    return new Promise((resolve, reject) => {
      const child = exec(command, { timeout }, (error, stdout, stderr) => {
        if (error) {
          reject(error);
        } else {
          resolve({ stdout, stderr });
        }
      });

      // Additional timeout handling
      const timer = setTimeout(() => {
        child.kill();
        reject(new Error(`Command timed out after ${timeout}ms`));
      }, timeout);

      child.on('exit', () => {
        clearTimeout(timer);
      });
    });
  }

  /**
   * Compare two version strings
   * Returns: -1 if a < b, 0 if a === b, 1 if a > b
   */
  private static compareVersions(a: string, b: string): number {
    const cleanA = a.replace(/^v/, '').replace(/[^0-9.]/g, '');
    const cleanB = b.replace(/^v/, '').replace(/[^0-9.]/g, '');

    const partsA = cleanA.split('.').map(Number);
    const partsB = cleanB.split('.').map(Number);

    const maxLength = Math.max(partsA.length, partsB.length);

    for (let i = 0; i < maxLength; i++) {
      const partA = partsA[i] || 0;
      const partB = partsB[i] || 0;

      if (partA < partB) return -1;
      if (partA > partB) return 1;
    }

    return 0;
  }

  /**
   * Check if running in CI environment where prompts should be skipped
   */
  static isCI(): boolean {
    return !!(
      process.env.CI ||
      process.env.CONTINUOUS_INTEGRATION ||
      process.env.BUILD_NUMBER ||
      process.env.RUN_ID ||
      process.env.GITHUB_ACTIONS
    );
  }

  /**
   * Get update frequency preference from environment
   */
  static shouldCheckForUpdates(): boolean {
    const skipCheck = process.env.PCU_SKIP_VERSION_CHECK;
    if (skipCheck === 'true' || skipCheck === '1') {
      return false;
    }

    // Skip in CI environments by default
    if (this.isCI()) {
      return false;
    }

    return true;
  }
}
