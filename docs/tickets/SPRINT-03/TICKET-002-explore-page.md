# Ticket SPRINT-03-002: Public Explore Registry Page (/skills)

## Objective
Implement the public skill discovery page at `/skills` with live search, category pill navigation, sorting, and tag filters.

## Context
The `/skills` route is the primary entry point for human users to search and discover AI skills for their personal Skillspace and WebMCP agents.

## Files/Modules Expected
- `src/app/skills/page.tsx`
- `src/app/skills/skills-client.tsx`

## Implementation Requirements
- Real-time search query with category tabs and tag filters.
- Responsive grid showing matching skill cards.
- Clean empty state with "Clear filters" action.
- Quick preview modal without mandatory full-page navigation.

## Definition of Done
Page loads fast, responds immediately to query changes, and handles empty/error states cleanly.
