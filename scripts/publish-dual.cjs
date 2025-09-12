#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const yaml = require('yaml');

const CLI_PACKAGE_PATH = path.join(__dirname, '../apps/cli/package.json');
const WORKSPACE_PATH = path.join(__dirname, '../pnpm-workspace.yaml');
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

function resolveCatalogDependencies() {
  console.log('\n🔄 Resolving catalog dependencies...');
  
  // Read workspace catalog
  const workspaceContent = fs.readFileSync(WORKSPACE_PATH, 'utf8');
  const workspace = yaml.parse(workspaceContent);
  const catalog = workspace.catalog || {};
  
  // Read package.json
  const packageJson = JSON.parse(fs.readFileSync(CLI_PACKAGE_PATH, 'utf8'));
  
  // Resolve dependencies
  const resolvedDependencies = {};
  for (const [dep, version] of Object.entries(packageJson.dependencies || {})) {
    if (version === 'catalog:') {
      if (catalog[dep]) {
        resolvedDependencies[dep] = catalog[dep];
        console.log(`  ${dep}: catalog: → ${catalog[dep]}`);
      } else {
        console.warn(`  ⚠️ ${dep}: catalog entry not found, keeping original`);
        resolvedDependencies[dep] = version;
      }
    } else {
      resolvedDependencies[dep] = version;
    }
  }
  
  // Resolve devDependencies
  const resolvedDevDependencies = {};
  for (const [dep, version] of Object.entries(packageJson.devDependencies || {})) {
    if (version === 'catalog:') {
      if (catalog[dep]) {
        resolvedDevDependencies[dep] = catalog[dep];
        console.log(`  ${dep}: catalog: → ${catalog[dep]} (dev)`);
      } else {
        console.warn(`  ⚠️ ${dep}: catalog entry not found, keeping original`);
        resolvedDevDependencies[dep] = version;
      }
    } else {
      resolvedDevDependencies[dep] = version;
    }
  }
  
  // Update package.json
  packageJson.dependencies = resolvedDependencies;
  packageJson.devDependencies = resolvedDevDependencies;
  
  fs.writeFileSync(CLI_PACKAGE_PATH, JSON.stringify(packageJson, null, 2) + '\n');
  console.log('✅ Catalog dependencies resolved');
  
  return packageJson;
}

async function publishDual() {
  try {
    console.log(`${isDryRun ? '[DRY RUN] ' : ''}Starting dual package publication...`);

    // Build first
    console.log('\n📦 Building packages...');
    runCommand('pnpm build', { alwaysRun: true });

    // Read and backup original package.json
    const originalPackageContent = fs.readFileSync(CLI_PACKAGE_PATH, 'utf8');
    const originalPackage = JSON.parse(originalPackageContent);
    const version = originalPackage.version;
    const originalName = originalPackage.name;

    // Resolve catalog dependencies for publishing
    resolveCatalogDependencies();

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

    // Restore original package.json (with catalog dependencies)
    console.log('\n🔄 Restoring original package.json...');
    fs.writeFileSync(CLI_PACKAGE_PATH, originalPackageContent);
    console.log('✅ Restored original package.json with catalog dependencies');

    const status = isDryRun ? 'tested' : 'completed';
    console.log(`\n✅ Dual publication ${status} successfully!`);
    console.log(`📦 ${isDryRun ? 'Would publish' : 'Published'} ${version} as:`);
    console.log(`   - pcu@${version}`);
    console.log(`   - pnpm-catalog-updates@${version}`);
  } catch (error) {
    console.error('\n❌ Publication failed:', error.message);

    // Ensure we restore the original package.json even if publication fails
    try {
      fs.writeFileSync(CLI_PACKAGE_PATH, originalPackageContent);
      console.log('🔄 Restored original package.json after failure');
    } catch (restoreError) {
      console.error('⚠️ Failed to restore package.json:', restoreError.message);
    }

    process.exit(1);
  }
}

publishDual();
