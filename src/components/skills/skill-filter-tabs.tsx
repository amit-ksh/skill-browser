"use client";

import { ArrowDownAZ, ArrowUpAZ, Clock, Sparkles } from "lucide-react";
import type React from "react";
import type { CategoryId, SortOption } from "@/contracts";
import { cn } from "@/lib/utils";

export interface CategoryOption {
  id: CategoryId | "all";
  name: string;
  count?: number;
}

export function SkillFilterTabs({
  categories,
  selectedCategory,
  onSelectCategory,
  sortBy,
  onSelectSort,
}: {
  categories: CategoryOption[];
  selectedCategory: CategoryId | "all";
  onSelectCategory: (cat: CategoryId | "all") => void;
  sortBy: SortOption;
  onSelectSort: (sort: SortOption) => void;
}) {
  const sortOptions: {
    id: SortOption;
    label: string;
    icon: React.ReactNode;
  }[] = [
    {
      id: "relevance",
      label: "Relevance",
      icon: <Sparkles className="w-3 h-3" />,
    },
    { id: "newest", label: "Newest", icon: <Clock className="w-3 h-3" /> },
    { id: "name-asc", label: "A-Z", icon: <ArrowDownAZ className="w-3 h-3" /> },
    { id: "name-desc", label: "Z-A", icon: <ArrowUpAZ className="w-3 h-3" /> },
  ];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[var(--border-subtle)]">
      {/* Category Pills (Horizontal scrolling on mobile) */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-[var(--radius-full)] whitespace-nowrap transition-all select-none cursor-pointer flex items-center gap-1.5",
                isActive
                  ? "bg-[var(--accent)] text-[var(--accent-foreground)] shadow-xs"
                  : "bg-[var(--surface-elevated)] text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-active)] border border-[var(--border)]",
              )}
            >
              <span>{cat.name}</span>
              {cat.count !== undefined && (
                <span
                  className={cn(
                    "text-[10px] font-mono px-1.5 py-0.2 rounded-full",
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-[var(--surface-muted)] text-[var(--text-subtle)]",
                  )}
                >
                  {cat.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Sort Select */}
      <div className="flex items-center gap-1 shrink-0 self-end sm:self-auto">
        <span className="text-[11px] font-mono text-[var(--text-subtle)] mr-1">
          Sort:
        </span>
        <div className="flex items-center gap-1 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-md)] p-0.5">
          {sortOptions.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => onSelectSort(opt.id)}
              className={cn(
                "flex items-center gap-1 px-2 py-1 text-[11px] font-mono rounded-[var(--radius-sm)] transition-colors cursor-pointer",
                sortBy === opt.id
                  ? "bg-[var(--surface-elevated)] text-[var(--text)] font-semibold border border-[var(--border-strong)]"
                  : "text-[var(--text-subtle)] hover:text-[var(--text)]",
              )}
            >
              {opt.icon}
              <span className="hidden md:inline">{opt.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
