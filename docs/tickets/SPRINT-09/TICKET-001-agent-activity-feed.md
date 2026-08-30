# Ticket SPRINT-09-001: Live Agent Activity Feed

## Objective
Implement a real-time feed displaying agent tool calls, execution timestamps, duration in ms, and expandable request/response inspection.

## Files Expected
- `src/components/agent/agent-activity-feed.tsx`

## Requirements
- Subscribes to `useWebMcp()` live invocations.
- Shows tool badges, status pills (`Success`, `Denied`, `Pending`), and duration.
- Collapsible JSON inspection for payload and return data.
