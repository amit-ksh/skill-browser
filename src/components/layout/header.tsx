"use client";

import { Bookmark, Compass, Menu, PlusCircle, Terminal, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { WebMcpStatusPill } from "./webmcp-status-pill";

export function Header({
  onToggleMobileMenu,
  isMobileMenuOpen,
}: {
  onToggleMobileMenu: () => void;
  isMobileMenuOpen: boolean;
}) {
  const pathname = usePathname();

  const navLinks = [
    { href: "/skills", label: "Explore", icon: Compass },
    { href: "/me/skills", label: "My Skillspace", icon: Bookmark },
  ];

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-14 px-4 md:px-6 bg-[var(--surface)]/90 backdrop-blur-md border-b border-[var(--border)]">
      {/* Brand & Mobile Toggle */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleMobileMenu}
          className="md:hidden p-1.5 text-[var(--text-muted)] hover:text-[var(--text)] rounded-[var(--radius-sm)] hover:bg-[var(--surface-muted)] cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>

        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex items-center justify-center w-7 h-7 rounded-[var(--radius-sm)] bg-[var(--surface-elevated)] border border-[var(--border-strong)] text-[var(--accent)] group-hover:border-[var(--accent)] transition-colors">
            <Terminal className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-[var(--text)] flex items-center gap-1.5">
              Skill Browser
              <span className="px-1.5 py-0.2 text-[9px] font-mono font-medium rounded-sm bg-[var(--accent-subtle)] text-[var(--accent)] border border-[var(--accent-border)]">
                WebMCP
              </span>
            </span>
          </div>
        </Link>
      </div>

      {/* Center Nav Links (Desktop) */}
      <nav className="hidden md:flex items-center gap-1">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-[var(--radius-md)] transition-colors",
                isActive
                  ? "bg-[var(--surface-elevated)] text-[var(--text)] border border-[var(--border)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-muted)]",
              )}
            >
              <Icon className="w-3.5 h-3.5 text-[var(--text-subtle)]" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Right Controls */}
      <div className="flex items-center gap-2.5">
        <WebMcpStatusPill />
        <Link href="/skills?import=true" className="hidden sm:inline-flex">
          <Button variant="secondary" size="sm" className="gap-1.5 text-xs">
            <PlusCircle className="w-3.5 h-3.5 text-[var(--accent)]" />
            Import Skill
          </Button>
        </Link>
      </div>
    </header>
  );
}
