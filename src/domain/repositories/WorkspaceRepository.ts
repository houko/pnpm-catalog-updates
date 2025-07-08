/**
 * Workspace Repository Interface
 * 
 * Defines the contract for workspace persistence and retrieval operations.
 * This is a domain interface implemented by infrastructure layer.
 */

import { Workspace } from '../entities/Workspace.js';
import { WorkspaceId } from '../value-objects/WorkspaceId.js';
import { WorkspacePath } from '../value-objects/WorkspacePath.js';
import { WorkspaceConfig } from '../value-objects/WorkspaceConfig.js';

export interface WorkspaceRepository {
  /**
   * Find a workspace by its path
   */
  findByPath(path: WorkspacePath): Promise<Workspace | null>;

  /**
   * Find a workspace by its ID
   */
  findById(id: WorkspaceId): Promise<Workspace | null>;

  /**
   * Save a workspace
   */
  save(workspace: Workspace): Promise<void>;

  /**
   * Load workspace configuration from path
   */
  loadConfiguration(path: WorkspacePath): Promise<WorkspaceConfig>;

  /**
   * Save workspace configuration to path
   */
  saveConfiguration(path: WorkspacePath, config: WorkspaceConfig): Promise<void>;

  /**
   * Check if a path contains a valid pnpm workspace
   */
  isValidWorkspace(path: WorkspacePath): Promise<boolean>;

  /**
   * Discover workspace from current working directory or given path
   */
  discoverWorkspace(searchPath?: WorkspacePath): Promise<Workspace | null>;
}