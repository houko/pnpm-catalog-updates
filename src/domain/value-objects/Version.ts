/**
 * Version Value Object
 * 
 * Represents a semantic version with comparison and validation capabilities.
 * Handles version ranges, pre-release versions, and semantic version operations.
 */

import semver from 'semver';

export class Version {
  private readonly value: string;
  private readonly semverInstance: semver.SemVer;

  private constructor(value: string, semverInstance: semver.SemVer) {
    this.value = value;
    this.semverInstance = semverInstance;
  }

  /**
   * Create a Version from a version string
   */
  public static fromString(versionString: string): Version {
    if (!versionString || versionString.trim().length === 0) {
      throw new Error('Version string cannot be empty');
    }

    const cleaned = versionString.trim();
    const parsedVersion = semver.parse(cleaned);

    if (!parsedVersion) {
      throw new Error(`Invalid version string: ${versionString}`);
    }

    return new Version(cleaned, parsedVersion);
  }

  /**
   * Create a Version from semver components
   */
  public static fromComponents(major: number, minor: number, patch: number, prerelease?: string): Version {
    let versionString = `${major}.${minor}.${patch}`;
    if (prerelease) {
      versionString += `-${prerelease}`;
    }

    return Version.fromString(versionString);
  }

  /**
   * Parse a version that might include range operators
   */
  public static parseVersionRange(rangeString: string): VersionRange {
    return VersionRange.fromString(rangeString);
  }

  /**
   * Get the version string
   */
  public toString(): string {
    return this.value;
  }

  /**
   * Get major version number
   */
  public getMajor(): number {
    return this.semverInstance.major;
  }

  /**
   * Get minor version number
   */
  public getMinor(): number {
    return this.semverInstance.minor;
  }

  /**
   * Get patch version number
   */
  public getPatch(): number {
    return this.semverInstance.patch;
  }

  /**
   * Get prerelease identifier
   */
  public getPrerelease(): string[] {
    return this.semverInstance.prerelease.map(p => p.toString());
  }

  /**
   * Check if this is a prerelease version
   */
  public isPrerelease(): boolean {
    return this.semverInstance.prerelease.length > 0;
  }

  /**
   * Compare with another version
   */
  public compareTo(other: Version): number {
    return semver.compare(this.value, other.value);
  }

  /**
   * Check if this version is newer than another
   */
  public isNewerThan(other: Version): boolean {
    return this.compareTo(other) > 0;
  }

  /**
   * Check if this version is older than another
   */
  public isOlderThan(other: Version): boolean {
    return this.compareTo(other) < 0;
  }

  /**
   * Check if this version equals another
   */
  public equals(other: Version): boolean {
    return this.compareTo(other) === 0;
  }

  /**
   * Check if this version satisfies a range
   */
  public satisfies(range: VersionRange): boolean {
    return range.includes(this);
  }

  /**
   * Get the difference type compared to another version
   */
  public getDifferenceType(other: Version): 'major' | 'minor' | 'patch' | 'prerelease' | 'same' {
    if (this.equals(other)) {
      return 'same';
    }

    const diff = semver.diff(this.value, other.value);
    return diff as 'major' | 'minor' | 'patch' | 'prerelease';
  }

  /**
   * Increment version by type
   */
  public increment(type: 'major' | 'minor' | 'patch', prerelease?: string): Version {
    const incremented = semver.inc(this.value, type, prerelease);
    if (!incremented) {
      throw new Error(`Failed to increment version ${this.value} by ${type}`);
    }
    return Version.fromString(incremented);
  }

  /**
   * Convert to JSON representation
   */
  public toJSON(): string {
    return this.value;
  }

  /**
   * Create from JSON representation
   */
  public static fromJSON(json: string): Version {
    return Version.fromString(json);
  }
}

/**
 * Version Range Value Object
 * 
 * Represents a version range (e.g., "^1.2.3", "~2.0.0", ">=1.0.0 <2.0.0")
 */
export class VersionRange {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  /**
   * Create a VersionRange from a range string
   */
  public static fromString(rangeString: string): VersionRange {
    if (!rangeString || rangeString.trim().length === 0) {
      throw new Error('Version range string cannot be empty');
    }

    const cleaned = rangeString.trim();

    // Validate the range
    try {
      semver.validRange(cleaned);
    } catch (error) {
      throw new Error(`Invalid version range: ${rangeString}`);
    }

    if (!semver.validRange(cleaned)) {
      throw new Error(`Invalid version range: ${rangeString}`);
    }

    return new VersionRange(cleaned);
  }

  /**
   * Get the range string
   */
  public toString(): string {
    return this.value;
  }

  /**
   * Check if a version satisfies this range
   */
  public includes(version: Version): boolean {
    return semver.satisfies(version.toString(), this.value);
  }

  /**
   * Check if this range is compatible with another range
   */
  public isCompatibleWith(other: VersionRange): boolean {
    // Check if ranges have any overlap
    try {
      return semver.intersects(this.value, other.value);
    } catch {
      return false;
    }
  }

  /**
   * Get the minimum version that satisfies this range
   */
  public getMinVersion(): Version | null {
    const minVersion = semver.minVersion(this.value);
    return minVersion ? Version.fromString(minVersion.version) : null;
  }

  /**
   * Get the maximum version that satisfies this range
   */
  public getMaxVersion(): Version | null {
    // semver doesn't have a direct maxVersion, so we approximate
    const minVer = this.getMinVersion();
    if (!minVer) return null;

    // For caret ranges (^1.2.3), max is < 2.0.0
    if (this.value.startsWith('^')) {
      const major = minVer.getMajor();
      return Version.fromComponents(major + 1, 0, 0);
    }

    // For tilde ranges (~1.2.3), max is < 1.3.0
    if (this.value.startsWith('~')) {
      const major = minVer.getMajor();
      const minor = minVer.getMinor();
      return Version.fromComponents(major, minor + 1, 0);
    }

    return null;
  }

  /**
   * Check if this is a caret range (^x.y.z)
   */
  public isCaret(): boolean {
    return this.value.startsWith('^');
  }

  /**
   * Check if this is a tilde range (~x.y.z)
   */
  public isTilde(): boolean {
    return this.value.startsWith('~');
  }

  /**
   * Check if this is an exact version
   */
  public isExact(): boolean {
    return !this.value.includes('^') && !this.value.includes('~') && 
           !this.value.includes('>') && !this.value.includes('<') &&
           !this.value.includes('*') && !this.value.includes('x');
  }

  /**
   * Convert to JSON representation
   */
  public toJSON(): string {
    return this.value;
  }

  /**
   * Create from JSON representation
   */
  public static fromJSON(json: string): VersionRange {
    return VersionRange.fromString(json);
  }

  /**
   * Check equality with another VersionRange
   */
  public equals(other: VersionRange): boolean {
    return this.value === other.value;
  }
}