"use client";

import { Check, Plus, Trash2 } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import type { Skill, SkillSummary } from "@/contracts";
import { useSkillspace } from "@/domain/hooks/use-skillspace";

export interface SkillInstallButtonProps extends Omit<ButtonProps, "onClick"> {
  skill: SkillSummary | Skill;
  fullSkill?: Skill;
  showRemoveOption?: boolean;
}

export function SkillInstallButton({
  skill,
  fullSkill,
  showRemoveOption = false,
  variant = "primary",
  size = "sm",
  className,
  ...props
}: SkillInstallButtonProps) {
  const { isInstalled, installSkill, removeSkill } = useSkillspace();
  const { success, info } = useToast();
  const [isHovered, setIsHovered] = useState(false);

  const installed = isInstalled(skill.id);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (installed) {
      if (showRemoveOption) {
        void removeSkill(skill.id);
        info(`Removed "${skill.name}" from your Skillspace`);
      }
    } else {
      // Build skill payload if only summary is passed
      const skillToInstall: Skill =
        fullSkill ||
        ("instructions" in skill
          ? (skill as Skill)
          : {
              ...skill,
              instructions: `# ${skill.name}\n\n${skill.description}`,
              references: [],
              compatibility: ["WebMCP v1", "Claude Code", "Cursor"],
              license: "MIT",
            });

      void installSkill(skillToInstall);
      success(`Added "${skill.name}" to your Skillspace`);
    }
  };

  if (installed) {
    if (showRemoveOption && isHovered) {
      return (
        <Button
          variant="danger"
          size={size}
          onClick={handleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={className}
          {...props}
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Remove</span>
        </Button>
      );
    }

    return (
      <Button
        variant="secondary"
        size={size}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={className}
        {...props}
      >
        <Check className="w-3.5 h-3.5 text-[var(--success)]" />
        <span>In Skillspace</span>
      </Button>
    );
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      className={className}
      {...props}
    >
      <Plus className="w-3.5 h-3.5" />
      <span>Add</span>
    </Button>
  );
}
