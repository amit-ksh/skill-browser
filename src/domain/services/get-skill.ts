import { AppError, type Skill, type SkillId, SkillIdSchema } from "@/contracts";
import type { SkillRepository } from "@/domain/repositories/skill-repository";
import { staticSkillRepository } from "@/infrastructure/repositories/static-skill-repository";

export async function getSkill(
  rawId: string,
  repo: SkillRepository = staticSkillRepository,
): Promise<Skill> {
  const validatedId: SkillId = SkillIdSchema.parse(rawId);
  const skill = await repo.get(validatedId);

  if (!skill) {
    throw new AppError(
      "SKILL_NOT_FOUND",
      `Skill with ID '${validatedId}' was not found.`,
    );
  }

  return skill;
}
