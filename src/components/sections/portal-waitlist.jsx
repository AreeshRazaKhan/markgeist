'use client'

import { useState } from 'react'
import { toast } from 'sonner'

import HudTag from '@/components/motion/hud-tag'
import CornerBrackets from '@/components/motion/corner-brackets'

// Phase 1: the full members-only portal (login, dashboard, watch history) ships in
// Phase 2. Until then this captures early-bird interest. Submit is simulated — no backend.
const PortalWaitlist = () => {
  const [submitting, setSubmitting] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    setSubmitting(true)
    try {
      await new Promise((r) => setTimeout(r, 700))
      form.reset()
      toast("You're in.", { description: 'First to know when the Operator Circle portal opens.' })
    } catch (err) {
      console.error('[PortalWaitlist]:', err)
      toast('Send failed.', { description: 'Try again in a moment.' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="container-x border-t border-border py-20 lg:py-24">
      <div className="relative border border-border bg-surface p-6 sm:p-8 lg:p-12">
        <CornerBrackets color="accent" />
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-8 lg:gap-y-0">
          <div className="col-span-12 min-w-0 lg:col-span-6">
            <div className="flex items-center gap-3">
              <span aria-hidden className="h-2 w-2 animate-ping bg-live" />
              <HudTag color="live">PORTAL · OPENING SOON</HudTag>
            </div>
            <h2 className="mt-6 font-display text-3xl uppercase leading-[0.95] tracking-display text-ink lg:text-5xl">
              The member portal
              <span className="block italic text-accent pb-[0.06em]">is being built.</span>
            </h2>
            <p className="mt-5 max-w-md text-sm text-mute">
              Login, watch history, and the monthly live Breakdown land after launch. Drop your
              email and you&apos;ll be first through the door — at the founding rate.
            </p>
          </div>

          <form
            onSubmit={onSubmit}
            className="col-span-12 flex min-w-0 flex-col gap-3 sm:flex-row lg:col-span-6"
          >
            <div className="min-w-0 flex-1">
              <label htmlFor="portal-email" className="sr-only">
                Email address
              </label>
              <input
                id="portal-email"
                name="email"
                type="email"
                required
                placeholder="you@domain.com"
                aria-label="Email address"
                className="block w-full border border-border bg-bg px-4 py-3 font-mono text-sm lowercase text-ink placeholder:text-mute focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ring-offset-2 ring-offset-bg"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="shrink-0 border border-accent bg-accent px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-accent-foreground transition-colors hover:bg-ember hover:border-ember disabled:opacity-50"
            >
              {submitting ? 'Sending…' : 'Notify me →'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default PortalWaitlist
