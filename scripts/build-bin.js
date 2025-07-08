#!/usr/bin/env node

import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function buildBin() {
  const projectRoot = path.resolve(__dirname, '..');
  const binDir = path.join(projectRoot, 'bin');
  const distDir = path.join(projectRoot, 'dist');
  
  // Ensure bin directory exists
  await fs.ensureDir(binDir);
  
  // Check if dist directory exists
  if (!await fs.pathExists(distDir)) {
    console.error('❌ Build the project first with "npm run build"');
    process.exit(1);
  }
  
  // Create the executable script
  const binScript = `#!/usr/bin/env node

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
`;
  
  const binPath = path.join(binDir, 'pcu.js');
  await fs.writeFile(binPath, binScript);
  
  // Make it executable
  await fs.chmod(binPath, '755');
  
  console.log('✅ Binary script created at:', binPath);
}

buildBin().catch((error) => {
  console.error('❌ Failed to build binary:', error);
  process.exit(1);
});