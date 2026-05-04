/**
 * Command Registrar
 *
 * Handles registration of all CLI commands with lazy service injection.
 * Extracted from index.ts to improve single responsibility and maintainability.
 */

import { ExitPromptError } from '@inquirer/core'
import type { AnalysisType, IPackageManagerService } from '@pcu/core'
import {
  CatalogUpdateService,
  FileSystemService,
  FileWorkspaceRepository,
  PnpmPackageManagerService,
  WorkspaceService,
} from '@pcu/core'
import {
  exitProcess,
  isCommandExitError,
  Logger,
  logger,
  parseBooleanFlag,
  t,
  VersionChecker,
} from '@pcu/utils'
import chalk from 'chalk'
import { type Command, Option } from 'commander'
import { AiCommand } from './commands/aiCommand.js'
import { AnalyzeCommand } from './commands/analyzeCommand.js'
import { CheckCommand } from './commands/checkCommand.js'
import { GraphCommand } from './commands/graphCommand.js'
import { InitCommand } from './commands/initCommand.js'
import { RollbackCommand } from './commands/rollbackCommand.js'
import { SecurityCommand } from './commands/securityCommand.js'
import { ThemeCommand } from './commands/themeCommand.js'
import { UpdateCommand } from './commands/updateCommand.js'
import { WorkspaceCommand } from './commands/workspaceCommand.js'
import { CLI_CHOICES } from './constants/cliChoices.js'
import { type OutputFormat, OutputFormatter } from './formatters/outputFormatter.js'
import {
  hasProvidedOptions,
  interactiveOptionsCollector,
} from './interactive/InteractiveOptionsCollector.js'
import { cliOutput } from './utils/cliOutput.js'

/**
 * Service type definitions
 */
export type Services = {
  fileSystemService: FileSystemService
  workspaceRepository: FileWorkspaceRepository
  catalogUpdateService: CatalogUpdateService
  workspaceService: WorkspaceService
  packageManagerService: IPackageManagerService
}

/**
 * Global options passed to all commands
 */
export interface GlobalOptions {
  workspace?: string
  verbose?: boolean
  noColor?: boolean
  ci?: boolean
}

/**
 * Context provided to command executors
 */
export interface CommandContext<TOptions> {
  options: TOptions
  globalOptions: GlobalOptions
  services: Services
}

/**
 * Configuration for creating a command action handler
 */
export interface CommandActionConfig<TOptions> {
  /** Command name for error reporting */
  name: string
  /** Whether this command needs services (default: true) */
  needsServices?: boolean
  /** Interactive options collector function */
  interactiveCollector?: (options: TOptions & { workspace?: string }) => Promise<Partial<TOptions>>
  /** Options to exclude from "hasProvidedOptions" check */
  excludeFromCheck?: string[]
  /** Force exit after execution (for commands with interactive mode that keep stdin open) */
  forceExit?: boolean
}

/**
 * Check if error is an ExitPromptError from @inquirer/core (user pressed Ctrl+C)
 * Uses instanceof as primary method, with fallbacks for cross-realm scenarios
 */
export function isExitPromptError(error: unknown): boolean {
  if (!error || typeof error !== 'object') return false

  // Primary: instanceof check (most reliable when in same realm)
  if (error instanceof ExitPromptError) return true

  // Fallback 1: Check by name property (for cross-realm scenarios)
  if ('name' in error && (error as { name: string }).name === 'ExitPromptError') return true

  // Fallback 2: Check by constructor name (for edge cases)
  if (error.constructor?.name === 'ExitPromptError') return true

  return false
}

/**
 * Unified command error handler
 * Handles common error types: CommandExitError, ExitPromptError, and general errors
 *
 * ARCH-002: Uses exitProcess instead of direct process.exit for better testability.
 */
export function handleCommandError(error: unknown, commandName: string): never {
  // Handle structured exit codes
  if (isCommandExitError(error)) {
    exitProcess(error.exitCode)
  }

  // Handle user cancellation (Ctrl+C) gracefully
  if (isExitPromptError(error)) {
    cliOutput.print(chalk.gray(`\n${t('cli.cancelled')}`))
    exitProcess(0)
  }

  // Log and display general errors
  logger.error(`${commandName} command failed`, error instanceof Error ? error : undefined, {
    command: commandName,
  })
  cliOutput.error(chalk.red(`❌ ${t('cli.error')}`), error)
  exitProcess(1)
}

/**
 * Lazy service factory - creates services only when first accessed
 *
 * ARCH-001: This factory provides centralized dependency injection for CLI commands.
 * Design decisions:
 * - Lazy initialization: Services are only created when first accessed
 * - Singleton pattern: Once created, the same services are reused
 * - Async creation: Allows for async initialization (e.g., npmrc parsing)
 *
 * To add a new service:
 * 1. Add the service type to the Services interface
 * 2. Create the service instance in the get() method
 * 3. Add it to the returned services object
 *
 * For testing, use reset() to clear cached services, or inject mock services
 * via the static withServices() factory method.
 */
export class LazyServiceFactory {
  private services: Services | null = null
  private workspacePath?: string

  constructor(workspacePath?: string) {
    this.workspacePath = workspacePath
  }

  /**
   * Create a factory with pre-configured services (useful for testing)
   * ARCH-001: Enables dependency injection for testing without modifying production code
   */
  static withServices(services: Services): LazyServiceFactory {
    const factory = new LazyServiceFactory()
    factory.services = services
    return factory
  }

  /**
   * Get services, creating them lazily on first access (async for npmrc parsing)
   */
  async get(): Promise<Services> {
    if (!this.services) {
      const fileSystemService = new FileSystemService()
      const workspaceRepository = new FileWorkspaceRepository(fileSystemService)
      const catalogUpdateService = await CatalogUpdateService.createWithConfig(
        workspaceRepository,
        this.workspacePath
      )
      const workspaceService = new WorkspaceService(workspaceRepository)
      const packageManagerService = new PnpmPackageManagerService()

      this.services = {
        fileSystemService,
        workspaceRepository,
        catalogUpdateService,
        workspaceService,
        packageManagerService,
      }
    }
    return this.services
  }

  /**
   * Reset cached services (useful for testing)
   * ARCH-001: Allows test isolation by clearing singleton state
   */
  reset(): void {
    this.services = null
  }

  /**
   * Check if services have been initialized
   */
  isInitialized(): boolean {
    return this.services !== null
  }
}

/**
 * Factory function to create command action handlers
 * Eliminates repetitive boilerplate in command registration by providing:
 * - Unified error handling with handleCommandError
 * - Automatic globalOptions extraction
 * - Interactive mode detection and options collection
 * - Lazy service injection
 */
function createCommandAction<TOptions>(
  serviceFactory: LazyServiceFactory,
  config: CommandActionConfig<TOptions>,
  executor: (ctx: CommandContext<TOptions>) => Promise<void>
): (options: TOptions, command: Command) => Promise<void> {
  return async (options: TOptions, command: Command) => {
    try {
      const globalOptions = (command.parent?.opts() ?? {}) as GlobalOptions

      // Set logger to debug level when verbose mode is enabled
      if (globalOptions.verbose) {
        Logger.setGlobalLevel('debug')
      }

      let finalOptions = options

      // Handle interactive mode if collector is provided
      if (config.interactiveCollector) {
        const isCiMode = (globalOptions as Record<string, unknown>).ci === true
        const isInteractive = isCiMode
          ? false
          : (options as Record<string, unknown>).interactive === true
        const noMeaningfulOptions = !hasProvidedOptions(
          options as Record<string, unknown>,
          command,
          config.excludeFromCheck
        )

        if (isInteractive || noMeaningfulOptions) {
          const collected = await config.interactiveCollector({
            ...options,
            workspace: globalOptions.workspace,
          })
          finalOptions = { ...options, ...collected }
        }
      }

      // Get services only if needed (some commands like theme/init don't need them)
      const services =
        config.needsServices !== false ? await serviceFactory.get() : ({} as Services)

      await executor({ options: finalOptions, globalOptions, services })

      // Force exit if configured (for interactive commands that keep stdin open)
      // ARCH-002: Uses exitProcess for testability
      if (config.forceExit) {
        exitProcess(0)
      }
    } catch (error) {
      handleCommandError(error, config.name)
    }
  }
}

/**
 * Register all CLI commands
 * Uses lazy service factory to defer service instantiation until command execution
 */
export function registerCommands(
  program: Command,
  serviceFactory: LazyServiceFactory,
  packageJson: { version: string }
): void {
  // Global CI mode option - enables non-interactive mode with sensible defaults
  program
    .option(
      '--ci',
      'Enable CI mode for non-interactive execution. Skips all prompts and uses sensible defaults.',
      false
    )
    .hook('preAction', (thisCommand) => {
      const opts = thisCommand.opts()
      if (opts.ci) {
        // Force no color in CI mode for better compatibility
        opts.noColor = true
      }
    })

  // Check command
  program
    .command('check')
    .description(t('cli.description.check'))
    .option('-i, --interactive', t('cli.option.interactive'))
    .option('--catalog <name>', t('cli.option.catalog'))
    .addOption(
      new Option('-f, --format <type>', t('cli.option.format'))
        .choices(CLI_CHOICES.format)
        .default('table')
    )
    .addOption(
      new Option('-t, --target <type>', t('cli.option.target'))
        .choices(CLI_CHOICES.target)
        .default('latest')
    )
    .option('--prerelease', t('cli.option.prerelease'))
    .option('--include <pattern...>', t('cli.option.include'))
    .option('--exclude <pattern...>', t('cli.option.exclude'))
    .option('--exit-code', t('cli.option.exitCode'))
    .option('--no-security', t('cli.option.noSecurity'))
    .action(
      createCommandAction(
        serviceFactory,
        {
          name: 'check',
          interactiveCollector: (opts) => interactiveOptionsCollector.collectCheckOptions(opts),
          excludeFromCheck: ['interactive'],
        },
        async ({ options, globalOptions, services }) => {
          const checkCommand = new CheckCommand(services.catalogUpdateService)
          await checkCommand.execute({
            workspace: globalOptions.workspace,
            catalog: options.catalog,
            format: options.format,
            target: options.target,
            prerelease: options.prerelease,
            include: options.include ?? [],
            exclude: options.exclude ?? [],
            verbose: globalOptions.verbose,
            color: !globalOptions.noColor,
            exitCode: options.exitCode,
            noSecurity: options.security === false,
          })
        }
      )
    )

  // Update command
  program
    .command('update')
    .description(t('cli.description.update'))
    // Basic options
    .option('-i, --interactive', t('cli.option.interactive'))
    .option('-d, --dry-run', t('cli.option.dryRun'))
    .option('--force', t('cli.option.force'))
    .option('-b, --create-backup', t('cli.option.createBackup'), true)
    .option('--no-backup', t('cli.option.noBackup'))
    // Filter options
    .option('--catalog <name>', t('cli.option.catalog'))
    .option('--include <pattern...>', t('cli.option.include'))
    .option('--exclude <pattern...>', t('cli.option.exclude'))
    .addOption(
      new Option('-t, --target <type>', t('cli.option.target'))
        .choices(CLI_CHOICES.target)
        .default('latest')
    )
    .option('--prerelease', t('cli.option.prerelease'))
    // Output options
    .addOption(
      new Option('-f, --format <type>', t('cli.option.format'))
        .choices(CLI_CHOICES.format)
        .default('table')
    )
    .option('--changelog', t('cli.option.changelog'))
    .option('--no-changelog', t('cli.option.noChangelog'))
    // AI options (enabled by default)
    .option('--ai', t('cli.option.ai'), true)
    .option('--no-ai', t('cli.option.noAi'))
    .addOption(
      new Option('--provider <name>', t('cli.option.provider'))
        .choices(CLI_CHOICES.provider)
        .default('auto')
    )
    .addOption(
      new Option('--analysis-type <type>', t('cli.option.analysisType'))
        .choices(CLI_CHOICES.analysisType)
        .default('impact')
    )
    .option('--skip-cache', t('cli.option.skipCache'))
    // Post-update options
    .option('--install', t('cli.option.install'), true)
    .option('--no-install', t('cli.option.noInstall'))
    .option('--no-security', t('cli.option.noSecurity'))
    .addHelpText(
      'after',
      () => `
${t('cli.help.optionGroupsTitle')}
  ${t('cli.help.groupBasic')}    -i, -d, --force, -b
  ${t('cli.help.groupFilter')}   --catalog, --include, --exclude, -t, --prerelease
  ${t('cli.help.groupOutput')}   -f, --changelog
  ${t('cli.help.groupAI')}       --ai (default), --no-ai, --provider, --analysis-type, --skip-cache
  ${t('cli.help.groupInstall')}  --install, --no-security

${t('cli.help.tipLabel')} ${t('cli.help.tipContent', { locale: I18n.getLocale() })}
`
    )
    .action(
      createCommandAction(
        serviceFactory,
        {
          name: 'update',
          interactiveCollector: (opts) => interactiveOptionsCollector.collectUpdateOptions(opts),
          excludeFromCheck: ['interactive'],
          forceExit: true, // Interactive mode keeps stdin open
        },
        async ({ options, globalOptions, services }) => {
          const updateCommand = new UpdateCommand(
            services.catalogUpdateService,
            services.workspaceService,
            services.packageManagerService
          )
          await updateCommand.execute({
            workspace: globalOptions.workspace,
            catalog: options.catalog,
            format: options.format,
            target: options.target,
            interactive: options.interactive,
            dryRun: options.dryRun,
            force: options.force,
            prerelease: options.prerelease,
            include: options.include ?? [],
            exclude: options.exclude ?? [],
            createBackup: options.createBackup,
            verbose: globalOptions.verbose,
            color: !globalOptions.noColor,
            ai: parseBooleanFlag(options.ai),
            provider: options.provider,
            analysisType: options.analysisType as AnalysisType,
            skipCache: parseBooleanFlag(options.skipCache),
            install: options.install,
            changelog: options.changelog,
            noSecurity: options.security === false,
          })
        }
      )
    )

  // Analyze command
  program
    .command('analyze')
    .description(t('cli.description.analyze'))
    .argument('[package]', t('cli.argument.package'))
    .argument('[version]', t('cli.argument.version'))
    .option('--catalog <name>', t('cli.option.catalog'))
    .addOption(
      new Option('-f, --format <type>', t('cli.option.format'))
        .choices(CLI_CHOICES.format)
        .default('table')
    )
    .option('--no-ai', t('cli.option.noAi'))
    .addOption(
      new Option('--provider <name>', t('cli.option.provider'))
        .choices(CLI_CHOICES.provider)
        .default('auto')
    )
    .addOption(
      new Option('--analysis-type <type>', t('cli.option.analysisType'))
        .choices(CLI_CHOICES.analysisType)
        .default('impact')
    )
    .option('--skip-cache', t('cli.option.skipCache'))
    .action(async (packageName, version, options, command) => {
      try {
        const globalOptions = command.parent.opts()

        let finalPackageName = packageName
        let finalVersion = version
        let finalOptions = options

        // If no package name provided, enter interactive mode
        if (!packageName) {
          const collected = await interactiveOptionsCollector.collectAnalyzeOptions({
            ...options,
            workspace: globalOptions.workspace,
          })
          finalPackageName = collected.packageName
          finalVersion = collected.version
          finalOptions = { ...options, ...collected }
        }

        const services = await serviceFactory.get()
        const analyzeCommand = new AnalyzeCommand(
          services.catalogUpdateService,
          services.workspaceService
        )

        await analyzeCommand.execute(finalPackageName, finalVersion, {
          workspace: globalOptions.workspace,
          catalog: finalOptions.catalog,
          format: finalOptions.format,
          ai: finalOptions.ai,
          provider: finalOptions.provider,
          analysisType: finalOptions.analysisType as AnalysisType,
          skipCache: parseBooleanFlag(finalOptions.skipCache),
          verbose: globalOptions.verbose,
          color: !globalOptions.noColor,
        })
      } catch (error) {
        handleCommandError(error, 'analyze')
      }
    })

  // Workspace command
  program
    .command('workspace')
    .description(t('cli.description.workspace'))
    .option('--validate', t('cli.option.validate'))
    .option('--info', t('cli.option.stats'))
    .addOption(
      new Option('-f, --format <type>', t('cli.option.format'))
        .choices(CLI_CHOICES.format)
        .default('table')
    )
    .action(
      createCommandAction(
        serviceFactory,
        {
          name: 'workspace',
          interactiveCollector: (opts) => interactiveOptionsCollector.collectWorkspaceOptions(opts),
        },
        async ({ options, globalOptions, services }) => {
          const workspaceCommand = new WorkspaceCommand(services.workspaceService)
          await workspaceCommand.execute({
            workspace: globalOptions.workspace,
            validate: options.validate,
            stats: options.info,
            format: options.format,
            verbose: globalOptions.verbose,
            color: !globalOptions.noColor,
          })
        }
      )
    )

  // Theme command
  program
    .command('theme')
    .description(t('cli.description.theme'))
    .option('-s, --set <theme>', t('cli.option.setTheme'))
    .option('-l, --list', t('cli.option.listThemes'))
    .option('-i, --interactive', t('cli.option.interactive'))
    .action(
      createCommandAction(
        serviceFactory,
        {
          name: 'theme',
          needsServices: false,
          interactiveCollector: (opts) => interactiveOptionsCollector.collectThemeOptions(opts),
          forceExit: true, // Interactive mode keeps stdin open
        },
        async ({ options }) => {
          const themeCommand = new ThemeCommand()
          await themeCommand.execute({
            set: options.set,
            list: options.list,
            interactive: options.interactive,
          })
        }
      )
    )

  // Security command
  program
    .command('security')
    .description(t('cli.description.security'))
    .addOption(
      new Option('-f, --format <type>', t('cli.option.format'))
        .choices(CLI_CHOICES.format)
        .default('table')
    )
    .option('--audit', t('cli.option.audit'), true)
    .option('--fix-vulns', t('cli.option.fixVulns'))
    .addOption(
      new Option('--severity <level>', t('cli.option.severity')).choices(CLI_CHOICES.severity)
    )
    .option('--include-dev', t('cli.option.includeDev'))
    .option('--snyk', t('cli.option.snyk'))
    .action(
      createCommandAction(
        serviceFactory,
        {
          name: 'security',
          needsServices: false, // Uses custom formatter instead
          interactiveCollector: (opts) => interactiveOptionsCollector.collectSecurityOptions(opts),
        },
        async ({ options, globalOptions }) => {
          const formatter = new OutputFormatter(
            options.format as OutputFormat,
            !globalOptions.noColor
          )
          const securityCommand = new SecurityCommand(formatter)
          await securityCommand.execute({
            workspace: globalOptions.workspace,
            format: options.format,
            audit: options.audit,
            fixVulns: options.fixVulns,
            severity: options.severity,
            includeDev: options.includeDev,
            snyk: options.snyk,
            verbose: globalOptions.verbose,
            color: !globalOptions.noColor,
          })
        }
      )
    )

  // Init command
  program
    .command('init')
    .description(t('cli.description.init'))
    .option('--force', t('cli.option.forceOverwrite'))
    .option('--full', t('cli.option.full'))
    .option('--create-workspace', t('cli.option.createWorkspace'), true)
    .option('--no-create-workspace', t('cli.option.noCreateWorkspace'))
    .addOption(
      new Option('-f, --format <type>', t('cli.option.format'))
        .choices(CLI_CHOICES.format)
        .default('table')
    )
    .action(
      createCommandAction(
        serviceFactory,
        {
          name: 'init',
          needsServices: false,
          interactiveCollector: (opts) => interactiveOptionsCollector.collectInitOptions(opts),
        },
        async ({ options, globalOptions }) => {
          const initCommand = new InitCommand()
          await initCommand.execute({
            workspace: globalOptions.workspace,
            force: options.force,
            full: options.full,
            createWorkspace: options.createWorkspace,
            verbose: globalOptions.verbose,
            color: !globalOptions.noColor,
          })
        }
      )
    )

  // Rollback command
  program
    .command('rollback')
    .description(t('cli.description.rollback'))
    .option('-l, --list', t('cli.option.listBackups'))
    .option('--latest', t('cli.option.restoreLatest'))
    .option('--delete-all', t('cli.option.deleteAllBackups'))
    .action(
      createCommandAction(
        serviceFactory,
        {
          name: 'rollback',
          needsServices: false,
          interactiveCollector: (opts) => interactiveOptionsCollector.collectRollbackOptions(opts),
        },
        async ({ options, globalOptions }) => {
          const rollbackCommand = new RollbackCommand()
          await rollbackCommand.execute({
            workspace: globalOptions.workspace,
            list: options.list,
            latest: options.latest,
            deleteAll: options.deleteAll,
            verbose: globalOptions.verbose,
            color: !globalOptions.noColor,
          })
        }
      )
    )

  // Graph command - dependency visualization
  program
    .command('graph')
    .description(t('cli.description.graph'))
    .addOption(
      new Option('-f, --format <type>', t('cli.option.graphFormat'))
        .choices(['text', 'mermaid', 'dot', 'json'])
        .default('text')
    )
    .addOption(
      new Option('-t, --type <type>', t('cli.option.graphType'))
        .choices(['catalog', 'package', 'full'])
        .default('catalog')
    )
    .option('--catalog <name>', t('cli.option.catalog'))
    .action(
      createCommandAction(
        serviceFactory,
        {
          name: 'graph',
        },
        async ({ options, globalOptions, services }) => {
          const graphCommand = new GraphCommand(services.workspaceService)
          await graphCommand.execute({
            workspace: globalOptions.workspace,
            format: options.format,
            type: options.type,
            catalog: options.catalog,
            verbose: globalOptions.verbose,
            color: !globalOptions.noColor,
          })
        }
      )
    )

  // AI command - check AI provider status
  program
    .command('ai')
    .description(t('cli.description.ai'))
    .option('--status', t('cli.option.aiStatus'), true)
    .option('--test', t('cli.option.aiTest'))
    .option('--cache-stats', t('cli.option.aiCacheStats'))
    .option('--clear-cache', t('cli.option.aiClearCache'))
    .action(
      createCommandAction(
        serviceFactory,
        {
          name: 'ai',
          needsServices: false,
        },
        async ({ options }) => {
          const aiCommand = new AiCommand()
          await aiCommand.execute({
            status: options.status,
            test: options.test,
            cacheStats: options.cacheStats,
            clearCache: options.clearCache,
          })
        }
      )
    )

  // Upgrade command (self-update)
  program
    .command('upgrade')
    .description(t('cli.description.selfUpdate'))
    .action(
      createCommandAction(
        serviceFactory,
        {
          name: 'upgrade',
          needsServices: false,
        },
        async ({ globalOptions }) => {
          cliOutput.print(chalk.cyan(t('command.selfUpdate.checking')))

          try {
            const versionResult = await VersionChecker.checkVersion(packageJson.version, {
              skipPrompt: true,
              timeout: 10000, // Longer timeout for explicit update
            })

            if (versionResult.isLatest) {
              cliOutput.print(
                chalk.green(
                  t('command.selfUpdate.latestAlready', { version: versionResult.currentVersion })
                )
              )
              return
            }

            // User explicitly requested update, so perform it
            cliOutput.print(
              chalk.blue(t('command.selfUpdate.updating', { version: versionResult.latestVersion }))
            )

            const success = await VersionChecker.performUpdateAction()
            if (success) {
              cliOutput.print(
                chalk.green(
                  t('command.selfUpdate.success', { version: versionResult.latestVersion })
                )
              )
              cliOutput.print(chalk.gray(t('command.selfUpdate.restartHint')))
            } else {
              cliOutput.error(chalk.red(t('command.selfUpdate.failed')))
              cliOutput.print(chalk.gray(t('command.selfUpdate.manualHint')))
              exitProcess(1)
            }
          } catch (error) {
            cliOutput.error(chalk.red(t('command.selfUpdate.failed')))
            if (globalOptions.verbose) {
              cliOutput.error(error)
            }
            cliOutput.print(chalk.gray(t('command.selfUpdate.manualHint')))
            exitProcess(1)
          }
        }
      )
    )
}

// Re-export I18n for use in update command help text
import { I18n } from '@pcu/utils'

export { I18n }
