import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';

export default [
  // Base ESLint recommended configuration
  js.configs.recommended,

  // Base configuration for all files
  {
    files: ['**/*.{js,ts,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tsParser,
      globals: {
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        global: 'readonly',
        module: 'readonly',
        require: 'readonly',
        exports: 'readonly',
      },
    },
    rules: {
      // General ESLint rules
      'no-console': 'off', // CLI tool needs console output
      'no-debugger': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      'no-unused-vars': 'off', // Too many false positives during development
      'no-case-declarations': 'off',
      'no-undef': 'off', // TypeScript handles this
    },
  },

  // Configuration for test files
  {
    files: ['test/**/*.{js,ts}', '**/*.test.{js,ts}', '**/*.spec.{js,ts}'],
    rules: {
      'no-console': 'off',
      'no-var': 'off', // Allow var in test global declarations
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },

  // Configuration for config files
  {
    files: ['*.config.{js,ts,mjs,cjs}', '.eslintrc.{js,cjs}'],
    languageOptions: {
      sourceType: 'script',
      globals: {
        module: 'readonly',
        require: 'readonly',
        exports: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
      },
    },
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
      'node/no-unpublished-require': 'off',
    },
  },

  // Ignore patterns
  {
    ignores: ['node_modules/**', 'dist/**', 'bin/**', 'coverage/**', '*.d.ts', '.pnpm-store/**'],
  },
];
