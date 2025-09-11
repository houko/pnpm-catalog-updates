/**
 * NPM/PNPM Configuration Parser
 *
 * Reads and parses .npmrc and .pnpmrc configuration files to extract registry settings
 * for different package scopes. Supports both npm and pnpm configuration formats.
 */

import { existsSync, readFileSync } from 'fs';
import { homedir } from 'os';
import { join } from 'path';

export interface NpmrcConfig {
  // Default registry
  registry: string;
  // Scoped registries (e.g., @mycompany -> https://npm.mycompany.com)
  scopedRegistries: Map<string, string>;
  // Auth tokens for registries
  authTokens: Map<string, string>;
  // Other npm config values
  config: Map<string, string>;
}

export class NpmrcParser {
  private static readonly DEFAULT_REGISTRY = 'https://registry.npmjs.org/';

  /**
   * Parse .npmrc/.pnpmrc configuration from multiple sources
   */
  static parse(
    workingDirectory: string = process.cwd(),
    includeGlobal: boolean = true
  ): NpmrcConfig {
    const config: NpmrcConfig = {
      registry: this.DEFAULT_REGISTRY,
      scopedRegistries: new Map(),
      authTokens: new Map(),
      config: new Map(),
    };

    // Load config files in order of precedence (later files override earlier)
    // Priority: project .pnpmrc > project .npmrc > global .pnpmrc > global .npmrc
    const configPaths: string[] = [];

    // Only include global configs if requested (for production use)
    if (includeGlobal) {
      configPaths.push(join(homedir(), '.npmrc')); // Global npmrc (lowest priority)
      configPaths.push(join(homedir(), '.pnpmrc')); // Global pnpmrc
    }

    configPaths.push(join(workingDirectory, '.npmrc')); // Project npmrc
    configPaths.push(join(workingDirectory, '.pnpmrc')); // Project pnpmrc (highest priority)

    for (const configPath of configPaths) {
      if (existsSync(configPath)) {
        this.parseFile(configPath, config);
      }
    }

    // Also check for environment variables (skip in tests if includeGlobal is false)
    this.parseEnvironment(config, includeGlobal);

    return config;
  }

  /**
   * Parse a single .npmrc file
   */
  private static parseFile(filepath: string, config: NpmrcConfig): void {
    try {
      const content = readFileSync(filepath, 'utf-8');
      const lines = content.split('\n');

      for (const line of lines) {
        const trimmedLine = line.trim();

        // Skip comments and empty lines
        if (!trimmedLine || trimmedLine.startsWith('#') || trimmedLine.startsWith(';')) {
          continue;
        }

        // Parse key=value pairs
        const separatorIndex = trimmedLine.indexOf('=');
        if (separatorIndex === -1) continue;

        const key = trimmedLine.substring(0, separatorIndex).trim();
        const value = trimmedLine.substring(separatorIndex + 1).trim();

        // Handle scoped registries (e.g., @mycompany:registry=https://npm.mycompany.com/)
        if (key.includes(':registry')) {
          const scope = key.replace(':registry', '');
          config.scopedRegistries.set(scope, this.normalizeRegistryUrl(value));
        }
        // Handle default registry
        else if (key === 'registry') {
          config.registry = this.normalizeRegistryUrl(value);
        }
        // Handle auth tokens (e.g., //registry.npmjs.org/:_authToken=...)
        else if (key.includes(':_authToken') || key.includes('_authToken')) {
          // Extract registry URL from the key
          const match = key.match(/\/\/(.*?)\/:/);
          if (match && match[1]) {
            const registryHost = match[1];
            config.authTokens.set(registryHost, value);
          }
        }
        // Store other config values
        else {
          config.config.set(key, value);
        }
      }
    } catch (error) {
      // Silently ignore errors reading npmrc files
      console.debug(`Failed to parse npmrc file ${filepath}:`, error);
    }
  }

  /**
   * Parse npm configuration from environment variables
   */
  private static parseEnvironment(config: NpmrcConfig, includeEnv: boolean = true): void {
    if (!includeEnv) {
      return; // Skip environment parsing in tests
    }

    // Check for npm_config_registry
    if (process.env.npm_config_registry) {
      config.registry = this.normalizeRegistryUrl(process.env.npm_config_registry);
    }

    // Check for scoped registries in environment
    for (const [key, value] of Object.entries(process.env)) {
      if (key.startsWith('npm_config_') && key.includes('_registry')) {
        // Extract scope from environment variable name
        // e.g., npm_config_@mycompany_registry -> @mycompany
        const match = key.match(/npm_config_(.+)_registry/);
        if (match && match[1] && value) {
          const scope = match[1].replace(/_/g, '/').replace(/\//, '@');
          config.scopedRegistries.set(scope, this.normalizeRegistryUrl(value));
        }
      }
    }
  }

  /**
   * Get the appropriate registry URL for a package
   */
  static getRegistryForPackage(packageName: string, config: NpmrcConfig): string {
    // Check if package has a scope (e.g., @mycompany/package)
    if (packageName.startsWith('@')) {
      const scopeEnd = packageName.indexOf('/');
      if (scopeEnd !== -1) {
        const scope = packageName.substring(0, scopeEnd);

        // Check if we have a scoped registry for this scope
        const scopedRegistry = config.scopedRegistries.get(scope);
        if (scopedRegistry) {
          return scopedRegistry;
        }
      }
    }

    // Fall back to default registry
    return config.registry;
  }

  /**
   * Normalize registry URL to ensure it has a trailing slash
   */
  private static normalizeRegistryUrl(url: string): string {
    // Remove any quotes that might be in the config
    url = url.replace(/^["']|["']$/g, '');

    // Ensure trailing slash
    if (!url.endsWith('/')) {
      url += '/';
    }

    return url;
  }

  /**
   * Get auth token for a registry
   */
  static getAuthToken(registryUrl: string, config: NpmrcConfig): string | undefined {
    try {
      const url = new URL(registryUrl);
      return config.authTokens.get(url.hostname);
    } catch {
      return undefined;
    }
  }
}
