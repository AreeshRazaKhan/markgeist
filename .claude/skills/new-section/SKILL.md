---
name: new-section
description: Scaffold a new bento section for THE OZ FREQUENCY podcast site — produces section name, cell map, HTML/JSX, and animation hook plan, all aligned to the brand guide and design rules.
---

# new-section · scaffold a brand-aligned bento section

When the user invokes this skill (e.g., `/new-section guests`), produce a
complete section ready to drop into `index.html` (or as a Next.js component).

## Steps

1. **Read inputs.** Required: section topic / purpose. Optional: cell count,
   tone hints.
2. **Read these files first:**
   - `brand-guide.md`
   - `.claude/context/brand-tokens.md`
   - `.claude/rules/design-rules.md`
3. **Name the section in OZ vocabulary.** Generic names ("About", "Services")
   are banned. Examples of OK names: `Mission Logs`, `Operator Profile`,
   `Intel Categories`, `Field Report`, `Open Comms`, `Recon Archive`.
4. **Compose 4–7 cells** in a 12-col asymmetric bento. No two adjacent cells
   share span. At least one extra-large lead card.
5. **Write the markup.** Match the existing `index.html` patterns: `.cell`
   with corner brackets, `.tag` HUD label, hover ignition.
6. **Specify animation hooks.** For each cell, note which motion attaches
   (GSAP reveal · parallax speed · hover behaviour · scroll-trigger entry).
7. **Output a creative one-liner** describing the *unexpected* thing this
   section does — the reason a visitor would screenshot it.

## Output template

```
## SECTION: <OZ-vocabulary name>
**Creative one-liner:** <one sentence — what makes this section unexpected>

### Cell map
| Cell | Span | Purpose | Animation |
|---|---|---|---|
| ... | ... | ... | ... |

### Markup
```html
<section ...>
  ...
</section>
```

### Animation plan
- ...

### Brand-rule check
- [ ] No two adjacent cells share span ✓
- [ ] Squared corners only ✓
- [ ] Single-accent rule respected ✓
- [ ] All cells have corner brackets + mono tag ✓
- [ ] Reduced-motion guard mentioned ✓
```

## Don't
- Don't propose more than 7 cells.
- Don't use generic section names.
- Don't introduce new colors outside the brand tokens.
- Don't skip the brand-rule check at the bottom.
