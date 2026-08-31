"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

export function CopyButton({
  text,
  label,
  className,
  size = "sm",
  variant = "ghost",
}: {
  text: string;
  label?: string;
  className?: string;
  size?: "xs" | "sm" | "md";
  variant?: "ghost" | "secondary" | "outline";
}) {
  const [copied, setCopied] = useState(false);
  const { success, error } = useToast();

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      success("Copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      error("Failed to copy text");
    }
  };

  const sizeClasses = {
    xs: "h-6 px-1.5 text-[11px] gap-1 rounded-[var(--radius-xs)]",
    sm: "h-7 px-2 text-xs gap-1.5 rounded-[var(--radius-sm)]",
    md: "h-8 px-3 text-xs gap-2 rounded-[var(--radius-sm)]",
  };

  const variantClasses = {
    ghost:
      "bg-transparent text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-hover)] border-none",
    secondary:
      "bg-[var(--surface-elevated)] text-[var(--text)] hover:bg-[var(--surface-active)] border border-[var(--border)]",
    outline:
      "bg-transparent text-[var(--text-muted)] hover:text-[var(--text)] border border-[var(--border-strong)] hover:border-[var(--text-muted)]",
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      title={label || "Copy to clipboard"}
      className={cn(
        "inline-flex items-center justify-center font-mono font-medium transition-all duration-150 cursor-pointer select-none focus:outline-none focus:ring-1 focus:ring-[var(--accent)] active:scale-95",
        sizeClasses[size],
        variantClasses[variant],
        className,
      )}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-[var(--success)] animate-in zoom-in-50 duration-150" />
          {label && (
            <span className="text-[var(--success)] font-medium">Copied!</span>
          )}
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
          {label && <span>{label}</span>}
        </>
      )}
    </button>
  );
}
