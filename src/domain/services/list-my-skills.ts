import type { SkillspaceItem } from "@/contracts";
import type { SkillspaceRepository } from "@/domain/repositories/skillspace-repository";
import { indexedDbSkillspaceRepository } from "@/infrastructure/repositories/indexeddb-skillspace-repository";

export async function listMySkills(
  repo: SkillspaceRepository = indexedDbSkillspaceRepository,
): Promise<SkillspaceItem[]> {
  return repo.listSkills();
}
