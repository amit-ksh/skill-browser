"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface DropdownMenuItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  danger?: boolean;
}

export function DropdownMenu({
  trigger,
  children,
  align = "right",
  className,
}: {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: "left" | "right";
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="bg-transparent border-none p-0 cursor-pointer text-inherit font-inherit inline-flex items-center"
      >
        {trigger}
      </button>
      {isOpen && (
        <div
          className={cn(
            "absolute z-40 mt-1.5 min-w-[180px] bg-[var(--surface-elevated)] border border-[var(--border-strong)]",
            "rounded-[var(--radius-md)] shadow-xl py-1 focus:outline-none animate-in fade-in duration-100",
            align === "right" ? "right-0" : "left-0",
            className,
          )}
          role="menu"
        >
          {children}
        </div>
      )}
    </div>
  );
}

export function DropdownMenuItem({
  className,
  danger,
  children,
  onClick,
  type = "button",
  ...props
}: DropdownMenuItemProps) {
  return (
    <button
      role="menuitem"
      type={type}
      onClick={onClick}
      className={cn(
        "flex items-center w-full px-3 py-1.5 text-xs text-left transition-colors duration-100 cursor-pointer",
        danger
          ? "text-[var(--danger)] hover:bg-[var(--danger-subtle)]"
          : "text-[var(--text)] hover:bg-[var(--surface-active)]",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function DropdownMenuSeparator() {
  return <hr className="my-1 border-t border-[var(--border)]" />;
}
