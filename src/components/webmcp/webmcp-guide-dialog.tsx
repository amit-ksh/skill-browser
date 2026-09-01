"use client";

import { Check, ChevronRight, Code2, Copy, Terminal } from "lucide-react";
import { useState } from "react";
import { useWebMcp } from "@/components/agent/webmcp-provider";
import { Badge } from "@/components/ui/badge";
import { Dialog } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/toast";

export function WebMcpGuideDialog({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { tools } = useWebMcp();
  const { success } = useToast();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    success("Schema copied to clipboard");
    window.setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2.5">
          <Terminal className="size-4 text-[var(--accent)]" />
          <span className="font-mono text-base font-bold tracking-tight text-[var(--text)]">
            Skillspace WebMCP tools
          </span>
        </div>
      }
      description="Read-only tools let AI find a skill and retrieve its instructions when you ask it to."
      maxWidth="xl"
    >
      <section className="space-y-4" aria-labelledby="registered-tools-heading">
        <div className="flex items-center gap-2 border-b border-[var(--border)] pb-3">
          <Code2 className="size-4 text-[var(--accent)]" />
          <h3
            id="registered-tools-heading"
            className="font-mono text-xs font-bold text-[var(--text)]"
          >
            Registered tools
          </h3>
        </div>

        <div className="max-h-[58vh] space-y-2 overflow-y-auto pr-1">
          {tools.map((tool) => {
            const schema = JSON.stringify(tool.inputSchema, null, 2);
            const copyId = `schema-${tool.name}`;

            return (
              <details
                key={tool.name}
                className="group rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-muted)]"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 p-4 marker:content-none">
                  <div className="min-w-0 space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <ChevronRight className="size-3.5 shrink-0 text-[var(--text-subtle)] transition-transform group-open:rotate-90" />
                      <span className="font-mono text-sm font-bold text-[var(--text)]">
                        {tool.name}
                      </span>
                      <Badge
                        variant="outline"
                        size="sm"
                        className="font-mono text-[9px] uppercase text-[var(--text-subtle)]"
                      >
                        Read tool
                      </Badge>
                    </div>
                    <p className="pl-5.5 text-xs leading-relaxed text-[var(--text-muted)]">
                      {tool.description}
                    </p>
                  </div>
                </summary>

                <div className="border-t border-[var(--border)] p-4 pt-3">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <span className="font-mono text-[10px] font-semibold text-[var(--text-subtle)]">
                      Input schema
                    </span>
                    <button
                      type="button"
                      onClick={() => void handleCopy(schema, copyId)}
                      className="rounded-[var(--radius-sm)] p-1.5 text-[var(--text-subtle)] transition-colors hover:bg-[var(--surface-elevated)] hover:text-[var(--text)]"
                      title="Copy tool JSON schema"
                      aria-label={`Copy ${tool.name} JSON schema`}
                    >
                      {copiedId === copyId ? (
                        <Check className="size-3.5 text-[var(--success)]" />
                      ) : (
                        <Copy className="size-3.5" />
                      )}
                    </button>
                  </div>
                  <pre className="overflow-x-auto rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--background)] p-3 font-mono text-[11px] leading-relaxed text-[var(--text)]">
                    {schema}
                  </pre>
                </div>
              </details>
            );
          })}
        </div>
      </section>
    </Dialog>
  );
}
