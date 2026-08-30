# Ticket SPRINT-02-002: Seed Data & Static Skill Repository

## Objective
Implement static registry repository and 24+ representative seed skills across 6 core categories with zero paid search APIs.

## Context
Skill Browser needs rich, realistic skills for immediate discovery without requiring external databases or paid API keys.

## Files/Modules Expected
- `src/domain/repositories/skill-repository.ts`
- `src/infrastructure/data/seed-skills.ts`
- `src/infrastructure/repositories/static-skill-repository.ts`
- `src/domain/services/search-skills.ts`
- `src/domain/services/get-skill.ts`

## Implementation Requirements
- 24+ skills with full Markdown instructions, metadata, tags, author, license, and trust provenance.
- Deterministic multi-token search scoring (matches in name > tags > description > content).
- Fast category and tag filtering.

## Definition of Done
Static repository implements `SkillRepository` interface and fulfills all search and get operations.
