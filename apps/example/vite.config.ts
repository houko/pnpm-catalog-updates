import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Example Vite configuration for the workspace
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  server: {
    port: 3000,
    open: true,
  },
});
