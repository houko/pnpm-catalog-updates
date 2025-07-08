/**
 * Async Utilities
 */

/**
 * Delay execution for specified milliseconds
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Retry a function with exponential backoff
 */
export async function retry<T>(
  fn: () => Promise<T>,
  options: {
    maxAttempts?: number;
    baseDelay?: number;
    maxDelay?: number;
    backoffFactor?: number;
    shouldRetry?: (error: any) => boolean;
  } = {}
): Promise<T> {
  const {
    maxAttempts = 3,
    baseDelay = 1000,
    maxDelay = 30000,
    backoffFactor = 2,
    shouldRetry = () => true,
  } = options;

  let lastError: any;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      if (attempt === maxAttempts || !shouldRetry(error)) {
        throw error;
      }

      const delayMs = Math.min(baseDelay * Math.pow(backoffFactor, attempt - 1), maxDelay);
      await delay(delayMs);
    }
  }

  throw lastError;
}

/**
 * Execute functions in parallel with concurrency limit
 */
export async function parallelLimit<T, R>(
  items: T[],
  fn: (item: T, index: number) => Promise<R>,
  limit: number = 5
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  const executing: Promise<void>[] = [];

  for (let i = 0; i < items.length; i++) {
    const promise = fn(items[i]!, i).then(result => {
      results[i] = result;
    });

    executing.push(promise);

    if (executing.length >= limit) {
      await Promise.race(executing);
      executing.splice(executing.findIndex(p => p === promise), 1);
    }
  }

  await Promise.all(executing);
  return results;
}

/**
 * Race with timeout
 */
export async function timeout<T>(
  promise: Promise<T>,
  ms: number,
  message?: string
): Promise<T> {
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject(new Error(message || `Operation timed out after ${ms}ms`));
    }, ms);
  });

  return Promise.race([promise, timeoutPromise]);
}

/**
 * Debounce async function
 */
export function debounce<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  ms: number
): T {
  let timeoutId: NodeJS.Timeout;
  let latestResolve: ((value: any) => void) | undefined;
  let latestReject: ((reason: any) => void) | undefined;

  return ((...args: any[]) => {
    return new Promise((resolve, reject) => {
      latestResolve = resolve;
      latestReject = reject;

      clearTimeout(timeoutId);
      timeoutId = setTimeout(async () => {
        try {
          const result = await fn(...args);
          latestResolve?.(result);
        } catch (error) {
          latestReject?.(error);
        }
      }, ms);
    });
  }) as T;
}

/**
 * Throttle async function
 */
export function throttle<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  ms: number
): T {
  let inThrottle = false;
  let lastResult: any;

  return (async (...args: any[]) => {
    if (!inThrottle) {
      inThrottle = true;
      lastResult = await fn(...args);
      setTimeout(() => { inThrottle = false; }, ms);
    }
    return lastResult;
  }) as T;
}

/**
 * Create a cancelable promise
 */
export function cancelable<T>(
  promise: Promise<T>
): { promise: Promise<T>; cancel: () => void } {
  let isCanceled = false;

  const cancelablePromise = new Promise<T>((resolve, reject) => {
    promise
      .then(value => {
        if (!isCanceled) {
          resolve(value);
        }
      })
      .catch(error => {
        if (!isCanceled) {
          reject(error);
        }
      });
  });

  return {
    promise: cancelablePromise,
    cancel: () => {
      isCanceled = true;
    },
  };
}

/**
 * Execute async function with circuit breaker pattern
 */
export class CircuitBreaker<T extends (...args: any[]) => Promise<any>> {
  private failures = 0;
  private lastFailureTime = 0;
  private state: 'closed' | 'open' | 'half-open' = 'closed';

  constructor(
    private fn: T,
    private options: {
      failureThreshold?: number;
      recoveryTimeout?: number;
      monitoringPeriod?: number;
    } = {}
  ) {
    const {
      failureThreshold = 5,
      recoveryTimeout = 60000,
      monitoringPeriod = 10000,
    } = options;

    this.options = { failureThreshold, recoveryTimeout, monitoringPeriod };
  }

  async execute(...args: Parameters<T>): Promise<ReturnType<T>> {
    if (this.state === 'open') {
      if (Date.now() - this.lastFailureTime > this.options.recoveryTimeout!) {
        this.state = 'half-open';
      } else {
        throw new Error('Circuit breaker is open');
      }
    }

    try {
      const result = await this.fn(...args);
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  private onSuccess(): void {
    this.failures = 0;
    this.state = 'closed';
  }

  private onFailure(): void {
    this.failures++;
    this.lastFailureTime = Date.now();

    if (this.failures >= this.options.failureThreshold!) {
      this.state = 'open';
    }
  }

  getState(): string {
    return this.state;
  }

  reset(): void {
    this.failures = 0;
    this.state = 'closed';
    this.lastFailureTime = 0;
  }
}

/**
 * Async queue with concurrency control
 */
export class AsyncQueue<T = any> {
  private queue: Array<() => Promise<T>> = [];
  private running = 0;

  constructor(private concurrency: number = 1) {}

  async add<R>(fn: () => Promise<R>): Promise<R> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const result = await fn();
          resolve(result as any);
          return result as any;
        } catch (error) {
          reject(error);
          throw error;
        }
      });

      this.process();
    });
  }

  private async process(): Promise<void> {
    if (this.running >= this.concurrency || this.queue.length === 0) {
      return;
    }

    this.running++;
    const fn = this.queue.shift()!;

    try {
      await fn();
    } finally {
      this.running--;
      this.process();
    }
  }

  size(): number {
    return this.queue.length;
  }

  clear(): void {
    this.queue.length = 0;
  }
}