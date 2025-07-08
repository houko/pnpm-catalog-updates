/**
 * Output Formatter
 *
 * Provides formatted output for CLI commands in various formats.
 * Supports table, JSON, YAML, and minimal output formats.
 */

import chalk from 'chalk';
import Table from 'cli-table3';
import YAML from 'yaml';

import {
  OutdatedReport,
  UpdateResult,
  ImpactAnalysis,
} from '../../application/services/CatalogUpdateService.js';
import {
  WorkspaceValidationReport,
  WorkspaceStats,
} from '../../application/services/WorkspaceService.js';

export type OutputFormat = 'table' | 'json' | 'yaml' | 'minimal';

export class OutputFormatter {
  constructor(
    private readonly format: OutputFormat = 'table',
    private readonly useColor: boolean = true
  ) {}

  /**
   * Format outdated dependencies report
   */
  formatOutdatedReport(report: OutdatedReport): string {
    switch (this.format) {
      case 'json':
        return JSON.stringify(report, null, 2);
      case 'yaml':
        return YAML.stringify(report);
      case 'minimal':
        return this.formatOutdatedMinimal(report);
      case 'table':
      default:
        return this.formatOutdatedTable(report);
    }
  }

  /**
   * Format update result
   */
  formatUpdateResult(result: UpdateResult): string {
    switch (this.format) {
      case 'json':
        return JSON.stringify(result, null, 2);
      case 'yaml':
        return YAML.stringify(result);
      case 'minimal':
        return this.formatUpdateMinimal(result);
      case 'table':
      default:
        return this.formatUpdateTable(result);
    }
  }

  /**
   * Format impact analysis
   */
  formatImpactAnalysis(analysis: ImpactAnalysis): string {
    switch (this.format) {
      case 'json':
        return JSON.stringify(analysis, null, 2);
      case 'yaml':
        return YAML.stringify(analysis);
      case 'minimal':
        return this.formatImpactMinimal(analysis);
      case 'table':
      default:
        return this.formatImpactTable(analysis);
    }
  }

  /**
   * Format workspace validation report
   */
  formatValidationReport(report: WorkspaceValidationReport): string {
    switch (this.format) {
      case 'json':
        return JSON.stringify(report, null, 2);
      case 'yaml':
        return YAML.stringify(report);
      case 'minimal':
        return this.formatValidationMinimal(report);
      case 'table':
      default:
        return this.formatValidationTable(report);
    }
  }

  /**
   * Format workspace statistics
   */
  formatWorkspaceStats(stats: WorkspaceStats): string {
    switch (this.format) {
      case 'json':
        return JSON.stringify(stats, null, 2);
      case 'yaml':
        return YAML.stringify(stats);
      case 'minimal':
        return this.formatStatsMinimal(stats);
      case 'table':
      default:
        return this.formatStatsTable(stats);
    }
  }

  /**
   * Format simple message with optional styling
   */
  formatMessage(message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info'): string {
    if (!this.useColor) {
      return message;
    }

    switch (type) {
      case 'success':
        return chalk.green(message);
      case 'error':
        return chalk.red(message);
      case 'warning':
        return chalk.yellow(message);
      case 'info':
      default:
        return chalk.blue(message);
    }
  }

  /**
   * Format outdated dependencies as table
   */
  private formatOutdatedTable(report: OutdatedReport): string {
    const lines: string[] = [];

    // Header
    lines.push(this.colorize(chalk.bold, `\n📦 Workspace: ${report.workspace.name}`));
    lines.push(this.colorize(chalk.gray, `Path: ${report.workspace.path}`));

    if (!report.hasUpdates) {
      lines.push(this.colorize(chalk.green, '\n✅ All catalog dependencies are up to date!'));
      return lines.join('\n');
    }

    lines.push(
      this.colorize(chalk.yellow, `\n🔄 Found ${report.totalOutdated} outdated dependencies\n`)
    );

    for (const catalogInfo of report.catalogs) {
      if (catalogInfo.outdatedCount === 0) continue;

      lines.push(this.colorize(chalk.bold, `📋 Catalog: ${catalogInfo.catalogName}`));

      const table = new Table({
        head: this.colorizeHeaders(['Package', 'Current', 'Latest', 'Type', 'Packages']),
        style: { head: [], border: [] },
        colWidths: [25, 15, 15, 8, 20],
      });

      for (const dep of catalogInfo.outdatedDependencies) {
        const typeColor = this.getUpdateTypeColor(dep.updateType);
        // const securityIcon = dep.isSecurityUpdate ? '🔒 ' : '';
        // TODO: Use securityIcon in table display

        table.push([
          dep.packageName,
          dep.currentVersion,
          dep.latestVersion,
          this.colorize(typeColor, dep.updateType),
          `${dep.affectedPackages.length} package(s)`,
        ]);
      }

      lines.push(table.toString());
      lines.push('');
    }

    return lines.join('\n');
  }

  /**
   * Format outdated dependencies minimally
   */
  private formatOutdatedMinimal(report: OutdatedReport): string {
    if (!report.hasUpdates) {
      return 'All dependencies up to date';
    }

    const lines: string[] = [];
    for (const catalogInfo of report.catalogs) {
      for (const dep of catalogInfo.outdatedDependencies) {
        lines.push(
          `${catalogInfo.catalogName}:${dep.packageName} ${dep.currentVersion} → ${dep.latestVersion}`
        );
      }
    }
    return lines.join('\n');
  }

  /**
   * Format update result as table
   */
  private formatUpdateTable(result: UpdateResult): string {
    const lines: string[] = [];

    // Header
    lines.push(this.colorize(chalk.bold, `\n📦 Workspace: ${result.workspace.name}`));

    if (result.success) {
      lines.push(this.colorize(chalk.green, '✅ Update completed successfully!'));
    } else {
      lines.push(this.colorize(chalk.red, '❌ Update completed with errors'));
    }

    lines.push('');

    // Updated dependencies
    if (result.updatedDependencies.length > 0) {
      lines.push(this.colorize(chalk.green, `🎉 Updated ${result.totalUpdated} dependencies:`));

      const table = new Table({
        head: this.colorizeHeaders(['Catalog', 'Package', 'From', 'To', 'Type']),
        style: { head: [], border: [] },
        colWidths: [15, 25, 15, 15, 8],
      });

      for (const dep of result.updatedDependencies) {
        const typeColor = this.getUpdateTypeColor(dep.updateType);
        table.push([
          dep.catalogName,
          dep.packageName,
          dep.fromVersion,
          dep.toVersion,
          this.colorize(typeColor, dep.updateType),
        ]);
      }

      lines.push(table.toString());
      lines.push('');
    }

    // Skipped dependencies
    if (result.skippedDependencies.length > 0) {
      lines.push(this.colorize(chalk.yellow, `⚠️  Skipped ${result.totalSkipped} dependencies:`));

      for (const dep of result.skippedDependencies) {
        lines.push(`  ${dep.catalogName}:${dep.packageName} - ${dep.reason}`);
      }
      lines.push('');
    }

    // Errors
    if (result.errors.length > 0) {
      lines.push(this.colorize(chalk.red, `❌ ${result.totalErrors} errors occurred:`));

      for (const error of result.errors) {
        const prefix = error.fatal ? '💥' : '⚠️ ';
        lines.push(`  ${prefix} ${error.catalogName}:${error.packageName} - ${error.error}`);
      }
    }

    return lines.join('\n');
  }

  /**
   * Format update result minimally
   */
  private formatUpdateMinimal(result: UpdateResult): string {
    const lines: string[] = [];

    if (result.success) {
      lines.push(`Updated ${result.totalUpdated} dependencies`);
    } else {
      lines.push(`Update failed with ${result.totalErrors} errors`);
    }

    for (const dep of result.updatedDependencies) {
      lines.push(`${dep.catalogName}:${dep.packageName} ${dep.fromVersion} → ${dep.toVersion}`);
    }

    return lines.join('\n');
  }

  /**
   * Format impact analysis as table
   */
  private formatImpactTable(analysis: ImpactAnalysis): string {
    const lines: string[] = [];

    // Header
    lines.push(this.colorize(chalk.bold, `\n🔍 Impact Analysis: ${analysis.packageName}`));
    lines.push(this.colorize(chalk.gray, `Catalog: ${analysis.catalogName}`));
    lines.push(
      this.colorize(chalk.gray, `Update: ${analysis.currentVersion} → ${analysis.proposedVersion}`)
    );
    lines.push(this.colorize(chalk.gray, `Type: ${analysis.updateType}`));

    // Risk level
    const riskColor = this.getRiskColor(analysis.riskLevel);
    lines.push(this.colorize(riskColor, `Risk Level: ${analysis.riskLevel.toUpperCase()}`));
    lines.push('');

    // Affected packages
    if (analysis.affectedPackages.length > 0) {
      lines.push(this.colorize(chalk.bold, '📦 Affected Packages:'));

      const table = new Table({
        head: this.colorizeHeaders(['Package', 'Path', 'Dependency Type', 'Risk']),
        style: { head: [], border: [] },
        colWidths: [20, 30, 15, 10],
      });

      for (const pkg of analysis.affectedPackages) {
        const riskColor = this.getRiskColor(pkg.compatibilityRisk);
        table.push([
          pkg.packageName,
          pkg.packagePath,
          pkg.dependencyType,
          this.colorize(riskColor, pkg.compatibilityRisk),
        ]);
      }

      lines.push(table.toString());
      lines.push('');
    }

    // Security impact
    if (analysis.securityImpact.hasVulnerabilities) {
      lines.push(this.colorize(chalk.bold, '🔒 Security Impact:'));

      if (analysis.securityImpact.fixedVulnerabilities > 0) {
        lines.push(
          this.colorize(
            chalk.green,
            `  ✅ Fixes ${analysis.securityImpact.fixedVulnerabilities} vulnerabilities`
          )
        );
      }

      if (analysis.securityImpact.newVulnerabilities > 0) {
        lines.push(
          this.colorize(
            chalk.red,
            `  ⚠️  Introduces ${analysis.securityImpact.newVulnerabilities} vulnerabilities`
          )
        );
      }

      lines.push('');
    }

    // Recommendations
    if (analysis.recommendations.length > 0) {
      lines.push(this.colorize(chalk.bold, '💡 Recommendations:'));
      for (const rec of analysis.recommendations) {
        lines.push(`  ${rec}`);
      }
    }

    return lines.join('\n');
  }

  /**
   * Format impact analysis minimally
   */
  private formatImpactMinimal(analysis: ImpactAnalysis): string {
    return [
      `${analysis.packageName}: ${analysis.currentVersion} → ${analysis.proposedVersion}`,
      `Risk: ${analysis.riskLevel}`,
      `Affected: ${analysis.affectedPackages.length} packages`,
    ].join('\n');
  }

  /**
   * Format validation report as table
   */
  private formatValidationTable(report: WorkspaceValidationReport): string {
    const lines: string[] = [];

    // Header
    const statusIcon = report.isValid ? '✅' : '❌';
    const statusColor = report.isValid ? chalk.green : chalk.red;

    lines.push(this.colorize(chalk.bold, `\n${statusIcon} Workspace Validation`));
    lines.push(this.colorize(statusColor, `Status: ${report.isValid ? 'VALID' : 'INVALID'}`));
    lines.push('');

    // Workspace info
    lines.push(this.colorize(chalk.bold, '📦 Workspace Information:'));
    lines.push(`  Path: ${report.workspace.path}`);
    lines.push(`  Name: ${report.workspace.name}`);
    lines.push(`  Packages: ${report.workspace.packageCount}`);
    lines.push(`  Catalogs: ${report.workspace.catalogCount}`);
    lines.push('');

    // Errors
    if (report.errors.length > 0) {
      lines.push(this.colorize(chalk.red, '❌ Errors:'));
      for (const error of report.errors) {
        lines.push(`  • ${error}`);
      }
      lines.push('');
    }

    // Warnings
    if (report.warnings.length > 0) {
      lines.push(this.colorize(chalk.yellow, '⚠️  Warnings:'));
      for (const warning of report.warnings) {
        lines.push(`  • ${warning}`);
      }
      lines.push('');
    }

    // Recommendations
    if (report.recommendations.length > 0) {
      lines.push(this.colorize(chalk.blue, '💡 Recommendations:'));
      for (const rec of report.recommendations) {
        lines.push(`  • ${rec}`);
      }
    }

    return lines.join('\n');
  }

  /**
   * Format validation report minimally
   */
  private formatValidationMinimal(report: WorkspaceValidationReport): string {
    const status = report.isValid ? 'VALID' : 'INVALID';
    const errors = report.errors.length;
    const warnings = report.warnings.length;

    return `${status} (${errors} errors, ${warnings} warnings)`;
  }

  /**
   * Format workspace statistics as table
   */
  private formatStatsTable(stats: WorkspaceStats): string {
    const lines: string[] = [];

    lines.push(this.colorize(chalk.bold, `\n📊 Workspace Statistics`));
    lines.push(this.colorize(chalk.gray, `Workspace: ${stats.workspace.name}`));
    lines.push('');

    const table = new Table({
      head: this.colorizeHeaders(['Metric', 'Count']),
      style: { head: [], border: [] },
      colWidths: [30, 10],
    });

    table.push(['Total Packages', stats.packages.total.toString()]);
    table.push(['Packages with Catalog Refs', stats.packages.withCatalogReferences.toString()]);
    table.push(['Total Catalogs', stats.catalogs.total.toString()]);
    table.push(['Catalog Entries', stats.catalogs.totalEntries.toString()]);
    table.push(['Total Dependencies', stats.dependencies.total.toString()]);
    table.push(['Catalog References', stats.dependencies.catalogReferences.toString()]);
    table.push(['Dependencies', stats.dependencies.byType.dependencies.toString()]);
    table.push(['Dev Dependencies', stats.dependencies.byType.devDependencies.toString()]);
    table.push(['Peer Dependencies', stats.dependencies.byType.peerDependencies.toString()]);
    table.push([
      'Optional Dependencies',
      stats.dependencies.byType.optionalDependencies.toString(),
    ]);

    lines.push(table.toString());

    return lines.join('\n');
  }

  /**
   * Format workspace statistics minimally
   */
  private formatStatsMinimal(stats: WorkspaceStats): string {
    return [
      `Packages: ${stats.packages.total}`,
      `Catalogs: ${stats.catalogs.total}`,
      `Dependencies: ${stats.dependencies.total}`,
    ].join(', ');
  }

  /**
   * Apply color if color is enabled
   */
  private colorize(colorFn: typeof chalk, text: string): string {
    return this.useColor ? colorFn(text) : text;
  }

  /**
   * Colorize table headers
   */
  private colorizeHeaders(headers: string[]): string[] {
    return this.useColor ? headers.map((h) => chalk.bold.cyan(h)) : headers;
  }

  /**
   * Get color for update type
   */
  private getUpdateTypeColor(updateType: string): typeof chalk {
    switch (updateType) {
      case 'major':
        return chalk.red;
      case 'minor':
        return chalk.yellow;
      case 'patch':
        return chalk.green;
      default:
        return chalk.gray;
    }
  }

  /**
   * Get color for risk level
   */
  private getRiskColor(riskLevel: string): typeof chalk {
    switch (riskLevel) {
      case 'high':
        return chalk.red;
      case 'medium':
        return chalk.yellow;
      case 'low':
        return chalk.green;
      default:
        return chalk.gray;
    }
  }
}
