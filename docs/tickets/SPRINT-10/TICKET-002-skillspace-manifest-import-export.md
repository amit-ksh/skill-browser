# Ticket SPRINT-10-002: One-Click Clone Skillspace & Manifest Services

## Objective
Enable users to clone a public Skillspace into their personal IndexedDB Skillspace in a single click.

## Files Expected
- `src/domain/services/manifest-services.ts`
- `src/components/skillspace/clone-skillspace-button.tsx`

## Requirements
- Validates Skillspace manifest.
- Batch inserts skills and collections into local IndexedDB without duplicate IDs.
- Provides immediate toast confirmation and redirect option.
