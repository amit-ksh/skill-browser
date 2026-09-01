import type { Metadata } from "next";
import { HomeClient } from "@/components/home/home-client";
import { staticSkillRepository } from "@/infrastructure/repositories/static-skill-repository";

export const metadata: Metadata = {
  title: "Your personal skill space for AI",
  description:
    "Give AI the skills it needs to do the job, with a personal skill space powered by WebMCP.",
};

export default async function HomePage() {
  const allSkills = await staticSkillRepository.listAllSkills();

  return <HomeClient initialSkills={allSkills} />;
}
