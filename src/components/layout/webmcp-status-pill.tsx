"use client";

import { Bot, CheckCircle2, Cpu, RefreshCw } from "lucide-react";
import { useState } from "react";
import { useWebMcp } from "@/components/agent/webmcp-provider";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function WebMcpStatusPill() {
  const { status, tools } = useWebMcp();
  const [isOpen, setIsOpen] = useState(false);

  const config = {
    checking: {
      label: "WebMCP Checking",
      variant: "neutral" as const,
      icon: (
        <RefreshCw className="w-3 h-3 animate-spin text-[var(--text-muted)]" />
      ),
      desc: "Detecting browser agent capabilities...",
    },
    supported: {
      label: "WebMCP Ready",
      variant: "accent" as const,
      icon: <Cpu className="w-3 h-3 text-[var(--accent)]" />,
      desc: "Browser agent runtime detected.",
    },
    connected: {
      label: "Agent Active",
      variant: "success" as const,
      icon: <CheckCircle2 className="w-3 h-3 text-[var(--success)]" />,
      desc: "WebMCP native model context connected.",
    },
    unsupported: {
      label: "WebMCP Simulator Ready",
      variant: "outline" as const,
      icon: <Bot className="w-3 h-3 text-[var(--text-muted)]" />,
      desc: "Standard browser. In-app agent simulator active.",
    },
    error: {
      label: "WebMCP Error",
      variant: "danger" as const,
      icon: <Bot className="w-3 h-3 text-[var(--danger)]" />,
      desc: "An error occurred initializing WebMCP context.",
    },
  };

  const current = config[status] || config.unsupported;

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-2.5 py-1 text-xs font-mono rounded-[var(--radius-full)]",
          "border border-[var(--border)] bg-[var(--surface-muted)] hover:bg-[var(--surface-elevated)] transition-all cursor-pointer",
        )}
      >
        <span className="relative flex h-2 w-2">
          <span
            className={cn(
              "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
              status === "connected"
                ? "bg-[var(--success)]"
                : status === "unsupported"
                  ? "bg-[var(--info)]"
                  : "bg-[var(--warning)]",
            )}
          />
          <span
            className={cn(
              "relative inline-flex rounded-full h-2 w-2",
              status === "connected"
                ? "bg-[var(--success)]"
                : status === "unsupported"
                  ? "bg-[var(--info)]"
                  : "bg-[var(--warning)]",
            )}
          />
        </span>
        <span className="text-[var(--text)] font-medium">{current.label}</span>
      </button>

      {isOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-30 cursor-default border-none bg-transparent w-full h-full p-0"
            onClick={() => setIsOpen(false)}
            aria-label="Close status popup overlay"
            tabIndex={-1}
          />
          <div
            className={cn(
              "absolute right-0 z-40 mt-2 w-72 p-3.5 bg-[var(--surface-elevated)] border border-[var(--border-strong)]",
              "rounded-[var(--radius-lg)] shadow-2xl space-y-2.5 animate-in fade-in zoom-in-95 duration-100",
            )}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[var(--text)] flex items-center gap-1.5">
                <Bot className="w-3.5 h-3.5 text-[var(--accent)]" />
                Browser Agent Status
              </span>
              <Badge variant={current.variant} size="sm">
                {status.toUpperCase()}
              </Badge>
            </div>

            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              {current.desc}
            </p>

            <div className="p-2.5 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-sm)] text-[11px] font-mono space-y-1 text-[var(--text-subtle)]">
              <div className="flex justify-between">
                <span>Protocol:</span>
                <span className="text-[var(--text)]">WebMCP v1</span>
              </div>
              <div className="flex justify-between">
                <span>Tools Exposed:</span>
                <span className="text-[var(--accent)] font-semibold">
                  {tools.length || 5} tools
                </span>
              </div>
              <div className="flex justify-between">
                <span>Permission Gate:</span>
                <span className="text-[var(--success)]">Human-in-the-loop</span>
              </div>
            </div>

            <p className="text-[10px] text-[var(--text-subtle)]">
              Supports ChatGPT in-app browser, Chrome WebMCP trial, and
              integrated agent simulator.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
