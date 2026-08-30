"use client";

import type React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Tooltip({
  content,
  children,
  side = "top",
  className,
}: {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  className?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);

  const sideStyles = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-1.5",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-1.5",
    left: "right-full top-1/2 -translate-y-1/2 mr-1.5",
    right: "left-full top-1/2 -translate-y-1/2 ml-1.5",
  };

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <span
          role="tooltip"
          className={cn(
            "absolute z-50 px-2 py-1 text-[11px] font-mono text-[var(--text)] bg-[var(--surface-elevated)]",
            "border border-[var(--border-strong)] rounded-[var(--radius-sm)] shadow-lg pointer-events-none whitespace-nowrap animate-in fade-in duration-100",
            sideStyles[side],
            className,
          )}
        >
          {content}
        </span>
      )}
    </span>
  );
}
