/**
 * Global CLI Options
 * 
 * Defines standardized option definitions for all CLI commands.
 * Provides consistent option parsing and validation.
 */

import { Option } from 'commander';

export interface GlobalCliOptions {
  workspace?: string;
  verbose?: boolean;
  color?: boolean;
  registry?: string;
  timeout?: number;
  config?: string;
}

export interface CheckCliOptions extends GlobalCliOptions {
  catalog?: string;
  format?: 'table' | 'json' | 'yaml' | 'minimal';
  target?: 'latest' | 'greatest' | 'minor' | 'patch' | 'newest';
  prerelease?: boolean;
  include?: string[];
  exclude?: string[];
}

export interface UpdateCliOptions extends CheckCliOptions {
  interactive?: boolean;
  dryRun?: boolean;
  force?: boolean;
  createBackup?: boolean;
}

export interface AnalyzeCliOptions extends GlobalCliOptions {
  format?: 'table' | 'json' | 'yaml' | 'minimal';
}

export interface WorkspaceCliOptions extends GlobalCliOptions {
  validate?: boolean;
  stats?: boolean;
  info?: boolean;
  format?: 'table' | 'json' | 'yaml' | 'minimal';
}

/**
 * Global options available to all commands
 */
export const globalOptions = [
  new Option('-w, --workspace <path>', 'workspace directory path')
    .env('PCU_WORKSPACE'),
  
  new Option('-v, --verbose', 'enable verbose logging')
    .env('PCU_VERBOSE'),
  
  new Option('--no-color', 'disable colored output')
    .env('PCU_NO_COLOR'),
  
  new Option('--registry <url>', 'NPM registry URL')
    .env('PCU_REGISTRY'),
  
  new Option('--timeout <ms>', 'request timeout in milliseconds')
    .argParser(parseInt)
    .env('PCU_TIMEOUT'),
  
  new Option('--config <path>', 'path to configuration file')
    .env('PCU_CONFIG'),
];

/**
 * Check command specific options
 */
export const checkOptions = [
  ...globalOptions,
  
  new Option('--catalog <name>', 'check specific catalog only')
    .env('PCU_CATALOG'),
  
  new Option('-f, --format <type>', 'output format')
    .choices(['table', 'json', 'yaml', 'minimal'])
    .default('table')
    .env('PCU_OUTPUT_FORMAT'),
  
  new Option('-t, --target <type>', 'update target')
    .choices(['latest', 'greatest', 'minor', 'patch', 'newest'])
    .default('latest')
    .env('PCU_UPDATE_TARGET'),
  
  new Option('--prerelease', 'include prerelease versions')
    .env('PCU_PRERELEASE'),
  
  new Option('--include <pattern...>', 'include packages matching pattern')
    .env('PCU_INCLUDE'),
  
  new Option('--exclude <pattern...>', 'exclude packages matching pattern')
    .env('PCU_EXCLUDE'),
];

/**
 * Update command specific options
 */
export const updateOptions = [
  ...checkOptions,
  
  new Option('-i, --interactive', 'interactive mode to choose updates')
    .env('PCU_INTERACTIVE'),
  
  new Option('-d, --dry-run', 'preview changes without writing files')
    .env('PCU_DRY_RUN'),
  
  new Option('--force', 'force updates even if risky')
    .env('PCU_FORCE'),
  
  new Option('--create-backup', 'create backup files before updating')
    .env('PCU_CREATE_BACKUP'),
];

/**
 * Analyze command specific options
 */
export const analyzeOptions = [
  ...globalOptions,
  
  new Option('-f, --format <type>', 'output format')
    .choices(['table', 'json', 'yaml', 'minimal'])
    .default('table')
    .env('PCU_OUTPUT_FORMAT'),
];

/**
 * Workspace command specific options
 */
export const workspaceOptions = [
  ...globalOptions,
  
  new Option('--validate', 'validate workspace configuration'),
  
  new Option('--stats', 'show workspace statistics'),
  
  new Option('--info', 'show workspace information'),
  
  new Option('-f, --format <type>', 'output format')
    .choices(['table', 'json', 'yaml', 'minimal'])
    .default('table')
    .env('PCU_OUTPUT_FORMAT'),
];

/**
 * Option groups for better help organization
 */
export const optionGroups = {
  global: {
    title: 'Global Options',
    options: globalOptions,
  },
  output: {
    title: 'Output Options',
    options: [
      new Option('-f, --format <type>', 'output format')
        .choices(['table', 'json', 'yaml', 'minimal'])
        .default('table'),
      new Option('--no-color', 'disable colored output'),
      new Option('-v, --verbose', 'enable verbose logging'),
    ],
  },
  filtering: {
    title: 'Filtering Options',
    options: [
      new Option('--catalog <name>', 'check specific catalog only'),
      new Option('--include <pattern...>', 'include packages matching pattern'),
      new Option('--exclude <pattern...>', 'exclude packages matching pattern'),
    ],
  },
  update: {
    title: 'Update Options',
    options: [
      new Option('-t, --target <type>', 'update target')
        .choices(['latest', 'greatest', 'minor', 'patch', 'newest'])
        .default('latest'),
      new Option('--prerelease', 'include prerelease versions'),
      new Option('-i, --interactive', 'interactive mode'),
      new Option('-d, --dry-run', 'preview changes only'),
      new Option('--force', 'force updates'),
      new Option('--create-backup', 'create backup files'),
    ],
  },
  registry: {
    title: 'Registry Options',
    options: [
      new Option('--registry <url>', 'NPM registry URL'),
      new Option('--timeout <ms>', 'request timeout')
        .argParser(parseInt),
    ],
  },
};

/**
 * Utility functions for option handling
 */
export class OptionUtils {
  /**
   * Parse and validate global options
   */
  static parseGlobalOptions(options: any): GlobalCliOptions {
    const parsed: GlobalCliOptions = {};

    if (options.workspace) {
      parsed.workspace = String(options.workspace).trim();
    }

    if (options.verbose !== undefined) {
      parsed.verbose = Boolean(options.verbose);
    }

    if (options.color !== undefined) {
      parsed.color = Boolean(options.color);
    }

    if (options.registry) {
      parsed.registry = String(options.registry).trim();
    }

    if (options.timeout) {
      const timeout = parseInt(String(options.timeout), 10);
      if (!isNaN(timeout) && timeout > 0) {
        parsed.timeout = timeout;
      }
    }

    if (options.config) {
      parsed.config = String(options.config).trim();
    }

    return parsed;
  }

  /**
   * Parse check command options
   */
  static parseCheckOptions(options: any): CheckCliOptions {
    const global = this.parseGlobalOptions(options);
    const check: CheckCliOptions = { ...global };

    if (options.catalog) {
      check.catalog = String(options.catalog).trim();
    }

    if (options.format) {
      check.format = options.format as CheckCliOptions['format'];
    }

    if (options.target) {
      check.target = options.target as CheckCliOptions['target'];
    }

    if (options.prerelease !== undefined) {
      check.prerelease = Boolean(options.prerelease);
    }

    if (options.include) {
      check.include = Array.isArray(options.include) 
        ? options.include.map((p: any) => String(p).trim()).filter(Boolean)
        : [String(options.include).trim()].filter(Boolean);
    }

    if (options.exclude) {
      check.exclude = Array.isArray(options.exclude) 
        ? options.exclude.map((p: any) => String(p).trim()).filter(Boolean)
        : [String(options.exclude).trim()].filter(Boolean);
    }

    return check;
  }

  /**
   * Parse update command options
   */
  static parseUpdateOptions(options: any): UpdateCliOptions {
    const check = this.parseCheckOptions(options);
    const update: UpdateCliOptions = { ...check };

    if (options.interactive !== undefined) {
      update.interactive = Boolean(options.interactive);
    }

    if (options.dryRun !== undefined) {
      update.dryRun = Boolean(options.dryRun);
    }

    if (options.force !== undefined) {
      update.force = Boolean(options.force);
    }

    if (options.createBackup !== undefined) {
      update.createBackup = Boolean(options.createBackup);
    }

    return update;
  }

  /**
   * Parse analyze command options
   */
  static parseAnalyzeOptions(options: any): AnalyzeCliOptions {
    const global = this.parseGlobalOptions(options);
    const analyze: AnalyzeCliOptions = { ...global };

    if (options.format) {
      analyze.format = options.format as AnalyzeCliOptions['format'];
    }

    return analyze;
  }

  /**
   * Parse workspace command options
   */
  static parseWorkspaceOptions(options: any): WorkspaceCliOptions {
    const global = this.parseGlobalOptions(options);
    const workspace: WorkspaceCliOptions = { ...global };

    if (options.validate !== undefined) {
      workspace.validate = Boolean(options.validate);
    }

    if (options.stats !== undefined) {
      workspace.stats = Boolean(options.stats);
    }

    if (options.info !== undefined) {
      workspace.info = Boolean(options.info);
    }

    if (options.format) {
      workspace.format = options.format as WorkspaceCliOptions['format'];
    }

    return workspace;
  }

  /**
   * Generate help text for option group
   */
  static generateHelpText(groupName: keyof typeof optionGroups): string {
    const group = optionGroups[groupName];
    if (!group) return '';

    const lines = [`${group.title}:`];
    
    for (const option of group.options) {
      const flags = option.flags;
      const description = option.description || '';
      const choices = option.argChoices ? ` (choices: ${option.argChoices.join(', ')})` : '';
      const defaultValue = option.defaultValue ? ` (default: ${option.defaultValue})` : '';
      
      lines.push(`  ${flags.padEnd(30)} ${description}${choices}${defaultValue}`);
    }

    return lines.join('\n');
  }

  /**
   * Validate option combinations
   */
  static validateOptionCombinations(command: string, options: any): string[] {
    const errors: string[] = [];

    switch (command) {
      case 'update':
        if (options.interactive && options.dryRun) {
          errors.push('Cannot use --interactive with --dry-run');
        }
        break;

      case 'workspace':
        const actionCount = [options.validate, options.stats, options.info]
          .filter(Boolean).length;
        if (actionCount > 1) {
          errors.push('Cannot use multiple workspace actions simultaneously');
        }
        if (actionCount === 0) {
          // Default to info
          options.info = true;
        }
        break;
    }

    // Global validations
    if (options.verbose && options.silent) {
      errors.push('Cannot use both --verbose and --silent');
    }

    return errors;
  }
}