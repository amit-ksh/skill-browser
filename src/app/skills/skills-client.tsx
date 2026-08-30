"use client";

import { PlusCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { ImportSkillDialog } from "@/components/skills/import-skill-dialog";
import { SkillFilterTabs } from "@/components/skills/skill-filter-tabs";
import { SkillGrid } from "@/components/skills/skill-grid";
import { SkillSearchBar } from "@/components/skills/skill-search-bar";
import { Button } from "@/components/ui/button";
import type {
  CategoryId,
  CategoryOption,
  SkillSummary,
  SortOption,
} from "@/contracts";
import { staticSkillRepository } from "@/infrastructure/repositories/static-skill-repository";

export function SkillsClient({
  initialSkills,
  categoryOptions,
}: {
  initialSkills: SkillSummary[];
  categoryOptions: CategoryOption[];
}) {
  const searchParams = useSearchParams();
  const initialCategoryParam =
    (searchParams.get("category") as CategoryId) || "all";
  const initialQueryParam = searchParams.get("q") || "";
  const initialImportParam = searchParams.get("import") === "true";

  const [query, setQuery] = useState(initialQueryParam);
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | "all">(
    initialCategoryParam,
  );
  const [sortBy, setSortBy] = useState<SortOption>("relevance");
  const [skills, setSkills] = useState<SkillSummary[]>(initialSkills);
  const [isImportOpen, setIsImportOpen] = useState(initialImportParam);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const result = await staticSkillRepository.search({
        query,
        category: selectedCategory,
        sortBy,
        limit: 100,
        offset: 0,
      });
      setSkills(result.items);
    });
  }, [query, selectedCategory, sortBy]);

  const handleResetFilters = () => {
    setQuery("");
    setSelectedCategory("all");
    setSortBy("relevance");
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-[var(--text)]">
            Skill Registry
          </h1>
          <p className="text-xs text-[var(--text-muted)]">
            Discover verified AI skills and install them into your personal
            Skillspace for browser-based AI agents.
          </p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={() => setIsImportOpen(true)}
          className="gap-1.5 text-xs self-start sm:self-auto"
        >
          <PlusCircle className="w-3.5 h-3.5 text-[var(--accent)]" />
          <span>Import Custom Skill</span>
        </Button>
      </div>

      {/* Search Bar */}
      <SkillSearchBar
        value={query}
        onChange={setQuery}
        onClear={() => setQuery("")}
      />

      {/* Filter Tabs & Sort Controls */}
      <SkillFilterTabs
        categories={categoryOptions}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        sortBy={sortBy}
        onSelectSort={setSortBy}
      />

      {/* Result Count and Status */}
      <div className="flex items-center justify-between text-xs text-[var(--text-subtle)] font-mono">
        <span>
          Showing {skills.length} skill{skills.length === 1 ? "" : "s"}
        </span>
        {selectedCategory !== "all" && (
          <span className="text-[var(--accent)] font-medium uppercase">
            Filtered by: {selectedCategory.replace("-", " ")}
          </span>
        )}
      </div>

      {/* Skills Grid */}
      <SkillGrid
        skills={skills}
        isLoading={isPending}
        onResetFilters={handleResetFilters}
      />

      {/* Import Modal */}
      <ImportSkillDialog
        isOpen={isImportOpen}
        onClose={() => setIsImportOpen(false)}
      />
    </div>
  );
}
