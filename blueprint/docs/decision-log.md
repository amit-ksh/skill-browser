# Architecture Decision Log

## ADR-001 — Local-first MVP

**Decision:** Anonymous Skillspace uses IndexedDB.

**Reason:** The hackathon MVP must not require paid infrastructure or a database. Browser persistence is enough to demonstrate the human-agent workflow.

**Consequence:** A shareable Skillspace URL cannot represent server-side private state in the anonymous MVP. The URL identifies the experience; persistent remote sharing is post-MVP.

## ADR-002 — Static Registry First

**Decision:** Seed public skills in repository data.

**Reason:** Search and discovery must work without paid search/database services.

**Consequence:** Publishing and multi-user persistence are post-MVP.

## ADR-003 — WebMCP Adapter Isolation

**Decision:** WebMCP is an infrastructure adapter around application services.

**Reason:** Browser API changes must not contaminate domain code.

## ADR-004 — No Arbitrary Skill Execution

**Decision:** Skills are instruction/content artifacts only in MVP.

**Reason:** Executing imported code introduces a much larger security boundary and is unnecessary for demonstrating WebMCP.

## ADR-005 — Progressive Disclosure

**Decision:** Agents receive metadata before full skill content.

**Reason:** Reduce unnecessary context transfer and make skill discovery scalable.

## ADR-006 — No Paid Required Services

**Decision:** MVP must work with only open-source packages, browser capabilities, repository data, and Vercel deployment.

**Reason:** Project constraint.
