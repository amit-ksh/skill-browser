import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  endAdornment?: React.ReactNode;
  error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, endAdornment, error, disabled, ...props }, ref) => {
    return (
      <div className="relative flex items-center w-full">
        {icon && (
          <div className="absolute left-3 flex items-center pointer-events-none text-[var(--text-subtle)]">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          disabled={disabled}
          className={cn(
            "w-full h-9 px-3 text-sm bg-[var(--surface)] text-[var(--text)] placeholder:text-[var(--text-subtle)]",
            "border border-[var(--border)] rounded-[var(--radius-md)] transition-colors duration-150",
            "focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            icon && "pl-9",
            endAdornment && "pr-10",
            error &&
              "border-[var(--danger)] focus:border-[var(--danger)] focus:ring-[var(--danger)]",
            className,
          )}
          {...props}
        />
        {endAdornment && (
          <div className="absolute right-3 flex items-center text-[var(--text-subtle)]">
            {endAdornment}
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
