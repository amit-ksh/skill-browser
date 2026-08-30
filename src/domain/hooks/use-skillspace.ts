"use client";

import { useCallback, useEffect, useState } from "react";
import type { Skill, SkillId } from "@/contracts";

const STORAGE_KEY = "skill_browser_installed_skills";

export function useSkillspace() {
  const [installedSkills, setInstalledSkills] = useState<Skill[]>([]);
  const [installedIds, setInstalledIds] = useState<Set<string>>(new Set());
  const [isLoaded, setIsLoaded] = useState(false);

  const loadFromStorage = useCallback(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: Skill[] = JSON.parse(raw);
        setInstalledSkills(parsed);
        setInstalledIds(new Set(parsed.map((s) => s.id)));
      }
    } catch {
      // Fallback
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const saveToStorage = useCallback((skills: Skill[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(skills));
      setInstalledSkills(skills);
      setInstalledIds(new Set(skills.map((s) => s.id)));
      window.dispatchEvent(new Event("skillspace-updated"));
    } catch {
      // Storage error
    }
  }, []);

  useEffect(() => {
    loadFromStorage();

    const handleStorageChange = () => {
      loadFromStorage();
    };

    window.addEventListener("skillspace-updated", handleStorageChange);
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("skillspace-updated", handleStorageChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [loadFromStorage]);

  const installSkill = useCallback(
    (skill: Skill) => {
      const exists = installedSkills.some((s) => s.id === skill.id);
      if (!exists) {
        const next = [...installedSkills, { ...skill, installed: true }];
        saveToStorage(next);
        return true;
      }
      return false;
    },
    [installedSkills, saveToStorage],
  );

  const removeSkill = useCallback(
    (skillId: SkillId) => {
      const next = installedSkills.filter((s) => s.id !== skillId);
      saveToStorage(next);
    },
    [installedSkills, saveToStorage],
  );

  const isInstalled = useCallback(
    (skillId: SkillId) => {
      return installedIds.has(skillId);
    },
    [installedIds],
  );

  return {
    installedSkills,
    installedCount: installedSkills.length,
    isInstalled,
    installSkill,
    removeSkill,
    isLoaded,
  };
}
