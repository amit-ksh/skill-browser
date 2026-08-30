# Ticket SPRINT-10-001: Public Skillspace Page (/space/[handle])

## Objective
Implement public viewable Skillspace profiles that users and AI agents can visit via deep link.

## Files Expected
- `src/app/space/[handle]/page.tsx`
- `src/app/space/[handle]/space-client.tsx`

## Requirements
- Shows curated profile: handle, avatar/badge, bio, and curated skills organized into collections.
- WebMCP agents can read the shared Skillspace directly via browser tools.
- Human users can browse skills with quick previews.
