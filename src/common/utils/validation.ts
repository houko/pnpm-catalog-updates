/**
 * Validation Utilities
 */

/**
 * Validation result interface
 */
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Create validation result
 */
export function createValidationResult(
  isValid: boolean = true,
  errors: string[] = [],
  warnings: string[] = []
): ValidationResult {
  return { isValid, errors, warnings };
}

/**
 * Validate email address
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate URL
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate semver version
 */
export function isValidSemver(version: string): boolean {
  const semverRegex =
    /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;
  return semverRegex.test(version);
}

/**
 * Validate package name
 */
export function isValidPackageName(name: string): boolean {
  // NPM package name rules
  const packageNameRegex = /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/;
  return packageNameRegex.test(name) && name.length <= 214;
}

/**
 * Validate file path
 */
export function isValidPath(path: string): boolean {
  // Basic path validation (no null bytes, etc.)
  return !path.includes('\0') && path.length > 0 && path.length < 4096;
}

/**
 * Validate JSON string
 */
export function isValidJson(jsonString: string): boolean {
  try {
    JSON.parse(jsonString);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate YAML string
 */
export function isValidYaml(yamlString: string): boolean {
  try {
    // Simple YAML validation - check for basic structure
    const lines = yamlString.split('\n');
    // let indentLevel = 0; // Reserved for future use

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed === '' || trimmed.startsWith('#')) {
        continue; // Skip empty lines and comments
      }

      const currentIndent = line.length - line.trimStart().length;
      if (currentIndent % 2 !== 0) {
        return false; // YAML uses 2-space indentation
      }

      if (trimmed.includes(':') && !trimmed.startsWith('-')) {
        // Key-value pair
        const [key] = trimmed.split(':');
        if (key?.trim() === '') {
          return false;
        }
      }
    }

    return true;
  } catch {
    return false;
  }
}

/**
 * Validate glob pattern
 */
export function isValidGlob(pattern: string): boolean {
  try {
    // Basic glob pattern validation
    if (pattern.includes('**/**/**')) {
      return false; // Too many recursive wildcards
    }

    if (pattern.includes('//')) {
      return false; // Double slashes
    }

    // Check for balanced brackets
    let bracketDepth = 0;
    let braceDepth = 0;

    for (const char of pattern) {
      if (char === '[') bracketDepth++;
      else if (char === ']') bracketDepth--;
      else if (char === '{') braceDepth++;
      else if (char === '}') braceDepth--;

      if (bracketDepth < 0 || braceDepth < 0) {
        return false;
      }
    }

    return bracketDepth === 0 && braceDepth === 0;
  } catch {
    return false;
  }
}

/**
 * Validate port number
 */
export function isValidPort(port: number | string): boolean {
  const portNum = typeof port === 'string' ? parseInt(port, 10) : port;
  return !isNaN(portNum) && portNum >= 1 && portNum <= 65535;
}

/**
 * Validate timeout value
 */
export function isValidTimeout(timeout: number): boolean {
  return timeout > 0 && timeout <= 300000; // Max 5 minutes
}

/**
 * Validate log level
 */
export function isValidLogLevel(level: string): boolean {
  return ['error', 'warn', 'info', 'debug'].includes(level.toLowerCase());
}

/**
 * Validate update target
 */
export function isValidUpdateTarget(target: string): boolean {
  return ['latest', 'greatest', 'minor', 'patch', 'newest'].includes(target.toLowerCase());
}

/**
 * Validate output format
 */
export function isValidOutputFormat(format: string): boolean {
  return ['table', 'json', 'yaml', 'minimal'].includes(format.toLowerCase());
}

/**
 * Validate CLI command options
 */
export function validateCliOptions(options: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Validate workspace path
  if (options.workspace && !isValidPath(options.workspace)) {
    errors.push('Invalid workspace path');
  }

  // Validate registry URL
  if (options.registry && !isValidUrl(options.registry)) {
    errors.push('Invalid registry URL');
  }

  // Validate timeout
  if (options.timeout !== undefined && !isValidTimeout(options.timeout)) {
    errors.push('Invalid timeout value (must be between 1 and 300000ms)');
  }

  // Validate target
  if (options.target && !isValidUpdateTarget(options.target)) {
    errors.push('Invalid update target (must be: latest, greatest, minor, patch, newest)');
  }

  // Validate format
  if (options.format && !isValidOutputFormat(options.format)) {
    errors.push('Invalid output format (must be: table, json, yaml, minimal)');
  }

  // Validate include patterns
  if (options.include && Array.isArray(options.include)) {
    for (const pattern of options.include) {
      if (typeof pattern === 'string' && !isValidGlob(pattern)) {
        warnings.push(`Invalid include pattern: ${pattern}`);
      }
    }
  }

  // Validate exclude patterns
  if (options.exclude && Array.isArray(options.exclude)) {
    for (const pattern of options.exclude) {
      if (typeof pattern === 'string' && !isValidGlob(pattern)) {
        warnings.push(`Invalid exclude pattern: ${pattern}`);
      }
    }
  }

  // Validate catalog name
  if (options.catalog && typeof options.catalog === 'string') {
    if (options.catalog.trim() === '') {
      errors.push('Catalog name cannot be empty');
    }
    if (options.catalog.includes('/') || options.catalog.includes('\\')) {
      errors.push('Catalog name cannot contain path separators');
    }
  }

  return createValidationResult(errors.length === 0, errors, warnings);
}

/**
 * Validate configuration object
 */
export function validateConfig(config: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Validate registry settings
  if (config.registry) {
    if (config.registry.url && !isValidUrl(config.registry.url)) {
      errors.push('Invalid registry URL in configuration');
    }

    if (config.registry.timeout && !isValidTimeout(config.registry.timeout)) {
      errors.push('Invalid registry timeout in configuration');
    }

    if (config.registry.retries && (config.registry.retries < 0 || config.registry.retries > 10)) {
      warnings.push('Registry retries should be between 0 and 10');
    }
  }

  // Validate update settings
  if (config.update) {
    if (config.update.target && !isValidUpdateTarget(config.update.target)) {
      errors.push('Invalid update target in configuration');
    }
  }

  // Validate output settings
  if (config.output) {
    if (config.output.format && !isValidOutputFormat(config.output.format)) {
      errors.push('Invalid output format in configuration');
    }
  }

  // Validate logging settings
  if (config.logging) {
    if (config.logging.level && !isValidLogLevel(config.logging.level)) {
      errors.push('Invalid log level in configuration');
    }

    if (config.logging.file && !isValidPath(config.logging.file)) {
      errors.push('Invalid log file path in configuration');
    }
  }

  return createValidationResult(errors.length === 0, errors, warnings);
}

/**
 * Sanitize string input
 */
export function sanitizeString(
  input: string,
  options: {
    maxLength?: number;
    allowedChars?: RegExp;
    stripHtml?: boolean;
  } = {}
): string {
  let result = input;

  // Strip HTML tags if requested with comprehensive multi-pass sanitization
  if (options.stripHtml) {
    let previousLength: number;
    let iterationCount = 0;
    const maxIterations = 10; // Prevent infinite loops

    // Multi-pass sanitization to handle nested and complex patterns
    do {
      previousLength = result.length;
      iterationCount++;

      // Remove HTML tags, including malformed and incomplete ones
      result = result.replace(/<[^>]*>?/g, '');
      result = result.replace(/<!--[\s\S]*?-->/g, ''); // Remove HTML comments

      // Remove HTML entities
      result = result.replace(/&[a-zA-Z0-9#]+;/g, '');
      result = result.replace(/&#[0-9]+;/g, ''); // Numeric entities
      result = result.replace(/&#x[0-9a-fA-F]+;/g, ''); // Hex entities

      // Remove any remaining < or > characters and incomplete tags
      result = result.replace(/[<>]/g, '');
      result = result.replace(/\[script/gi, ''); // Handle [script patterns
      result = result.replace(/\[\/script/gi, ''); // Handle [/script patterns

      // Remove potentially dangerous protocol schemes
      result = result.replace(/javascript\s*:/gi, '');
      result = result.replace(/data\s*:/gi, '');
      result = result.replace(/vbscript\s*:/gi, '');
      result = result.replace(/file\s*:/gi, '');
      result = result.replace(/ftp\s*:/gi, '');
      result = result.replace(/mailto\s*:/gi, '');

      // Remove event handlers (more comprehensive)
      result = result.replace(/on\w+\s*=\s*['"]*[^'"]*['"]*[^>]*/gi, '');
      result = result.replace(/on\w+\s*=/gi, '');

      // Remove script-related content (more aggressive)
      result = result.replace(/script[\s\S]*?\/script/gi, '');
      result = result.replace(/style[\s\S]*?\/style/gi, '');
      result = result.replace(/iframe[\s\S]*?\/iframe/gi, '');
      result = result.replace(/object[\s\S]*?\/object/gi, '');
      result = result.replace(/embed[\s\S]*?\/embed/gi, '');
      result = result.replace(/applet[\s\S]*?\/applet/gi, '');

      // Remove dangerous HTML elements by name
      result = result.replace(/script\b/gi, '');
      result = result.replace(/iframe\b/gi, '');
      result = result.replace(/object\b/gi, '');
      result = result.replace(/embed\b/gi, '');
      result = result.replace(/applet\b/gi, '');
      result = result.replace(/meta\b/gi, '');
      result = result.replace(/link\b/gi, '');
      result = result.replace(/base\b/gi, '');

      // Remove control characters and non-printable characters
      // eslint-disable-next-line no-control-regex
      result = result.replace(/[\x00-\x1F\x7F-\x9F]/g, '');

      // Remove potentially dangerous CSS expressions
      result = result.replace(/expression\s*\(/gi, '');
      result = result.replace(/url\s*\(/gi, '');
      result = result.replace(/import\s*\(/gi, '');

      // Remove additional dangerous patterns
      result = result.replace(/eval\s*\(/gi, '');
      result = result.replace(/setTimeout\s*\(/gi, '');
      result = result.replace(/setInterval\s*\(/gi, '');
      result = result.replace(/Function\s*\(/gi, '');

      // Remove dangerous attributes
      result = result.replace(/src\s*=/gi, '');
      result = result.replace(/href\s*=/gi, '');
      result = result.replace(/action\s*=/gi, '');
      result = result.replace(/formaction\s*=/gi, '');
    } while (
      result.length !== previousLength &&
      result.length > 0 &&
      iterationCount < maxIterations
    );
  }

  // Filter allowed characters
  if (options.allowedChars) {
    result = result.replace(new RegExp(`[^${options.allowedChars.source}]`, 'g'), '');
  }

  // Truncate to max length
  if (options.maxLength && result.length > options.maxLength) {
    result = result.substring(0, options.maxLength);
  }

  return result.trim();
}

/**
 * Validate and sanitize package name
 */
export function sanitizePackageName(name: string): string {
  return sanitizeString(name, {
    maxLength: 214,
    allowedChars: /[a-z0-9@/._~*-]/,
  }).toLowerCase();
}
