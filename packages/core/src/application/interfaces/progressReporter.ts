/**
 * Progress Reporter Interface
 *
 * Abstraction for reporting progress during long-running operations.
 * This allows the core application layer to report progress without
 * depending on specific CLI formatting implementations.
 */

export interface ProgressReporter {
  start(message: string, total?: number): void;
  update(current: number, message?: string): void;
  increment(message?: string): void;
  success(message?: string): void;
  fail(message?: string): void;
  stop(): void;
}

export interface ProgressReporterOptions {
  title?: string;
  total?: number;
  current?: number;
}
