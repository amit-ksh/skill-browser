"use client";

import { Check, CopyPlus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import type { Skill } from "@/contracts";
import { useSkillspace } from "@/domain/hooks/use-skillspace";
import { cloneSkillspaceToLocal } from "@/domain/services/manifest-services";

export function CloneSkillspaceButton({
  skills,
  collections,
  handle,
}: {
  skills: Skill[];
  collections?: {
    id: string;
    name: string;
    description?: string;
    skillIds: string[];
  }[];
  handle: string;
}) {
  const [isCloning, setIsCloning] = useState(false);
  const [isCloned, setIsCloned] = useState(false);
  const { installSkill } = useSkillspace();
  const { success, error } = useToast();

  const handleClone = async () => {
    try {
      setIsCloning(true);
      const count = await cloneSkillspaceToLocal(skills, collections);
      // Update reactive local state
      for (const s of skills) {
        installSkill(s);
      }
      setIsCloned(true);
      success(
        `Successfully cloned ${count} skills from @${handle} to your Skillspace`,
      );
    } catch {
      error("Failed to clone Skillspace");
    } finally {
      setIsCloning(false);
    }
  };

  if (isCloned) {
    return (
      <Button
        variant="secondary"
        size="sm"
        className="gap-1.5 text-xs"
        disabled
      >
        <Check className="w-3.5 h-3.5 text-[var(--success)]" />
        <span>Cloned to My Skillspace</span>
      </Button>
    );
  }

  return (
    <Button
      variant="primary"
      size="sm"
      onClick={handleClone}
      isLoading={isCloning}
      className="gap-1.5 text-xs"
    >
      <CopyPlus className="w-3.5 h-3.5" />
      <span>Clone Skillspace ({skills.length} skills)</span>
    </Button>
  );
}
