"use client";

import {
  ArrowLeft,
  Bot,
  CheckCircle2,
  ExternalLink,
  FileCode,
  Globe,
  Scale,
  ShieldCheck,
  User,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Skill } from "@/contracts";
import { MarkdownViewer } from "./markdown-viewer";
import { SkillInstallButton } from "./skill-install-button";

export function SkillDetailView({ skill }: { skill: Skill }) {
  const verificationBadges = {
    verified: (
      <Badge variant="success" size="md" className="gap-1.5">
        <ShieldCheck className="w-3.5 h-3.5" />
        Verified Skill
      </Badge>
    ),
    community: (
      <Badge variant="neutral" size="md">
        Community Contributed
      </Badge>
    ),
    unverified: (
      <Badge variant="outline" size="md">
        Unverified
      </Badge>
    ),
    custom: (
      <Badge variant="accent" size="md">
        Custom Imported
      </Badge>
    ),
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Back link */}
      <div>
        <Link
          href="/skills"
          className="inline-flex items-center gap-1.5 text-xs text-[var(--text-subtle)] hover:text-[var(--text)] transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Registry</span>
        </Link>
      </div>

      {/* Main Header Card */}
      <div className="p-6 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-lg)] space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono font-medium text-[var(--accent)] uppercase tracking-wider">
                {skill.category.replace("-", " ")}
              </span>
              <span className="text-[var(--text-subtle)]">•</span>
              {verificationBadges[skill.verificationStatus]}
              <Badge variant="outline" size="sm">
                v{skill.version}
              </Badge>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text)]">
              {skill.name}
            </h1>

            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              {skill.description}
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <SkillInstallButton
              skill={skill}
              fullSkill={skill}
              size="md"
              className="h-10 px-5"
            />
          </div>
        </div>

        {/* Quick Meta Stats Row */}
        <div className="pt-4 border-t border-[var(--border-subtle)] grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div className="space-y-1">
            <span className="text-[var(--text-subtle)] block">Author</span>
            <span className="text-[var(--text)] flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[var(--text-subtle)]" />
              {skill.author}
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-[var(--text-subtle)] block">License</span>
            <span className="text-[var(--text)] flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-[var(--text-subtle)]" />
              {skill.license}
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-[var(--text-subtle)] block">Source</span>
            {skill.sourceUrl ? (
              <a
                href={skill.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)] hover:underline flex items-center gap-1 truncate"
              >
                <Globe className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Repository</span>
                <ExternalLink className="w-3 h-3 shrink-0" />
              </a>
            ) : (
              <span className="text-[var(--text-subtle)]">Local</span>
            )}
          </div>

          <div className="space-y-1">
            <span className="text-[var(--text-subtle)] block">
              Compatibility
            </span>
            <span className="text-[var(--success)] flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              WebMCP v1
            </span>
          </div>
        </div>
      </div>

      {/* Detail Tabs */}
      <Tabs defaultValue="instructions" className="space-y-6">
        <TabsList className="bg-[var(--surface-elevated)] p-1">
          <TabsTrigger value="instructions" className="gap-2">
            <FileCode className="w-3.5 h-3.5" />
            <span>Instructions & Prompts</span>
          </TabsTrigger>
          <TabsTrigger value="agent-integration" className="gap-2">
            <Bot className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>WebMCP Agent Schema</span>
          </TabsTrigger>
          <TabsTrigger value="provenance" className="gap-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Trust & Integrity</span>
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Full Instructions */}
        <TabsContent value="instructions" className="space-y-6">
          <Card>
            <CardHeader className="pb-3 border-b border-[var(--border-subtle)]">
              <CardTitle className="text-sm font-mono uppercase text-[var(--text-subtle)]">
                Skill Instruction Manifest
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-4">
              <MarkdownViewer content={skill.instructions} />
            </CardContent>
          </Card>

          {/* References */}
          {skill.references.length > 0 && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-mono uppercase text-[var(--text-subtle)]">
                  External References & Documentation
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-1">
                <ul className="space-y-1.5 text-xs">
                  {skill.references.map((ref) => (
                    <li key={ref}>
                      <a
                        href={ref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--accent)] hover:underline flex items-center gap-1.5"
                      >
                        <ExternalLink className="w-3 h-3 shrink-0" />
                        <span>{ref}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Tab 2: WebMCP Integration Guide */}
        <TabsContent value="agent-integration" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Bot className="w-4 h-4 text-[var(--accent)]" />
                How AI Agents Consume This Skill via WebMCP
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-xs text-[var(--text-muted)]">
              <p>
                When a user visits Skill Browser in a WebMCP-compatible browser
                (e.g. ChatGPT in-app browser or Chrome WebMCP trial), the
                browser agent uses progressive disclosure to discover and invoke
                this skill:
              </p>

              <div className="p-3 bg-[var(--surface-muted)] border border-[var(--border)] rounded-[var(--radius-md)] space-y-2 font-mono">
                <div className="text-[var(--text-subtle)]">
                  # 1. Agent queries Skillspace metadata
                </div>
                <div className="text-[var(--text)]">
                  navigator.modelContext.callTool(&quot;get_skill_metadata&quot;,
                  &#123; id: &quot;{skill.id}&quot; &#125;)
                </div>
                <div className="text-[var(--text-subtle)] pt-2">
                  # 2. Agent retrieves full instructions on demand
                </div>
                <div className="text-[var(--accent)]">
                  navigator.modelContext.callTool(&quot;get_skill&quot;, &#123;
                  id: &quot;{skill.id}&quot; &#125;)
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {skill.compatibility.map((runtime) => (
                  <Badge key={runtime} variant="outline" size="sm">
                    {runtime}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 3: Provenance & Integrity */}
        <TabsContent value="provenance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold">
                Security & Provenance Audit
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-xs text-[var(--text-muted)]">
              <div className="space-y-2">
                <div className="flex justify-between py-2 border-b border-[var(--border-subtle)]">
                  <span className="font-mono text-[var(--text-subtle)]">
                    Stable Identifier:
                  </span>
                  <span className="font-mono text-[var(--text)]">
                    {skill.id}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-[var(--border-subtle)]">
                  <span className="font-mono text-[var(--text-subtle)]">
                    Verification Status:
                  </span>
                  <span className="font-mono text-[var(--success)] uppercase">
                    {skill.verificationStatus}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-[var(--border-subtle)]">
                  <span className="font-mono text-[var(--text-subtle)]">
                    Integrity Hash:
                  </span>
                  <span className="font-mono text-[var(--text-subtle)] truncate max-w-xs">
                    {skill.integrityHash || "computed-at-publish"}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-mono text-[var(--text-subtle)]">
                    Execution Guard:
                  </span>
                  <span className="font-mono text-[var(--text)]">
                    Static Markdown Instruction (Zero Arbitrary Eval)
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
