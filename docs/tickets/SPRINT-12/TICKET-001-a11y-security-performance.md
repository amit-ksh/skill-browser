# Ticket SPRINT-12-001: Accessibility, Security & Performance Hardening

## Objective
Harden Skill Browser for WCAG 2.2 AA accessibility, strict browser security headers, and zero secret leakage.

## Context
Production developer tools must provide accessible navigation, robust security headers, and minimal bundle sizes.

## Files Expected
- `src/components/layout/app-shell.tsx` (skip to content link & main id)
- `next.config.ts` (security headers)
- `src/lib/markdown-sanitizer.ts` (URI scheme sanitization)

## Requirements
- Keyboard accessibility: Tab order, focus rings, skip-to-content.
- Security headers: X-Content-Type-Options, Referrer-Policy, Frame-Options.
- Strict markdown sanitization guarding against script injection and javascript: URLs.
