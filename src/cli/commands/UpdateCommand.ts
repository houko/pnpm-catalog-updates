/**
 * Update Command
 *
 * CLI command to update catalog dependencies.
 * Supports interactive mode, dry-run, and various update strategies.
 */

import chalk from 'chalk';
import inquirer from 'inquirer';

import {
  CatalogUpdateService,
  UpdateOptions,
  PlannedUpdate,
} from '../../application/services/CatalogUpdateService.js';
import { OutputFormatter, OutputFormat } from '../formatters/OutputFormatter.js';

export interface UpdateCommandOptions {
  workspace?: string;
  catalog?: string;
  format?: OutputFormat;
  target?: 'latest' | 'greatest' | 'minor' | 'patch' | 'newest';
  interactive?: boolean;
  dryRun?: boolean;
  force?: boolean;
  prerelease?: boolean;
  include?: string[];
  exclude?: string[];
  createBackup?: boolean;
  verbose?: boolean;
  color?: boolean;
}

export class UpdateCommand {
  constructor(
    private readonly catalogUpdateService: CatalogUpdateService,
    private readonly outputFormatter: OutputFormatter
  ) {}

  /**
   * Execute the update command
   */
  async execute(options: UpdateCommandOptions = {}): Promise<void> {
    try {
      // Show loading message
      if (options.verbose) {
        console.log(chalk.blue('🔄 Planning catalog dependency updates...'));
        console.log(chalk.gray(`Workspace: ${options.workspace || process.cwd()}`));

        if (options.catalog) {
          console.log(chalk.gray(`Catalog: ${options.catalog}`));
        }

        if (options.dryRun) {
          console.log(chalk.yellow('🔍 Dry run mode - no files will be modified'));
        }

        console.log('');
      }

      // Prepare update options
      const updateOptions: UpdateOptions = {
        workspacePath: options.workspace,
        catalogName: options.catalog,
        target: options.target || 'latest',
        interactive: options.interactive || false,
        dryRun: options.dryRun || false,
        force: options.force || false,
        includePrerelease: options.prerelease || false,
        include: options.include,
        exclude: options.exclude,
        createBackup: options.createBackup || false,
      };

      // Plan updates
      const plan = await this.catalogUpdateService.planUpdates(updateOptions);

      // Show plan
      if (options.verbose || options.dryRun) {
        this.showUpdatePlan(plan, options);
      }

      // Check if there are any updates
      if (plan.totalUpdates === 0) {
        console.log(chalk.green('✅ All catalog dependencies are already up to date!'));
        return;
      }

      // Show conflicts if any
      if (plan.hasConflicts && !options.force) {
        this.showConflicts(plan, options);

        if (!options.interactive) {
          console.log(
            chalk.red(
              '❌ Cannot proceed due to conflicts. Use --force to override or --interactive to resolve.'
            )
          );
          process.exit(1);
        }
      }

      // Interactive selection
      let finalPlan = plan;
      if (options.interactive) {
        finalPlan = await this.interactiveSelection(plan, options);
      }

      // Confirm before proceeding (unless in non-interactive mode)
      if (!options.dryRun && options.interactive) {
        const confirmed = await this.confirmUpdates(finalPlan, options);
        if (!confirmed) {
          console.log(chalk.yellow('❌ Update cancelled by user'));
          return;
        }
      }

      // Execute updates
      if (!options.dryRun) {
        if (options.verbose) {
          console.log(chalk.blue('🚀 Executing updates...'));
        }

        const result = await this.catalogUpdateService.executeUpdates(finalPlan, updateOptions);

        // Show results
        const formattedOutput = this.outputFormatter.formatUpdateResult(result);
        console.log(formattedOutput);

        // Show summary
        if (options.verbose || options.format === 'table') {
          this.showUpdateSummary(result, options);
        }

        // Exit with appropriate code
        process.exit(result.success ? 0 : 1);
      } else {
        console.log(chalk.blue('🔍 Dry run completed - no changes made'));
        console.log(chalk.gray(`Would update ${finalPlan.totalUpdates} dependencies`));
      }
    } catch (error) {
      console.error(chalk.red('❌ Error updating dependencies:'));
      console.error(chalk.red(String(error)));

      if (options.verbose && error instanceof Error) {
        console.error(chalk.gray('Stack trace:'));
        console.error(chalk.gray(error.stack || 'No stack trace available'));
      }

      process.exit(1);
    }
  }

  /**
   * Show the update plan
   */
  private showUpdatePlan(plan: any, options: UpdateCommandOptions): void {
    console.log(chalk.bold(`📋 Update Plan (${plan.totalUpdates} updates):`));
    console.log('');

    const updatesByType = { major: 0, minor: 0, patch: 0 };

    for (const update of plan.updates) {
      const typeColor = this.getUpdateTypeColor(update.updateType);
      console.log(
        `  ${chalk.cyan(update.catalogName)}:${chalk.white(update.packageName)} ${chalk.gray(update.currentVersion)} → ${typeColor(update.newVersion)} ${chalk.gray(`(${update.updateType})`)}`
      );

      updatesByType[update.updateType as keyof typeof updatesByType]++;

      if (options.verbose && update.affectedPackages.length > 0) {
        console.log(chalk.gray(`    Affects: ${update.affectedPackages.join(', ')}`));
      }
    }

    console.log('');
    console.log(
      chalk.gray(
        `Summary: ${updatesByType.major} major, ${updatesByType.minor} minor, ${updatesByType.patch} patch`
      )
    );
    console.log('');
  }

  /**
   * Show version conflicts
   */
  private showConflicts(plan: any, _options: UpdateCommandOptions): void {
    console.log(chalk.red('⚠️  Version Conflicts Detected:'));
    console.log('');

    for (const conflict of plan.conflicts) {
      console.log(chalk.yellow(`${conflict.packageName}:`));

      for (const catalog of conflict.catalogs) {
        console.log(
          `  ${catalog.catalogName}: ${catalog.currentVersion} → ${catalog.proposedVersion}`
        );
      }

      console.log(chalk.gray(`  Recommendation: ${conflict.recommendation}`));
      console.log('');
    }
  }

  /**
   * Interactive update selection
   */
  private async interactiveSelection(plan: any, _options: UpdateCommandOptions): Promise<any> {
    console.log(chalk.blue('🎯 Interactive Update Selection'));
    console.log('');

    const selectedUpdates: PlannedUpdate[] = [];

    // Group updates by type for better UX
    const updatesByType = {
      major: plan.updates.filter((u: any) => u.updateType === 'major'),
      minor: plan.updates.filter((u: any) => u.updateType === 'minor'),
      patch: plan.updates.filter((u: any) => u.updateType === 'patch'),
    };

    // Ask about patch updates first (safest)
    if (updatesByType.patch.length > 0) {
      const patchChoice = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'applyPatch',
          message: `Apply all ${updatesByType.patch.length} patch updates? (recommended)`,
          default: true,
        },
      ]);

      if (patchChoice.applyPatch) {
        selectedUpdates.push(...updatesByType.patch);
      } else {
        // Let user select individual patch updates
        const patchSelections = await this.selectIndividualUpdates(updatesByType.patch, 'patch');
        selectedUpdates.push(...patchSelections);
      }
    }

    // Ask about minor updates
    if (updatesByType.minor.length > 0) {
      const minorChoice = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'applyMinor',
          message: `Apply all ${updatesByType.minor.length} minor updates?`,
          default: true,
        },
      ]);

      if (minorChoice.applyMinor) {
        selectedUpdates.push(...updatesByType.minor);
      } else {
        const minorSelections = await this.selectIndividualUpdates(updatesByType.minor, 'minor');
        selectedUpdates.push(...minorSelections);
      }
    }

    // Ask about major updates (most risky)
    if (updatesByType.major.length > 0) {
      const majorChoice = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'applyMajor',
          message: chalk.yellow(
            `Apply ${updatesByType.major.length} major updates? (may contain breaking changes)`
          ),
          default: false,
        },
      ]);

      if (majorChoice.applyMajor) {
        selectedUpdates.push(...updatesByType.major);
      } else {
        const majorSelections = await this.selectIndividualUpdates(updatesByType.major, 'major');
        selectedUpdates.push(...majorSelections);
      }
    }

    return {
      ...plan,
      updates: selectedUpdates,
      totalUpdates: selectedUpdates.length,
    };
  }

  /**
   * Select individual updates
   */
  private async selectIndividualUpdates(
    updates: PlannedUpdate[],
    type: string
  ): Promise<PlannedUpdate[]> {
    if (updates.length === 0) return [];

    const choices = updates.map((update) => ({
      name: `${update.catalogName}:${update.packageName} ${update.currentVersion} → ${update.newVersion}`,
      value: update,
      checked: type === 'patch', // Default to checked for patch updates
    }));

    const selection = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'selectedUpdates',
        message: `Select ${type} updates to apply:`,
        choices,
        pageSize: 10,
      },
    ]);

    return selection.selectedUpdates;
  }

  /**
   * Confirm updates before execution
   */
  private async confirmUpdates(plan: any, options: UpdateCommandOptions): Promise<boolean> {
    if (plan.totalUpdates === 0) {
      return false;
    }

    console.log(chalk.blue(`\n🚀 Ready to update ${plan.totalUpdates} dependencies`));

    if (plan.hasConflicts && !options.force) {
      console.log(chalk.yellow('⚠️  Some conflicts will be resolved with --force behavior'));
    }

    const confirmation = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'proceed',
        message: 'Proceed with updates?',
        default: true,
      },
    ]);

    return confirmation.proceed;
  }

  /**
   * Show update summary
   */
  private showUpdateSummary(result: any, _options: UpdateCommandOptions): void {
    const lines: string[] = [];

    if (result.success) {
      lines.push(chalk.green('\n🎉 Update completed successfully!'));
    } else {
      lines.push(chalk.red('\n❌ Update completed with errors'));
    }

    lines.push('');
    lines.push(`📊 Summary:`);
    lines.push(`  • ${result.totalUpdated} dependencies updated`);
    lines.push(`  • ${result.totalSkipped} dependencies skipped`);
    lines.push(`  • ${result.totalErrors} errors occurred`);

    if (result.totalUpdated > 0) {
      lines.push('');
      lines.push(chalk.blue('💡 Next steps:'));
      lines.push('  • Test your application thoroughly');
      lines.push('  • Update package-lock.json/pnpm-lock.yaml if needed');
      lines.push('  • Check for any breaking changes in updated packages');
    }

    console.log(lines.join('\n'));
  }

  /**
   * Get color for update type
   */
  private getUpdateTypeColor(updateType: string): typeof chalk {
    switch (updateType) {
      case 'major':
        return chalk.red;
      case 'minor':
        return chalk.yellow;
      case 'patch':
        return chalk.green;
      default:
        return chalk.gray;
    }
  }

  /**
   * Validate command options
   */
  static validateOptions(options: UpdateCommandOptions): string[] {
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

    // Interactive and dry-run conflict
    if (options.interactive && options.dryRun) {
      errors.push('Cannot use --interactive with --dry-run');
    }

    return errors;
  }

  /**
   * Get command help text
   */
  static getHelpText(): string {
    return `
Update catalog dependencies

Usage:
  pcu update [options]

Options:
  --workspace <path>     Workspace directory (default: current directory)
  --catalog <name>       Update specific catalog only
  --format <type>        Output format: table, json, yaml, minimal (default: table)
  --target <type>        Update target: latest, greatest, minor, patch, newest (default: latest)
  -i, --interactive      Interactive mode to choose updates
  -d, --dry-run          Preview changes without writing files
  --force                Force updates even if conflicts exist
  --prerelease           Include prerelease versions
  --include <pattern>    Include packages matching pattern (can be used multiple times)
  --exclude <pattern>    Exclude packages matching pattern (can be used multiple times)
  --create-backup        Create backup files before updating
  --verbose              Show detailed information
  --no-color             Disable colored output

Examples:
  pcu update                          # Update all catalogs
  pcu update --interactive            # Interactive update selection
  pcu update --dry-run               # Preview updates without applying
  pcu update --catalog react17       # Update specific catalog
  pcu update --target minor          # Update to latest minor versions only
  pcu update --force                 # Force updates despite conflicts
  pcu update --include "react*"      # Update only React packages

Exit Codes:
  0  Updates completed successfully
  1  Updates failed or were cancelled
  2  Error occurred
    `;
  }
}
