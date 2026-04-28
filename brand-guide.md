# THE OZ FREQUENCY — Brand Guide

> Mark "Oz" Geist's broadcast. Not a podcast page. A listening post.

The site is a tactical interface — military-grade UI, broadcast-room energy, intentionally cold. Every visual decision answers one question: *would this exist on the wall of an operations bunker?* If not, kill it.

## Voice

**Posture:** Operator-to-operator. Direct. No marketing softness.

**Banned phrases** (auto-fail in `brand-check`):
- "Welcome to our podcast"
- "We believe…"
- "Submit" (use `TRANSMIT →`)
- "Thank you" (use `RECEIVED.`)
- "Our team" (there is no team — there is Oz)

**OZ vocabulary** — these are the only acceptable section names and labels:
| Use | Don't use |
|---|---|
| Transmission Zero | Hero |
| Now Broadcasting | Latest Episode |
| Operator Dossier | About |
| Mission Logs | Episodes / Archive |
| The Field | Guests |
| Intel Feed | Blog |
| Open Comms | Contact / Subscribe |
| Tail Call | Footer |
| Tune In | Listen Now |
| Frequency Unlocked | Subscriber Count |

Mono labels carry **data**, not decoration: `EP. 042`, `48:12`, `LAT 35.4°N`, `STATUS: LIVE`. If a tag has no data, delete it.

## Color

Single accent rule: **orange does exactly one job per component.** Never two orange elements competing.

| Token | Use |
|---|---|
| `--bg` (near-black) | Page + section background |
| `--ink` (white) | Body and display text |
| `--accent` (orange) | The one thing that matters in this view — primary CTA, hovered card, active item |
| `--live` (red) | LIVE / RECORDING indicators only. Nothing else. |
| `--hud` (cold cyan) | Mono data labels, coordinate readouts, secondary HUD chrome |
| `--mute` (warm grey) | Disabled, secondary body text |

**No gradients on text. Ever.** Solid fills only. Gradients allowed only on background ambient washes (≤ 8% opacity).

## Typography

- **Display & subhead:** UPPERCASE, tight tracking (`-0.02em`), heavy weight. Display font: a wide grotesk (Geist Sans / Inter Display). No italics.
- **Body:** sentence case, regular weight. Never uppercase.
- **Mono:** wide tracking (`+0.12em`), uppercase, used for HUD labels, episode numbers, timestamps, coordinates.
- **Hierarchy by size + weight only** — no decorative scripts, no colored headings.

## Layout

- **Squared corners.** `border-radius: 0` everywhere. The only round thing on the site is the crosshair on the logo.
- **No drop shadows.** Depth comes from corner brackets, scan lines, and offset borders.
- **No centered hero.** Asymmetric, weighted left or split.
- **Section spacing:** 120px desktop, 80px mobile.
- **Bento sections:** 12-col asymmetric. No two adjacent cells share span. At least one extra-large lead card per bento.

## Components

Every card carries:
1. **Corner brackets** — 4 small L-shapes at the corners (1px stroke, accent color when active)
2. **Mono `// TAG`** — top-left HUD label with real data (e.g., `// EP. 042`)
3. **Hover ignition** — accent-color border activates + content shifts (1–2px) on hover

Buttons are uppercase mono caps + arrow glyph. Default style:
```
TUNE IN →
```

No emoji. No stock icon-pack glyphs as primary UI. Lucide icons allowed only as secondary chrome (close X, chevrons).

## Motion

- **Reduced-motion guard required** in every animation hook. Honor `prefers-reduced-motion`.
- **GSAP context cleanup** on unmount.
- **No CSS keyframes** competing with GSAP-controlled elements.
- **WebGL fallback:** every WebGL surface ships an SVG/CSS fallback that activates if WebGL fails or `prefers-reduced-motion` is set.
- **Performance budget:** ≤ 60fps target, particle counts capped at 1500, WebGL paused off-screen.

## Banned

- Centered hero
- Rounded corners
- Drop shadows
- Gradient text
- Two orange elements in one viewport
- Generic section names ("About", "Services", "Contact")
- "Welcome", "We believe", "Submit", "Thank you"
- Stock icon packs as primary UI
- Emoji
- Italics in display

## Verdict ladder (for `brand-check`)
- **SHIP** — zero violations
- **REVISE** — only warnings or stylistic concerns
- **REJECT** — any rule violation
