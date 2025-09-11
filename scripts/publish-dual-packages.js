#!/usr/bin/env node

import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

const CLI_DIR = path.join(process.cwd(), 'apps/cli');
const PACKAGE_JSON = path.join(CLI_DIR, 'package.json');

console.log('📦 Publishing dual packages...');

// Read current package.json
const pkg = JSON.parse(readFileSync(PACKAGE_JSON, 'utf8'));
const originalName = pkg.name;
const version = pkg.version;

try {
  // 1. Publish as 'pcu'
  console.log(`\n1️⃣ Publishing as 'pcu@${version}'...`);
  pkg.name = 'pcu';
  writeFileSync(PACKAGE_JSON, JSON.stringify(pkg, null, 2));

  execSync('npm publish', {
    cwd: CLI_DIR,
    stdio: 'inherit',
    env: { ...process.env, NODE_AUTH_TOKEN: process.env.NPM_TOKEN },
  });

  // 2. Publish as 'pnpm-catalog-updates'
  console.log(`\n2️⃣ Publishing as 'pnpm-catalog-updates@${version}'...`);
  pkg.name = 'pnpm-catalog-updates';
  writeFileSync(PACKAGE_JSON, JSON.stringify(pkg, null, 2));

  execSync('npm publish', {
    cwd: CLI_DIR,
    stdio: 'inherit',
    env: { ...process.env, NODE_AUTH_TOKEN: process.env.NPM_TOKEN },
  });

  console.log(`\n✅ Successfully published both packages at version ${version}!`);
} catch (error) {
  console.error('❌ Failed to publish:', error.message);
  process.exit(1);
} finally {
  // Restore original package.json
  pkg.name = originalName;
  writeFileSync(PACKAGE_JSON, JSON.stringify(pkg, null, 2));
  console.log(`\n🔄 Restored package.json with name: ${originalName}`);
}
