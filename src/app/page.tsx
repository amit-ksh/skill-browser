import type { Metadata } from "next";
import { HomeClient } from "@/components/home/home-client";
import { staticSkillRepository } from "@/infrastructure/repositories/static-skill-repository";

export const metadata: Metadata = {
  title: "Skill library for ChatGPT",
  description:
    "Keep reusable skill prompts in one local library that ChatGPT can discover through WebMCP when you ask.",
};

export default async function HomePage() {
  const allSkills = await staticSkillRepository.listAllSkills();

  return <HomeClient initialSkills={allSkills} />;
}
