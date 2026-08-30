# Ticket SPRINT-00-001: Repository Foundation & Verification Scripts

## Objective
Establish a clean, strictly-typed Next.js 16 + React 19 + TypeScript + Biome + Vitest foundation with full command verification.

## Context
Skill Browser requires a rock-solid, zero-paid-dependency base where `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build` pass with 0 errors.

## Dependencies
None.

## Files/Modules Expected
- `package.json` (add scripts: `typecheck`, `test`, dependencies: `zod`, `lucide-react`, devDependencies: `vitest`, `@testing-library/react`, etc.)
- `tsconfig.json` (strict checking, alias `@/*`)
- `biome.json` (lint & format rules)
- `vitest.config.ts` (unit test environment)
- `src/tests/foundation.test.ts` (baseline test)
- `AGENTS.md` (updated with guidelines preserving Next.js rules)

## Contract Changes
None.

## Implementation Requirements
1. Install `zod`, `lucide-react`, and test dependencies (`vitest`, `@vitejs/plugin-react`, `jsdom`, `@testing-library/react`).
2. Add `"typecheck": "tsc --noEmit"` and `"test": "vitest run"` to `package.json`.
3. Fix any Biome formatting/lint issues (e.g. CRLF formatting).
4. Establish clean architectural directory structure under `src/` (`contracts`, `domain`, `infrastructure`, `components`, `lib`).
5. Ensure `AGENTS.md` contains the full mission and constraints alongside Next.js agent rules.

## UX Requirements
N/A (Foundation sprint).

## Security Requirements
No secrets or paid external APIs in repository or config.

## Testing Requirements
Vitest test suite executes and passes.

## Acceptance Criteria
- `pnpm lint` exits 0.
- `pnpm typecheck` exits 0.
- `pnpm test` exits 0.
- `pnpm build` exits 0.

## Definition of Done
All four validation commands pass cleanly and the foundation commit is prepared.
