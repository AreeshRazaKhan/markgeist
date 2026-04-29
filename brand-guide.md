# Mark Geist — Brand Guide

> **This file has been merged into `.claude/rules/design-rules.md`.** That is now the single canonical source of truth for all design, brand, voice, color, typography, layout, component, motion, and accessibility rules.

The merge consolidates what used to live in three separate files (`brand-guide.md`, `.claude/rules/design-rules.md`, `.claude/context/brand-tokens.md`) into one rules file that the `brand-check`, `new-section`, and `init` skills load directly.

**Read the canonical rules here:** [`.claude/rules/design-rules.md`](.claude/rules/design-rules.md)

---

## Why the change

The legacy `brand-guide.md` was written when the site was a tactical-radio interface (OZ FREQUENCY, broadcasts, MHZ, "Tune In", bento dashboards). The site has since shifted to a **dark editorial / Awwwards-studio aesthetic** with **podcast-native vocabulary** while keeping the **tactical art direction** (Anton condensed italic + hazard orange + the OZ reticle logo). The canonical file reflects the current state and the current motion stack (10 components: `Reveal`, `SplitReveal`, `LineReveal`, `ScrubReveal`, `ColorScrub`, `OrbitBadge`, `RGBSplit`, `TextScramble`, `Odometer`, `Magnetic` + supporting `PlayButton` and `Portrait`). It also adds explicit WCAG AA contrast rules and bidirectional-scroll-animation requirements.
