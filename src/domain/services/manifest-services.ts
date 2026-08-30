import { type Skill, SkillSchema } from "@/contracts";
import { indexedDbSkillspaceRepository } from "@/infrastructure/repositories/indexeddb-skillspace-repository";
import { staticSkillRepository } from "@/infrastructure/repositories/static-skill-repository";

export interface PublicSkillspaceProfile {
  handle: string;
  name: string;
  bio: string;
  avatarUrl?: string;
  verified: boolean;
  skills: Skill[];
  collections: {
    id: string;
    name: string;
    description?: string;
    skillIds: string[];
  }[];
}

export async function getPublicSkillspace(
  handle: string,
): Promise<PublicSkillspaceProfile | null> {
  const cleanHandle = handle.replace(/^@/, "").toLowerCase();
  const allSkills = await staticSkillRepository.listAllSkills();

  // Curated showcase profiles
  const profiles: Record<string, Omit<PublicSkillspaceProfile, "skills">> = {
    "nextjs-architect": {
      handle: "nextjs-architect",
      name: "Next.js Core Architecture Team",
      bio: "Official curated skills for Next.js App Router, React 19, TypeScript strict mode, and full-stack API design.",
      verified: true,
      collections: [
        {
          id: "frontend-core",
          name: "Modern Web Stack",
          description: "Essential patterns for Next.js 16 and Tailwind CSS.",
          skillIds: [
            "nextjs-app-router-architect",
            "typescript-strict-engineer",
            "tailwind-css-tokens",
            "react-server-components",
          ],
        },
      ],
    },
    "agent-engineer": {
      handle: "agent-engineer",
      name: "Browser AI Specialist",
      bio: "Workflows and prompt guidelines for developing WebMCP browser agents, tool registries, and safe client evaluations.",
      verified: true,
      collections: [
        {
          id: "agent-stack",
          name: "Agentic Tooling",
          description: "Browser MCP and Autonomous AI tools.",
          skillIds: [
            "webmcp-browser-integration",
            "ai-agent-evaluator",
            "prompt-engineering-standard",
          ],
        },
      ],
    },
    "growth-lead": {
      handle: "growth-lead",
      name: "Product & Growth Operations",
      bio: "Conversion optimization, technical copywriting, and research skills for autonomous growth loops.",
      verified: false,
      collections: [
        {
          id: "growth-suite",
          name: "Marketing Ops",
          description: "SEO, copywriting, and market research skills.",
          skillIds: [
            "seo-technical-audit",
            "growth-copywriting-engine",
            "deep-research-analyst",
          ],
        },
      ],
    },
  };

  const profile = profiles[cleanHandle];
  if (!profile) {
    // If not in presets, create a dynamically curated view using matching skills
    const matching = allSkills.slice(0, 4);
    return {
      handle: cleanHandle,
      name: `@${cleanHandle}'s Skillspace`,
      bio: "Curated AI skills shared from a local browser Skillspace.",
      verified: false,
      skills: matching,
      collections: [
        {
          id: "shared-skills",
          name: "Shared Skills",
          description: "Imported skills collection",
          skillIds: matching.map((s) => s.id),
        },
      ],
    };
  }

  // Populate actual skill objects
  const skillIds = profile.collections.flatMap((c) => c.skillIds);
  const matchedSkills = allSkills.filter((s) => skillIds.includes(s.id));

  return {
    ...profile,
    skills: matchedSkills,
  };
}

export async function cloneSkillspaceToLocal(
  skills: Skill[],
  collections?: {
    id: string;
    name: string;
    description?: string;
    skillIds: string[];
  }[],
): Promise<number> {
  let count = 0;
  for (const skill of skills) {
    const valid = SkillSchema.safeParse(skill);
    if (valid.success) {
      await indexedDbSkillspaceRepository.addSkill(valid.data);
      count++;
    }
  }

  if (collections) {
    for (const col of collections) {
      await indexedDbSkillspaceRepository.createCollection(
        col.name,
        col.description,
      );
    }
  }

  return count;
}
