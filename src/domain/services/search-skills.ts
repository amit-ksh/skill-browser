import {
  type SearchSkillsInput,
  SearchSkillsInputSchema,
  type SearchSkillsResult,
  type SkillSummary,
} from "@/contracts";
import type { SkillRepository } from "@/domain/repositories/skill-repository";
import { staticSkillRepository } from "@/infrastructure/repositories/static-skill-repository";

export async function searchSkills(
  rawInput: Partial<SearchSkillsInput>,
  repo: SkillRepository = staticSkillRepository,
): Promise<SearchSkillsResult<SkillSummary>> {
  const validatedInput = SearchSkillsInputSchema.parse(rawInput);
  return repo.search(validatedInput);
}
