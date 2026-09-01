"use client";

import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import {
  initializeWebMcpTools,
  type WebMcpToolDefinition,
  webMcpRegistry,
} from "@/infrastructure/webmcp";

interface WebMcpContextType {
  tools: WebMcpToolDefinition[];
}

const WebMcpContext = createContext<WebMcpContextType | undefined>(undefined);

export function WebMcpProvider({ children }: { children: React.ReactNode }) {
  const [tools, setTools] = useState<WebMcpToolDefinition[]>([]);

  useEffect(() => {
    initializeWebMcpTools();
    setTools(webMcpRegistry.listTools());

    const handleToolsUpdated = () => setTools(webMcpRegistry.listTools());
    window.addEventListener("webmcp-tools-updated", handleToolsUpdated);
    return () =>
      window.removeEventListener("webmcp-tools-updated", handleToolsUpdated);
  }, []);

  return (
    <WebMcpContext.Provider value={{ tools }}>
      {children}
    </WebMcpContext.Provider>
  );
}

export function useWebMcp() {
  const context = useContext(WebMcpContext);
  if (!context) {
    throw new Error("useWebMcp must be used within a WebMcpProvider");
  }
  return context;
}
