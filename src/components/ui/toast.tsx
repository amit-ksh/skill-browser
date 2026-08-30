"use client";

import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";
import type React from "react";
import { createContext, useCallback, useContext, useState } from "react";
import { cn } from "@/lib/utils";

export type ToastType = "success" | "error" | "info" | "warning";

export interface Toast {
  id: string;
  message: string;
  type?: ToastType;
  duration?: number;
}

interface ToastContextType {
  toast: (message: string, type?: ToastType, duration?: number) => void;
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
  warning: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (message: string, type: ToastType = "info", duration = 3500) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newToast: Toast = { id, message, type, duration };

      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    [removeToast],
  );

  const success = useCallback(
    (msg: string) => addToast(msg, "success"),
    [addToast],
  );
  const error = useCallback(
    (msg: string) => addToast(msg, "error"),
    [addToast],
  );
  const info = useCallback((msg: string) => addToast(msg, "info"), [addToast]);
  const warning = useCallback(
    (msg: string) => addToast(msg, "warning"),
    [addToast],
  );

  const icons = {
    success: (
      <CheckCircle2 className="w-4 h-4 text-[var(--success)] shrink-0" />
    ),
    error: <AlertCircle className="w-4 h-4 text-[var(--danger)] shrink-0" />,
    warning: <AlertCircle className="w-4 h-4 text-[var(--warning)] shrink-0" />,
    info: <Info className="w-4 h-4 text-[var(--info)] shrink-0" />,
  };

  return (
    <ToastContext.Provider
      value={{ toast: addToast, success, error, info, warning }}
    >
      {children}
      {/* Toast viewport */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              "pointer-events-auto flex items-center justify-between gap-3 p-3.5 bg-[var(--surface-elevated)]",
              "border border-[var(--border-strong)] rounded-[var(--radius-md)] shadow-xl",
              "text-xs text-[var(--text)] animate-in slide-in-from-bottom-2 duration-150",
            )}
          >
            <div className="flex items-center gap-2.5">
              {icons[t.type || "info"]}
              <span className="font-medium leading-normal">{t.message}</span>
            </div>
            <button
              type="button"
              onClick={() => removeToast(t.id)}
              className="text-[var(--text-subtle)] hover:text-[var(--text)] p-0.5 rounded-sm cursor-pointer"
              aria-label="Dismiss toast"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}
