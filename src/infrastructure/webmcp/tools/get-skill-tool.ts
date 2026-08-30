import { AppError } from "@/contracts";
import { getSkill } from "@/domain/services/get-skill";
import type { WebMcpToolDefinition, WebMcpToolHandler } from "../types";

export const getSkillToolDef: WebMcpToolDefinition = {
  name: "get_skill",
  description:
    "Retrieve full instructions, prompts, and reference guides for a specific AI skill. Use this when you are ready to adopt the skill's instructions.",
  inputSchema: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description:
          "The unique identifier of the skill (e.g. 'nextjs-app-router-architect').",
      },
    },
    required: ["id"],
  },
};

export const getSkillToolHandler: WebMcpToolHandler = async (params) => {
  const id = params.id as string;
  if (!id || typeof id !== "string") {
    throw new AppError("INVALID_INPUT", "Skill ID parameter 'id' is required.");
  }

  const skill = await getSkill(id);
  if (!skill) {
    throw new AppError(
      "SKILL_NOT_FOUND",
      `Skill with ID '${id}' was not found.`,
    );
  }

  return {
    id: skill.id,
    name: skill.name,
    version: skill.version,
    category: skill.category,
    instructions: skill.instructions,
    references: skill.references,
    compatibility: skill.compatibility,
  };
};
