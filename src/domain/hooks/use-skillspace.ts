"use client";

import { useCallback, useEffect, useState } from "react";
import type { Skill, SkillId } from "@/contracts";
import { indexedDbSkillspaceRepository } from "@/infrastructure/repositories/indexeddb-skillspace-repository";

export function useSkillspace() {
  const [installedIds, setInstalledIds] = useState<Set<string>>(new Set());

  const refresh = useCallback(async () => {
    const items = await indexedDbSkillspaceRepository.listSkills();
    setInstalledIds(new Set(items.map((item) => item.skill.id)));
  }, []);

  useEffect(() => {
    void refresh();

    const handleStorageChange = () => {
      void refresh();
    };

    window.addEventListener("skillspace-updated", handleStorageChange);
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("skillspace-updated", handleStorageChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [refresh]);

  const installSkill = useCallback(
    async (skill: Skill) => {
      const exists = installedIds.has(skill.id);
      if (exists) return false;

      await indexedDbSkillspaceRepository.addSkill({
        ...skill,
        installed: true,
      });
      await refresh();
      return true;
    },
    [installedIds, refresh],
  );

  const removeSkill = useCallback(
    async (skillId: SkillId) => {
      await indexedDbSkillspaceRepository.removeSkill(skillId);
      await refresh();
    },
    [refresh],
  );

  const isInstalled = useCallback(
    (skillId: SkillId) => {
      return installedIds.has(skillId);
    },
    [installedIds],
  );

  return {
    isInstalled,
    installSkill,
    removeSkill,
    refresh,
  };
}
