#!/usr/bin/env node

/**
 * pnpm-catalog-updates CLI Entry Point
 *
 * A CLI tool for checking and updating pnpm workspace catalog dependencies.
 * This is the main entry point that handles command parsing and execution.
 */

import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { startCacheInitialization } from '@pcu/core'
import {
  ConfigLoader,
  I18n,
  isCommandExitError,
  Logger,
  logger,
  preloadPackageSuggestions,
  t,
  VersionChecker,
} from '@pcu/utils'
import chalk from 'chalk'
import { Command } from 'commander'
import { isExitPromptError, LazyServiceFactory, registerCommands } from './commandRegistrar.js'
import { cliOutput } from './utils/cliOutput.js'

// Only read when version info is actually needed
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

let _packageJson: { version: string; name: string } | null = null
function getPackageJson(): { version: string; name: string } {
  if (!_packageJson) {
    _packageJson = JSON.parse(readFileSync(join(__dirname, '../package.json'), 'utf-8'))
  }
  return _packageJson!
}

/**
 * Exit with proper logger cleanup
 *
 * Ensures all log messages are flushed and file handles are closed
 * before process exit to prevent log data loss.
 */
function exitWithCleanup(code: number): never {
  // Synchronously close all loggers to ensure logs are written
  Logger.closeAll()
  process.exit(code)
}

/**
 * Check for version updates at startup (non-blocking background check)
 *
 * Runs version check in background to avoid blocking CLI startup.
 * Only notifies user after command execution if an update is available.
 */
function startBackgroundVersionCheck(
  config: Awaited<ReturnType<typeof ConfigLoader.loadConfig>>
): Promise<{ hasUpdate: boolean; message?: string }> | null {
  if (!VersionChecker.shouldCheckForUpdates() || config.advanced?.checkForUpdates === false) {
    return null
  }

  // Start check in background, don't await
  return VersionChecker.checkVersion(getPackageJson().version, {
    skipPrompt: true, // Don't prompt during background check
    timeout: 3000,
  })
    .then((result) => {
      if (result.shouldPrompt && result.latestVersion) {
        return {
          hasUpdate: true,
          message: chalk.yellow(
            `\n${t('cli.updateAvailable', { current: getPackageJson().version, latest: result.latestVersion })}`
          ),
        }
      }
      return { hasUpdate: false }
    })
    .catch((error) => {
      logger.debug('Background version check failed', {
        error: error instanceof Error ? error.message : error,
      })
      return { hasUpdate: false }
    })
}

function isAutomationInvocation(args: string[]): boolean {
  if (args.includes('--ci')) return true
  return args.some((argument) => ['plan', 'apply', 'verify'].includes(argument))
}

/**
 * Show update notification after command execution if available
 */
async function showUpdateNotificationIfAvailable(
  checkPromise: Promise<{ hasUpdate: boolean; message?: string }> | null
): Promise<void> {
  if (!checkPromise) return

  try {
    const result = await checkPromise
    if (result.hasUpdate && result.message) {
      cliOutput.print(result.message)
      cliOutput.print(chalk.gray(t('cli.updateHint')))
    }
  } catch (error) {
    // Update check is best-effort, log at debug level for troubleshooting
    logger.debug('Version update check failed', {
      error: error instanceof Error ? error.message : String(error),
    })
  }
}

/**
 * Handle custom --version with update checking
 */
async function handleVersionFlag(
  args: string[],
  config: Awaited<ReturnType<typeof ConfigLoader.loadConfig>>
): Promise<void> {
  if (!args.includes('--version')) return

  const pkg = getPackageJson()
  const version = pkg.version

  // Check for updates if not in CI and enabled in config
  if (VersionChecker.shouldCheckForUpdates() && config.advanced?.checkForUpdates !== false) {
    try {
      // Show version with checking status on same line
      process.stdout.write(
        `${chalk.cyan('pcu')} ${chalk.bold(`v${version}`)} ${chalk.gray(t('cli.checkingUpdates'))}`
      )

      const versionResult = await VersionChecker.checkVersion(version, {
        skipPrompt: false,
        timeout: 5000,
      })

      // Clear the checking message and show final result
      process.stdout.write('\r\x1b[K') // Clear current line

      if (versionResult.shouldPrompt && versionResult.latestVersion) {
        cliOutput.print(
          `${chalk.cyan('pcu')} ${chalk.bold(`v${version}`)} ${chalk.yellow(`-> v${versionResult.latestVersion} ${t('cli.available')}`)}`
        )
        const didUpdate = await VersionChecker.promptAndUpdate(versionResult)
        if (didUpdate) {
          cliOutput.print(chalk.blue(t('cli.runAgain')))
          exitWithCleanup(0)
        }
      } else {
        cliOutput.print(
          `${chalk.cyan('pcu')} ${chalk.bold(`v${version}`)} ${chalk.green(t('cli.latestVersion'))}`
        )
      }
    } catch (error) {
      // Clear line and show version without update status
      process.stdout.write('\r\x1b[K')
      cliOutput.print(`${chalk.cyan('pcu')} ${chalk.bold(`v${version}`)}`)

      logger.debug('Version flag update check failed', {
        error: error instanceof Error ? error.message : error,
      })
      if (args.includes('-v') || args.includes('--verbose')) {
        cliOutput.warn(chalk.yellow(`  ${t('cli.couldNotCheckUpdates')}`), error)
      }
    }
  } else {
    // No update check, just show version
    cliOutput.print(`${chalk.cyan('pcu')} ${chalk.bold(`v${version}`)}`)
  }

  exitWithCleanup(0)
}

/**
 * Main CLI function
 */
export async function main(): Promise<void> {
  const program = new Command()

  // Parse arguments first to get workspace path
  let workspacePath: string | undefined

  // Extract workspace path from arguments for service creation
  const workspaceIndex = process.argv.findIndex((arg) => arg === '-w' || arg === '--workspace')
  if (workspaceIndex !== -1 && workspaceIndex + 1 < process.argv.length) {
    workspacePath = process.argv[workspaceIndex + 1]
  }

  // Load configuration to check if version updates are enabled
  const config = await ConfigLoader.loadConfig(workspacePath || process.cwd())

  // Initialize i18n with config locale (priority: config > env > system)
  I18n.init(config.locale)

  // Start cache initialization in background (non-blocking)
  // This allows the cache to load from disk while CLI continues startup
  startCacheInitialization()

  // PERF-001: Preload package suggestions in background (non-blocking)
  // This loads the suggestions file asynchronously during CLI startup
  preloadPackageSuggestions()

  // Start background version check (non-blocking)
  const versionCheckPromise = isAutomationInvocation(process.argv)
    ? null
    : startBackgroundVersionCheck(config)

  // Create lazy service factory - services will only be instantiated when actually needed
  // This means --help and --version won't trigger service creation
  const serviceFactory = new LazyServiceFactory(workspacePath)

  // Configure the main command
  program
    .name('pcu')
    .description(t('cli.description.main'))
    .helpCommand(t('cli.help.command'), t('cli.help.description'))
    .helpOption('-h, --help', t('cli.help.option'))
    .option('--version', t('cli.option.version'))
    .option('-v, --verbose', t('cli.option.verbose'))
    .option('-w, --workspace <path>', t('cli.option.workspace'))
    .option('--no-color', t('cli.option.noColor'))

  // Register all commands with lazy service factory
  registerCommands(program, serviceFactory, getPackageJson())

  // Show help if no arguments provided
  if (process.argv.length <= 2) {
    program.help()
  }

  // Handle custom --version with update checking
  await handleVersionFlag(process.argv, config)

  // Parse command line arguments
  try {
    await program.parseAsync(process.argv)

    // Show update notification after successful command execution
    await showUpdateNotificationIfAvailable(versionCheckPromise)
  } catch (error) {
    if (isCommandExitError(error)) {
      exitWithCleanup(error.exitCode)
    }
    // Handle user cancellation (Ctrl+C) gracefully
    if (isExitPromptError(error)) {
      cliOutput.print(chalk.gray(`\n${t('cli.cancelled')}`))
      exitWithCleanup(0)
    }
    logger.error('CLI parse error', error instanceof Error ? error : undefined, {
      args: process.argv,
    })
    cliOutput.error(chalk.red(`❌ ${t('cli.unexpectedError')}`), error)
    if (error instanceof Error && error.stack) {
      cliOutput.error(chalk.gray(error.stack))
    }
    exitWithCleanup(1)
  }
}

// Run the CLI if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    if (isCommandExitError(error)) {
      exitWithCleanup(error.exitCode)
    }
    // Handle user cancellation (Ctrl+C) gracefully
    if (isExitPromptError(error)) {
      cliOutput.print(chalk.gray(`\n${t('cli.cancelled')}`))
      exitWithCleanup(0)
    }
    logger.error('Fatal CLI error', error instanceof Error ? error : undefined)
    cliOutput.error(chalk.red(`❌ ${t('cli.fatalError')}`), error)
    exitWithCleanup(1)
  })
}
