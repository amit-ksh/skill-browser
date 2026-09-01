import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppShell } from "@/components/layout/app-shell";

export const viewport: Viewport = {
  themeColor: "#09090b",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://skillspace.local"),
  title: {
    default: "Skillspace: Skill library for ChatGPT",
    template: "%s | Skillspace",
  },
  description:
    "Keep reusable skill prompts in one local library that ChatGPT can discover through WebMCP when you ask.",
  keywords: [
    "Skillspace",
    "AI skills",
    "personal skill library",
    "WebMCP",
    "Model Context Protocol",
    "ChatGPT skills",
  ],
  authors: [{ name: "Skillspace" }],
  creator: "Skillspace",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://skillspace.local",
    siteName: "Skillspace",
    title: "Skillspace: Skill library for ChatGPT",
    description:
      "Keep reusable skill prompts in one local library that ChatGPT can discover through WebMCP when you ask.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Skillspace: Skill library for ChatGPT",
    description:
      "Keep reusable skill prompts in one local library that ChatGPT can discover through WebMCP when you ask.",
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
