/**
 * Cache System
 * 
 * Provides caching capabilities for NPM registry responses and other expensive operations.
 * Supports both in-memory and file-based caching with TTL and size limits.
 */

import { writeFileSync, readFileSync, existsSync, mkdirSync, unlinkSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';
import { createHash } from 'crypto';

export interface CacheEntry<T = any> {
  key: string;
  value: T;
  timestamp: number;
  ttl: number; // Time to live in milliseconds
  size: number; // Estimated size in bytes
}

export interface CacheOptions {
  ttl?: number; // Default TTL in milliseconds
  maxSize?: number; // Max total cache size in bytes
  maxEntries?: number; // Max number of entries
  persistToDisk?: boolean; // Whether to persist cache to disk
  cacheDir?: string; // Directory for file-based cache
}

export interface CacheStats {
  totalEntries: number;
  totalSize: number;
  hitRate: number;
  missRate: number;
  hits: number;
  misses: number;
}

export class Cache<T = any> {
  private entries = new Map<string, CacheEntry<T>>();
  private stats = {
    hits: 0,
    misses: 0,
  };
  
  private options: Required<CacheOptions>;

  constructor(name: string, options: CacheOptions = {}) {
    this.options = {
      ttl: options.ttl || 3600000, // 1 hour default
      maxSize: options.maxSize || 50 * 1024 * 1024, // 50MB default
      maxEntries: options.maxEntries || 1000,
      persistToDisk: options.persistToDisk || false,
      cacheDir: options.cacheDir || join(homedir(), '.pcu', 'cache', name),
    };

    if (this.options.persistToDisk) {
      this.loadFromDisk();
    }

    // Setup cleanup interval
    setInterval(() => this.cleanup(), 300000); // Clean every 5 minutes
  }

  /**
   * Get value from cache
   */
  get(key: string): T | undefined {
    const entry = this.entries.get(key);
    
    if (!entry) {
      this.stats.misses++;
      return undefined;
    }

    // Check if entry has expired
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.entries.delete(key);
      this.stats.misses++;
      return undefined;
    }

    this.stats.hits++;
    return entry.value;
  }

  /**
   * Set value in cache
   */
  set(key: string, value: T, ttl?: number): void {
    const entryTtl = ttl || this.options.ttl;
    const size = this.estimateSize(value);
    
    const entry: CacheEntry<T> = {
      key,
      value,
      timestamp: Date.now(),
      ttl: entryTtl,
      size,
    };

    // Remove old entry if exists
    if (this.entries.has(key)) {
      this.entries.delete(key);
    }

    // Check size limits before adding
    this.ensureCapacity(size);
    
    this.entries.set(key, entry);
    
    if (this.options.persistToDisk) {
      this.saveToDisk(key, entry);
    }
  }

  /**
   * Check if key exists in cache
   */
  has(key: string): boolean {
    const entry = this.entries.get(key);
    
    if (!entry) {
      return false;
    }

    // Check if expired
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.entries.delete(key);
      return false;
    }

    return true;
  }

  /**
   * Delete entry from cache
   */
  delete(key: string): boolean {
    const deleted = this.entries.delete(key);
    
    if (deleted && this.options.persistToDisk) {
      this.deleteFromDisk(key);
    }
    
    return deleted;
  }

  /**
   * Clear all cache entries
   */
  clear(): void {
    this.entries.clear();
    this.stats.hits = 0;
    this.stats.misses = 0;
    
    if (this.options.persistToDisk) {
      this.clearDisk();
    }
  }

  /**
   * Get cache statistics
   */
  getStats(): CacheStats {
    const total = this.stats.hits + this.stats.misses;
    
    return {
      totalEntries: this.entries.size,
      totalSize: this.getTotalSize(),
      hitRate: total > 0 ? this.stats.hits / total : 0,
      missRate: total > 0 ? this.stats.misses / total : 0,
      hits: this.stats.hits,
      misses: this.stats.misses,
    };
  }

  /**
   * Get or set with factory function
   */
  async getOrSet(
    key: string, 
    factory: () => Promise<T> | T, 
    ttl?: number
  ): Promise<T> {
    const cached = this.get(key);
    
    if (cached !== undefined) {
      return cached;
    }

    const value = await factory();
    this.set(key, value, ttl);
    
    return value;
  }

  /**
   * Cleanup expired entries
   */
  private cleanup(): void {
    const now = Date.now();
    const expiredKeys: string[] = [];

    for (const [key, entry] of this.entries) {
      if (now - entry.timestamp > entry.ttl) {
        expiredKeys.push(key);
      }
    }

    for (const key of expiredKeys) {
      this.delete(key);
    }
  }

  /**
   * Ensure cache capacity doesn't exceed limits
   */
  private ensureCapacity(newEntrySize: number): void {
    // Check entry count limit
    while (this.entries.size >= this.options.maxEntries) {
      this.evictOldest();
    }

    // Check size limit
    while (this.getTotalSize() + newEntrySize > this.options.maxSize) {
      this.evictOldest();
    }
  }

  /**
   * Evict oldest entry
   */
  private evictOldest(): void {
    let oldestKey: string | undefined;
    let oldestTimestamp = Date.now();

    for (const [key, entry] of this.entries) {
      if (entry.timestamp < oldestTimestamp) {
        oldestTimestamp = entry.timestamp;
        oldestKey = key;
      }
    }

    if (oldestKey) {
      this.delete(oldestKey);
    }
  }

  /**
   * Get total cache size
   */
  private getTotalSize(): number {
    let totalSize = 0;
    for (const entry of this.entries.values()) {
      totalSize += entry.size;
    }
    return totalSize;
  }

  /**
   * Estimate size of value in bytes
   */
  private estimateSize(value: T): number {
    try {
      return JSON.stringify(value).length * 2; // Rough UTF-16 estimate
    } catch {
      return 1000; // Default estimate for non-serializable values
    }
  }

  /**
   * Load cache from disk
   */
  private loadFromDisk(): void {
    try {
      if (!existsSync(this.options.cacheDir)) {
        return;
      }

      const indexPath = join(this.options.cacheDir, 'index.json');
      if (!existsSync(indexPath)) {
        return;
      }

      const indexContent = readFileSync(indexPath, 'utf-8');
      const index = JSON.parse(indexContent);

      for (const key of index.keys || []) {
        try {
          const entryPath = join(this.options.cacheDir, this.getFilename(key));
          if (existsSync(entryPath)) {
            const entryContent = readFileSync(entryPath, 'utf-8');
            const entry = JSON.parse(entryContent);
            
            // Check if entry is still valid
            if (Date.now() - entry.timestamp <= entry.ttl) {
              this.entries.set(key, entry);
            }
          }
        } catch {
          // Skip corrupted entries
        }
      }
    } catch {
      // Ignore disk loading errors
    }
  }

  /**
   * Save entry to disk
   */
  private saveToDisk(key: string, entry: CacheEntry<T>): void {
    try {
      if (!existsSync(this.options.cacheDir)) {
        mkdirSync(this.options.cacheDir, { recursive: true });
      }

      const entryPath = join(this.options.cacheDir, this.getFilename(key));
      writeFileSync(entryPath, JSON.stringify(entry), 'utf-8');

      // Update index
      this.updateDiskIndex();
    } catch {
      // Ignore disk saving errors
    }
  }

  /**
   * Delete entry from disk
   */
  private deleteFromDisk(key: string): void {
    try {
      const entryPath = join(this.options.cacheDir, this.getFilename(key));
      if (existsSync(entryPath)) {
        unlinkSync(entryPath);
      }
      this.updateDiskIndex();
    } catch {
      // Ignore disk deletion errors
    }
  }

  /**
   * Clear disk cache
   */
  private clearDisk(): void {
    try {
      if (existsSync(this.options.cacheDir)) {
        const fs = require('fs');
        fs.rmSync(this.options.cacheDir, { recursive: true, force: true });
      }
    } catch {
      // Ignore disk clearing errors
    }
  }

  /**
   * Update disk index
   */
  private updateDiskIndex(): void {
    try {
      const indexPath = join(this.options.cacheDir, 'index.json');
      const index = {
        keys: Array.from(this.entries.keys()),
        lastUpdated: Date.now(),
      };
      writeFileSync(indexPath, JSON.stringify(index), 'utf-8');
    } catch {
      // Ignore index update errors
    }
  }

  /**
   * Get filename for cache key
   */
  private getFilename(key: string): string {
    // Use hash to create safe filename
    const hash = createHash('md5').update(key).digest('hex');
    return `${hash}.json`;
  }
}

/**
 * Registry-specific cache for NPM API responses
 */
export class RegistryCache extends Cache<any> {
  constructor(options: CacheOptions = {}) {
    super('registry', {
      ttl: 3600000, // 1 hour
      maxSize: 10 * 1024 * 1024, // 10MB
      maxEntries: 500,
      persistToDisk: true,
      ...options,
    });
  }

  /**
   * Cache package info
   */
  setPackageInfo(packageName: string, info: any, ttl?: number): void {
    this.set(`package:${packageName}`, info, ttl);
  }

  /**
   * Get cached package info
   */
  getPackageInfo(packageName: string): any | undefined {
    return this.get(`package:${packageName}`);
  }

  /**
   * Cache version list
   */
  setVersions(packageName: string, versions: string[], ttl?: number): void {
    this.set(`versions:${packageName}`, versions, ttl);
  }

  /**
   * Get cached versions
   */
  getVersions(packageName: string): string[] | undefined {
    return this.get(`versions:${packageName}`);
  }

  /**
   * Cache security report
   */
  setSecurityReport(packageName: string, version: string, report: any, ttl?: number): void {
    this.set(`security:${packageName}:${version}`, report, ttl);
  }

  /**
   * Get cached security report
   */
  getSecurityReport(packageName: string, version: string): any | undefined {
    return this.get(`security:${packageName}:${version}`);
  }
}

/**
 * Workspace-specific cache for file system operations
 */
export class WorkspaceCache extends Cache<any> {
  constructor(options: CacheOptions = {}) {
    super('workspace', {
      ttl: 300000, // 5 minutes (shorter TTL for file system)
      maxSize: 5 * 1024 * 1024, // 5MB
      maxEntries: 200,
      persistToDisk: false, // Don't persist workspace cache
      ...options,
    });
  }

  /**
   * Cache workspace info
   */
  setWorkspaceInfo(workspacePath: string, info: any, ttl?: number): void {
    this.set(`workspace:${workspacePath}`, info, ttl);
  }

  /**
   * Get cached workspace info
   */
  getWorkspaceInfo(workspacePath: string): any | undefined {
    return this.get(`workspace:${workspacePath}`);
  }

  /**
   * Cache package.json content
   */
  setPackageJson(filePath: string, content: any, ttl?: number): void {
    this.set(`package-json:${filePath}`, content, ttl);
  }

  /**
   * Get cached package.json
   */
  getPackageJson(filePath: string): any | undefined {
    return this.get(`package-json:${filePath}`);
  }
}

// Export singleton instances
export const registryCache = new RegistryCache();
export const workspaceCache = new WorkspaceCache();