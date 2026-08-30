# Product Scope — Skill Browser for Browser-Based AI

## 1. Product Definition

**Working name:** Skill Browser  
**Application type:** Web application  
**Primary stack:** Next.js App Router + TypeScript  
**Deployment:** Vercel  
**Core innovation:** A browser-native skill registry and personal Skillspace exposed through WebMCP so an AI agent can discover, inspect, and use skills while the human browses and curates them.

The product is intentionally **agent-first but human-controlled**:

- Humans discover, inspect, install, organize, and publish skills.
- Agents discover and retrieve skills through WebMCP.
- The browser remains the trust and permission boundary.
- Skill content is treated as untrusted data/instructions.
- No paid service is required for the MVP.

## 2. Hackathon Alignment

The WebMCP Challenge asks for a working WebMCP-powered application where people and agents interact together. Judges specifically evaluate WebMCP leverage, execution, impact, creativity, and ambition.

The strongest demo path is:

1. Human opens Skill Browser.
2. Human searches for a skill.
3. Human installs it into a personal Skillspace.
4. Human opens the Skillspace in ChatGPT's in-app browser.
5. Agent discovers available skills using WebMCP.
6. Agent retrieves the selected skill without the human copying a prompt or file.
7. Human can approve/reject sensitive operations.

WebMCP is therefore a first-class product capability, not an add-on.

## 3. Core MVP

### M1 — Public Skill Registry

- Browse all published skills.
- Search by name, description, tags, and category.
- Filter by:
  - Software Development
  - Design
  - Marketing
  - Research
  - Productivity
  - Writing
  - Other
- Skill detail page.
- Version, author, source, license, tags, and compatibility metadata.
- Install/add-to-Skillspace action.

### M2 — Skill Format

Every skill has:

- Stable ID.
- Name.
- Description.
- Version.
- Author.
- License.
- Category.
- Tags.
- Source URL.
- Markdown instruction body.
- Optional references.
- Integrity hash.
- Publication status.

Initial accepted source:

- Local/manual upload.
- Public GitHub repository or raw skill source URL.

The MVP must not execute arbitrary code from a skill.

### M3 — Personal Skillspace

Each user can maintain:

- Installed skills.
- Custom skills.
- Favorites.
- Collections.
- Public/private visibility.

MVP identity can be anonymous/local-first for hackathon speed. A persistent authenticated Skillspace is a post-MVP capability unless authentication is needed for the chosen demo.

### M4 — WebMCP Agent Interface

Expose browser tools with narrow, typed contracts:

- `search_skills`
- `list_my_skills`
- `get_skill`
- `get_skill_metadata`
- `list_collections`

Optional MVP tool:

- `install_skill` — must require explicit user confirmation through the UI.

Do not expose unrestricted database or filesystem operations.

### M5 — Human-Agent Collaboration UI

Show:

- Agent connection status.
- Tool invocation status.
- Last requested skill.
- Permission/approval state.
- Skill source and trust information.
- Copyable Skillspace URL.

### M6 — Import

Support importing a skill from a public URL.

Import pipeline:

`URL -> fetch -> validate -> normalize -> sanitize -> preview -> user approval -> install`

No imported skill is trusted merely because it comes from a known repository.

## 4. Post-MVP

### P1 — Accounts and Teams

- Email/OAuth authentication.
- Teams/workspaces.
- Team skill collections.
- Roles and permissions.
- Shared private registries.

### P2 — Skill Packs

Curated collections such as:

- Full-Stack Developer
- Growth Marketer
- Product Designer
- Researcher

A pack is a versioned manifest referencing skills rather than duplicating skill content.

### P3 — Semantic Search

Add embeddings/vector search only after lexical search proves insufficient.

This must remain optional and must not block the core application.

### P4 — Skill Quality System

- Ratings.
- Usage counts.
- Version history.
- Maintainer verification.
- Security review status.
- Deprecation.
- Compatibility checks.

### P5 — Agent Skill Recommendations

Given an agent task, rank relevant skills using:

`query relevance + category + tags + user-installed skills + quality signals`

The agent should receive metadata first and full skill content only when needed.

### P6 — Portable Skillspace

Allow a user to export:

- Skill manifest.
- Skill content.
- Collections.
- Configuration.

Formats:

- ZIP
- JSON manifest
- Markdown skill files

### P7 — Advanced MCP Integration

After WebMCP MVP:

- Remote MCP server.
- API keys/service tokens.
- External agent clients.
- Per-client permissions.

These are not required for the hackathon demo.

## 5. Primary User Flows

### Flow A — Discover and Install

1. User opens `/skills`.
2. Searches `nextjs`.
3. Filters `Software Development`.
4. Opens skill detail.
5. Reviews source, author, license, version, and content.
6. Clicks `Add to Skillspace`.
7. UI confirms installation.
8. Skill appears under `/me/skills`.

### Flow B — Agent Discovers Skill

1. User opens their Skillspace URL in a WebMCP-capable browser.
2. Agent sees available WebMCP tools.
3. Agent calls `list_my_skills`.
4. Agent calls `search_skills` if it needs another capability.
5. Agent calls `get_skill`.
6. Browser returns the selected skill content.
7. Agent uses the returned instructions in its own reasoning.

### Flow C — Agent Requests Installation

1. Agent calls `install_skill`.
2. Server/browser creates a pending approval.
3. UI displays:
   - Skill name.
   - Source.
   - Version.
   - Requested scope.
4. User chooses `Allow` or `Deny`.
5. Only after approval is the skill added.

### Flow D — Import Custom Skill

1. User selects `Import`.
2. User enters a public source URL.
3. System fetches the source.
4. Parser validates required metadata.
5. Sanitizer strips unsupported executable content.
6. Preview displays normalized skill.
7. User confirms.
8. Skill is stored in the user's Skillspace.

## 6. Permission Model

### Anonymous

Can:

- Browse public skills.
- Search public skills.
- View public skill content.
- Maintain local Skillspace in browser storage.

Cannot:

- Publish publicly.
- Modify another user's data.
- Access private Skillspaces.

### Owner

Can:

- Add/remove skills.
- Create collections.
- Import skills.
- Publish selected skills.
- Change visibility.
- Approve agent installation requests.

### Agent

Default:

- Read public skill metadata.
- Read skills explicitly exposed by the current browser context.

Requires user confirmation:

- Install skill.
- Remove skill.
- Change visibility.
- Publish skill.
- Modify a collection.

Never allowed directly:

- Execute arbitrary code.
- Read browser cookies.
- Read unrelated local files.
- Read secrets.
- Perform unrestricted network requests.

## 7. Error States

Every user-facing operation needs explicit states:

### Search

- Empty query.
- No results.
- Search unavailable.
- Invalid filter.
- Registry unavailable.

### Skill

- Skill not found.
- Unsupported version.
- Invalid manifest.
- Malformed Markdown.
- Source unavailable.
- Source changed after indexing.

### Import

- Invalid URL.
- Unsupported source.
- Timeout.
- HTTP error.
- Redirect limit exceeded.
- Content too large.
- Invalid encoding.
- Malicious/unsupported content.
- Duplicate skill.
- User cancelled.

### WebMCP

- Browser does not support WebMCP.
- WebMCP disabled.
- Tool registration failed.
- Tool invocation failed.
- Permission denied.
- Skill unavailable.
- Stale Skillspace state.

Every error must be recoverable where possible and must not expose internal stack traces.

## 8. Non-Goals

MVP explicitly does not:

- Run arbitrary skill code.
- Execute shell commands.
- Store secrets.
- Proxy unrestricted internet requests.
- Build a full hosted MCP server.
- Require a paid AI API.
- Require a paid database.
- Require a paid search provider.
- Depend on a proprietary agent runtime.

## 9. Free-Service Constraint

Required production path:

- Next.js.
- Vercel free deployment.
- Open-source WebMCP/browser APIs.
- Browser local storage/IndexedDB for anonymous MVP state.
- Static/seeded registry data committed to the repository.

Optional persistent backend:

- A free-tier PostgreSQL provider may be added later, but the hackathon MVP must remain runnable without a paid dependency.

No feature may be architecturally blocked on a paid API.
