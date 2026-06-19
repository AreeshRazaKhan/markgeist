import HudTag from '@/components/motion/hud-tag'
import ArrowButton from '@/components/motion/arrow-button'
import PageHeader from '@/components/nav/page-header'
import { EVENT_TRACKS } from '@/constants/events'

export const metadata = {
  title: 'Events — The Oz Cast',
  description:
    'Speaking engagements, live events, and training with Mark "Oz" Geist. Operator Circle members get priority access and member-only dates.'
}

const EventsPage = () => {
  return (
    <main className="relative">
      <PageHeader
        eyebrow="EVENTS"
        title="IN THE"
        accent="ROOM."
        lead="Keynotes, live recordings, and training. Dates drop to members and the newsletter first. No PR layer. The booking line goes where it needs to go."
      />

      <section className="container-x grid grid-cols-1 gap-6 pb-24 lg:grid-cols-3 lg:gap-8">
        {EVENT_TRACKS.map((t) => (
          <article
            key={t.id}
            className="group flex flex-col border border-border bg-surface p-7 transition-colors duration-300 hover:border-accent lg:p-8"
          >
            <HudTag color="accent">{t.label}</HudTag>
            <h2 className="mt-5 font-display text-3xl uppercase tracking-display text-ink transition-colors group-hover:text-accent lg:text-4xl">
              {t.title}
            </h2>
            <p className="mt-4 flex-1 text-sm text-mute">{t.blurb}</p>
            <ArrowButton
              as="a"
              href={t.cta.href}
              variant="ghost"
              className="mt-8 w-full justify-center"
              {...(t.cta.external ? { target: '_blank', rel: 'noreferrer' } : {})}
            >
              {t.cta.label}
            </ArrowButton>
          </article>
        ))}
      </section>

      <section className="container-x border-t border-border py-20 lg:py-24">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <HudTag color="mute">NO DATES ON THE BOARD YET</HudTag>
          <p className="font-display text-2xl uppercase leading-[1.02] tracking-display text-ink lg:text-4xl">
            The next date lands
            <span className="block italic text-accent pb-[0.06em]">in the newsletter first.</span>
          </p>
          <p className="max-w-md text-sm text-mute">
            Subscribe to get event announcements before they go public. Operator Circle members get
            priority access and member-only dates.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <ArrowButton as="a" href="/subscribe" variant="primary">
              Get notified
            </ArrowButton>
            <ArrowButton as="a" href="/membership" variant="ghost">
              See membership
            </ArrowButton>
          </div>
        </div>
      </section>
    </main>
  )
}

export default EventsPage
