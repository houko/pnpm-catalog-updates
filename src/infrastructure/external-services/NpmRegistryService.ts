/**
 * NPM Registry Service
 *
 * Provides access to NPM registry for package version information.
 * Handles API calls, caching, and version resolution.
 */

import npmRegistryFetch from 'npm-registry-fetch';
import pacote from 'pacote';
import semver from 'semver';

import { Version, VersionRange } from '../../domain/value-objects/Version.js';
import { AdvancedConfig } from '../../common/config/PackageFilterConfig.js';

export interface PackageInfo {
  name: string;
  description?: string;
  homepage?: string;
  repository?: {
    type: string;
    url: string;
  };
  license?: string;
  author?: string | { name: string; email?: string };
  maintainers?: Array<{ name: string; email?: string }>;
  keywords?: string[];
  versions: string[];
  latestVersion: string;
  tags: Record<string, string>;
  time: Record<string, string>;
}

export interface SecurityVulnerability {
  id: string;
  title: string;
  severity: 'low' | 'moderate' | 'high' | 'critical';
  description: string;
  reference: string;
  vulnerable_versions: string;
  patched_versions?: string;
  recommendation?: string;
}

export interface SecurityReport {
  package: string;
  version: string;
  vulnerabilities: SecurityVulnerability[];
  hasVulnerabilities: boolean;
}

export class NpmRegistryService {
  private readonly cache: Map<string, { data: any; timestamp: number }> = new Map();
  private readonly cacheTimeout: number;

  // Advanced configuration with defaults
  private readonly concurrency: number;
  private readonly timeout: number;
  private readonly retries: number;
  private readonly cachingEnabled: boolean;

  constructor(
    private readonly registryUrl: string = 'https://registry.npmjs.org/',
    options: AdvancedConfig = {}
  ) {
    this.concurrency = options.concurrency ?? 5;
    this.timeout = options.timeout ?? 30000;
    this.retries = options.retries ?? 3;
    this.cacheTimeout = (options.cacheValidityMinutes ?? 60) * 60 * 1000; // Convert minutes to milliseconds
    this.cachingEnabled = true; // Always enable caching, use cacheValidityMinutes: 0 to disable
  }

  /**
   * Execute a function with retry logic
   */
  private async executeWithRetry<T>(
    fn: () => Promise<T>,
    context: string = 'operation'
  ): Promise<T> {
    let lastError: Error;

    for (let attempt = 1; attempt <= this.retries; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error as Error;

        if (attempt === this.retries) {
          throw new Error(`${context} failed after ${this.retries} attempts: ${lastError.message}`);
        }

        // Exponential backoff: wait 1s, 2s, 4s, etc.
        const delay = Math.min(1000 * Math.pow(2, attempt - 1), 10000);
        await new Promise((resolve) => setTimeout(resolve, delay));

        console.warn(
          `${context} attempt ${attempt} failed, retrying in ${delay}ms:`,
          lastError.message
        );
      }
    }

    throw lastError!;
  }

  /**
   * Get package information including all versions
   */
  async getPackageInfo(packageName: string): Promise<PackageInfo> {
    const cacheKey = `package-info:${packageName}`;

    // Check cache first if caching is enabled
    if (this.cachingEnabled) {
      const cached = this.getFromCache(cacheKey);
      if (cached) {
        return cached;
      }
    }

    const packageInfo = await this.executeWithRetry(async () => {
      const packument = await pacote.packument(packageName, {
        registry: this.registryUrl,
        timeout: this.timeout,
        fullMetadata: true,
      });

      const versions = Object.keys(packument.versions || {}).sort(semver.rcompare);
      const latestVersion = packument['dist-tags']?.latest || versions[0];

      return {
        name: packument.name,
        description: packument.description,
        homepage: packument.homepage,
        repository: packument.repository,
        license: packument.license,
        author: packument.author,
        maintainers: packument.maintainers,
        keywords: packument.keywords,
        versions,
        latestVersion,
        tags: packument['dist-tags'] || {},
        time: packument.time || {},
      };
    }, `Fetching package info for ${packageName}`);

    // Cache the result if caching is enabled
    if (this.cachingEnabled) {
      this.setCache(cacheKey, packageInfo);
    }

    return packageInfo;
  }

  /**
   * Get the latest version of a package
   */
  async getLatestVersion(packageName: string): Promise<Version> {
    try {
      const packageInfo = await this.getPackageInfo(packageName);
      return Version.fromString(packageInfo.latestVersion);
    } catch (error) {
      throw new Error(`Failed to get latest version for ${packageName}: ${error}`);
    }
  }

  /**
   * Get the greatest version that satisfies a range
   */
  async getGreatestVersion(packageName: string, range?: VersionRange): Promise<Version> {
    try {
      const packageInfo = await this.getPackageInfo(packageName);

      if (!range) {
        return Version.fromString(packageInfo.latestVersion);
      }

      // Find the greatest version that satisfies the range
      const satisfyingVersions = packageInfo.versions.filter((v) => {
        try {
          const version = Version.fromString(v);
          return version.satisfies(range);
        } catch {
          return false;
        }
      });

      if (satisfyingVersions.length === 0) {
        throw new Error(`No versions satisfy range ${range.toString()}`);
      }

      // Return the first (greatest) version
      if (!satisfyingVersions[0]) {
        throw new Error(`No satisfying versions found for ${packageName}`);
      }
      return Version.fromString(satisfyingVersions[0]);
    } catch (error) {
      throw new Error(`Failed to get greatest version for ${packageName}: ${error}`);
    }
  }

  /**
   * Get versions by date (newest versions published)
   */
  async getNewestVersions(packageName: string, count: number = 10): Promise<Version[]> {
    try {
      const packageInfo = await this.getPackageInfo(packageName);

      // Sort versions by publication time
      const versionsWithTime = packageInfo.versions
        .map((version) => ({
          version,
          time: packageInfo.time[version] ? new Date(packageInfo.time[version]) : new Date(0),
        }))
        .sort((a, b) => b.time.getTime() - a.time.getTime())
        .slice(0, count);

      return versionsWithTime.map((item) => Version.fromString(item.version));
    } catch (error) {
      throw new Error(`Failed to get newest versions for ${packageName}: ${error}`);
    }
  }

  /**
   * Check for security vulnerabilities
   */
  async checkSecurityVulnerabilities(
    packageName: string,
    version: string
  ): Promise<SecurityReport> {
    const cacheKey = `security:${packageName}@${version}`;

    // Check cache first
    const cached = this.getFromCache(cacheKey);
    if (cached) {
      return cached;
    }

    try {
      // Use npm audit API
      const auditData = {
        name: packageName,
        version: version,
        requires: {},
        dependencies: {},
      };

      const response = await npmRegistryFetch('/-/npm/v1/security/audits', {
        method: 'POST',
        body: JSON.stringify(auditData),
        headers: {
          'Content-Type': 'application/json',
        },
        registry: this.registryUrl,
        timeout: this.timeout,
      });

      const auditResult = await response.json();
      const vulnerabilities: SecurityVulnerability[] = [];

      // Parse audit results
      if (auditResult.advisories) {
        for (const advisory of Object.values(auditResult.advisories) as any[]) {
          vulnerabilities.push({
            id: advisory.id.toString(),
            title: advisory.title,
            severity: advisory.severity,
            description: advisory.overview,
            reference: advisory.url,
            vulnerable_versions: advisory.vulnerable_versions,
            patched_versions: advisory.patched_versions,
            recommendation: advisory.recommendation,
          });
        }
      }

      const securityReport: SecurityReport = {
        package: packageName,
        version: version,
        vulnerabilities,
        hasVulnerabilities: vulnerabilities.length > 0,
      };

      // Cache the result
      this.setCache(cacheKey, securityReport);

      return securityReport;
    } catch (error) {
      // If security check fails, return empty report
      console.warn(`Security check failed for ${packageName}@${version}:`, error);

      const emptyReport: SecurityReport = {
        package: packageName,
        version: version,
        vulnerabilities: [],
        hasVulnerabilities: false,
      };

      return emptyReport;
    }
  }

  /**
   * Batch query multiple packages
   */
  async batchQueryVersions(packages: string[]): Promise<Map<string, PackageInfo>> {
    const results = new Map<string, PackageInfo>();

    // Process packages in parallel with configurable concurrency
    const chunks = this.chunkArray(packages, this.concurrency);

    for (const chunk of chunks) {
      const promises = chunk.map(async (packageName) => {
        try {
          const info = await this.getPackageInfo(packageName);
          results.set(packageName, info);
        } catch (error) {
          console.warn(`Failed to query package ${packageName}:`, error);
        }
      });

      await Promise.all(promises);
    }

    return results;
  }

  /**
   * Check if package author has changed
   */
  async hasPackageAuthorChanged(
    packageName: string,
    fromVersion: string,
    toVersion: string
  ): Promise<boolean> {
    try {
      // const packageInfo = await this.getPackageInfo(packageName);

      const fromVersionData = await pacote.manifest(`${packageName}@${fromVersion}`, {
        registry: this.registryUrl,
        timeout: this.timeout,
      });

      const toVersionData = await pacote.manifest(`${packageName}@${toVersion}`, {
        registry: this.registryUrl,
        timeout: this.timeout,
      });

      // Compare authors/maintainers
      const fromAuthor = this.normalizeAuthor(fromVersionData.author);
      const toAuthor = this.normalizeAuthor(toVersionData.author);

      return fromAuthor !== toAuthor;
    } catch (error) {
      console.warn(`Failed to check author change for ${packageName}:`, error);
      return false;
    }
  }

  /**
   * Get package download statistics
   */
  async getDownloadStats(
    packageName: string,
    period: 'last-day' | 'last-week' | 'last-month' = 'last-week'
  ): Promise<number> {
    try {
      const response = await fetch(
        `https://api.npmjs.org/downloads/point/${period}/${packageName}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = (await response.json()) as any;
      return data.downloads || 0;
    } catch (error) {
      console.warn(`Failed to get download stats for ${packageName}:`, error);
      return 0;
    }
  }

  /**
   * Clear cache
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Get item from cache if not expired
   */
  private getFromCache(key: string): any | null {
    const cached = this.cache.get(key);
    if (!cached) {
      return null;
    }

    if (Date.now() - cached.timestamp > this.cacheTimeout) {
      this.cache.delete(key);
      return null;
    }

    return cached.data;
  }

  /**
   * Set item in cache
   */
  private setCache(key: string, data: any): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  /**
   * Split array into chunks
   */
  private chunkArray<T>(array: T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  }

  /**
   * Normalize author for comparison
   */
  private normalizeAuthor(author: any): string {
    if (typeof author === 'string') {
      return author.toLowerCase().trim();
    }
    if (typeof author === 'object' && author?.name) {
      return author.name.toLowerCase().trim();
    }
    return '';
  }
}
