import type {
  Category,
  SearchSkillsInput,
  SearchSkillsResult,
  Skill,
  SkillId,
  SkillSummary,
} from "@/contracts";

export interface SkillRepository {
  search(input: SearchSkillsInput): Promise<SearchSkillsResult<SkillSummary>>;
  get(id: SkillId): Promise<Skill | null>;
  listCategories(): Promise<Category[]>;
  listAllSkills(): Promise<Skill[]>;
}
