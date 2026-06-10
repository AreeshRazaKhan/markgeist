---
description: Canonical design + brand rules for The Oz Cast — the podcast hosted by Mark "Oz" Geist. Loaded by brand-check + new-section skills. Single source of truth — supersedes the old brand-guide.md and brand-tokens.md.
globs: "*.jsx,*.js,*.css,*.html,*.md"
---

# Mark Geist — Design & Brand Rules

> The Oz Cast — hosted by Mark "Oz" Geist. Marine. Annex Security Team Benghazi survivor. Co-author of 13 Hours. Co-founder of Shadow Warriors Project. The interviews, on the record.

The site reads as a **dark editorial studio** in the Awwwards big-type / agency dialect, with a **tactical art direction** layered on top (driven by the logo: condensed bold italic "Oz" inside a sniper-scope reticle, hazard orange + pure white). It is **not** a bento dashboard, **not** a radio station, **not** a generic SaaS marketing page.

If a visual decision can't survive the test "would this read as Mark Geist's voice — operator-direct, on-the-record, no marketing softness?" — kill it.

---

## 1. Voice

**Posture:** Operator-to-operator. Direct. Receipts only. Never marketing.

**Banned phrases** (auto-fail in `brand-check`):
- "Welcome…"
- "We believe…"
- "Submit" → use `Subscribe` / `Send` / verb-first label
- "Thank you" → use `Received.` / `You're in.`
- "Our team" — there is no team. There is Oz.

**Vocabulary** — podcast-native, never radio:

| Use | Don't use |
|---|---|
| Episode (`EP 06`) | Frequency / `101.5 MHZ` / Dial |
| Latest episode | Now broadcasting / On air |
| Episode archive | Mission logs (legacy — only the section name retains it for character) |
| About Oz | Operator dossier (legacy section name allowed) |
| Guests | The field (legacy — allowed) |
| Blog | Journal / Intel feed (both legacy — retired) |
| Newsletter / Subscribe | Open Comms / Tune in / Comm channel |
| Listen on Spotify | Tune in · Spotify |
| Play `EP 06` | Transmit |
| Host / Guest / Recorded date | Operator / Callsign / Coordinates |

**Banned radio literalisms:** `frequency`, `MHZ`, `transmit`, `broadcast` (as a verb), `comm channel`, `signal control`, `cockpit`, `beacon`, `encrypt`, "tune in" as a primary CTA, rotating dial UI, fake-tuner readouts. The public-facing brand is **THE OZ CAST** (the wordmark); **Mark "Oz" Geist** is the host. Earlier "MARK GEIST" wordmark framing and the older "OZ FREQUENCY" framing are both retired.

**Mono labels carry data, never decoration:** `EP 06`, `02:15:00`, `JAN 19, 2026`, `CRITICAL`, `LIVE`. If a `// TAG` is purely flavor, delete it.

---

## 2. Color

**Source of truth:** `src/app/globals.css` `:root` block + the Tailwind tokens in `tailwind.config.js`. Never hard-code hex values in components.

| Token | CSS var | Tailwind | Hex | Use |
|---|---|---|---|---|
| Black | `--bg` | `bg-bg` | `#0A0A0A` | Page bg, default section bg |
| Gunmetal | `--surface` | `bg-surface` | `#141414` | Cards, panels, section variants |
| Steel | `--steel` | `bg-steel` | `#1F1F1F` | Elevated, hovered card body |
| Concrete | `--border` | `border-border` | `#2A2A2A` | Borders, hairlines, dividers |
| Bone | `--ink` | `text-ink` | `#F5F1E8` | Body + display text (warm white) |
| Smoke | `--mute` | `text-mute` | `#8C8C8C` | Secondary text, mono labels |
| **Orange** | `--accent` | `text-accent` / `bg-accent` | `#F58220` | The single accent. Matches the logo's reticle |
| Ember | `--ember` | `text-ember` | `#FF9A3C` | Hover state on orange, ambient gradient wash |
| Live | `--live` | `text-live` / `bg-live` | `#E53935` | LIVE / RECORDING / NEW EP indicators only |

### Color rules

- **Single-accent rule.** Orange does exactly one job per visible viewport. Two competing oranges → fail.
- **Bone over white.** Body text is `--bone` `#F5F1E8`. Pure white `#FFFFFF` is forbidden — the warm cast carries the brand.
- **No hard-coded hex.** Always reference tokens via `text-ink`, `bg-bg`, `hsl(var(--accent))`, etc.
- **No gradient on text.** Solid fills only. Background gradients permitted at ≤ 18% opacity (`accent-wash`, `ember-wash`).
- **`--live` red is reserved.** Use only for the pulsing live dot, the `NEW EP` badge, the threat-tag `CRITICAL`. Nothing else.
- **WCAG AA minimum.** All informational text must hit 4.5:1 (normal) / 3:1 (large) contrast. Decorative `aria-hidden` text is exempt. Audit script in `audit/` (or via the playwright-skill) catches regressions.

---

## 3. Typography

**Stack** (loaded via `next/font` in `src/app/layout.jsx`):

| Token | Family | Use |
|---|---|---|
| `--font-display` | **Anton** (400, faux-italic for accent lines — matches the logo's slant exactly) | Display headlines, oversized wordmarks, episode titles |
| `--font-sub` | Bebas Neue (400) | Reserved fallback / sub-display |
| `--font-sans` | Space Grotesk (300–700) | Body copy, paragraphs, CTAs |
| `--font-mono` | JetBrains Mono (400/500/700) | HUD labels, episode numbers, durations, dates, code |

### Type rules

- **Display: UPPERCASE, tight tracking (`-0.015em` to `-0.04em`), line-height 0.82–0.92.** Larger sizes = tighter both axes. See `.display-xl` / `.display-lg` in `globals.css`.
- **Anton has no italic face.** CSS `font-style: italic` falls back to a faux-skew that visually matches the logo's "Oz" italic — that's intentional. Use it for the secondary accent line in any 2-line headline (e.g. `MARK / "OZ" / GEIST.`, `ON THE / RECORD.`, `SAY HELLO, / OPERATOR.`).
- **Body: Space Grotesk 300–500, sentence case.** Never uppercase paragraphs. Never display-typeface body.
- **Mono: UPPERCASE, tracking `0.18em–0.22em`, weight 400.** Always carries data.
- **No decorative scripts. No italics in body.** Only the display faux-italic accent line is allowed italic.
- **Hierarchy by size + weight + color, not by extra fonts.** Three families is the cap.

### Big-type traits (the Awwwards-studio dialect)

- **Section h2's** scale `clamp(44px, 6vw, 104px)`.
- **Hero h1** scales `clamp(48px, 7vw, 116px)`.
- **Giant wordmark moments** scale up to `clamp(96px, 18vw, 320px)` (hero `THE OZ CAST`, footer `ON THE RECORD.`, newsletter `SAY HELLO, OPERATOR.`).
- **Background-only wordmarks** (decorative, `aria-hidden`, `text-ink/[0.04]` opacity) up to `clamp(160px, 25vw, 400px)`.
- All giant wordmarks use the `.full-bleed` utility (`width: 100vw; left: 50%; margin-left: -50vw`) so they break out of the 1280px container edge-to-edge.

---

## 4. Layout

- **Squared corners only.** `--radius: 0`. Never override. The only round element is the **brand reticle** in the logo (and the few SVG `border-radius: 50%` decorative rings inside it).
- **No drop shadows.** Depth comes from corner brackets, accent left-edge rules, scanline overlays, hairline borders.
- **Container:** `.container-x` = `max-w-[1280px] px-6 lg:px-12`. Narrow editorial measure. `.container-narrow` = 920px for prose-heavy blocks.
- **Section padding:** 96px mobile, 144px desktop (`section-y` utility).
- **Stacked full-width sections, not bento.** Each section is a vertical full-width unit. **No 12-col asymmetric mosaic.** Cover-art rows use 1 / 2 / 3-column grids only.
- **Centered headlines are allowed.** The earlier "no centered hero" rule is retired — the editorial direction makes centered display headlines + centered CTAs + 4-tile cover-art row + giant overflow wordmark the canonical hero pattern.
- **Giant wordmark moments** are required on: (a) the hero (`THE OZ CAST`), (b) the newsletter CTA (`SAY HELLO, OPERATOR.`), (c) the footer (`ON THE RECORD.`). Optional: a low-opacity `text-ink/[0.04]` background wordmark behind the about-Oz section.
- **Page IA** (canonical seven sections + footer):

| # | Section | id | Component |
|---|---|---|---|
| 01 | Hero | `#transmission` | `transmission-zero.jsx` |
| 02 | Subscribe row | `#subscribe` | `subscribe-row.jsx` |
| 03 | Latest episode | `#latest-episode` | `now-broadcasting.jsx` |
| 04 | About Oz | `#operator` | `operator-dossier.jsx` |
| 05 | Episode archive | `#mission-logs` | `mission-logs.jsx` |
| 06 | Guests | `#the-field` | `the-field.jsx` |
| 07 | Blog | `#blog` | `intel-feed.jsx` |
| 08 | Newsletter | `#newsletter` | `open-comms.jsx` |
| ∞ | Footer | — | `tail-call.jsx` |

---

## 5. Components

### Universal card chrome
- **Squared corners.** Always.
- **Border:** `border-border` default. Hover: `border-accent`.
- **Hover ignition:** border accent + small content shift (1–2px) + `text-ink → text-accent` on title.
- **Corner brackets** (`<CornerBrackets />`) — used **only on featured cards** (hero featured-episode, occasional emphasized cell). Not on every card. Earlier "every card MUST have brackets" rule is retired.
- **Edge-rule** (left accent stripe scaling up on hover) — preferred for editorial rows where corner brackets would be too noisy. See `.edge-rule` in `globals.css`.

### Episode cards
- MUST expose a `<PlayButton />` (square accent button, no corner brackets on the button itself). Either persistent (top-right of cover) or revealed-on-hover via a `bg-bg/60` overlay.
- MUST show: `// EP NN` mono tag, episode title (Anton uppercase tracking-display), recorded date or duration mono.
- Cover art via `<Portrait src={...} alt="..." />`. Until real artwork lands, `<Portrait>` falls back to a deterministic Picsum placeholder seeded by `ep.id` (warm duotone tinted + film grain overlay so all placeholders read on-brand).

### Buttons
- **`<ArrowButton variant="primary | ghost | ember">`** — UPPERCASE mono caps + arrow glyph (`→`). No rounded edges, no shadow.
- **`<PlayButton size="sm | md | lg">`** — square orange button, white play triangle, hover state `bg-ember`.

### HUD labels
- **`<HudTag color="accent | mute | live | ink">`** — mono uppercase, leading orange `// ` prefix.
- Use sparingly — one per section header is the cap. Don't decorate every block with `// TAG`.

### Forms
- Inputs: bordered `border-border bg-bg`, mono uppercase placeholder for short fields, mono lowercase for emails.
- All form inputs MUST have a label (visible `<Label>`, wrapped `<label>`, or sr-only `<label htmlFor>` + matching `id` + `aria-label`).
- Focus state: `focus-visible:ring-2 focus-visible:ring-accent ring-offset-2 ring-offset-bg`.

### Logo
- File: `/public/the-oz-cast-logo.png` — `OZ` wordmark with the sniper-scope reticle as the `O`, hazard orange, transparent PNG.
- Use the actual image, never re-render via type. Top-nav: `h-7`. Footer: `h-10`.

---

## 6. Motion

The motion stack — every text/scroll animation must come from one of these components or be explicitly justified:

| Component | Effect |
|---|---|
| `<Reveal>` | Block fade-up + autoAlpha on scroll. **Bidirectional** (`toggleActions: 'play none none reverse'`). |
| `<SplitReveal>` | Per-word translateY 110% → 0 with stagger, clip-path bottom-edge mask (so faux-italic letterforms aren't clipped on the sides). Bidirectional. |
| `<LineReveal>` | Per-rendered-line clip-path mask + slide up. Re-runs on resize. Bidirectional. |
| `<ScrubReveal>` | Per-word opacity scrub tied to scroll progress (read-along effect). Auto-bidirectional via scrub. |
| `<ColorScrub>` | Wraps a heading; scrubs `color` from `hsl(0 0% 55%)` (mute, AA-passing) to ink as the heading enters viewport. Auto-bidirectional. |
| `<OrbitBadge>` | SVG `textPath` rotating around a center reticle. Continuous loop. |
| `<RGBSplit>` | Three stacked copies (live red + accent + ink) start offset; on enter, ghosts converge into the ink copy. Used on giant wordmarks only. Smooth `power3.inOut`, ~2.6s duration. Bidirectional. |
| `<TextScramble>` | Letters cycle through random tactical glyphs before locking to the real letter. Used on section HUD labels. Bidirectional (re-scrambles on `onLeaveBack`). |
| `<Odometer>` | Column-rolling digit counter. Used for the listener count. Bidirectional via paused-timeline + `onEnter: tl.play / onLeaveBack: tl.reverse`. |
| `<Magnetic>` | Pointer-attraction on hero CTA. |

### Motion rules
- **`prefers-reduced-motion` guard required** in every animation hook. Reduced-motion path snaps to final state.
- **`gsap.context()` cleanup on unmount** via the `useGsapContext` hook.
- **Scroll-triggered animations are bidirectional.** No `once: true` — animations reverse when the user scrolls back above the start. Use `toggleActions: 'play none none reverse'` on `gsap.fromTo`, or paired `onEnter` / `onLeaveBack` callbacks for custom effects.
- **No CSS keyframes** competing with GSAP-controlled elements.
- **Animations are `transform` / `opacity` / `clip-path` / `color` only.** No `width`/`height`/`top`/`left` tweens (layout-thrash).
- **WebGL surfaces require an SVG/CSS fallback.** Reduced-motion + WebGL-init-failure both fall back.
- **Particle counts ≤ 1500.** Pause off-screen via `IntersectionObserver`.
- **Tight line-height + clip-path masks** — `<SplitReveal>` outer wrapper uses `clip-path: inset(-0.4em -0.4em 0 -0.4em)` (clips bottom only, lets faux-italic letter tops/sides overflow). Don't use raw `overflow: hidden` on display-italic spans — it eats letter edges.

---

## 7. Accessibility (WCAG AA minimum)

- **Single `<h1>`** per page, semantically meaningful.
- **Heading levels don't skip** (h2 → h3 → h4, never h2 → h4).
- **Landmarks present:** `<main>`, `<nav>`, `<footer>` (or appropriate `role="…"`).
- **`<html lang="en">`** required.
- **All `<img>` have `alt`** — empty alt allowed only for purely decorative images that have an `aria-hidden` cousin describing them.
- **All buttons / links have an accessible name** — text content, `aria-label`, or `aria-labelledby`.
- **All form inputs have a label** — visible `<label htmlFor>` + matching `id`, OR `sr-only` label, OR `aria-label` (use both for redundancy on critical fields).
- **Focus-visible rings** on every interactive control: `focus-visible:ring-2 focus-visible:ring-accent ring-offset-2 ring-offset-bg`.
- **Decorative content** (background wordmarks, orbit badge, scanline overlays, grid bg, ember washes) must carry `aria-hidden="true"` so screen-readers skip them.
- **Color contrast minimum AA** (4.5:1 normal, 3:1 large 24px+ or 18.66px+ bold). Audit via the playwright-skill a11y script.
- **`prefers-reduced-motion`** snaps every animation to its final state — no scrub, no scramble, no roll. The only allowable motion under reduced-motion is the live-dot `animate-ping` (it's small and signals state).

---

## 8. Banned (auto-fail in `brand-check`)

- Pure white `#FFFFFF` text or borders
- Rounded corners on any element except the brand reticle
- Drop shadows
- Gradient text
- Two competing oranges in the same viewport
- Bento mosaic layouts (12-col asymmetric mosaic)
- HUD `// NN · NAME` labels on every block (use sparingly — section header only)
- Generic section names: "About Us", "Services", "Our Work"
- Radio literalisms: "frequency", "MHZ", "transmit" CTA, rotating dial, fake-tuner UI
- Italics on body copy (only display-accent line allowed faux-italic)
- Stock icon packs as primary UI (Lucide allowed only as secondary chrome — close ✕, chevrons)
- Emoji as primary UI
- Initials text inside cover-art tiles (use `<Portrait>` placeholder image fallback, not letters)
- `once: true` on scroll-triggered animations (must be bidirectional)
- Hard-coded hex colors in components (use tokens)
- "Welcome", "We believe", "Submit", "Thank you"

---

## 9. Verdict ladder (for `brand-check` skill)

- **SHIP** — zero rule violations + AA contrast passes
- **REVISE** — only stylistic concerns / non-binding suggestions
- **REJECT** — any banned-list violation, AA contrast failure on informational text, missing accessibility primitive (label, lang, accessible name), or unbidirectional scroll animation

---

## 10. Source-of-truth files

| File | Purpose |
|---|---|
| `src/app/globals.css` | All CSS tokens (`:root`), display utilities (`.display-xl`, `.display-lg`), background utilities (`.scanlines`, `.grid-bg`, `.accent-wash`, `.ember-wash`, `.grain`), full-bleed utility |
| `tailwind.config.js` | Tailwind color/font/spacing/letter-spacing token mapping |
| `src/app/layout.jsx` | Font loading via `next/font` (Anton + Bebas Neue + Space Grotesk + JetBrains Mono) |
| `src/components/motion/` | All motion components — single source for the animation vocabulary |
| `src/constants/episodes.js` / `nav.js` / `guests.js` / `dispatches.js` | Content data, podcast-vocabulary fields only |
| `public/the-oz-cast-logo.png` | The brand mark — no other logo asset |
| `.claude/rules/design-rules.md` | **THIS FILE** — canonical rules. Loaded by `brand-check`, `new-section`, and `init` skills |

The legacy `brand-guide.md` and `.claude/context/brand-tokens.md` are deprecated. This file supersedes both.
