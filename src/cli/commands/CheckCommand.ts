/**
 * Check Command
 * 
 * CLI command to check for outdated catalog dependencies.
 * Provides detailed information about available updates.
 */

import chalk from 'chalk';

import { CatalogUpdateService, CheckOptions } from '../../application/services/CatalogUpdateService.js';
import { OutputFormatter, OutputFormat } from '../formatters/OutputFormatter.js';

export interface CheckCommandOptions {
  workspace?: string;
  catalog?: string;
  format?: OutputFormat;
  target?: 'latest' | 'greatest' | 'minor' | 'patch' | 'newest';
  prerelease?: boolean;
  include?: string[];
  exclude?: string[];
  verbose?: boolean;
  color?: boolean;
}

export class CheckCommand {
  constructor(
    private readonly catalogUpdateService: CatalogUpdateService,
    private readonly outputFormatter: OutputFormatter
  ) {}

  /**
   * Execute the check command
   */
  async execute(options: CheckCommandOptions = {}): Promise<void> {
    try {
      // Show loading message
      if (options.verbose) {
        console.log(chalk.blue('🔍 Checking for outdated catalog dependencies...'));
        console.log(chalk.gray(`Workspace: ${options.workspace || process.cwd()}`));
        
        if (options.catalog) {
          console.log(chalk.gray(`Catalog: ${options.catalog}`));
        }
        
        if (options.target && options.target !== 'latest') {
          console.log(chalk.gray(`Target: ${options.target}`));
        }
        
        console.log('');
      }

      // Prepare check options
      const checkOptions: CheckOptions = {
        workspacePath: options.workspace,
        catalogName: options.catalog,
        target: options.target || 'latest',
        includePrerelease: options.prerelease || false,
        include: options.include,
        exclude: options.exclude
      };

      // Execute check
      const report = await this.catalogUpdateService.checkOutdatedDependencies(checkOptions);

      // Format and display results
      const formattedOutput = this.outputFormatter.formatOutdatedReport(report);
      console.log(formattedOutput);

      // Show summary
      if (options.verbose || options.format === 'table') {
        this.showSummary(report, options);
      }

      // Exit with appropriate code
      process.exit(report.hasUpdates ? 1 : 0);

    } catch (error) {
      console.error(chalk.red('❌ Error checking dependencies:'));
      console.error(chalk.red(String(error)));
      
      if (options.verbose && error instanceof Error) {
        console.error(chalk.gray('Stack trace:'));
        console.error(chalk.gray(error.stack || 'No stack trace available'));
      }
      
      process.exit(1);
    }
  }

  /**
   * Show command summary
   */
  private showSummary(report: any, _options: CheckCommandOptions): void {
    const lines: string[] = [];

    if (!report.hasUpdates) {
      lines.push(chalk.green('🎉 All catalog dependencies are up to date!'));
    } else {
      lines.push(chalk.yellow(`\n📋 Summary:`));
      lines.push(`  • ${report.totalOutdated} outdated dependencies found`);
      lines.push(`  • ${report.catalogs.length} catalogs checked`);
      
      const totalPackages = report.catalogs.reduce((sum: number, cat: any) => sum + cat.totalPackages, 0);
      lines.push(`  • ${totalPackages} total catalog entries`);

      // Show breakdown by update type
      const updateTypes = { major: 0, minor: 0, patch: 0 };
      
      for (const catalog of report.catalogs) {
        for (const dep of catalog.outdatedDependencies) {
          updateTypes[dep.updateType as keyof typeof updateTypes]++;
        }
      }

      if (updateTypes.major > 0) {
        lines.push(chalk.red(`  • ${updateTypes.major} major updates`));
      }
      if (updateTypes.minor > 0) {
        lines.push(chalk.yellow(`  • ${updateTypes.minor} minor updates`));
      }
      if (updateTypes.patch > 0) {
        lines.push(chalk.green(`  • ${updateTypes.patch} patch updates`));
      }

      // Security updates
      const securityUpdates = report.catalogs.reduce((sum: number, cat: any) => {
        return sum + cat.outdatedDependencies.filter((dep: any) => dep.isSecurityUpdate).length;
      }, 0);

      if (securityUpdates > 0) {
        lines.push(chalk.red(`  • ${securityUpdates} security updates`));
      }

      lines.push('');
      lines.push(chalk.blue('💡 Run with --update to apply updates'));
      
      if (updateTypes.major > 0) {
        lines.push(chalk.yellow('⚠️  Major updates may contain breaking changes'));
      }
    }

    console.log(lines.join('\n'));
  }

  /**
   * Validate command options
   */
  static validateOptions(options: CheckCommandOptions): string[] {
    const errors: string[] = [];

    // Validate format
    if (options.format && !['table', 'json', 'yaml', 'minimal'].includes(options.format)) {
      errors.push('Invalid format. Must be one of: table, json, yaml, minimal');
    }

    // Validate target
    if (options.target && !['latest', 'greatest', 'minor', 'patch', 'newest'].includes(options.target)) {
      errors.push('Invalid target. Must be one of: latest, greatest, minor, patch, newest');
    }

    // Validate include/exclude patterns
    if (options.include && options.include.some(pattern => !pattern.trim())) {
      errors.push('Include patterns cannot be empty');
    }

    if (options.exclude && options.exclude.some(pattern => !pattern.trim())) {
      errors.push('Exclude patterns cannot be empty');
    }

    return errors;
  }

  /**
   * Get command help text
   */
  static getHelpText(): string {
    return `
Check for outdated catalog dependencies

Usage:
  pcu check [options]

Options:
  --workspace <path>     Workspace directory (default: current directory)
  --catalog <name>       Check specific catalog only
  --format <type>        Output format: table, json, yaml, minimal (default: table)
  --target <type>        Update target: latest, greatest, minor, patch, newest (default: latest)
  --prerelease           Include prerelease versions
  --include <pattern>    Include packages matching pattern (can be used multiple times)
  --exclude <pattern>    Exclude packages matching pattern (can be used multiple times)
  --verbose              Show detailed information
  --no-color             Disable colored output

Examples:
  pcu check                           # Check all catalogs
  pcu check --catalog react17        # Check specific catalog
  pcu check --target minor           # Check for minor updates only
  pcu check --format json            # Output as JSON
  pcu check --include "react*"       # Include only React packages
  pcu check --exclude "@types/*"     # Exclude TypeScript types

Exit Codes:
  0  All dependencies are up to date
  1  Updates are available
  2  Error occurred
    `;
  }
}