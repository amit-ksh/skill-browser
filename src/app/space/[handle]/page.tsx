import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getPublicSkillspace } from "@/domain/services/manifest-services";
import { PublicSpaceClient } from "./space-client";

export async function generateStaticParams() {
  return [
    { handle: "nextjs-architect" },
    { handle: "agent-engineer" },
    { handle: "growth-lead" },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const profile = await getPublicSkillspace(handle);

  if (!profile) {
    return { title: "Skillspace Not Found — Skill Browser" };
  }

  return {
    title: `${profile.name} (@${profile.handle}) — Skill Browser`,
    description: profile.bio,
  };
}

export default async function PublicSpacePage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const profile = await getPublicSkillspace(handle);

  if (!profile) {
    notFound();
  }

  return (
    <Suspense
      fallback={
        <div className="space-y-4">
          <div className="h-32 w-full bg-[var(--surface)] rounded-md animate-pulse" />
          <div className="h-10 w-full bg-[var(--surface-elevated)] rounded-md animate-pulse" />
        </div>
      }
    >
      <PublicSpaceClient profile={profile} />
    </Suspense>
  );
}
