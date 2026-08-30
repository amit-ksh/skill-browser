import { AppError } from "@/contracts";
import { webMcpTelemetry } from "./telemetry";
import type {
  AgentToolInvocation,
  ModelContextAPI,
  WebMcpToolDefinition,
  WebMcpToolHandler,
} from "./types";

export class WebMcpToolRegistry {
  private tools: Map<
    string,
    { def: WebMcpToolDefinition; handler: WebMcpToolHandler }
  > = new Map();
  private isNativeRegistered = false;

  register(def: WebMcpToolDefinition, handler: WebMcpToolHandler) {
    this.tools.set(def.name, { def, handler });

    // Register on browser native API if available
    if (typeof window !== "undefined") {
      const api: ModelContextAPI | undefined =
        navigator.modelContext || window.modelContext;
      if (api && typeof api.registerTool === "function") {
        try {
          api.registerTool(def, async (params) => {
            return this.execute(def.name, params);
          });
          this.isNativeRegistered = true;
        } catch {
          // Native registration fallback
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
    const invocationId = `inv-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    const startTime = performance.now();
    const timestamp = new Date().toISOString();

    if (!entry) {
      const errRes = {
        code: "INVALID_INPUT",
        message: `WebMCP tool '${toolName}' is not registered.`,
      };

      webMcpTelemetry.recordInvocation({
        id: invocationId,
        toolName,
        params,
        timestamp,
        durationMs: Math.round(performance.now() - startTime),
        status: "error",
        error: errRes,
      });

      return { success: false, error: errRes };
    }

    try {
      const result = await entry.handler(params);
      const durationMs = Math.round(performance.now() - startTime);

      // Check if it's a pending human approval
      const isPending =
        result &&
        typeof result === "object" &&
        "status" in result &&
        (result as { status: string }).status === "pending";

      const invocation: AgentToolInvocation = {
        id: invocationId,
        toolName,
        params,
        timestamp,
        durationMs,
        status: isPending ? "pending_approval" : "success",
        result,
      };

      webMcpTelemetry.recordInvocation(invocation);
      return { success: true, data: result };
    } catch (err: unknown) {
      const durationMs = Math.round(performance.now() - startTime);
      const code = err instanceof AppError ? err.code : "INTERNAL_ERROR";
      const message =
        err instanceof Error ? err.message : "Tool execution failed";

      const invocation: AgentToolInvocation = {
        id: invocationId,
        toolName,
        params,
        timestamp,
        durationMs,
        status: "error",
        error: { code, message },
      };

      webMcpTelemetry.recordInvocation(invocation);
      return { success: false, error: { code, message } };
    }
  }

  listTools(): WebMcpToolDefinition[] {
    return Array.from(this.tools.values()).map((e) => e.def);
  }

  isRegistered(): boolean {
    return this.tools.size > 0;
  }

  isNative(): boolean {
    return this.isNativeRegistered;
  }
}

export const webMcpRegistry = new WebMcpToolRegistry();
