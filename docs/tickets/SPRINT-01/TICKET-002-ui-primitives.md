# Ticket SPRINT-01-002: Reusable UI Primitives

## Objective
Implement accessible, composable UI primitives matching shadcn/ui patterns in `src/components/ui/`.

## Context
Skill Browser features (SkillCard, SkillDetail, PermissionDialog, WebMcpStatus, ImportModal) depend on robust atomic UI components.

## Files/Modules Expected
- `src/components/ui/button.tsx`
- `src/components/ui/input.tsx`
- `src/components/ui/badge.tsx`
- `src/components/ui/card.tsx`
- `src/components/ui/dialog.tsx`
- `src/components/ui/dropdown-menu.tsx`
- `src/components/ui/tabs.tsx`
- `src/components/ui/tooltip.tsx`
- `src/components/ui/skeleton.tsx`
- `src/components/ui/toast.tsx`

## Implementation Requirements
- Button with variants (default, secondary, outline, ghost, danger, link) and sizes (sm, md, lg, icon).
- Input with search icon support and clear action.
- Badge with category and status variants.
- Card with header, title, description, content, footer.
- Dialog modal with accessible backdrop and keyboard escape handler.
- Tabs with keyboard-navigable triggers.
- Toast system for user feedback notifications.

## Definition of Done
All primitives are implemented using TypeScript strict mode, export clean interfaces, and have zero lint/typecheck errors.
