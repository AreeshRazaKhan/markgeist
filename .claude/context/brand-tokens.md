# Brand Tokens — THE OZ FREQUENCY

Single source of truth for color, type, spacing, motion. Mirrors `tailwind.config.js` and `src/app/globals.css`. **Never hard-code hex values in components — always reference these tokens.**

## Color (HSL CSS variables)

| Token | CSS var | Tailwind | Hex (reference) | Use |
|---|---|---|---|---|
| Background | `--bg` | `bg-bg` | `#0A0A0A` | Page + section bg |
| Surface | `--surface` | `bg-surface` | `#111111` | Cards, panels |
| Ink | `--ink` | `text-ink` | `#F5F5F4` | Body / display |
| Mute | `--mute` | `text-mute` | `#A8A29E` | Secondary text |
| Accent | `--accent` | `text-accent` / `bg-accent` | `#F97316` | Single-job orange |
| Live | `--live` | `text-live` / `bg-live` | `#EF4444` | LIVE / REC only |
| HUD | `--hud` | `text-hud` | `#22D3EE` | Mono data, HUD chrome |
| Border | `--border` | `border-border` | `#27272A` | Default border |
| Border Hot | `--border-hot` | `border-border-hot` | `#F97316` | Active / hover border |

## Type

| Token | Family | Use |
|---|---|---|
| `font-display` | Geist Sans / Inter Display | Display + subhead, UPPERCASE, tracking `-0.02em` |
| `font-sans` | Geist Sans / Inter | Body, sentence case |
| `font-mono` | JetBrains Mono / Geist Mono | HUD labels, UPPERCASE, tracking `+0.12em` |

## Spacing

| Token | Value | Use |
|---|---|---|
| `--section-y` | `120px` (desktop) / `80px` (mobile) | Vertical section padding |
| `--cell-pad` | `24px` | Bento cell padding |
| `--corner-bracket` | `12px` | L-bracket arm length |

## Radii

`--radius: 0` — squared corners only. Forbidden to override.

## Motion

| Token | Value | Use |
|---|---|---|
| `--ease-ignite` | `cubic-bezier(0.22, 1, 0.36, 1)` | Hover ignite, reveal |
| `--ease-scrub` | `cubic-bezier(0.65, 0, 0.35, 1)` | Scroll-pinned scrub |
| `--dur-quick` | `220ms` | Hover, micro |
| `--dur-reveal` | `900ms` | Section entry |
| `--dur-orchestrate` | `1600ms` | Hero set piece |

## Z-layers

- `z-hud`: 60 (sticky ON-AIR chip, magnetic cursor)
- `z-overlay`: 50 (sheet, dialog scrim)
- `z-nav`: 40
- `z-content`: 1
- `z-canvas`: 0 (WebGL surfaces)
