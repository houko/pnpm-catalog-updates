#!/usr/bin/env node

import fs from 'fs-extra';
import yaml from 'yaml';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

/**
 * Resolves catalog: dependencies to actual version numbers
 * This is needed for publishing to npm which doesn't support pnpm catalogs
 */
async function resolveCatalogDependencies() {
  // Read pnpm-workspace.yaml to get catalog definitions
  const workspaceYaml = await fs.readFile(path.join(projectRoot, 'pnpm-workspace.yaml'), 'utf-8');
  const workspace = yaml.parse(workspaceYaml);
  const catalog = workspace.catalog || {};

  // Read package.json
  const packageJsonPath = path.join(projectRoot, 'package.json');
  const packageJson = await fs.readJSON(packageJsonPath);

  // Function to resolve catalog dependencies
  const resolveDeps = (deps) => {
    if (!deps) return deps;

    const resolved = {};
    for (const [name, version] of Object.entries(deps)) {
      if (version === 'catalog:') {
        // Look up the actual version from the catalog
        const catalogVersion = catalog[name];
        if (catalogVersion) {
          resolved[name] = catalogVersion;
          console.log(`  Resolved ${name}: catalog: → ${catalogVersion}`);
        } else {
          console.warn(`  Warning: No catalog entry found for ${name}`);
          resolved[name] = version;
        }
      } else {
        resolved[name] = version;
      }
    }
    return resolved;
  };

  console.log('Resolving catalog dependencies...');

  // Resolve dependencies
  if (packageJson.dependencies) {
    console.log('\nResolving dependencies:');
    packageJson.dependencies = resolveDeps(packageJson.dependencies);
  }

  // Resolve devDependencies
  if (packageJson.devDependencies) {
    console.log('\nResolving devDependencies:');
    packageJson.devDependencies = resolveDeps(packageJson.devDependencies);
  }

  // Resolve peerDependencies
  if (packageJson.peerDependencies) {
    console.log('\nResolving peerDependencies:');
    packageJson.peerDependencies = resolveDeps(packageJson.peerDependencies);
  }

  // Write the resolved package.json
  await fs.writeJSON(packageJsonPath, packageJson, { spaces: 2 });
  console.log('\n✅ Successfully resolved all catalog dependencies');
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  resolveCatalogDependencies().catch(console.error);
}

export { resolveCatalogDependencies };
