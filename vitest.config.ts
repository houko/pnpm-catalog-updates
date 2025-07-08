import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Environment
    environment: 'node',

    // Global setup
    globals: true,

    // Test files
    include: [
      'test/unit/**/*.{test,spec}.{js,ts}',
      'src/**/*.{test,spec}.{js,ts}',
    ],
    exclude: [
      'node_modules',
      'dist',
      'test/e2e',
      'test/fixtures',
    ],

    // Timeouts
    testTimeout: 10000,
    hookTimeout: 10000,

    // Coverage
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      reportsDirectory: './coverage',
      exclude: [
        'node_modules/',
        'dist/',
        'test/',
        'scripts/',
        '*.config.{js,ts}',
        'src/common/types/',
        'src/**/*.d.ts',
        'src/**/*.test.{js,ts}',
        'src/**/*.spec.{js,ts}',
      ],
      all: true,
    },

    // Setup files
    setupFiles: ['./test/setup.ts'],

    // Reporter
    reporters: ['verbose', 'junit'],
    outputFile: {
      junit: './test-results.xml',
    },

    // Watch
    watch: false,

    // Threads
    maxConcurrency: 4,

    // Cache
    cache: {
      dir: 'node_modules/.vitest',
    },
  },

  // Path resolution
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@/cli': path.resolve(__dirname, 'src/cli'),
      '@/application': path.resolve(__dirname, 'src/application'),
      '@/domain': path.resolve(__dirname, 'src/domain'),
      '@/infrastructure': path.resolve(__dirname, 'src/infrastructure'),
      '@/adapters': path.resolve(__dirname, 'src/adapters'),
      '@/common': path.resolve(__dirname, 'src/common'),
    },
  },

  // Esbuild options
  esbuild: {
    target: 'es2022',
  },
});
