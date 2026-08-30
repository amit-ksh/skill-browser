# Ticket SPRINT-04-001: IndexedDB Skillspace Repository Adapter

## Objective
Implement local-first, zero-paid-backend persistence in IndexedDB adhering to `SkillspaceRepository` domain interface.

## Context
Anonymous users maintain their installed skills, custom collections, and preferences in browser IndexedDB with fallback to localStorage.

## Files/Modules Expected
- `src/domain/repositories/skillspace-repository.ts`
- `src/infrastructure/repositories/indexeddb-skillspace-repository.ts`

## Implementation Requirements
- Initialize database `SkillBrowserDB` (stores: `skills`, `collections`, `preferences`).
- CRUD methods for installed skills and collections.
- Safe JSON manifest export and import.
- Handles browser reload, tab close, and concurrent window updates.

## Definition of Done
Installed skills and collections persist across page reloads without requiring server-side databases or paid APIs.
