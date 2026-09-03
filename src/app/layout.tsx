import type { Metadata, Viewport } from "next";
import "./globals.css";
import { DevWebMcpTools } from "@/components/dev-webmcp-tools";
import { AppShell } from "@/components/layout/app-shell";
import { Providers } from "./providers";

export const viewport: Viewport = {
  themeColor: "#09090b",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://skillspace.local"),
  title: {
    default: "Skillspace: Give AI the skills to get the job done",
    template: "%s | Skillspace",
  },
  description:
    "Browse agent skills, save a personal Skillspace, and make the right instructions available to AI through WebMCP.",
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
    title: "Skillspace: Give AI the skills to get the job done",
    description:
      "Browse agent skills, save a personal Skillspace, and make the right instructions available to AI through WebMCP.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Skillspace: Give AI the skills to get the job done",
    description:
      "Browse agent skills, save a personal Skillspace, and make the right instructions available to AI through WebMCP.",
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
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
        {process.env.NODE_ENV === "development" ? <DevWebMcpTools /> : null}
      </body>
    </html>
  );
}
