import { z } from "zod";
import { SkillSummarySchema } from "./skill";

export const SkillsShCatalogItemSchema = z.object({
  id: z.string().min(3).max(240),
  slug: z.string().min(1).max(160),
  name: z.string().min(1).max(160),
  source: z.string().min(1).max(200),
  installs: z.number().int().nonnegative(),
  sourceType: z.enum(["github", "well-known"]),
  installUrl: z.string().url().nullable(),
  url: z.string().url(),
  isDuplicate: z.boolean().optional(),
  description: z.string().max(500).optional(),
  tags: z.array(z.string().min(1).max(30)).max(20).optional(),
  version: z.string().max(40).optional(),
});

export type SkillsShCatalogItem = z.infer<typeof SkillsShCatalogItemSchema>;

export const SkillsShListResponseSchema = z.object({
  data: z.array(SkillsShCatalogItemSchema),
  pagination: z.object({
    page: z.number().int().nonnegative(),
    perPage: z.number().int().positive(),
    total: z.number().int().nonnegative(),
    hasMore: z.boolean(),
  }),
});

export const SkillsShSearchResponseSchema = z.object({
  data: z.array(SkillsShCatalogItemSchema),
  query: z.string(),
  count: z.number().int().nonnegative(),
});

export const SkillsShDetailResponseSchema = z.object({
  id: z.string().min(3).max(240),
  source: z.string().min(1).max(200),
  slug: z.string().min(1).max(160),
  installs: z.number().int().nonnegative(),
  hash: z.string().optional(),
  files: z
    .array(
      z.object({
        path: z.string().min(1).max(500),
        contents: z.string().max(512 * 1024),
      }),
    )
    .max(100),
});

export const SkillCatalogResponseSchema = z.object({
  items: z.array(SkillSummarySchema),
  total: z.number().int().nonnegative(),
  page: z.number().int().nonnegative(),
  perPage: z.number().int().positive(),
  hasMore: z.boolean(),
  source: z.literal("skills.sh"),
});

export type SkillCatalogResponse = z.infer<typeof SkillCatalogResponseSchema>;
