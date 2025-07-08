#!/usr/bin/env node

import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import and run the CLI
const { main } = await import(path.join(__dirname, '..', 'dist', 'cli', 'index.js'));

main().catch((error) => {
  console.error('❌ Error:', error.message);
  process.exit(1);
});
