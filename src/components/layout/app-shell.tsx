"use client";

import type React from "react";
import { useState } from "react";
import { WebMcpProvider } from "@/components/agent/webmcp-provider";
import { ToastProvider } from "@/components/ui/toast";
import { Header } from "./header";
import { Sidebar } from "./sidebar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <WebMcpProvider>
      <ToastProvider>
        <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--text)]">
          {/* Main App Header */}
          <Header
            onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            isMobileMenuOpen={isMobileMenuOpen}
          />

          <div className="flex flex-1 relative">
            {/* Desktop Sidebar */}
            <div className="hidden md:block shrink-0 sticky top-14 h-[calc(100vh-3.5rem)]">
              <Sidebar />
            </div>

            {/* Mobile Drawer */}
            {isMobileMenuOpen && (
              <div className="fixed inset-0 z-40 md:hidden flex">
                <button
                  type="button"
                  className="fixed inset-0 bg-black/80 backdrop-blur-xs border-none w-full h-full p-0 cursor-default"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close mobile navigation menu"
                  tabIndex={-1}
                />
                <div className="relative w-64 max-w-[80vw] h-full z-50 animate-in slide-in-from-left duration-200">
                  <Sidebar onClose={() => setIsMobileMenuOpen(false)} />
                </div>
              </div>
            )}

            {/* Main Content Area */}
            <main className="flex-1 min-w-0 p-4 md:p-8 max-w-7xl mx-auto w-full">
              {children}
            </main>
          </div>
        </div>
      </ToastProvider>
    </WebMcpProvider>
  );
}
