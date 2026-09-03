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

let initialization: Promise<void> | undefined;

export function initializeWebMcpTools(): Promise<void> {
  if (initialization) return initialization;

  const task = Promise.all([
    webMcpRegistry.register(searchSkillsToolDef, searchSkillsToolHandler),
    webMcpRegistry.register(
      getSkillMetadataToolDef,
      getSkillMetadataToolHandler,
    ),
    webMcpRegistry.register(getSkillToolDef, getSkillToolHandler),
    webMcpRegistry.register(listMySkillsToolDef, listMySkillsToolHandler),
  ])
    .then(() => undefined)
    .catch(() => {
      // Registration status is exposed through the provider; the app remains
      // usable when a browser rejects native WebMCP registration.
    })
    .finally(() => {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("webmcp-tools-updated"));
      }
    });

  initialization = task;
  return task;
}

export function registerTool(
  def: WebMcpToolDefinition,
  handler: WebMcpToolHandler,
) {
  return initializeWebMcpTools().then(() =>
    webMcpRegistry.register(def, handler),
  );
}
