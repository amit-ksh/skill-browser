"use client";

import { Bot, Download, FolderPlus, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function SkillspaceHeader({
  skillCount,
  collectionCount,
  onOpenCreateCollection,
  onOpenShare,
  onExport,
}: {
  skillCount: number;
  collectionCount: number;
  onOpenCreateCollection: () => void;
  onOpenShare: () => void;
  onExport: () => void;
}) {
  return (
    <div className="p-6 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-lg)] space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Badge variant="accent" size="sm">
              Your local Skillspace
            </Badge>
            <span className="text-[11px] font-mono text-[var(--text-subtle)]">
              IndexedDB Persistent
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text)]">
            Your Skillspace
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-xl">
            The skills you choose here are available to WebMCP-enabled browser
            agents, subject to your approval for every change.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={onOpenCreateCollection}
            className="gap-1.5 text-xs"
          >
            <FolderPlus className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>New Collection</span>
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={onExport}
            className="gap-1.5 text-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export JSON</span>
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={onOpenShare}
            className="gap-1.5 text-xs"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share & Connect</span>
          </Button>
        </div>
      </div>

      {/* Quick Metrics Bar */}
      <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center gap-6 text-xs font-mono text-[var(--text-subtle)]">
        <div>
          <span className="text-[var(--text)] font-semibold">{skillCount}</span>{" "}
          Skills
        </div>
        <div>
          <span className="text-[var(--text)] font-semibold">
            {collectionCount}
          </span>{" "}
          Collections
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-[var(--success)]">
          <Bot className="w-3.5 h-3.5" />
          <span>WebMCP Agent Ready</span>
        </div>
      </div>
    </div>
  );
}
