# UI/UX Specification — Skill Browser

## 1. Primary Navigation

```text
Logo
Explore
Categories
My Skills
Collections

[Search]

WebMCP status
```

Desktop should keep `My Skills` and `Explore` one click away.

## 2. Explore Screen

Route:

`/skills`

Structure:

```text
Page title
Short explanation
Search
Category filters
Sort
Skill grid/list
```

Default sorting:

1. Relevance for search.
2. Popularity/quality only after those signals exist.
3. Never pretend a skill is popular without data.

### Empty state

Message:

`No skills found`

Actions:

- Clear filters.
- Try another search.

## 3. Skill Detail Screen

Route:

`/skills/[id]`

Header:

```text
[Category]

Skill Name
Description

Author · Version · License

[Add to Skillspace]
```

Below:

```text
About
Instructions
References
Source
Security / Trust
```

The raw skill source should be available through a collapsible or dedicated source view.

## 4. My Skills

Route:

`/me/skills`

Header:

```text
My Skillspace
12 skills

[Share Skillspace] [Import]
```

Content:

```text
Collections
Installed
Custom
```

Each installed skill supports:

- View.
- Remove.
- Move to collection.

## 5. Skillspace URL

Provide:

```text
Your Skillspace
https://app.example.com/me/<public-id>
```

The URL is the human/agent entry point.

The page should clearly explain:

> Agents can discover the skills exposed by this Skillspace through WebMCP.

## 6. Agent Mode

When WebMCP is available, display a small persistent status indicator:

```text
● Agent ready
```

Clicking opens details:

```text
WebMCP
Supported

Tools exposed:
5

Last invocation:
get_skill
```

When unsupported:

```text
WebMCP unavailable

Open this page in a WebMCP-enabled browser to connect an agent.
```

## 7. Permission UX

Agent mutation:

```text
┌───────────────────────────────────────┐
│ Agent wants to add a skill            │
│                                       │
│ Next.js Expert                        │
│ Source: github.com/...                │
│ Version: 1.2.0                        │
│                                       │
│ This will add the skill to your       │
│ Skillspace.                            │
│                                       │
│ [Deny]                 [Allow]        │
└───────────────────────────────────────┘
```

Never make `Allow` the only obvious option.

## 8. Import UX

Import page/dialog:

```text
Import a Skill

Skill URL
[________________________________]

Supported:
HTTPS public sources

[Preview]
```

After preview:

```text
Source
Validation
Metadata
Content
Warnings

[Cancel] [Add Skill]
```

Warnings must be visible before installation.

## 9. Trust UX

Every skill should communicate provenance:

```text
Source
GitHub

Author
...

License
MIT

Version
1.0.0

Integrity
Verified / Unknown
```

Do not display "Verified" unless an actual verification process exists.

## 10. Responsive Behavior

### Desktop

- Sidebar + content.
- 2–4 card columns depending on width.

### Tablet

- Collapsed sidebar.
- 2 columns.

### Mobile

- Single column.
- Sticky/near-top search.
- Horizontal filter scrolling.
- Detail page actions remain accessible.

## 11. UX Principles

### Human control

The human always understands what the agent is requesting.

### Progressive disclosure

Show concise metadata first. Detailed instructions are one interaction away.

### Provenance first

Users should know where a skill came from before installing it.

### Agent transparency

Every WebMCP action should be observable.

### Fast path

A user should be able to:

`Search -> inspect -> install`

in under a minute.

## 12. Hackathon Demo UX

The final demo should intentionally show:

1. Explore skills.
2. Install one.
3. Open Skillspace.
4. Open the same page in ChatGPT.
5. Ask the agent to find a relevant skill.
6. Agent calls WebMCP.
7. Agent retrieves skill.
8. User sees the tool activity.
9. Agent requests an install.
10. User approves.
11. Skill appears in Skillspace.

This directly demonstrates the human + agent interaction that WebMCP is designed to enable.
