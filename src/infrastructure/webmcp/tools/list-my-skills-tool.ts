import { listMySkills } from "@/domain/services/list-my-skills";
import type { WebMcpToolDefinition, WebMcpToolHandler } from "../types";

export const listMySkillsToolDef: WebMcpToolDefinition = {
  name: "list_my_skills",
  description:
    "List all AI skills currently installed in the user's local Skillspace in this browser session. Returns skills the user has explicitly curated.",
  inputSchema: {
    type: "object",
    properties: {
      collectionId: {
        type: "string",
        description:
          "Optional collection ID to filter installed skills (e.g. 'core-stack').",
      },
      favoritesOnly: {
        type: "string",
        description:
          "Optional boolean string ('true' or 'false') to return only favorited skills.",
      },
    },
  },
};

export const listMySkillsToolHandler: WebMcpToolHandler = async (params) => {
  const items = await listMySkills();

  let filtered = items;
  if (params.collectionId && typeof params.collectionId === "string") {
    filtered = filtered.filter((i) =>
      i.collectionIds.includes(params.collectionId as string),
    );
  }

  if (params.favoritesOnly === "true" || params.favoritesOnly === true) {
    filtered = filtered.filter((i) => i.isFavorite);
  }

  return {
    total: filtered.length,
    skills: filtered.map((i) => ({
      id: i.skill.id,
      name: i.skill.name,
      description: i.skill.description,
      category: i.skill.category,
      tags: i.skill.tags,
      version: i.skill.version,
      installedAt: i.installedAt,
      isFavorite: i.isFavorite,
    })),
  };
};
