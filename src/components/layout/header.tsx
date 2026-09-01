"use client";

import { Plus, Wrench } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ForgeMark } from "@/components/brand/forge-mark";
import { ImportSkillDialog } from "@/components/skills/import-skill-dialog";
import { Button } from "@/components/ui/button";
import { WebMcpGuideDialog } from "@/components/webmcp/webmcp-guide-dialog";

export function Header() {
  const [isWebMcpGuideOpen, setIsWebMcpGuideOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-[var(--border)] bg-[var(--background)]/95 px-4 backdrop-blur-md md:px-8">
        <Link href="/" className="group flex items-center gap-2.5">
          <ForgeMark className="size-5 transition-transform group-hover:scale-105" />
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold tracking-tight text-[var(--text)]">
              Skillspace
            </span>
            <span className="hidden border-l border-[var(--border-strong)] pl-2 font-mono text-[9px] font-semibold tracking-wider text-[var(--text-subtle)] sm:inline-block">
              SKILL LIBRARY
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsWebMcpGuideOpen(true)}
            className="flex items-center gap-1.5 rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 font-mono text-xs text-[var(--text-muted)] transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-elevated)] hover:text-[var(--text)]"
          >
            <Wrench className="size-3.5 text-[var(--accent)]" />
            Tools
          </button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsImportOpen(true)}
            className="rounded-[var(--radius-sm)] border-[var(--accent-border)] font-mono text-xs hover:border-[var(--accent)]"
          >
            <Plus className="size-3.5 text-[var(--accent)]" />
            Add skill
          </Button>
        </div>
      </header>

      <WebMcpGuideDialog
        isOpen={isWebMcpGuideOpen}
        onClose={() => setIsWebMcpGuideOpen(false)}
      />
      <ImportSkillDialog
        isOpen={isImportOpen}
        onClose={() => setIsImportOpen(false)}
      />
    </>
  );
}
