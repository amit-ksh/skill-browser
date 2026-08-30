# Ticket SPRINT-03-003: Deep-Linkable Skill Detail Page (/skills/[id])

## Objective
Implement deep-linkable, shareable skill detail pages at `/skills/[id]` with full instruction body, metadata provenance, references, and install actions.

## Context
Each skill requires a dedicated shareable detail page displaying its exact instructions, source URL, license, integrity hash, and WebMCP compatibility.

## Files/Modules Expected
- `src/components/skills/skill-detail-view.tsx`
- `src/app/skills/[id]/page.tsx`

## Implementation Requirements
- Overview header with category badge, version, author, license, and install action.
- Trust & Provenance section highlighting integrity hash and source repository.
- Full Markdown viewer rendering instructions cleanly.
- Error boundary / not-found state if invalid skill ID is provided.

## Definition of Done
Detail page renders correctly for all 24 seed skills and handles 404 not-found states gracefully.
