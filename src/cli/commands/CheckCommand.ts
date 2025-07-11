/**
 * Check Command
 *
 * CLI command to check for outdated catalog dependencies.
 * Provides detailed information about available updates.
 */

import {
  CatalogUpdateService,
  CheckOptions,
} from '../../application/services/CatalogUpdateService.js';
import { OutputFormatter, OutputFormat } from '../formatters/OutputFormatter.js';
import { EnhancedProgressBar } from '../formatters/ProgressBar.js';
import { StyledText, ThemeManager } from '../themes/ColorTheme.js';

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
    let progressBar: EnhancedProgressBar | undefined;

    try {
      // Initialize theme
      ThemeManager.setTheme('default');

      // Show loading with progress bar
      progressBar = new EnhancedProgressBar({
        text: 'Checking for outdated dependencies...',
        color: 'cyan',
        spinner: 'dots',
      });
      progressBar.start();

      if (options.verbose) {
        console.log(StyledText.iconAnalysis('Checking for outdated catalog dependencies'));
        console.log(StyledText.muted(`Workspace: ${options.workspace || process.cwd()}`));

        if (options.catalog) {
          console.log(StyledText.muted(`Catalog: ${options.catalog}`));
        }

        if (options.target && options.target !== 'latest') {
          console.log(StyledText.muted(`Target: ${options.target}`));
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
        exclude: options.exclude,
      };

      // Execute check
      const report = await this.catalogUpdateService.checkOutdatedDependencies(checkOptions);

      progressBar.succeed('Analysis completed');

      // Format and display results
      const formattedOutput = this.outputFormatter.formatOutdatedReport(report);
      console.log(formattedOutput);

      // Show summary
      if (options.verbose || options.format === 'table') {
        this.showSummary(report, options);
      }

      // Always exit with 0 since this is just a check command
      // and finding updates is not an error condition
      process.exit(0);
    } catch (error) {
      if (progressBar) {
        progressBar.fail('Analysis failed');
      }

      console.error(StyledText.iconError('Error checking dependencies:'));
      console.error(StyledText.error(String(error)));

      if (options.verbose && error instanceof Error) {
        console.error(StyledText.muted('Stack trace:'));
        console.error(StyledText.muted(error.stack || 'No stack trace available'));
      }

      process.exit(1);
    }
  }

  /**
   * Show command summary
   */
  private showSummary(report: any, _options: CheckCommandOptions): void {
    const lines: string[] = [];
    const theme = ThemeManager.getTheme();

    if (!report.hasUpdates) {
      lines.push(StyledText.iconSuccess('All catalog dependencies are up to date!'));
    } else {
      lines.push(StyledText.iconInfo('Summary:'));
      lines.push(`  • ${report.totalOutdated} outdated dependencies found`);
      lines.push(`  • ${report.catalogs.length} catalogs checked`);

      const totalPackages = report.catalogs.reduce(
        (sum: number, cat: any) => sum + cat.totalPackages,
        0
      );
      lines.push(`  • ${totalPackages} total catalog entries`);

      // Show breakdown by update type
      const updateTypes = { major: 0, minor: 0, patch: 0 };

      for (const catalog of report.catalogs) {
        for (const dep of catalog.outdatedDependencies) {
          updateTypes[dep.updateType as keyof typeof updateTypes]++;
        }
      }

      if (updateTypes.major > 0) {
        lines.push(theme.major(`  • ${updateTypes.major} major updates`));
      }
      if (updateTypes.minor > 0) {
        lines.push(theme.minor(`  • ${updateTypes.minor} minor updates`));
      }
      if (updateTypes.patch > 0) {
        lines.push(theme.patch(`  • ${updateTypes.patch} patch updates`));
      }

      // Security updates
      const securityUpdates = report.catalogs.reduce((sum: number, cat: any) => {
        return sum + cat.outdatedDependencies.filter((dep: any) => dep.isSecurityUpdate).length;
      }, 0);

      if (securityUpdates > 0) {
        lines.push(StyledText.iconSecurity(`${securityUpdates} security updates`));
      }

      lines.push('');
      lines.push(StyledText.iconUpdate('Run with --update to apply updates'));

      if (updateTypes.major > 0) {
        lines.push(StyledText.iconWarning('Major updates may contain breaking changes'));
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
    if (
      options.target &&
      !['latest', 'greatest', 'minor', 'patch', 'newest'].includes(options.target)
    ) {
      errors.push('Invalid target. Must be one of: latest, greatest, minor, patch, newest');
    }

    // Validate include/exclude patterns
    if (options.include && options.include.some((pattern) => !pattern.trim())) {
      errors.push('Include patterns cannot be empty');
    }

    if (options.exclude && options.exclude.some((pattern) => !pattern.trim())) {
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
