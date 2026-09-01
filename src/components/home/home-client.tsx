"use client";

import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  ExternalLink,
  Layers,
  Search,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { ForgeHero } from "@/components/hero/forge-hero";
import { SkillRowList } from "@/components/skills/skill-row-list";
import { Button } from "@/components/ui/button";
import {
  type Skill,
  SkillCatalogResponseSchema,
  type SkillSummary,
} from "@/contracts";
import { useSkillspace } from "@/domain/hooks/use-skillspace";

const CATALOG_PAGE_SIZE = 30;

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

type CatalogStatus = "loading" | "live" | "fallback";

export function HomeClient({ initialSkills }: { initialSkills: Skill[] }) {
  const { installedSkills } = useSkillspace();
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filterMode, setFilterMode] = useState<"all" | "installed">("all");
  const [catalogSkills, setCatalogSkills] =
    useState<SkillSummary[]>(initialSkills);
  const [catalogStatus, setCatalogStatus] = useState<CatalogStatus>("loading");
  const [catalogMessage, setCatalogMessage] = useState("");
  const [catalogPage, setCatalogPage] = useState(0);
  const [catalogTotal, setCatalogTotal] = useState(initialSkills.length);
  const [catalogHasMore, setCatalogHasMore] = useState(false);
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

  useEffect(() => {
    if (filterMode === "installed") return;

    const controller = new AbortController();
    const cleanQuery = query.trim();
    const delay = cleanQuery.length >= 2 ? 250 : 0;

    setCatalogStatus("loading");
    const timeoutId = window.setTimeout(async () => {
      try {
        const params = new URLSearchParams({
          page: String(catalogPage),
          perPage: String(CATALOG_PAGE_SIZE),
        });
        if (cleanQuery.length >= 2) params.set("q", cleanQuery);

        const response = await fetch(`/api/skills-sh?${params.toString()}`, {
          signal: controller.signal,
        });
        if (!response.ok) {
          const body = (await response.json().catch(() => null)) as {
            message?: string;
          } | null;
          throw new Error(body?.message || "The live catalog is unavailable.");
        }

        const parsed = SkillCatalogResponseSchema.safeParse(
          await response.json(),
        );
        if (!parsed.success) {
          throw new Error("The live catalog returned an invalid response.");
        }

        setCatalogSkills(parsed.data.items);
        setCatalogTotal(parsed.data.total);
        setCatalogHasMore(parsed.data.hasMore);
        setCatalogMessage("");
        setCatalogStatus("live");
      } catch (error) {
        if (controller.signal.aborted) return;
        setCatalogSkills(initialSkills);
        setCatalogTotal(initialSkills.length);
        setCatalogHasMore(false);
        setCatalogMessage(
          error instanceof Error
            ? error.message
            : "The live catalog is unavailable.",
        );
        setCatalogStatus("fallback");
      }
    }, delay);

    return () => {
      controller.abort();
      window.clearTimeout(timeoutId);
    };
  }, [catalogPage, filterMode, initialSkills, query]);

  const filteredSkills: SkillSummary[] = useMemo(() => {
    let result: SkillSummary[] =
      filterMode === "installed" ? installedSkills : catalogSkills;

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
    const shouldFilterLocally =
      filterMode === "installed" ||
      catalogStatus !== "live" ||
      query.trim().length < 2;
    if (terms.length > 0 && shouldFilterLocally) {
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

    if (filterMode === "installed" || catalogStatus !== "live") {
      return [...result].sort((a, b) => a.name.localeCompare(b.name));
    }
    return result;
  }, [
    catalogSkills,
    catalogStatus,
    filterMode,
    installedSkills,
    query,
    selectedCategory,
  ]);

  const resetFilters = () => {
    setQuery("");
    setFilterMode("all");
    setSelectedCategory("all");
    setCatalogPage(0);
  };

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setCatalogPage(0);
  };

  const totalPages = Math.max(1, Math.ceil(catalogTotal / CATALOG_PAGE_SIZE));
  const showPagination =
    filterMode === "all" &&
    catalogStatus === "live" &&
    query.trim().length < 2 &&
    totalPages > 1;

  return (
    <div className="space-y-10 pb-16">
      <ForgeHero />
      <section className="space-y-5" aria-labelledby="skill-library-heading">
        <div className="space-y-1.5">
          <h2
            id="skill-library-heading"
            className="text-xl font-semibold tracking-tight text-[var(--text)]"
          >
            All agent skills
          </h2>
          <p className="max-w-2xl text-sm leading-6 text-[var(--text-muted)]">
            Browse the skills.sh catalog and add the skills you trust to your
            personal Skillspace.
          </p>
        </div>

        <div className="relative font-mono">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[var(--text-subtle)]" />
          <input
            ref={searchInputRef}
            type="search"
            value={query}
            onChange={(event) => handleQueryChange(event.target.value)}
            placeholder="Search by skill, source, or use case"
            aria-label="Search skills"
            className="w-full rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] py-3 pl-10 pr-11 text-xs text-[var(--text)] outline-none transition-colors placeholder:text-[var(--text-subtle)] focus:border-[var(--accent)]"
          />
          {query ? (
            <button
              type="button"
              onClick={() => handleQueryChange("")}
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

        {filterMode === "all" && (
          <div
            className="flex flex-col gap-2 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 font-mono text-[11px] text-[var(--text-muted)] sm:flex-row sm:items-center sm:justify-between"
            aria-live="polite"
          >
            {catalogStatus === "live" ? (
              <>
                <span>
                  Live catalog from{" "}
                  <a
                    href="https://skills.sh"
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-[var(--accent)] hover:underline"
                  >
                    skills.sh
                  </a>
                </span>
                <span>{catalogTotal.toLocaleString()} skills</span>
              </>
            ) : catalogStatus === "loading" ? (
              <span>Loading the skills.sh catalog...</span>
            ) : (
              <>
                <span>Showing the local fallback. {catalogMessage}</span>
                <a
                  href="https://skills.sh"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-[var(--accent)] hover:underline"
                >
                  Browse skills.sh
                  <ExternalLink className="size-3" />
                </a>
              </>
            )}
          </div>
        )}

        <SkillRowList
          skills={filteredSkills}
          isLoading={filterMode === "all" && catalogStatus === "loading"}
          onResetFilters={resetFilters}
        />

        {showPagination && (
          <nav
            className="flex items-center justify-between border-t border-[var(--border)] pt-4 font-mono text-xs"
            aria-label="Skills catalog pages"
          >
            <Button
              variant="secondary"
              size="sm"
              disabled={catalogPage === 0}
              onClick={() => setCatalogPage((page) => Math.max(0, page - 1))}
              className="font-mono text-xs"
            >
              <ArrowLeft className="size-3.5" />
              Previous
            </Button>
            <span className="text-[var(--text-muted)]">
              Page {catalogPage + 1} of {totalPages}
            </span>
            <Button
              variant="secondary"
              size="sm"
              disabled={!catalogHasMore}
              onClick={() => setCatalogPage((page) => page + 1)}
              className="font-mono text-xs"
            >
              Next
              <ArrowRight className="size-3.5" />
            </Button>
          </nav>
        )}
      </section>
    </div>
  );
}
