import Link from 'next/link'

import HudTag from '@/components/motion/hud-tag'
import PageHeader from '@/components/nav/page-header'
import Portrait from '@/components/motion/portrait'
import PlayButton from '@/components/motion/play-button'
import { EPISODES } from '@/constants/episodes'

export const metadata = {
  title: 'Episodes — Mark "Oz" Geist',
  description:
    'The full archive. Every long-form interview Oz has given, on the record. No edits, no PR.'
}

const EpisodesPage = () => {
  return (
    <main className="relative">
      <PageHeader
        eyebrow={`EPISODE ARCHIVE · ${EPISODES.length} ON FILE`}
        title="EVERY EPISODE."
        accent="UNCUT."
        lead={
          <>
            {`${EPISODES.length} long-form interviews. Pick a show. Start with Mark “Oz” Geist’s featured long-form conversations, media appearances, and essential interviews.`}
            <br />
            New Oz Cast episodes and show notes will live here as the official archive grows.
          </>
        }
      />

      <section className="container-x pb-24 lg:pb-32">
        <ul className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {EPISODES.map((ep) => (
            <li key={ep.id} className="group">
              <Link href={`/episodes/${ep.id}`} className="block">
                <div className="relative overflow-hidden">
                  <Portrait alt={`${ep.title} cover art`} seed={ep.id} ratio="square" />
                  <div className="absolute right-3 top-3">
                    <PlayButton size="sm" />
                  </div>
                  {ep.threat && (
                    <span className="absolute left-3 top-3 border border-live bg-bg/70 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.22em] text-live">
                      {ep.threat}
                    </span>
                  )}
                </div>
                <div className="mt-5">
                  <HudTag color="accent">{ep.number}</HudTag>
                  <h2 className="mt-3 font-display text-2xl uppercase leading-tight tracking-display text-ink transition-colors duration-200 group-hover:text-accent lg:text-3xl">
                    {ep.title}
                  </h2>
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-mute">
                    {ep.show}
                  </p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-mute">
                    {ep.recordedAt} · {ep.duration}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default EpisodesPage
