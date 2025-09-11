import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { NpmrcParser } from '../npmrcParser.js';
import { writeFileSync, mkdirSync, rmSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';

describe('NpmrcParser', () => {
  let testDir: string;

  beforeEach(() => {
    // Create a temporary test directory
    testDir = join(tmpdir(), `npmrc-test-${Date.now()}`);
    mkdirSync(testDir, { recursive: true });
  });

  afterEach(() => {
    // Clean up test directory
    rmSync(testDir, { recursive: true, force: true });
  });

  describe('parse', () => {
    it('should parse default registry', () => {
      const npmrcContent = `
registry=https://custom.registry.com/
# This is a comment
`;
      writeFileSync(join(testDir, '.npmrc'), npmrcContent);

      const config = NpmrcParser.parse(testDir, false);
      expect(config.registry).toBe('https://custom.registry.com/');
    });

    it('should parse scoped registries', () => {
      const npmrcContent = `
@mycompany:registry=https://npm.mycompany.com/
@bufteam:registry=https://clst.buf.team/gen/npm/v1/
registry=https://registry.npmjs.org/
`;
      writeFileSync(join(testDir, '.npmrc'), npmrcContent);

      const config = NpmrcParser.parse(testDir, false);
      expect(config.scopedRegistries.get('@mycompany')).toBe('https://npm.mycompany.com/');
      expect(config.scopedRegistries.get('@bufteam')).toBe('https://clst.buf.team/gen/npm/v1/');
      expect(config.registry).toBe('https://registry.npmjs.org/');
    });

    it('should parse auth tokens', () => {
      const npmrcContent = `
//registry.npmjs.org/:_authToken=npm_token_123
//npm.mycompany.com/:_authToken=company_token_456
`;
      writeFileSync(join(testDir, '.npmrc'), npmrcContent);

      const config = NpmrcParser.parse(testDir, false);
      expect(config.authTokens.get('registry.npmjs.org')).toBe('npm_token_123');
      expect(config.authTokens.get('npm.mycompany.com')).toBe('company_token_456');
    });

    it('should skip comments and empty lines', () => {
      const npmrcContent = `
# This is a comment
; This is also a comment

registry=https://registry.npmjs.org/

# Another comment
@mycompany:registry=https://npm.mycompany.com/
`;
      writeFileSync(join(testDir, '.npmrc'), npmrcContent);

      const config = NpmrcParser.parse(testDir, false);
      expect(config.registry).toBe('https://registry.npmjs.org/');
      expect(config.scopedRegistries.get('@mycompany')).toBe('https://npm.mycompany.com/');
    });

    it('should normalize registry URLs with trailing slash', () => {
      const npmrcContent = `
registry=https://registry.npmjs.org
@mycompany:registry=https://npm.mycompany.com
`;
      writeFileSync(join(testDir, '.npmrc'), npmrcContent);

      const config = NpmrcParser.parse(testDir, false);
      expect(config.registry).toBe('https://registry.npmjs.org/');
      expect(config.scopedRegistries.get('@mycompany')).toBe('https://npm.mycompany.com/');
    });

    it('should handle quoted values', () => {
      const npmrcContent = `
registry="https://registry.npmjs.org/"
@mycompany:registry='https://npm.mycompany.com/'
`;
      writeFileSync(join(testDir, '.npmrc'), npmrcContent);

      const config = NpmrcParser.parse(testDir, false);
      expect(config.registry).toBe('https://registry.npmjs.org/');
      expect(config.scopedRegistries.get('@mycompany')).toBe('https://npm.mycompany.com/');
    });

    it('should use default registry when no npmrc exists', () => {
      const config = NpmrcParser.parse(testDir, false);
      expect(config.registry).toBe('https://registry.npmjs.org/');
      expect(config.scopedRegistries.size).toBe(0);
    });
  });

  describe('getRegistryForPackage', () => {
    it('should return scoped registry for scoped packages', () => {
      const npmrcContent = `
@mycompany:registry=https://npm.mycompany.com/
@bufteam:registry=https://clst.buf.team/gen/npm/v1/
registry=https://registry.npmjs.org/
`;
      writeFileSync(join(testDir, '.npmrc'), npmrcContent);

      const config = NpmrcParser.parse(testDir, false);

      expect(NpmrcParser.getRegistryForPackage('@mycompany/package', config)).toBe(
        'https://npm.mycompany.com/'
      );
      expect(NpmrcParser.getRegistryForPackage('@bufteam/fleet_acats.bufbuild_es', config)).toBe(
        'https://clst.buf.team/gen/npm/v1/'
      );
    });

    it('should return default registry for non-scoped packages', () => {
      const npmrcContent = `
@mycompany:registry=https://npm.mycompany.com/
registry=https://registry.npmjs.org/
`;
      writeFileSync(join(testDir, '.npmrc'), npmrcContent);

      const config = NpmrcParser.parse(testDir, false);

      expect(NpmrcParser.getRegistryForPackage('express', config)).toBe(
        'https://registry.npmjs.org/'
      );
      expect(NpmrcParser.getRegistryForPackage('lodash', config)).toBe(
        'https://registry.npmjs.org/'
      );
    });

    it('should return default registry for unknown scoped packages', () => {
      const npmrcContent = `
@mycompany:registry=https://npm.mycompany.com/
registry=https://custom.registry.com/
`;
      writeFileSync(join(testDir, '.npmrc'), npmrcContent);

      const config = NpmrcParser.parse(testDir, false);

      expect(NpmrcParser.getRegistryForPackage('@othercompany/package', config)).toBe(
        'https://custom.registry.com/'
      );
    });
  });

  describe('getAuthToken', () => {
    it('should return auth token for registry', () => {
      const npmrcContent = `
//registry.npmjs.org/:_authToken=npm_token_123
//npm.mycompany.com/:_authToken=company_token_456
`;
      writeFileSync(join(testDir, '.npmrc'), npmrcContent);

      const config = NpmrcParser.parse(testDir, false);

      expect(NpmrcParser.getAuthToken('https://registry.npmjs.org/', config)).toBe('npm_token_123');
      expect(NpmrcParser.getAuthToken('https://npm.mycompany.com/', config)).toBe(
        'company_token_456'
      );
    });

    it('should return undefined for unknown registry', () => {
      const npmrcContent = `
//registry.npmjs.org/:_authToken=npm_token_123
`;
      writeFileSync(join(testDir, '.npmrc'), npmrcContent);

      const config = NpmrcParser.parse(testDir, false);

      expect(NpmrcParser.getAuthToken('https://unknown.registry.com/', config)).toBeUndefined();
    });
  });

  describe('.pnpmrc support', () => {
    it('should parse .pnpmrc file', () => {
      const pnpmrcContent = `
registry=https://pnpm.registry.com/
@mycompany:registry=https://pnpm.mycompany.com/
`;
      writeFileSync(join(testDir, '.pnpmrc'), pnpmrcContent);

      const config = NpmrcParser.parse(testDir, false);
      expect(config.registry).toBe('https://pnpm.registry.com/');
      expect(config.scopedRegistries.get('@mycompany')).toBe('https://pnpm.mycompany.com/');
    });

    it('should prioritize .pnpmrc over .npmrc', () => {
      const npmrcContent = `
registry=https://npmrc.registry.com/
@mycompany:registry=https://npmrc.mycompany.com/
`;
      const pnpmrcContent = `
registry=https://pnpmrc.registry.com/
@mycompany:registry=https://pnpmrc.mycompany.com/
`;
      writeFileSync(join(testDir, '.npmrc'), npmrcContent);
      writeFileSync(join(testDir, '.pnpmrc'), pnpmrcContent);

      const config = NpmrcParser.parse(testDir, false);
      // .pnpmrc should override .npmrc
      expect(config.registry).toBe('https://pnpmrc.registry.com/');
      expect(config.scopedRegistries.get('@mycompany')).toBe('https://pnpmrc.mycompany.com/');
    });

    it('should handle partial .pnpmrc config', () => {
      const npmrcContent = `
registry=https://npmrc.registry.com/
@company1:registry=https://npmrc.company1.com/
@company2:registry=https://npmrc.company2.com/
`;
      const pnpmrcContent = `
@company1:registry=https://pnpmrc.company1.com/
`;
      writeFileSync(join(testDir, '.npmrc'), npmrcContent);
      writeFileSync(join(testDir, '.pnpmrc'), pnpmrcContent);

      const config = NpmrcParser.parse(testDir, false);
      // .pnpmrc overrides @company1, but not @company2 or default registry
      expect(config.registry).toBe('https://npmrc.registry.com/');
      expect(config.scopedRegistries.get('@company1')).toBe('https://pnpmrc.company1.com/');
      expect(config.scopedRegistries.get('@company2')).toBe('https://npmrc.company2.com/');
    });
  });

  describe('environment variables', () => {
    it('should override with npm_config_registry environment variable', () => {
      const npmrcContent = `
registry=https://registry.npmjs.org/
`;
      writeFileSync(join(testDir, '.npmrc'), npmrcContent);

      // Mock environment variable
      const originalEnv = process.env.npm_config_registry;
      process.env.npm_config_registry = 'https://env.registry.com/';

      try {
        // Pass true to include environment variables
        const config = NpmrcParser.parse(testDir, true);
        expect(config.registry).toBe('https://env.registry.com/');
      } finally {
        // Restore original environment
        if (originalEnv !== undefined) {
          process.env.npm_config_registry = originalEnv;
        } else {
          delete process.env.npm_config_registry;
        }
      }
    });
  });
});
