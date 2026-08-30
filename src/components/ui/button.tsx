import { Loader2 } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "link";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      type = "button",
      children,
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-150 select-none disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.98]";

    const variantStyles = {
      primary:
        "bg-[var(--accent)] text-[var(--accent-foreground)] hover:bg-[var(--accent-hover)] shadow-sm shadow-[var(--accent-subtle)]",
      secondary:
        "bg-[var(--surface-elevated)] text-[var(--text)] hover:bg-[var(--surface-active)] border border-[var(--border)]",
      outline:
        "bg-transparent text-[var(--text)] border border-[var(--border-strong)] hover:bg-[var(--surface-muted)] hover:border-[var(--border-strong)]",
      ghost:
        "bg-transparent text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-muted)]",
      danger:
        "bg-[var(--danger)] text-[var(--danger-foreground)] hover:opacity-90 shadow-sm",
      link: "bg-transparent text-[var(--accent)] underline-offset-4 hover:underline p-0 h-auto",
    };

    const sizeStyles = {
      sm: "h-8 px-3 text-xs rounded-[var(--radius-sm)] gap-1.5",
      md: "h-9 px-4 text-sm rounded-[var(--radius-md)] gap-2",
      lg: "h-11 px-6 text-base rounded-[var(--radius-lg)] gap-2.5",
      icon: "h-9 w-9 p-0 rounded-[var(--radius-md)]",
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin text-current" />}
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
