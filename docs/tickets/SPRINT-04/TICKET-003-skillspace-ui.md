# Ticket SPRINT-04-003: Personal Skillspace Management UI (/me/skills)

## Objective
Implement the personal Skillspace dashboard at `/me/skills` with collection creation, skill organization, JSON export, and shareable link modal.

## Context
Users organize skills into collections (e.g. "Frontend Stack", "AI Research", "DevRel Workflows") and manage what skills are exposed to WebMCP agents.

## Files/Modules Expected
- `src/components/skillspace/skillspace-header.tsx`
- `src/components/skillspace/collection-dialog.tsx`
- `src/components/skillspace/share-skillspace-dialog.tsx`
- `src/app/me/skills/page.tsx`
- `src/app/me/skills/skillspace-client.tsx`

## Definition of Done
Users can view installed skills, create collections, assign skills to collections, remove skills, and export their Skillspace manifest.
