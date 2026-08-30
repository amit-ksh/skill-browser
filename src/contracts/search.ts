import { z } from "zod";
import { CategoryIdSchema } from "./skill";

export const SortOptionSchema = z.enum([
  "relevance",
  "name-asc",
  "name-desc",
  "newest",
]);
export type SortOption = z.infer<typeof SortOptionSchema>;

export const SearchSkillsInputSchema = z.object({
  query: z.string().max(200).default(""),
  category: CategoryIdSchema.or(z.literal("all")).default("all"),
  tag: z.string().max(50).optional(),
  sortBy: SortOptionSchema.default("relevance"),
  limit: z.number().int().min(1).max(100).default(50),
  offset: z.number().int().min(0).default(0),
});

export type SearchSkillsInput = z.infer<typeof SearchSkillsInputSchema>;

export const SearchSkillsResultSchema = z.object({
  items: z.array(z.unknown()),
  total: z.number().int().nonnegative(),
  query: z.string(),
  category: z.string(),
  hasMore: z.boolean(),
});

export type SearchSkillsResult<T> = {
  items: T[];
  total: number;
  query: string;
  category: string;
  hasMore: boolean;
};
