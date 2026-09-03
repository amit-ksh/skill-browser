# Skill Browser

**Live app:** https://skill-space-beta.vercel.app  
**Source code:** https://github.com/amit-ksh/skill-browser  
**Demo video:** Add the public YouTube URL before submitting.

## About

Skill Browser is a human-controlled personal library of reusable AI-agent skills. People browse trusted skills, inspect their provenance, and curate a local Skillspace. Agents can then discover and retrieve only the skills relevant to the task through WebMCP.

## Why WebMCP

A skill registry is most useful when an agent can find the right instructions at the moment it needs them. WebMCP lets Skill Browser expose focused browser tools directly to the agent, replacing prompt copy/paste and brittle custom integrations with a live, typed interface.

## Human + agent experience

People decide what belongs in their Skillspace and can inspect each skill's source, version, license, and content. Agents search compact metadata first and retrieve full instructions only when needed. This creates a shared live capability context while keeping the browser as the trust boundary.

## WebMCP implementation

The client-side WebMCP adapter feature-detects browser support and registers four typed tools:

- `search_skills`
- `get_skill_metadata`
- `get_skill`
- `list_my_skills`

Inputs are validated with Zod, outputs are sanitized, and the WebMCP adapter uses the same domain services as the UI. The personal Skillspace is local-first and stored in IndexedDB. Skill content is treated as untrusted data and is never executed.

## Open source

The project is public under the [MIT License](LICENSE).
