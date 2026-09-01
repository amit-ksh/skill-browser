import { webMcpRegistry } from "./tool-registry";
import {
  getSkillMetadataToolDef,
  getSkillMetadataToolHandler,
} from "./tools/get-skill-metadata-tool";
import { getSkillToolDef, getSkillToolHandler } from "./tools/get-skill-tool";
import {
  listMySkillsToolDef,
  listMySkillsToolHandler,
} from "./tools/list-my-skills-tool";
import {
  searchSkillsToolDef,
  searchSkillsToolHandler,
} from "./tools/search-skills-tool";
import type { WebMcpToolDefinition, WebMcpToolHandler } from "./types";

let isInitialized = false;

export function initializeWebMcpTools() {
  if (isInitialized) return;
  isInitialized = true;

  // Skillspace exposes a deliberately read-only agent surface.
  webMcpRegistry.register(searchSkillsToolDef, searchSkillsToolHandler);
  webMcpRegistry.register(getSkillMetadataToolDef, getSkillMetadataToolHandler);
  webMcpRegistry.register(getSkillToolDef, getSkillToolHandler);
  webMcpRegistry.register(listMySkillsToolDef, listMySkillsToolHandler);

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("webmcp-tools-updated"));
  }
}

export function registerTool(
  def: WebMcpToolDefinition,
  handler: WebMcpToolHandler,
) {
  initializeWebMcpTools();
  webMcpRegistry.register(def, handler);
}
