import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppShell } from "@/components/layout/app-shell";

export const viewport: Viewport = {
  themeColor: "#09090b",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://skillbrowser.app"),
  title: {
    default: "Skill Browser — WebMCP Skill Registry for AI Agents",
    template: "%s | Skill Browser",
  },
  description:
    "A browser-native skill registry and personal Skillspace exposed through WebMCP for browser-based AI agents. Zero cost, local-first, privacy preserved.",
  keywords: [
    "WebMCP",
    "Model Context Protocol",
    "AI Skills",
    "ChatGPT Browser Agent",
    "Chrome WebMCP",
    "Agentic AI",
    "Skillspace",
  ],
  authors: [{ name: "Skill Browser Team" }],
  creator: "Skill Browser",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://skillbrowser.app",
    siteName: "Skill Browser",
    title: "Skill Browser — WebMCP Skill Registry for AI Agents",
    description:
      "A browser-native skill registry and personal Skillspace exposed through WebMCP for browser-based AI agents.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Skill Browser — WebMCP Skill Registry for AI Agents",
    description:
      "A browser-native skill registry and personal Skillspace exposed through WebMCP for browser-based AI agents.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark h-full antialiased">
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--text)]">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
