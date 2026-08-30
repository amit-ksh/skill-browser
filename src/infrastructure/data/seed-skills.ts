import type { Skill } from "@/contracts";

export const SEED_SKILLS: Skill[] = [
  {
    id: "nextjs-app-router-architect",
    name: "Next.js App Router Architect",
    description:
      "Expert patterns for Next.js Server Components, Server Actions, route handlers, and streaming architectures.",
    version: "1.4.0",
    category: "software-development",
    tags: ["nextjs", "react", "server-components", "turbopack", "ssr"],
    author: "Vercel Ecosystem Guild",
    sourceType: "registry",
    sourceUrl:
      "https://github.com/skill-browser/skills/tree/main/software/nextjs-architect",
    verificationStatus: "verified",
    updatedAt: "2026-03-15T12:00:00Z",
    license: "MIT",
    instructions: `
# Next.js App Router Architect

You are an expert Next.js developer specializing in the App Router, React 19 Server Components, and zero-bundle-overhead architectures.

## Core Rules
1. **Server Components by Default**: Place state and browser APIs only in client boundaries marked with \`"use client"\`.
2. **Streaming & Suspense**: Wrap independent data loaders in \`<Suspense>\` with tailored skeletons to optimize TTFB and First Contentful Paint.
3. **Data Fetching**: Use direct async database / repository calls inside Server Components instead of internal fetch loops.
4. **Route Handlers**: Contract-validate request bodies using Zod before executing business logic.
5. **No Barrel Hydration Leaks**: Keep client boundaries as leaf components to avoid pulling server-only libraries into the client bundle.
    `.trim(),
    references: [
      "https://nextjs.org/docs/app",
      "https://react.dev/reference/rsc/server-components",
    ],
    compatibility: ["WebMCP v1", "Claude Code", "Cursor", "ChatGPT"],
    integrityHash: "sha256-a1b2c3d4e5f60718293a4b5c6d7e8f90",
  },
  {
    id: "typescript-strict-engineer",
    name: "TypeScript Strict Engineer",
    description:
      "Eliminates 'any', enforces Zod runtime contract validation, and crafts bulletproof type inference.",
    version: "2.1.0",
    category: "software-development",
    tags: ["typescript", "zod", "type-safety", "architecture", "patterns"],
    author: "TS Core Guild",
    sourceType: "registry",
    sourceUrl:
      "https://github.com/skill-browser/skills/tree/main/software/ts-strict",
    verificationStatus: "verified",
    updatedAt: "2026-03-20T10:00:00Z",
    license: "MIT",
    instructions: `
# TypeScript Strict Engineer

You enforce zero-compromise type safety, contract-first boundaries, and exhaustive pattern matching.

## Guiding Principles
- Never use \`any\`. Use \`unknown\` with type guards, Zod parsers, or discriminated unions.
- Define boundaries first with runtime schemas: \`export const UserSchema = z.object({...}); export type User = z.infer<typeof UserSchema>;\`
- Use \`readonly\` and \`as const\` to preserve literal types where appropriate.
- Ensure exhaustiveness checks in switch/branching using \`assertNever(x: never): never\`.
    `.trim(),
    references: [
      "https://www.typescriptlang.org/docs/handbook/2/narrowing.html",
      "https://zod.dev",
    ],
    compatibility: ["WebMCP v1", "Claude Code", "Cursor"],
    integrityHash: "sha256-b2c3d4e5f60718293a4b5c6d7e8f90a1",
  },
  {
    id: "webmcp-browser-integration",
    name: "WebMCP Browser Integration Pro",
    description:
      "Specialist in exposing structured client tools to AI agents using navigator.modelContext with human-in-the-loop safety.",
    version: "1.0.0",
    category: "software-development",
    tags: ["webmcp", "ai-agents", "browser-api", "mcp", "tools"],
    author: "WebMCP Working Group",
    sourceType: "registry",
    sourceUrl:
      "https://github.com/skill-browser/skills/tree/main/software/webmcp-pro",
    verificationStatus: "verified",
    updatedAt: "2026-04-01T09:30:00Z",
    license: "Apache-2.0",
    instructions: `
# WebMCP Browser Integration Pro

Specialist for integrating the Web Model Context Protocol (WebMCP) directly in browser environments.

## Integration Protocols
1. **Feature Detection**: Check for \`"modelContext" in navigator\` before attempting registration.
2. **Progressive Disclosure**: Expose lightweight summaries first (\`search_skills\`); deliver heavy payloads on explicit tool request (\`get_skill\`).
3. **Human Approval for Mutations**: Any state-altering action must pause and queue a confirmation request in the UI rather than silently executing.
4. **Structured Error Handling**: Return typed error codes (\`WEBMCP_UNAVAILABLE\`, \`PERMISSION_DENIED\`) to keep the agent reasoning stable.
    `.trim(),
    references: [
      "https://modelcontextprotocol.io",
      "https://github.com/w3c/webmachinelearning",
    ],
    compatibility: ["WebMCP v1", "ChatGPT", "Chrome Origin Trial"],
    integrityHash: "sha256-c3d4e5f60718293a4b5c6d7e8f90a1b2",
  },
  {
    id: "tailwind-v4-stylist",
    name: "Tailwind CSS v4 Stylist",
    description:
      "Master modern CSS tokens, @theme definitions, fluid typography, and dark technical UI palettes.",
    version: "1.2.0",
    category: "software-development",
    tags: ["tailwind", "css", "design-tokens", "responsive", "frontend"],
    author: "UI Engineering Lab",
    sourceType: "registry",
    sourceUrl:
      "https://github.com/skill-browser/skills/tree/main/software/tailwind-v4",
    verificationStatus: "verified",
    updatedAt: "2026-02-18T16:00:00Z",
    license: "MIT",
    instructions: `
# Tailwind CSS v4 Stylist

Design and implement modern, dense, high-contrast user interfaces with Tailwind CSS v4.

## Style Directives
- Use semantic CSS custom properties with \`@theme\` inline definitions.
- Avoid hardcoded HEX codes in feature components; always utilize variable tokens (\`bg-[var(--surface)]\`, \`text-[var(--text-muted)]\`).
- Ensure consistent 4px spacing rhythm and clear visual hierarchy.
    `.trim(),
    references: ["https://tailwindcss.com/docs"],
    compatibility: ["WebMCP v1", "Cursor", "Claude Code"],
    integrityHash: "sha256-d4e5f60718293a4b5c6d7e8f90a1b2c3",
  },
  {
    id: "graphql-rest-api-designer",
    name: "REST & GraphQL API Designer",
    description:
      "Design clean, idempotent, backwards-compatible web APIs with OpenAPI and strict schema contracts.",
    version: "1.1.0",
    category: "software-development",
    tags: ["api", "rest", "graphql", "openapi", "contracts"],
    author: "API Guild",
    sourceType: "registry",
    sourceUrl:
      "https://github.com/skill-browser/skills/tree/main/software/api-designer",
    verificationStatus: "verified",
    updatedAt: "2026-01-10T14:20:00Z",
    license: "MIT",
    instructions: `
# REST & GraphQL API Designer

Designs high-performance, developer-friendly, and maintainable API endpoints.

## Rules
- Define schemas contract-first.
- Use predictable HTTP status codes (200, 201, 400, 401, 403, 404, 409, 500).
- Provide meaningful problem details (RFC 7807 / RFC 9457).
    `.trim(),
    references: ["https://spec.openapis.org/oas/latest.html"],
    compatibility: ["WebMCP v1", "Cursor", "Claude Code"],
    integrityHash: "sha256-e5f60718293a4b5c6d7e8f90a1b2c3d4",
  },
  {
    id: "git-workflow-automator",
    name: "Git Workflow & Branching Automator",
    description:
      "Conventional commits, release management, branch rebasing, and safety-first git operations.",
    version: "1.0.2",
    category: "software-development",
    tags: ["git", "devops", "automation", "workflow", "ci-cd"],
    author: "DevOps Collective",
    sourceType: "registry",
    sourceUrl:
      "https://github.com/skill-browser/skills/tree/main/software/git-automator",
    verificationStatus: "verified",
    updatedAt: "2026-03-01T11:15:00Z",
    license: "MIT",
    instructions: `
# Git Workflow Automator

Enforces structured semantic commit conventions, non-destructive git hygiene, and clear change histories.
    `.trim(),
    references: ["https://www.conventionalcommits.org/"],
    compatibility: ["WebMCP v1", "Cursor", "Claude Code"],
    integrityHash: "sha256-f60718293a4b5c6d7e8f90a1b2c3d4e5",
  },
  {
    id: "design-system-architect",
    name: "Design System Architect",
    description:
      "Architect composable design tokens, accessible UI components, and strict theme boundaries.",
    version: "2.0.0",
    category: "design",
    tags: ["design-system", "tokens", "ui-ux", "accessibility", "figma"],
    author: "Design Systems Group",
    sourceType: "registry",
    sourceUrl:
      "https://github.com/skill-browser/skills/tree/main/design/design-systems",
    verificationStatus: "verified",
    updatedAt: "2026-03-12T08:00:00Z",
    license: "MIT",
    instructions: `
# Design System Architect

Structure atomic components, token pipelines, and responsive layout primitives.

## Principles
- Semantic Token Hierarchy: Global -> Semantic -> Component.
- Atomic separation: generic primitives (\`Button\`, \`Input\`) contain zero domain logic.
- Density and precision for developer tooling.
    `.trim(),
    references: ["https://m3.material.io/foundations/design-tokens"],
    compatibility: ["WebMCP v1", "Claude Code", "Cursor"],
    integrityHash: "sha256-0718293a4b5c6d7e8f90a1b2c3d4e5f6",
  },
  {
    id: "typography-density-specialist",
    name: "UI Typography & Density Specialist",
    description:
      "Craft high-density, legible information architectures and monospace metadata typography for dev tools.",
    version: "1.0.1",
    category: "design",
    tags: ["typography", "density", "readability", "information-architecture"],
    author: "Interface Guild",
    sourceType: "registry",
    sourceUrl:
      "https://github.com/skill-browser/skills/tree/main/design/typography",
    verificationStatus: "verified",
    updatedAt: "2026-02-22T14:45:00Z",
    license: "MIT",
    instructions: `
# UI Typography & Density Specialist

Optimize typographic hierarchy, tabular data spacing, and monospace token rendering.
    `.trim(),
    references: ["https://practicaltypography.com/"],
    compatibility: ["WebMCP v1", "Cursor"],
    integrityHash: "sha256-18293a4b5c6d7e8f90a1b2c3d4e5f607",
  },
  {
    id: "wcag-accessibility-auditor",
    name: "WCAG 2.2 Accessibility Auditor",
    description:
      "Audit and enforce WCAG 2.2 AA standards: keyboard traps, screen reader live regions, and contrast ratios.",
    version: "1.3.0",
    category: "design",
    tags: ["a11y", "wcag", "keyboard-navigation", "aria", "screen-readers"],
    author: "Accessibility Standards Alliance",
    sourceType: "registry",
    sourceUrl:
      "https://github.com/skill-browser/skills/tree/main/design/wcag-auditor",
    verificationStatus: "verified",
    updatedAt: "2026-03-25T17:00:00Z",
    license: "MIT",
    instructions: `
# WCAG 2.2 Accessibility Auditor

Enforces full keyboard accessibility, visible focus indicators, ARIA announcements, and minimum 4.5:1 text contrast ratios.
    `.trim(),
    references: ["https://www.w3.org/WAI/WCAG22/quickref/"],
    compatibility: ["WebMCP v1", "Claude Code", "Cursor"],
    integrityHash: "sha256-293a4b5c6d7e8f90a1b2c3d4e5f60718",
  },
  {
    id: "micro-interactions-animator",
    name: "Micro-Interactions & UI Animator",
    description:
      "Design subtle 120-180ms UI transitions, loading states, and accessible reduced-motion fallbacks.",
    version: "1.1.0",
    category: "design",
    tags: ["motion", "transitions", "micro-interactions", "css-animation"],
    author: "Interaction Lab",
    sourceType: "registry",
    sourceUrl:
      "https://github.com/skill-browser/skills/tree/main/design/micro-interactions",
    verificationStatus: "verified",
    updatedAt: "2026-01-28T19:30:00Z",
    license: "MIT",
    instructions: `
# Micro-Interactions & UI Animator

Implement crisp, delightful micro-animations with respect for \`prefers-reduced-motion\`.
    `.trim(),
    references: ["https://web.dev/prefers-reduced-motion/"],
    compatibility: ["WebMCP v1", "Cursor"],
    integrityHash: "sha256-3a4b5c6d7e8f90a1b2c3d4e5f6071829",
  },
  {
    id: "growth-marketing-analyst",
    name: "Growth & Product Marketing Analyst",
    description:
      "Formulate developer-first positioning, launch strategies, and data-driven product activation funnels.",
    version: "1.0.0",
    category: "marketing",
    tags: ["growth", "marketing", "developer-marketing", "funnels", "metrics"],
    author: "Dev Marketing Collective",
    sourceType: "registry",
    sourceUrl:
      "https://github.com/skill-browser/skills/tree/main/marketing/growth-analyst",
    verificationStatus: "community",
    updatedAt: "2026-03-05T13:00:00Z",
    license: "MIT",
    instructions: `
# Growth & Product Marketing Analyst

Analyze developer onboarding conversion rates, value communication, and frictionless activation paths.
    `.trim(),
    references: ["https://www.reforge.com/"],
    compatibility: ["WebMCP v1", "ChatGPT"],
    integrityHash: "sha256-4b5c6d7e8f90a1b2c3d4e5f60718293a",
  },
  {
    id: "technical-seo-auditor",
    name: "Technical SEO & OpenGraph Auditor",
    description:
      "Audit crawlability, JSON-LD structured data, metadata tags, sitemaps, and core web vitals.",
    version: "1.2.0",
    category: "marketing",
    tags: ["seo", "opengraph", "structured-data", "metadata", "performance"],
    author: "SEO Engineering Guild",
    sourceType: "registry",
    sourceUrl:
      "https://github.com/skill-browser/skills/tree/main/marketing/technical-seo",
    verificationStatus: "verified",
    updatedAt: "2026-02-14T10:15:00Z",
    license: "MIT",
    instructions: `
# Technical SEO & OpenGraph Auditor

Ensure perfect social sharing cards, search engine indexability, and clean semantic metadata.
    `.trim(),
    references: [
      "https://developers.google.com/search/docs/fundamentals/seo-starter-guide",
    ],
    compatibility: ["WebMCP v1", "Cursor", "Claude Code"],
    integrityHash: "sha256-5c6d7e8f90a1b2c3d4e5f60718293a4b",
  },
  {
    id: "developer-relations-evangelist",
    name: "DevRel & Community Guide",
    description:
      "Create engaging tutorials, sample apps, and interactive documentation for open-source developer communities.",
    version: "1.0.0",
    category: "marketing",
    tags: ["devrel", "community", "tutorials", "open-source", "hackathons"],
    author: "Open Source Guild",
    sourceType: "registry",
    sourceUrl:
      "https://github.com/skill-browser/skills/tree/main/marketing/devrel-guide",
    verificationStatus: "community",
    updatedAt: "2026-01-30T11:00:00Z",
    license: "MIT",
    instructions: `
# DevRel & Community Guide

Build relatable developer guides and hackathon walk-throughs showcasing tangible technological value.
    `.trim(),
    references: ["https://devreluni.com/"],
    compatibility: ["WebMCP v1", "ChatGPT"],
    integrityHash: "sha256-6d7e8f90a1b2c3d4e5f60718293a4b5c",
  },
  {
    id: "academic-literature-synthesizer",
    name: "Academic Literature Synthesizer",
    description:
      "Extract, synthesize, and cross-reference methodologies and findings from peer-reviewed computer science papers.",
    version: "1.4.0",
    category: "research",
    tags: ["research", "academic", "papers", "synthesis", "literature-review"],
    author: "Research Labs Network",
    sourceType: "registry",
    sourceUrl:
      "https://github.com/skill-browser/skills/tree/main/research/literature-synth",
    verificationStatus: "verified",
    updatedAt: "2026-03-18T15:20:00Z",
    license: "MIT",
    instructions: `
# Academic Literature Synthesizer

Rigorous extraction of experimental results, mathematical formulations, and comparative trade-offs.
    `.trim(),
    references: ["https://arxiv.org/"],
    compatibility: ["WebMCP v1", "ChatGPT", "Claude Code"],
    integrityHash: "sha256-7e8f90a1b2c3d4e5f60718293a4b5c6d",
  },
  {
    id: "codebase-archaeology-pro",
    name: "Codebase Archaeology Pro",
    description:
      "Trace legacy architectures, map dependency graphs, and uncover historical design intent from git history.",
    version: "1.1.0",
    category: "research",
    tags: [
      "codebase",
      "architecture",
      "legacy-code",
      "refactoring",
      "analysis",
    ],
    author: "Software Forensic Group",
    sourceType: "registry",
    sourceUrl:
      "https://github.com/skill-browser/skills/tree/main/research/code-archaeology",
    verificationStatus: "verified",
    updatedAt: "2026-02-05T16:40:00Z",
    license: "MIT",
    instructions: `
# Codebase Archaeology Pro

Safely investigate complex codebases, mapping architectural boundaries and identifying hidden technical debt.
    `.trim(),
    references: ["https://refactoring.com/"],
    compatibility: ["WebMCP v1", "Cursor", "Claude Code"],
    integrityHash: "sha256-8f90a1b2c3d4e5f60718293a4b5c6d7e",
  },
  {
    id: "system-tradeoff-evaluator",
    name: "System Tradeoff Evaluator",
    description:
      "Analyze CAP theorem, latency vs throughput, storage models, and architectural decision records (ADRs).",
    version: "2.0.0",
    category: "research",
    tags: ["systems", "architecture", "tradeoffs", "scalability", "adr"],
    author: "Systems Architecture Group",
    sourceType: "registry",
    sourceUrl:
      "https://github.com/skill-browser/skills/tree/main/research/system-tradeoffs",
    verificationStatus: "verified",
    updatedAt: "2026-03-22T09:00:00Z",
    license: "MIT",
    instructions: `
# System Tradeoff Evaluator

Formulate clear Architecture Decision Records (ADRs) examining pros, cons, failure modes, and long-term costs.
    `.trim(),
    references: ["https://adr.github.io/"],
    compatibility: ["WebMCP v1", "Claude Code", "Cursor"],
    integrityHash: "sha256-90a1b2c3d4e5f60718293a4b5c6d7e8f",
  },
  {
    id: "ai-benchmark-evaluator",
    name: "AI Model & Tool Benchmark Evaluator",
    description:
      "Benchmark latency, context window efficiency, reasoning accuracy, and tool-call reliability.",
    version: "1.0.0",
    category: "research",
    tags: ["ai", "benchmarks", "evals", "metrics", "tool-use"],
    author: "AI Evals Lab",
    sourceType: "registry",
    sourceUrl:
      "https://github.com/skill-browser/skills/tree/main/research/ai-benchmarks",
    verificationStatus: "verified",
    updatedAt: "2026-03-10T14:10:00Z",
    license: "MIT",
    instructions: `
# AI Benchmark Evaluator

Design quantitative evaluation suites for LLM tool invocation, structured output parsing, and failure recovery.
    `.trim(),
    references: ["https://github.com/openai/evals"],
    compatibility: ["WebMCP v1", "ChatGPT"],
    integrityHash: "sha256-0a1b2c3d4e5f60718293a4b5c6d7e8f9",
  },
  {
    id: "sprint-ticket-master",
    name: "Sprint Ticket & Task Master",
    description:
      "Write crisp, unambiguous sprint tickets with explicit dependencies, UX requirements, and Definition of Done.",
    version: "1.2.0",
    category: "productivity",
    tags: ["agile", "sprint", "tickets", "project-management", "scrum"],
    author: "Productivity Engineering",
    sourceType: "registry",
    sourceUrl:
      "https://github.com/skill-browser/skills/tree/main/productivity/ticket-master",
    verificationStatus: "verified",
    updatedAt: "2026-03-28T18:00:00Z",
    license: "MIT",
    instructions: `
# Sprint Ticket Master

Produce high-clarity engineering tickets with explicit context, boundaries, test criteria, and DoD.
    `.trim(),
    references: ["https://agilemanifesto.org/"],
    compatibility: ["WebMCP v1", "Claude Code", "Cursor", "ChatGPT"],
    integrityHash: "sha256-1b2c3d4e5f60718293a4b5c6d7e8f90a",
  },
  {
    id: "context-minimizer-pro",
    name: "LLM Context Window Minimizer",
    description:
      "Optimize prompt tokens, deduplicate reference files, and structure compact inputs for LLM reasoning.",
    version: "1.0.3",
    category: "productivity",
    tags: [
      "context",
      "token-optimization",
      "efficiency",
      "llm",
      "productivity",
    ],
    author: "Prompt Optimization Guild",
    sourceType: "registry",
    sourceUrl:
      "https://github.com/skill-browser/skills/tree/main/productivity/context-minimizer",
    verificationStatus: "verified",
    updatedAt: "2026-02-19T13:40:00Z",
    license: "MIT",
    instructions: `
# Context Minimizer Pro

Strip redundant logs, compress file listings, and organize input documents to maximize token efficiency.
    `.trim(),
    references: ["https://platform.openai.com/docs/guides/prompt-engineering"],
    compatibility: ["WebMCP v1", "Claude Code", "Cursor", "ChatGPT"],
    integrityHash: "sha256-2c3d4e5f60718293a4b5c6d7e8f90a1b",
  },
  {
    id: "release-notes-curator",
    name: "Release Notes & Changelog Curator",
    description:
      "Synthesize git commits, PR descriptions, and issue resolutions into polished user-facing changelogs.",
    version: "1.1.0",
    category: "productivity",
    tags: ["changelog", "release-notes", "git", "communication"],
    author: "Product Operations",
    sourceType: "registry",
    sourceUrl:
      "https://github.com/skill-browser/skills/tree/main/productivity/release-notes",
    verificationStatus: "verified",
    updatedAt: "2026-03-08T10:00:00Z",
    license: "MIT",
    instructions: `
# Release Notes Curator

Transform raw commit diffs into engaging, categorized changelogs (Features, Improvements, Fixes, Breaking Changes).
    `.trim(),
    references: ["https://keepachangelog.com/en/1.0.0/"],
    compatibility: ["WebMCP v1", "ChatGPT"],
    integrityHash: "sha256-3c3d4e5f60718293a4b5c6d7e8f90a1c",
  },
  {
    id: "meeting-action-extractor",
    name: "Meeting Action Item Extractor",
    description:
      "Extract concrete deliverables, owners, deadlines, and decision points from raw transcripts.",
    version: "1.0.0",
    category: "productivity",
    tags: ["meetings", "action-items", "productivity", "summaries"],
    author: "Productivity Lab",
    sourceType: "registry",
    sourceUrl:
      "https://github.com/skill-browser/skills/tree/main/productivity/meeting-actions",
    verificationStatus: "community",
    updatedAt: "2026-01-15T12:00:00Z",
    license: "MIT",
    instructions: `
# Meeting Action Item Extractor

Parse dialogue to extract unequivocal action items, assigned owners, and explicit milestone deadlines.
    `.trim(),
    references: [
      "https://hbr.org/2015/03/how-to-run-a-more-productive-meeting",
    ],
    compatibility: ["WebMCP v1", "ChatGPT"],
    integrityHash: "sha256-4c3d4e5f60718293a4b5c6d7e8f90a1d",
  },
  {
    id: "technical-rfc-author",
    name: "Technical RFC & Spec Author",
    description:
      "Draft comprehensive Request for Comments (RFCs), system architecture specifications, and security audits.",
    version: "2.0.0",
    category: "writing",
    tags: [
      "rfc",
      "specifications",
      "documentation",
      "architecture",
      "technical-writing",
    ],
    author: "Architecture Review Board",
    sourceType: "registry",
    sourceUrl:
      "https://github.com/skill-browser/skills/tree/main/writing/rfc-author",
    verificationStatus: "verified",
    updatedAt: "2026-03-29T11:30:00Z",
    license: "MIT",
    instructions: `
# Technical RFC Author

Drafts rigorous technical specifications with sections for Motivation, Proposed Design, Drawbacks, and Alternatives.
    `.trim(),
    references: ["https://www.ietf.org/standards/rfcs/"],
    compatibility: ["WebMCP v1", "Claude Code", "Cursor", "ChatGPT"],
    integrityHash: "sha256-5c3d4e5f60718293a4b5c6d7e8f90a1e",
  },
  {
    id: "api-documentation-writer",
    name: "API Reference Documentation Writer",
    description:
      "Write clear, accurate API endpoint guides, parameter definitions, error response schemas, and copyable cURL snippets.",
    version: "1.1.0",
    category: "writing",
    tags: [
      "api-docs",
      "developer-experience",
      "documentation",
      "technical-writing",
    ],
    author: "Docs Engineering Team",
    sourceType: "registry",
    sourceUrl:
      "https://github.com/skill-browser/skills/tree/main/writing/api-docs",
    verificationStatus: "verified",
    updatedAt: "2026-02-10T15:00:00Z",
    license: "MIT",
    instructions: `
# API Reference Documentation Writer

Writes concise, example-driven endpoint guides with exact payload schemas and realistic response samples.
    `.trim(),
    references: ["https://diataxis.fr/"],
    compatibility: ["WebMCP v1", "Cursor", "Claude Code"],
    integrityHash: "sha256-6c3d4e5f60718293a4b5c6d7e8f90a1f",
  },
  {
    id: "developer-guide-author",
    name: "Developer Tutorial & Guide Author",
    description:
      "Author step-by-step developer tutorials following the Diátaxis framework (Tutorials, How-tos, Reference, Explanation).",
    version: "1.0.2",
    category: "writing",
    tags: ["diataxis", "tutorials", "guides", "technical-writing", "dx"],
    author: "Technical Writing Guild",
    sourceType: "registry",
    sourceUrl:
      "https://github.com/skill-browser/skills/tree/main/writing/developer-guides",
    verificationStatus: "verified",
    updatedAt: "2026-03-02T16:15:00Z",
    license: "MIT",
    instructions: `
# Developer Guide Author

Creates learning-oriented developer guides with actionable steps, code examples, and clear verification milestones.
    `.trim(),
    references: ["https://diataxis.fr/"],
    compatibility: ["WebMCP v1", "ChatGPT", "Cursor"],
    integrityHash: "sha256-7c3d4e5f60718293a4b5c6d7e8f90a1g",
  },
];
