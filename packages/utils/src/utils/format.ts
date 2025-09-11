/**
 * Format Utilities
 */

/**
 * Format bytes to human readable string
 */
export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Format duration in milliseconds to human readable string
 */
export function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
  if (ms < 3600000) return `${(ms / 60000).toFixed(1)}m`;
  return `${(ms / 3600000).toFixed(1)}h`;
}

/**
 * Format number with thousands separator
 */
export function formatNumber(num: number, separator: string = ','): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}

/**
 * Format percentage
 */
export function formatPercentage(value: number, total: number, decimals: number = 1): string {
  if (total === 0) return '0%';
  const percentage = (value / total) * 100;
  return `${percentage.toFixed(decimals)}%`;
}

/**
 * Format timestamp to relative time
 */
export function formatRelativeTime(timestamp: number | Date): string {
  const now = Date.now();
  const time = typeof timestamp === 'number' ? timestamp : timestamp.getTime();
  const diff = now - time;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} day${days === 1 ? '' : 's'} ago`;
  if (hours > 0) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  if (minutes > 0) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
  return `${seconds} second${seconds === 1 ? '' : 's'} ago`;
}

/**
 * Format table data
 */
export function formatTable(
  headers: string[],
  rows: string[][],
  options: {
    padding?: number;
    align?: Array<'left' | 'center' | 'right'>;
    borders?: boolean;
  } = {}
): string {
  const { padding = 1, align = [], borders = true } = options;

  if (rows.length === 0) return '';

  // Calculate column widths
  const widths = headers.map((header, i) => {
    const columnValues = [header, ...rows.map((row) => row[i] || '')];
    return Math.max(...columnValues.map((val) => val.length));
  });

  // Format row function
  const formatRow = (cells: string[], _isHeader: boolean = false) => {
    const formattedCells = cells.map((cell, i) => {
      const width = widths[i] || 0;
      const alignment = align[i] || 'left';

      let formatted = cell;
      if (alignment === 'center') {
        const totalPad = width - cell.length;
        const leftPad = Math.floor(totalPad / 2);
        const rightPad = totalPad - leftPad;
        formatted = ' '.repeat(leftPad) + cell + ' '.repeat(rightPad);
      } else if (alignment === 'right') {
        formatted = cell.padStart(width);
      } else {
        formatted = cell.padEnd(width);
      }

      return ' '.repeat(padding) + formatted + ' '.repeat(padding);
    });

    return borders ? `|${formattedCells.join('|')}|` : formattedCells.join(' ');
  };

  // Build table
  const lines: string[] = [];

  if (borders) {
    // Top border
    const topBorder = widths.map((w) => '-'.repeat(w + padding * 2)).join('+');
    lines.push(`+${topBorder}+`);
  }

  // Header
  lines.push(formatRow(headers, true));

  if (borders) {
    // Header separator
    const headerSep = widths.map((w) => '-'.repeat(w + padding * 2)).join('+');
    lines.push(`+${headerSep}+`);
  }

  // Rows
  rows.forEach((row) => {
    lines.push(formatRow(row));
  });

  if (borders) {
    // Bottom border
    const bottomBorder = widths.map((w) => '-'.repeat(w + padding * 2)).join('+');
    lines.push(`+${bottomBorder}+`);
  }

  return lines.join('\n');
}
