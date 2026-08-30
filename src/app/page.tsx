import { ArrowRight, Bot, Compass, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="space-y-12 py-4">
      {/* Hero Section */}
      <section className="space-y-6 max-w-3xl">
        <div className="flex items-center gap-2">
          <Badge variant="accent" size="md">
            WebMCP Challenge
          </Badge>
          <span className="text-xs font-mono text-[var(--text-subtle)]">
            Browser-Native AI Integration
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--text)] leading-tight">
          Curate skills for humans. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-[var(--info)]">
            Expose them to AI agents.
          </span>
        </h1>

        <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed max-w-2xl">
          Skill Browser is a decentralized, local-first skill discovery registry
          and personal Skillspace. Browse human-curated AI skills and let
          browser-based agents seamlessly discover, inspect, and invoke them via
          standard WebMCP tools.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Link href="/skills">
            <Button size="lg" className="gap-2">
              <Compass className="w-4 h-4" />
              Explore Skills
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
          <Link href="/me/skills">
            <Button variant="secondary" size="lg" className="gap-2">
              <Bot className="w-4 h-4 text-[var(--accent)]" />
              Open My Skillspace
            </Button>
          </Link>
        </div>
      </section>

      {/* 3 Value Pillars */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:border-[var(--border-strong)]">
          <CardHeader>
            <div className="w-8 h-8 rounded-[var(--radius-sm)] bg-[var(--accent-subtle)] text-[var(--accent)] flex items-center justify-center mb-2">
              <Compass className="w-4 h-4" />
            </div>
            <CardTitle>Curated Registry</CardTitle>
            <CardDescription>
              Search, filter, and inspect verified AI skills across Software
              Development, Design, Research, and Productivity.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="hover:border-[var(--border-strong)]">
          <CardHeader>
            <div className="w-8 h-8 rounded-[var(--radius-sm)] bg-[var(--info-subtle)] text-[var(--info)] flex items-center justify-center mb-2">
              <Zap className="w-4 h-4" />
            </div>
            <CardTitle>WebMCP Powered</CardTitle>
            <CardDescription>
              Browser agents discover your installed skills via{" "}
              <code className="text-[var(--text)]">navigator.modelContext</code>{" "}
              with progressive disclosure.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="hover:border-[var(--border-strong)]">
          <CardHeader>
            <div className="w-8 h-8 rounded-[var(--radius-sm)] bg-[var(--success-subtle)] text-[var(--success)] flex items-center justify-center mb-2">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <CardTitle>Human-in-the-Loop</CardTitle>
            <CardDescription>
              Safe-by-design: Agent mutations always require explicit user
              confirmation. Zero silent changes, zero arbitrary code execution.
            </CardDescription>
          </CardHeader>
        </Card>
      </section>
    </div>
  );
}
