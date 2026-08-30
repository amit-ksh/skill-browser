# Ticket SPRINT-06-003: WebMCP Telemetry & Agent Observability Bus

## Objective
Implement a lightweight client-side event bus capturing all agent tool calls, latency, payloads, and results for the live Agent Activity UI.

## Context
Human users must have total visibility into what tools the agent is calling and what data is being returned.

## Files/Modules Expected
- `src/infrastructure/webmcp/telemetry.ts`

## Definition of Done
Every tool call emits a telemetry event with invocation details, duration, and status.
