"use client";

import { Eye, ShieldCheck } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import type { Skill, SkillSummary } from "@/contracts";
import { staticSkillRepository } from "@/infrastructure/repositories/static-skill-repository";
import { cn } from "@/lib/utils";
import { SkillDetailDialog } from "./skill-detail-dialog";
import { SkillInstallButton } from "./skill-install-button";

export function SkillCard({
  skill,
  className,
}: {
  skill: SkillSummary;
  className?: string;
}) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [fullSkill, setFullSkill] = useState<Skill | null>(null);

  const openPreview = async () => {
    const fetched = await staticSkillRepository.get(skill.id);
    setFullSkill(fetched);
    setIsPreviewOpen(true);
  };

  const handleEyeClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    void openPreview();
  };

  return (
    <>
      <Card
        role="button"
        tabIndex={0}
        onClick={() => void openPreview()}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            void openPreview();
          }
        }}
        className={cn(
          "group relative flex cursor-pointer flex-col justify-between bg-[var(--surface)] transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-muted)] focus-visible:border-[var(--accent)]",
          className,
        )}
      >
        <CardHeader className="space-y-3 p-4 pb-2">
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-[11px] font-medium uppercase text-[var(--accent)]">
              {skill.category.replaceAll("-", " ")}
            </span>
            <div className="flex items-center gap-1.5">
              {skill.verificationStatus === "verified" && (
                <Badge variant="success" size="sm" className="gap-1">
                  <ShieldCheck className="size-3" />
                  Verified
                </Badge>
              )}
              <span className="font-mono text-[11px] text-[var(--text-subtle)]">
                v{skill.version}
              </span>
            </div>
          </div>

          <h3 className="line-clamp-1 text-sm font-semibold tracking-tight text-[var(--text)] transition-colors group-hover:text-[var(--accent)]">
            {skill.name}
          </h3>
          <p className="line-clamp-2 min-h-8 text-xs leading-relaxed text-[var(--text-muted)]">
            {skill.description}
          </p>
        </CardHeader>

        <CardContent className="flex flex-wrap gap-1 p-4 pb-3 pt-1">
          {skill.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-[var(--radius-xs)] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--text-subtle)]"
            >
              {tag}
            </span>
          ))}
        </CardContent>

        <CardFooter className="flex items-center justify-end gap-1.5 border-t border-[var(--border-subtle)] p-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleEyeClick}
            className="h-7 px-2"
            title={`View ${skill.name} prompt`}
            aria-label={`View ${skill.name} prompt`}
          >
            <Eye className="size-3.5" />
          </Button>
          <SkillInstallButton
            skill={skill}
            fullSkill={fullSkill ?? undefined}
            showRemoveOption
            size="sm"
            className="h-7 text-xs"
          />
        </CardFooter>
      </Card>

      <SkillDetailDialog
        skill={fullSkill ?? skill}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
      />
    </>
  );
}
