# Implementation Plan

## Recommended Stack

- Next.js latest stable via `create-next-app`.
- TypeScript.
- App Router.
- pnpm.
- Tailwind CSS if selected by the official scaffold.
- shadcn/ui-style primitives.
- Zod.
- IndexedDB for local persistence.
- Vitest or the project's chosen lightweight test runner.
- Playwright for E2E where needed.
- Vercel deployment.

The official Next.js documentation recommends `create-next-app` and supports pnpm. citeturn0search15

## Bootstrap

Use the official CLI rather than a custom boilerplate:

```bash
pnpm create next-app@latest skill-browser
```

Choose:

- TypeScript: Yes
- ESLint: Yes
- Tailwind CSS: Yes
- App Router: Yes
- `src/` directory: Yes
- Import alias: Yes

Then:

```bash
cd skill-browser
pnpm lint
pnpm build
```

## Dependencies

Keep the initial dependency set small.

Required:

- `zod`

UI:

- shadcn/ui-compatible primitives as needed.
- One icon library.

Testing:

- Vitest.
- Testing Library.
- Playwright.

Avoid adding:

- AI API SDKs.
- Paid search APIs.
- Paid analytics.
- Paid vector databases.
- Paid queues.
- Paid authentication providers.

## WebMCP Implementation Rule

The WebMCP specification is still an emerging browser standard. The implementation must be checked against the current specification and Chrome/OpenAI documentation immediately before coding.

The hackathon explicitly instructs builders to test deployed apps in ChatGPT's in-app browser or Chrome with WebMCP enabled. citeturn0search5turn0search14

Do not hard-code an invented API based on old examples.

## Suggested Ticket Sequence

### ARCH-001

Create repository structure and architecture docs.

DoD:

- All docs exist.
- Boundary rules documented.
- `AGENTS.md` created.

### ARCH-002

Create contract schemas.

DoD:

- Skill.
- SkillSummary.
- Collection.
- Skillspace.
- Permission.
- Error schemas.

### DATA-001

Implement static SkillRepository.

DoD:

- Seed registry.
- Search.
- Get.
- Category listing.
- Tests.

### UI-001

Implement design system.

DoD:

- Tokens.
- Shell.
- Components.
- Responsive behavior.

### UI-002

Implement registry pages.

DoD:

- Explore.
- Search.
- Filters.
- Detail.

### DATA-002

Implement IndexedDB SkillspaceRepository.

DoD:

- Add/remove.
- Collections.
- Reload persistence.
- Tests.

### MCP-001

Implement WebMCP registration.

DoD:

- Feature detection.
- Registration.
- Status UI.

### MCP-002

Implement read-only tools.

DoD:

- search_skills.
- list_my_skills.
- get_skill.
- get_skill_metadata.

### MCP-003

Implement mutation approval.

DoD:

- install_skill.
- permission UI.
- allow/deny.
- typed errors.

### QA-001

End-to-end WebMCP validation.

DoD:

- Clean browser session.
- Deployed app.
- Agent discovery.
- Agent retrieval.
- Agent installation approval.

## Commit Strategy

Commit after each completed ticket:

```text
docs: define product and architecture
feat(contracts): add skill contracts
feat(registry): add static skill repository
feat(ui): add design system
feat(registry): add skill discovery
feat(skillspace): add indexeddb persistence
feat(webmcp): register browser tools
feat(webmcp): add read tools
feat(webmcp): add permissioned mutations
test(e2e): validate webmcp workflow
```

Do not combine unrelated milestones in a single commit.
