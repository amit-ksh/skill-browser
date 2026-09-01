"use client";

import { Bookmark, Layers, Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { ForgeHero } from "@/components/hero/forge-hero";
import { SkillRowList } from "@/components/skills/skill-row-list";
import type { Skill, SkillSummary } from "@/contracts";
import { useSkillspace } from "@/domain/hooks/use-skillspace";

const SKILLSPACE_CATEGORIES = [
  { id: "all", label: "ALL" },
  {
    id: "development",
    label: "DEVELOPMENT",
    matchKeys: ["software-development", "development", "coding"],
  },
  { id: "design", label: "DESIGN", matchKeys: ["design", "ui-ux", "frontend"] },
  {
    id: "research",
    label: "RESEARCH",
    matchKeys: ["research", "evals", "benchmarks"],
  },
  {
    id: "automation",
    label: "AUTOMATION",
    matchKeys: ["automation", "browser", "agent-tools"],
  },
  {
    id: "data",
    label: "DATA",
    matchKeys: ["data", "marketing", "analytics", "seo"],
  },
  {
    id: "productivity",
    label: "PRODUCTIVITY",
    matchKeys: ["productivity", "workflow", "context"],
  },
  { id: "writing", label: "WRITING", matchKeys: ["writing", "docs", "specs"] },
];

export function HomeClient({ initialSkills }: { initialSkills: Skill[] }) {
  const { isInstalled } = useSkillspace();
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filterMode, setFilterMode] = useState<"all" | "installed">("all");
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredSkills: SkillSummary[] = useMemo(() => {
    let result = [...initialSkills];

    if (filterMode === "installed") {
      result = result.filter((skill) => isInstalled(skill.id));
    }

    if (selectedCategory !== "all") {
      const category = SKILLSPACE_CATEGORIES.find(
        (item) => item.id === selectedCategory,
      );
      const matchKeys = category?.matchKeys ?? [selectedCategory];
      result = result.filter(
        (skill) =>
          matchKeys.some((key) => skill.category.includes(key)) ||
          skill.tags.some((tag) => matchKeys.some((key) => tag.includes(key))),
      );
    }

    const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    if (terms.length > 0) {
      result = result.filter((skill) => {
        const searchable = [
          skill.name,
          skill.description,
          skill.author,
          skill.repo ?? "",
          ...skill.tags,
        ]
          .join(" ")
          .toLowerCase();
        return terms.every((term) => searchable.includes(term));
      });
    }

    return result.sort((a, b) => a.name.localeCompare(b.name));
  }, [filterMode, initialSkills, isInstalled, query, selectedCategory]);

  const resetFilters = () => {
    setQuery("");
    setFilterMode("all");
    setSelectedCategory("all");
  };

  return (
    <div className="space-y-10 pb-16">
      <ForgeHero />
      <section className="space-y-5" aria-labelledby="skill-library-heading">
        <h2
          id="skill-library-heading"
          className="font-mono text-sm font-bold tracking-wider text-[var(--text)]"
        >
          Skill library
        </h2>

        <div className="relative font-mono">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[var(--text-subtle)]" />
          <input
            ref={searchInputRef}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search skills by name, prompt, or tag"
            aria-label="Search skills"
            className="w-full rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] py-3 pl-10 pr-11 text-xs text-[var(--text)] outline-none transition-colors placeholder:text-[var(--text-subtle)] focus:border-[var(--accent)]"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-[var(--radius-sm)] p-1 text-[var(--text-subtle)] transition-colors hover:bg-[var(--surface-elevated)] hover:text-[var(--text)]"
              aria-label="Clear search"
            >
              <X className="size-4" />
            </button>
          ) : (
            <kbd className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 rounded-[var(--radius-xs)] border border-[var(--border-strong)] bg-[var(--surface-elevated)] px-1.5 py-0.5 text-[10px] text-[var(--text-subtle)]">
              /
            </kbd>
          )}
        </div>

        <div className="space-y-3 border-b border-[var(--border)] pb-4 font-mono text-xs">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setFilterMode("all")}
              className={`flex items-center gap-1.5 py-1 font-semibold transition-colors ${
                filterMode === "all"
                  ? "text-[var(--accent)]"
                  : "text-[var(--text-subtle)] hover:text-[var(--text)]"
              }`}
            >
              <Layers className="size-3.5" />
              All skills
            </button>
            <button
              type="button"
              onClick={() => setFilterMode("installed")}
              className={`flex items-center gap-1.5 py-1 font-semibold transition-colors ${
                filterMode === "installed"
                  ? "text-[var(--accent)]"
                  : "text-[var(--text-subtle)] hover:text-[var(--text)]"
              }`}
            >
              <Bookmark className="size-3.5" />
              My Skillspace
            </button>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {SKILLSPACE_CATEGORIES.map((category) => {
              const isActive = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`whitespace-nowrap rounded-[var(--radius-xs)] border px-2.5 py-1 text-[10px] tracking-wider transition-colors ${
                    isActive
                      ? "border-[var(--accent)] bg-[var(--accent)] font-bold text-[var(--accent-foreground)]"
                      : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:border-[var(--border-strong)] hover:text-[var(--text)]"
                  }`}
                >
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>

        <SkillRowList skills={filteredSkills} onResetFilters={resetFilters} />
      </section>
    </div>
  );
}
