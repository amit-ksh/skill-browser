import { AppError } from "@/contracts";
import { getSkill } from "@/domain/services/get-skill";
import type { WebMcpToolDefinition, WebMcpToolHandler } from "../types";

export const getSkillMetadataToolDef: WebMcpToolDefinition = {
  name: "get_skill_metadata",
  description:
    "Retrieve comprehensive metadata for an AI skill (author, version, compatibility, license, verification status, tags) without retrieving the full instruction body.",
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

export const getSkillMetadataToolHandler: WebMcpToolHandler = async (
  params,
) => {
  const id = params.id as string;
  if (!id || typeof id !== "string") {
    throw new AppError("INVALID_INPUT", "Skill ID parameter 'id' is required.");
  }

  const skill = await getSkill(id);
  if (!skill) {
    throw new AppError(
      "SKILL_NOT_FOUND",
      `Skill with ID '${id}' was not found in registry.`,
    );
  }

  // Omit bulky instructions for token efficiency
  const { instructions: _omit, ...metadata } = skill;
  return metadata;
};
