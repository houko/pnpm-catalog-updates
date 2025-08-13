/**
 * Configuration Loader
 *
 * Loads and merges user configuration with default configuration.
 * Supports multiple configuration file formats and locations.
 */

import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import {
  CONFIG_FILE_NAMES,
  DEFAULT_PACKAGE_FILTER_CONFIG,
  PackageFilterConfig,
} from './PackageFilterConfig.js';

export class ConfigLoader {
  private static cache = new Map<string, PackageFilterConfig>();

  /**
   * Load configuration from the specified directory
   */
  static loadConfig(workspacePath: string = process.cwd()): PackageFilterConfig {
    const cacheKey = workspacePath;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    const userConfig = this.findAndLoadUserConfig(workspacePath);
    const mergedConfig = this.mergeConfigs(DEFAULT_PACKAGE_FILTER_CONFIG, userConfig || {});

    this.cache.set(cacheKey, mergedConfig);
    return mergedConfig;
  }

  /**
   * Clear configuration cache
   */
  static clearCache(): void {
    this.cache.clear();
  }

  /**
   * Find and load user configuration file
   */
  private static findAndLoadUserConfig(workspacePath: string): PackageFilterConfig | null {
    for (const fileName of CONFIG_FILE_NAMES) {
      const configPath = join(workspacePath, fileName);
      if (existsSync(configPath)) {
        try {
          return this.loadConfigFile(configPath);
        } catch (error) {
          console.warn(`Warning: Failed to load config file ${configPath}:`, error);
          continue;
        }
      }
    }
    return null;
  }

  /**
   * Load configuration from a specific file
   */
  private static loadConfigFile(configPath: string): PackageFilterConfig {
    const content = readFileSync(configPath, 'utf-8');

    if (configPath.endsWith('.json')) {
      return JSON.parse(content) as PackageFilterConfig;
    }

    if (configPath.endsWith('.js')) {
      // For JavaScript config files, we would need dynamic import
      // For now, let's focus on JSON support
      throw new Error('JavaScript config files are not yet supported');
    }

    throw new Error(`Unsupported config file format: ${configPath}`);
  }

  /**
   * Deep merge two configuration objects
   */
  private static mergeConfigs(
    defaultConfig: Required<PackageFilterConfig>,
    userConfig: PackageFilterConfig
  ): PackageFilterConfig {
    const merged: PackageFilterConfig = JSON.parse(JSON.stringify(defaultConfig));

    // Merge simple arrays and objects
    if (userConfig.exclude) {
      merged.exclude = [...(merged.exclude || []), ...userConfig.exclude];
    }

    if (userConfig.include) {
      merged.include = [...(merged.include || []), ...userConfig.include];
    }

    if (userConfig.defaults) {
      merged.defaults = { ...merged.defaults, ...userConfig.defaults };
    }

    if (userConfig.security) {
      merged.security = { ...merged.security, ...userConfig.security };
    }

    if (userConfig.advanced) {
      merged.advanced = { ...merged.advanced, ...userConfig.advanced };
    }

    if (userConfig.monorepo) {
      merged.monorepo = { ...merged.monorepo, ...userConfig.monorepo };

      // For arrays in monorepo config, replace rather than merge
      if (userConfig.monorepo.syncVersions) {
        merged.monorepo!.syncVersions = userConfig.monorepo.syncVersions;
      }
      if (userConfig.monorepo.catalogPriority) {
        merged.monorepo!.catalogPriority = userConfig.monorepo.catalogPriority;
      }
    }

    // Package rules need special handling - user rules are added to default rules
    if (userConfig.packageRules) {
      merged.packageRules = [...(merged.packageRules || []), ...userConfig.packageRules];
    }

    return merged;
  }

  /**
   * Get effective configuration for a specific package
   */
  static getPackageConfig(
    packageName: string,
    config: PackageFilterConfig
  ): {
    shouldUpdate: boolean;
    target: string;
    requireConfirmation: boolean;
    autoUpdate: boolean;
    groupUpdate: boolean;
  } {
    // Check if package is explicitly excluded
    if (config.exclude?.some((pattern) => this.matchesPattern(packageName, pattern))) {
      return {
        shouldUpdate: false,
        target: config.defaults?.target || 'latest',
        requireConfirmation: false,
        autoUpdate: false,
        groupUpdate: false,
      };
    }

    // Check if package is explicitly included (if include list exists)
    if (config.include && config.include.length > 0) {
      const isIncluded = config.include.some((pattern) =>
        this.matchesPattern(packageName, pattern)
      );
      if (!isIncluded) {
        return {
          shouldUpdate: false,
          target: config.defaults?.target || 'latest',
          requireConfirmation: false,
          autoUpdate: false,
          groupUpdate: false,
        };
      }
    }

    // Find matching package rule
    const matchingRule = config.packageRules?.find((rule) =>
      rule.patterns.some((pattern) => this.matchesPattern(packageName, pattern))
    );

    if (matchingRule) {
      return {
        shouldUpdate: true,
        target: matchingRule.target || config.defaults?.target || 'latest',
        requireConfirmation: matchingRule.requireConfirmation || false,
        autoUpdate: matchingRule.autoUpdate || false,
        groupUpdate: matchingRule.groupUpdate || false,
      };
    }

    // Use default configuration
    return {
      shouldUpdate: true,
      target: config.defaults?.target || 'latest',
      requireConfirmation: false,
      autoUpdate: false,
      groupUpdate: false,
    };
  }

  /**
   * Simple glob pattern matching
   */
  private static matchesPattern(packageName: string, pattern: string): boolean {
    const regexPattern = pattern.replace(/\*/g, '.*').replace(/\?/g, '.');
    const regex = new RegExp(`^${regexPattern}$`, 'i');
    return regex.test(packageName);
  }
}
