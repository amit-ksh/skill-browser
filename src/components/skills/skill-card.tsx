"use client";

import { ArrowUpRight, Eye, ShieldCheck, Terminal, User } from "lucide-react";
import Link from "next/link";
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
import { Dialog } from "@/components/ui/dialog";
import type { Skill, SkillSummary } from "@/contracts";
import { staticSkillRepository } from "@/infrastructure/repositories/static-skill-repository";
import { cn } from "@/lib/utils";
import { MarkdownViewer } from "./markdown-viewer";
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

  const handleOpenPreview = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const fetched = await staticSkillRepository.get(skill.id);
    setFullSkill(fetched);
    setIsPreviewOpen(true);
  };

  const verificationBadges = {
    verified: (
      <Badge variant="success" size="sm" className="gap-1">
        <ShieldCheck className="w-3 h-3" />
        Verified
      </Badge>
    ),
    community: (
      <Badge variant="neutral" size="sm">
        Community
      </Badge>
    ),
    unverified: null,
    custom: (
      <Badge variant="accent" size="sm">
        Custom
      </Badge>
    ),
  };

  return (
    <>
      <Card
        className={cn(
          "group flex flex-col justify-between hover:border-[var(--border-strong)] bg-[var(--surface)] hover:bg-[var(--surface-muted)]/40 transition-all duration-150 relative",
          className,
        )}
      >
        <CardHeader className="p-4 pb-2 space-y-2">
          {/* Header Row: Category & Verification */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-mono font-medium text-[var(--accent)] tracking-tight uppercase">
              {skill.category.replace("-", " ")}
            </span>
            <div className="flex items-center gap-1.5">
              {verificationBadges[skill.verificationStatus]}
              <span className="text-[11px] font-mono text-[var(--text-subtle)]">
                v{skill.version}
              </span>
            </div>
          </div>

          {/* Skill Title Link */}
          <Link
            href={`/skills/${skill.id}`}
            className="block group-hover:text-[var(--accent)] transition-colors"
          >
            <h3 className="text-sm font-semibold text-[var(--text)] tracking-tight line-clamp-1 flex items-center justify-between">
              <span>{skill.name}</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[var(--accent)] shrink-0" />
            </h3>
          </Link>

          {/* Description */}
          <p className="text-xs text-[var(--text-muted)] line-clamp-2 leading-relaxed min-h-[2rem]">
            {skill.description}
          </p>
        </CardHeader>

        <CardContent className="p-4 pt-1 pb-3 space-y-3">
          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {skill.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-1.5 py-0.5 text-[10px] font-mono bg-[var(--surface-elevated)] text-[var(--text-subtle)] rounded-[var(--radius-sm)] border border-[var(--border-subtle)]"
              >
                #{tag}
              </span>
            ))}
            {skill.tags.length > 3 && (
              <span className="px-1 py-0.5 text-[10px] font-mono text-[var(--text-subtle)]">
                +{skill.tags.length - 3}
              </span>
            )}
          </div>
        </CardContent>

        {/* Footer with Author and Actions */}
        <CardFooter className="p-4 pt-2.5 flex items-center justify-between border-t border-[var(--border-subtle)] bg-[var(--surface)]/50">
          <div className="flex items-center gap-1.5 text-[11px] text-[var(--text-subtle)] truncate max-w-[120px]">
            <User className="w-3 h-3 shrink-0" />
            <span className="truncate">{skill.author}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleOpenPreview}
              className="h-7 px-2 text-xs"
              title="Quick preview"
            >
              <Eye className="w-3.5 h-3.5" />
            </Button>
            <SkillInstallButton
              skill={skill}
              fullSkill={fullSkill || undefined}
              size="sm"
              className="h-7 text-xs"
            />
          </div>
        </CardFooter>
      </Card>

      {/* Quick Preview Dialog */}
      <Dialog
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        title={
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[var(--accent)]" />
            <span className="text-sm font-semibold">{skill.name}</span>
            <Badge variant="outline" size="sm">
              v{skill.version}
            </Badge>
          </div>
        }
        description={skill.description}
        maxWidth="lg"
        footer={
          <div className="flex items-center justify-between w-full">
            <Link href={`/skills/${skill.id}`}>
              <Button variant="outline" size="sm" className="gap-1.5">
                <span>Open Full Page</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsPreviewOpen(false)}
              >
                Close
              </Button>
              <SkillInstallButton
                skill={skill}
                fullSkill={fullSkill || undefined}
              />
            </div>
          </div>
        }
      >
        <div className="space-y-4">
          <div className="p-3 bg-[var(--surface-muted)] border border-[var(--border)] rounded-[var(--radius-md)] flex flex-wrap gap-4 text-xs font-mono text-[var(--text-subtle)]">
            <div>
              <span className="text-[var(--text-muted)]">Author: </span>
              {skill.author}
            </div>
            <div>
              <span className="text-[var(--text-muted)]">Category: </span>
              {skill.category}
            </div>
            <div>
              <span className="text-[var(--text-muted)]">Status: </span>
              <span className="text-[var(--success)]">
                {skill.verificationStatus}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-mono font-medium uppercase text-[var(--text-subtle)] tracking-wider">
              Instruction Preview
            </h4>
            {fullSkill?.instructions ? (
              <MarkdownViewer content={fullSkill.instructions} />
            ) : (
              <div className="p-4 text-center text-xs text-[var(--text-subtle)]">
                Loading instructions...
              </div>
            )}
          </div>
        </div>
      </Dialog>
    </>
  );
}
