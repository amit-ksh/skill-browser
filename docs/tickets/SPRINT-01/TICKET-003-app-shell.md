# Ticket SPRINT-01-003: Responsive Application Shell

## Objective
Implement the responsive application shell with header, sidebar navigation, WebMCP status badge, and mobile drawer.

## Context
Skill Browser requires a desktop sidebar + canvas layout and a mobile responsive view, supporting 390px, 768px, and 1440px viewports.

## Files/Modules Expected
- `src/components/layout/header.tsx`
- `src/components/layout/sidebar.tsx`
- `src/components/layout/webmcp-status-pill.tsx`
- `src/components/layout/app-shell.tsx`
- `src/app/layout.tsx`

## Implementation Requirements
- Sticky top header with brand logo, quick search shortcut, WebMCP status indicator, and navigation links.
- Sidebar with links to Explore (`/skills`), My Skillspace (`/me/skills`), Categories, and Collections.
- WebMCP Status Pill showing real-time browser agent readiness.
- Mobile drawer navigation toggled via hamburger menu.

## Definition of Done
Layout renders cleanly on mobile, tablet, and desktop without layout shifts or overflow bugs.
