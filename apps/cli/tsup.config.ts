import { defineConfig } from 'tsup';
import path from 'path';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: false,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['fs-extra', 'npm-registry-fetch', 'pacote', 'semver', 'lodash'],
  noExternal: ['@pcu/core', '@pcu/utils'],
  treeshake: true,
  minify: false,
  target: 'node18',
  platform: 'node',
  outDir: 'dist',
  bundle: true,
  esbuildOptions: (options) => {
    options.alias = {
      '@pcu/core': path.resolve(__dirname, '../../packages/core/src/index.ts'),
      '@pcu/utils': path.resolve(__dirname, '../../packages/utils/src/index.ts'),
    };
    return options;
  },
});
