import type { AgentToolInvocation } from "./types";

type TelemetryListener = (invocation: AgentToolInvocation) => void;

class WebMcpTelemetryBus {
  private logs: AgentToolInvocation[] = [];
  private listeners: Set<TelemetryListener> = new Set();
  private maxLogs = 50;

  recordInvocation(invocation: AgentToolInvocation) {
    this.logs.unshift(invocation);
    if (this.logs.length > this.maxLogs) {
      this.logs.pop();
    }

    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("webmcp-tool-invoked", { detail: invocation }),
      );
    }

    for (const listener of this.listeners) {
      try {
        listener(invocation);
      } catch {}
    }
  }

  getLogs(): AgentToolInvocation[] {
    return [...this.logs];
  }

  clearLogs() {
    this.logs = [];
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("webmcp-logs-cleared"));
    }
  }

  subscribe(listener: TelemetryListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
}

export const webMcpTelemetry = new WebMcpTelemetryBus();
