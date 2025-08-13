/**
 * PCU Configuration System
 *
 * Defines configuration types and provides default configuration.
 * User configuration can override any part of the default configuration.
 */

export interface PackageRule {
  patterns: string[];
  target?: 'latest' | 'greatest' | 'minor' | 'patch' | 'newest';
  autoUpdate?: boolean;
  requireConfirmation?: boolean;
  groupUpdate?: boolean;
}

export interface SecurityConfig {
  autoFixVulnerabilities?: boolean;
  allowMajorForSecurity?: boolean;
  notifyOnSecurityUpdate?: boolean;
}

export interface DefaultsConfig {
  target?: 'latest' | 'greatest' | 'minor' | 'patch' | 'newest';
  includePrerelease?: boolean;
  interactive?: boolean;
  dryRun?: boolean;
  createBackup?: boolean;
  format?: 'table' | 'json' | 'yaml' | 'minimal';
}

export interface AdvancedConfig {
  concurrency?: number;
  timeout?: number;
  retries?: number;
  cacheValidityMinutes?: number;
}

export interface MonorepoConfig {
  syncVersions?: string[];
  catalogPriority?: string[];
}

export interface PackageFilterConfig {
  exclude?: string[];
  include?: string[];
  defaults?: DefaultsConfig;
  packageRules?: PackageRule[];
  security?: SecurityConfig;
  advanced?: AdvancedConfig;
  monorepo?: MonorepoConfig;
}

/**
 * Default built-in configuration
 */
export const DEFAULT_PACKAGE_FILTER_CONFIG: Required<PackageFilterConfig> = {
  exclude: [],
  include: [],
  defaults: {
    target: 'latest',
    includePrerelease: false,
    interactive: false,
    dryRun: false,
    createBackup: false,
    format: 'table',
  },
  packageRules: [
    // Type definitions - always update to latest
    {
      patterns: ['@types/*'],
      target: 'latest',
      autoUpdate: true,
      requireConfirmation: false,
      groupUpdate: false,
    },
    // Dev tools - minor updates are usually safe
    {
      patterns: ['eslint*', 'prettier', '@typescript-eslint/*', 'vitest', 'jest'],
      target: 'minor',
      autoUpdate: false,
      requireConfirmation: false,
      groupUpdate: true,
    },
    // Build tools - be more conservative
    {
      patterns: ['typescript', 'webpack*', 'vite*', 'rollup*'],
      target: 'minor',
      autoUpdate: false,
      requireConfirmation: true,
      groupUpdate: false,
    },
  ],
  security: {
    autoFixVulnerabilities: true,
    allowMajorForSecurity: true,
    notifyOnSecurityUpdate: false,
  },
  advanced: {
    concurrency: 5,
    timeout: 30000,
    retries: 3,
    cacheValidityMinutes: 60,
  },
  monorepo: {
    syncVersions: [],
    catalogPriority: ['default'],
  },
};

/**
 * Configuration file names to look for
 */
export const CONFIG_FILE_NAMES = ['.pcurc.json', '.pcurc.js', 'pcu.config.json', 'pcu.config.js'];
