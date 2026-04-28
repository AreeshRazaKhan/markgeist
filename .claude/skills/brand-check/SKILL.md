---
name: brand-check
description: Audit a file (HTML/JSX/CSS) against the OZ Frequency brand guide and design rules. Reports violations and suggests fixes.
---

# brand-check · audit a file against the brand system

When invoked with a file path (e.g., `/brand-check src/components/Hero.tsx`),
audit it against the OZ Frequency brand system and produce a violation report.

## Steps
1. Read the target file.
2. Read `brand-guide.md`, `.claude/context/brand-tokens.md`,
   `.claude/rules/design-rules.md`, `.claude/rules/code-rules.md`.
3. Walk every check below. For each violation, cite the exact line.
4. Output a fix list — concrete edits, not vague advice.

## Audit checklist

### Color
- [ ] No hard-coded hex values (must come from brand tokens / Tailwind theme)
- [ ] Single-accent rule per component (orange does exactly one job)
- [ ] `--live` red used only for live/recording indicators
- [ ] No gradient on text

### Typography
- [ ] Display & subhead in UPPERCASE
- [ ] Body never uppercase
- [ ] No italics in display/subhead
- [ ] Tracking matches the system (display tight, mono wide)

### Layout
- [ ] No centered hero
- [ ] No two adjacent bento cells share span
- [ ] Squared corners (`border-radius: 0`)
- [ ] No drop shadows
- [ ] Section spacing 120px

### Components
- [ ] Every card has corner brackets
- [ ] Every card has a mono `// TAG`
- [ ] Buttons use uppercase mono caps + arrow glyph
- [ ] No emoji as primary UI
- [ ] No stock icon-pack glyphs as primary UI

### Motion
- [ ] Reduced-motion guard present in every animation hook
- [ ] GSAP context cleanup on unmount (if React/Next)
- [ ] No competing CSS keyframes for GSAP-controlled elements
- [ ] WebGL scene has SVG fallback

### Voice
- [ ] No "Welcome to our podcast" / "We believe" / "Submit" / "Thank you"
- [ ] Mono labels carry data (status, ep#, duration, coordinates), not decoration
- [ ] Section names use OZ vocabulary

## Output template

```
# Brand Check — <file>

## ✅ Passing (N)
- ...

## ❌ Violations (N)
1. **<rule>** — line <n>: <what's wrong>
   **Fix:** <concrete edit>
2. ...

## ⚠️ Warnings (N)
- <subjective concerns the human should review>

## Verdict
SHIP / REVISE / REJECT
```
