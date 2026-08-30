import type React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | "default"
    | "neutral"
    | "accent"
    | "success"
    | "warning"
    | "danger"
    | "outline";
  size?: "sm" | "md";
}

export function Badge({
  className,
  variant = "default",
  size = "md",
  children,
  ...props
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center font-mono font-medium select-none tracking-tight";

  const variantStyles = {
    default:
      "bg-[var(--surface-elevated)] text-[var(--text-muted)] border border-[var(--border)]",
    neutral:
      "bg-[var(--surface-muted)] text-[var(--text-subtle)] border border-[var(--border-subtle)]",
    accent:
      "bg-[var(--accent-subtle)] text-[var(--accent)] border border-[var(--accent-border)]",
    success:
      "bg-[var(--success-subtle)] text-[var(--success)] border border-[var(--success-border)]",
    warning:
      "bg-[var(--warning-subtle)] text-[var(--warning)] border border-[var(--warning-border)]",
    danger:
      "bg-[var(--danger-subtle)] text-[var(--danger)] border border-[var(--danger-border)]",
    outline:
      "bg-transparent text-[var(--text-muted)] border border-[var(--border-strong)]",
  };

  const sizeStyles = {
    sm: "px-1.5 py-0.5 text-[10px] rounded-[var(--radius-sm)]",
    md: "px-2.5 py-1 text-xs rounded-[var(--radius-sm)]",
  };

  return (
    <span
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
