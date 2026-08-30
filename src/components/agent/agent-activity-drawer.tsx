"use client";

import { Activity, Bot, ShieldCheck, X } from "lucide-react";
import { useEffect } from "react";
import { useWebMcp } from "@/components/agent/webmcp-provider";
import { Button } from "@/components/ui/button";
import { AgentActivityFeed } from "./agent-activity-feed";

export function AgentActivityDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { invocations, clearInvocations, status, tools } = useWebMcp();

  // Escape key closes drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <button
        type="button"
        className="fixed inset-0 bg-black/60 backdrop-blur-xs border-none w-full h-full p-0 cursor-default"
        onClick={onClose}
        aria-label="Close activity drawer overlay"
        tabIndex={-1}
      />

      {/* Slide-over Content Panel */}
      <div className="relative w-full max-w-lg bg-[var(--surface)] border-l border-[var(--border)] h-full shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 border-b border-[var(--border)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[var(--surface-elevated)] flex items-center justify-center text-[var(--accent)] border border-[var(--border)]">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[var(--text)] flex items-center gap-2">
                <span>Agent Activity Telemetry</span>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--success)] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--success)]" />
                </span>
              </h2>
              <p className="text-[11px] font-mono text-[var(--text-subtle)]">
                WebMCP Protocol Monitor • {tools.length} Tools Active
              </p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Status Bar */}
        <div className="px-4 py-2.5 bg-[var(--surface-muted)] border-b border-[var(--border-subtle)] flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-1.5 text-[var(--text-subtle)]">
            <Bot className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>Connection:</span>
            <span className="text-[var(--text)] font-semibold uppercase">
              {status}
            </span>
          </div>

          <div className="flex items-center gap-1 text-[var(--success)]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Approval Gate Armed</span>
          </div>
        </div>

        {/* Body Feed */}
        <div className="flex-1 overflow-y-auto p-4">
          <AgentActivityFeed
            invocations={invocations}
            onClear={clearInvocations}
          />
        </div>
      </div>
    </div>
  );
}
