import type { MetadataRoute } from "next";
import { staticSkillRepository } from "@/infrastructure/repositories/static-skill-repository";

const BASE_URL = "https://skillbrowser.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allSkills = await staticSkillRepository.listAllSkills();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/skills`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/me/skills`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/simulator`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/space/nextjs-architect`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/space/agent-engineer`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/space/growth-lead`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  const skillRoutes: MetadataRoute.Sitemap = allSkills.map((skill) => ({
    url: `${BASE_URL}/skills/${skill.id}`,
    lastModified: new Date(skill.updatedAt || Date.now()),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...skillRoutes];
}
