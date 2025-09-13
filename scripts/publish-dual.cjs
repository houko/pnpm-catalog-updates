#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

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
  
  // Read package.json
  const packageJson = JSON.parse(fs.readFileSync(CLI_PACKAGE_PATH, 'utf8'));
  
  // Get actual installed versions using pnpm list
  let pnpmList;
  try {
    const output = execSync('pnpm list --json --filter=pcu', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
    pnpmList = JSON.parse(output);
  } catch (error) {
    console.warn('⚠️ Could not get pnpm list, falling back to manual resolution');
    // Fallback to basic catalog resolution
    const catalog = {
      'chalk': '5.4.1',
      'cli-table3': '0.6.5', 
      'commander': '14.0.0',
      'fs-extra': '11.3.0',
      'glob': '11.0.3',
      'inquirer': '12.7.0',
      'lodash': '^4.17.21',
      'npm-registry-fetch': '18.0.2',
      'ora': '8.2.0',
      'pacote': '21.0.0',
      'rxjs': '7.8.2',
      'semver': '7.7.2',
      'yaml': '2.8.0'
    };
    
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
    
    // Keep devDependencies as is for publishing (they won't be installed anyway)
    packageJson.dependencies = resolvedDependencies;
    
    fs.writeFileSync(CLI_PACKAGE_PATH, JSON.stringify(packageJson, null, 2) + '\n');
    console.log('✅ Catalog dependencies resolved using fallback');
    return packageJson;
  }
  
  // Extract versions from pnpm list output
  const installedDeps = {};
  if (pnpmList && pnpmList[0] && pnpmList[0].dependencies) {
    for (const [dep, info] of Object.entries(pnpmList[0].dependencies)) {
      installedDeps[dep] = info.version;
    }
  }
  
  // Resolve dependencies
  const resolvedDependencies = {};
  for (const [dep, version] of Object.entries(packageJson.dependencies || {})) {
    if (version === 'catalog:') {
      if (installedDeps[dep]) {
        resolvedDependencies[dep] = `^${installedDeps[dep]}`;
        console.log(`  ${dep}: catalog: → ^${installedDeps[dep]}`);
      } else {
        console.warn(`  ⚠️ ${dep}: not found in installed deps, keeping original`);
        resolvedDependencies[dep] = version;
      }
    } else {
      resolvedDependencies[dep] = version;
    }
  }
  
  // Keep devDependencies as is for publishing (they won't be installed anyway)
  packageJson.dependencies = resolvedDependencies;
  
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
