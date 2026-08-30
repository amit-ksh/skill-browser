import {
  ArrowRight,
  CheckCircle2,
  Compass,
  Database,
  ExternalLink,
  Layers,
  Lock,
  ShieldCheck,
  Terminal,
  Zap,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { SkillCard } from "@/components/skills/skill-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { staticSkillRepository } from "@/infrastructure/repositories/static-skill-repository";

export const metadata: Metadata = {
  title: "Skill Browser — WebMCP Skill Registry for AI Agents",
  description:
    "Discover, curate, and expose AI skills to browser-based AI agents via WebMCP. Zero paid backend, local-first IndexedDB, human-in-the-loop approval.",
};

export default async function HomePage() {
  const allSkills = await staticSkillRepository.listAllSkills();
  const featuredSkills = allSkills.slice(0, 6);

  return (
    <div className="space-y-16 py-4 max-w-6xl mx-auto">
      {/* 1. Hero Section */}
      <section className="relative text-center space-y-6 pt-6 pb-4">
        {/* Glow ambient background element */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-96 h-64 bg-[var(--accent)]/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-mono rounded-full bg-[var(--surface-elevated)] border border-[var(--border-strong)] text-[var(--text)] shadow-xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]" />
          </span>
          <span className="text-[var(--accent)] font-semibold">
            WebMCP Challenge 2026
          </span>
          <span className="text-[var(--text-subtle)]">•</span>
          <span>Browser AI Agent Registry</span>
        </div>

        <div className="space-y-4 max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[var(--text)] leading-tight">
            The Skill Registry for{" "}
            <span className="bg-gradient-to-r from-[var(--accent)] via-blue-400 to-teal-400 bg-clip-text text-transparent">
              Browser AI Agents
            </span>
          </h1>

          <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed max-w-2xl mx-auto">
            Discover verified AI skills, curate your personal Skillspace in
            browser IndexedDB, and expose it directly to AI agents via
            <code className="text-[var(--accent)] mx-1 font-mono text-xs px-1.5 py-0.5 bg-[var(--surface-elevated)] rounded border border-[var(--border)]">
              navigator.modelContext
            </code>
            . Zero paid APIs, local-first privacy, and human-in-the-loop
            security.
          </p>
        </div>

        {/* Hero Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link href="/skills">
            <Button
              size="lg"
              className="gap-2 text-sm font-semibold shadow-lg shadow-blue-500/10"
            >
              <Compass className="w-4 h-4" />
              <span>Explore 24+ Skills</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>

          <Link href="/simulator">
            <Button
              variant="secondary"
              size="lg"
              className="gap-2 text-sm font-semibold border-[var(--accent-border)] bg-[var(--surface-elevated)]"
            >
              <Zap className="w-4 h-4 text-[var(--accent)]" />
              <span>Launch Agent Simulator</span>
            </Button>
          </Link>

          <Link href="/me/skills">
            <Button variant="ghost" size="lg" className="gap-2 text-sm">
              <span>My Skillspace</span>
            </Button>
          </Link>
        </div>

        {/* Trust Badges Bar */}
        <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-[var(--text-subtle)]">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[var(--success)]" />
            <span>Zero-Paid Backend</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[var(--success)]" />
            <span>Local IndexedDB Persistence</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[var(--success)]" />
            <span>Human-in-the-Loop Gate</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[var(--success)]" />
            <span>W3C WebMCP v1 Standard</span>
          </div>
        </div>
      </section>

      {/* 2. WebMCP Live Code Demonstration */}
      <section className="p-6 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-lg)] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-3">
          <div className="space-y-0.5">
            <h2 className="text-sm font-bold text-[var(--text)] flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[var(--accent)]" />
              <span>How AI Agents Connect (WebMCP Protocol)</span>
            </h2>
            <p className="text-xs text-[var(--text-muted)]">
              Progressive disclosure eliminates prompt clutter and minimizes LLM
              context window cost.
            </p>
          </div>

          <Link href="/simulator">
            <Button
              variant="ghost"
              size="sm"
              className="gap-1.5 text-xs text-[var(--accent)]"
            >
              <span>Try Live in Simulator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="p-4 bg-[var(--surface-muted)] rounded-[var(--radius-md)] border border-[var(--border)] space-y-2 font-mono text-xs">
            <span className="text-[var(--text-subtle)]">
              # Step 1: Agent searches registry (Compact Summaries)
            </span>
            <div className="text-[var(--accent)]">
              await navigator.modelContext.callTool(&quot;search_skills&quot;,
              &#123;
            </div>
            <div className="text-[var(--text)] pl-4">
              query: &quot;Next.js App Router&quot;,
            </div>
            <div className="text-[var(--text)] pl-4">limit: 3</div>
            <div className="text-[var(--accent)]">&#125;);</div>

            <span className="text-[var(--text-subtle)] block pt-2">
              # Step 2: Agent fetches full instructions on-demand
            </span>
            <div className="text-[var(--success)]">
              await navigator.modelContext.callTool(&quot;get_skill&quot;,
              &#123;
            </div>
            <div className="text-[var(--text)] pl-4">
              id: &quot;nextjs-app-router-architect&quot;
            </div>
            <div className="text-[var(--success)]">&#125;);</div>
          </div>

          <div className="p-4 bg-[var(--surface-muted)] rounded-[var(--radius-md)] border border-[var(--border)] space-y-2 font-mono text-xs">
            <span className="text-[var(--text-subtle)]">
              # Step 3: Agent mutates Skillspace (Human Approval Guarded)
            </span>
            <div className="text-[var(--warning)]">
              await navigator.modelContext.callTool(&quot;install_skill&quot;,
              &#123;
            </div>
            <div className="text-[var(--text)] pl-4">
              id: &quot;ai-agent-evaluator&quot;
            </div>
            <div className="text-[var(--warning)]">&#125;);</div>

            <div className="p-2.5 bg-[var(--surface)] border border-[var(--border)] rounded text-[11px] text-[var(--text-muted)] mt-2">
              <span className="text-[var(--warning)] font-bold">🛡️ Result:</span>{" "}
              Browser displays interactive approval dialog. Mutation executes
              only after human clicks{" "}
              <span className="text-[var(--success)]">Approve</span>.
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Architectural Highlights */}
      <section className="space-y-4">
        <div className="text-center space-y-1">
          <h2 className="text-xl font-bold tracking-tight text-[var(--text)]">
            Architected for Modern Browser AI
          </h2>
          <p className="text-xs text-[var(--text-muted)]">
            Clean domain boundaries, zero telemetry leakage, and complete user
            sovereignty.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-[var(--surface)] border-[var(--border)]">
            <CardHeader className="p-5 pb-2 space-y-2">
              <div className="w-8 h-8 rounded-[var(--radius-md)] bg-[var(--accent-subtle)] text-[var(--accent)] flex items-center justify-center border border-[var(--accent-border)]">
                <Database className="w-4 h-4" />
              </div>
              <CardTitle className="text-sm font-semibold">
                Local-First Persistence
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-0 text-xs text-[var(--text-muted)] leading-relaxed">
              Your personal Skillspace and custom collections are stored in
              browser IndexedDB. No external servers or API keys required.
            </CardContent>
          </Card>

          <Card className="bg-[var(--surface)] border-[var(--border)]">
            <CardHeader className="p-5 pb-2 space-y-2">
              <div className="w-8 h-8 rounded-[var(--radius-md)] bg-[var(--warning-subtle)] text-[var(--warning)] flex items-center justify-center border border-[var(--warning-border)]">
                <Lock className="w-4 h-4" />
              </div>
              <CardTitle className="text-sm font-semibold">
                Human-in-the-Loop Gate
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-0 text-xs text-[var(--text-muted)] leading-relaxed">
              Agents cannot silently modify your Skillspace. State mutations are
              intercepted by an approval queue requiring explicit user consent.
            </CardContent>
          </Card>

          <Card className="bg-[var(--surface)] border-[var(--border)]">
            <CardHeader className="p-5 pb-2 space-y-2">
              <div className="w-8 h-8 rounded-[var(--radius-md)] bg-[var(--success-subtle)] text-[var(--success)] flex items-center justify-center border border-[var(--success-border)]">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <CardTitle className="text-sm font-semibold">
                Zero Arbitrary Eval
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-0 text-xs text-[var(--text-muted)] leading-relaxed">
              Skills are treated as untrusted prompt data. Instructions are
              strictly sanitized markdown without executable code or script
              injection.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 4. Featured Skills Showcase */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h2 className="text-lg font-bold tracking-tight text-[var(--text)]">
              Featured Verified Skills
            </h2>
            <p className="text-xs text-[var(--text-muted)]">
              Hand-crafted, battle-tested AI skills ready for instant
              installation.
            </p>
          </div>

          <Link href="/skills">
            <Button variant="outline" size="sm" className="gap-1.5 text-xs">
              <span>View All 24+ Skills</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredSkills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      </section>

      {/* 5. Public Curated Showcases */}
      <section className="p-6 bg-[var(--surface-muted)] border border-[var(--border)] rounded-[var(--radius-lg)] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="space-y-1">
            <h2 className="text-sm font-bold text-[var(--text)] flex items-center gap-2">
              <Layers className="w-4 h-4 text-[var(--accent)]" />
              <span>Public Skillspace Profiles</span>
            </h2>
            <p className="text-xs text-[var(--text-muted)]">
              Share your curated Skillspace with other agents or clone a team
              stack with one click.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link
            href="/space/nextjs-architect"
            className="p-3 bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)] rounded-[var(--radius-md)] transition-all group block"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[var(--text)] group-hover:text-[var(--accent)]">
                @nextjs-architect
              </span>
              <ExternalLink className="w-3 h-3 text-[var(--text-subtle)]" />
            </div>
            <p className="text-[11px] text-[var(--text-muted)] line-clamp-1 mt-1">
              Next.js 16, React 19, TypeScript strict mode
            </p>
          </Link>

          <Link
            href="/space/agent-engineer"
            className="p-3 bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)] rounded-[var(--radius-md)] transition-all group block"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[var(--text)] group-hover:text-[var(--accent)]">
                @agent-engineer
              </span>
              <ExternalLink className="w-3 h-3 text-[var(--text-subtle)]" />
            </div>
            <p className="text-[11px] text-[var(--text-muted)] line-clamp-1 mt-1">
              WebMCP tools, AI evaluation, Prompt engineering
            </p>
          </Link>

          <Link
            href="/space/growth-lead"
            className="p-3 bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)] rounded-[var(--radius-md)] transition-all group block"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[var(--text)] group-hover:text-[var(--accent)]">
                @growth-lead
              </span>
              <ExternalLink className="w-3 h-3 text-[var(--text-subtle)]" />
            </div>
            <p className="text-[11px] text-[var(--text-muted)] line-clamp-1 mt-1">
              Technical SEO, conversion copy, market research
            </p>
          </Link>
        </div>
      </section>

      {/* 6. Footer */}
      <footer className="pt-8 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[var(--text-subtle)]">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[var(--accent)]" />
          <span className="text-[var(--text)] font-semibold">
            Skill Browser
          </span>
          <span>•</span>
          <span>WebMCP Challenge Edition</span>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/skills"
            className="hover:text-[var(--text)] transition-colors"
          >
            Registry
          </Link>
          <Link
            href="/me/skills"
            className="hover:text-[var(--text)] transition-colors"
          >
            Skillspace
          </Link>
          <Link
            href="/simulator"
            className="hover:text-[var(--text)] transition-colors"
          >
            Simulator
          </Link>
        </div>
      </footer>
    </div>
  );
}
