#!/usr/bin/env node

/**
 * pnpm-catalog-updates CLI Entry Point
 *
 * A CLI tool for checking and updating pnpm workspace catalog dependencies.
 * This is the main entry point that handles command parsing and execution.
 */

import { dirname, join } from 'path';
import { OutputFormat, OutputFormatter } from './formatters/OutputFormatter.js';

// Services and Dependencies
import { CatalogUpdateService } from '../application/services/CatalogUpdateService.js';
// CLI Commands
import chalk from 'chalk';
import { Command } from 'commander';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { WorkspaceService } from '../application/services/WorkspaceService.js';
import { NpmRegistryService } from '../infrastructure/external-services/NpmRegistryService.js';
import { FileSystemService } from '../infrastructure/file-system/FileSystemService.js';
import { FileWorkspaceRepository } from '../infrastructure/repositories/FileWorkspaceRepository.js';
import { CheckCommand } from './commands/CheckCommand.js';
import { UpdateCommand } from './commands/UpdateCommand.js';

// Get package.json for version info
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageJson = JSON.parse(readFileSync(join(__dirname, '../../package.json'), 'utf-8'));

/**
 * Create service dependencies
 */
function createServices() {
  const fileSystemService = new FileSystemService();
  const workspaceRepository = new FileWorkspaceRepository(fileSystemService);
  const registryService = new NpmRegistryService();
  const catalogUpdateService = new CatalogUpdateService(workspaceRepository, registryService);
  const workspaceService = new WorkspaceService(workspaceRepository);

  return {
    fileSystemService,
    workspaceRepository,
    registryService,
    catalogUpdateService,
    workspaceService,
  };
}

/**
 * Main CLI function
 */
export async function main(): Promise<void> {
  const program = new Command();

  // Create services
  const services = createServices();

  // Configure the main command
  program
    .name('pcu')
    .description('A CLI tool to check and update pnpm workspace catalog dependencies')
    .version(packageJson.version)
    .option('-v, --verbose', 'enable verbose logging')
    .option('-w, --workspace <path>', 'workspace directory path')
    .option('--no-color', 'disable colored output');

  // Check command
  program
    .command('check')
    .alias('chk')
    .description('check for outdated catalog dependencies')
    .option('--catalog <name>', 'check specific catalog only')
    .option('-f, --format <type>', 'output format: table, json, yaml, minimal', 'table')
    .option(
      '-t, --target <type>',
      'update target: latest, greatest, minor, patch, newest',
      'latest'
    )
    .option('--prerelease', 'include prerelease versions')
    .option('--include <pattern>', 'include packages matching pattern', [])
    .option('--exclude <pattern>', 'exclude packages matching pattern', [])
    .action(async (options, command) => {
      try {
        const globalOptions = command.parent.opts();
        const formatter = new OutputFormatter(
          options.format as OutputFormat,
          !globalOptions.noColor
        );

        const checkCommand = new CheckCommand(services.catalogUpdateService, formatter);

        await checkCommand.execute({
          workspace: globalOptions.workspace,
          catalog: options.catalog,
          format: options.format,
          target: options.target,
          prerelease: options.prerelease,
          include: Array.isArray(options.include)
            ? options.include
            : [options.include].filter(Boolean),
          exclude: Array.isArray(options.exclude)
            ? options.exclude
            : [options.exclude].filter(Boolean),
          verbose: globalOptions.verbose,
          color: !globalOptions.noColor,
        });
      } catch (error) {
        console.error(chalk.red('❌ Error:'), error);
        process.exit(1);
      }
    });

  // Update command
  program
    .command('update')
    .alias('u')
    .description('update catalog dependencies')
    .option('-i, --interactive', 'interactive mode to choose updates')
    .option('-d, --dry-run', 'preview changes without writing files')
    .option(
      '-t, --target <type>',
      'update target: latest, greatest, minor, patch, newest',
      'latest'
    )
    .option('--catalog <name>', 'update specific catalog only')
    .option('--include <pattern>', 'include packages matching pattern', [])
    .option('--exclude <pattern>', 'exclude packages matching pattern', [])
    .option('--force', 'force updates even if risky')
    .option('--prerelease', 'include prerelease versions')
    .option('-b, --create-backup', 'create backup files before updating')
    .option('-f, --format <type>', 'output format: table, json, yaml, minimal', 'table')
    .action(async (options, command) => {
      try {
        const globalOptions = command.parent.opts();
        const formatter = new OutputFormatter(
          options.format as OutputFormat,
          !globalOptions.noColor
        );

        const updateCommand = new UpdateCommand(services.catalogUpdateService, formatter);

        await updateCommand.execute({
          workspace: globalOptions.workspace,
          catalog: options.catalog,
          format: options.format,
          target: options.target,
          interactive: options.interactive,
          dryRun: options.dryRun,
          force: options.force,
          prerelease: options.prerelease,
          include: Array.isArray(options.include)
            ? options.include
            : [options.include].filter(Boolean),
          exclude: Array.isArray(options.exclude)
            ? options.exclude
            : [options.exclude].filter(Boolean),
          createBackup: options.createBackup,
          verbose: globalOptions.verbose,
          color: !globalOptions.noColor,
        });
      } catch (error) {
        console.error(chalk.red('❌ Error:'), error);
        process.exit(1);
      }
    });

  // Analyze command
  program
    .command('analyze')
    .alias('a')
    .description('analyze the impact of updating a specific dependency')
    .argument('<catalog>', 'catalog name')
    .argument('<package>', 'package name')
    .argument('[version]', 'new version (default: latest)')
    .option('-f, --format <type>', 'output format: table, json, yaml, minimal', 'table')
    .action(async (catalog, packageName, version, options, command) => {
      try {
        const globalOptions = command.parent.opts();
        const formatter = new OutputFormatter(
          options.format as OutputFormat,
          !globalOptions.noColor
        );

        // Get latest version if not specified
        const targetVersion =
          version || (await services.registryService.getLatestVersion(packageName)).toString();

        const analysis = await services.catalogUpdateService.analyzeImpact(
          catalog,
          packageName,
          targetVersion,
          globalOptions.workspace
        );

        const formattedOutput = formatter.formatImpactAnalysis(analysis);
        console.log(formattedOutput);
      } catch (error) {
        console.error(chalk.red('❌ Error:'), error);
        process.exit(1);
      }
    });

  // Workspace command
  program
    .command('workspace')
    .alias('w')
    .description('workspace information and validation')
    .option('--validate', 'validate workspace configuration')
    .option('-s, --stats', 'show workspace statistics')
    .option('-f, --format <type>', 'output format: table, json, yaml, minimal', 'table')
    .action(async (options, command) => {
      try {
        const globalOptions = command.parent.opts();
        const formatter = new OutputFormatter(
          options.format as OutputFormat,
          !globalOptions.noColor
        );

        if (options.validate) {
          const report = await services.workspaceService.validateWorkspace(globalOptions.workspace);
          const formattedOutput = formatter.formatValidationReport(report);
          console.log(formattedOutput);
          process.exit(report.isValid ? 0 : 1);
        } else if (options.stats) {
          const stats = await services.workspaceService.getWorkspaceStats(globalOptions.workspace);
          const formattedOutput = formatter.formatWorkspaceStats(stats);
          console.log(formattedOutput);
        } else {
          const info = await services.workspaceService.getWorkspaceInfo(globalOptions.workspace);
          console.log(formatter.formatMessage(`Workspace: ${info.name}`, 'info'));
          console.log(formatter.formatMessage(`Path: ${info.path}`, 'info'));
          console.log(formatter.formatMessage(`Packages: ${info.packageCount}`, 'info'));
          console.log(formatter.formatMessage(`Catalogs: ${info.catalogCount}`, 'info'));

          if (info.catalogNames.length > 0) {
            console.log(
              formatter.formatMessage(`Catalog names: ${info.catalogNames.join(', ')}`, 'info')
            );
          }
        }
      } catch (error) {
        console.error(chalk.red('❌ Error:'), error);
        process.exit(1);
      }
    });

  // Add help command
  program
    .command('help')
    .alias('h')
    .argument('[command]', 'command to get help for')
    .description('display help for command')
    .action((command) => {
      if (command) {
        const cmd = program.commands.find((c) => c.name() === command);
        if (cmd) {
          cmd.help();
        } else {
          console.log(chalk.red(`Unknown command: ${command}`));
        }
      } else {
        program.help();
      }
    });

  // Let commander handle help and version normally
  // program.exitOverride() removed to fix help/version output

  // Show help if no arguments provided
  if (process.argv.length <= 2) {
    program.help();
  }

  // Parse command line arguments
  try {
    await program.parseAsync(process.argv);
  } catch (error) {
    console.error(chalk.red('❌ Unexpected error:'), error);
    if (error instanceof Error && error.stack) {
      console.error(chalk.gray(error.stack));
    }
    process.exit(1);
  }
}

// Run the CLI if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error(chalk.red('❌ Fatal error:'), error);
    process.exit(1);
  });
}
