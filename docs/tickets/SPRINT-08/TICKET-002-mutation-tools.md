# Ticket SPRINT-08-002: WebMCP Mutation Tools (install_skill, create_collection)

## Objective
Implement mutating WebMCP tools `install_skill` and `create_collection` gated behind the human approval manager.

## Files Expected
- `src/infrastructure/webmcp/tools/install-skill-tool.ts`
- `src/infrastructure/webmcp/tools/create-collection-tool.ts`

## Requirements
- When called by agent, intercept execution and request human approval.
- Return structured status (`pending` or `completed`) with machine-readable error codes if denied.
