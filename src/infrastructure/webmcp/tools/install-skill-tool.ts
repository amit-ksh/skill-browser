import { AppError } from "@/contracts";
import { getSkill } from "@/domain/services/get-skill";
import { installSkill } from "@/domain/services/install-skill";
import { mutationApprovalManager } from "@/infrastructure/security/mutation-approval-manager";
import type { WebMcpToolDefinition, WebMcpToolHandler } from "../types";

export const installSkillToolDef: WebMcpToolDefinition = {
  name: "install_skill",
  description:
    "Install a skill from the registry into the user's personal Skillspace. IMPORTANT: This action mutates user state and requires explicit human user approval before execution.",
  inputSchema: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "The unique identifier of the skill to install.",
      },
    },
    required: ["id"],
  },
};

export const installSkillToolHandler: WebMcpToolHandler = async (params) => {
  const id = params.id as string;
  if (!id || typeof id !== "string") {
    throw new AppError("INVALID_INPUT", "Skill ID parameter 'id' is required.");
  }

  const skill = await getSkill(id);
  if (!skill) {
    throw new AppError("SKILL_NOT_FOUND", `Skill '${id}' was not found.`);
  }

  // Request Human-in-the-loop approval
  const approved = await mutationApprovalManager.requestApproval(
    "install_skill",
    `Install Skill "${skill.name}"`,
    `Agent requested to add "${skill.name}" (v${skill.version}) to your local Skillspace.`,
    { skillId: id, skillName: skill.name, version: skill.version },
  );

  if (!approved) {
    throw new AppError(
      "PERMISSION_DENIED",
      `User denied installation request for skill '${skill.name}'.`,
    );
  }

  await installSkill(skill);

  return {
    status: "completed",
    installed: true,
    skill: {
      id: skill.id,
      name: skill.name,
      version: skill.version,
    },
  };
};
