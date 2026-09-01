import { z } from "zod";

export const SkillIdSchema = z
  .string()
  .min(2)
  .max(64)
  .regex(/^[a-z0-9][a-z0-9-_]{1,63}$/, {
    message:
      "Skill ID must be lowercase alphanumeric, hyphens, or underscores.",
  });

export type SkillId = z.infer<typeof SkillIdSchema>;

export const CategoryIdSchema = z.enum([
  "software-development",
  "design",
  "marketing",
  "research",
  "productivity",
  "writing",
  "other",
]);

export type CategoryId = z.infer<typeof CategoryIdSchema>;

export const CategorySchema = z.object({
  id: CategoryIdSchema,
  name: z.string().min(1),
  description: z.string().optional(),
  icon: z.string().optional(),
  skillCount: z.number().int().nonnegative().default(0),
});

export type Category = z.infer<typeof CategorySchema>;

export const SkillSourceTypeSchema = z.enum([
  "registry",
  "imported",
  "custom",
  "github",
]);
export type SkillSourceType = z.infer<typeof SkillSourceTypeSchema>;

export const VerificationStatusSchema = z.enum([
  "verified",
  "unverified",
  "community",
  "custom",
]);
export type VerificationStatus = z.infer<typeof VerificationStatusSchema>;

export const SkillSummarySchema = z.object({
  id: SkillIdSchema,
  name: z.string().min(1).max(120),
  description: z.string().max(500),
  version: z.string().default("1.0.0"),
  category: CategoryIdSchema,
  tags: z.array(z.string().min(1).max(30)).max(20).default([]),
  author: z.string().min(1).max(100).default("Community"),
  repo: z.string().optional(),
  installs: z.number().int().nonnegative().default(0),
  weeklyInstalls: z.number().int().nonnegative().default(0),
  growthRate: z.number().default(0),
  isOfficial: z.boolean().default(false),
  publisher: z.string().optional(),
  sourceType: SkillSourceTypeSchema.default("registry"),
  sourceUrl: z.string().url().nullable().optional(),
  verificationStatus: VerificationStatusSchema.default("unverified"),
  updatedAt: z.string().datetime().or(z.string()),
  installed: z.boolean().optional(),
});

export type SkillSummary = z.infer<typeof SkillSummarySchema>;

export const SkillSchema = SkillSummarySchema.extend({
  instructions: z.string().min(1),
  references: z.array(z.string().url()).max(20).default([]),
  compatibility: z
    .array(z.string())
    .default(["WebMCP v1", "Claude Code", "Cursor", "AI"]),
  license: z.string().default("MIT"),
  integrityHash: z.string().optional(),
});

export type Skill = z.infer<typeof SkillSchema>;
