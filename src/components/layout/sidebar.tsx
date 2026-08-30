"use client";

import {
  Bookmark,
  Bot,
  CheckSquare,
  Code2,
  Compass,
  Palette,
  PenTool,
  Search,
  TrendingUp,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const CATEGORIES = [
  {
    id: "software-development",
    name: "Software Development",
    icon: Code2,
    count: 6,
  },
  { id: "design", name: "Design", icon: Palette, count: 4 },
  { id: "marketing", name: "Marketing", icon: TrendingUp, count: 3 },
  { id: "research", name: "Research", icon: Search, count: 4 },
  { id: "productivity", name: "Productivity", icon: CheckSquare, count: 4 },
  { id: "writing", name: "Writing", icon: PenTool, count: 3 },
];

export function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex flex-col h-[calc(100vh-3.5rem)] bg-[var(--surface)] border-r border-[var(--border)] p-4 space-y-6 overflow-y-auto">
      {/* Primary Discovery Navigation */}
      <div className="space-y-1">
        <div className="px-2 pb-1 text-[11px] font-mono font-medium text-[var(--text-subtle)] uppercase tracking-wider">
          Registry
        </div>
        <Link
          href="/skills"
          onClick={onClose}
          className={cn(
            "flex items-center justify-between px-2.5 py-1.5 text-xs font-medium rounded-[var(--radius-md)] transition-colors",
            pathname === "/skills"
              ? "bg-[var(--surface-elevated)] text-[var(--text)] border border-[var(--border)]"
              : "text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-muted)]",
          )}
        >
          <div className="flex items-center gap-2.5">
            <Compass className="w-4 h-4 text-[var(--accent)]" />
            <span>All Skills</span>
          </div>
          <Badge size="sm" variant="neutral">
            24
          </Badge>
        </Link>
        <Link
          href="/me/skills"
          onClick={onClose}
          className={cn(
            "flex items-center justify-between px-2.5 py-1.5 text-xs font-medium rounded-[var(--radius-md)] transition-colors",
            pathname.startsWith("/me")
              ? "bg-[var(--surface-elevated)] text-[var(--text)] border border-[var(--border)]"
              : "text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-muted)]",
          )}
        >
          <div className="flex items-center gap-2.5">
            <Bookmark className="w-4 h-4 text-[var(--accent)]" />
            <span>My Skillspace</span>
          </div>
          <Badge size="sm" variant="accent">
            Local
          </Badge>
        </Link>
        <Link
          href="/simulator"
          onClick={onClose}
          className={cn(
            "flex items-center justify-between px-2.5 py-1.5 text-xs font-medium rounded-[var(--radius-md)] transition-colors",
            pathname === "/simulator"
              ? "bg-[var(--surface-elevated)] text-[var(--text)] border border-[var(--border)]"
              : "text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-muted)]",
          )}
        >
          <div className="flex items-center gap-2.5">
            <Zap className="w-4 h-4 text-[var(--accent)]" />
            <span>Agent Simulator</span>
          </div>
          <Badge size="sm" variant="warning" className="text-[9px]">
            Playground
          </Badge>
        </Link>
      </div>

      {/* Category Filters */}
      <div className="space-y-1">
        <div className="px-2 pb-1 text-[11px] font-mono font-medium text-[var(--text-subtle)] uppercase tracking-wider">
          Categories
        </div>
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const href = `/skills?category=${cat.id}`;
          return (
            <Link
              key={cat.id}
              href={href}
              onClick={onClose}
              className={cn(
                "flex items-center justify-between px-2.5 py-1.5 text-xs font-medium rounded-[var(--radius-md)] transition-colors",
                "text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-muted)]",
              )}
            >
              <div className="flex items-center gap-2.5">
                <Icon className="w-3.5 h-3.5 text-[var(--text-subtle)]" />
                <span>{cat.name}</span>
              </div>
              <span className="text-[11px] font-mono text-[var(--text-subtle)]">
                {cat.count}
              </span>
            </Link>
          );
        })}
      </div>

      {/* WebMCP Agent Info Box */}
      <div className="mt-auto p-3 bg-[var(--surface-muted)] border border-[var(--border)] rounded-[var(--radius-md)] space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-[var(--text)]">
          <Bot className="w-3.5 h-3.5 text-[var(--accent)]" />
          WebMCP Agent Bridge
        </div>
        <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
          Exposes your Skillspace to browser agents without API keys or servers.
        </p>
        <div className="pt-1 flex items-center justify-between text-[10px] font-mono text-[var(--text-subtle)]">
          <span>navigator.modelContext</span>
          <span className="text-[var(--success)]">v1 Active</span>
        </div>
      </div>
    </aside>
  );
}
