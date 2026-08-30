import { type SkillId, SkillIdSchema } from "@/contracts";
import type { SkillspaceRepository } from "@/domain/repositories/skillspace-repository";
import { indexedDbSkillspaceRepository } from "@/infrastructure/repositories/indexeddb-skillspace-repository";

export async function removeSkill(
  id: SkillId,
  repo: SkillspaceRepository = indexedDbSkillspaceRepository,
): Promise<void> {
  const validated = SkillIdSchema.parse(id);
  await repo.removeSkill(validated);
}
