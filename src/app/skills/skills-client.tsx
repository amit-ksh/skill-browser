"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { SkillFilterTabs } from "@/components/skills/skill-filter-tabs";
import { SkillGrid } from "@/components/skills/skill-grid";
import { SkillSearchBar } from "@/components/skills/skill-search-bar";
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

  const [query, setQuery] = useState(initialQueryParam);
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | "all">(
    initialCategoryParam,
  );
  const [sortBy, setSortBy] = useState<SortOption>("relevance");
  const [skills, setSkills] = useState<SkillSummary[]>(initialSkills);
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
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-[var(--text)]">
          Skill Registry
        </h1>
        <p className="text-xs text-[var(--text-muted)]">
          Discover verified AI skills and install them into your personal
          Skillspace for browser-based AI agents.
        </p>
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
    </div>
  );
}
