# Ticket SPRINT-06-001: WebMCP Feature Detection & Types

## Objective
Establish strict TypeScript definitions and browser feature detection for the WebMCP (`navigator.modelContext`) browser API.

## Context
Skill Browser connects directly to browser AI agents (ChatGPT in-app browser, Chrome WebMCP origin trial). The architecture must cleanly detect capabilities and handle unsupported browsers gracefully.

## Files/Modules Expected
- `src/infrastructure/webmcp/types.ts`
- `src/infrastructure/webmcp/index.ts`

## Definition of Done
WebMCP types align with W3C / Chrome WebMCP specifications without runtime errors in standard browsers.
