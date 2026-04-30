/**
 * NPM Registry Service
 *
 * Provides access to NPM registry for package version information.
 * Handles API calls, caching, and version resolution.
 */

import {
  type AdvancedConfig,
  InvalidVersionRangeError,
  isValidPackageName,
  parallelLimitWithRateLimit,
  RegistryError,
  timeout,
  toError,
  UserFriendlyErrorHandler,
} from '@pcu/utils'
import npmRegistryFetch from 'npm-registry-fetch'
import pacote from 'pacote'
import semver from 'semver'
import { Version, type VersionRange } from '../../domain/value-objects/version.js'
import { registryCache } from '../cache/cache.js'
import { type NpmrcConfig, NpmrcParser } from '../utils/npmrcParser.js'

export interface PackageInfo {
  name: string
  description?: string
  homepage?: string
  repository?: {
    type?: string
    url?: string
    directory?: string
  }
  license?: string
  author?: string | { name: string; email?: string }
  maintainers?: Array<{ name: string; email?: string }>
  keywords?: string[]
  versions: string[]
  latestVersion: string
  tags: Record<string, string>
  time?: Record<string, string>
}

export interface SecurityVulnerability {
  id: string
  title: string
  severity: 'low' | 'moderate' | 'high' | 'critical'
  description: string
  reference: string
  vulnerable_versions: string
  patched_versions?: string
  recommendation?: string
}

export interface SecurityReport {
  package: string
  version: string
  vulnerabilities: SecurityVulnerability[]
  hasVulnerabilities: boolean
}

/**
 * NPM packument response structure (subset we use)
 */
interface NpmPackument {
  name: string
  'dist-tags': Record<string, string>
  versions: Record<string, NpmVersionManifest>
  time?: Record<string, string>
  description?: string
  homepage?: string
  repository?: { type?: string; url?: string; directory?: string }
  license?: string
  author?: string | { name: string; email?: string }
  maintainers?: Array<{ name: string; email?: string }>
  keywords?: string[]
}

/**
 * NPM version manifest structure
 */
interface NpmVersionManifest {
  name: string
  version: string
  author?: string | { name: string; email?: string }
  [key: string]: unknown
}

/**
 * MAINT-002: Type definitions for package manifest author extraction
 */
interface PackageAuthor {
  name: string
  email?: string
}

interface ManifestWithAuthor {
  author?: string | PackageAuthor
}

/**
 * Type guard to check if object has author property
 * MAINT-002: Replaces unsafe Record<string, unknown> assertion with type predicate
 */
function isManifestWithAuthor(obj: object): obj is ManifestWithAuthor {
  return 'author' in obj
}

/**
 * Type guard to check if author is a PackageAuthor object
 */
function isPackageAuthor(author: unknown): author is PackageAuthor {
  return (
    author !== null &&
    typeof author === 'object' &&
    'name' in author &&
    typeof (author as PackageAuthor).name === 'string'
  )
}

/**
 * Type guard to safely extract author from pacote manifest.
 * Pacote's manifest type is complex, this helper provides type-safe access.
 * MAINT-002: Uses type predicates instead of Record<string, unknown> assertion
 */
function extractAuthorFromManifest(manifest: unknown): string | PackageAuthor | undefined {
  if (!manifest || typeof manifest !== 'object') {
    return undefined
  }

  if (!isManifestWithAuthor(manifest)) {
    return undefined
  }

  const { author } = manifest
  if (typeof author === 'string') {
    return author
  }
  if (isPackageAuthor(author)) {
    return author
  }
  return undefined
}

/**
 * NPM audit advisory structure
 */
interface NpmAuditAdvisory {
  id: number
  title: string
  severity: 'low' | 'moderate' | 'high' | 'critical'
  overview: string
  url: string
  vulnerable_versions: string
  patched_versions?: string
  recommendation?: string
}

/**
 * NPM audit response structure (v1 advisories format)
 */
interface NpmAuditResponse {
  advisories?: Record<string, NpmAuditAdvisory | NpmAuditAdvisory[]>
}

/**
 * NPM download stats response
 */
interface NpmDownloadStats {
  downloads?: number
  package?: string
  start?: string
  end?: string
}

/**
 * Package versions cache structure
 */
interface PackageVersionsData {
  name: string
  versions: string[]
  latestVersion: string
  tags: Record<string, string>
  time?: Record<string, string>
}

/**
 * Batch query failure information
 */
export interface BatchQueryFailure {
  packageName: string
  error: Error
  errorMessage: string
}

/**
 * Batch query result with success and failure information
 */
export interface BatchQueryResult {
  results: Map<string, PackageInfo>
  failures: BatchQueryFailure[]
  totalCount: number
  successCount: number
  failureCount: number
}

export class NpmRegistryService {
  // Differentiated cache timeouts for different data types (in milliseconds)
  private readonly versionCacheTtl: number
  private readonly packageInfoCacheTtl: number
  private readonly securityCacheTtl: number

  // Advanced configuration with defaults
  private readonly concurrency: number
  private readonly timeout: number
  private readonly retries: number
  private readonly cachingEnabled: boolean
  private readonly rateLimit: number

  // NPM downloads API base URL (configurable for private networks)
  private readonly npmDownloadsApiUrl: string

  // NPM configuration for handling multiple registries
  private readonly npmrcConfig: NpmrcConfig

  /**
   * API-001: Create a new NpmRegistryService instance with async npmrc parsing.
   * This is the RECOMMENDED way to create instances as it properly parses
   * .npmrc files for registry configuration, scoped registries, and auth tokens.
   *
   * @param registryUrl - Base registry URL (defaults to npmjs.org)
   * @param options - Advanced configuration options
   * @param workingDirectory - Directory to search for .npmrc files
   * @returns Promise resolving to configured NpmRegistryService instance
   *
   * @example
   * ```typescript
   * const service = await NpmRegistryService.create()
   * const info = await service.getPackageVersions('lodash')
   * ```
   */
  static async create(
    registryUrl: string = 'https://registry.npmjs.org/',
    options: AdvancedConfig = {},
    workingDirectory: string = process.cwd()
  ): Promise<NpmRegistryService> {
    const npmrcConfig = await NpmrcParser.parse(workingDirectory)
    return new NpmRegistryService(registryUrl, options, npmrcConfig)
  }

  /**
   * API-001: Create instance with default configuration (no .npmrc parsing).
   * Use this for simple cases where you don't need scoped registry or auth support.
   * For full .npmrc support, use the async `create()` factory method instead.
   *
   * @param registryUrl - Base registry URL (defaults to npmjs.org)
   * @param options - Advanced configuration options
   * @returns Configured NpmRegistryService instance with default npmrc config
   *
   * @example
   * ```typescript
   * const service = NpmRegistryService.createWithDefaults()
   * const info = await service.getPackageVersions('lodash')
   * ```
   */
  static createWithDefaults(
    registryUrl: string = 'https://registry.npmjs.org/',
    options: AdvancedConfig = {}
  ): NpmRegistryService {
    const defaultNpmrcConfig: NpmrcConfig = {
      registry: registryUrl.endsWith('/') ? registryUrl : `${registryUrl}/`,
      scopedRegistries: new Map(),
      authTokens: new Map(),
      config: new Map(),
    }
    return new NpmRegistryService(registryUrl, options, defaultNpmrcConfig)
  }

  /**
   * Constructor that accepts a pre-parsed NpmrcConfig.
   *
   * API-001: For most use cases, prefer the static factory methods:
   * - `NpmRegistryService.create()` - Async, parses .npmrc files (RECOMMENDED)
   * - `NpmRegistryService.createWithDefaults()` - Sync, uses default config
   *
   * Direct constructor usage is primarily for:
   * - Testing with mocked NpmrcConfig
   * - Cases where NpmrcConfig is already parsed elsewhere
   *
   * @param registryUrl - Base registry URL
   * @param options - Advanced configuration options
   * @param npmrcConfigOrWorkDir - Pre-parsed NpmrcConfig or working directory (deprecated: string)
   *
   * @deprecated Passing a string as third parameter is deprecated.
   *             Use `createWithDefaults()` for sync initialization with defaults,
   *             or `create()` for async initialization with .npmrc parsing.
   */
  constructor(
    registryUrl: string = 'https://registry.npmjs.org/',
    options: AdvancedConfig = {},
    npmrcConfigOrWorkDir: NpmrcConfig | string = process.cwd()
  ) {
    // API-001: Support both pre-parsed config and working directory for backward compatibility
    if (typeof npmrcConfigOrWorkDir === 'string') {
      // Legacy sync initialization - use default config
      // Deprecated: Use createWithDefaults() or create() instead
      this.npmrcConfig = {
        registry: 'https://registry.npmjs.org/',
        scopedRegistries: new Map(),
        authTokens: new Map(),
        config: new Map(),
      }
    } else {
      this.npmrcConfig = npmrcConfigOrWorkDir
    }

    // Override default registry if specified in npmrc
    if (!registryUrl || registryUrl === 'https://registry.npmjs.org/') {
      // Use npmrc registry as default if no specific registry is provided
      const normalizedUrl = registryUrl.endsWith('/') ? registryUrl : `${registryUrl}/`
      this.npmrcConfig.registry = this.npmrcConfig.registry || normalizedUrl
    } else {
      // Use the provided registry URL as override
      this.npmrcConfig.registry = registryUrl.endsWith('/') ? registryUrl : `${registryUrl}/`
    }
    this.concurrency = options.concurrency ?? 8 // Increased from 5 to match NCU performance
    this.timeout = options.timeout ?? 15000 // Reduced from 30s to 15s for faster failure detection
    this.retries = options.retries ?? 2 // Reduced from 3 to 2 for faster overall performance
    this.rateLimit = options.rateLimit ?? 15

    // NPM downloads API URL (configurable for private networks or custom mirrors)
    this.npmDownloadsApiUrl = options.npmDownloadsApiUrl ?? 'https://api.npmjs.org'

    // Optimized cache TTLs for different data types (in milliseconds)
    const baseCacheMinutes = options.cacheValidityMinutes ?? 10 // Reduced from 60 to 10 minutes
    this.versionCacheTtl = baseCacheMinutes * 60 * 1000 // Version info: 10 minutes (frequently checked)
    this.packageInfoCacheTtl = baseCacheMinutes * 2 * 60 * 1000 // Package info: 20 minutes
    this.securityCacheTtl = baseCacheMinutes * 6 * 60 * 1000 // Security info: 60 minutes (changes less frequently)

    this.cachingEnabled = baseCacheMinutes > 0 // Disable caching if set to 0
  }

  /**
   * Validate package name to prevent path traversal attacks
   * Throws RegistryError if the package name is invalid
   */
  private validatePackageName(packageName: string): void {
    if (!isValidPackageName(packageName)) {
      throw new RegistryError(
        packageName,
        'validation',
        `Invalid package name: "${packageName}". Package names must follow npm naming conventions.`
      )
    }
  }

  /**
   * Execute a function with retry logic
   * QUAL-003: Eliminated non-null assertion by initializing lastError
   */
  private async executeWithRetry<T>(
    fn: () => Promise<T>,
    context: string = 'operation'
  ): Promise<T> {
    // Initialize with a default error to avoid non-null assertion
    let lastError: Error = new Error('No retry attempts were made')

    for (let attempt = 1; attempt <= this.retries; attempt++) {
      try {
        return await fn()
      } catch (error) {
        lastError = toError(error)

        if (attempt === this.retries) {
          const pkgName = context.includes('for ')
            ? context.split('for ')[1] || 'unknown'
            : 'unknown'
          throw new RegistryError(
            pkgName,
            'retry',
            `${context} failed after ${this.retries} attempts: ${lastError.message}`,
            undefined,
            lastError
          )
        }

        // Exponential backoff: wait 1s, 2s, 4s, etc.
        const delay = Math.min(1000 * 2 ** (attempt - 1), 10000)
        await new Promise((resolve) => setTimeout(resolve, delay))

        // Extract package name from context for better error handling
        const packageName = context.includes('for ')
          ? context.split('for ')[1] || 'unknown package'
          : 'unknown package'

        UserFriendlyErrorHandler.handleRetryAttempt(packageName, attempt, this.retries, lastError)
      }
    }

    throw new RegistryError(
      'unknown',
      'retry',
      `Operation failed: ${lastError.message}`,
      undefined,
      lastError
    )
  }

  /**
   * Get the appropriate registry URL for a package
   */
  private getRegistryForPackage(packageName: string): string {
    return NpmrcParser.getRegistryForPackage(packageName, this.npmrcConfig)
  }

  /**
   * Get auth configuration for a registry
   */
  private getAuthConfig(registryUrl: string): Record<string, string> {
    const authToken = NpmrcParser.getAuthToken(registryUrl, this.npmrcConfig)
    if (authToken) {
      return {
        '//registry.npmjs.org/:_authToken': authToken,
        token: authToken,
      }
    }
    return {}
  }

  /**
   * Get lightweight package version information (optimized for performance)
   */
  async getPackageVersions(packageName: string): Promise<PackageVersionsData> {
    this.validatePackageName(packageName)

    const registryUrl = this.getRegistryForPackage(packageName)
    const cacheKey = `versions:${registryUrl}:${packageName}`

    // Check persistent cache first if caching is enabled
    if (this.cachingEnabled) {
      const cached = registryCache.get(cacheKey) as PackageVersionsData | undefined
      if (cached) {
        return cached
      }
    }

    const packageVersions = await this.executeWithRetry(async () => {
      // Use lightweight packument call without fullMetadata
      const authConfig = this.getAuthConfig(registryUrl)
      const packument = await pacote.packument(packageName, {
        registry: registryUrl,
        timeout: this.timeout,
        fullMetadata: false, // Key optimization: don't fetch full metadata
        ...authConfig,
      })

      const versions = Object.keys(packument.versions || {}).sort(semver.rcompare)
      const latestVersion = packument['dist-tags']?.latest || versions[0] || ''
      const npmPackument = packument as NpmPackument

      return {
        name: packument.name,
        versions,
        latestVersion,
        tags: packument['dist-tags'] || {},
        time: npmPackument.time || {}, // Still include time for newest versions feature
      }
    }, `Fetching package versions for ${packageName}`)

    // Cache the result to persistent storage if caching is enabled
    if (this.cachingEnabled) {
      registryCache.set(cacheKey, packageVersions, this.versionCacheTtl)
    }

    return packageVersions
  }

  /**
   * Get package information including all versions
   * @deprecated Use getPackageVersions() for better performance
   */
  async getPackageInfo(packageName: string): Promise<PackageInfo> {
    this.validatePackageName(packageName)

    const registryUrl = this.getRegistryForPackage(packageName)
    const cacheKey = `package:${registryUrl}:${packageName}`

    // Check persistent cache first if caching is enabled
    if (this.cachingEnabled) {
      const cached = registryCache.get(cacheKey) as PackageInfo | undefined
      if (cached) {
        return cached
      }
    }

    // Use lightweight version and extend with additional metadata only if needed
    const versionInfo = await this.getPackageVersions(packageName)

    const packageInfo = await this.executeWithRetry(async () => {
      // Only fetch full metadata if we actually need the extended info
      const authConfig = this.getAuthConfig(registryUrl)
      const packument = await pacote.packument(packageName, {
        registry: registryUrl,
        timeout: this.timeout,
        fullMetadata: true,
        ...authConfig,
      })

      const npmPackument = packument as NpmPackument
      return {
        name: versionInfo.name,
        description: npmPackument.description,
        homepage: npmPackument.homepage,
        repository: npmPackument.repository,
        license: npmPackument.license,
        author: npmPackument.author,
        maintainers: npmPackument.maintainers,
        keywords: npmPackument.keywords,
        versions: versionInfo.versions,
        latestVersion: versionInfo.latestVersion,
        tags: versionInfo.tags,
        time: versionInfo.time || {},
      }
    }, `Fetching package info for ${packageName}`)

    // Cache the result to persistent storage if caching is enabled
    if (this.cachingEnabled) {
      registryCache.set(cacheKey, packageInfo, this.packageInfoCacheTtl)
    }

    return packageInfo
  }

  /**
   * Get the latest version of a package
   */
  async getLatestVersion(packageName: string): Promise<Version> {
    this.validatePackageName(packageName)

    try {
      const versionInfo = await this.getPackageVersions(packageName)
      return Version.fromString(versionInfo.latestVersion)
    } catch (error) {
      throw new RegistryError(
        packageName,
        'getLatestVersion',
        `Failed to get latest version: ${error}`,
        undefined,
        error instanceof Error ? error : undefined
      )
    }
  }

  /**
   * Get the greatest version that satisfies a range
   *
   * Optimized with early termination. Since versions are sorted
   * descending (greatest first), we return immediately on first match
   * instead of filtering through all versions.
   */
  async getGreatestVersion(packageName: string, range?: VersionRange): Promise<Version> {
    this.validatePackageName(packageName)

    try {
      const versionInfo = await this.getPackageVersions(packageName)

      if (!range) {
        return Version.fromString(versionInfo.latestVersion)
      }

      // Early termination - versions are sorted descending,
      // so the first satisfying version is the greatest
      for (const v of versionInfo.versions) {
        try {
          const version = Version.fromString(v)
          if (version.satisfies(range)) {
            return version // Early return on first match (greatest version)
          }
        } catch {
          // Skip invalid versions
        }
      }

      // No satisfying version found
      throw new InvalidVersionRangeError(range.toString())
    } catch (error) {
      if (error instanceof RegistryError || error instanceof InvalidVersionRangeError) {
        throw error
      }
      throw new RegistryError(
        packageName,
        'getGreatestVersion',
        `Failed to get greatest version: ${error}`,
        undefined,
        error instanceof Error ? error : undefined
      )
    }
  }

  /**
   * Get versions by date (newest versions published)
   */
  async getNewestVersions(packageName: string, count: number = 10): Promise<Version[]> {
    this.validatePackageName(packageName)

    try {
      const versionInfo = await this.getPackageVersions(packageName)

      // Sort versions by publication time
      const versionsWithTime = versionInfo.versions
        .map((version) => ({
          version,
          time: versionInfo.time?.[version] ? new Date(versionInfo.time[version]) : new Date(0),
        }))
        .sort((a, b) => b.time.getTime() - a.time.getTime())
        .slice(0, count)

      return versionsWithTime.map((item) => Version.fromString(item.version))
    } catch (error) {
      throw new RegistryError(
        packageName,
        'getNewestVersions',
        `Failed to get newest versions: ${error}`,
        undefined,
        error instanceof Error ? error : undefined
      )
    }
  }

  /**
   * Check for security vulnerabilities
   */
  async checkSecurityVulnerabilities(
    packageName: string,
    version: string
  ): Promise<SecurityReport> {
    this.validatePackageName(packageName)

    const registryUrl = this.getRegistryForPackage(packageName)
    const cacheKey = `security:${registryUrl}:${packageName}@${version}`

    // Check persistent cache first (security data has longer TTL)
    if (this.cachingEnabled) {
      const cached = registryCache.get(cacheKey) as SecurityReport | undefined
      if (cached) {
        return cached
      }
    }

    try {
      // Use npm v1 bulk advisories API (legacy /-/npm/v1/security/audits retired in pnpm v11)
      const auditData = {
        query: {
          name: packageName,
          version: version,
        },
      }

      const authConfig = this.getAuthConfig(registryUrl)
      const response = await npmRegistryFetch('/v1/advisories/bulk', {
        method: 'POST',
        body: JSON.stringify(auditData),
        headers: {
          'Content-Type': 'application/json',
        },
        registry: registryUrl,
        timeout: this.timeout,
        ...authConfig,
      })

      const auditResult = (await response.json()) as NpmAuditResponse
      const vulnerabilities: SecurityVulnerability[] = []

      // Parse audit results (new npm v1 advisories format: advisories are arrays per package)
      if (auditResult.advisories) {
        for (const [pkgName, advisories] of Object.entries(auditResult.advisories)) {
          // Each package name maps to an array of advisories
          const advisoryList = Array.isArray(advisories) ? advisories : [advisories]
          for (const advisory of advisoryList) {
            vulnerabilities.push({
              id: advisory.id.toString(),
              title: advisory.title,
              severity: advisory.severity,
              description: advisory.overview,
              reference: advisory.url,
              vulnerable_versions: advisory.vulnerable_versions,
              patched_versions: advisory.patched_versions,
              recommendation: advisory.recommendation,
            })
          }
        }
      }

      const securityReport: SecurityReport = {
        package: packageName,
        version: version,
        vulnerabilities,
        hasVulnerabilities: vulnerabilities.length > 0,
      }

      // Cache the result to persistent storage with longer TTL for security data
      if (this.cachingEnabled) {
        registryCache.set(cacheKey, securityReport, this.securityCacheTtl)
      }

      return securityReport
    } catch (error) {
      // If security check fails, return empty report
      UserFriendlyErrorHandler.handleSecurityCheckFailure(packageName, toError(error))

      const emptyReport: SecurityReport = {
        package: packageName,
        version: version,
        vulnerabilities: [],
        hasVulnerabilities: false,
      }

      return emptyReport
    }
  }

  /**
   * Batch query multiple packages with progress tracking
   * Returns both successful results and failure information
   */
  async batchQueryVersions(
    packages: string[],
    progressCallback?: (completed: number, total: number, currentPackage: string) => void
  ): Promise<BatchQueryResult> {
    for (const packageName of packages) {
      this.validatePackageName(packageName)
    }

    const results = new Map<string, PackageInfo>()
    const failures: BatchQueryFailure[] = []
    let completed = 0
    const total = packages.length

    await parallelLimitWithRateLimit(
      packages,
      async (packageName) => {
        try {
          const info = await this.getPackageInfo(packageName)
          results.set(packageName, info)
        } catch (error) {
          const err = toError(error)
          failures.push({
            packageName,
            error: err,
            errorMessage: err.message,
          })
          UserFriendlyErrorHandler.handlePackageQueryFailure(packageName, err)
        } finally {
          // Update progress for both success and failure
          completed++
          if (progressCallback) {
            progressCallback(completed, total, packageName)
          }
        }
      },
      {
        concurrency: this.concurrency,
        rateLimit: this.rateLimit,
      }
    )

    return {
      results,
      failures,
      totalCount: total,
      successCount: results.size,
      failureCount: failures.length,
    }
  }

  /**
   * Check if package author has changed
   */
  async hasPackageAuthorChanged(
    packageName: string,
    fromVersion: string,
    toVersion: string
  ): Promise<boolean> {
    this.validatePackageName(packageName)
    try {
      // const packageInfo = await this.getPackageInfo(packageName);

      const registryUrl = this.getRegistryForPackage(packageName)
      const authConfig = this.getAuthConfig(registryUrl)

      const fromVersionData = await pacote.manifest(`${packageName}@${fromVersion}`, {
        registry: registryUrl,
        timeout: this.timeout,
        ...authConfig,
      })

      const toVersionData = await pacote.manifest(`${packageName}@${toVersion}`, {
        registry: registryUrl,
        timeout: this.timeout,
        ...authConfig,
      })

      // Compare authors/maintainers
      // Use type-safe extraction instead of double type assertion
      const fromAuthor = this.normalizeAuthor(extractAuthorFromManifest(fromVersionData))
      const toAuthor = this.normalizeAuthor(extractAuthorFromManifest(toVersionData))

      return fromAuthor !== toAuthor
    } catch (error) {
      // Log for debugging, don't show to user as this is not critical
      UserFriendlyErrorHandler.handlePackageQueryFailure(packageName, toError(error), {
        operation: 'author-check',
      })
      return false
    }
  }

  /**
   * Get package download statistics
   * ERR-003: Enhanced error handling with timeout, specific HTTP status handling, and JSON parse safety
   */
  async getDownloadStats(
    packageName: string,
    period: 'last-day' | 'last-week' | 'last-month' = 'last-week'
  ): Promise<number> {
    const apiUrl = this.npmDownloadsApiUrl.endsWith('/')
      ? this.npmDownloadsApiUrl.slice(0, -1)
      : this.npmDownloadsApiUrl
    const url = `${apiUrl}/downloads/point/${period}/${packageName}`

    try {
      // ERR-003: Add timeout to prevent hanging requests
      const response = await timeout(
        fetch(url),
        this.timeout,
        `Download stats request timed out after ${this.timeout}ms for ${packageName}`
      )

      // ERR-003: Handle specific HTTP status codes
      if (!response.ok) {
        const status = response.status
        if (status === 404) {
          // Package not found in downloads API - not an error, just no stats available
          return 0
        }
        if (status === 429) {
          // Rate limited - log and return 0 gracefully
          UserFriendlyErrorHandler.handlePackageQueryFailure(
            packageName,
            new Error(`Rate limited by npm downloads API (HTTP 429)`),
            { operation: 'download-stats' }
          )
          return 0
        }
        if (status >= 500) {
          // Server error - log for debugging
          throw new RegistryError(packageName, 'download-stats', 'Server error', status)
        }
        throw new RegistryError(packageName, 'download-stats', 'HTTP error', status)
      }

      // ERR-003: Safe JSON parsing with explicit error handling
      let data: NpmDownloadStats
      try {
        data = (await response.json()) as NpmDownloadStats
      } catch (parseError) {
        throw new RegistryError(
          packageName,
          'download-stats',
          parseError instanceof Error ? parseError.message : 'Invalid JSON',
          undefined,
          parseError instanceof Error ? parseError : undefined
        )
      }

      return data.downloads ?? 0
    } catch (error) {
      // Log for debugging, don't show to user as this is not critical
      UserFriendlyErrorHandler.handlePackageQueryFailure(packageName, toError(error), {
        operation: 'download-stats',
      })
      return 0
    }
  }

  /**
   * Clear all cache (delegates to shared registryCache)
   */
  clearCache(): void {
    registryCache.clear()
  }

  /**
   * Get cache statistics (delegates to shared registryCache)
   */
  getCacheStats(): {
    totalEntries: number
    totalSize: number
    hitRate: number
    hits: number
    misses: number
  } {
    return registryCache.getStats()
  }

  /**
   * Normalize author for comparison
   * MAINT-002: Updated to accept the full range of author types
   */
  private normalizeAuthor(author: string | PackageAuthor | undefined): string {
    if (!author) {
      return ''
    }
    if (typeof author === 'string') {
      return author.toLowerCase().trim()
    }
    if (typeof author === 'object' && author.name) {
      return author.name.toLowerCase().trim()
    }
    return ''
  }
}
