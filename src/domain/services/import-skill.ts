import type { Skill } from "@/contracts";
import type { SkillspaceRepository } from "@/domain/repositories/skillspace-repository";
import { urlSkillImporter } from "@/infrastructure/importers/url-skill-importer";
import { indexedDbSkillspaceRepository } from "@/infrastructure/repositories/indexeddb-skillspace-repository";

export async function previewSkillFromUrl(
  url: string,
): Promise<{ skill: Skill; warnings: string[] }> {
  return urlSkillImporter.fetchFromUrl(url);
}

export function previewSkillFromRawText(rawText: string): {
  skill: Skill;
  warnings: string[];
} {
  return urlSkillImporter.parseRawContent(rawText);
}

export async function confirmImportSkill(
  skill: Skill,
  repo: SkillspaceRepository = indexedDbSkillspaceRepository,
): Promise<void> {
  await repo.addSkill(skill);
}
