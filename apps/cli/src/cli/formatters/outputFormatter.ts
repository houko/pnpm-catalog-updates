/**
 * Output Formatter
 *
 * Provides formatted output for CLI commands in various formats.
 * Supports table, JSON, YAML, and minimal output formats.
 */

import { ImpactAnalysis, OutdatedReport, UpdateResult } from '@pcu/core';
import { WorkspaceStats, WorkspaceValidationReport } from '@pcu/core';
import { SecurityReport } from '../commands/securityCommand.js';

import chalk from 'chalk';
import Table from 'cli-table3';
import YAML from 'yaml';

export type OutputFormat = 'table' | 'json' | 'yaml' | 'minimal';

// Build ANSI escape regex without literal control characters
const ANSI_ESCAPE = String.fromCharCode(27);
const ansiRegex: RegExp = new RegExp(`${ANSI_ESCAPE}\\[[0-9;]*m`, 'g');

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
   * Format security report
   */
  formatSecurityReport(report: SecurityReport): string {
    switch (this.format) {
      case 'json':
        return JSON.stringify(report, null, 2);
      case 'yaml':
        return YAML.stringify(report);
      case 'minimal':
        return this.formatSecurityMinimal(report);
      case 'table':
      default:
        return this.formatSecurityTable(report);
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
        const securityIcon = dep.isSecurityUpdate ? '🔒 ' : '';

        // Colorize version differences
        const { currentColored, latestColored } = this.colorizeVersionDiff(
          dep.currentVersion,
          dep.latestVersion,
          dep.updateType
        );

        table.push([
          `${securityIcon}${dep.packageName}`,
          currentColored,
          latestColored,
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
   * Format outdated dependencies minimally (npm-check-updates style)
   */
  private formatOutdatedMinimal(report: OutdatedReport): string {
    if (!report.hasUpdates) {
      return 'All dependencies up to date';
    }

    // Collect all dependencies first to calculate max package name width
    const allDeps: Array<{
      securityIcon: string;
      packageName: string;
      currentColored: string;
      latestColored: string;
    }> = [];

    for (const catalogInfo of report.catalogs) {
      for (const dep of catalogInfo.outdatedDependencies) {
        const securityIcon = dep.isSecurityUpdate ? '🔒 ' : '';
        const { currentColored, latestColored } = this.colorizeVersionDiff(
          dep.currentVersion,
          dep.latestVersion,
          dep.updateType
        );
        allDeps.push({
          securityIcon,
          packageName: dep.packageName,
          currentColored,
          latestColored,
        });
      }
    }

    // Calculate max widths for alignment
    const maxNameWidth = Math.max(
      ...allDeps.map((dep) => (dep.securityIcon + dep.packageName).length)
    );

    // Calculate max version widths (need to strip color codes for accurate width calculation)
    const stripAnsi = (str: string) => str.replace(ansiRegex, '');
    const maxCurrentWidth = Math.max(...allDeps.map((dep) => stripAnsi(dep.currentColored).length));

    // Format lines with proper alignment
    const lines: string[] = [];
    for (const dep of allDeps) {
      const nameWithIcon = dep.securityIcon + dep.packageName;
      const paddedName = nameWithIcon.padEnd(maxNameWidth);

      // For current version alignment, we need to pad the visible text, not the colored version
      const currentVisible = stripAnsi(dep.currentColored);
      const currentPadding = maxCurrentWidth - currentVisible.length;
      const paddedCurrent = dep.currentColored + ' '.repeat(currentPadding);

      lines.push(`${paddedName}  ${paddedCurrent} → ${dep.latestColored}`);
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

        // Colorize version differences
        const { currentColored, latestColored } = this.colorizeVersionDiff(
          dep.fromVersion,
          dep.toVersion,
          dep.updateType
        );

        table.push([
          dep.catalogName,
          dep.packageName,
          currentColored,
          latestColored,
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
   * Format update result minimally (npm-check-updates style)
   */
  private formatUpdateMinimal(result: UpdateResult): string {
    const lines: string[] = [];

    if (result.success) {
      lines.push(`Updated ${result.totalUpdated} dependencies`);
    } else {
      lines.push(`Update failed with ${result.totalErrors} errors`);
    }

    if (result.updatedDependencies.length > 0) {
      // Collect version info for alignment calculation
      const depsWithVersions = result.updatedDependencies.map((dep) => {
        const { currentColored, latestColored } = this.colorizeVersionDiff(
          dep.fromVersion,
          dep.toVersion,
          dep.updateType
        );
        return {
          packageName: dep.packageName,
          currentColored,
          latestColored,
        };
      });

      // Calculate max widths for alignment
      const maxNameWidth = Math.max(...depsWithVersions.map((dep) => dep.packageName.length));

      const stripAnsi = (str: string) => str.replace(ansiRegex, '');
      const maxCurrentWidth = Math.max(
        ...depsWithVersions.map((dep) => stripAnsi(dep.currentColored).length)
      );

      for (const dep of depsWithVersions) {
        const paddedName = dep.packageName.padEnd(maxNameWidth);

        // Pad current version for alignment
        const currentVisible = stripAnsi(dep.currentColored);
        const currentPadding = maxCurrentWidth - currentVisible.length;
        const paddedCurrent = dep.currentColored + ' '.repeat(currentPadding);

        lines.push(`${paddedName}  ${paddedCurrent} → ${dep.latestColored}`);
      }
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
   * Format security report as table
   */
  private formatSecurityTable(report: SecurityReport): string {
    const lines: string[] = [];

    // Header
    lines.push(this.colorize(chalk.bold, '\n🔒 Security Report'));
    lines.push(this.colorize(chalk.gray, `Workspace: ${report.metadata.workspacePath}`));
    lines.push(
      this.colorize(chalk.gray, `Scan Date: ${new Date(report.metadata.scanDate).toLocaleString()}`)
    );
    lines.push(this.colorize(chalk.gray, `Tools: ${report.metadata.scanTools.join(', ')}`));

    // Summary
    lines.push('');
    lines.push(this.colorize(chalk.bold, '📊 Summary:'));

    const summaryTable = new Table({
      head: this.colorizeHeaders(['Severity', 'Count']),
      style: { head: [], border: [] },
      colWidths: [15, 10],
    });

    summaryTable.push(['Critical', this.colorize(chalk.red, report.summary.critical.toString())]);
    summaryTable.push(['High', this.colorize(chalk.yellow, report.summary.high.toString())]);
    summaryTable.push(['Moderate', this.colorize(chalk.blue, report.summary.moderate.toString())]);
    summaryTable.push(['Low', this.colorize(chalk.green, report.summary.low.toString())]);
    summaryTable.push(['Info', this.colorize(chalk.gray, report.summary.info.toString())]);
    summaryTable.push([
      'Total',
      this.colorize(chalk.bold, report.summary.totalVulnerabilities.toString()),
    ]);

    lines.push(summaryTable.toString());

    // Vulnerabilities
    if (report.vulnerabilities.length > 0) {
      lines.push('');
      lines.push(this.colorize(chalk.bold, '🐛 Vulnerabilities:'));

      const vulnTable = new Table({
        head: this.colorizeHeaders(['Package', 'Severity', 'Title', 'Fix Available']),
        style: { head: [], border: [] },
        colWidths: [20, 12, 40, 15],
      });

      for (const vuln of report.vulnerabilities) {
        const severityColor = this.getSeverityColor(vuln.severity);
        const fixStatus = vuln.fixAvailable
          ? typeof vuln.fixAvailable === 'string'
            ? vuln.fixAvailable
            : 'Yes'
          : 'No';

        vulnTable.push([
          vuln.package,
          this.colorize(severityColor, vuln.severity.toUpperCase()),
          vuln.title.length > 35 ? vuln.title.substring(0, 35) + '...' : vuln.title,
          fixStatus,
        ]);
      }

      lines.push(vulnTable.toString());
    }

    // Recommendations
    if (report.recommendations.length > 0) {
      lines.push('');
      lines.push(this.colorize(chalk.bold, '💡 Recommendations:'));

      for (const rec of report.recommendations) {
        lines.push(`  ${rec.package}: ${rec.currentVersion} → ${rec.recommendedVersion}`);
        lines.push(`    ${rec.reason} (${rec.impact})`);
      }
    }

    return lines.join('\n');
  }

  /**
   * Format security report minimally
   */
  private formatSecurityMinimal(report: SecurityReport): string {
    const vulnerabilities = report.summary.totalVulnerabilities;
    if (vulnerabilities === 0) {
      return 'No vulnerabilities found';
    }

    return [
      `${vulnerabilities} vulnerabilities found:`,
      `  Critical: ${report.summary.critical}`,
      `  High: ${report.summary.high}`,
      `  Moderate: ${report.summary.moderate}`,
      `  Low: ${report.summary.low}`,
    ].join('\n');
  }

  /**
   * Get color for severity level
   */
  private getSeverityColor(severity: string): typeof chalk {
    switch (severity.toLowerCase()) {
      case 'critical':
        return chalk.red;
      case 'high':
        return chalk.yellow;
      case 'moderate':
        return chalk.blue;
      case 'low':
        return chalk.green;
      default:
        return chalk.gray;
    }
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

  /**
   * Colorize version differences between current and latest
   */
  private colorizeVersionDiff(
    current: string,
    latest: string,
    updateType: string
  ): {
    currentColored: string;
    latestColored: string;
  } {
    if (!this.useColor) {
      return { currentColored: current, latestColored: latest };
    }

    // Parse version numbers to identify different parts
    const parseVersion = (version: string) => {
      // Remove leading ^ or ~ or other prefix characters
      const cleanVersion = version.replace(/^[\^~>=<]+/, '');
      const parts = cleanVersion.split('.');
      return {
        major: parts[0] || '0',
        minor: parts[1] || '0',
        patch: parts[2] || '0',
        extra: parts.slice(3).join('.'),
        prefix: version.substring(0, version.length - cleanVersion.length),
      };
    };

    const currentParts = parseVersion(current);
    const latestParts = parseVersion(latest);

    // Determine color based on update type for highlighting differences
    const diffColor = this.getUpdateTypeColor(updateType);

    // Build colored version strings by comparing each part
    const colorCurrentPart = (part: string, latestPart: string, isChanged: boolean) => {
      if (isChanged && part !== latestPart) {
        return chalk.dim.white(part); // Dim white for old version part
      }
      return chalk.white(part); // Unchanged parts in white
    };

    const colorLatestPart = (part: string, currentPart: string, isChanged: boolean) => {
      if (isChanged && part !== currentPart) {
        return diffColor(part); // Highlight the new version part with update type color
      }
      return chalk.white(part); // Unchanged parts in white
    };

    // Check which parts are different
    const majorChanged = currentParts.major !== latestParts.major;
    const minorChanged = currentParts.minor !== latestParts.minor;
    const patchChanged = currentParts.patch !== latestParts.patch;
    const extraChanged = currentParts.extra !== latestParts.extra;

    // Build colored current version
    let currentColored = currentParts.prefix;
    currentColored += colorCurrentPart(currentParts.major, latestParts.major, majorChanged);
    currentColored += '.';
    currentColored += colorCurrentPart(currentParts.minor, latestParts.minor, minorChanged);
    currentColored += '.';
    currentColored += colorCurrentPart(currentParts.patch, latestParts.patch, patchChanged);
    if (currentParts.extra) {
      currentColored += '.' + colorCurrentPart(currentParts.extra, latestParts.extra, extraChanged);
    }

    // Build colored latest version
    let latestColored = latestParts.prefix;
    latestColored += colorLatestPart(latestParts.major, currentParts.major, majorChanged);
    latestColored += '.';
    latestColored += colorLatestPart(latestParts.minor, currentParts.minor, minorChanged);
    latestColored += '.';
    latestColored += colorLatestPart(latestParts.patch, currentParts.patch, patchChanged);
    if (latestParts.extra) {
      latestColored += '.' + colorLatestPart(latestParts.extra, currentParts.extra, extraChanged);
    }

    return { currentColored, latestColored };
  }
}
