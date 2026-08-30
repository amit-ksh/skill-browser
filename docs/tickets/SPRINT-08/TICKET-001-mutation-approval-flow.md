# Ticket SPRINT-08-001: Mutation Approval Manager

## Objective
Implement strict human-in-the-loop security approval manager for state-mutating WebMCP agent tool calls.

## Context
Non-negotiable rule: Agent mutations require explicit user approval. Agents must never silently modify user Skillspace without confirmation.

## Files Expected
- `src/infrastructure/security/mutation-approval-manager.ts`
- `src/contracts/permissions.ts`

## Requirements
- Generates approval tokens with 5-minute expiry.
- Manages pending queue with Promise resolution upon user action (Approve / Deny).
- Emits browser CustomEvent `webmcp-approval-requested`.
