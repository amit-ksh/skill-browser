import type { Metadata } from "next";
import { Suspense } from "react";
import type { CategoryOption } from "@/components/skills/skill-filter-tabs";
import { staticSkillRepository } from "@/infrastructure/repositories/static-skill-repository";
import { SkillsClient } from "./skills-client";

export const metadata: Metadata = {
  title: "Explore Skills — Skill Browser",
  description:
    "Browse, filter, and search 24+ AI skills exposed via WebMCP to browser-based agents.",
};

export default async function SkillsPage() {
  const result = await staticSkillRepository.search({
    query: "",
    category: "all",
    limit: 100,
    offset: 0,
    sortBy: "relevance",
  });

  const categories = await staticSkillRepository.listCategories();
  const allCount = result.total;

  const categoryOptions: CategoryOption[] = [
    { id: "all", name: "All Skills", count: allCount },
    ...categories.map((c) => ({ id: c.id, name: c.name, count: c.skillCount })),
  ];

  return (
    <Suspense
      fallback={
        <div className="space-y-4">
          <div className="h-8 w-48 bg-[var(--surface-elevated)] rounded-md animate-pulse" />
          <div className="h-10 w-full bg-[var(--surface)] rounded-md animate-pulse" />
        </div>
      }
    >
      <SkillsClient
        initialSkills={result.items}
        categoryOptions={categoryOptions}
      />
    </Suspense>
  );
}
