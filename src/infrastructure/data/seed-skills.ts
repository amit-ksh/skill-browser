import type { Skill } from "@/contracts";

export const SEED_SKILLS: Skill[] = [
  {
    id: "find-skills",
    name: "find-skills",
    description:
      "Search, query, and dynamically discover agent skills across the decentralized WebMCP skill registry.",
    version: "1.5.0",
    category: "software-development",
    tags: ["discovery", "webmcp", "search", "agent-tools", "registry"],
    author: "vercel-labs",
    repo: "vercel-labs/skills",
    publisher: "Vercel",
    isOfficial: true,
    installs: 3240000,
    weeklyInstalls: 38400,
    growthRate: 24.5,
    sourceType: "registry",
    sourceUrl: "https://github.com/vercel-labs/skills",
    verificationStatus: "verified",
    updatedAt: "2026-04-02T10:00:00Z",
    license: "MIT",
    instructions: `
# find-skills

Discover and inspect reusable AI agent skills across the WebMCP ecosystem on demand.

## Core Capabilities
1. **Semantic Search**: Discovers relevant skills based on developer intent, tool definitions, and repository tags.
2. **Progressive Disclosure**: Returns lightweight summaries initially to protect agent context window budgets.
3. **Deep Inspection**: Loads full execution instructions and tool manifests on explicit \`get_skill\` call.
    `.trim(),
    references: [
      "https://modelcontextprotocol.io",
      "https://github.com/vercel-labs/skills",
    ],
    compatibility: [
      "WebMCP v1",
      "Claude Code",
      "Cursor",
      "Codex",
      "Copilot",
      "Windsurf",
      "Cline",
      "Gemini",
    ],
    integrityHash: "sha256-a0000000000000000000000000000001",
  },
  {
    id: "frontend-design",
    name: "frontend-design",
    description:
      "Build polished, high-density, accessible frontend interfaces with modern CSS tokens and zero bloated styling.",
    version: "2.1.0",
    category: "design",
    tags: ["frontend", "ui-ux", "design-system", "tokens", "a11y"],
    author: "anthropics",
    repo: "anthropics/skills",
    publisher: "Anthropic",
    isOfficial: true,
    installs: 836000,
    weeklyInstalls: 24320,
    growthRate: 18.2,
    sourceType: "registry",
    sourceUrl: "https://github.com/anthropics/skills",
    verificationStatus: "verified",
    updatedAt: "2026-03-28T14:00:00Z",
    license: "MIT",
    instructions: `
# frontend-design

You are an expert design systems engineer focused on building elegant, developer-oriented UI components.

## Guidelines
- Prioritize high-contrast typography, clear hierarchy, and restrained accent colors.
- Use 4px-8px border radius for precision rather than oversized generic cards.
- Implement responsive table-first layouts with subtle hover states and instant action affordances.
- Maintain full WCAG 2.2 AA accessibility and keyboard navigable focus rings.
    `.trim(),
    references: [
      "https://anthropic.com",
      "https://m3.material.io/foundations/design-tokens",
    ],
    compatibility: [
      "Claude Code",
      "Cursor",
      "Codex",
      "Copilot",
      "Windsurf",
      "WebMCP v1",
    ],
    integrityHash: "sha256-a0000000000000000000000000000002",
  },
  {
    id: "tdd",
    name: "tdd",
    description:
      "Enforce test-driven development: red-green-refactor cycle, minimal mocks, and behavior-first assertions.",
    version: "1.3.0",
    category: "software-development",
    tags: ["tdd", "testing", "vitest", "jest", "quality"],
    author: "mattpocock",
    repo: "mattpocock/skills",
    publisher: "Matt Pocock",
    isOfficial: false,
    installs: 800000,
    weeklyInstalls: 19500,
    growthRate: 15.4,
    sourceType: "registry",
    sourceUrl: "https://github.com/mattpocock/skills",
    verificationStatus: "verified",
    updatedAt: "2026-03-20T11:00:00Z",
    license: "MIT",
    instructions: `
# Test-Driven Development (TDD)

Guide AI agents to write failing unit tests before touching production code.

## Rules
1. **Write the test first**: Formulate expectations against public domain contracts.
2. **Run to observe failure**: Confirm the test fails for the expected reason.
3. **Write minimal code**: Implement the simplest solution to make the test pass.
4. **Refactor cleanly**: Improve code structure without altering behavior.
    `.trim(),
    references: ["https://martinfowler.com/bliki/TestDrivenDevelopment.html"],
    compatibility: [
      "Claude Code",
      "Cursor",
      "Codex",
      "Copilot",
      "Windsurf",
      "Cline",
    ],
    integrityHash: "sha256-a0000000000000000000000000000003",
  },
  {
    id: "agent-browser",
    name: "agent-browser",
    description:
      "Autonomous browser navigation, DOM inspection, network telemetry capture, and WebMCP tool registration.",
    version: "2.0.0",
    category: "software-development",
    tags: ["browser", "automation", "webmcp", "playwright", "dom"],
    author: "vercel-labs",
    repo: "vercel-labs/agent-browser",
    publisher: "Vercel",
    isOfficial: true,
    installs: 756000,
    weeklyInstalls: 21400,
    growthRate: 28.0,
    sourceType: "registry",
    sourceUrl: "https://github.com/vercel-labs/agent-browser",
    verificationStatus: "verified",
    updatedAt: "2026-04-01T08:30:00Z",
    license: "Apache-2.0",
    instructions: `
# agent-browser

Control headless and interactive browser sessions for real-world automated agent workflows.
    `.trim(),
    references: ["https://github.com/vercel-labs/agent-browser"],
    compatibility: ["WebMCP v1", "Claude Code", "Cursor", "Codex", "AI"],
    integrityHash: "sha256-a0000000000000000000000000000004",
  },
  {
    id: "code-review",
    name: "code-review",
    description:
      "Rigorous pull request review covering correctness, performance regressions, security risks, and idiomatic style.",
    version: "1.4.2",
    category: "software-development",
    tags: ["code-review", "pr", "security", "best-practices", "git"],
    author: "mattpocock",
    repo: "mattpocock/code-review",
    publisher: "Matt Pocock",
    isOfficial: false,
    installs: 447000,
    weeklyInstalls: 14800,
    growthRate: 12.1,
    sourceType: "registry",
    sourceUrl: "https://github.com/mattpocock/code-review",
    verificationStatus: "verified",
    updatedAt: "2026-03-25T16:00:00Z",
    license: "MIT",
    instructions: `
# Code Review

Automate comprehensive PR reviews focusing on architectural integrity, edge cases, and maintainability.
    `.trim(),
    references: ["https://google.github.io/eng-practices/review/"],
    compatibility: [
      "Claude Code",
      "Cursor",
      "Codex",
      "Copilot",
      "Windsurf",
      "Cline",
      "Gemini",
    ],
    integrityHash: "sha256-a0000000000000000000000000000005",
  },
  {
    id: "nextjs-app-router-architect",
    name: "Next.js App Router Architect",
    description:
      "Expert patterns for Next.js Server Components, Server Actions, route handlers, and streaming architectures.",
    version: "1.4.0",
    category: "software-development",
    tags: ["nextjs", "react", "server-components", "turbopack", "ssr"],
    author: "vercel",
    repo: "vercel/nextjs-skills",
    publisher: "Vercel",
    isOfficial: true,
    installs: 920000,
    weeklyInstalls: 26100,
    growthRate: 21.0,
    sourceType: "registry",
    sourceUrl: "https://github.com/vercel/nextjs-skills",
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
    compatibility: ["WebMCP v1", "Claude Code", "Cursor", "AI", "Codex"],
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
    author: "microsoft",
    repo: "microsoft/typescript-skills",
    publisher: "Microsoft",
    isOfficial: true,
    installs: 680000,
    weeklyInstalls: 17200,
    growthRate: 14.5,
    sourceType: "registry",
    sourceUrl: "https://github.com/microsoft/typescript-skills",
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
    compatibility: ["WebMCP v1", "Claude Code", "Cursor", "Windsurf", "Codex"],
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
    author: "webmcp-wg",
    repo: "webmcp/browser-integration",
    publisher: "WebMCP Working Group",
    isOfficial: true,
    installs: 512000,
    weeklyInstalls: 19800,
    growthRate: 33.2,
    sourceType: "registry",
    sourceUrl: "https://github.com/webmcp/browser-integration",
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
    compatibility: [
      "WebMCP v1",
      "AI",
      "Chrome Origin Trial",
      "Claude Code",
    ],
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
    author: "tailwindlabs",
    repo: "tailwindlabs/tailwind-skills",
    publisher: "Tailwind Labs",
    isOfficial: true,
    installs: 480000,
    weeklyInstalls: 13900,
    growthRate: 16.8,
    sourceType: "registry",
    sourceUrl: "https://github.com/tailwindlabs/tailwind-skills",
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
    compatibility: ["WebMCP v1", "Cursor", "Claude Code", "Windsurf"],
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
    author: "api-guild",
    repo: "api-guild/api-designer",
    publisher: "API Guild",
    isOfficial: false,
    installs: 390000,
    weeklyInstalls: 9400,
    growthRate: 8.5,
    sourceType: "registry",
    sourceUrl: "https://github.com/api-guild/api-designer",
    verificationStatus: "verified",
    updatedAt: "2026-01-10T14:20:00Z",
    license: "MIT",
    instructions: `
# REST & GraphQL API Designer

Designs high-performance, developer-friendly, and maintainable API endpoints.
    `.trim(),
    references: ["https://spec.openapis.org/oas/latest.html"],
    compatibility: ["WebMCP v1", "Cursor", "Claude Code", "Codex"],
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
    author: "devops-collective",
    repo: "devops-collective/git-automator",
    publisher: "DevOps Collective",
    isOfficial: false,
    installs: 310000,
    weeklyInstalls: 8100,
    growthRate: 10.2,
    sourceType: "registry",
    sourceUrl: "https://github.com/devops-collective/git-automator",
    verificationStatus: "verified",
    updatedAt: "2026-03-01T11:15:00Z",
    license: "MIT",
    instructions: `
# Git Workflow Automator

Enforces structured semantic commit conventions, non-destructive git hygiene, and clear change histories.
    `.trim(),
    references: ["https://www.conventionalcommits.org/"],
    compatibility: ["WebMCP v1", "Cursor", "Claude Code", "Cline"],
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
    author: "google",
    repo: "google/design-system-skills",
    publisher: "Google",
    isOfficial: true,
    installs: 410000,
    weeklyInstalls: 11200,
    growthRate: 15.0,
    sourceType: "registry",
    sourceUrl: "https://github.com/google/design-system-skills",
    verificationStatus: "verified",
    updatedAt: "2026-03-12T08:00:00Z",
    license: "MIT",
    instructions: `
# Design System Architect

Structure atomic components, token pipelines, and responsive layout primitives.
    `.trim(),
    references: ["https://m3.material.io/foundations/design-tokens"],
    compatibility: ["WebMCP v1", "Claude Code", "Cursor", "Windsurf"],
    integrityHash: "sha256-0718293a4b5c6d7e8f90a1b2c3d4e5f6",
  },
  {
    id: "wcag-accessibility-auditor",
    name: "WCAG 2.2 Accessibility Auditor",
    description:
      "Audit and enforce WCAG 2.2 AA standards: keyboard traps, screen reader live regions, and contrast ratios.",
    version: "1.3.0",
    category: "design",
    tags: ["a11y", "wcag", "keyboard-navigation", "aria", "screen-readers"],
    author: "a11y-alliance",
    repo: "a11y-alliance/wcag-auditor",
    publisher: "A11y Alliance",
    isOfficial: false,
    installs: 275000,
    weeklyInstalls: 6800,
    growthRate: 9.4,
    sourceType: "registry",
    sourceUrl: "https://github.com/a11y-alliance/wcag-auditor",
    verificationStatus: "verified",
    updatedAt: "2026-03-25T17:00:00Z",
    license: "MIT",
    instructions: `
# WCAG 2.2 Accessibility Auditor

Enforces full keyboard accessibility, visible focus indicators, ARIA announcements, and minimum 4.5:1 text contrast ratios.
    `.trim(),
    references: ["https://www.w3.org/WAI/WCAG22/quickref/"],
    compatibility: ["WebMCP v1", "Claude Code", "Cursor", "Windsurf"],
    integrityHash: "sha256-293a4b5c6d7e8f90a1b2c3d4e5f60718",
  },
  {
    id: "growth-marketing-analyst",
    name: "Growth & Product Marketing Analyst",
    description:
      "Formulate developer-first positioning, launch strategies, and data-driven product activation funnels.",
    version: "1.0.0",
    category: "marketing",
    tags: ["growth", "marketing", "developer-marketing", "funnels", "metrics"],
    author: "dev-marketing",
    repo: "dev-marketing/growth-analyst",
    publisher: "Dev Marketing Guild",
    isOfficial: false,
    installs: 195000,
    weeklyInstalls: 5400,
    growthRate: 11.2,
    sourceType: "registry",
    sourceUrl: "https://github.com/dev-marketing/growth-analyst",
    verificationStatus: "community",
    updatedAt: "2026-03-05T13:00:00Z",
    license: "MIT",
    instructions: `
# Growth & Product Marketing Analyst

Analyze developer onboarding conversion rates, value communication, and frictionless activation paths.
    `.trim(),
    references: ["https://www.reforge.com/"],
    compatibility: ["WebMCP v1", "AI", "Claude Code"],
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
    author: "google",
    repo: "google/seo-skills",
    publisher: "Google",
    isOfficial: true,
    installs: 260000,
    weeklyInstalls: 7900,
    growthRate: 13.5,
    sourceType: "registry",
    sourceUrl: "https://github.com/google/seo-skills",
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
    compatibility: ["WebMCP v1", "Cursor", "Claude Code", "Copilot"],
    integrityHash: "sha256-5c6d7e8f90a1b2c3d4e5f60718293a4b",
  },
  {
    id: "ai-benchmark-evaluator",
    name: "AI Model & Tool Benchmark Evaluator",
    description:
      "Benchmark latency, context window efficiency, reasoning accuracy, and tool-call reliability.",
    version: "1.0.0",
    category: "research",
    tags: ["ai", "benchmarks", "evals", "metrics", "tool-use"],
    author: "openai",
    repo: "openai/evals-skill",
    publisher: "OpenAI",
    isOfficial: true,
    installs: 350000,
    weeklyInstalls: 12400,
    growthRate: 22.8,
    sourceType: "registry",
    sourceUrl: "https://github.com/openai/evals-skill",
    verificationStatus: "verified",
    updatedAt: "2026-03-10T14:10:00Z",
    license: "MIT",
    instructions: `
# AI Benchmark Evaluator

Design quantitative evaluation suites for LLM tool invocation, structured output parsing, and failure recovery.
    `.trim(),
    references: ["https://github.com/openai/evals"],
    compatibility: ["WebMCP v1", "AI", "Claude Code", "Gemini"],
    integrityHash: "sha256-0a1b2c3d4e5f60718293a4b5c6d7e8f9",
  },
  {
    id: "academic-literature-synthesizer",
    name: "Academic Literature Synthesizer",
    description:
      "Extract, synthesize, and cross-reference methodologies and findings from peer-reviewed computer science papers.",
    version: "1.4.0",
    category: "research",
    tags: ["research", "academic", "papers", "synthesis", "literature-review"],
    author: "research-labs",
    repo: "research-labs/literature-synth",
    publisher: "Research Labs",
    isOfficial: false,
    installs: 215000,
    weeklyInstalls: 6100,
    growthRate: 7.9,
    sourceType: "registry",
    sourceUrl: "https://github.com/research-labs/literature-synth",
    verificationStatus: "verified",
    updatedAt: "2026-03-18T15:20:00Z",
    license: "MIT",
    instructions: `
# Academic Literature Synthesizer

Rigorous extraction of experimental results, mathematical formulations, and comparative trade-offs.
    `.trim(),
    references: ["https://arxiv.org/"],
    compatibility: ["WebMCP v1", "AI", "Claude Code", "Cursor"],
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
    author: "microsoft",
    repo: "microsoft/codebase-archaeology",
    publisher: "Microsoft",
    isOfficial: true,
    installs: 290000,
    weeklyInstalls: 8900,
    growthRate: 14.1,
    sourceType: "registry",
    sourceUrl: "https://github.com/microsoft/codebase-archaeology",
    verificationStatus: "verified",
    updatedAt: "2026-02-05T16:40:00Z",
    license: "MIT",
    instructions: `
# Codebase Archaeology Pro

Safely investigate complex codebases, mapping architectural boundaries and identifying hidden technical debt.
    `.trim(),
    references: ["https://refactoring.com/"],
    compatibility: ["WebMCP v1", "Cursor", "Claude Code", "Copilot"],
    integrityHash: "sha256-8f90a1b2c3d4e5f60718293a4b5c6d7e",
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
    author: "prompt-guild",
    repo: "prompt-guild/context-minimizer",
    publisher: "Prompt Optimization Guild",
    isOfficial: false,
    installs: 240000,
    weeklyInstalls: 7500,
    growthRate: 16.2,
    sourceType: "registry",
    sourceUrl: "https://github.com/prompt-guild/context-minimizer",
    verificationStatus: "verified",
    updatedAt: "2026-02-19T13:40:00Z",
    license: "MIT",
    instructions: `
# Context Minimizer Pro

Strip redundant logs, compress file listings, and organize input documents to maximize token efficiency.
    `.trim(),
    references: ["https://platform.openai.com/docs/guides/prompt-engineering"],
    compatibility: ["WebMCP v1", "Claude Code", "Cursor", "AI", "Cline"],
    integrityHash: "sha256-2c3d4e5f60718293a4b5c6d7e8f90a1b",
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
    author: "rfc-board",
    repo: "rfc-board/rfc-author",
    publisher: "Architecture Review Board",
    isOfficial: false,
    installs: 180000,
    weeklyInstalls: 4800,
    growthRate: 9.0,
    sourceType: "registry",
    sourceUrl: "https://github.com/rfc-board/rfc-author",
    verificationStatus: "verified",
    updatedAt: "2026-03-29T11:30:00Z",
    license: "MIT",
    instructions: `
# Technical RFC Author

Drafts rigorous technical specifications with sections for Motivation, Proposed Design, Drawbacks, and Alternatives.
    `.trim(),
    references: ["https://www.ietf.org/standards/rfcs/"],
    compatibility: ["WebMCP v1", "Claude Code", "Cursor", "AI"],
    integrityHash: "sha256-5c3d4e5f60718293a4b5c6d7e8f90a1e",
  },
];
