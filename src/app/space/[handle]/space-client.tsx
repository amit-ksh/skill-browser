"use client";

import { Bot, Folder, Share2, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { SkillCard } from "@/components/skills/skill-card";
import { CloneSkillspaceButton } from "@/components/skillspace/clone-skillspace-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/toast";
import type { PublicSkillspaceProfile } from "@/domain/services/manifest-services";

export function PublicSpaceClient({
  profile,
}: {
  profile: PublicSkillspaceProfile;
}) {
  const [selectedCollection, setSelectedCollection] = useState<string>("all");
  const { success } = useToast();

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      success("Public Skillspace link copied to clipboard");
    } catch {}
  };

  const displayedSkills =
    selectedCollection === "all"
      ? profile.skills
      : profile.skills.filter((s) => {
          const col = profile.collections.find(
            (c) => c.id === selectedCollection,
          );
          return col?.skillIds.includes(s.id);
        });

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Profile Header */}
      <div className="p-6 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-lg)] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-[var(--surface-elevated)] border-2 border-[var(--border-strong)] flex items-center justify-center text-[var(--accent)] text-xl font-mono font-bold shrink-0">
              {profile.handle.slice(0, 2).toUpperCase()}
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text)]">
                  {profile.name}
                </h1>
                <span className="font-mono text-xs text-[var(--text-subtle)]">
                  @{profile.handle}
                </span>
                {profile.verified && (
                  <Badge variant="success" size="sm" className="gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    Verified Curator
                  </Badge>
                )}
              </div>

              <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-2xl leading-relaxed">
                {profile.bio}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-start">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleShare}
              className="gap-1.5 text-xs"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </Button>

            <CloneSkillspaceButton
              skills={profile.skills}
              collections={profile.collections}
              handle={profile.handle}
            />
          </div>
        </div>

        {/* WebMCP Connection Info */}
        <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs font-mono text-[var(--text-subtle)] flex-wrap gap-2">
          <div className="flex items-center gap-4">
            <span>
              <strong className="text-[var(--text)]">
                {profile.skills.length}
              </strong>{" "}
              Skills
            </span>
            <span>
              <strong className="text-[var(--text)]">
                {profile.collections.length}
              </strong>{" "}
              Collections
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[var(--success)]">
            <Bot className="w-3.5 h-3.5" />
            <span>Exposed via WebMCP navigator.modelContext</span>
          </div>
        </div>
      </div>

      {/* Collections & Skills List */}
      <Tabs
        defaultValue="all"
        value={selectedCollection}
        onValueChange={setSelectedCollection}
        className="space-y-4"
      >
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
          <TabsList className="bg-[var(--surface)] p-1 border border-[var(--border)]">
            <TabsTrigger value="all" className="text-xs gap-1.5">
              <span>All Skills</span>
              <span className="text-[10px] font-mono opacity-70">
                ({profile.skills.length})
              </span>
            </TabsTrigger>
            {profile.collections.map((col) => (
              <TabsTrigger
                key={col.id}
                value={col.id}
                className="text-xs gap-1.5"
              >
                <Folder className="w-3 h-3 text-[var(--accent)]" />
                <span>{col.name}</span>
                <span className="text-[10px] font-mono opacity-70">
                  ({col.skillIds.length})
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedSkills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      </Tabs>
    </div>
  );
}
