# Ticket SPRINT-05-002: Interactive Skill Import Dialog & Preview

## Objective
Implement an interactive Import Dialog supporting HTTPS URL fetch and manual JSON/Markdown paste with full validation previews.

## Context
Before adding an untrusted external skill to their local Skillspace, users must inspect a security and validation report with warnings and diff preview.

## Files/Modules Expected
- `src/components/skills/import-skill-dialog.tsx`
- `src/app/skills/skills-client.tsx` (integrate import modal)

## Implementation Requirements
- Input field for HTTPS URL and alternative tab for pasting raw Markdown/JSON.
- Validation report showing extracted Name, Category, Author, Version, Tags, and Warnings.
- Live instruction preview using `MarkdownViewer`.
- Explicit user confirmation button (`"Add to Skillspace"`).

## Definition of Done
Users can import valid skills from URLs or direct pastes with clear visual feedback and zero crashes on malformed inputs.
