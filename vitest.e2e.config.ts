import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Environment
    environment: 'node',

    // Global setup
    globals: true,

    // Test files
    include: ['test/e2e/**/*.{test,spec}.{js,ts}'],
    exclude: [
      'node_modules',
      'dist',
      'test/unit',
      'test/fixtures',
    ],

    // Timeouts (E2E tests may take longer)
    testTimeout: 60000,
    hookTimeout: 30000,

    // Setup files
    setupFiles: ['./test/e2e-setup.ts'],

    // Reporter
    reporters: ['verbose'],

    // Watch disabled for E2E
    watch: false,
  },

  // Cache directory
  cacheDir: 'node_modules/.vitest-e2e',

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
