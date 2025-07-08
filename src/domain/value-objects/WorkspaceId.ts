/**
 * WorkspaceId Value Object
 *
 * Represents a unique identifier for a pnpm workspace.
 * This is an immutable value object that ensures workspace identity.
 */

export class WorkspaceId {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  /**
   * Create a WorkspaceId from a string value
   */
  public static fromString(value: string): WorkspaceId {
    if (!value || value.trim().length === 0) {
      throw new Error('WorkspaceId cannot be empty');
    }

    if (value.length > 255) {
      throw new Error('WorkspaceId cannot exceed 255 characters');
    }

    // Validate format - alphanumeric, hyphens, underscores only
    const validPattern = /^[a-zA-Z0-9_-]+$/;
    if (!validPattern.test(value.trim())) {
      throw new Error(
        'WorkspaceId can only contain alphanumeric characters, hyphens, and underscores'
      );
    }

    return new WorkspaceId(value.trim());
  }

  /**
   * Generate a new unique WorkspaceId
   */
  public static generate(): WorkspaceId {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    return new WorkspaceId(`workspace-${timestamp}-${random}`);
  }

  /**
   * Create a WorkspaceId from a workspace path
   */
  public static fromPath(path: string): WorkspaceId {
    // Extract a meaningful identifier from the path
    const normalizedPath = path.replace(/\\/g, '/');
    const pathParts = normalizedPath.split('/').filter(Boolean);
    const lastPart = pathParts[pathParts.length - 1] || 'workspace';

    // Sanitize the path part to create a valid ID
    const sanitized = lastPart
      .replace(/[^a-zA-Z0-9_-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    if (sanitized.length === 0) {
      return WorkspaceId.generate();
    }

    return new WorkspaceId(sanitized);
  }

  /**
   * Get the string value of this WorkspaceId
   */
  public toString(): string {
    return this.value;
  }

  /**
   * Get the raw value
   */
  public getValue(): string {
    return this.value;
  }

  /**
   * Check equality with another WorkspaceId
   */
  public equals(other: WorkspaceId): boolean {
    return this.value === other.value;
  }

  /**
   * Check if this WorkspaceId is the same as another
   */
  public isSameAs(other: WorkspaceId): boolean {
    return this.equals(other);
  }

  /**
   * Get a hash code for this WorkspaceId
   */
  public hashCode(): number {
    let hash = 0;
    for (let i = 0; i < this.value.length; i++) {
      const char = this.value.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return hash;
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
  public static fromJSON(json: string): WorkspaceId {
    return WorkspaceId.fromString(json);
  }
}
