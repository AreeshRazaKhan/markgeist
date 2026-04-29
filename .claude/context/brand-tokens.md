# Brand tokens

> **Merged into `.claude/rules/design-rules.md`.** All color, type, spacing, and motion tokens — plus their `:root` / Tailwind mappings and usage rules — now live in the canonical rules file.

**Read the canonical rules here:** [`../rules/design-rules.md`](../rules/design-rules.md)

The implementation source of truth remains `src/app/globals.css` (`:root`) and `tailwind.config.js` — never hard-code hex values; always reference the tokens via Tailwind utilities or `hsl(var(--token))`.
