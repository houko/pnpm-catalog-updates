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
import { ProgressBar } from '../formatters/ProgressBar.js';
import { InteractivePrompts } from '../interactive/InteractivePrompts.js';
import { StyledText, ThemeManager } from '../themes/ColorTheme.js';
import { ConfigLoader } from '../../common/config/ConfigLoader.js';

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

  constructor(updateService: CatalogUpdateService) {
    this.updateService = updateService;
  }

  /**
   * Execute the update command
   */
  async execute(options: UpdateCommandOptions = {}): Promise<void> {
    let progressBar: ProgressBar | undefined;

    try {
      // Initialize theme
      ThemeManager.setTheme('default');

      // Create progress bar for the update process
      progressBar = new ProgressBar({
        text: '正在规划更新...',
        total: 4, // 4 main steps
      });
      progressBar.start('正在加载工作区配置...');

      // Load configuration file first
      const config = ConfigLoader.loadConfig(options.workspace || process.cwd());

      // Use format from CLI options first, then config file, then default
      const effectiveFormat = options.format || config.defaults?.format || 'table';

      // Create output formatter with effective format
      const formatter = new OutputFormatter(
        effectiveFormat as OutputFormat,
        options.color !== false
      );

      // Merge CLI options with configuration file settings
      const updateOptions: UpdateOptions = {
        workspacePath: options.workspace,
        catalogName: options.catalog,
        target: options.target || config.defaults?.target,
        includePrerelease: options.prerelease ?? config.defaults?.includePrerelease ?? false,
        // CLI include/exclude options take priority over config file
        include: options.include?.length ? options.include : config.include,
        exclude: options.exclude?.length ? options.exclude : config.exclude,
        interactive: options.interactive ?? config.defaults?.interactive ?? false,
        dryRun: options.dryRun ?? config.defaults?.dryRun ?? false,
        force: options.force ?? false,
        createBackup: options.createBackup ?? config.defaults?.createBackup ?? false,
      };

      // Step 1: Planning updates
      progressBar.update('正在检查包版本...', 1, 4);
      const plan = await this.updateService.planUpdates(updateOptions);

      // Step 2: Check if any updates found
      progressBar.update('正在分析更新...', 2, 4);

      if (!plan.updates.length) {
        progressBar.succeed('所有依赖包都是最新的');
        console.log(StyledText.iconSuccess('All dependencies are up to date!'));
        return;
      }

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
          progressBar.warn('未选择任何更新');
          console.log(StyledText.iconWarning('No updates selected'));
          return;
        }
      }

      // Step 3: Apply updates
      progressBar.update('正在准备应用更新...', 3, 4);

      if (!options.dryRun) {
        // Replace the progress bar with one for applying updates
        progressBar.stop();
        progressBar = new ProgressBar({
          text: 'Applying updates...',
          total: finalPlan.updates.length,
        });
        progressBar.start('正在应用更新...');

        const result = await this.updateService.executeUpdates(finalPlan, updateOptions);
        progressBar.succeed(`Applied ${finalPlan.updates.length} updates`);

        console.log(formatter.formatUpdateResult(result));
      } else {
        progressBar.update('正在生成预览...', 4, 4);
        progressBar.succeed('更新预览完成');
        console.log(StyledText.iconInfo('Dry run - no changes made'));
        console.log(JSON.stringify(finalPlan, null, 2));
      }

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
