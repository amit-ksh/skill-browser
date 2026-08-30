"use client";

import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { SkillSummary } from "@/contracts";
import { SkillCard } from "./skill-card";

export function SkillGrid({
  skills,
  isLoading = false,
  onResetFilters,
}: {
  skills: SkillSummary[];
  isLoading?: boolean;
  onResetFilters?: () => void;
}) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {["alpha", "beta", "gamma", "delta", "epsilon", "zeta"].map(
          (keyName) => (
            <div
              key={`skeleton-${keyName}`}
              className="p-4 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] space-y-3"
            >
              <div className="flex justify-between items-center">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-12" />
              </div>
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-10 w-full" />
              <div className="flex gap-2 pt-2">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-12" />
              </div>
            </div>
          ),
        )}
      </div>
    );
  }

  if (skills.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed border-[var(--border-strong)] rounded-[var(--radius-lg)] bg-[var(--surface)]/30 space-y-4 my-6">
        <div className="w-12 h-12 rounded-full bg-[var(--surface-elevated)] flex items-center justify-center text-[var(--text-subtle)]">
          <SearchX className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-[var(--text)]">
            No skills found
          </h3>
          <p className="text-xs text-[var(--text-muted)] max-w-sm">
            We couldn't find any skills matching your search criteria. Try a
            different keyword or reset filters.
          </p>
        </div>
        {onResetFilters && (
          <Button variant="secondary" size="sm" onClick={onResetFilters}>
            Clear All Filters
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {skills.map((skill) => (
        <SkillCard key={skill.id} skill={skill} />
      ))}
    </div>
  );
}
