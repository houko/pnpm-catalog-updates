/**
 * CLI-specific Type Definitions
 */

/**
 * CLI command execution context
 */
export interface CliContext {
  command: string;
  args: string[];
  options: Record<string, any>;
  workingDirectory: string;
  startTime: Date;
  user?: string;
  environment: Record<string, string>;
}

/**
 * CLI command result
 */
export interface CliResult {
  exitCode: number;
  stdout?: string;
  stderr?: string;
  duration: number;
  command: string;
  success: boolean;
}

/**
 * CLI progress reporter
 */
export interface CliProgressReporter {
  start(message: string, total?: number): void;
  update(current: number, message?: string): void;
  increment(step?: number, message?: string): void;
  succeed(message?: string): void;
  fail(message?: string): void;
  warn(message: string): void;
  info(message: string): void;
  stop(): void;
}

/**
 * CLI input prompt options
 */
export interface PromptOptions {
  type: 'input' | 'confirm' | 'select' | 'multiselect' | 'password';
  message: string;
  default?: any;
  choices?: Array<{
    title: string;
    value: any;
    description?: string;
    disabled?: boolean;
  }>;
  validate?: (value: any) => boolean | string;
  format?: (value: any) => string;
  initial?: any;
  hint?: string;
}

/**
 * CLI table column definition
 */
export interface TableColumn {
  header: string;
  field: string;
  width?: number;
  align?: 'left' | 'center' | 'right';
  format?: (value: any) => string;
  color?: (value: any) => string;
}

/**
 * CLI table options
 */
export interface TableOptions {
  columns: TableColumn[];
  data: Record<string, any>[];
  title?: string;
  border?: boolean;
  compact?: boolean;
  maxWidth?: number;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}

/**
 * CLI spinner options
 */
export interface SpinnerOptions {
  text: string;
  color?: 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white' | 'gray';
  spinner?: string;
  interval?: number;
  stream?: NodeJS.WriteStream;
}

/**
 * CLI notification
 */
export interface CliNotification {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  actions?: Array<{
    title: string;
    action: () => void | Promise<void>;
  }>;
  timeout?: number;
  persistent?: boolean;
}

/**
 * CLI error with additional context
 */
export interface CliError extends Error {
  code?: string;
  exitCode?: number;
  command?: string;
  args?: string[];
  suggestions?: string[];
  helpUrl?: string;
  context?: Record<string, any>;
}

/**
 * CLI help section
 */
export interface HelpSection {
  title: string;
  content: string;
  order?: number;
}

/**
 * CLI command definition
 */
export interface CommandDefinition {
  name: string;
  description: string;
  usage?: string;
  aliases?: string[];
  options?: OptionDefinition[];
  examples?: Example[];
  subcommands?: CommandDefinition[];
  hidden?: boolean;
  deprecated?: boolean;
  category?: string;
}

/**
 * CLI option definition
 */
export interface OptionDefinition {
  flags: string;
  description: string;
  default?: any;
  choices?: string[];
  required?: boolean;
  multiple?: boolean;
  type?: 'string' | 'number' | 'boolean';
  env?: string;
  hidden?: boolean;
  deprecated?: boolean;
}

/**
 * CLI example
 */
export interface Example {
  description: string;
  command: string;
  output?: string;
}

/**
 * CLI theme configuration
 */
export interface CliTheme {
  colors: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    error: string;
    info: string;
    muted: string;
    bright: string;
  };
  symbols: {
    success: string;
    error: string;
    warning: string;
    info: string;
    question: string;
    pointer: string;
    line: string;
    corner: string;
  };
  styles: {
    header: (text: string) => string;
    subheader: (text: string) => string;
    emphasis: (text: string) => string;
    code: (text: string) => string;
    url: (text: string) => string;
  };
}

/**
 * CLI autocomplete suggestion
 */
export interface AutocompleteSuggestion {
  value: string;
  description?: string;
  type: 'command' | 'option' | 'argument' | 'file' | 'directory';
  priority?: number;
}

/**
 * CLI session information
 */
export interface CliSession {
  id: string;
  startTime: Date;
  user: string;
  terminal: string;
  shell: string;
  commands: Array<{
    command: string;
    timestamp: Date;
    duration: number;
    exitCode: number;
  }>;
  environment: Record<string, string>;
}

/**
 * CLI metrics
 */
export interface CliMetrics {
  totalCommands: number;
  successfulCommands: number;
  failedCommands: number;
  averageExecutionTime: number;
  mostUsedCommands: Array<{
    command: string;
    count: number;
  }>;
  errorsByType: Record<string, number>;
  usageByHour: number[];
}

/**
 * CLI update information
 */
export interface UpdateInfo {
  currentVersion: string;
  latestVersion: string;
  hasUpdate: boolean;
  changelog?: string;
  downloadUrl?: string;
  releaseDate?: Date;
  breaking?: boolean;
}

/**
 * CLI extension information
 */
export interface ExtensionInfo {
  name: string;
  version: string;
  description: string;
  author: string;
  enabled: boolean;
  commands?: CommandDefinition[];
  hooks?: Array<{
    event: string;
    handler: string;
  }>;
  dependencies?: string[];
}