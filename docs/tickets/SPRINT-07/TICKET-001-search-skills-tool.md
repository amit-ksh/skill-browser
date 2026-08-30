# Ticket SPRINT-07-001: WebMCP search_skills Tool

## Objective
Implement and expose the `search_skills` tool to WebMCP agents with deterministic multi-token keyword search and progressive disclosure.

## Files Expected
- `src/infrastructure/webmcp/tools/search-skills-tool.ts`

## Requirements
- Validates input schema via Zod.
- Calls domain search service.
- Returns compact `SkillSummary[]` to minimize agent token usage.
