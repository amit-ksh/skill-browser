import { z } from "zod";
import { SkillIdSchema, SkillSchema } from "./skill";

export const AgentActionTypeSchema = z.enum([
  "install_skill",
  "remove_skill",
  "modify_collection",
]);
export type AgentActionType = z.infer<typeof AgentActionTypeSchema>;

export const PermissionRequestStatusSchema = z.enum([
  "pending",
  "approved",
  "denied",
  "expired",
]);
export type PermissionRequestStatus = z.infer<
  typeof PermissionRequestStatusSchema
>;

export const PermissionRequestSchema = z.object({
  id: z.string().min(1),
  agentId: z.string().default("browser-agent"),
  action: AgentActionTypeSchema,
  skillId: SkillIdSchema,
  skillData: SkillSchema.optional(),
  reason: z.string().max(300).optional(),
  requestedAt: z.string().datetime().or(z.string()),
  status: PermissionRequestStatusSchema.default("pending"),
  decisionAt: z.string().datetime().or(z.string()).optional(),
});

export type PermissionRequest = z.infer<typeof PermissionRequestSchema>;
