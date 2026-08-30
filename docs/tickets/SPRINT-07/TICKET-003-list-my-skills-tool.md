# Ticket SPRINT-07-003: WebMCP list_my_skills Tool

## Objective
Implement `list_my_skills` allowing agents to discover the user's active Skillspace in the current browser session.

## Files Expected
- `src/infrastructure/webmcp/tools/list-my-skills-tool.ts`

## Requirements
- Reads from local-first repository.
- Supports optional collection filtering and favorites flag.
- Emits telemetry for user activity auditing.
