"use client";

import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import {
  initializeWebMcpTools,
  type WebMcpRegistrationStatus,
  type WebMcpToolDefinition,
  webMcpRegistry,
} from "@/infrastructure/webmcp";

interface WebMcpContextType {
  tools: WebMcpToolDefinition[];
  registrationStatus: WebMcpRegistrationStatus;
}

const WebMcpContext = createContext<WebMcpContextType | undefined>(undefined);

export function WebMcpProvider({ children }: { children: React.ReactNode }) {
  const [tools, setTools] = useState<WebMcpToolDefinition[]>([]);
  const [registrationStatus, setRegistrationStatus] =
    useState<WebMcpRegistrationStatus>({ state: "idle" });

  useEffect(() => {
    const sync = () => {
      setTools(webMcpRegistry.listTools());
      setRegistrationStatus(webMcpRegistry.getStatus());
    };

    void initializeWebMcpTools().finally(sync);
    sync();

    window.addEventListener("webmcp-tools-updated", sync);
    return () => window.removeEventListener("webmcp-tools-updated", sync);
  }, []);

  return (
    <WebMcpContext.Provider value={{ tools, registrationStatus }}>
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
