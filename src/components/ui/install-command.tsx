"use client";

import { CopyButton } from "@/components/ui/copy-button";
import { cn } from "@/lib/utils";

export function InstallCommand({
  command,
  label,
  className,
  size = "md",
}: {
  command: string;
  label?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClasses = {
    sm: "py-1.5 px-3 text-xs",
    md: "py-2 px-3.5 text-xs",
    lg: "py-2.5 px-4 text-sm",
  };

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 bg-[var(--surface-elevated)] border border-[var(--border-strong)] rounded-[var(--radius-sm)] font-mono transition-colors group hover:border-[var(--text-subtle)]",
        sizeClasses[size],
        className,
      )}
    >
      <div className="flex items-center gap-2 overflow-x-auto select-all scrollbar-none">
        <span className="text-[var(--text-subtle)] select-none font-semibold">
          $
        </span>
        <span className="text-[var(--text)] whitespace-nowrap">{command}</span>
      </div>

      <div className="shrink-0 flex items-center gap-1.5">
        <CopyButton
          text={command}
          label={label}
          size={size === "lg" ? "sm" : "xs"}
          variant="secondary"
        />
      </div>
    </div>
  );
}
