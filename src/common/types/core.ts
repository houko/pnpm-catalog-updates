/**
 * Core Type Definitions
 */

/**
 * Generic Result type for operations that can succeed or fail
 */
export interface Result<T = void, E = Error> {
  success: boolean;
  data?: T;
  error?: E;
  message?: string;
}

/**
 * Success result constructor
 */
export function Success<T>(data?: T, message?: string): Result<T> {
  return {
    success: true,
    data,
    message,
  };
}

/**
 * Error result constructor
 */
export function Failure<E = Error>(error: E, message?: string): Result<never, E> {
  return {
    success: false,
    error,
    message,
  };
}

/**
 * Validation result with detailed feedback
 */
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  suggestions?: string[];
}

/**
 * Progress information for long-running operations
 */
export interface ProgressInfo {
  current: number;
  total: number;
  percentage: number;
  message?: string;
  startTime: number;
  estimatedTimeRemaining?: number;
}

/**
 * Statistical information
 */
export interface Statistics {
  count: number;
  min?: number;
  max?: number;
  avg?: number;
  sum?: number;
}

/**
 * Time range
 */
export interface TimeRange {
  start: Date;
  end: Date;
  duration: number; // milliseconds
}

/**
 * File information
 */
export interface FileInfo {
  path: string;
  name: string;
  extension: string;
  size: number;
  lastModified: Date;
  isDirectory: boolean;
  exists: boolean;
}

/**
 * Network response information
 */
export interface NetworkResponse<T = any> {
  status: number;
  statusText: string;
  data: T;
  headers: Record<string, string>;
  timing: {
    start: number;
    end: number;
    duration: number;
  };
}

/**
 * Cache metadata
 */
export interface CacheMetadata {
  key: string;
  createdAt: Date;
  expiresAt: Date;
  size: number;
  hitCount: number;
  lastAccessed: Date;
}

/**
 * Log context for structured logging
 */
export interface LogContext {
  operation?: string;
  userId?: string;
  requestId?: string;
  sessionId?: string;
  correlationId?: string;
  tags?: string[];
  metadata?: Record<string, any>;
}

/**
 * Feature flag definition
 */
export interface FeatureFlag {
  name: string;
  enabled: boolean;
  description?: string;
  rolloutPercentage?: number;
  conditions?: Record<string, any>;
}

/**
 * Environment information
 */
export interface Environment {
  name: 'development' | 'staging' | 'production' | 'test';
  version: string;
  buildDate: Date;
  commitHash?: string;
  branch?: string;
  nodeVersion: string;
  platform: string;
  arch: string;
}

/**
 * Resource usage information
 */
export interface ResourceUsage {
  memory: {
    used: number;
    available: number;
    percentage: number;
  };
  cpu: {
    usage: number;
    cores: number;
  };
  disk?: {
    used: number;
    available: number;
    percentage: number;
  };
}

/**
 * Pagination parameters
 */
export interface PaginationParams {
  page: number;
  limit: number;
  offset: number;
  total?: number;
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationParams & {
    hasNext: boolean;
    hasPrevious: boolean;
    totalPages: number;
  };
}

/**
 * Search parameters
 */
export interface SearchParams {
  query: string;
  filters?: Record<string, any>;
  sort?: {
    field: string;
    direction: 'asc' | 'desc';
  };
  pagination?: PaginationParams;
}

/**
 * Diff information
 */
export interface Diff<T = any> {
  added: T[];
  removed: T[];
  modified: Array<{
    old: T;
    new: T;
    changes: string[];
  }>;
  unchanged: T[];
}

/**
 * Health check status
 */
export interface HealthStatus {
  status: 'healthy' | 'unhealthy' | 'degraded';
  timestamp: Date;
  uptime: number;
  version: string;
  services: Record<string, {
    status: 'up' | 'down' | 'degraded';
    responseTime?: number;
    message?: string;
  }>;
}

/**
 * Event information
 */
export interface EventInfo {
  id: string;
  type: string;
  timestamp: Date;
  source: string;
  data: any;
  metadata?: Record<string, any>;
}

/**
 * Subscription information
 */
export interface Subscription {
  id: string;
  eventType: string;
  callback: (event: EventInfo) => void | Promise<void>;
  filter?: (event: EventInfo) => boolean;
  created: Date;
  lastTriggered?: Date;
  triggerCount: number;
}

/**
 * Rate limit information
 */
export interface RateLimit {
  limit: number;
  remaining: number;
  reset: Date;
  window: number; // seconds
}

/**
 * Retry configuration
 */
export interface RetryConfig {
  maxAttempts: number;
  baseDelay: number;
  maxDelay: number;
  backoffFactor: number;
  shouldRetry?: (error: any) => boolean;
}

/**
 * Timeout configuration
 */
export interface TimeoutConfig {
  connect: number;
  request: number;
  response: number;
}

/**
 * Lock information
 */
export interface LockInfo {
  id: string;
  owner: string;
  acquired: Date;
  expires: Date;
  renewable: boolean;
  metadata?: Record<string, any>;
}