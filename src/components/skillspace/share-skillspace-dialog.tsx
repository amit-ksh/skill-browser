"use client";

import { Bot, Check, Copy, Globe } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";

export function ShareSkillspaceDialog({
  isOpen,
  onClose,
  skillCount,
}: {
  isOpen: boolean;
  onClose: () => void;
  skillCount: number;
}) {
  const [copied, setCopied] = useState(false);
  const { success } = useToast();

  const shareUrl =
    typeof window !== "undefined"
      ? window.location.href
      : "https://skillbrowser.app/me/skills";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      success("Skillspace link copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-[var(--accent)]" />
          <span>Connect Your Skillspace to Agents</span>
        </div>
      }
      description="Your personal Skillspace is exposed directly to browser AI agents via WebMCP."
      footer={
        <Button variant="secondary" size="sm" onClick={onClose}>
          Done
        </Button>
      }
    >
      <div className="space-y-4 py-2 text-xs">
        {/* Link Share Box */}
        <div className="space-y-1.5">
          <span className="font-mono text-[var(--text-subtle)]">
            Skillspace Entry URL:
          </span>
          <div className="flex items-center gap-2">
            <Input value={shareUrl} readOnly className="font-mono text-xs" />
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCopy}
              className="gap-1 shrink-0"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-[var(--success)]" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              <span>{copied ? "Copied" : "Copy"}</span>
            </Button>
          </div>
        </div>

        {/* WebMCP Instructions Box */}
        <div className="p-3.5 bg-[var(--surface-muted)] border border-[var(--border)] rounded-[var(--radius-md)] space-y-2.5">
          <div className="flex items-center gap-2 font-semibold text-[var(--text)]">
            <Bot className="w-4 h-4 text-[var(--accent)]" />
            <span>How to use with AI Agents (ChatGPT / Chrome)</span>
          </div>

          <ol className="list-decimal pl-4 space-y-1.5 text-[var(--text-muted)] leading-relaxed">
            <li>
              Open this URL in ChatGPT's in-app browser or a WebMCP-enabled
              Chrome instance.
            </li>
            <li>
              The agent automatically discovers your {skillCount} installed
              skills via{" "}
              <code className="text-[var(--text)]">navigator.modelContext</code>
              .
            </li>
            <li>
              Ask your agent:{" "}
              <em className="text-[var(--text)]">
                &quot;What skills are in my Skillspace?&quot;
              </em>{" "}
              or{" "}
              <em className="text-[var(--text)]">
                &quot;Use my Next.js expert skill.&quot;
              </em>
            </li>
            <li>
              The agent will progressively fetch the required instructions
              without you having to copy-paste prompts!
            </li>
          </ol>
        </div>
      </div>
    </Dialog>
  );
}
