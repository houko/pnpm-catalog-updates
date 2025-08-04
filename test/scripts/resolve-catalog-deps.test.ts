import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const testDir = path.join(__dirname, '.test-workspace');
const scriptPath = path.join(__dirname, '../../scripts/resolve-catalog-deps.js');

describe('resolve-catalog-deps script', () => {
  beforeEach(async () => {
    // Create test directory
    await fs.ensureDir(testDir);
  });

  afterEach(async () => {
    // Clean up test directory
    await fs.remove(testDir);
  });

  it('should resolve catalog: dependencies to actual versions', async () => {
    // Create test pnpm-workspace.yaml
    const workspaceYaml = `
packages:
  - "."
catalog:
  commander: 14.0.0
  chalk: 5.4.1
  lodash: ^4.17.21
`;
    await fs.writeFile(path.join(testDir, 'pnpm-workspace.yaml'), workspaceYaml);

    // Create test package.json with catalog: dependencies
    const packageJson = {
      name: 'test-package',
      version: '1.0.0',
      dependencies: {
        commander: 'catalog:',
        chalk: 'catalog:',
        express: '^4.18.0', // Non-catalog dependency
      },
      devDependencies: {
        lodash: 'catalog:',
        typescript: '^5.0.0', // Non-catalog dependency
      },
    };
    await fs.writeJSON(path.join(testDir, 'package.json'), packageJson, { spaces: 2 });

    // Run the resolve script
    execSync(`node ${scriptPath}`, { cwd: testDir });

    // Read the modified package.json
    const modifiedPackageJson = await fs.readJSON(path.join(testDir, 'package.json'));

    // Verify catalog dependencies are resolved
    expect(modifiedPackageJson.dependencies.commander).toBe('14.0.0');
    expect(modifiedPackageJson.dependencies.chalk).toBe('5.4.1');
    expect(modifiedPackageJson.dependencies.express).toBe('^4.18.0'); // Should remain unchanged
    expect(modifiedPackageJson.devDependencies.lodash).toBe('^4.17.21');
    expect(modifiedPackageJson.devDependencies.typescript).toBe('^5.0.0'); // Should remain unchanged
  });

  it('should handle missing catalog entries gracefully', async () => {
    // Create test pnpm-workspace.yaml with incomplete catalog
    const workspaceYaml = `
packages:
  - "."
catalog:
  commander: 14.0.0
`;
    await fs.writeFile(path.join(testDir, 'pnpm-workspace.yaml'), workspaceYaml);

    // Create test package.json with catalog: dependencies
    const packageJson = {
      name: 'test-package',
      version: '1.0.0',
      dependencies: {
        commander: 'catalog:',
        'missing-package': 'catalog:', // This doesn't exist in catalog
      },
    };
    await fs.writeJSON(path.join(testDir, 'package.json'), packageJson, { spaces: 2 });

    // Run the resolve script - it should not throw
    execSync(`node ${scriptPath}`, { cwd: testDir });

    // Read the modified package.json
    const modifiedPackageJson = await fs.readJSON(path.join(testDir, 'package.json'));

    // Verify behavior
    expect(modifiedPackageJson.dependencies.commander).toBe('14.0.0');
    expect(modifiedPackageJson.dependencies['missing-package']).toBe('catalog:'); // Should remain unchanged
  });
});

describe('npm compatibility test', () => {
  it('should produce package.json that npm can parse', async () => {
    // Create a minimal test setup
    const workspaceYaml = `
packages:
  - "."
catalog:
  commander: 14.0.0
`;
    await fs.writeFile(path.join(testDir, 'pnpm-workspace.yaml'), workspaceYaml);

    const packageJson = {
      name: 'npm-compat-test',
      version: '1.0.0',
      dependencies: {
        commander: 'catalog:',
      },
    };
    await fs.writeJSON(path.join(testDir, 'package.json'), packageJson, { spaces: 2 });

    // Run the resolve script
    execSync(`node ${scriptPath}`, { cwd: testDir });

    // Test if npm can parse the resulting package.json
    const npmListOutput = execSync('npm list --json --depth=0', {
      cwd: testDir,
      encoding: 'utf-8',
    });

    const npmList = JSON.parse(npmListOutput);
    expect(npmList.name).toBe('npm-compat-test');

    // The resolved package.json should not contain any catalog: references
    const resolvedPkg = await fs.readJSON(path.join(testDir, 'package.json'));
    const allDeps = {
      ...resolvedPkg.dependencies,
      ...resolvedPkg.devDependencies,
      ...resolvedPkg.peerDependencies,
    };

    Object.values(allDeps).forEach((version) => {
      expect(version).not.toBe('catalog:');
    });
  });
});
