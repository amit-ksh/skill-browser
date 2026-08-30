import { webMcpRegistry } from "./tool-registry";
import type { WebMcpToolDefinition, WebMcpToolHandler } from "./types";

let isInitialized = false;

export function initializeWebMcpTools() {
  if (isInitialized) return;
  isInitialized = true;

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
  }
}

export function registerTool(
  def: WebMcpToolDefinition,
  handler: WebMcpToolHandler,
) {
  initializeWebMcpTools();
  webMcpRegistry.register(def, handler);
}
