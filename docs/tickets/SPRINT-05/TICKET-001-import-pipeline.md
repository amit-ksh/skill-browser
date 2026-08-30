# Ticket SPRINT-05-001: Secure Skill Import Pipeline & Parser

## Objective
Implement a secure, zero-paid-API skill import pipeline that fetches, parses, validates, and sanitizes skills from public HTTPS URLs and raw manifests.

## Context
Users should be able to import skills from public GitHub raw URLs, Gists, or documentation sites with strict security guards.

## Files/Modules Expected
- `src/infrastructure/importers/url-skill-importer.ts`
- `src/domain/services/import-skill.ts`

## Security Requirements
- Enforce HTTPS only (reject http://, file://, ftp://).
- Block private IP ranges, localhost, and internal network addresses (SSRF defense).
- Cap payload size at 512KB to prevent memory exhaustion.
- Run `sanitizeMarkdown` on all imported instructions.
- Never execute imported content as JavaScript or shell commands.

## Definition of Done
Importer parses JSON and Markdown skill manifests safely and produces valid `Skill` objects with integrity hashes.
