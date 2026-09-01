import type { CategoryId, Skill, SkillSummary } from "@/contracts";
import {
  type SkillsShCatalogItem,
  SkillsShDetailResponseSchema,
  SkillsShListResponseSchema,
  SkillsShSearchResponseSchema,
} from "@/contracts";
import { urlSkillImporter } from "@/infrastructure/importers/url-skill-importer";

const SKILLS_SH_API_URL = "https://skills.sh/api/v1/skills";
const REQUEST_TIMEOUT_MS = 8_000;

export class SkillsShCatalogError extends Error {
  constructor(
    message: string,
    public readonly status = 502,
  ) {
    super(message);
    this.name = "SkillsShCatalogError";
  }
}

function createStableHash(value: string): string {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(36);
}

function createLocalSkillId(registryId: string): string {
  const slug = registryId
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(-44);
  return `skills-sh-${slug}-${createStableHash(registryId)}`.slice(0, 64);
}

function inferCategory(item: SkillsShCatalogItem): CategoryId {
  const text = `${item.name} ${item.slug} ${item.source}`.toLowerCase();

  if (/design|frontend|ui|ux|figma|css/.test(text)) return "design";
  if (/research|paper|science|academic|benchmark|eval/.test(text)) {
    return "research";
  }
  if (/marketing|seo|growth|content|social/.test(text)) return "marketing";
  if (/write|writing|docs|documentation|copy/.test(text)) return "writing";
  if (/productivity|workflow|project|task|planning/.test(text)) {
    return "productivity";
  }
  if (/code|dev|git|react|next|api|database|test|security|cloud/.test(text)) {
    return "software-development";
  }

  return "other";
}

function mapCatalogItem(item: SkillsShCatalogItem): SkillSummary {
  const owner = item.source.split("/")[0] || item.source;

  return {
    id: createLocalSkillId(item.id),
    registryId: item.id,
    name: item.name,
    description:
      item.description ||
      `Reusable agent instructions from ${item.source}. Review the source before adding this skill.`,
    version: item.version || "latest",
    category: inferCategory(item),
    tags: item.tags || ["skills.sh", item.sourceType],
    author: owner,
    repo: item.source,
    installs: item.installs,
    weeklyInstalls: 0,
    growthRate: 0,
    isOfficial: false,
    sourceType: item.sourceType === "github" ? "github" : "registry",
    sourceUrl: item.url,
    verificationStatus: "community",
    updatedAt: new Date().toISOString(),
  };
}

function validateRegistryId(registryId: string): string[] {
  if (registryId.length > 240 || !/^[a-zA-Z0-9._/-]+$/.test(registryId)) {
    throw new SkillsShCatalogError("Invalid skills.sh skill ID.", 400);
  }

  const segments = registryId.split("/");
  if (
    segments.length < 2 ||
    segments.some((segment) => !segment || segment === "." || segment === "..")
  ) {
    throw new SkillsShCatalogError("Invalid skills.sh skill ID.", 400);
  }

  return segments;
}

async function fetchSkillsSh(url: URL, token: string): Promise<unknown> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      signal: controller.signal,
      cache: "no-store",
    });

    if (!response.ok) {
      throw new SkillsShCatalogError(
        response.status === 401
          ? "skills.sh authentication is unavailable."
          : `skills.sh returned HTTP ${response.status}.`,
        response.status,
      );
    }

    return response.json();
  } catch (error) {
    if (error instanceof SkillsShCatalogError) throw error;
    if (error instanceof Error && error.name === "AbortError") {
      throw new SkillsShCatalogError("skills.sh did not respond in time.", 504);
    }
    throw new SkillsShCatalogError("Could not reach the skills.sh catalog.");
  } finally {
    clearTimeout(timeoutId);
  }
}

export class SkillsShSkillRepository {
  async list(
    token: string,
    input: { query?: string; page: number; perPage: number },
  ): Promise<{
    items: SkillSummary[];
    total: number;
    page: number;
    perPage: number;
    hasMore: boolean;
    source: "skills.sh";
  }> {
    const query = input.query?.trim();

    if (query && query.length >= 2) {
      const url = new URL(`${SKILLS_SH_API_URL}/search`);
      url.searchParams.set("q", query);
      url.searchParams.set("limit", String(Math.min(input.perPage, 200)));
      const raw = await fetchSkillsSh(url, token);
      const parsed = SkillsShSearchResponseSchema.parse(raw);

      return {
        items: parsed.data
          .filter((item) => !item.isDuplicate)
          .map(mapCatalogItem),
        total: parsed.count,
        page: 0,
        perPage: input.perPage,
        hasMore: false,
        source: "skills.sh",
      };
    }

    const url = new URL(SKILLS_SH_API_URL);
    url.searchParams.set("view", "all-time");
    url.searchParams.set("page", String(input.page));
    url.searchParams.set("per_page", String(input.perPage));
    const raw = await fetchSkillsSh(url, token);
    const parsed = SkillsShListResponseSchema.parse(raw);

    return {
      items: parsed.data
        .filter((item) => !item.isDuplicate)
        .map(mapCatalogItem),
      total: parsed.pagination.total,
      page: parsed.pagination.page,
      perPage: parsed.pagination.perPage,
      hasMore: parsed.pagination.hasMore,
      source: "skills.sh",
    };
  }

  async get(token: string, registryId: string): Promise<Skill> {
    const segments = validateRegistryId(registryId);
    const url = new URL(
      `${SKILLS_SH_API_URL}/${segments.map(encodeURIComponent).join("/")}`,
    );
    const raw = await fetchSkillsSh(url, token);
    const detail = SkillsShDetailResponseSchema.parse(raw);
    const skillFile = detail.files.find(
      (file) => file.path.toLowerCase() === "skill.md",
    );

    if (!skillFile) {
      throw new SkillsShCatalogError(
        "This skills.sh entry does not include a SKILL.md file.",
        422,
      );
    }

    const sourceUrl = `https://skills.sh/${detail.id}`;
    const parsed = urlSkillImporter.parseRawContent(
      skillFile.contents,
      sourceUrl,
    ).skill;
    const owner = detail.source.split("/")[0] || detail.source;

    return {
      ...parsed,
      id: createLocalSkillId(detail.id),
      registryId: detail.id,
      name: parsed.name || detail.slug,
      author: parsed.author === "External Import" ? owner : parsed.author,
      repo: detail.source,
      installs: detail.installs,
      sourceType: detail.source.includes("/") ? "github" : "registry",
      sourceUrl,
      verificationStatus: "community",
      integrityHash: detail.hash || parsed.integrityHash,
    };
  }
}

export const skillsShSkillRepository = new SkillsShSkillRepository();
