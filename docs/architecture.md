# Architecture — Skill Browser

## 1. Architectural Principles

1. Browser is the agent trust boundary.
2. WebMCP is a product interface, not a backend replacement.
3. Contract-first TypeScript.
4. No UI imports into domain, data, or adapter layers.
5. Skills are untrusted content.
6. Read operations are default; mutations require explicit permission.
7. Progressive disclosure: metadata first, full skill content on demand.
8. No paid infrastructure is required by the MVP.
9. Keep persistence behind a repository interface.
10. Prefer deterministic behavior over hidden agent magic.

## 2. High-Level Architecture

```text
Browser
┌─────────────────────────────────────────────────────────┐
│ Next.js App                                              │
│                                                         │
│  UI Layer                                               │
│   ├─ Registry pages                                     │
│   ├─ Skill detail                                       │
│   ├─ Skillspace                                         │
│   └─ Permission UI                                      │
│             │                                           │
│             ▼                                           │
│  Application Layer                                      │
│   ├─ SearchSkills                                       │
│   ├─ GetSkill                                           │
│   ├─ InstallSkill                                       │
│   └─ ImportSkill                                        │
│             │                                           │
│             ├──────────────┐                            │
│             ▼              ▼                            │
│      Repository Layer   WebMCP Adapter                  │
│             │              │                            │
│             ▼              ▼                            │
│       Storage Adapter   navigator.modelContext          │
└─────────────────────────────────────────────────────────┘
```

## 3. State Management

Use a split strategy.

### Server/registry state

Use Next.js Server Components for initial reads where practical.

Examples:

- Public skill registry.
- Skill metadata.
- Public categories.

### Client state

Use React state/context only for ephemeral UI state:

- Search input.
- Selected filters.
- Modal state.
- Permission dialog.
- WebMCP status.

Do not introduce Redux unless measurable complexity requires it.

### Persistent browser state

Use IndexedDB through a small repository adapter for:

- Anonymous Skillspace.
- Installed skills.
- Collections.
- Pending local approvals.

`localStorage` may hold only tiny preferences such as theme and last-selected category.

### Source of truth

```text
Public registry -> repository
User Skillspace -> SkillspaceRepository
WebMCP -> application services
UI -> application services
```

The UI never reads IndexedDB directly.

## 4. Data Flow

### Search

```text
UI
 -> SearchSkills service
 -> SkillRepository.search()
 -> normalized SkillSummary[]
 -> UI
```

### WebMCP get_skill

```text
Agent
 -> WebMCP tool
 -> validate input
 -> application service
 -> SkillRepository.get()
 -> authorization check
 -> Skill
 -> sanitize output
 -> Agent
```

### Install

```text
Agent/UI
 -> InstallSkill request
 -> permission policy
 -> pending approval
 -> human confirmation
 -> SkillspaceRepository.add()
 -> audit event
```

## 5. Contract-First Types

Use Zod for runtime validation and infer TypeScript types from schemas.

```text
src/contracts/
├── skill.ts
├── search.ts
├── skillspace.ts
├── permissions.ts
├── webmcp.ts
└── errors.ts
```

Example conceptual schema:

```ts
const SkillId = z.string().regex(/^[a-z0-9][a-z0-9-_]{2,63}$/);

const SkillSummary = z.object({
  id: SkillId,
  name: z.string().min(1).max(120),
  description: z.string().max(500),
  version: z.string(),
  category: z.string(),
  tags: z.array(z.string()).max(20),
  author: z.string(),
  sourceUrl: z.string().url().nullable(),
});
```

All external inputs must pass runtime validation.

## 6. Application Services

```text
src/domain/services/
├── search-skills.ts
├── get-skill.ts
├── install-skill.ts
├── remove-skill.ts
├── import-skill.ts
├── create-collection.ts
└── permission-policy.ts
```

Services:

- Do not import React.
- Do not import Next.js UI code.
- Do not access IndexedDB directly.
- Do not call `fetch` directly unless explicitly implemented as an adapter.

## 7. Repository Interfaces

```ts
export interface SkillRepository {
  search(input: SearchSkillsInput): Promise<SkillSummary[]>;
  get(id: SkillId): Promise<Skill | null>;
  listCategories(): Promise<Category[]>;
}

export interface SkillspaceRepository {
  listSkills(): Promise<SkillSummary[]>;
  add(skill: Skill): Promise<void>;
  remove(id: SkillId): Promise<void>;
  listCollections(): Promise<Collection[]>;
}
```

Implementations:

```text
src/infrastructure/repositories/
├── static-skill-repository.ts
├── indexeddb-skillspace-repository.ts
└── future-postgres-skill-repository.ts
```

The future PostgreSQL implementation must not require changes to domain services.

## 8. WebMCP Adapter

Keep WebMCP isolated:

```text
src/infrastructure/webmcp/
├── register-tools.ts
├── schemas.ts
├── tool-context.ts
├── tools/
│   ├── search-skills.ts
│   ├── list-my-skills.ts
│   ├── get-skill.ts
│   ├── get-skill-metadata.ts
│   └── install-skill.ts
└── index.ts
```

WebMCP adapter responsibilities:

- Register browser tools.
- Validate tool arguments.
- Invoke application services.
- Serialize safe results.
- Map errors to agent-safe error responses.

WebMCP adapter must never contain business rules.

## 9. WebMCP Registration Strategy

Register tools only in a client-side boundary after confirming the browser API exists.

Conceptual:

```ts
if ("modelContext" in navigator) {
  registerWebMcpTools();
}
```

Do not assume WebMCP exists in every browser.

Provide a visible compatibility indicator:

- Supported.
- Unsupported.
- Enabled but unavailable.
- Registration failed.

The implementation must follow the current WebMCP specification and browser documentation rather than inventing an API surface.

## 10. Component Registry

```text
src/components/
├── ui/
│   ├── button
│   ├── input
│   ├── badge
│   ├── dialog
│   ├── dropdown-menu
│   ├── tabs
│   ├── tooltip
│   ├── skeleton
│   └── toast
├── skills/
│   ├── skill-card
│   ├── skill-grid
│   ├── skill-search
│   ├── skill-filters
│   ├── skill-detail
│   ├── skill-metadata
│   ├── install-button
│   └── import-skill-dialog
├── skillspace/
│   ├── skillspace-header
│   ├── installed-skill-list
│   ├── collection-list
│   └── share-url
└── agent/
    ├── webmcp-status
    ├── tool-activity
    ├── permission-request
    └── agent-panel
```

## 11. Directory Layout

```text
src/
├── app/
│   ├── page.tsx
│   ├── skills/
│   ├── skill/
│   │   └── [id]/
│   ├── me/
│   │   └── skills/
│   └── api/
├── components/
├── contracts/
├── domain/
│   ├── entities/
│   ├── services/
│   └── policies/
├── infrastructure/
│   ├── repositories/
│   ├── webmcp/
│   ├── importers/
│   └── storage/
├── lib/
├── styles/
└── tests/
```

## 12. Boundary Rules

### UI

May import:

- Application services/hooks.
- Contracts.
- UI components.

Must not import:

- IndexedDB implementation.
- PostgreSQL client.
- Raw fetch clients.
- WebMCP registration internals.

### Domain

May import:

- Standard TypeScript.
- Zod schemas/contracts where necessary.

Must not import:

- React.
- Next.js.
- Browser APIs.
- Database clients.
- WebMCP APIs.

### Infrastructure

May import:

- Domain interfaces.
- Browser APIs.
- External SDKs.

Must not import:

- UI components.
- React pages.

### WebMCP Adapter

May import:

- Contracts.
- Domain/application services.

Must not import:

- UI components.
- Database implementation directly.

### Rule

**Adapters never import UI components directly.**

## 13. API Surface

The MVP can avoid a large REST API because WebMCP operates in the browser.

For future server-backed persistence:

```text
GET    /api/skills
GET    /api/skills/:id
POST   /api/skillspace/skills
DELETE /api/skillspace/skills/:id
GET    /api/skillspace
POST   /api/import
```

All endpoints must share the same Zod contracts as the application layer.

## 14. Database Plan

MVP:

- Static registry in repository.
- IndexedDB for anonymous Skillspace.

Post-MVP persistent schema:

```text
users
skills
skill_versions
skill_sources
skill_tags
collections
collection_skills
user_skills
import_jobs
permission_requests
audit_events
```

Use IDs that are stable across storage implementations.

No database vendor must leak into domain types.

## 15. Security

Threat model includes:

- Prompt injection inside skills.
- Malicious imported Markdown.
- Oversized skill payloads.
- SSRF through source imports.
- XSS through rendered skill content.
- Agent overreach.
- Cross-user data access.
- Tool argument manipulation.

Controls:

- Render skill Markdown as sanitized content.
- Never execute skill content.
- Allowlist import protocols: HTTPS only.
- Limit response size.
- Limit redirects.
- Validate URLs.
- Never expose cookies/tokens to skill content.
- Require user confirmation for mutations.
- Keep private Skillspace data inaccessible to unauthenticated requests.
- Use opaque IDs where appropriate.
- Add rate limiting when server persistence is introduced.

## 16. Error Contract

All application errors map to stable codes:

```text
SKILL_NOT_FOUND
INVALID_SKILL
INVALID_INPUT
IMPORT_FAILED
SOURCE_UNAVAILABLE
PERMISSION_REQUIRED
PERMISSION_DENIED
WEBMCP_UNAVAILABLE
WEBMCP_REGISTRATION_FAILED
STORAGE_UNAVAILABLE
CONFLICT
INTERNAL_ERROR
```

Never expose stack traces to users or agents.

## 17. Testing Strategy

### Unit

- Zod contracts.
- Domain services.
- Permission policies.
- Import validation.
- Search ranking.

### Integration

- Repository adapters.
- IndexedDB adapter.
- Import pipeline.
- WebMCP tool adapters.

### E2E

- Search -> detail -> install.
- Skillspace -> WebMCP discovery.
- Agent mutation -> approval -> install.
- Unsupported browser state.

The WebMCP happy path is a release blocker for the hackathon build.

## 18. Deployment

Vercel:

- Next.js production build.
- Preview deployments.
- Production deployment.
- No Docker requirement for MVP.
- No paid Vercel feature required.

Environment variables should be empty/minimal for MVP.

The application must work with:

```text
pnpm install
pnpm dev
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```
