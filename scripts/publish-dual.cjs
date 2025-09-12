#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const CLI_PACKAGE_PATH = path.join(__dirname, '../apps/cli/package.json');
const isDryRun = process.argv.includes('--dry-run');

function runCommand(command, options = {}) {
  console.log(`${isDryRun ? '[DRY RUN] ' : ''}Running: ${command}`);

  if (isDryRun && !options.alwaysRun) {
    console.log('[DRY RUN] Command skipped');
    return;
  }

  try {
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Command failed: ${command}`);
    console.error(`Error: ${error.message}`);
    throw error;
  }
}

function updatePackageName(newName) {
  const packageJson = JSON.parse(fs.readFileSync(CLI_PACKAGE_PATH, 'utf8'));
  packageJson.name = newName;
  fs.writeFileSync(CLI_PACKAGE_PATH, JSON.stringify(packageJson, null, 2) + '\n');
  console.log(`Updated package name to: ${newName}`);
}

async function publishDual() {
  try {
    console.log(`${isDryRun ? '[DRY RUN] ' : ''}Starting dual package publication...`);

    // Build first
    console.log('\n📦 Building packages...');
    runCommand('pnpm build', { alwaysRun: true });

    // Read original package.json to get version
    const originalPackage = JSON.parse(fs.readFileSync(CLI_PACKAGE_PATH, 'utf8'));
    const version = originalPackage.version;
    const originalName = originalPackage.name;

    console.log(`\n🚀 Publishing version ${version} as dual packages...`);

    // First publish as 'pcu' (current name)
    console.log('\n1️⃣ Publishing as "pcu"...');
    const publishCommand1 = `cd apps/cli && npm publish${isDryRun ? ' --dry-run' : ''}`;
    runCommand(publishCommand1, { alwaysRun: true });

    // Then publish as 'pnpm-catalog-updates'
    console.log('\n2️⃣ Publishing as "pnpm-catalog-updates"...');
    updatePackageName('pnpm-catalog-updates');
    const publishCommand2 = `cd apps/cli && npm publish${isDryRun ? ' --dry-run' : ''}`;
    runCommand(publishCommand2, { alwaysRun: true });

    // Restore original name
    console.log('\n🔄 Restoring original package name...');
    updatePackageName(originalName);

    const status = isDryRun ? 'tested' : 'completed';
    console.log(`\n✅ Dual publication ${status} successfully!`);
    console.log(`📦 ${isDryRun ? 'Would publish' : 'Published'} ${version} as:`);
    console.log(`   - pcu@${version}`);
    console.log(`   - pnpm-catalog-updates@${version}`);
  } catch (error) {
    console.error('\n❌ Publication failed:', error.message);

    // Ensure we restore the original package name even if publication fails
    try {
      const originalPackage = JSON.parse(fs.readFileSync(CLI_PACKAGE_PATH, 'utf8'));
      if (originalPackage.name !== 'pcu') {
        updatePackageName('pcu');
        console.log('🔄 Restored original package name after failure');
      }
    } catch (restoreError) {
      console.error('⚠️ Failed to restore package name:', restoreError.message);
    }

    process.exit(1);
  }
}

publishDual();
