/**
 * Interactive Prompts
 *
 * Provides smart prompts and auto-completion for CLI commands
 */

import chalk from 'chalk';
import inquirer from 'inquirer';
import { FileSystemService } from '../../infrastructure/file-system/FileSystemService.js';
import { StyledText } from '../themes/ColorTheme.js';

export interface AutoCompleteOption {
  name: string;
  value: string;
  description?: string;
}

export class InteractivePrompts {
  private fsService: FileSystemService;

  constructor() {
    this.fsService = new FileSystemService();
  }

  /**
   * Interactive package selection with search
   */
  async selectPackages(
    packages: Array<{ name: string; current: string; latest: string; type: string }>
  ): Promise<string[]> {
    if (packages.length === 0) {
      return [];
    }

    const choices = packages.map((pkg) => ({
      name: this.formatPackageChoice(pkg),
      value: pkg.name,
      checked: false,
    }));

    const answers = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'selectedPackages',
        message: StyledText.iconPackage('Select packages to update:'),
        choices,
        pageSize: 15,
        validate: (input: string[]) => input.length > 0 || 'Please select at least one package',
      },
    ]);

    return answers.selectedPackages;
  }

  /**
   * Interactive catalog selection
   */
  async selectCatalog(catalogs: string[]): Promise<string | null> {
    if (catalogs.length === 0) {
      return null;
    }

    if (catalogs.length === 1) {
      return catalogs[0] ?? null;
    }

    const choices = [
      { name: 'All catalogs', value: 'all' },
      ...catalogs.map((name) => ({ name, value: name })),
    ];

    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'catalog',
        message: StyledText.iconCatalog('Select catalog to update:'),
        choices,
        pageSize: 10,
      },
    ]);

    return answers.catalog === 'all' ? null : answers.catalog;
  }

  /**
   * Update strategy selection
   */
  async selectUpdateStrategy(): Promise<string> {
    const strategies = [
      { name: 'Latest (recommended)', value: 'latest' },
      { name: 'Greatest (highest version)', value: 'greatest' },
      { name: 'Minor (non-breaking)', value: 'minor' },
      { name: 'Patch (bug fixes only)', value: 'patch' },
      { name: 'Newest (latest release)', value: 'newest' },
    ];

    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'strategy',
        message: StyledText.iconUpdate('Select update strategy:'),
        choices: strategies,
      },
    ]);

    return answers.strategy;
  }

  /**
   * Confirm dangerous operations
   */
  async confirmDangerousOperation(operation: string, details?: string): Promise<boolean> {
    console.log('');
    if (details) {
      console.log(chalk.yellow('⚠️  Warning:'), details);
    }

    const answers = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirmed',
        message: StyledText.warning(`Are you sure you want to ${operation}?`),
        default: false,
      },
    ]);

    return answers.confirmed;
  }

  /**
   * Auto-complete for package names
   */
  async autoCompletePackage(
    packages: string[],
    message: string = 'Select package:'
  ): Promise<string> {
    const answers = await inquirer.prompt([
      {
        type: 'autocomplete',
        name: 'package',
        message,
        source: async (_answersSoFar: any, input: string) => {
          input = input || '';
          return packages
            .filter((pkg) => pkg.toLowerCase().includes(input.toLowerCase()))
            .map((pkg) => ({ name: pkg, value: pkg }));
        },
        pageSize: 10,
      },
    ]);

    return answers.package;
  }

  /**
   * Workspace path selection with auto-complete
   */
  async selectWorkspacePath(): Promise<string> {
    const currentDir = process.cwd();
    const choices = [
      { name: `Current directory (${currentDir})`, value: currentDir },
      { name: 'Browse for directory...', value: 'browse' },
    ];

    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'path',
        message: StyledText.icon('📁', 'Select workspace directory:'),
        choices,
      },
    ]);

    if (answers.path === 'browse') {
      return this.browseDirectory();
    }

    return answers.path;
  }

  /**
   * Browse directory structure
   */
  private async browseDirectory(currentPath = process.cwd()): Promise<string> {
    const directoryNames = await this.fsService.listDirectories(currentPath);
    const choices = [
      { name: '.. (parent directory)', value: '..' },
      { name: `. (current: ${currentPath})`, value: '.' },
      ...directoryNames.map((name: string) => ({
        name: `📁 ${name}`,
        value: `${currentPath}/${name}`,
      })),
    ];

    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'selected',
        message: `Browse: ${currentPath}`,
        choices,
        pageSize: 15,
      },
    ]);

    if (answers.selected === '.') {
      return currentPath;
    }

    if (answers.selected === '..') {
      const parent = currentPath.split('/').slice(0, -1).join('/') || '/';
      return this.browseDirectory(parent);
    }

    // Check if this directory contains a pnpm workspace
    const workspaceFiles = ['pnpm-workspace.yaml', 'pnpm-workspace.yml'];
    let hasWorkspace = false;
    for (const file of workspaceFiles) {
      if (await this.fsService.exists(`${answers.selected}/${file}`)) {
        hasWorkspace = true;
        break;
      }
    }

    if (hasWorkspace) {
      const confirm = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'useThis',
          message: `Use ${answers.selected} as workspace?`,
          default: true,
        },
      ]);

      if (confirm.useThis) {
        return answers.selected;
      }
    }

    return this.browseDirectory(answers.selected);
  }

  /**
   * Multi-step configuration wizard
   */
  async configurationWizard(): Promise<any> {
    console.log(chalk.bold.blue('\n🧙‍♂️ Configuration Wizard\n'));

    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'theme',
        message: 'Select color theme:',
        choices: [
          { name: 'Default - Balanced colors', value: 'default' },
          { name: 'Modern - Vibrant colors', value: 'modern' },
          { name: 'Minimal - Clean and simple', value: 'minimal' },
          { name: 'Neon - High contrast', value: 'neon' },
        ],
        default: 'default',
      },
      {
        type: 'confirm',
        name: 'interactive',
        message: 'Enable interactive mode by default?',
        default: true,
      },
      {
        type: 'confirm',
        name: 'backup',
        message: 'Create backups before updates?',
        default: true,
      },
      {
        type: 'list',
        name: 'updateStrategy',
        message: 'Default update strategy:',
        choices: [
          { name: 'Latest stable versions', value: 'latest' },
          { name: 'Minor updates (non-breaking)', value: 'minor' },
          { name: 'Patch updates (bug fixes)', value: 'patch' },
        ],
        default: 'latest',
      },
      {
        type: 'number',
        name: 'timeout',
        message: 'Network timeout (seconds):',
        default: 30,
        validate: (input: number) => input > 0 || 'Timeout must be positive',
      },
    ]);

    return answers;
  }

  /**
   * Impact preview before update
   */
  async previewImpact(impact: any): Promise<boolean> {
    console.log(chalk.bold.blue('\n📊 Impact Preview\n'));

    // Display impact summary
    console.log(`Packages to update: ${impact.totalUpdates}`);
    console.log(`Risk level: ${impact.riskLevel}`);
    console.log(`Affected packages: ${impact.affectedCount}`);

    if (impact.securityUpdates > 0) {
      console.log(StyledText.iconSecurity(`${impact.securityUpdates} security updates`));
    }

    console.log('');

    const answers = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'proceed',
        message: 'Proceed with update?',
        default: true,
      },
    ]);

    return answers.proceed;
  }

  /**
   * Error recovery options
   */
  async errorRecoveryOptions(error: string): Promise<string> {
    const options = [
      { name: 'Retry operation', value: 'retry' },
      { name: 'Skip this package', value: 'skip' },
      { name: 'Continue with remaining', value: 'continue' },
      { name: 'Abort operation', value: 'abort' },
    ];

    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: StyledText.iconError(`Error: ${error}`),
        choices: options,
      },
    ]);

    return answers.action;
  }

  /**
   * Format package choice for display
   */
  private formatPackageChoice(pkg: any): string {
    const updateTypeColor: Record<string, any> = {
      major: chalk.red,
      minor: chalk.yellow,
      patch: chalk.green,
    };

    const typeColor = updateTypeColor[pkg.type] || chalk.gray;

    return `${pkg.name} ${chalk.dim(pkg.current)} → ${typeColor(pkg.latest)} ${chalk.dim(`(${pkg.type})`)}`;
  }
}

/**
 * Auto-completion utilities
 */
export class AutoCompleteManager {
  static async suggestWorkspaces(current: string): Promise<string[]> {
    const suggestions: string[] = [];

    // Common workspace patterns
    const patterns = [
      'pnpm-workspace.yaml',
      'pnpm-workspace.yml',
      '**/*/pnpm-workspace.yaml',
      '**/*/pnpm-workspace.yml',
    ];

    for (const pattern of patterns) {
      try {
        const { glob } = await import('glob');
        const matches = await glob(pattern);
        matches.forEach((match: string) => {
          const dir = match.replace(/\/pnpm-workspace\.ya?ml$/, '');
          if (!suggestions.includes(dir)) {
            suggestions.push(dir);
          }
        });
      } catch {
        // Ignore errors
      }
    }

    return suggestions.filter((s) => s.toLowerCase().includes(current.toLowerCase()));
  }

  static async suggestCatalogs(): Promise<string[]> {
    return [];
  }

  static async suggestPackages(): Promise<string[]> {
    return [];
  }
}

/**
 * Interactive command builder
 */
export class InteractiveCommandBuilder {
  static async buildCommand(): Promise<{
    command: string;
    options: Record<string, any>;
  }> {
    const baseCommand = await inquirer.prompt([
      {
        type: 'list',
        name: 'command',
        message: 'What would you like to do?',
        choices: [
          { name: 'Check for updates', value: 'check' },
          { name: 'Update dependencies', value: 'update' },
          { name: 'Analyze impact', value: 'analyze' },
          { name: 'Show workspace info', value: 'workspace' },
        ],
      },
    ]);

    const options: Record<string, any> = {};

    // Common options
    const common = await inquirer.prompt([
      {
        type: 'list',
        name: 'format',
        message: 'Output format:',
        choices: [
          { name: 'Table (rich)', value: 'table' },
          { name: 'JSON', value: 'json' },
          { name: 'YAML', value: 'yaml' },
          { name: 'Minimal', value: 'minimal' },
        ],
        default: 'table',
      },
    ]);

    options.format = common.format;

    // Command-specific options
    switch (baseCommand.command) {
      case 'update':
        const updateOpts = await inquirer.prompt([
          {
            type: 'confirm',
            name: 'interactive',
            message: 'Interactive mode?',
            default: true,
          },
          {
            type: 'confirm',
            name: 'dryRun',
            message: 'Dry run mode?',
            default: false,
          },
          {
            type: 'confirm',
            name: 'backup',
            message: 'Create backup?',
            default: true,
          },
        ]);
        Object.assign(options, updateOpts);
        break;

      case 'check':
        const checkOpts = await inquirer.prompt([
          {
            type: 'confirm',
            name: 'includePrerelease',
            message: 'Include pre-release versions?',
            default: false,
          },
        ]);
        options.prerelease = checkOpts.includePrerelease;
        break;
    }

    return {
      command: baseCommand.command,
      options,
    };
  }
}
