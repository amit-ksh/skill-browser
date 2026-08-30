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

  // Register Standard Core Read Tools
  webMcpRegistry.register(searchSkillsToolDef, searchSkillsToolHandler);
  webMcpRegistry.register(getSkillMetadataToolDef, getSkillMetadataToolHandler);
  webMcpRegistry.register(getSkillToolDef, getSkillToolHandler);
  webMcpRegistry.register(listMySkillsToolDef, listMySkillsToolHandler);

  // Listen for agent simulator / extension dispatch events
  if (typeof window !== "undefined") {
    window.addEventListener("webmcp-agent-call", async (e: Event) => {
      const customEvent = e as CustomEvent<{
        toolName: string;
        params: Record<string, unknown>;
        callId?: string;
      }>;

      if (!customEvent.detail) return;
      const { toolName, params, callId } = customEvent.detail;
      const response = await webMcpRegistry.execute(toolName, params);

      window.dispatchEvent(
        new CustomEvent("webmcp-agent-response", {
          detail: { callId, toolName, response },
        }),
      );
    });

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
