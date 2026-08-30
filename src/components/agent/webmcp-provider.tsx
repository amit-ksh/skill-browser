"use client";

import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import {
  type AgentToolInvocation,
  initializeWebMcpTools,
  type WebMcpConnectionStatus,
  type WebMcpToolDefinition,
  webMcpRegistry,
  webMcpTelemetry,
} from "@/infrastructure/webmcp";

interface WebMcpContextType {
  status: WebMcpConnectionStatus;
  tools: WebMcpToolDefinition[];
  invocations: AgentToolInvocation[];
  isNative: boolean;
  clearInvocations: () => void;
}

const WebMcpContext = createContext<WebMcpContextType | undefined>(undefined);

export function WebMcpProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<WebMcpConnectionStatus>("checking");
  const [tools, setTools] = useState<WebMcpToolDefinition[]>([]);
  const [invocations, setInvocations] = useState<AgentToolInvocation[]>([]);
  const [isNative, setIsNative] = useState(false);

  useEffect(() => {
    // 1. Initialize tool bridge
    initializeWebMcpTools();

    // 2. Feature detection
    if (typeof window !== "undefined") {
      const hasNative = "modelContext" in navigator || "modelContext" in window;
      if (hasNative) {
        setStatus("connected");
        setIsNative(true);
      } else {
        setStatus("unsupported");
        setIsNative(false);
      }
    }

    // 3. Load initial tools & telemetry
    setTools(webMcpRegistry.listTools());
    setInvocations(webMcpTelemetry.getLogs());

    // 4. Subscribe to live telemetry
    const unsubscribe = webMcpTelemetry.subscribe((inv) => {
      setInvocations((prev) => [inv, ...prev.slice(0, 49)]);
    });

    const handleToolsUpdated = () => {
      setTools(webMcpRegistry.listTools());
    };

    window.addEventListener("webmcp-tools-updated", handleToolsUpdated);

    return () => {
      unsubscribe();
      window.removeEventListener("webmcp-tools-updated", handleToolsUpdated);
    };
  }, []);

  const clearInvocations = () => {
    webMcpTelemetry.clearLogs();
    setInvocations([]);
  };

  return (
    <WebMcpContext.Provider
      value={{
        status,
        tools,
        invocations,
        isNative,
        clearInvocations,
      }}
    >
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
