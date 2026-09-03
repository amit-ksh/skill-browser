import { queryOptions } from "@tanstack/react-query";
import type { Skill, SkillSummary } from "@/contracts";
import { getRegistrySkill } from "@/infrastructure/api/skills-sh-client";
import { staticSkillRepository } from "@/infrastructure/repositories/static-skill-repository";

export const skillQueries = {
  all: ["skills"] as const,
  detail: (skillSummary: SkillSummary) =>
    queryOptions({
      queryKey: [
        ...skillQueries.all,
        "detail",
        skillSummary.registryId ?? skillSummary.id,
      ],
      queryFn: async ({ signal }): Promise<Skill> => {
        if (skillSummary.registryId) {
          return getRegistrySkill(skillSummary.registryId, signal);
        }

        const localSkill = await staticSkillRepository.get(skillSummary.id);
        return (
          localSkill ?? {
            ...skillSummary,
            instructions: `# ${skillSummary.name}\n\n${skillSummary.description}`,
            references: [],
            compatibility: ["WebMCP v1"],
            license: "MIT",
          }
        );
      },
      staleTime: 5 * 60_000,
    }),
};
