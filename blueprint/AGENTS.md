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
- Use official CLI scaffolding.
- Keep TypeScript strict.
- Use contract-first Zod schemas.
- Keep domain independent from UI and infrastructure.
- Adapters never import UI components.
- Treat skill content as untrusted.
- Never execute arbitrary skill code.
- Never expose secrets to skills or agents.
- Agent mutations require explicit user approval.
- Do not add paid services as required dependencies.
- Do not add an AI API merely to make search work.
- Do not introduce a database before the local-first architecture requires it.
- Do not use destructive shell commands.
- Do not overwrite documentation/configuration without inspecting it first.

## WebMCP

WebMCP is a first-class feature.

Before implementing it, consult the current WebMCP specification and current browser documentation. Do not invent API names or signatures.

Feature detection is mandatory because normal browsers may not expose WebMCP.

## Development Order

1. Contracts.
2. Domain/application services.
3. Repository adapters.
4. UI.
5. WebMCP adapter.
6. Integration.
7. Tests.
8. Polish.

## Verification

Before considering a ticket complete:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

For UI changes, verify:

- desktop
- mobile
- keyboard navigation
- loading
- empty
- error
- permission states

For WebMCP changes, test with a browser that actually exposes WebMCP.

## Git Safety

Never run:

- `rm -rf`
- wildcard deletion commands
- `git reset --hard`
- forced pushes
- commands intended to wipe the repository

Inspect before modifying files.

## Definition of Done

A ticket is not complete until:

- implementation exists,
- tests exist where behavior warrants them,
- type-check passes,
- lint passes,
- build passes,
- documentation is updated if architecture changed,
- changes are committed.
