import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SkillDetailView } from "@/components/skills/skill-detail-view";
import { staticSkillRepository } from "@/infrastructure/repositories/static-skill-repository";

export async function generateStaticParams() {
  const allSkills = await staticSkillRepository.listAllSkills();
  return allSkills.map((skill) => ({
    id: skill.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const skill = await staticSkillRepository.get(id);

  if (!skill) {
    return {
      title: "Skill Not Found — Skill Browser",
    };
  }

  return {
    title: `${skill.name} — Skill Browser`,
    description: skill.description,
  };
}

export default async function SkillDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const skill = await staticSkillRepository.get(id);

  if (!skill) {
    notFound();
  }

  return <SkillDetailView skill={skill} />;
}
