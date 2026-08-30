"use client";

import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  Trash2,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { AgentToolInvocation } from "@/infrastructure/webmcp";
import { cn } from "@/lib/utils";

export function AgentActivityFeed({
  invocations,
  onClear,
}: {
  invocations: AgentToolInvocation[];
  onClear: () => void;
}) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "mutations" | "errors">("all");

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filtered = invocations.filter((inv) => {
    if (filter === "mutations") {
      return (
        inv.toolName === "install_skill" || inv.toolName === "create_collection"
      );
    }
    if (filter === "errors") {
      return inv.status === "error";
    }
    return true;
  });

  const getStatusBadge = (status: AgentToolInvocation["status"]) => {
    switch (status) {
      case "success":
        return (
          <Badge variant="success" size="sm" className="gap-1">
            <CheckCircle2 className="w-3 h-3" />
            200 OK
          </Badge>
        );
      case "error":
        return (
          <Badge variant="danger" size="sm" className="gap-1">
            <XCircle className="w-3 h-3" />
            Error
          </Badge>
        );
      case "pending_approval":
        return (
          <Badge variant="warning" size="sm" className="gap-1">
            <AlertTriangle className="w-3 h-3" />
            Pending Approval
          </Badge>
        );
      default:
        return (
          <Badge variant="neutral" size="sm">
            {status}
          </Badge>
        );
    }
  };

  const isMutation = (toolName: string) => {
    return toolName === "install_skill" || toolName === "create_collection";
  };

  return (
    <div className="space-y-4">
      {/* Controls Bar */}
      <div className="flex items-center justify-between gap-2 pb-2 border-b border-[var(--border-subtle)] text-xs">
        <div className="flex items-center gap-1 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-sm)] p-0.5">
          {(["all", "mutations", "errors"] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={cn(
                "px-2.5 py-1 text-[11px] font-mono capitalize rounded-[var(--radius-sm)] transition-colors cursor-pointer",
                filter === f
                  ? "bg-[var(--surface-elevated)] text-[var(--text)] font-semibold border border-[var(--border-strong)]"
                  : "text-[var(--text-subtle)] hover:text-[var(--text)]",
              )}
            >
              {f}
            </button>
          ))}
        </div>

        {invocations.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="h-7 text-xs gap-1 text-[var(--text-subtle)] hover:text-[var(--danger)]"
          >
            <Trash2 className="w-3 h-3" />
            <span>Clear Logs</span>
          </Button>
        )}
      </div>

      {/* Invocations List */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 text-center border border-dashed border-[var(--border)] rounded-[var(--radius-md)] bg-[var(--surface)]/20 space-y-2">
          <Activity className="w-6 h-6 text-[var(--text-subtle)]" />
          <div className="text-xs text-[var(--text-muted)] font-medium">
            No agent activity recorded yet
          </div>
          <p className="text-[11px] text-[var(--text-subtle)] max-w-xs leading-relaxed">
            When browser AI agents (or the agent simulator) query tools,
            execution telemetry appears here in real time.
          </p>
        </div>
      ) : (
        <div className="space-y-2 max-h-[550px] overflow-y-auto pr-1">
          {filtered.map((inv) => {
            const isExpanded = expandedId === inv.id;
            const timeStr = new Date(inv.timestamp).toLocaleTimeString();

            return (
              <div
                key={inv.id}
                className={cn(
                  "border rounded-[var(--radius-md)] transition-all bg-[var(--surface)]",
                  isExpanded
                    ? "border-[var(--accent)]"
                    : "border-[var(--border)] hover:border-[var(--border-strong)]",
                )}
              >
                {/* Header Row */}
                <button
                  type="button"
                  onClick={() => toggleExpand(inv.id)}
                  className="w-full p-3 flex items-center justify-between gap-3 text-left cursor-pointer select-none"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="text-[var(--text-subtle)]">
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4 text-[var(--accent)]" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </div>

                    <div className="space-y-0.5 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-mono font-bold text-[var(--text)]">
                          {inv.toolName}
                        </span>
                        <Badge
                          variant={
                            isMutation(inv.toolName) ? "warning" : "neutral"
                          }
                          size="sm"
                          className="text-[10px] uppercase font-mono"
                        >
                          {isMutation(inv.toolName) ? "MUTATION" : "READ"}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-2 text-[10px] font-mono text-[var(--text-subtle)]">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {timeStr}
                        </span>
                        <span>•</span>
                        <span>{inv.durationMs}ms</span>
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0">{getStatusBadge(inv.status)}</div>
                </button>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="p-3 pt-0 border-t border-[var(--border-subtle)] mt-2 space-y-3 bg-[var(--surface-muted)]/50">
                    {/* Input Params */}
                    <div className="space-y-1 pt-2">
                      <span className="text-[11px] font-mono text-[var(--text-subtle)] block">
                        Input Parameters:
                      </span>
                      <pre className="p-2 bg-[var(--surface)] border border-[var(--border)] rounded text-[11px] font-mono text-[var(--text)] overflow-x-auto">
                        {JSON.stringify(inv.params, null, 2)}
                      </pre>
                    </div>

                    {/* Result / Error */}
                    <div className="space-y-1">
                      <span className="text-[11px] font-mono text-[var(--text-subtle)] block">
                        {inv.status === "error"
                          ? "Error Details:"
                          : "Returned Result:"}
                      </span>
                      <pre
                        className={cn(
                          "p-2 border rounded text-[11px] font-mono overflow-x-auto max-h-48",
                          inv.status === "error"
                            ? "bg-[var(--danger-subtle)] border-[var(--danger-border)] text-[var(--danger)]"
                            : "bg-[var(--surface)] border-[var(--border)] text-[var(--text)]",
                        )}
                      >
                        {JSON.stringify(inv.error || inv.result, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
