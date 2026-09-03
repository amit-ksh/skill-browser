import {
  type Skill,
  type SkillCatalogResponse,
  SkillCatalogResponseSchema,
  SkillSchema,
} from "@/contracts";

type CatalogRequest = {
  page: number;
  perPage: number;
  query?: string;
  signal?: AbortSignal;
};

async function getErrorMessage(response: Response, fallback: string) {
  const body = (await response.json().catch(() => null)) as {
    message?: string;
  } | null;
  return body?.message || fallback;
}

export async function getSkillCatalog({
  page,
  perPage,
  query,
  signal,
}: CatalogRequest): Promise<SkillCatalogResponse> {
  const params = new URLSearchParams({
    page: String(page),
    perPage: String(perPage),
  });
  if (query && query.length >= 2) params.set("q", query);

  const response = await fetch(`/api/skills-sh?${params.toString()}`, {
    signal,
  });
  if (!response.ok) {
    throw new Error(
      await getErrorMessage(response, "The live catalog is unavailable."),
    );
  }

  const parsed = SkillCatalogResponseSchema.safeParse(await response.json());
  if (!parsed.success) {
    throw new Error("The live catalog returned an invalid response.");
  }
  return parsed.data;
}

export async function getRegistrySkill(
  registryId: string,
  signal?: AbortSignal,
): Promise<Skill> {
  const params = new URLSearchParams({ id: registryId });
  const response = await fetch(`/api/skills-sh?${params.toString()}`, {
    signal,
  });
  if (!response.ok) {
    throw new Error(
      await getErrorMessage(
        response,
        "Could not load this skill from skills.sh.",
      ),
    );
  }

  const parsed = SkillSchema.safeParse(await response.json());
  if (!parsed.success) {
    throw new Error("skills.sh returned an invalid skill file.");
  }
  return parsed.data;
}
