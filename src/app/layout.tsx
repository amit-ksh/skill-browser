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
    default: "Skillspace: Your personal skill space for AI",
    template: "%s | Skillspace",
  },
  description:
    "Give AI the skills it needs to do the job, with a personal skill space powered by WebMCP.",
  keywords: [
    "Skillspace",
    "AI skills",
    "personal skill library",
    "WebMCP",
    "Model Context Protocol",
    "AI skills",
  ],
  authors: [{ name: "Skillspace" }],
  creator: "Skillspace",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://skillspace.local",
    siteName: "Skillspace",
    title: "Skillspace: Your personal skill space for AI",
    description:
      "Give AI the skills it needs to do the job, with a personal skill space powered by WebMCP.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Skillspace: Your personal skill space for AI",
    description:
      "Give AI the skills it needs to do the job, with a personal skill space powered by WebMCP.",
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
