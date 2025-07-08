/**
 * CLI Command Validation
 *
 * Validates CLI command options and arguments before execution.
 * Provides detailed error messages and suggestions.
 */

import { validateCliOptions, ValidationResult } from '../../common/utils/validation.js';
import { getConfig } from '../../common/config/Config.js';

export interface ValidatedOptions {
  workspace?: string;
  catalog?: string;
  format?: string;
  target?: string;
  interactive?: boolean;
  dryRun?: boolean;
  force?: boolean;
  prerelease?: boolean;
  include?: string[];
  exclude?: string[];
  createBackup?: boolean;
  verbose?: boolean;
  color?: boolean;
  registry?: string;
  timeout?: number;
}

export class CommandValidator {
  private config = getConfig().getConfig();

  /**
   * Validate check command options
   */
  validateCheckOptions(options: any): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Basic validation using utility
    const basicValidation = validateCliOptions(options);
    errors.push(...basicValidation.errors);
    warnings.push(...basicValidation.warnings);

    // Check-specific validations
    if (options.catalog && typeof options.catalog !== 'string') {
      errors.push('Catalog name must be a string');
    }

    // Validate mutually exclusive options
    if (options.interactive && options.format === 'json') {
      warnings.push('Interactive mode is not useful with JSON output format');
    }

    if (options.verbose && options.silent) {
      errors.push('Cannot use both --verbose and --silent options');
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Validate update command options
   */
  validateUpdateOptions(options: any): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Basic validation
    const basicValidation = validateCliOptions(options);
    errors.push(...basicValidation.errors);
    warnings.push(...basicValidation.warnings);

    // Update-specific validations
    if (options.interactive && options.dryRun) {
      errors.push('Cannot use --interactive with --dry-run');
    }

    if (options.force && !options.dryRun && !options.createBackup) {
      warnings.push('Using --force without backup. Consider using --create-backup for safety');
    }

    if (options.target === 'major' && !options.force && !options.interactive) {
      warnings.push(
        'Major updates may contain breaking changes. Consider using --interactive or --force'
      );
    }

    // Validate include/exclude patterns
    if (options.include && options.exclude) {
      const overlapping = options.include.some((inc: string) =>
        options.exclude.some((exc: string) => inc === exc)
      );
      if (overlapping) {
        warnings.push('Some patterns appear in both include and exclude lists');
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Validate analyze command arguments
   */
  validateAnalyzeArgs(catalog: string, packageName: string, version?: string): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Validate catalog name
    if (!catalog || catalog.trim() === '') {
      errors.push('Catalog name is required');
    } else if (catalog.includes('/') || catalog.includes('\\')) {
      errors.push('Catalog name cannot contain path separators');
    }

    // Validate package name
    if (!packageName || packageName.trim() === '') {
      errors.push('Package name is required');
    } else {
      // Basic package name validation
      const packageNameRegex = /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/;
      if (!packageNameRegex.test(packageName)) {
        errors.push('Invalid package name format');
      }
    }

    // Validate version if provided
    if (version) {
      const semverRegex =
        /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;
      if (!semverRegex.test(version)) {
        errors.push('Invalid version format. Use semantic versioning (e.g., 1.2.3)');
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Validate workspace command options
   */
  validateWorkspaceOptions(options: any): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Basic validation
    const basicValidation = validateCliOptions(options);
    errors.push(...basicValidation.errors);
    warnings.push(...basicValidation.warnings);

    // Workspace-specific validations
    const actionCount = [options.validate, options.stats, options.info].filter(Boolean).length;
    if (actionCount > 1) {
      errors.push('Cannot use multiple workspace actions simultaneously');
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Validate global options
   */
  validateGlobalOptions(options: any): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Validate workspace path
    if (options.workspace) {
      // Future: Add path validation logic here
      // Currently skipped to avoid TypeScript errors
    }

    // Validate color options
    if (options.noColor && options.color) {
      errors.push('Cannot use both --color and --no-color');
    }

    // Check for deprecated options (future-proofing)
    const deprecatedOptions = ['silent']; // Example
    for (const deprecated of deprecatedOptions) {
      if (options[deprecated]) {
        warnings.push(
          `Option --${deprecated} is deprecated and will be removed in future versions`
        );
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Validate configuration object
   */
  validateConfigFile(configPath: string): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    try {
      const fs = require('fs');
      // const path = require('path'); // Reserved for future use

      if (!fs.existsSync(configPath)) {
        errors.push(`Configuration file not found: ${configPath}`);
        return { isValid: false, errors, warnings };
      }

      let config: any;

      if (configPath.endsWith('.js')) {
        // JavaScript config file
        try {
          delete require.cache[require.resolve(configPath)];
          config = require(configPath);
        } catch (error) {
          errors.push(`Failed to load JavaScript config: ${error}`);
          return { isValid: false, errors, warnings };
        }
      } else {
        // JSON config file
        try {
          const content = fs.readFileSync(configPath, 'utf-8');
          config = JSON.parse(content);
        } catch (error) {
          errors.push(`Failed to parse JSON config: ${error}`);
          return { isValid: false, errors, warnings };
        }
      }

      // Validate config structure
      if (typeof config !== 'object' || config === null) {
        errors.push('Configuration must be an object');
        return { isValid: false, errors, warnings };
      }

      // Validate known configuration sections
      if (config.registry && typeof config.registry !== 'object') {
        errors.push('registry configuration must be an object');
      }

      if (config.update && typeof config.update !== 'object') {
        errors.push('update configuration must be an object');
      }

      if (config.output && typeof config.output !== 'object') {
        errors.push('output configuration must be an object');
      }

      // Check for unknown top-level keys
      const knownKeys = ['registry', 'update', 'output', 'workspace', 'notification', 'logging'];
      const unknownKeys = Object.keys(config).filter((key) => !knownKeys.includes(key));

      if (unknownKeys.length > 0) {
        warnings.push(`Unknown configuration keys: ${unknownKeys.join(', ')}`);
      }
    } catch (error) {
      errors.push(`Failed to validate configuration file: ${error}`);
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Sanitize and normalize options
   */
  sanitizeOptions(options: any): ValidatedOptions {
    const sanitized: ValidatedOptions = {};

    // String options
    if (options.workspace) {
      sanitized.workspace = String(options.workspace).trim();
    }
    if (options.catalog) {
      sanitized.catalog = String(options.catalog).trim();
    }
    if (options.format) {
      sanitized.format = String(options.format).toLowerCase().trim();
    }
    if (options.target) {
      sanitized.target = String(options.target).toLowerCase().trim();
    }
    if (options.registry) {
      sanitized.registry = String(options.registry).trim();
    }

    // Boolean options
    sanitized.interactive = Boolean(options.interactive);
    sanitized.dryRun = Boolean(options.dryRun);
    sanitized.force = Boolean(options.force);
    sanitized.prerelease = Boolean(options.prerelease);
    sanitized.createBackup = Boolean(options.createBackup);
    sanitized.verbose = Boolean(options.verbose);

    // Handle color option (tri-state: true, false, or undefined)
    if (options.color !== undefined) {
      sanitized.color = Boolean(options.color);
    } else if (options.noColor) {
      sanitized.color = false;
    }

    // Number options
    if (options.timeout) {
      const timeout = parseInt(String(options.timeout), 10);
      if (!isNaN(timeout) && timeout > 0) {
        sanitized.timeout = timeout;
      }
    }

    // Array options
    if (options.include) {
      sanitized.include = Array.isArray(options.include)
        ? options.include.map((p: any) => String(p).trim()).filter(Boolean)
        : [String(options.include).trim()].filter(Boolean);
    }
    if (options.exclude) {
      sanitized.exclude = Array.isArray(options.exclude)
        ? options.exclude.map((p: any) => String(p).trim()).filter(Boolean)
        : [String(options.exclude).trim()].filter(Boolean);
    }

    return sanitized;
  }

  /**
   * Get validation suggestions based on common mistakes
   */
  getSuggestions(command: string, options: any): string[] {
    const suggestions: string[] = [];

    switch (command) {
      case 'check':
        if (!options.workspace) {
          suggestions.push('Consider specifying --workspace for non-standard directory structures');
        }
        if (options.format === 'json' && options.verbose) {
          suggestions.push(
            'JSON output already includes detailed info, --verbose may be redundant'
          );
        }
        break;

      case 'update':
        if (!options.dryRun && !options.createBackup && !options.force) {
          suggestions.push('Consider using --dry-run first to preview changes');
        }
        if (options.target === 'greatest' && !options.prerelease) {
          suggestions.push('Add --prerelease to include pre-release versions with greatest target');
        }
        break;

      case 'analyze':
        if (!options.format) {
          suggestions.push('Use --format json for programmatic consumption of analysis data');
        }
        break;

      case 'workspace':
        if (!options.validate && !options.stats) {
          suggestions.push(
            'Use --validate to check workspace integrity or --stats for detailed information'
          );
        }
        break;
    }

    // General suggestions
    if (this.config.output.verbose && !options.verbose) {
      suggestions.push('Global verbose mode is enabled in config');
    }

    return suggestions;
  }
}
