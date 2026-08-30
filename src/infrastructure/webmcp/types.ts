export interface WebMcpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: "object";
    properties: Record<
      string,
      { type: string; description?: string; enum?: string[] }
    >;
    required?: string[];
  };
}

export type WebMcpToolHandler = (
  params: Record<string, unknown>,
) => Promise<unknown>;

export interface ModelContextAPI {
  registerTool(tool: WebMcpToolDefinition, handler: WebMcpToolHandler): void;
  unregisterTool?(name: string): void;
  listTools?(): WebMcpToolDefinition[];
}

export interface AgentToolInvocation {
  id: string;
  toolName: string;
  params: Record<string, unknown>;
  timestamp: string;
  durationMs: number;
  status: "success" | "error" | "pending_approval";
  result?: unknown;
  error?: {
    code: string;
    message: string;
  };
}

export type WebMcpConnectionStatus =
  | "checking"
  | "supported"
  | "unsupported"
  | "connected"
  | "error";

declare global {
  interface Navigator {
    modelContext?: ModelContextAPI;
  }
  interface Window {
    modelContext?: ModelContextAPI;
  }
}
