'use client'

import { useState } from 'react'
import { toast } from 'sonner'

import HudTag from '@/components/motion/hud-tag'
import PageHeader from '@/components/nav/page-header'

const TOPICS = ['Booking / speaking', 'Podcast guest invite', 'Press inquiry', 'Shadow Warriors Project', 'Other']

const ContactPage = () => {
  const [submitting, setSubmitting] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    setSubmitting(true)
    try {
      await new Promise((r) => setTimeout(r, 600))
      form.reset()
      toast('Received.', { description: 'You\'re on the wire. Oz reads everything.' })
    } catch (err) {
      console.error('[ContactPage]:', err)
      toast('Send failed.', { description: 'Try again or email direct.' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="relative">
      <PageHeader
        eyebrow="OPEN A LINE"
        title="SAY HELLO,"
        accent="OPERATOR."
        lead="Booking, press, or just a note. Oz reads everything that lands here. No PR layer in between."
      />

      <section className="container-x grid grid-cols-12 gap-x-8 gap-y-12 pb-32 lg:gap-x-12">
        <div className="col-span-12 lg:col-span-5">
          <HudTag color="accent">DIRECT</HudTag>
          <dl className="mt-6 space-y-5 font-mono text-[11px] uppercase tracking-[0.22em]">
            <div>
              <dt className="text-mute">Email</dt>
              <dd className="mt-2 text-ink">
                <a
                  href="mailto:info@theozcast.com"
                  className="lowercase underline decoration-accent underline-offset-4 hover:text-accent"
                >
                  info@theozcast.com
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-mute">Booking</dt>
              <dd className="mt-2 text-ink">
                <a
                  href="https://teamneverquit.com/speakers/mark-geist/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline decoration-accent underline-offset-4 hover:text-accent"
                >
                  Team Never Quit · speakers ↗
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-mute">Shadow Warriors</dt>
              <dd className="mt-2 text-ink">
                <a
                  href="https://shadowwarriorsproject.org/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline decoration-accent underline-offset-4 hover:text-accent"
                >
                  shadowwarriorsproject.org ↗
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-mute">Recording from</dt>
              <dd className="mt-2 text-ink">Colorado</dd>
            </div>
          </dl>
        </div>

        <form
          onSubmit={onSubmit}
          className="col-span-12 grid grid-cols-1 gap-6 lg:col-span-7"
        >
          <div>
            <label htmlFor="name" className="font-mono text-[10px] uppercase tracking-[0.22em] text-mute">
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
            <label htmlFor="email" className="font-mono text-[10px] uppercase tracking-[0.22em] text-mute">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@domain.com"
              className="mt-2 block w-full border border-border bg-bg px-4 py-3 font-mono text-sm lowercase text-ink placeholder:text-mute focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ring-offset-2 ring-offset-bg"
            />
          </div>
          <div>
            <label htmlFor="topic" className="font-mono text-[10px] uppercase tracking-[0.22em] text-mute">
              Topic
            </label>
            <select
              id="topic"
              name="topic"
              required
              className="mt-2 block w-full border border-border bg-bg px-4 py-3 font-mono text-sm uppercase tracking-[0.18em] text-ink focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ring-offset-2 ring-offset-bg"
            >
              {TOPICS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="message" className="font-mono text-[10px] uppercase tracking-[0.22em] text-mute">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              className="mt-2 block w-full border border-border bg-bg px-4 py-3 text-sm text-ink focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ring-offset-2 ring-offset-bg"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="mt-2 self-start border border-accent bg-accent px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-accent-foreground transition-colors hover:bg-ember hover:border-ember disabled:opacity-50"
          >
            {submitting ? 'Sending…' : 'Send →'}
          </button>
        </form>
      </section>
    </main>
  )
}

export default ContactPage
