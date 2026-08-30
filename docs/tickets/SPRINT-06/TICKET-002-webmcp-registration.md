# Ticket SPRINT-06-002: WebMCP Tool Registry & Lifecycle Manager

## Objective
Implement tool registration lifecycle, error mapping, and event-based agent simulator dispatcher.

## Context
Tools must be registered on `navigator.modelContext` and mirrored via structured browser events so agents and in-app playgrounds can invoke them.

## Files/Modules Expected
- `src/infrastructure/webmcp/tool-registry.ts`
- `src/infrastructure/webmcp/register-tools.ts`
- `src/components/agent/webmcp-provider.tsx`

## Definition of Done
WebMCP tools register on mount and report registration success or fallback state.
