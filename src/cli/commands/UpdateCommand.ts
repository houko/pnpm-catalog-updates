/**
 * Update Command
 *
 * CLI command to update catalog dependencies.
 * Supports interactive mode, dry-run, and various update strategies.
 */

import {
  CatalogUpdateService,
  UpdateOptions,
  UpdatePlan,
  UpdateTarget,
} from '../../application/services/CatalogUpdateService.js';
import { OutputFormat, OutputFormatter } from '../formatters/OutputFormatter.js';
import { EnhancedProgressBar, MultiStepProgress } from '../formatters/ProgressBar.js';
import { InteractivePrompts } from '../interactive/InteractivePrompts.js';
import { StyledText, ThemeManager } from '../themes/ColorTheme.js';

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
    const multiStep = new MultiStepProgress([
      'Loading workspace configuration',
      'Checking package versions',
      'Planning updates',
      'Applying updates',
    ]);

    let progressBar: EnhancedProgressBar | undefined;

    try {
      // Initialize theme
      ThemeManager.setTheme('default');

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

      multiStep.start();

      // Step 1: Loading workspace
      progressBar = new EnhancedProgressBar({
        text: 'Loading workspace configuration...',
        color: 'cyan',
        spinner: 'dots',
      });
      progressBar.start();

      multiStep.next('Loading workspace configuration');
      const plan = await this.updateService.planUpdates(updateOptions);
      progressBar.succeed('Workspace configuration loaded');

      // Step 2: Checking versions
      multiStep.next('Checking package versions');

      if (!plan.updates.length) {
        multiStep.complete();
        console.log(StyledText.iconSuccess('All dependencies are up to date!'));
        return;
      }

      // Step 3: Planning updates
      multiStep.next('Planning updates');
      console.log(
        StyledText.iconPackage(
          `Found ${plan.totalUpdates} update${plan.totalUpdates === 1 ? '' : 's'} available`
        )
      );

      // Interactive selection if enabled
      let finalPlan = plan;
      if (options.interactive) {
        finalPlan = await this.interactiveSelection(plan);
        if (!finalPlan.updates.length) {
          console.log(StyledText.iconWarning('No updates selected'));
          return;
        }
      }

      // Step 4: Apply updates
      if (!options.dryRun) {
        multiStep.next('Applying updates');

        progressBar = new EnhancedProgressBar({
          text: 'Applying updates...',
          color: 'green',
          total: finalPlan.updates.length,
        });
        progressBar.start();

        const result = await this.updateService.executeUpdates(finalPlan, updateOptions);
        progressBar.succeed(`Applied ${finalPlan.updates.length} updates`);

        console.log(this.outputFormatter.formatUpdateResult(result));
      } else {
        console.log(StyledText.iconInfo('Dry run - no changes made'));
        console.log(JSON.stringify(finalPlan, null, 2));
      }

      multiStep.complete();
      console.log(StyledText.iconComplete('Update process completed!'));
    } catch (error) {
      if (progressBar) {
        progressBar.fail('Operation failed');
      }

      if (error instanceof Error) {
        console.error(StyledText.iconError(`Error: ${error.message}`));
      } else {
        console.error(StyledText.iconError('Unknown error occurred'));
      }
      throw error;
    }
  }

  /**
   * Interactive update selection
   */
  private async interactiveSelection(plan: UpdatePlan): Promise<UpdatePlan> {
    const interactivePrompts = new InteractivePrompts();

    // Transform PlannedUpdate to the format expected by InteractivePrompts
    const packages = plan.updates.map((update) => ({
      name: update.packageName,
      current: update.currentVersion,
      latest: update.newVersion,
      type: update.updateType,
    }));

    const selectedPackageNames = await interactivePrompts.selectPackages(packages);

    // Filter the plan to only include selected packages
    const selectedUpdates = plan.updates.filter((update) =>
      selectedPackageNames.includes(update.packageName)
    );

    return {
      ...plan,
      updates: selectedUpdates,
      totalUpdates: selectedUpdates.length,
    };
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
