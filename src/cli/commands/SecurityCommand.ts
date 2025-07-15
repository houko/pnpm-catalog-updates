/**
 * Security Command
 *
 * CLI command to perform security vulnerability scanning and automated fixes.
 * Integrates with npm audit and snyk for comprehensive security analysis.
 */

import { execSync } from 'child_process';
import * as fs from 'fs-extra';
import * as path from 'path';
import { OutputFormatter, OutputFormat } from '../formatters/OutputFormatter.js';
import { EnhancedProgressBar } from '../formatters/ProgressBar.js';
import { StyledText, ThemeManager } from '../themes/ColorTheme.js';

export interface SecurityCommandOptions {
  workspace?: string;
  format?: OutputFormat;
  audit?: boolean;
  fixVulns?: boolean;
  severity?: 'low' | 'moderate' | 'high' | 'critical';
  includeDev?: boolean;
  snyk?: boolean;
  verbose?: boolean;
  color?: boolean;
}

export interface SecurityReport {
  summary: {
    totalVulnerabilities: number;
    critical: number;
    high: number;
    moderate: number;
    low: number;
    info: number;
  };
  vulnerabilities: Vulnerability[];
  recommendations: SecurityRecommendation[];
  metadata: {
    scanDate: string;
    scanTools: string[];
    workspacePath: string;
  };
}

export interface Vulnerability {
  id: string;
  package: string;
  severity: 'low' | 'moderate' | 'high' | 'critical';
  title: string;
  url: string;
  range: string;
  fixAvailable: boolean | string;
  fixVersion?: string;
  paths: string[];
  cwe?: string[];
  cve?: string[];
}

export interface SecurityRecommendation {
  package: string;
  currentVersion: string;
  recommendedVersion: string;
  type: 'update' | 'remove' | 'replace';
  reason: string;
  impact: string;
}

export class SecurityCommand {
  constructor(
    private readonly outputFormatter: OutputFormatter
  ) {}

  /**
   * Execute the security command
   */
  async execute(options: SecurityCommandOptions = {}): Promise<void> {
    let progressBar: EnhancedProgressBar | undefined;

    try {
      // Initialize theme
      ThemeManager.setTheme('default');

      // Show loading with progress bar
      progressBar = new EnhancedProgressBar({
        text: 'Performing security analysis...',
        color: 'cyan',
        spinner: 'dots',
      });
      progressBar.start();

      if (options.verbose) {
        console.log(StyledText.iconAnalysis('Security vulnerability scanning'));
        console.log(StyledText.muted(`Workspace: ${options.workspace || process.cwd()}`));
        console.log(StyledText.muted(`Severity filter: ${options.severity || 'all'}`));
        console.log('');
      }

      // Execute security scan
      const report = await this.performSecurityScan(options);

      progressBar.succeed('Security analysis completed');

      // Format and display results
      const formattedOutput = this.outputFormatter.formatSecurityReport(report);
      console.log(formattedOutput);

      // Show recommendations if available
      if (report.recommendations.length > 0) {
        this.showRecommendations(report);
      }

      // Auto-fix vulnerabilities if requested
      if (options.fixVulns) {
        await this.autoFixVulnerabilities(report, options);
      }

      // Exit with appropriate code based on findings
      const exitCode = report.summary.critical > 0 ? 1 : 0;
      process.exit(exitCode);
    } catch (error) {
      if (progressBar) {
        progressBar.fail('Security analysis failed');
      }

      console.error(StyledText.iconError('Error performing security scan:'));
      console.error(StyledText.error(String(error)));

      if (options.verbose && error instanceof Error) {
        console.error(StyledText.muted('Stack trace:'));
        console.error(StyledText.muted(error.stack || 'No stack trace available'));
      }

      process.exit(1);
    }
  }

  /**
   * Perform comprehensive security scan
   */
  private async performSecurityScan(options: SecurityCommandOptions): Promise<SecurityReport> {
    const workspacePath = options.workspace || process.cwd();
    const vulnerabilities: Vulnerability[] = [];
    const recommendations: SecurityRecommendation[] = [];

    // Check if package.json exists
    const packageJsonPath = path.join(workspacePath, 'package.json');
    if (!await fs.pathExists(packageJsonPath)) {
      throw new Error(`No package.json found in ${workspacePath}`);
    }

    // Run npm audit
    if (options.audit !== false) {
      const npmVulns = await this.runNpmAudit(workspacePath, options);
      vulnerabilities.push(...npmVulns);
    }

    // Run snyk scan if available
    if (options.snyk) {
      const snykVulns = await this.runSnykScan(workspacePath, options);
      vulnerabilities.push(...snykVulns);
    }

    // Generate recommendations
    recommendations.push(...this.generateRecommendations(vulnerabilities));

    // Filter by severity if specified
<<<<<<< HEAD
    const filteredVulnerabilities = options.severity
      ? vulnerabilities.filter(
          (v) => this.severityToNumber(v.severity) >= this.severityToNumber(options.severity!)
        )
=======
    const filteredVulnerabilities = options.severity 
      ? vulnerabilities.filter(v => this.severityToNumber(v.severity) >= this.severityToNumber(options.severity!))
>>>>>>> f741b2d (## 总结)
      : vulnerabilities;

    return {
      summary: this.generateSummary(filteredVulnerabilities),
      vulnerabilities: filteredVulnerabilities,
      recommendations: recommendations,
      metadata: {
        scanDate: new Date().toISOString(),
        scanTools: ['npm-audit', ...(options.snyk ? ['snyk'] : [])],
        workspacePath: workspacePath,
      },
    };
  }

  /**
   * Run npm audit scan
   */
<<<<<<< HEAD
  private async runNpmAudit(
    workspacePath: string,
    options: SecurityCommandOptions
  ): Promise<Vulnerability[]> {
    try {
      const auditArgs = ['audit', '--json'];

=======
  private async runNpmAudit(workspacePath: string, options: SecurityCommandOptions): Promise<Vulnerability[]> {
    try {
      const auditArgs = ['audit', '--json'];
      
>>>>>>> f741b2d (## 总结)
      if (!options.includeDev) {
        auditArgs.push('--omit=dev');
      }

      const auditOutput = execSync(`npm ${auditArgs.join(' ')}`, {
        cwd: workspacePath,
        encoding: 'utf8',
        stdio: ['pipe', 'pipe', 'pipe'],
      });

      const auditData = JSON.parse(auditOutput);
      return this.parseNpmAuditResults(auditData);
    } catch (error: any) {
      if (error.status === 1) {
        // npm audit returns 1 when vulnerabilities are found
        try {
          const auditData = JSON.parse(error.stdout);
          return this.parseNpmAuditResults(auditData);
        } catch (parseError) {
          throw new Error(`Failed to parse npm audit output: ${error.message}`);
        }
      } else {
        throw new Error(`npm audit failed: ${error.message}`);
      }
    }
  }

  /**
   * Run snyk scan
   */
<<<<<<< HEAD
  private async runSnykScan(
    workspacePath: string,
    options: SecurityCommandOptions
  ): Promise<Vulnerability[]> {
=======
  private async runSnykScan(workspacePath: string, options: SecurityCommandOptions): Promise<Vulnerability[]> {
>>>>>>> f741b2d (## 总结)
    try {
      // Check if snyk is installed
      execSync('snyk --version', { stdio: 'pipe' });

      const snykArgs = ['test', '--json'];
<<<<<<< HEAD

=======
      
>>>>>>> f741b2d (## 总结)
      if (!options.includeDev) {
        snykArgs.push('--dev');
      }

      const snykOutput = execSync(`snyk ${snykArgs.join(' ')}`, {
        cwd: workspacePath,
        encoding: 'utf8',
        stdio: ['pipe', 'pipe', 'pipe'],
      });

      const snykData = JSON.parse(snykOutput);
      return this.parseSnykResults(snykData);
    } catch (error: any) {
      if (error.code === 'ENOENT') {
        console.warn(StyledText.iconWarning('Snyk not found. Install with: npm install -g snyk'));
        return [];
      }
      throw new Error(`Snyk scan failed: ${error.message}`);
    }
  }

  /**
   * Parse npm audit results
   */
  private parseNpmAuditResults(auditData: any): Vulnerability[] {
    const vulnerabilities: Vulnerability[] = [];
<<<<<<< HEAD

=======
    
>>>>>>> f741b2d (## 总结)
    if (!auditData.vulnerabilities) {
      return vulnerabilities;
    }

    for (const [id, vuln] of Object.entries(auditData.vulnerabilities)) {
      const vulnerability = vuln as any;
<<<<<<< HEAD

=======
      
>>>>>>> f741b2d (## 总结)
      vulnerabilities.push({
        id: id,
        package: vulnerability.name,
        severity: vulnerability.severity,
        title: vulnerability.title || vulnerability.name,
        url: vulnerability.url || `https://npmjs.com/advisories/${id}`,
        range: vulnerability.range,
        fixAvailable: vulnerability.fixAvailable,
        fixVersion: vulnerability.fixAvailable === true ? vulnerability.fixAvailable : undefined,
        paths: vulnerability.via?.map((v: any) => v.source || v.name) || [vulnerability.name],
        cwe: vulnerability.cwe,
        cve: vulnerability.cve,
      });
    }

    return vulnerabilities;
  }

  /**
   * Parse snyk results
   */
  private parseSnykResults(snykData: any): Vulnerability[] {
    const vulnerabilities: Vulnerability[] = [];
<<<<<<< HEAD

=======
    
>>>>>>> f741b2d (## 总结)
    if (!snykData.vulnerabilities) {
      return vulnerabilities;
    }

    for (const vuln of snykData.vulnerabilities) {
      vulnerabilities.push({
        id: vuln.id,
        package: vuln.packageName,
        severity: vuln.severity,
        title: vuln.title,
        url: vuln.url,
        range: vuln.semver?.vulnerable?.join(' || ') || vuln.version,
        fixAvailable: vuln.fixedIn?.length > 0,
        fixVersion: vuln.fixedIn?.[0],
        paths: vuln.from || [vuln.packageName],
        cwe: vuln.identifiers?.CWE || [],
        cve: vuln.identifiers?.CVE || [],
      });
    }

    return vulnerabilities;
  }

  /**
   * Generate security recommendations
   */
  private generateRecommendations(vulnerabilities: Vulnerability[]): SecurityRecommendation[] {
    const recommendations: SecurityRecommendation[] = [];
<<<<<<< HEAD
    const packages = new Set(vulnerabilities.map((v) => v.package));

    for (const pkg of packages) {
      const pkgVulns = vulnerabilities.filter((v) => v.package === pkg);
      const criticalVulns = pkgVulns.filter(
        (v) => v.severity === 'critical' || v.severity === 'high'
      );

      if (criticalVulns.length > 0) {
        const fixVersions = [
          ...new Set(
            criticalVulns.map((v) => v.fixVersion).filter((v) => v && typeof v === 'string')
          ),
        ];
=======
    const packages = new Set(vulnerabilities.map(v => v.package));

    for (const pkg of packages) {
      const pkgVulns = vulnerabilities.filter(v => v.package === pkg);
      const criticalVulns = pkgVulns.filter(v => v.severity === 'critical' || v.severity === 'high');
      
      if (criticalVulns.length > 0) {
        const fixVersions = [...new Set(criticalVulns
          .map(v => v.fixVersion)
          .filter(v => v && typeof v === 'string'))];
>>>>>>> f741b2d (## 总结)

        if (fixVersions.length > 0) {
          const currentVersion = pkgVulns[0]?.range?.split(' ')[0] || 'unknown';
          const recommendedVersion = fixVersions[0] || 'unknown';
<<<<<<< HEAD

=======
          
>>>>>>> f741b2d (## 总结)
          recommendations.push({
            package: pkg,
            currentVersion: currentVersion,
            recommendedVersion: recommendedVersion,
            type: 'update',
            reason: `${criticalVulns.length} critical vulnerabilities found`,
            impact: 'High - Security vulnerability fix',
          });
        }
      }
    }

    return recommendations;
  }

  /**
   * Generate summary from vulnerabilities
   */
  private generateSummary(vulnerabilities: Vulnerability[]): SecurityReport['summary'] {
    const summary = {
      totalVulnerabilities: vulnerabilities.length,
      critical: 0,
      high: 0,
      moderate: 0,
      low: 0,
      info: 0,
    };

    for (const vuln of vulnerabilities) {
      const severity = vuln.severity as string;
<<<<<<< HEAD
      switch (severity) {
=======
    switch (severity) {
>>>>>>> f741b2d (## 总结)
        case 'critical':
          summary.critical++;
          break;
        case 'high':
          summary.high++;
          break;
        case 'moderate':
          summary.moderate++;
          break;
        case 'low':
          summary.low++;
          break;
        case 'info':
          summary.info++;
          break;
        default:
          summary.info++;
          break;
      }
    }

    return summary;
  }

  /**
   * Convert severity string to number for filtering
   */
  private severityToNumber(severity: string): number {
    switch (severity) {
<<<<<<< HEAD
      case 'critical':
        return 4;
      case 'high':
        return 3;
      case 'moderate':
        return 2;
      case 'low':
        return 1;
      case 'info':
        return 0;
      default:
        return 0;
=======
      case 'critical': return 4;
      case 'high': return 3;
      case 'moderate': return 2;
      case 'low': return 1;
      case 'info': return 0;
      default: return 0;
>>>>>>> f741b2d (## 总结)
    }
  }

  /**
   * Show security recommendations
   */
  private showRecommendations(report: SecurityReport): void {
    if (report.recommendations.length === 0) {
      return;
    }

    console.log('\n' + StyledText.iconInfo('Security Recommendations:'));
<<<<<<< HEAD

    for (const rec of report.recommendations) {
      console.log(
        `  ${StyledText.iconWarning()} ${rec.package}: ${rec.currentVersion} → ${rec.recommendedVersion}`
      );
=======
    
    for (const rec of report.recommendations) {
      console.log(`  ${StyledText.iconWarning()} ${rec.package}: ${rec.currentVersion} → ${rec.recommendedVersion}`);
>>>>>>> f741b2d (## 总结)
      console.log(`    ${StyledText.muted(rec.reason)}`);
      console.log(`    ${StyledText.muted(rec.impact)}`);
    }

    console.log('');
    console.log(StyledText.iconUpdate('Run with --fix-vulns to apply automatic fixes'));
  }

  /**
   * Auto-fix vulnerabilities
   */
<<<<<<< HEAD
  private async autoFixVulnerabilities(
    report: SecurityReport,
    options: SecurityCommandOptions
  ): Promise<void> {
=======
  private async autoFixVulnerabilities(report: SecurityReport, options: SecurityCommandOptions): Promise<void> {
>>>>>>> f741b2d (## 总结)
    if (report.recommendations.length === 0) {
      console.log(StyledText.iconSuccess('No security fixes available'));
      return;
    }

    console.log('\n' + StyledText.iconUpdate('Applying security fixes...'));
<<<<<<< HEAD

    const workspacePath = options.workspace || process.cwd();
    const fixableVulns = report.recommendations.filter((r) => r.type === 'update');

=======
    
    const workspacePath = options.workspace || process.cwd();
    const fixableVulns = report.recommendations.filter(r => r.type === 'update');
    
>>>>>>> f741b2d (## 总结)
    if (fixableVulns.length === 0) {
      console.log(StyledText.iconInfo('No automatic fixes available'));
      return;
    }

    try {
      // Run npm audit fix
      const fixArgs = ['audit', 'fix'];
      if (!options.includeDev) {
        fixArgs.push('--omit=dev');
      }

      execSync(`npm ${fixArgs.join(' ')}`, {
        cwd: workspacePath,
        encoding: 'utf8',
        stdio: 'inherit',
      });

      console.log(StyledText.iconSuccess('Security fixes applied successfully'));
<<<<<<< HEAD

      // Re-run scan to verify fixes
      console.log(StyledText.iconInfo('Re-running security scan to verify fixes...'));
      const newReport = await this.performSecurityScan({ ...options, fixVulns: false });

      if (newReport.summary.critical === 0 && newReport.summary.high === 0) {
        console.log(
          StyledText.iconSuccess('All critical and high severity vulnerabilities have been fixed!')
        );
      } else {
        console.log(
          StyledText.iconWarning(
            `${newReport.summary.critical} critical and ${newReport.summary.high} high severity vulnerabilities remain`
          )
        );
=======
      
      // Re-run scan to verify fixes
      console.log(StyledText.iconInfo('Re-running security scan to verify fixes...'));
      const newReport = await this.performSecurityScan({ ...options, fixVulns: false });
      
      if (newReport.summary.critical === 0 && newReport.summary.high === 0) {
        console.log(StyledText.iconSuccess('All critical and high severity vulnerabilities have been fixed!'));
      } else {
        console.log(StyledText.iconWarning(`${newReport.summary.critical} critical and ${newReport.summary.high} high severity vulnerabilities remain`));
>>>>>>> f741b2d (## 总结)
      }
    } catch (error: any) {
      console.error(StyledText.iconError('Failed to apply security fixes:'));
      console.error(StyledText.error(error.message));
    }
  }

  /**
   * Validate command options
   */
  static validateOptions(options: SecurityCommandOptions): string[] {
    const errors: string[] = [];

    // Validate format
    if (options.format && !['table', 'json', 'yaml', 'minimal'].includes(options.format)) {
      errors.push('Invalid format. Must be one of: table, json, yaml, minimal');
    }

    // Validate severity
    if (options.severity && !['low', 'moderate', 'high', 'critical'].includes(options.severity)) {
      errors.push('Invalid severity. Must be one of: low, moderate, high, critical');
    }

    return errors;
  }

  /**
   * Get command help text
   */
  static getHelpText(): string {
    return `
Security vulnerability scanning and automated fixes

Usage:
  pcu security [options]

Options:
  --workspace <path>     Workspace directory (default: current directory)
  --format <type>        Output format: table, json, yaml, minimal (default: table)
  --audit                Perform npm audit scan (default: true)
  --fix-vulns            Automatically fix vulnerabilities
  --severity <level>     Filter by severity: low, moderate, high, critical
  --include-dev          Include dev dependencies in scan
  --snyk                 Include Snyk scan (requires snyk CLI)
  --verbose              Show detailed information
  --no-color             Disable colored output

Examples:
  pcu security                           # Basic security scan
  pcu security --fix-vulns              # Scan and fix vulnerabilities
  pcu security --severity high          # Show only high severity issues
  pcu security --snyk                   # Include Snyk scan
  pcu security --format json            # Output as JSON

Exit Codes:
  0  No vulnerabilities found
  1  Vulnerabilities found
  2  Error occurred
    `;
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> f741b2d (## 总结)
