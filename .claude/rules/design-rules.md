---
description: Design rules for THE OZ FREQUENCY — layout, components, motion. Loaded by brand-check + new-section skills.
globs: "*.jsx,*.css,*.html"
---

# Design Rules

## Layout
- **Squared corners only.** `border-radius: 0`. No exceptions.
- **No drop shadows.** Depth via brackets, scan lines, offset borders.
- **No centered hero.** Asymmetric, weighted left or split.
- **Section spacing:** `py-[80px] lg:py-[120px]`.
- **Bento:** 12-col grid, asymmetric. No two adjacent cells share span. ≥ 1 extra-large lead card.

## Color
- **Single-accent rule:** orange does exactly one job per component / viewport.
- **No hard-coded hex.** Reference brand tokens.
- **`--live` red** is exclusively for LIVE / RECORDING indicators.
- **No gradient on text.**

## Components
Every card MUST have:
1. Corner brackets (4 L-shapes at corners)
2. Mono `// TAG` (top-left, real data — episode #, status, duration, coordinates)
3. Hover ignition (border accent + 1–2px content shift)

Buttons:
- UPPERCASE mono caps
- Arrow glyph (`→`)
- No rounded edges
- No drop shadow

## Motion
- **`prefers-reduced-motion` guard required** in every animation hook.
- **GSAP context cleanup on unmount** (React/Next).
- **No CSS keyframes** competing with GSAP-controlled elements.
- **WebGL surfaces require an SVG/CSS fallback.**
- **Particle counts ≤ 1500.** Pause off-screen.
- **Animations are transform / opacity only** unless WebGL.

## Voice (in copy)
- No "Welcome", "We believe", "Submit", "Thank you".
- Section names use OZ vocabulary (see `brand-guide.md`).
- Mono labels carry data (status, ep#, duration, coordinates), never decoration.

## Banned
- Centered hero
- Rounded corners (any value > 0)
- Drop shadows
- Gradient text
- Two orange elements in one viewport
- Generic section names
- Stock icon packs as primary UI
- Emoji as primary UI
- Italics in display / subhead
