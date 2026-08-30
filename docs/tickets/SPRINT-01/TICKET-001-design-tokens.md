# Ticket SPRINT-01-001: Design Tokens & CSS Custom Properties

## Objective
Establish global design tokens, CSS custom properties, and Tailwind v4 configuration following the developer-tool aesthetic specified in `docs/design-system.md`.

## Context
Skill Browser requires a clean, technical, high-information-density visual design with semantic tokens for surfaces, borders, text hierarchies, accents, and status colors.

## Files/Modules Expected
- `src/styles/tokens.css`
- `src/app/globals.css`
- `src/lib/utils.ts`

## Implementation Requirements
- Define color tokens: `--background`, `--surface`, `--surface-muted`, `--surface-elevated`, `--border`, `--border-strong`, `--text`, `--text-muted`, `--text-subtle`, `--accent`, `--accent-foreground`, `--success`, `--warning`, `--danger`, `--info`.
- Configure 4px spacing scale, small radii (6px, 8px, 12px), and typography scale.
- Implement `cn` utility in `src/lib/utils.ts`.

## Definition of Done
Design tokens are active in Tailwind / CSS and all components can consume semantic classes without hardcoded color codes.
