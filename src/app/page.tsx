import type { Metadata } from "next";
import { HomeClient } from "@/components/home/home-client";
import { staticSkillRepository } from "@/infrastructure/repositories/static-skill-repository";

export const metadata: Metadata = {
  title: "Give AI the skills to get the job done",
  description:
    "Browse agent skills, save a personal Skillspace, and make the right instructions available to AI through WebMCP.",
};

export default async function HomePage() {
  const allSkills = await staticSkillRepository.listAllSkills();

  return <HomeClient initialSkills={allSkills} />;
}
