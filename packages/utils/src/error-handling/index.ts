/**
 * Error Handling Module
 *
 * Provides centralized error handling for user-friendly error messages
 * and error tracking/statistics.
 */

export { UserFriendlyErrorHandler } from './userFriendlyErrorHandler.js';
export { ErrorTracker } from './errorTracker.js';
export type { ErrorContext, PackageSuggestion } from './userFriendlyErrorHandler.js';
export type { SkippedPackage } from './errorTracker.js';
