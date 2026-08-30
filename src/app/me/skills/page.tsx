import type { Metadata } from "next";
import { Suspense } from "react";
import { SkillspaceClient } from "./skillspace-client";

export const metadata: Metadata = {
  title: "My Skillspace — Skill Browser",
  description:
    "Manage your installed skills, collections, and WebMCP agent exposures.",
};

export default function MySkillsPage() {
  return (
    <Suspense
      fallback={
        <div className="space-y-4">
          <div className="h-32 w-full bg-[var(--surface)] rounded-md animate-pulse" />
          <div className="h-10 w-full bg-[var(--surface-elevated)] rounded-md animate-pulse" />
        </div>
      }
    >
      <SkillspaceClient />
    </Suspense>
  );
}
