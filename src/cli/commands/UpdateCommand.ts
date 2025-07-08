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
  PlannedUpdate,
  UpdateOptions,
  UpdatePlan,
  UpdateTarget,
} from '../../application/services/CatalogUpdateService.js';
import { OutputFormat, OutputFormatter } from '../formatters/OutputFormatter.js';

export interface UpdateCommandOptions {
  workspace?: string;
  catalog?: string;
  format?: OutputFormat;
  target?: UpdateTarget;
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
  private readonly updateService: CatalogUpdateService;
  private readonly outputFormatter: OutputFormatter;

  constructor(updateService: CatalogUpdateService, outputFormatter: OutputFormatter) {
    this.updateService = updateService;
    this.outputFormatter = outputFormatter;
  }

  /**
   * Execute the update command
   */
  async execute(options: UpdateCommandOptions = {}): Promise<void> {
    try {
      // Convert command options to service options
      const updateOptions: UpdateOptions = {
        workspacePath: options.workspace,
        catalogName: options.catalog,
        target: options.target,
        includePrerelease: options.prerelease ?? false,
        include: options.include,
        exclude: options.exclude,
        interactive: options.interactive ?? false,
        dryRun: options.dryRun ?? false,
        force: options.force ?? false,
        createBackup: options.createBackup ?? false,
      };

      // Check for updates
      console.log(chalk.blue('📦 Scanning workspace...'));
      console.log(chalk.gray('  ⚡ Loading workspace configuration...'));
      const plan = await this.updateService.planUpdates(updateOptions);
      console.log(chalk.gray('  ✓ Workspace configuration loaded'));
      console.log(chalk.gray('  ⚡ Checking package versions...'));

      if (!plan.updates.length) {
        console.log(chalk.gray('  ✓ Package versions checked'));
        console.log(chalk.green('\n✨ All dependencies are up to date!'));
        return;
      }

      console.log(chalk.gray('  ✓ Package versions checked'));
      console.log(
        chalk.blue(
          `\n📝 Found ${plan.totalUpdates} update${plan.totalUpdates === 1 ? '' : 's'} available`
        )
      );

      // Interactive selection if enabled
      let finalPlan = plan;
      if (options.interactive) {
        finalPlan = await this.interactiveSelection(plan);
        if (!finalPlan.updates.length) {
          console.log(chalk.yellow('\n⚪ No updates selected'));
          return;
        }
      }

      // Apply updates
      if (!options.dryRun) {
        console.log(chalk.blue('\n🚀 Applying updates...'));
        const result = await this.updateService.executeUpdates(finalPlan, updateOptions);
        console.log(this.outputFormatter.formatUpdateResult(result));
      } else {
        console.log(chalk.yellow('\n🔍 Dry run - no changes made'));
        console.log(JSON.stringify(finalPlan, null, 2));
      }

      console.log(chalk.green('\n✨ Done!'));
    } catch (error) {
      if (error instanceof Error) {
        console.error(chalk.red(`\n❌ Error: ${error.message}`));
      } else {
        console.error(chalk.red('\n❌ Unknown error occurred'));
      }
      throw error;
    }
  }

  /**
   * Interactive update selection
   */
  private async interactiveSelection(plan: UpdatePlan): Promise<UpdatePlan> {
    console.log(chalk.blue('\n🎯 Interactive Update Selection'));
    console.log(chalk.gray('Use ↑/↓ to navigate, Space to toggle, Enter to confirm'));

    // Group updates by catalog for better organization
    const updatesByDir = plan.updates.reduce(
      (acc, update) => {
        const dir = update.catalogName;
        if (!acc[dir]) {
          acc[dir] = [];
        }
        acc[dir].push(update);
        return acc;
      },
      {} as Record<string, PlannedUpdate[]>
    );

    // Create choices with separators
    const choices = Object.entries(updatesByDir).flatMap(([dir, updates]) => [
      new inquirer.Separator(`\n📂 ${dir}`),
      ...updates.map((update) => ({
        name: this.formatUpdateChoice(update),
        value: update,
        checked: true,
      })),
    ]);

    const { selectedUpdates } = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'selectedUpdates',
        message: 'Select updates to apply:',
        choices,
        pageSize: process.stdout.rows ? Math.max(10, process.stdout.rows - 8) : 40,
        loop: true,
      },
    ]);

    return {
      ...plan,
      updates: selectedUpdates,
      totalUpdates: selectedUpdates.length,
    };
  }

  /**
   * Format update choice for interactive selection
   */
  private formatUpdateChoice(update: PlannedUpdate): string {
    const typeColor = this.getUpdateTypeColor(update.updateType);
    const packageInfo = `${update.packageName} ${update.currentVersion} → ${update.newVersion}`;
    const typeInfo = `[${update.updateType}]`;
    const dirInfo = chalk.gray(`(${update.catalogName})`);

    return `${packageInfo} ${typeColor(typeInfo)} ${dirInfo}`;
  }

  /**
   * Get color function for update type
   */
  private getUpdateTypeColor(updateType: string): (text: string) => string {
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
