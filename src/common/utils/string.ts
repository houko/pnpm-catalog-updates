/**
 * String Utilities
 */

/**
 * Convert camelCase to kebab-case
 */
export function camelToKebab(str: string): string {
  return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * Convert kebab-case to camelCase
 */
export function kebabToCamel(str: string): string {
  return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

/**
 * Capitalize first letter
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Truncate string with ellipsis
 */
export function truncate(str: string, maxLength: number, ellipsis: string = '...'): string {
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength - ellipsis.length) + ellipsis;
}

/**
 * Pad string to specified length
 */
export function pad(
  str: string,
  length: number,
  char: string = ' ',
  direction: 'left' | 'right' | 'both' = 'right'
): string {
  const padding = Math.max(0, length - str.length);

  switch (direction) {
    case 'left':
      return char.repeat(padding) + str;
    case 'both':
      const leftPad = Math.floor(padding / 2);
      const rightPad = padding - leftPad;
      return char.repeat(leftPad) + str + char.repeat(rightPad);
    case 'right':
    default:
      return str + char.repeat(padding);
  }
}

/**
 * Remove ANSI color codes from string
 */
export function stripAnsi(str: string): string {
  return str.replace(/\u001b\[[0-9;]*m/g, '');
}

/**
 * Pluralize word based on count
 */
export function pluralize(word: string, count: number, suffix: string = 's'): string {
  return count === 1 ? word : word + suffix;
}

/**
 * Generate random string
 */
export function randomString(
  length: number,
  chars: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
): string {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Escape string for use in regex
 */
export function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Convert string to slug (URL-friendly)
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove non-word chars
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Parse boolean from string (handles various formats)
 */
export function parseBoolean(value: string | boolean): boolean {
  if (typeof value === 'boolean') {
    return value;
  }

  const normalized = value.toLowerCase().trim();
  return normalized === 'true' || normalized === '1' || normalized === 'yes' || normalized === 'on';
}

/**
 * Format template string with variables
 */
export function template(str: string, variables: Record<string, any>): string {
  return str.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return variables[key] !== undefined ? String(variables[key]) : match;
  });
}

/**
 * Calculate string similarity (Levenshtein distance)
 */
export function similarity(a: string, b: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0]![j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i]![j] = matrix[i - 1]![j - 1]!;
      } else {
        matrix[i]![j] = Math.min(
          matrix[i - 1]![j - 1]! + 1, // substitution
          matrix[i]![j - 1]! + 1, // insertion
          matrix[i - 1]![j]! + 1 // deletion
        );
      }
    }
  }

  const maxLength = Math.max(a.length, b.length);
  return maxLength === 0 ? 1 : (maxLength - matrix[b.length]![a.length]!) / maxLength;
}
