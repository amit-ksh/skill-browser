"use client";

import { Check, Copy, FileText, Plus, Trash2 } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/toast";
import type { Skill, SkillSummary } from "@/contracts";
import { useSkillspace } from "@/domain/hooks/use-skillspace";
import { MarkdownViewer } from "./markdown-viewer";

export function SkillDetailDialog({
  skill,
  isOpen,
  onClose,
}: {
  skill: Skill | SkillSummary | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  const { isInstalled, installSkill, removeSkill } = useSkillspace();
  const { success, info } = useToast();
  const [copied, setCopied] = useState(false);

  if (!skill) return null;

  const installed = isInstalled(skill.id);
  const prompt =
    "instructions" in skill && skill.instructions
      ? skill.instructions
      : `# ${skill.name}\n\n${skill.description}`;
  const references = "references" in skill ? skill.references : [];

  const handleToggleInstall = async (event: React.MouseEvent) => {
    event.stopPropagation();
    if (installed) {
      await removeSkill(skill.id);
      info(`Removed "${skill.name}" from your Skillspace`);
      return;
    }

    const skillPayload: Skill = {
      ...skill,
      instructions: prompt,
      references,
      compatibility:
        "compatibility" in skill ? skill.compatibility : ["WebMCP v1"],
      license: "license" in skill ? skill.license : "MIT",
    };
    await installSkill(skillPayload);
    success(`Added "${skill.name}" to your Skillspace`);
  };

  const handleCopyId = async () => {
    await navigator.clipboard.writeText(skill.id);
    setCopied(true);
    success("Skill ID copied to clipboard");
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex flex-wrap items-center gap-2.5">
          <FileText className="size-4 text-[var(--accent)]" />
          <span className="font-mono text-base font-bold tracking-tight text-[var(--text)]">
            {skill.name}
          </span>
          <Badge variant="outline" size="sm" className="font-mono text-[10px]">
            v{skill.version}
          </Badge>
        </div>
      }
      description={skill.description}
      maxWidth="xl"
      footer={
        <div className="flex w-full flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => void handleCopyId()}
            className="rounded-[var(--radius-sm)] font-mono text-xs"
          >
            {copied ? (
              <Check className="size-3.5 text-[var(--success)]" />
            ) : (
              <Copy className="size-3.5 text-[var(--accent)]" />
            )}
            Copy skill ID
          </Button>

          <div className="flex items-center justify-end gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="font-mono text-xs"
            >
              Close
            </Button>
            <Button
              variant={installed ? "danger" : "primary"}
              size="sm"
              onClick={(event) => void handleToggleInstall(event)}
              className="rounded-[var(--radius-sm)] font-mono text-xs"
            >
              {installed ? (
                <>
                  <Trash2 className="size-3.5" />
                  Remove
                </>
              ) : (
                <>
                  <Plus className="size-3.5" />
                  Add to Skillspace
                </>
              )}
            </Button>
          </div>
        </div>
      }
    >
      <div className="space-y-4">
        <div className="flex flex-wrap gap-1.5">
          {skill.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-[var(--radius-xs)] border border-[var(--border)] bg-[var(--surface-elevated)] px-2 py-0.5 font-mono text-[10px] text-[var(--text-muted)]"
            >
              {tag}
            </span>
          ))}
        </div>

        <section aria-labelledby="skill-prompt-heading">
          <div className="mb-3 flex items-center justify-between border-b border-[var(--border)] pb-2">
            <h3
              id="skill-prompt-heading"
              className="font-mono text-xs font-bold text-[var(--text)]"
            >
              Skill prompt
            </h3>
            <span className="font-mono text-[10px] text-[var(--text-subtle)]">
              Read-only
            </span>
          </div>
          <div className="max-h-[52vh] overflow-y-auto rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-muted)] p-5">
            <MarkdownViewer content={prompt} />
          </div>
        </section>
      </div>
    </Dialog>
  );
}
