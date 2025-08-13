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
  style?: 'default' | 'gradient' | 'fancy' | 'minimal' | 'rainbow' | 'neon';
  width?: number;
  showPercentage?: boolean;
  showSpeed?: boolean;
}

export class ProgressBar {
  private spinner: Ora | null = null;
  private current = 0;
  private total = 0;
  private text = '';
  private startTime: number = 0;
  private style: string;
  private showPercentage: boolean;
  private showSpeed: boolean;

  constructor(private readonly options: ProgressBarOptions = {}) {
    this.text = options.text || 'Processing...';
    this.total = options.total || 0;
    this.style = options.style || 'default';
    this.showPercentage = options.showPercentage ?? true;
    this.showSpeed = options.showSpeed ?? true;
  }

  /**
   * Start the progress bar
   */
  start(text?: string): void {
    this.text = text || this.text;
    this.startTime = Date.now();

    // Get beautiful spinner based on style
    const spinnerConfig = this.getSpinnerConfig();

    this.spinner = ora({
      text: this.getStyledText(),
      color: (this.options.color as any) || spinnerConfig.color,
      spinner: (this.options.spinner as any) || spinnerConfig.spinner,
    }).start();
  }

  /**
   * Get spinner configuration based on style
   */
  private getSpinnerConfig(): { spinner: string; color: string } {
    switch (this.style) {
      case 'gradient':
        return { spinner: 'arc', color: 'magenta' };
      case 'fancy':
        return { spinner: 'bouncingBar', color: 'cyan' };
      case 'minimal':
        return { spinner: 'line', color: 'white' };
      case 'rainbow':
        return { spinner: 'rainbow', color: 'rainbow' };
      case 'neon':
        return { spinner: 'weather', color: 'green' };
      default:
        return { spinner: 'dots12', color: 'cyan' };
    }
  }

  /**
   * Get styled text with decorations
   */
  private getStyledText(): string {
    const percentage = this.total > 0 ? Math.round((this.current / this.total) * 100) : 0;
    const elapsed = Date.now() - this.startTime;
    const speed = elapsed > 0 ? Math.round((this.current / elapsed) * 1000) : 0;

    let styledText = this.text;

    // Add progress information
    if (this.total > 0) {
      if (this.showPercentage) {
        styledText += ` ${this.getStyledPercentage(percentage)}`;
      }
      styledText += ` ${this.getStyledProgress()}`;

      if (this.showSpeed && speed > 0) {
        styledText += ` ${chalk.gray(`(${speed}/s)`)}`;
      }
    }

    return this.applyTextStyle(styledText);
  }

  /**
   * Get styled percentage based on progress
   */
  private getStyledPercentage(percentage: number): string {
    if (percentage < 25) return chalk.red(`${percentage}%`);
    if (percentage < 50) return chalk.yellow(`${percentage}%`);
    if (percentage < 75) return chalk.blue(`${percentage}%`);
    if (percentage < 100) return chalk.cyan(`${percentage}%`);
    return chalk.green(`${percentage}%`);
  }

  /**
   * Get styled progress counter
   */
  private getStyledProgress(): string {
    return chalk.gray(`(${this.current}/${this.total})`);
  }

  /**
   * Apply text styling based on theme
   */
  private applyTextStyle(text: string): string {
    switch (this.style) {
      case 'gradient':
        return `${chalk.magenta('▶')} ${text}`;
      case 'fancy':
        return `${chalk.cyan('★')} ${text} ${chalk.cyan('★')}`;
      case 'minimal':
        return text;
      case 'rainbow':
        return `${chalk.magenta('◉')} ${text}`;
      case 'neon':
        return `${chalk.green.bold('⚡')} ${chalk.green(text)}`;
      default:
        return `${chalk.cyan('●')} ${text}`;
    }
  }

  /**
   * Update progress with text
   */
  update(text: string, current?: number, total?: number): void {
    if (!this.spinner) return;

    this.text = text;
    if (current !== undefined) this.current = current;
    if (total !== undefined) this.total = total;

    this.spinner.text = this.getStyledText();
  }

  /**
   * Increment progress
   */
  increment(amount = 1, text?: string): void {
    if (!this.spinner) return;

    this.current += amount;
    if (text) this.text = text;

    this.spinner.text = this.getStyledText();
  }

  /**
   * Mark as succeeded
   */
  succeed(text?: string): void {
    if (this.spinner) {
      const successText = text || this.getCompletionText();
      this.spinner.succeed(this.getSuccessMessage(successText));
      this.spinner = null;
    }
  }

  /**
   * Mark as failed
   */
  fail(text?: string): void {
    if (this.spinner) {
      const failText = text || this.getFailureText();
      this.spinner.fail(this.getFailureMessage(failText));
      this.spinner = null;
    }
  }

  /**
   * Get styled success message
   */
  private getSuccessMessage(text: string): string {
    const elapsed = this.getElapsedTime();
    switch (this.style) {
      case 'gradient':
        return `${chalk.magenta.bold('✨')} ${chalk.green(text)} ${chalk.gray(elapsed)}`;
      case 'fancy':
        return `${chalk.cyan('🎉')} ${chalk.green.bold(text)} ${chalk.cyan('🎉')} ${chalk.gray(elapsed)}`;
      case 'minimal':
        return chalk.green(text);
      case 'rainbow':
        return `${chalk.magenta('🌈')} ${chalk.green(text)} ${chalk.gray(elapsed)}`;
      case 'neon':
        return `${chalk.green.bold('⚡ SUCCESS')} ${chalk.green(text)} ${chalk.gray(elapsed)}`;
      default:
        return `${chalk.green('✅')} ${chalk.green(text)} ${chalk.gray(elapsed)}`;
    }
  }

  /**
   * Get styled failure message
   */
  private getFailureMessage(text: string): string {
    const elapsed = this.getElapsedTime();
    switch (this.style) {
      case 'gradient':
        return `${chalk.red.bold('💥')} ${chalk.red(text)} ${chalk.gray(elapsed)}`;
      case 'fancy':
        return `${chalk.red('💔')} ${chalk.red.bold(text)} ${chalk.red('💔')} ${chalk.gray(elapsed)}`;
      case 'minimal':
        return chalk.red(text);
      case 'rainbow':
        return `${chalk.red('⚠️')} ${chalk.red(text)} ${chalk.gray(elapsed)}`;
      case 'neon':
        return `${chalk.red.bold('⚡ ERROR')} ${chalk.red(text)} ${chalk.gray(elapsed)}`;
      default:
        return `${chalk.red('❌')} ${chalk.red(text)} ${chalk.gray(elapsed)}`;
    }
  }

  /**
   * Get completion text with stats
   */
  private getCompletionText(): string {
    const elapsed = this.getElapsedTime();
    const speed = this.getAverageSpeed();
    return `${this.text} completed ${speed} ${elapsed}`;
  }

  /**
   * Get failure text
   */
  private getFailureText(): string {
    return `${this.text} failed`;
  }

  /**
   * Get elapsed time formatted
   */
  private getElapsedTime(): string {
    const elapsed = Date.now() - this.startTime;
    if (elapsed < 1000) return `(${elapsed}ms)`;
    if (elapsed < 60000) return `(${(elapsed / 1000).toFixed(1)}s)`;
    return `(${Math.floor(elapsed / 60000)}m ${Math.floor((elapsed % 60000) / 1000)}s)`;
  }

  /**
   * Get average processing speed
   */
  private getAverageSpeed(): string {
    const elapsed = Date.now() - this.startTime;
    if (elapsed === 0 || this.current === 0) return '';
    const speed = Math.round((this.current / elapsed) * 1000);
    return speed > 0 ? `(${speed}/s)` : '';
  }

  /**
   * Mark as warning
   */
  warn(text?: string): void {
    if (this.spinner) {
      const warnText = text || this.text;
      this.spinner.warn(this.getWarningMessage(warnText));
      this.spinner = null;
    }
  }

  /**
   * Mark as info
   */
  info(text?: string): void {
    if (this.spinner) {
      const infoText = text || this.text;
      this.spinner.info(this.getInfoMessage(infoText));
      this.spinner = null;
    }
  }

  /**
   * Get styled warning message
   */
  private getWarningMessage(text: string): string {
    const elapsed = this.getElapsedTime();
    switch (this.style) {
      case 'gradient':
        return `${chalk.yellow.bold('⚡')} ${chalk.yellow(text)} ${chalk.gray(elapsed)}`;
      case 'fancy':
        return `${chalk.yellow('⚠️')} ${chalk.yellow.bold(text)} ${chalk.yellow('⚠️')} ${chalk.gray(elapsed)}`;
      case 'minimal':
        return chalk.yellow(text);
      case 'rainbow':
        return `${chalk.yellow('⚠️')} ${chalk.yellow(text)} ${chalk.gray(elapsed)}`;
      case 'neon':
        return `${chalk.yellow.bold('⚡ WARNING')} ${chalk.yellow(text)} ${chalk.gray(elapsed)}`;
      default:
        return `${chalk.yellow('⚠️')} ${chalk.yellow(text)} ${chalk.gray(elapsed)}`;
    }
  }

  /**
   * Get styled info message
   */
  private getInfoMessage(text: string): string {
    const elapsed = this.getElapsedTime();
    switch (this.style) {
      case 'gradient':
        return `${chalk.blue.bold('ℹ️')} ${chalk.blue(text)} ${chalk.gray(elapsed)}`;
      case 'fancy':
        return `${chalk.blue('💡')} ${chalk.blue.bold(text)} ${chalk.blue('💡')} ${chalk.gray(elapsed)}`;
      case 'minimal':
        return chalk.blue(text);
      case 'rainbow':
        return `${chalk.blue('ℹ️')} ${chalk.blue(text)} ${chalk.gray(elapsed)}`;
      case 'neon':
        return `${chalk.blue.bold('⚡ INFO')} ${chalk.blue(text)} ${chalk.gray(elapsed)}`;
      default:
        return `${chalk.blue('ℹ️')} ${chalk.blue(text)} ${chalk.gray(elapsed)}`;
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

  /**
   * Create a beautiful gradient progress bar
   */
  static createGradient(options?: Partial<ProgressBarOptions>): ProgressBar {
    return new ProgressBar({
      style: 'gradient',
      color: 'magenta',
      showPercentage: true,
      showSpeed: true,
      ...options,
    });
  }

  /**
   * Create a fancy progress bar with decorations
   */
  static createFancy(options?: Partial<ProgressBarOptions>): ProgressBar {
    return new ProgressBar({
      style: 'fancy',
      color: 'cyan',
      showPercentage: true,
      showSpeed: true,
      ...options,
    });
  }

  /**
   * Create a minimal clean progress bar
   */
  static createMinimal(options?: Partial<ProgressBarOptions>): ProgressBar {
    return new ProgressBar({
      style: 'minimal',
      color: 'white',
      showPercentage: false,
      showSpeed: false,
      ...options,
    });
  }

  /**
   * Create a rainbow themed progress bar
   */
  static createRainbow(options?: Partial<ProgressBarOptions>): ProgressBar {
    return new ProgressBar({
      style: 'rainbow',
      showPercentage: true,
      showSpeed: true,
      ...options,
    });
  }

  /**
   * Create a neon style progress bar
   */
  static createNeon(options?: Partial<ProgressBarOptions>): ProgressBar {
    return new ProgressBar({
      style: 'neon',
      color: 'green',
      showPercentage: true,
      showSpeed: true,
      ...options,
    });
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
 * Progress bar with percentage and beautiful visual effects
 */
export class PercentageProgressBar {
  private current = 0;
  private total = 0;
  private text = '';
  private lastRender = '';
  private startTime = 0;
  private style: string;

  constructor(
    private readonly width = 40,
    private readonly options: { style?: string; showStats?: boolean } = {}
  ) {
    this.style = options.style || 'gradient';
  }

  start(total: number, text: string): void {
    this.total = total;
    this.current = 0;
    this.text = text;
    this.startTime = Date.now();
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

    let bar: string;
    switch (this.style) {
      case 'gradient':
        bar = this.renderGradientBar(filledWidth, emptyWidth);
        break;
      case 'fancy':
        bar = this.renderFancyBar(filledWidth, emptyWidth);
        break;
      case 'minimal':
        bar = this.renderMinimalBar(filledWidth, emptyWidth);
        break;
      case 'blocks':
        bar = this.renderBlockBar(filledWidth, emptyWidth);
        break;
      default:
        bar = this.renderDefaultBar(filledWidth, emptyWidth);
    }

    let progressText = `${this.getStyledPrefix()} ${this.text} [${bar}] ${this.getStyledPercentage(percentage)} (${this.current}/${this.total})`;

    // Add stats if enabled
    if (this.options.showStats && this.startTime > 0) {
      const elapsed = Date.now() - this.startTime;
      const speed = elapsed > 0 ? Math.round((this.current / elapsed) * 1000) : 0;
      if (speed > 0) {
        progressText += ` ${chalk.gray(`${speed}/s`)}`;
      }
    }

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

  private renderGradientBar(filledWidth: number, emptyWidth: number): string {
    const colors = [chalk.red, chalk.yellow, chalk.green, chalk.cyan, chalk.blue, chalk.magenta];

    let filledBar = '';
    for (let i = 0; i < filledWidth; i++) {
      const colorIndex = Math.floor((i / this.width) * colors.length);
      const colorFn = colors[Math.min(colorIndex, colors.length - 1)];
      if (colorFn) {
        filledBar += colorFn('█');
      }
    }

    const emptyBar = chalk.gray('░'.repeat(emptyWidth));
    return filledBar + emptyBar;
  }

  private renderFancyBar(filledWidth: number, emptyWidth: number): string {
    const filledBar = chalk.cyan('▓'.repeat(filledWidth));
    const emptyBar = chalk.gray('░'.repeat(emptyWidth));
    return filledBar + emptyBar;
  }

  private renderMinimalBar(filledWidth: number, emptyWidth: number): string {
    const filledBar = chalk.white('━'.repeat(filledWidth));
    const emptyBar = chalk.gray('─'.repeat(emptyWidth));
    return filledBar + emptyBar;
  }

  private renderBlockBar(filledWidth: number, emptyWidth: number): string {
    const filledBar = chalk.green('■'.repeat(filledWidth));
    const emptyBar = chalk.gray('□'.repeat(emptyWidth));
    return filledBar + emptyBar;
  }

  private renderDefaultBar(filledWidth: number, emptyWidth: number): string {
    const filledBar = chalk.green('█'.repeat(filledWidth));
    const emptyBar = chalk.gray('░'.repeat(emptyWidth));
    return filledBar + emptyBar;
  }

  private getStyledPrefix(): string {
    switch (this.style) {
      case 'gradient':
        return chalk.magenta('▶');
      case 'fancy':
        return chalk.cyan('★');
      case 'minimal':
        return chalk.gray('•');
      case 'blocks':
        return chalk.green('◆');
      default:
        return chalk.cyan('●');
    }
  }

  private getStyledPercentage(percentage: number): string {
    if (percentage < 25) return chalk.red.bold(`${percentage}%`);
    if (percentage < 50) return chalk.yellow.bold(`${percentage}%`);
    if (percentage < 75) return chalk.blue.bold(`${percentage}%`);
    if (percentage < 100) return chalk.cyan.bold(`${percentage}%`);
    return chalk.green.bold(`${percentage}%`);
  }

  /**
   * Create a gradient percentage progress bar
   */
  static createGradient(width = 40): PercentageProgressBar {
    return new PercentageProgressBar(width, { style: 'gradient', showStats: true });
  }

  /**
   * Create a fancy percentage progress bar
   */
  static createFancy(width = 40): PercentageProgressBar {
    return new PercentageProgressBar(width, { style: 'fancy', showStats: true });
  }

  /**
   * Create a minimal percentage progress bar
   */
  static createMinimal(width = 40): PercentageProgressBar {
    return new PercentageProgressBar(width, { style: 'minimal', showStats: false });
  }

  /**
   * Create a block-style percentage progress bar
   */
  static createBlocks(width = 40): PercentageProgressBar {
    return new PercentageProgressBar(width, { style: 'blocks', showStats: true });
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
