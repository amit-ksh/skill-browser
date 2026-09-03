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

export interface RegisteredWebMcpTool extends WebMcpToolDefinition {
  execute: WebMcpToolHandler;
}

export interface ModelContextAPI {
  registerTool(tool: RegisteredWebMcpTool): Promise<void>;
}

declare global {
  interface Document {
    modelContext?: ModelContextAPI;
  }
  interface Navigator {
    modelContext?: ModelContextAPI;
  }
}
