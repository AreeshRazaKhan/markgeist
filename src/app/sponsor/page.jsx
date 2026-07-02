'use client'

import { useState } from 'react'
import { toast } from 'sonner'

import HudTag from '@/components/motion/hud-tag'
import PageHeader from '@/components/nav/page-header'
import { SPONSOR_TIERS } from '@/constants/sponsors'

// Phase 1: front-end only. No public pricing — the form routes interest to Oz,
// who scopes the fit and builds a custom package. Submit is simulated (no backend).
const TIER_OPTIONS = ['Not sure yet', ...SPONSOR_TIERS.map((t) => t[0].toUpperCase() + t.slice(1))]

const WHY = [
  {
    label: 'Per-episode placement',
    body: 'Your brand runs on the episodes that fit — single drop or a package across the season.'
  },
  {
    label: 'A tracked offer',
    body: 'Every sponsor link carries an /OZ-style code, so fans get the deal and you see the return.'
  },
  {
    label: 'Oz closes it himself',
    body: 'No media pack, no call center. Interest lands with Mark and he scopes the package direct.'
  }
]

const SponsorPage = () => {
  const [submitting, setSubmitting] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    setSubmitting(true)
    try {
      await new Promise((r) => setTimeout(r, 600))
      form.reset()
      toast('Received.', { description: "You're on Oz's desk. He scopes every package personally." })
    } catch (err) {
      console.error('[SponsorPage]:', err)
      toast('Send failed.', { description: 'Try again or reach out via the contact page.' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="relative">
      <PageHeader
        eyebrow="SPONSOR AN EPISODE"
        title="PUT YOUR BRAND"
        accent="ON THE RECORD."
        lead="Reach an audience of veterans, law enforcement, and everyday Americans who show up for the long form. No public rate card — tell us the fit and Oz builds the package."
      />

      <section className="container-x grid grid-cols-12 gap-x-8 gap-y-12 pb-32 lg:gap-x-12">
        <div className="col-span-12 lg:col-span-5">
          <HudTag color="accent">WHY SPONSOR</HudTag>
          <ul className="mt-6 space-y-6 border-t border-border pt-6">
            {WHY.map((w) => (
              <li key={w.label}>
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink">
                  <span aria-hidden className="text-accent">{'// '}</span>
                  {w.label}
                </p>
                <p className="mt-2 text-sm text-mute">{w.body}</p>
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={onSubmit} className="col-span-12 grid grid-cols-1 gap-6 lg:col-span-7">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="font-mono text-[10px] uppercase tracking-[0.22em] text-mute"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                required
                className="mt-2 block w-full border border-border bg-bg px-4 py-3 font-mono text-sm text-ink focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ring-offset-2 ring-offset-bg"
              />
            </div>
            <div>
              <label
                htmlFor="company"
                className="font-mono text-[10px] uppercase tracking-[0.22em] text-mute"
              >
                Company
              </label>
              <input
                id="company"
                name="company"
                required
                className="mt-2 block w-full border border-border bg-bg px-4 py-3 font-mono text-sm text-ink focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ring-offset-2 ring-offset-bg"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="font-mono text-[10px] uppercase tracking-[0.22em] text-mute"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@company.com"
              className="mt-2 block w-full border border-border bg-bg px-4 py-3 font-mono text-sm lowercase text-ink placeholder:text-mute focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ring-offset-2 ring-offset-bg"
            />
          </div>

          <div>
            <label
              htmlFor="tier"
              className="font-mono text-[10px] uppercase tracking-[0.22em] text-mute"
            >
              Tier interest
            </label>
            <select
              id="tier"
              name="tier"
              className="mt-2 block w-full border border-border bg-bg px-4 py-3 font-mono text-sm uppercase tracking-[0.18em] text-ink focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ring-offset-2 ring-offset-bg"
            >
              {TIER_OPTIONS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="message"
              className="font-mono text-[10px] uppercase tracking-[0.22em] text-mute"
            >
              What are you looking to run?
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              placeholder="Product, budget range, single episode or a package…"
              className="mt-2 block w-full border border-border bg-bg px-4 py-3 text-sm text-ink placeholder:text-mute focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ring-offset-2 ring-offset-bg"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 self-start border border-accent bg-accent px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-accent-foreground transition-colors hover:bg-ember hover:border-ember disabled:opacity-50"
          >
            {submitting ? 'Sending…' : 'Send inquiry →'}
          </button>
        </form>
      </section>
    </main>
  )
}

export default SponsorPage
