/**
 * Error Handling Module
 *
 * Provides centralized error handling for user-friendly error messages
 * and error tracking/statistics.
 */

export { ErrorTracker } from './errorTracker.js';
export type { SkippedPackage } from './errorTracker.js';
export { UserFriendlyErrorHandler } from './userFriendlyErrorHandler.js';
export type { ErrorContext, PackageSuggestion } from './userFriendlyErrorHandler.js';
