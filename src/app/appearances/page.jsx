import HudTag from '@/components/motion/hud-tag'
import PageHeader from '@/components/nav/page-header'
import Portrait from '@/components/motion/portrait'
import { APPEARANCES } from '@/constants/appearances'

export const metadata = {
  title: 'Featured Appearances — Mark "Oz" Geist',
  description:
    'Oz as a guest on other shows and podcasts. Long-form interviews on the record — kept distinct from Oz Cast episodes. Every link opens directly to the appearance.'
}

const AppearancesPage = () => {
  return (
    <main className="relative">
      <PageHeader
        eyebrow={`FEATURED APPEARANCES · ${APPEARANCES.length} SHOWS`}
        title="OZ ON"
        accent="OTHER SHOWS."
        lead="Where Oz shows up as the guest. Separate from the Oz Cast library — these are the long-form interviews other hosts have put on the record. Pick a show; every link opens directly to it."
      />

      <section className="container-x pb-24 lg:pb-32">
        <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {APPEARANCES.map((a) => (
            <li key={a.name}>
              <a
                href={a.url}
                target="_blank"
                rel="noreferrer"
                className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ring-offset-2 ring-offset-bg"
              >
                <Portrait alt={`${a.name} cover art`} seed={a.name} ratio="square" />
                <div className="mt-5">
                  <HudTag color="accent">GUEST APPEARANCE</HudTag>
                  <h2 className="mt-3 font-display text-2xl uppercase leading-tight tracking-display text-ink transition-colors duration-200 group-hover:text-accent lg:text-3xl">
                    {a.name}
                  </h2>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-mute">
                    {a.role}
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

export default AppearancesPage
