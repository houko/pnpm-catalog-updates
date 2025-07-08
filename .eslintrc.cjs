module.exports = {
  root: true,
  env: {
    browser: false,
    es2022: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
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
  overrides: [
    {
      files: ['test/**/*.ts', '**/*.test.ts', '**/*.spec.ts'],
      rules: {
        'no-console': 'off',
      },
    },
  ],
};