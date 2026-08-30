# Ticket SPRINT-08-003: Real-Time Human Approval Modal Component

## Objective
Implement human-in-the-loop approval dialog that displays pending agent mutation requests in real-time.

## Files Expected
- `src/components/agent/approval-dialog.tsx`

## Requirements
- Subscribes to `webmcp-approval-requested` events.
- Displays agent request details (tool, target, parameters).
- Provides "Approve" (executes mutation) and "Deny" (aborts with reason) buttons.
