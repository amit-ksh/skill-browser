import { type Skill, SkillSchema } from "@/contracts";
import type { SkillspaceRepository } from "@/domain/repositories/skillspace-repository";
import { indexedDbSkillspaceRepository } from "@/infrastructure/repositories/indexeddb-skillspace-repository";

export async function installSkill(
  skill: Skill,
  repo: SkillspaceRepository = indexedDbSkillspaceRepository,
): Promise<void> {
  const validated = SkillSchema.parse(skill);
  await repo.addSkill(validated);
}
