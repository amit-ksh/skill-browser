import { AppError } from "@/contracts";
import type {
  ModelContextAPI,
  WebMcpToolDefinition,
  WebMcpToolHandler,
} from "./types";

export class WebMcpToolRegistry {
  private tools: Map<
    string,
    { def: WebMcpToolDefinition; handler: WebMcpToolHandler }
  > = new Map();

  register(def: WebMcpToolDefinition, handler: WebMcpToolHandler) {
    this.tools.set(def.name, { def, handler });

    if (typeof window !== "undefined") {
      const api: ModelContextAPI | undefined =
        navigator.modelContext || window.modelContext;
      if (api && typeof api.registerTool === "function") {
        try {
          api.registerTool(def, async (params) =>
            this.execute(def.name, params),
          );
        } catch {
          // The local registry remains available when native registration fails.
        }
      }
    }
  }

  async execute(
    toolName: string,
    params: Record<string, unknown>,
  ): Promise<{
    success: boolean;
    data?: unknown;
    error?: { code: string; message: string };
  }> {
    const entry = this.tools.get(toolName);
    if (!entry) {
      return {
        success: false,
        error: {
          code: "INVALID_INPUT",
          message: `WebMCP tool '${toolName}' is not registered.`,
        },
      };
    }

    try {
      return { success: true, data: await entry.handler(params) };
    } catch (error: unknown) {
      const code = error instanceof AppError ? error.code : "INTERNAL_ERROR";
      const message =
        error instanceof Error ? error.message : "Tool execution failed";
      return { success: false, error: { code, message } };
    }
  }

  listTools(): WebMcpToolDefinition[] {
    return Array.from(this.tools.values()).map((entry) => entry.def);
  }

  isRegistered(): boolean {
    return this.tools.size > 0;
  }
}

export const webMcpRegistry = new WebMcpToolRegistry();
