import HudTag from '@/components/motion/hud-tag'
import PageHeader from '@/components/nav/page-header'
import { SUBSCRIBE_LINKS } from '@/constants/nav'

export const metadata = {
  title: 'Subscribe — Mark "Oz" Geist',
  description: 'Tune in on Spotify, Apple Podcasts, YouTube, or RSS. Pick your station.'
}

const SubscribePage = () => {
  return (
    <main className="relative">
      <PageHeader
        eyebrow="OPEN COMMS"
        title="PICK YOUR"
        accent="STATION."
        lead="Every long-form interview, plus the journal. Subscribe once and the new episode lands wherever you already listen."
      />

      <section className="container-x pb-24 lg:pb-32">
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {SUBSCRIBE_LINKS.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between border border-border p-6 transition-colors hover:border-accent"
              >
                <div>
                  <HudTag color="accent">{s.code}</HudTag>
                  <h2 className="mt-3 font-display text-3xl uppercase tracking-display text-ink group-hover:text-accent">
                    {s.label}
                  </h2>
                </div>
                <span aria-hidden="true" className="font-mono text-xs uppercase tracking-[0.22em] text-mute group-hover:text-accent">
                  Tune in →
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-16 max-w-2xl border-t border-border pt-10">
          <HudTag color="accent">NEWSLETTER</HudTag>
          <p className="mt-6 text-base text-mute">
            For show notes, dispatches between episodes, and the occasional unpublished cut, the
            newsletter goes out from the home page&apos;s &ldquo;Open Comms&rdquo; section.
          </p>
        </div>
      </section>
    </main>
  )
}

export default SubscribePage
