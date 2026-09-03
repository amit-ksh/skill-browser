import { AppError } from "@/contracts";
import type {
  ModelContextAPI,
  WebMcpToolDefinition,
  WebMcpToolHandler,
} from "./types";

export type WebMcpRegistrationStatus =
  | { state: "idle" }
  | { state: "unavailable" }
  | { state: "registered"; toolCount: number }
  | { state: "failed"; message: string };

export class WebMcpToolRegistry {
  private tools: Map<
    string,
    { def: WebMcpToolDefinition; handler: WebMcpToolHandler }
  > = new Map();
  private nativeToolNames = new Set<string>();
  private status: WebMcpRegistrationStatus = { state: "idle" };

  async register(def: WebMcpToolDefinition, handler: WebMcpToolHandler) {
    this.tools.set(def.name, { def, handler });

    const api = this.getModelContext();
    if (!api) {
      this.status = { state: "unavailable" };
      return;
    }

    if (this.nativeToolNames.has(def.name)) {
      return;
    }

    try {
      await api.registerTool({
        ...def,
        execute: async (params) => this.execute(def.name, params),
      });
      this.nativeToolNames.add(def.name);
      this.status = {
        state: "registered",
        toolCount: this.nativeToolNames.size,
      };
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "WebMCP tool registration failed.";
      this.status = { state: "failed", message };
      throw error;
    }
  }

  private getModelContext(): ModelContextAPI | undefined {
    if (typeof document === "undefined") return undefined;

    // document.modelContext is the current WebMCP API. Navigator remains only
    // as a compatibility fallback for older runtimes.
    return document.modelContext ?? navigator.modelContext;
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
    return this.nativeToolNames.size === this.tools.size && this.tools.size > 0;
  }

  getStatus(): WebMcpRegistrationStatus {
    return this.status;
  }
}

export const webMcpRegistry = new WebMcpToolRegistry();
