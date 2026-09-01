"use client";

import { Check, Eye, Plus, SearchX, Trash2 } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import type { Skill, SkillSummary } from "@/contracts";
import { useSkillspace } from "@/domain/hooks/use-skillspace";
import { staticSkillRepository } from "@/infrastructure/repositories/static-skill-repository";
import { SkillDetailDialog } from "./skill-detail-dialog";

export function SkillRowList({
  skills,
  isLoading = false,
  onResetFilters,
}: {
  skills: SkillSummary[];
  isLoading?: boolean;
  onResetFilters?: () => void;
}) {
  const { isInstalled, installSkill, removeSkill } = useSkillspace();
  const { success, info } = useToast();
  const [selectedSkill, setSelectedSkill] = useState<
    Skill | SkillSummary | null
  >(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [hoveredRemoveId, setHoveredRemoveId] = useState<string | null>(null);

  const openSkill = async (skillSummary: SkillSummary) => {
    const fullSkill = await staticSkillRepository.get(skillSummary.id);
    setSelectedSkill(fullSkill ?? skillSummary);
    setIsDetailOpen(true);
  };

  const handlePreview = (event: React.MouseEvent, skill: SkillSummary) => {
    event.stopPropagation();
    void openSkill(skill);
  };

  const handleToggleInstall = async (
    event: React.MouseEvent,
    skillSummary: SkillSummary,
  ) => {
    event.stopPropagation();
    if (isInstalled(skillSummary.id)) {
      await removeSkill(skillSummary.id);
      info(`Removed "${skillSummary.name}" from your Skillspace`);
      return;
    }

    const fullSkill = await staticSkillRepository.get(skillSummary.id);
    const skillToInstall: Skill = fullSkill ?? {
      ...skillSummary,
      instructions: `# ${skillSummary.name}\n\n${skillSummary.description}`,
      references: [],
      compatibility: ["WebMCP v1"],
      license: "MIT",
    };
    await installSkill(skillToInstall);
    success(`Added "${skillSummary.name}" to your Skillspace`);
  };

  if (isLoading) {
    return (
      <div className="overflow-hidden rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] font-mono">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="flex animate-pulse items-center justify-between border-b border-[var(--border-subtle)] p-4 last:border-0"
          >
            <div className="space-y-2">
              <div className="h-3 w-44 rounded bg-[var(--surface-elevated)]" />
              <div className="h-2.5 w-72 max-w-[60vw] rounded bg-[var(--surface-muted)]" />
            </div>
            <div className="h-7 w-20 rounded bg-[var(--surface-elevated)]" />
          </div>
        ))}
      </div>
    );
  }

  if (skills.length === 0) {
    return (
      <div className="my-4 flex flex-col items-center justify-center space-y-4 rounded-[var(--radius-md)] border border-dashed border-[var(--border-strong)] bg-[var(--surface)] p-12 text-center font-mono">
        <div className="flex size-10 items-center justify-center rounded-[var(--radius-md)] bg-[var(--surface-elevated)] text-[var(--text-subtle)]">
          <SearchX className="size-5" />
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-[var(--text)]">
            No skills found
          </h3>
          <p className="max-w-sm text-xs text-[var(--text-muted)]">
            Try another search or clear the current filters.
          </p>
        </div>
        {onResetFilters && (
          <Button
            variant="secondary"
            size="sm"
            onClick={onResetFilters}
            className="font-mono text-xs"
          >
            Clear filters
          </Button>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] font-mono text-xs">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 border-b border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-[var(--text-subtle)] sm:grid-cols-[minmax(0,1fr)_10rem_auto]">
          <div>Skill</div>
          <div className="hidden sm:block">Domain</div>
          <div className="text-right">Actions</div>
        </div>

        <div>
          {skills.map((skill) => {
            const installed = isInstalled(skill.id);
            const isHoveredRemove = hoveredRemoveId === skill.id;

            return (
              <div
                key={skill.id}
                onClick={() => void openSkill(skill)}
                className="group grid cursor-pointer grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-[var(--border-subtle)] px-4 py-4 transition-colors last:border-0 hover:bg-[var(--surface-elevated)] sm:grid-cols-[minmax(0,1fr)_10rem_auto]"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="truncate font-bold tracking-tight text-[var(--text)] transition-colors group-hover:text-[var(--accent)]">
                      {skill.name}
                    </span>
                    <span className="shrink-0 text-[10px] text-[var(--text-subtle)]">
                      v{skill.version}
                    </span>
                  </div>
                  <p className="mt-1 truncate font-sans text-[11px] text-[var(--text-muted)]">
                    {skill.description}
                  </p>
                </div>

                <div className="hidden truncate font-sans text-[11px] capitalize text-[var(--text-muted)] sm:block">
                  {skill.category.replaceAll("-", " ")}
                </div>

                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(event) => handlePreview(event, skill)}
                    className="h-7 px-2 text-[var(--text-muted)] hover:text-[var(--accent)]"
                    title={`View ${skill.name} prompt`}
                    aria-label={`View ${skill.name} prompt`}
                  >
                    <Eye className="size-3.5" />
                  </Button>

                  {installed ? (
                    <Button
                      variant={isHoveredRemove ? "danger" : "secondary"}
                      size="sm"
                      onClick={(event) =>
                        void handleToggleInstall(event, skill)
                      }
                      onMouseEnter={() => setHoveredRemoveId(skill.id)}
                      onMouseLeave={() => setHoveredRemoveId(null)}
                      className="h-7 min-w-[6.25rem] px-3 font-mono text-[11px]"
                      title={
                        isHoveredRemove
                          ? "Remove from Skillspace"
                          : "In Skillspace"
                      }
                    >
                      {isHoveredRemove ? (
                        <>
                          <Trash2 className="size-3 text-[var(--danger-foreground)]" />
                          <span className="text-[var(--danger-foreground)]">
                            Remove
                          </span>
                        </>
                      ) : (
                        <>
                          <Check className="size-3 text-[var(--success)]" />
                          <span>Saved</span>
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(event) =>
                        void handleToggleInstall(event, skill)
                      }
                      className="h-7 min-w-[6.25rem] border-[var(--border-strong)] bg-[var(--surface-elevated)] px-3 font-mono text-[11px] hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)]"
                      title="Add skill to your Skillspace"
                    >
                      <Plus className="size-3" />
                      Add
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <SkillDetailDialog
        skill={selectedSkill}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
      />
    </>
  );
}
