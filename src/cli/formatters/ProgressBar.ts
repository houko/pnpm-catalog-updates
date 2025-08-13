/**
 * Enhanced Progress Bar
 *
 * Provides beautiful progress indicators for CLI operations
 * with multiple styles and themes.
 */

import chalk from 'chalk';
import ora, { Ora } from 'ora';

export interface ProgressBarOptions {
  text?: string;
  color?: string;
  spinner?: string;
  total?: number;
}

export class ProgressBar {
  private spinner: Ora | null = null;
  private current = 0;
  private total = 0;
  private text = '';

  constructor(private readonly options: ProgressBarOptions = {}) {
    this.text = options.text || 'Processing...';
    this.total = options.total || 0;
  }

  /**
   * Start the progress bar
   */
  start(text?: string): void {
    this.text = text || this.text;
    this.spinner = ora({
      text: this.text,
      color: (this.options.color as any) || 'cyan',
      spinner: (this.options.spinner as any) || 'dots',
    }).start();
  }

  /**
   * Update progress with text
   */
  update(text: string, current?: number, total?: number): void {
    if (!this.spinner) return;

    this.text = text;
    if (current !== undefined) this.current = current;
    if (total !== undefined) this.total = total;

    const progressText = this.total > 0 ? `${text} (${this.current}/${this.total})` : text;

    this.spinner.text = progressText;
  }

  /**
   * Increment progress
   */
  increment(amount = 1, text?: string): void {
    if (!this.spinner) return;

    this.current += amount;
    if (text) this.text = text;

    const progressText =
      this.total > 0 ? `${this.text} (${this.current}/${this.total})` : this.text;

    this.spinner.text = progressText;
  }

  /**
   * Mark as succeeded
   */
  succeed(text?: string): void {
    if (this.spinner) {
      this.spinner.succeed(text);
      this.spinner = null;
    }
  }

  /**
   * Mark as failed
   */
  fail(text?: string): void {
    if (this.spinner) {
      this.spinner.fail(text);
      this.spinner = null;
    }
  }

  /**
   * Mark as warning
   */
  warn(text?: string): void {
    if (this.spinner) {
      this.spinner.warn(text);
      this.spinner = null;
    }
  }

  /**
   * Mark as info
   */
  info(text?: string): void {
    if (this.spinner) {
      this.spinner.info(text);
      this.spinner = null;
    }
  }

  /**
   * Stop the progress bar
   */
  stop(): void {
    if (this.spinner) {
      this.spinner.stop();
      this.spinner = null;
    }
  }

  /**
   * Create a multi-step progress indicator
   */
  static createMultiStep(steps: string[]): MultiStepProgress {
    return new MultiStepProgress(steps);
  }
}

/**
 * Multi-step progress indicator
 */
export class MultiStepProgress {
  private currentStep = 0;
  private steps: string[] = [];

  constructor(steps: string[]) {
    this.steps = steps;
  }

  start(): void {
    console.log(chalk.bold('\n📋 Progress Steps:\n'));
    this.renderSteps();
  }

  next(text?: string): void {
    if (this.currentStep < this.steps.length) {
      const stepText = text || this.steps[this.currentStep];
      console.log(`  ${chalk.green('✓')} ${stepText}`);
      this.currentStep++;

      if (this.currentStep < this.steps.length) {
        console.log(`  ${chalk.cyan('→')} ${this.steps[this.currentStep]}`);
      }
    }
  }

  complete(): void {
    console.log(chalk.green('\n🎉 All steps completed!\n'));
  }

  private renderSteps(): void {
    this.steps.forEach((step, index) => {
      const prefix = index === 0 ? chalk.cyan('→') : '  ';
      const style = index < this.currentStep ? chalk.green : chalk.gray;
      console.log(`  ${prefix} ${style(step)}`);
    });
    console.log('');
  }
}

/**
 * Progress bar with percentage
 */
export class PercentageProgressBar {
  private current = 0;
  private total = 0;
  private text = '';
  private lastRender = '';

  constructor(private readonly width = 30) {}

  start(total: number, text: string): void {
    this.total = total;
    this.current = 0;
    this.text = text;
    this.render();
  }

  update(current: number, text?: string): void {
    this.current = current;
    if (text) this.text = text;
    this.render();
  }

  increment(amount = 1, text?: string): void {
    this.current += amount;
    if (text) this.text = text;
    this.render();
  }

  complete(text?: string): void {
    this.current = this.total;
    if (text) this.text = text;
    this.render();
    console.log(''); // New line after completion
  }

  private render(): void {
    const percentage = Math.round((this.current / this.total) * 100);
    const filledWidth = Math.round((this.current / this.total) * this.width);
    const emptyWidth = this.width - filledWidth;

    const filledBar = chalk.green('█'.repeat(filledWidth));
    const emptyBar = chalk.gray('░'.repeat(emptyWidth));
    const bar = filledBar + emptyBar;

    const progressText = `${this.text} [${bar}] ${percentage}% (${this.current}/${this.total})`;

    // Clear previous line and render new one
    if (this.lastRender) {
      process.stdout.write('\r\x1b[K');
    }

    process.stdout.write(progressText);
    this.lastRender = progressText;

    if (this.current >= this.total) {
      process.stdout.write('\n');
    }
  }
}

/**
 * Progress manager for batch operations
 */
export class BatchProgressManager {
  private bars: Map<string, ProgressBar> = new Map();
  private totalOperations = 0;
  private completedOperations = 0;

  createBar(id: string, options?: ProgressBarOptions): ProgressBar {
    const bar = new ProgressBar(options);
    this.bars.set(id, bar);
    return bar;
  }

  getBar(id: string): ProgressBar | undefined {
    return this.bars.get(id);
  }

  setTotal(total: number): void {
    this.totalOperations = total;
  }

  updateOverall(text: string): void {
    const percentage =
      this.totalOperations > 0
        ? Math.round((this.completedOperations / this.totalOperations) * 100)
        : 0;

    console.log(
      chalk.cyan(
        `📊 Overall Progress: ${percentage}% (${this.completedOperations}/${this.totalOperations})`
      )
    );
    if (text) {
      console.log(chalk.gray(`  → ${text}`));
    }
  }

  completeOperation(text?: string): void {
    this.completedOperations++;
    if (text) {
      this.updateOverall(text);
    }
  }

  cleanup(): void {
    this.bars.forEach((bar) => bar.stop());
    this.bars.clear();
  }
}
