"use client";

import { X } from "lucide-react";
import type React from "react";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl";
}

export function Dialog({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  className,
  maxWidth = "md",
}: DialogProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthStyles = {
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    "2xl": "max-w-6xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <button
        type="button"
        className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity animate-in fade-in duration-150 cursor-default border-none w-full h-full p-0"
        onClick={onClose}
        aria-label="Close modal overlay"
        tabIndex={-1}
      />

      {/* Dialog Panel */}
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          "relative w-full bg-[var(--surface)] border border-[var(--border-strong)] rounded-[var(--radius-lg)] shadow-2xl",
          "max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-150 z-10",
          maxWidthStyles[maxWidth],
          className,
        )}
      >
        {/* Header */}
        {(title || description) && (
          <div className="flex items-start justify-between p-5 border-b border-[var(--border)]">
            <div className="space-y-1">
              {title && typeof title === "string" ? (
                <h2 className="text-base font-semibold text-[var(--text)] tracking-tight">
                  {title}
                </h2>
              ) : (
                title
              )}
              {description && (
                <p className="text-xs text-[var(--text-muted)] leading-normal">
                  {description}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1 text-[var(--text-subtle)] hover:text-[var(--text)] rounded-[var(--radius-sm)] hover:bg-[var(--surface-muted)] transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Body */}
        <div className="p-5 overflow-y-auto flex-1 text-sm text-[var(--text-muted)]">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-2.5 p-4 border-t border-[var(--border)] bg-[var(--surface-muted)]">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
