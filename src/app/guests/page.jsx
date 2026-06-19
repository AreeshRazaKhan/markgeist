import HudTag from '@/components/motion/hud-tag'
import PageHeader from '@/components/nav/page-header'
import Portrait from '@/components/motion/portrait'
import { GUESTS } from '@/constants/guests'

export const metadata = {
  title: 'Guests — Mark "Oz" Geist',
  description:
    'Shows that have hosted Oz. Long-form interviews on the record — pick a station, every link opens directly to the episode.'
}

const GuestsPage = () => {
  return (
    <main className="relative">
      <PageHeader
        eyebrow={`THE FIELD · ${GUESTS.length} STATIONS`}
        title="SHOWS THAT"
        accent="HOSTED OZ."
        lead={`${GUESTS.length} long-form interviews on the record. Pick a show. Every link opens directly to the episode.`}
      />

      <section className="container-x pb-24 lg:pb-32">
        <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {GUESTS.map((g) => (
            <li key={g.name}>
              <a
                href={g.url}
                target="_blank"
                rel="noreferrer"
                className="group block"
              >
                <Portrait alt={`${g.name} cover art`} seed={g.name} ratio="square" />
                <div className="mt-5">
                  <HudTag color="accent">FEATURED</HudTag>
                  <h2 className="mt-3 font-display text-2xl uppercase leading-tight tracking-display text-ink transition-colors duration-200 group-hover:text-accent lg:text-3xl">
                    {g.name}
                  </h2>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-mute">
                    {g.role}
                  </p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default GuestsPage
