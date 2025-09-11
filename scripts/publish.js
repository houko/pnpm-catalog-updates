#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

/**
 * Publish script that handles catalog dependencies
 * This is used by changesets/action in the release workflow
 */
async function publish() {
  try {
    console.log('Starting publish process...');

    // Backup original package.json
    const packageJsonPath = path.join(projectRoot, 'package.json');
    const backupPath = path.join(projectRoot, 'package.original.json');
    const originalContent = await fs.readFile(packageJsonPath);
    await fs.writeFile(backupPath, originalContent);

    try {
      // Resolve catalog dependencies
      console.log('Resolving catalog dependencies...');
      execSync('node scripts/resolve-catalog-deps.js', {
        stdio: 'inherit',
        cwd: projectRoot,
      });

      // Run changeset publish
      console.log('Publishing with changesets...');
      execSync('pnpm changeset publish', {
        stdio: 'inherit',
        cwd: projectRoot,
      });

      console.log('✅ Successfully published package');
    } finally {
      // Always restore original package.json
      console.log('Restoring original package.json...');
      const backupContent = await fs.readFile(backupPath);
      await fs.writeFile(packageJsonPath, backupContent);
      await fs.unlink(backupPath);
    }
  } catch (error) {
    console.error('❌ Publish failed:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  publish().catch(console.error);
}
