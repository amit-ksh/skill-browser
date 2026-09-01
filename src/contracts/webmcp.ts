import { z } from "zod";
import { CategoryIdSchema, SkillIdSchema } from "./skill";

export const WebMcpSearchSkillsArgsSchema = z.object({
  query: z.string().max(100).default(""),
  category: CategoryIdSchema.or(z.literal("all")).default("all"),
  limit: z.number().int().min(1).max(20).default(10),
});
export type WebMcpSearchSkillsArgs = z.infer<
  typeof WebMcpSearchSkillsArgsSchema
>;

export const WebMcpGetSkillArgsSchema = z.object({
  id: SkillIdSchema,
});
export type WebMcpGetSkillArgs = z.infer<typeof WebMcpGetSkillArgsSchema>;

export const WebMcpToolExecutionResultSchema = z.object({
  success: z.boolean(),
  data: z.unknown().optional(),
  error: z
    .object({
      code: z.string(),
      message: z.string(),
    })
    .optional(),
});
export type WebMcpToolExecutionResult = z.infer<
  typeof WebMcpToolExecutionResultSchema
>;
