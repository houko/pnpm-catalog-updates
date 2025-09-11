/**
 * Color Theme System
 *
 * Provides consistent color schemes and styling across the CLI
 */

import chalk from 'chalk';

export interface ColorTheme {
  // Brand colors
  primary: (text: string) => string;
  secondary: (text: string) => string;
  accent: (text: string) => string;

  // Semantic colors
  success: (text: string) => string;
  warning: (text: string) => string;
  error: (text: string) => string;
  info: (text: string) => string;

  // UI colors
  text: (text: string) => string;
  muted: (text: string) => string;
  border: (text: string) => string;
  background: (text: string) => string;

  // Status colors
  pending: (text: string) => string;
  processing: (text: string) => string;
  completed: (text: string) => string;

  // Version colors
  major: (text: string) => string;
  minor: (text: string) => string;
  patch: (text: string) => string;
  prerelease: (text: string) => string;

  // Risk levels
  riskHigh: (text: string) => string;
  riskMedium: (text: string) => string;
  riskLow: (text: string) => string;
}

export class ThemeManager {
  private static currentTheme: ColorTheme;

  static themes = {
    default: {
      primary: (text: string) => chalk.hex('#0ea5e9')(text),
      secondary: (text: string) => chalk.hex('#8b5cf6')(text),
      accent: (text: string) => chalk.hex('#f59e0b')(text),

      success: (text: string) => chalk.green(text),
      warning: (text: string) => chalk.yellow(text),
      error: (text: string) => chalk.red(text),
      info: (text: string) => chalk.blue(text),

      text: (text: string) => chalk.white(text),
      muted: (text: string) => chalk.gray(text),
      border: (text: string) => chalk.dim(text),
      background: (text: string) => chalk.bgBlack(text),

      pending: (text: string) => chalk.cyan(text),
      processing: (text: string) => chalk.blue(text),
      completed: (text: string) => chalk.green(text),

      major: (text: string) => chalk.red(text),
      minor: (text: string) => chalk.yellow(text),
      patch: (text: string) => chalk.green(text),
      prerelease: (text: string) => chalk.magenta(text),

      riskHigh: (text: string) => chalk.red(text),
      riskMedium: (text: string) => chalk.yellow(text),
      riskLow: (text: string) => chalk.green(text),
    },

    modern: {
      primary: (text: string) => chalk.hex('#06b6d4')(text),
      secondary: (text: string) => chalk.hex('#ec4899')(text),
      accent: (text: string) => chalk.hex('#10b981')(text),

      success: (text: string) => chalk.hex('#10b981')(text),
      warning: (text: string) => chalk.hex('#f59e0b')(text),
      error: (text: string) => chalk.hex('#ef4444')(text),
      info: (text: string) => chalk.hex('#06b6d4')(text),

      text: (text: string) => chalk.hex('#e5e7eb')(text),
      muted: (text: string) => chalk.hex('#6b7280')(text),
      border: (text: string) => chalk.hex('#374151')(text),
      background: (text: string) => chalk.hex('#111827')(text),

      pending: (text: string) => chalk.hex('#06b6d4')(text),
      processing: (text: string) => chalk.hex('#3b82f6')(text),
      completed: (text: string) => chalk.hex('#10b981')(text),

      major: (text: string) => chalk.hex('#ef4444')(text),
      minor: (text: string) => chalk.hex('#f59e0b')(text),
      patch: (text: string) => chalk.hex('#10b981')(text),
      prerelease: (text: string) => chalk.hex('#8b5cf6')(text),

      riskHigh: (text: string) => chalk.hex('#ef4444')(text),
      riskMedium: (text: string) => chalk.hex('#f59e0b')(text),
      riskLow: (text: string) => chalk.hex('#10b981')(text),
    },

    minimal: {
      primary: (text: string) => chalk.white(text),
      secondary: (text: string) => chalk.gray(text),
      accent: (text: string) => chalk.white(text),

      success: (text: string) => chalk.green(text),
      warning: (text: string) => chalk.yellow(text),
      error: (text: string) => chalk.red(text),
      info: (text: string) => chalk.blue(text),

      text: (text: string) => chalk.white(text),
      muted: (text: string) => chalk.gray(text),
      border: (text: string) => chalk.gray(text),
      background: (text: string) => chalk.white(text),

      pending: (text: string) => chalk.blue(text),
      processing: (text: string) => chalk.blue(text),
      completed: (text: string) => chalk.green(text),

      major: (text: string) => chalk.red(text),
      minor: (text: string) => chalk.yellow(text),
      patch: (text: string) => chalk.green(text),
      prerelease: (text: string) => chalk.magenta(text),

      riskHigh: (text: string) => chalk.red(text),
      riskMedium: (text: string) => chalk.yellow(text),
      riskLow: (text: string) => chalk.green(text),
    },

    neon: {
      primary: (text: string) => chalk.hex('#00ffff')(text),
      secondary: (text: string) => chalk.hex('#ff00ff')(text),
      accent: (text: string) => chalk.hex('#ffff00')(text),

      success: (text: string) => chalk.hex('#00ff00')(text),
      warning: (text: string) => chalk.hex('#ffff00')(text),
      error: (text: string) => chalk.hex('#ff0000')(text),
      info: (text: string) => chalk.hex('#00ffff')(text),

      text: (text: string) => chalk.hex('#ffffff')(text),
      muted: (text: string) => chalk.hex('#808080')(text),
      border: (text: string) => chalk.hex('#404040')(text),
      background: (text: string) => chalk.hex('#000000')(text),

      pending: (text: string) => chalk.hex('#00ffff')(text),
      processing: (text: string) => chalk.hex('#0080ff')(text),
      completed: (text: string) => chalk.hex('#00ff00')(text),

      major: (text: string) => chalk.hex('#ff0000')(text),
      minor: (text: string) => chalk.hex('#ffff00')(text),
      patch: (text: string) => chalk.hex('#00ff00')(text),
      prerelease: (text: string) => chalk.hex('#ff00ff')(text),

      riskHigh: (text: string) => chalk.hex('#ff0000')(text),
      riskMedium: (text: string) => chalk.hex('#ffff00')(text),
      riskLow: (text: string) => chalk.hex('#00ff00')(text),
    },
  };

  static setTheme(themeName: keyof typeof ThemeManager.themes): void {
    this.currentTheme = this.themes[themeName];
  }

  static getTheme(): ColorTheme {
    return this.currentTheme || this.themes.default;
  }

  static listThemes(): string[] {
    return Object.keys(this.themes);
  }
}

/**
 * Styled text utilities
 */
export class StyledText {
  private static theme = ThemeManager.getTheme();

  static updateTheme(): void {
    this.theme = ThemeManager.getTheme();
  }

  // Brand styles
  static brand(text: string): string {
    return this.theme.primary(text);
  }

  static secondary(text: string): string {
    return this.theme.secondary(text);
  }

  static accent(text: string): string {
    return this.theme.accent(text);
  }

  // Semantic styles
  static success(text: string): string {
    return this.theme.success(text);
  }

  static warning(text: string): string {
    return this.theme.warning(text);
  }

  static error(text: string): string {
    return this.theme.error(text);
  }

  static info(text: string): string {
    return this.theme.info(text);
  }

  // UI styles
  static text(text: string): string {
    return this.theme.text(text);
  }

  static muted(text: string): string {
    return this.theme.muted(text);
  }

  static border(text: string): string {
    return this.theme.border(text);
  }

  // Status styles
  static pending(text: string): string {
    return this.theme.pending(text);
  }

  static processing(text: string): string {
    return this.theme.processing(text);
  }

  static completed(text: string): string {
    return this.theme.completed(text);
  }

  // Version styles
  static versionMajor(text: string): string {
    return this.theme.major(text);
  }

  static versionMinor(text: string): string {
    return this.theme.minor(text);
  }

  static versionPatch(text: string): string {
    return this.theme.patch(text);
  }

  static versionPrerelease(text: string): string {
    return this.theme.prerelease(text);
  }

  // Risk styles
  static riskHigh(text: string): string {
    return this.theme.riskHigh(text);
  }

  static riskMedium(text: string): string {
    return this.theme.riskMedium(text);
  }

  static riskLow(text: string): string {
    return this.theme.riskLow(text);
  }

  // Icons
  static icon(icon: string, text?: string): string {
    return text ? `${icon} ${text}` : icon;
  }

  static iconSuccess(text?: string): string {
    return this.icon('✅', text);
  }

  static iconWarning(text?: string): string {
    return this.icon('⚠️', text);
  }

  static iconError(text?: string): string {
    return this.icon('❌', text);
  }

  static iconInfo(text?: string): string {
    return this.icon('ℹ️', text);
  }

  static iconPackage(text?: string): string {
    return this.icon('📦', text);
  }

  static iconCatalog(text?: string): string {
    return this.icon('📋', text);
  }

  static iconUpdate(text?: string): string {
    return this.icon('🔄', text);
  }

  static iconSecurity(text?: string): string {
    return this.icon('🔒', text);
  }

  static iconAnalysis(text?: string): string {
    return this.icon('🔍', text);
  }

  static iconCheck(text?: string): string {
    return this.icon('✅', text);
  }

  static iconProgress(text?: string): string {
    return this.icon('⏳', text);
  }

  static iconComplete(text?: string): string {
    return this.icon('🎉', text);
  }
}

/**
 * Table styling utilities
 */
export class TableStyles {
  static createHeaderStyle(color: any) {
    return (text: string) => color.bold(text);
  }

  static createBorderStyle(color: any) {
    return (text: string) => color.dim(text);
  }

  static createCellStyle(color: any) {
    return (text: string) => color(text);
  }
}

/**
 * Theme configuration interface
 */
export interface ThemeConfig {
  name: string;
  colors: Partial<ColorTheme>;
  icons: Record<string, string>;
  styles: Record<string, any>;
}

/**
 * Theme presets for different use cases
 */
export const themePresets = {
  development: {
    name: 'development',
    description: 'Bright colors for development environments',
    theme: 'modern',
  },
  production: {
    name: 'production',
    description: 'Subtle colors for production environments',
    theme: 'minimal',
  },
  presentation: {
    name: 'presentation',
    description: 'High contrast colors for presentations',
    theme: 'neon',
  },
  default: {
    name: 'default',
    description: 'Balanced colors for general use',
    theme: 'default',
  },
};
