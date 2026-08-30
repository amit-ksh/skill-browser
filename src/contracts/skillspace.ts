import { z } from "zod";
import { SkillIdSchema, SkillSchema } from "./skill";

export const CollectionIdSchema = z
  .string()
  .min(2)
  .max(64)
  .regex(/^[a-z0-9-_]+$/);

export type CollectionId = z.infer<typeof CollectionIdSchema>;

export const CollectionSchema = z.object({
  id: CollectionIdSchema,
  name: z.string().min(1).max(64),
  description: z.string().max(200).optional(),
  skillIds: z.array(SkillIdSchema).default([]),
  createdAt: z.string().datetime().or(z.string()),
  updatedAt: z.string().datetime().or(z.string()),
});

export type Collection = z.infer<typeof CollectionSchema>;

export const SkillspaceItemSchema = z.object({
  skill: SkillSchema,
  installedAt: z.string().datetime().or(z.string()),
  isFavorite: z.boolean().default(false),
  collectionIds: z.array(CollectionIdSchema).default([]),
  notes: z.string().max(1000).optional(),
});

export type SkillspaceItem = z.infer<typeof SkillspaceItemSchema>;

export const SkillspaceManifestSchema = z.object({
  version: z.literal("1.0.0").default("1.0.0"),
  exportedAt: z.string(),
  userIdentifier: z.string().default("anonymous-local"),
  skills: z.array(SkillSchema),
  collections: z.array(CollectionSchema),
});

export type SkillspaceManifest = z.infer<typeof SkillspaceManifestSchema>;
