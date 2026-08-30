<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md

## Mission

Build Skill Browser: a WebMCP-powered skill registry and personal Skillspace for browser-based AI agents.

## Read First

Before implementation, read:

1. `docs/product-scope.md`
2. `docs/architecture.md`
3. `docs/design-system.md`
4. `docs/ui-ux.md`
5. `docs/roadmap.md`
6. `docs/implementation-plan.md`

## Non-Negotiable Rules

- Use Next.js App Router + TypeScript.
- Use pnpm.
- Keep TypeScript strict.
- Use contract-first Zod schemas.
- Keep domain independent from UI and infrastructure.
- Adapters never import UI components.
- Treat skill content as untrusted data.
- Never execute arbitrary skill code.
- Never expose secrets to skills or agents.
- Agent mutations require explicit user approval.
- Do not add paid services as required dependencies.
- Do not add an AI API merely to make search work.
- Do not introduce a database before the local-first architecture requires it.
- Do not use destructive shell commands.
- Do not overwrite documentation/configuration without inspecting it first.

## WebMCP

WebMCP is a first-class feature. Feature detection is mandatory because standard browsers may not expose WebMCP.

## Verification

Before considering a ticket complete:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

