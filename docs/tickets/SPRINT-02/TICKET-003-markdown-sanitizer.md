# Ticket SPRINT-02-003: Safe Markdown Sanitizer & Viewer

## Objective
Implement a secure Markdown parser and sanitizer to render skill instruction bodies without executing arbitrary scripts.

## Context
Skill instruction bodies and imported markdown are untrusted data. We must prevent XSS, script injection, and iframe vulnerabilities.

## Files/Modules Expected
- `src/lib/markdown-sanitizer.ts`
- `src/components/skills/markdown-viewer.tsx`

## Security Requirements
- Disallow `<script>`, `<iframe>`, `<object>`, `<embed>`, `onload=`, `javascript:` URI handlers.
- Escape raw HTML unless safely parsed into clean tokens (headers, lists, blockquotes, code blocks, tables).

## Definition of Done
Markdown renders cleanly with syntax styling and blocks malicious script execution.
