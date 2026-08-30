# Ticket SPRINT-04-002: Skillspace Domain Application Services

## Objective
Implement decoupled domain application services for Skillspace mutation and retrieval.

## Context
UI and WebMCP adapters must interact with Skillspace only via application services, never directly accessing IndexedDB.

## Files/Modules Expected
- `src/domain/services/list-my-skills.ts`
- `src/domain/services/install-skill.ts`
- `src/domain/services/remove-skill.ts`
- `src/domain/services/collection-services.ts`

## Definition of Done
Application services validate input with Zod schemas and coordinate with the repository adapter.
