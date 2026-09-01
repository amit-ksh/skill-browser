"use client";

import type React from "react";
import { WebMcpProvider } from "@/components/agent/webmcp-provider";
import { ToastProvider } from "@/components/ui/toast";
import { Header } from "./header";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <WebMcpProvider>
      <ToastProvider>
        {/* Accessible Skip to Content Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-3 focus:py-1.5 focus:bg-white focus:text-black focus:rounded-md focus:font-mono focus:text-xs"
        >
          Skip to main content
        </a>

        <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--text)] selection:bg-[var(--accent)] selection:text-black">
          {/* Main App Header */}
          <Header />

          {/* Main Content Area */}
          <main
            id="main-content"
            tabIndex={-1}
            className="flex-1 min-w-0 px-4 py-6 md:px-8 md:py-8 max-w-6xl mx-auto w-full focus:outline-none"
          >
            {children}
          </main>
        </div>
      </ToastProvider>
    </WebMcpProvider>
  );
}
