import { AppError, SearchSkillsInputSchema } from "@/contracts";
import { searchSkills } from "@/domain/services/search-skills";
import type { WebMcpToolDefinition, WebMcpToolHandler } from "../types";

export const searchSkillsToolDef: WebMcpToolDefinition = {
  name: "search_skills",
  description:
    "Search the global Skill Browser registry for AI skills by keywords, category, or tags. Returns compact skill summaries to minimize token consumption.",
  inputSchema: {
    type: "object",
    properties: {
      query: {
        type: "string",
        description:
          "Keywords to match against skill titles, descriptions, and tags.",
      },
      category: {
        type: "string",
        description:
          "Filter by category ID (e.g. 'software-development', 'research', 'design', 'marketing', 'productivity', 'writing', 'all').",
        enum: [
          "all",
          "software-development",
          "design",
          "marketing",
          "research",
          "productivity",
          "writing",
          "other",
        ],
      },
      limit: {
        type: "number",
        description:
          "Maximum number of skill summaries to return (default 10, max 50).",
      },
      offset: {
        type: "number",
        description: "Offset for pagination (default 0).",
      },
    },
  },
};

export const searchSkillsToolHandler: WebMcpToolHandler = async (params) => {
  const parsed = SearchSkillsInputSchema.safeParse(params);
  if (!parsed.success) {
    throw new AppError(
      "INVALID_INPUT",
      `Invalid search parameters: ${parsed.error.issues.map((e) => e.message).join(", ")}`,
    );
  }

  const result = await searchSkills(parsed.data);
  return {
    total: result.total,
    returned: result.items.length,
    skills: result.items,
  };
};
