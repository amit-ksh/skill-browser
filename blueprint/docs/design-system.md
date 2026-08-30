# Design System — Skill Browser

## 1. Design Direction

The visual language should take inspiration from the qualities visible in skills.sh:

- Dense but calm information architecture.
- Developer-tool credibility.
- Strong typography hierarchy.
- Search as the primary interaction.
- Compact metadata.
- Minimal decoration.
- High information density without visual clutter.
- Clear technical provenance.
- Neutral surfaces with restrained accent usage.

Do not copy skills.sh branding, logos, proprietary assets, or exact layouts. Recreate the **design principles**, not the site.

Reference: skills.sh emphasizes design/UX skills around hierarchy, spacing, typography, accessibility, and consistent design systems. citeturn0search0

## 2. Product Personality

Keywords:

- Technical
- Open
- Trustworthy
- Fast
- Discoverable
- Agent-native
- Developer-friendly

Avoid:

- Generic AI gradients.
- Excessive glassmorphism.
- Decorative dashboards.
- Large hero illustrations.
- Excessive animation.

## 3. Design Tokens

Use CSS variables and semantic tokens.

### Color roles

```text
--background
--surface
--surface-muted
--surface-elevated
--border
--border-strong

--text
--text-muted
--text-subtle

--accent
--accent-foreground

--success
--warning
--danger
--info
```

Do not hardcode colors inside components.

### Spacing

Use a 4px base:

```text
4, 8, 12, 16, 20, 24, 32, 40, 48, 64
```

### Radius

```text
sm: 6px
md: 8px
lg: 12px
xl: 16px
pill: 999px
```

Use small radii for technical/developer surfaces.

### Typography

Use a highly readable sans-serif for UI and a monospace face only for:

- IDs.
- URLs.
- Version numbers.
- Code.
- Skill manifests.

Suggested hierarchy:

```text
Display: 40/48
H1: 32/40
H2: 24/32
H3: 18/26
Body: 14/22
Small: 12/18
Mono: 12/18
```

## 4. Layout

Desktop:

```text
┌─────────────────────────────────────────────┐
│ Header                                      │
├───────────────┬─────────────────────────────┤
│ Navigation    │ Main                        │
│               │                             │
│ Categories    │ Content                     │
│ Collections   │                             │
│ Skillspace    │                             │
└───────────────┴─────────────────────────────┘
```

Mobile:

- Collapse sidebar.
- Preserve search prominently.
- Use bottom/compact navigation where appropriate.
- Skill cards become single-column.

## 5. Core Components

### Skill Card

Must show:

- Skill name.
- One-line description.
- Category.
- Tags.
- Version.
- Author.
- Install state.

Primary action:

`Add`

Secondary action:

`View`

### Skill Detail

Sections:

1. Header.
2. Description.
3. Metadata.
4. Source/provenance.
5. Skill instructions.
6. References.
7. Install action.

Trust information must be visually prominent.

### Skillspace

Show:

- Skill count.
- Collections.
- Installed skills.
- Public/private state.
- Share URL.
- WebMCP availability.

### Agent Panel

Purpose is observability, not a chat replacement.

Display:

```text
WebMCP
Connected

Agent requested:
Next.js Expert

Tool:
get_skill

Status:
Completed
```

### Permission Request

Use a modal/dialog only for meaningful authorization.

Show:

- Agent action.
- Skill.
- Source.
- Requested mutation.
- Consequence.
- Allow/Deny.

No ambiguous buttons.

## 6. Interaction Rules

- Every primary action has visible feedback.
- Disabled controls explain why.
- Loading states preserve layout.
- Search updates quickly.
- Keyboard navigation is first-class.
- Focus states are always visible.
- Destructive actions require confirmation.
- Agent mutations never silently succeed.

## 7. Motion

Use motion sparingly:

- 120–180ms for micro-interactions.
- 180–250ms for panels/dialogs.
- Avoid continuous animation.
- Respect `prefers-reduced-motion`.

## 8. Accessibility

Target WCAG 2.2 AA principles:

- Keyboard navigable.
- Visible focus.
- Semantic buttons/links.
- Labels for inputs.
- Accessible dialogs.
- Sufficient contrast.
- No color-only state communication.
- Reduced-motion support.
- Screen-reader-friendly status messages.

## 9. Component Architecture

Use shadcn/ui-style composable primitives where appropriate.

Keep primitives generic:

```text
Button
Dialog
Input
Badge
Tabs
Tooltip
```

Product components compose them:

```text
SkillCard
SkillDetail
PermissionRequest
WebMcpStatus
```

Never put product-specific logic into generic UI primitives.

## 10. Icons

Use a single open-source icon set consistently.

Do not mix multiple icon families without a documented reason.

Icons must support meaning rather than replace text.

## 11. Visual QA Checklist

Before each release:

- Check desktop 1440px.
- Check tablet.
- Check mobile 390px.
- Keyboard-only navigation.
- Empty states.
- Loading states.
- Error states.
- Long skill names.
- Large tag sets.
- Missing author/source.
- WebMCP unsupported state.
- Permission denied state.
