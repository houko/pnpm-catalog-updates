#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function buildBin() {
  const projectRoot = path.resolve(__dirname, '..');
  const cliRoot = path.join(projectRoot, 'apps', 'cli');
  const binDir = path.join(cliRoot, 'bin');
  const distDir = path.join(cliRoot, 'dist');

  // Ensure bin directory exists
  if (!fs.existsSync(binDir)) {
    fs.mkdirSync(binDir, { recursive: true });
  }

  // Check if dist directory exists
  if (!fs.existsSync(distDir)) {
    console.error('❌ Build the CLI project first');
    process.exit(1);
  }

  // Create the executable script
  const binScript = `#!/usr/bin/env node

import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import and run the CLI
const { main } = await import(path.join(__dirname, '..', 'dist', 'index.js'));

main().catch((error) => {
  console.error('❌ Error:', error.message);
  process.exit(1);
});
`;

  const binPath = path.join(binDir, 'pcu.js');
  fs.writeFileSync(binPath, binScript);

  // Make it executable
  fs.chmodSync(binPath, '755');

  console.log('✅ Binary script created at:', binPath);
}

buildBin().catch((error) => {
  console.error('❌ Failed to build binary:', error);
  process.exit(1);
});
