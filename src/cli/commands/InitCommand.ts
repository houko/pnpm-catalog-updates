/**
 * Init Command
 *
 * CLI command to initialize PCU configuration in a workspace.
 * Creates a basic .pcurc.json configuration file with sensible defaults.
 */

import { existsSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { StyledText, ThemeManager } from '../themes/ColorTheme.js';
import { PackageFilterConfig } from '../../common/config/PackageFilterConfig.js';

export interface InitCommandOptions {
  workspace?: string;
  force?: boolean;
  verbose?: boolean;
  color?: boolean;
  createWorkspace?: boolean;
  full?: boolean;
}

export class InitCommand {
  /**
   * Execute the init command
   */
  async execute(options: InitCommandOptions = {}): Promise<void> {
    try {
      // Initialize theme
      ThemeManager.setTheme('default');

      const workspacePath = options.workspace || process.cwd();
      const configPath = join(workspacePath, '.pcurc.json');
      const packageJsonPath = join(workspacePath, 'package.json');
      const workspaceYamlPath = join(workspacePath, 'pnpm-workspace.yaml');

      if (options.verbose) {
        console.log(StyledText.iconInfo('Initializing PCU configuration'));
        console.log(StyledText.muted(`Workspace: ${workspacePath}`));
        console.log(StyledText.muted(`Config file: ${configPath}`));
        console.log('');
      }

      // Check if this is a pnpm workspace
      const hasPackageJson = existsSync(packageJsonPath);
      const hasWorkspaceYaml = existsSync(workspaceYamlPath);
      const isWorkspace = hasPackageJson && hasWorkspaceYaml;

      if (!isWorkspace && options.createWorkspace !== false) {
        if (options.verbose) {
          console.log(StyledText.iconWarning('PNPM workspace structure not detected'));
          if (!hasPackageJson) {
            console.log(StyledText.muted('Missing: package.json'));
          }
          if (!hasWorkspaceYaml) {
            console.log(StyledText.muted('Missing: pnpm-workspace.yaml'));
          }
          console.log('');
        }

        // Create workspace structure
        if (options.verbose) {
          console.log(StyledText.iconInfo('Creating PNPM workspace structure...'));
        }

        await this.createWorkspaceStructure(workspacePath, hasPackageJson, hasWorkspaceYaml, options);
        
        if (options.verbose) {
          console.log(StyledText.iconSuccess('PNPM workspace structure created'));
          console.log('');
        }
      }

      // Check if config file already exists
      if (existsSync(configPath) && !options.force) {
        console.log(StyledText.iconWarning('Configuration file already exists!'));
        console.log(StyledText.muted(`Found: ${configPath}`));
        console.log(StyledText.muted('Use --force to overwrite existing configuration'));
        process.exit(1);
      }

      // Create directory if it doesn't exist
      const configDir = dirname(configPath);
      if (!existsSync(configDir)) {
        mkdirSync(configDir, { recursive: true });
      }

      // Generate basic configuration
      const basicConfig = this.generateBasicConfig(options.full);

      // Write configuration file
      writeFileSync(configPath, JSON.stringify(basicConfig, null, 2), 'utf-8');

      // Success message
      console.log(StyledText.iconSuccess('PCU configuration initialized successfully!'));
      console.log(StyledText.muted(`Created: ${configPath}`));
      console.log('');
      
      // Show next steps
      this.showNextSteps(configPath);

      process.exit(0);
    } catch (error) {
      console.error(StyledText.iconError('Error initializing configuration:'));
      console.error(StyledText.error(String(error)));

      if (options.verbose && error instanceof Error) {
        console.error(StyledText.muted('Stack trace:'));
        console.error(StyledText.muted(error.stack || 'No stack trace available'));
      }

      process.exit(1);
    }
  }

  /**
   * Create PNPM workspace structure
   */
  private async createWorkspaceStructure(
    workspacePath: string,
    hasPackageJson: boolean,
    hasWorkspaceYaml: boolean,
    options: InitCommandOptions
  ): Promise<void> {
    // Create package.json if it doesn't exist
    if (!hasPackageJson) {
      const packageJsonPath = join(workspacePath, 'package.json');
      const packageJson = this.generateWorkspacePackageJson();
      writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf-8');
      
      if (options.verbose) {
        console.log(StyledText.muted('Created: package.json'));
      }
    }

    // Create pnpm-workspace.yaml if it doesn't exist
    if (!hasWorkspaceYaml) {
      const workspaceYamlPath = join(workspacePath, 'pnpm-workspace.yaml');
      const workspaceYaml = this.generateWorkspaceYaml();
      writeFileSync(workspaceYamlPath, workspaceYaml, 'utf-8');
      
      if (options.verbose) {
        console.log(StyledText.muted('Created: pnpm-workspace.yaml'));
      }
    }

    // Create basic directories structure
    const packagesDir = join(workspacePath, 'packages');
    if (!existsSync(packagesDir)) {
      mkdirSync(packagesDir, { recursive: true });
      
      if (options.verbose) {
        console.log(StyledText.muted('Created: packages/ directory'));
      }
    }
  }

  /**
   * Generate workspace package.json
   */
  private generateWorkspacePackageJson(): any {
    return {
      name: 'my-workspace',
      version: '1.0.0',
      private: true,
      description: 'PNPM workspace with catalog dependency management',
      scripts: {
        'check-updates': 'pcu check',
        'update-deps': 'pcu update --interactive',
        'security-audit': 'pcu security'
      },
      devDependencies: {
        'pnpm-catalog-updates': 'latest'
      }
    };
  }

  /**
   * Generate pnpm-workspace.yaml
   */
  private generateWorkspaceYaml(): string {
    return `# PNPM Workspace Configuration
# Learn more: https://pnpm.io/pnpm-workspace_yaml

packages:
  # Include all packages in packages directory
  - 'packages/*'
  
  # Include apps directory if you have applications
  # - 'apps/*'
  
  # Include tools directory if you have development tools
  # - 'tools/*'

# Catalog Configuration
# Centrally manage dependency versions across workspace packages
# Learn more: https://pnpm.io/catalogs
catalogs:
  # Default catalog for common dependencies
  default:
    # React ecosystem
    # react: ^18.2.0
    # react-dom: ^18.2.0
    # '@types/react': ^18.2.0
    # '@types/react-dom': ^18.2.0
    
    # TypeScript and Node.js
    # typescript: ^5.0.0
    # '@types/node': ^20.0.0
    
    # Development tools
    # eslint: ^8.0.0
    # prettier: ^3.0.0
    # vitest: ^1.0.0
`;
  }

  /**
   * Generate basic configuration with sensible defaults
   */
  private generateBasicConfig(full?: boolean): PackageFilterConfig {
    if (full) {
      return this.generateFullConfig();
    }

    // Minimal configuration
    return {
      defaults: {
        target: 'latest',
        createBackup: true,
        format: 'table'
      },
      exclude: [],
      include: []
    };
  }

  /**
   * Generate full configuration with all options
   */
  private generateFullConfig(): PackageFilterConfig {
    return {
      defaults: {
        target: 'latest',
        includePrerelease: false,
        interactive: false,
        dryRun: false,
        createBackup: true,
        format: 'table'
      },
      packageRules: [
        {
          patterns: ['react', 'react-dom'],
          target: 'minor',
          autoUpdate: false,
          requireConfirmation: true,
          groupUpdate: true,
          relatedPackages: ['@types/react', '@types/react-dom']
        },
        {
          patterns: ['@types/*'],
          target: 'latest',
          autoUpdate: true,
          requireConfirmation: false,
          groupUpdate: false
        },
        {
          patterns: ['eslint*', 'prettier', '@typescript-eslint/*'],
          target: 'minor',
          autoUpdate: false,
          requireConfirmation: false,
          groupUpdate: true
        }
      ],
      security: {
        autoFixVulnerabilities: true,
        allowMajorForSecurity: true,
        notifyOnSecurityUpdate: false
      },
      advanced: {
        concurrency: 5,
        timeout: 30000,
        retries: 3,
        cacheValidityMinutes: 60,
        checkForUpdates: true
      },
      monorepo: {
        syncVersions: [],
        catalogPriority: ['default']
      },
      exclude: [],
      include: []
    };
  }

  /**
   * Show next steps to the user
   */
  private showNextSteps(configPath: string): void {
    const lines: string[] = [];

    lines.push(StyledText.iconInfo('Next steps:'));
    lines.push('');
    lines.push(StyledText.muted('1. Review and customize the configuration:'));
    lines.push(StyledText.muted(`   ${configPath}`));
    lines.push('');
    lines.push(StyledText.muted('2. Add packages to your workspace:'));
    lines.push(StyledText.muted('   mkdir packages/my-app && cd packages/my-app'));
    lines.push(StyledText.muted('   pnpm init'));
    lines.push('');
    lines.push(StyledText.muted('3. Install dependencies and check for updates:'));
    lines.push(StyledText.muted('   pnpm install'));
    lines.push(StyledText.muted('   pcu check'));
    lines.push('');
    lines.push(StyledText.muted('4. Update dependencies interactively:'));
    lines.push(StyledText.muted('   pcu update --interactive'));
    lines.push('');
    lines.push(StyledText.muted('5. Learn more about PNPM workspace and PCU:'));
    lines.push(StyledText.muted('   https://pnpm.io/workspaces'));
    lines.push(StyledText.muted('   https://github.com/your-repo/pnpm-catalog-updates#configuration'));

    console.log(lines.join('\n'));
  }

  /**
   * Validate command options
   */
  static validateOptions(options: InitCommandOptions): string[] {
    const errors: string[] = [];

    // Validate workspace path exists if provided
    if (options.workspace && !existsSync(options.workspace)) {
      errors.push(`Workspace directory does not exist: ${options.workspace}`);
    }

    return errors;
  }

  /**
   * Get command help text
   */
  static getHelpText(): string {
    return `
Initialize PCU configuration and PNPM workspace

Usage:
  pcu init [options]

Options:
  --workspace <path>       Workspace directory (default: current directory)
  --force                  Overwrite existing configuration file
  --full                   Generate full configuration with all options
  --create-workspace       Create PNPM workspace structure if missing (default: true)
  --no-create-workspace    Skip creating PNPM workspace structure
  --verbose                Show detailed information
  --no-color               Disable colored output

Description:
  Creates a complete PNPM workspace environment with:
  - Basic .pcurc.json configuration file with sensible defaults
  - package.json for workspace root (if missing)
  - pnpm-workspace.yaml configuration (if missing)
  - packages/ directory structure (if missing)
  
  By default, creates a minimal configuration. Use --full to generate
  a complete configuration with package rules for React, TypeScript,
  ESLint, and other common dependencies with security settings.

Examples:
  pcu init                           # Initialize with minimal configuration
  pcu init --full                    # Initialize with full configuration
  pcu init --workspace ./my-project  # Initialize in specific directory
  pcu init --force                   # Overwrite existing configuration
  pcu init --no-create-workspace     # Only create .pcurc.json configuration

Files Created:
  .pcurc.json           PCU configuration (minimal by default, full with --full)
  package.json          Workspace root package.json (if missing)
  pnpm-workspace.yaml   PNPM workspace configuration (if missing)
  packages/             Directory for workspace packages (if missing)

Exit Codes:
  0  Configuration initialized successfully
  1  Configuration already exists (use --force to overwrite)
  2  Error occurred
    `;
  }
}