# Ticket SPRINT-07-002: WebMCP get_skill_metadata and get_skill Tools

## Objective
Implement progressive retrieval tools `get_skill_metadata` and `get_skill` for AI agents.

## Files Expected
- `src/infrastructure/webmcp/tools/get-skill-metadata-tool.ts`
- `src/infrastructure/webmcp/tools/get-skill-tool.ts`

## Requirements
- `get_skill_metadata`: Returns full metadata without instructions.
- `get_skill`: Returns full instructions and reference links.
- Handles not-found errors with stable `SKILL_NOT_FOUND` error codes.
