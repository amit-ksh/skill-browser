# Roadmap — Skill Browser

## Milestone 0 — Repository Foundation

### Prerequisites

None.

### Deliverables

- Next.js App Router project.
- TypeScript strict mode.
- pnpm.
- ESLint.
- Prettier.
- Test runner.
- Basic CI checks.
- `AGENTS.md`.
- Architecture/product/design docs.

### Definition of Done

- `pnpm install` succeeds.
- `pnpm lint` succeeds.
- `pnpm typecheck` succeeds.
- `pnpm test` succeeds.
- `pnpm build` succeeds.
- No paid service is required.
- Architecture boundaries are documented.

---

## Milestone 1 — Design System

### Prerequisites

Milestone 0.

### Deliverables

- Design tokens.
- Typography.
- Layout primitives.
- Button/input/card/dialog/badge primitives.
- Responsive shell.
- Accessibility baseline.

### Definition of Done

- No hardcoded product colors in feature components.
- Keyboard navigation works.
- Mobile layout works.
- Empty/loading/error states exist.
- Components use semantic tokens.

---

## Milestone 2 — Static Skill Registry

### Prerequisites

Milestone 1.

### Deliverables

- Skill manifest schema.
- Seed registry.
- Search.
- Categories.
- Skill detail page.
- Skill rendering/sanitization.

### Definition of Done

- At least 20 representative seed skills.
- Search works without external paid APIs.
- Invalid skill manifests are rejected.
- Skill Markdown is sanitized.
- Detail pages are shareable.
- All data flows through repository interfaces.

---

## Milestone 3 — Local Skillspace

### Prerequisites

Milestone 2.

### Deliverables

- IndexedDB repository.
- Add/remove skills.
- Collections.
- Favorites.
- Local Skillspace URL/state.
- Import flow.

### Definition of Done

- Skills survive page reload.
- Remove works.
- Collection assignment works.
- Import validates and sanitizes content.
- No server database is required.

---

## Milestone 4 — WebMCP

### Prerequisites

Milestone 3.

### Deliverables

- WebMCP feature detection.
- Tool registration.
- `search_skills`.
- `list_my_skills`.
- `get_skill`.
- `get_skill_metadata`.
- `install_skill` with approval.

### Definition of Done

- Tools register in a WebMCP-enabled browser.
- Invalid tool inputs return typed errors.
- Agent can discover Skillspace skills.
- Agent can retrieve full skill content.
- Agent cannot mutate state without approval.
- Unsupported browsers show a clear fallback.

---

## Milestone 5 — Human-Agent Collaboration

### Prerequisites

Milestone 4.

### Deliverables

- Agent status UI.
- Tool activity.
- Permission requests.
- Audit display.
- Trust/provenance UI.

### Definition of Done

- User can understand every agent mutation.
- Allow and deny paths work.
- Tool activity is visible.
- Error states are understandable.
- No silent agent mutation occurs.

---

## Milestone 6 — Hackathon Polish

### Prerequisites

Milestone 5.

### Deliverables

- Responsive polish.
- Accessibility pass.
- Performance pass.
- WebMCP reliability pass.
- Demo seed data.
- Landing page.
- Demo script.
- Production deployment.

### Definition of Done

- Production Vercel deployment works.
- WebMCP demo works from a clean browser session.
- Core flow works without developer tools.
- Lighthouse/performance issues are addressed where practical.
- No paid dependency is required.
- Demo can be completed in under 3 minutes.

---

## Milestone 7 — Post-MVP Persistence

### Prerequisites

Milestone 6.

### Deliverables

- Authentication.
- Persistent Skillspace.
- PostgreSQL adapter.
- API routes.
- Team workspaces.

### Definition of Done

- Domain layer remains storage-agnostic.
- Existing local repository tests remain green.
- User data isolation is tested.
- Migration/rollback strategy is documented.

---

## Milestone 8 — Registry Ecosystem

### Prerequisites

Milestone 7.

### Deliverables

- Public publishing.
- Versioning.
- Ratings.
- Quality signals.
- Skill packs.
- Maintainer workflows.

### Definition of Done

- Published versions are immutable.
- Updates create new versions.
- Deprecated skills remain discoverable with warnings.
- Quality signals cannot be forged by client-side state.

---

## Delivery Rule

Never start a milestone before its prerequisites are complete.

Within a milestone:

1. Contracts.
2. Domain logic.
3. Infrastructure adapter.
4. UI.
5. Tests.
6. Integration.
7. Documentation.
8. Commit.

Never implement UI first when the underlying contract is undefined.
