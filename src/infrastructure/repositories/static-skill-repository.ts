import type {
  Category,
  SearchSkillsInput,
  SearchSkillsResult,
  Skill,
  SkillId,
  SkillSummary,
} from "@/contracts";
import type { SkillRepository } from "@/domain/repositories/skill-repository";
import { SEED_SKILLS } from "@/infrastructure/data/seed-skills";

export class StaticSkillRepository implements SkillRepository {
  private skills: Skill[];

  constructor(initialSkills: Skill[] = SEED_SKILLS) {
    this.skills = [...initialSkills];
  }

  async search(
    input: SearchSkillsInput,
  ): Promise<SearchSkillsResult<SkillSummary>> {
    const { query, category, tag, agent, officialOnly, sortBy, limit, offset } =
      input;
    const cleanQuery = query.toLowerCase().trim();

    const filtered = this.skills.filter((skill) => {
      // Category filter
      if (category !== "all" && skill.category !== category) {
        return false;
      }

      // Tag filter
      if (
        tag &&
        !skill.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
      ) {
        return false;
      }

      // Agent compatibility filter
      if (agent && agent !== "all") {
        const agentLower = agent.toLowerCase();
        const hasAgent = skill.compatibility.some((c) =>
          c.toLowerCase().includes(agentLower),
        );
        if (!hasAgent) return false;
      }

      // Official only filter
      if (officialOnly && !skill.isOfficial) {
        return false;
      }

      // Text query match & natural language intent
      if (cleanQuery.length > 0) {
        const queryTerms = cleanQuery.split(/\s+/).filter(Boolean);
        const nameMatch = queryTerms.every((term) =>
          skill.name.toLowerCase().includes(term),
        );
        const descMatch = queryTerms.every((term) =>
          skill.description.toLowerCase().includes(term),
        );
        const tagMatch = skill.tags.some((t) =>
          queryTerms.some((term) => t.toLowerCase().includes(term)),
        );
        const authorMatch = queryTerms.some((term) =>
          skill.author.toLowerCase().includes(term),
        );
        const repoMatch = skill.repo
          ? queryTerms.some((term) => skill.repo?.toLowerCase().includes(term))
          : false;
        const publisherMatch = skill.publisher
          ? queryTerms.some((term) =>
              skill.publisher?.toLowerCase().includes(term),
            )
          : false;
        const instructionMatch = queryTerms.every((term) =>
          skill.instructions.toLowerCase().includes(term),
        );

        if (
          !nameMatch &&
          !descMatch &&
          !tagMatch &&
          !authorMatch &&
          !repoMatch &&
          !publisherMatch &&
          !instructionMatch
        ) {
          return false;
        }
      }

      return true;
    });

    // Ranking & Sorting
    filtered.sort((a, b) => {
      if (cleanQuery.length > 0 && sortBy === "relevance") {
        // Compute relevance score
        const scoreA = this.calculateRelevance(a, cleanQuery);
        const scoreB = this.calculateRelevance(b, cleanQuery);
        if (scoreB !== scoreA) return scoreB - scoreA;
      }

      if (sortBy === "installs") return b.installs - a.installs;
      if (sortBy === "trending") return b.weeklyInstalls - a.weeklyInstalls;
      if (sortBy === "name-asc") return a.name.localeCompare(b.name);
      if (sortBy === "name-desc") return b.name.localeCompare(a.name);
      if (sortBy === "newest")
        return (
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );

      // Default to highest installs
      return b.installs - a.installs;
    });

    const total = filtered.length;
    const paged = filtered.slice(offset, offset + limit);

    // Map to SkillSummary
    const items: SkillSummary[] = paged.map((skill) => ({
      id: skill.id,
      name: skill.name,
      description: skill.description,
      version: skill.version,
      category: skill.category,
      tags: skill.tags,
      author: skill.author,
      repo: skill.repo,
      installs: skill.installs,
      weeklyInstalls: skill.weeklyInstalls,
      growthRate: skill.growthRate,
      isOfficial: skill.isOfficial,
      publisher: skill.publisher,
      sourceType: skill.sourceType,
      sourceUrl: skill.sourceUrl,
      verificationStatus: skill.verificationStatus,
      updatedAt: skill.updatedAt,
    }));

    return {
      items,
      total,
      query,
      category,
      hasMore: offset + limit < total,
    };
  }

  async get(id: SkillId): Promise<Skill | null> {
    const found = this.skills.find((s) => s.id === id);
    return found ? { ...found } : null;
  }

  async listCategories(): Promise<Category[]> {
    const categoryMap = new Map<string, number>();
    for (const skill of this.skills) {
      categoryMap.set(
        skill.category,
        (categoryMap.get(skill.category) || 0) + 1,
      );
    }

    const categories: Category[] = [
      {
        id: "software-development",
        name: "Software Development",
        description: "Core coding, frameworks, and agent workflows",
        skillCount: categoryMap.get("software-development") || 0,
      },
      {
        id: "design",
        name: "Design & UI",
        description: "Design systems, tokens, CSS, and accessibility",
        skillCount: categoryMap.get("design") || 0,
      },
      {
        id: "research",
        name: "Research & Evals",
        description:
          "Paper analysis, benchmarking, and architectural evaluation",
        skillCount: categoryMap.get("research") || 0,
      },
      {
        id: "marketing",
        name: "Marketing & Growth",
        description: "SEO, developer relations, and product positioning",
        skillCount: categoryMap.get("marketing") || 0,
      },
      {
        id: "productivity",
        name: "Productivity",
        description: "Context optimization, ticket generation, and changelogs",
        skillCount: categoryMap.get("productivity") || 0,
      },
      {
        id: "writing",
        name: "Technical Writing",
        description: "RFCs, API docs, and developer tutorials",
        skillCount: categoryMap.get("writing") || 0,
      },
    ];

    return categories;
  }

  async listAllSkills(): Promise<Skill[]> {
    return [...this.skills];
  }

  private calculateRelevance(skill: Skill, query: string): number {
    let score = 0;
    const q = query.toLowerCase();
    const nameLower = skill.name.toLowerCase();
    const descLower = skill.description.toLowerCase();

    if (nameLower === q) score += 100;
    else if (nameLower.startsWith(q)) score += 60;
    else if (nameLower.includes(q)) score += 40;

    if (skill.tags.some((t) => t.toLowerCase() === q)) score += 35;
    else if (skill.tags.some((t) => t.toLowerCase().includes(q))) score += 20;

    if (descLower.includes(q)) score += 15;
    if (skill.author.toLowerCase().includes(q)) score += 10;
    if (skill.repo?.toLowerCase().includes(q)) score += 15;
    if (skill.verificationStatus === "verified") score += 5;
    if (skill.isOfficial) score += 10;

    return score;
  }
}

// Global singleton instance for app services
export const staticSkillRepository = new StaticSkillRepository();
