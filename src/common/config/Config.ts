/**
 * Configuration System
 *
 * Handles application configuration from multiple sources:
 * - CLI arguments
 * - Configuration files (.pcurc, pcu.config.js)
 * - Environment variables
 * - Default values
 */

import { existsSync, readFileSync } from 'fs';
import { homedir } from 'os';
import { join, resolve } from 'path';

export interface PcuConfig {
  // Registry settings
  registry: {
    url: string;
    timeout: number;
    retries: number;
    cache: boolean;
    cacheTtl: number; // TTL in seconds
  };

  // Update behavior
  update: {
    target: 'latest' | 'greatest' | 'minor' | 'patch' | 'newest';
    includePrerelease: boolean;
    interactive: boolean;
    createBackup: boolean;
    force: boolean;
  };

  // Output formatting
  output: {
    format: 'table' | 'json' | 'yaml' | 'minimal';
    color: boolean;
    verbose: boolean;
    silent: boolean;
  };

  // Workspace settings
  workspace: {
    autoDetect: boolean;
    patterns: string[];
    excludePatterns: string[];
  };

  // Notification settings
  notification: {
    enabled: boolean;
    onSuccess: boolean;
    onError: boolean;
    methods: Array<'console' | 'desktop' | 'webhook'>;
    webhook?: {
      url: string;
      method: 'POST' | 'PUT';
      headers: Record<string, string>;
    };
  };

  // Logging
  logging: {
    level: 'error' | 'warn' | 'info' | 'debug';
    file?: string;
    maxSize: string; // e.g., '10MB'
    maxFiles: number;
  };
}

export const DEFAULT_CONFIG: PcuConfig = {
  registry: {
    url: 'https://registry.npmjs.org',
    timeout: 30000,
    retries: 3,
    cache: true,
    cacheTtl: 3600, // 1 hour
  },

  update: {
    target: 'latest',
    includePrerelease: false,
    interactive: false,
    createBackup: false,
    force: false,
  },

  output: {
    format: 'table',
    color: true,
    verbose: false,
    silent: false,
  },

  workspace: {
    autoDetect: true,
    patterns: ['packages/*', 'apps/*'],
    excludePatterns: ['**/node_modules/**', '**/dist/**', '**/build/**'],
  },

  notification: {
    enabled: false,
    onSuccess: true,
    onError: true,
    methods: ['console'],
  },

  logging: {
    level: 'info',
    maxSize: '10MB',
    maxFiles: 5,
  },
};

export class ConfigManager {
  private config: PcuConfig;
  private configPath?: string;

  constructor() {
    this.config = { ...DEFAULT_CONFIG };
    this.loadConfig();
  }

  /**
   * Get the current configuration
   */
  getConfig(): Readonly<PcuConfig> {
    return this.config;
  }

  /**
   * Get a specific configuration value using dot notation
   */
  get<T = any>(path: string): T {
    return this.getNestedValue(this.config, path);
  }

  /**
   * Set a configuration value using dot notation
   */
  set(path: string, value: any): void {
    this.setNestedValue(this.config, path, value);
  }

  /**
   * Merge configuration from CLI options
   */
  mergeCliOptions(
    options: Partial<{
      registry: string;
      timeout: number;
      target: string;
      prerelease: boolean;
      interactive: boolean;
      dryRun: boolean;
      force: boolean;
      format: string;
      color: boolean;
      verbose: boolean;
      silent: boolean;
      workspace: string;
      include: string[];
      exclude: string[];
    }>
  ): void {
    if (options.registry) {
      this.config.registry.url = options.registry;
    }
    if (options.timeout) {
      this.config.registry.timeout = options.timeout;
    }
    if (options.target) {
      this.config.update.target = options.target as any;
    }
    if (options.prerelease !== undefined) {
      this.config.update.includePrerelease = options.prerelease;
    }
    if (options.interactive !== undefined) {
      this.config.update.interactive = options.interactive;
    }
    if (options.force !== undefined) {
      this.config.update.force = options.force;
    }
    if (options.format) {
      this.config.output.format = options.format as any;
    }
    if (options.color !== undefined) {
      this.config.output.color = options.color;
    }
    if (options.verbose !== undefined) {
      this.config.output.verbose = options.verbose;
    }
    if (options.silent !== undefined) {
      this.config.output.silent = options.silent;
    }
    if (options.include) {
      // Add to existing patterns
      this.config.workspace.patterns.push(...options.include);
    }
    if (options.exclude) {
      // Add to existing exclude patterns
      this.config.workspace.excludePatterns.push(...options.exclude);
    }
  }

  /**
   * Load configuration from files and environment
   */
  private loadConfig(): void {
    // Load from files (in order of priority)
    this.loadFromFile(this.findConfigFile());

    // Load from environment variables
    this.loadFromEnvironment();
  }

  /**
   * Find configuration file
   */
  private findConfigFile(): string | undefined {
    const configNames = ['.pcurc', '.pcurc.json', '.pcurc.js', 'pcu.config.js', 'pcu.config.json'];

    // Check current directory
    for (const name of configNames) {
      const filePath = resolve(process.cwd(), name);
      if (existsSync(filePath)) {
        return filePath;
      }
    }

    // Check home directory
    for (const name of configNames) {
      const filePath = join(homedir(), name);
      if (existsSync(filePath)) {
        return filePath;
      }
    }

    return undefined;
  }

  /**
   * Load configuration from file
   */
  private loadFromFile(filePath?: string): void {
    if (!filePath || !existsSync(filePath)) {
      return;
    }

    try {
      let fileConfig: Partial<PcuConfig>;

      if (filePath.endsWith('.js')) {
        // Dynamic import for ES modules
        delete require.cache[require.resolve(filePath)];
        fileConfig = require(filePath);

        // Handle default export
        if (fileConfig && typeof fileConfig === 'object' && 'default' in fileConfig) {
          fileConfig = (fileConfig as any).default;
        }
      } else {
        // JSON file
        const content = readFileSync(filePath, 'utf-8');
        fileConfig = JSON.parse(content);
      }

      // Deep merge with current config
      this.config = this.deepMerge(this.config, fileConfig);
      this.configPath = filePath;
    } catch (error) {
      console.warn(`Failed to load config from ${filePath}:`, error);
    }
  }

  /**
   * Load configuration from environment variables
   */
  private loadFromEnvironment(): void {
    const envConfig: Partial<PcuConfig> = {};

    // Registry settings
    if (process.env.PCU_REGISTRY_URL) {
      envConfig.registry = { ...this.config.registry, url: process.env.PCU_REGISTRY_URL };
    }
    if (process.env.PCU_REGISTRY_TIMEOUT) {
      envConfig.registry = {
        ...(envConfig.registry || this.config.registry),
        timeout: parseInt(process.env.PCU_REGISTRY_TIMEOUT, 10),
      };
    }

    // Update settings
    if (process.env.PCU_UPDATE_TARGET) {
      envConfig.update = {
        ...this.config.update,
        target: process.env.PCU_UPDATE_TARGET as any,
      };
    }
    if (process.env.PCU_UPDATE_PRERELEASE) {
      envConfig.update = {
        ...(envConfig.update || this.config.update),
        includePrerelease: process.env.PCU_UPDATE_PRERELEASE === 'true',
      };
    }

    // Output settings
    if (process.env.PCU_OUTPUT_FORMAT) {
      envConfig.output = {
        ...this.config.output,
        format: process.env.PCU_OUTPUT_FORMAT as any,
      };
    }
    if (process.env.PCU_OUTPUT_COLOR) {
      envConfig.output = {
        ...(envConfig.output || this.config.output),
        color: process.env.PCU_OUTPUT_COLOR !== 'false',
      };
    }

    // Logging settings
    if (process.env.PCU_LOG_LEVEL) {
      envConfig.logging = {
        ...this.config.logging,
        level: process.env.PCU_LOG_LEVEL as any,
      };
    }
    if (process.env.PCU_LOG_FILE) {
      envConfig.logging = {
        ...(envConfig.logging || this.config.logging),
        file: process.env.PCU_LOG_FILE,
      };
    }

    // Merge environment config
    this.config = this.deepMerge(this.config, envConfig);
  }

  /**
   * Get nested value using dot notation
   */
  private getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }

  /**
   * Set nested value using dot notation (protected against prototype pollution)
   */
  private setNestedValue(obj: any, path: string, value: any): void {
    const keys = path.split('.');
    const lastKey = keys.pop()!;

    // Validate that keys don't include prototype pollution attempts
    if (keys.some((key) => key === '__proto__' || key === 'constructor' || key === 'prototype')) {
      throw new Error('Invalid key path: prototype pollution attempt detected');
    }

    if (lastKey === '__proto__' || lastKey === 'constructor' || lastKey === 'prototype') {
      throw new Error('Invalid key: prototype pollution attempt detected');
    }

    const target = keys.reduce((current, key) => {
      // Additional validation for each key in the path
      if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
        throw new Error(`Invalid key in path: ${key}`);
      }
      
      if (!(key in current)) {
        // Use Object.defineProperty for safer property creation
        Object.defineProperty(current, key, {
          value: Object.create(null),
          writable: true,
          enumerable: true,
          configurable: true
        });
      }
      return current[key];
    }, obj);

    // Use Object.defineProperty for safer final assignment
    Object.defineProperty(target, lastKey, {
      value: value,
      writable: true,
      enumerable: true,
      configurable: true
    });
  }

  /**
   * Deep merge two objects (protected against prototype pollution)
   */
  private deepMerge(target: any, source: any): any {
    if (!source || typeof source !== 'object') {
      return target;
    }

    const result = { ...target };

    for (const key in source) {
      // Prevent prototype pollution
      if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
        continue;
      }

      if (Object.hasOwn(source, key)) {
        if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
          result[key] = this.deepMerge(target[key] || {}, source[key]);
        } else {
          result[key] = source[key];
        }
      }
    }

    return result;
  }

  /**
   * Get configuration file path
   */
  getConfigPath(): string | undefined {
    return this.configPath;
  }

  /**
   * Validate configuration
   */
  validate(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Validate registry URL
    try {
      new URL(this.config.registry.url);
    } catch {
      errors.push('Invalid registry URL');
    }

    // Validate timeout
    if (this.config.registry.timeout <= 0) {
      errors.push('Registry timeout must be positive');
    }

    // Validate cache TTL
    if (this.config.registry.cacheTtl <= 0) {
      errors.push('Cache TTL must be positive');
    }

    // Validate update target
    const validTargets = ['latest', 'greatest', 'minor', 'patch', 'newest'];
    if (!validTargets.includes(this.config.update.target)) {
      errors.push(`Invalid update target: ${this.config.update.target}`);
    }

    // Validate output format
    const validFormats = ['table', 'json', 'yaml', 'minimal'];
    if (!validFormats.includes(this.config.output.format)) {
      errors.push(`Invalid output format: ${this.config.output.format}`);
    }

    // Validate log level
    const validLevels = ['error', 'warn', 'info', 'debug'];
    if (!validLevels.includes(this.config.logging.level)) {
      errors.push(`Invalid log level: ${this.config.logging.level}`);
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Export current configuration to file
   */
  async exportConfig(filePath: string, format: 'json' | 'js' = 'json'): Promise<void> {
    const { writeFile } = await import('fs/promises');

    let content: string;

    if (format === 'js') {
      content = `module.exports = ${JSON.stringify(this.config, null, 2)};`;
    } else {
      content = JSON.stringify(this.config, null, 2);
    }

    await writeFile(filePath, content, 'utf-8');
  }
}

// Global configuration instance
let configInstance: ConfigManager | undefined;

/**
 * Get the global configuration instance
 */
export function getConfig(): ConfigManager {
  if (!configInstance) {
    configInstance = new ConfigManager();
  }
  return configInstance;
}

/**
 * Reset the global configuration instance (useful for testing)
 */
export function resetConfig(): void {
  configInstance = undefined;
}
