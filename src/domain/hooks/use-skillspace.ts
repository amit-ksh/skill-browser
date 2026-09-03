"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo } from "react";
import type { Skill, SkillId } from "@/contracts";
import { indexedDbSkillspaceRepository } from "@/infrastructure/repositories/indexeddb-skillspace-repository";

export const skillspaceQueries = {
  all: ["skillspace"] as const,
  skills: ["skillspace", "skills"] as const,
};

export function useSkillspace() {
  const queryClient = useQueryClient();
  const skillsQuery = useQuery({
    queryKey: skillspaceQueries.skills,
    queryFn: () => indexedDbSkillspaceRepository.listSkills(),
    staleTime: Number.POSITIVE_INFINITY,
  });
  const items = skillsQuery.data ?? [];
  const installedIds = useMemo(
    () => new Set(items.map((item) => item.skill.id)),
    [items],
  );
  const installedSkills = useMemo(
    () => items.map((item) => item.skill),
    [items],
  );

  const refresh = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: skillspaceQueries.skills });
  }, [queryClient]);

  useEffect(() => {
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

  const installMutation = useMutation({
    mutationFn: async (skill: Skill) => {
      const existing = await indexedDbSkillspaceRepository.getSkill(skill.id);
      if (existing) return false;
      await indexedDbSkillspaceRepository.addSkill({
        ...skill,
        installed: true,
      });
      return true;
    },
    onSuccess: async () => {
      await refresh();
    },
  });

  const removeMutation = useMutation({
    mutationFn: async (skillId: SkillId) => {
      await indexedDbSkillspaceRepository.removeSkill(skillId);
    },
    onSuccess: async () => {
      await refresh();
    },
  });

  const installSkill = useCallback(
    (skill: Skill) => installMutation.mutateAsync(skill),
    [installMutation.mutateAsync],
  );

  const removeSkill = useCallback(
    (skillId: SkillId) => removeMutation.mutateAsync(skillId),
    [removeMutation.mutateAsync],
  );

  const isInstalled = useCallback(
    (skillId: SkillId) => {
      return installedIds.has(skillId);
    },
    [installedIds],
  );

  return {
    installedSkills,
    isInstalled,
    installSkill,
    removeSkill,
    refresh,
    isLoading: skillsQuery.isPending,
    isMutating: installMutation.isPending || removeMutation.isPending,
  };
}
