"use client";

import { Search, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";

export function SkillSearchBar({
  value,
  onChange,
  onClear,
  placeholder = "Search skills by name, tag, or author...",
}: {
  value: string;
  onChange: (val: string) => void;
  onClear: () => void;
  placeholder?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Global shortcut '/' to focus search input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative w-full">
      <Input
        ref={inputRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        icon={<Search className="w-4 h-4" />}
        endAdornment={
          value.length > 0 ? (
            <button
              type="button"
              onClick={onClear}
              className="p-1 text-[var(--text-subtle)] hover:text-[var(--text)] transition-colors cursor-pointer"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-[var(--text-subtle)] bg-[var(--surface-elevated)] border border-[var(--border)] rounded-xs select-none">
              /
            </kbd>
          )
        }
        className="h-10 text-sm bg-[var(--surface)] border-[var(--border)] focus:border-[var(--accent)]"
      />
    </div>
  );
}
