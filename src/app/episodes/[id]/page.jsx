import Link from 'next/link'
import { notFound } from 'next/navigation'

import HudTag from '@/components/motion/hud-tag'
import Portrait from '@/components/motion/portrait'
import { EPISODES } from '@/constants/episodes'
import { getEpisodeSponsors } from '@/constants/sponsors'

export const generateStaticParams = () => EPISODES.map((ep) => ({ id: ep.id }))

export const generateMetadata = ({ params }) => {
  const ep = EPISODES.find((e) => e.id === params.id)
  if (!ep) return { title: 'Episode not found Mark "Oz" Geist' }
  return {
    title: `${ep.title} — Mark "Oz" Geist`,
    description: ep.summary
  }
}

const EpisodeDetailPage = ({ params }) => {
  const ep = EPISODES.find((e) => e.id === params.id)
  if (!ep) return notFound()

  const idx = EPISODES.findIndex((e) => e.id === ep.id)
  const prev = EPISODES[idx + 1] || null
  const next = EPISODES[idx - 1] || null
  const sponsors = getEpisodeSponsors(ep.id)

  return (
    <main className="container-x section-y">
      <Link
        href="/episodes"
        className="font-mono text-[11px] uppercase tracking-[0.22em] text-mute transition-colors hover:text-accent"
      >
        ← All episodes
      </Link>

      <article className="mt-10 grid grid-cols-12 gap-x-8 gap-y-10 lg:gap-x-12">
        <div className="col-span-12 lg:col-span-5">
          <div className="relative">
            <Portrait alt={`${ep.title} cover art`} seed={ep.id} ratio="square" />
            {ep.threat && (
              <span className="absolute left-3 top-3 border border-live bg-bg/70 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.22em] text-live">
                {ep.threat}
              </span>
            )}
          </div>
          <dl className="mt-8 grid grid-cols-2 gap-y-4 border-t border-border pt-6 font-mono text-[10px] uppercase tracking-[0.22em]">
            <dt className="text-mute">Episode</dt>
            <dd className="text-ink">{ep.number}</dd>
            <dt className="text-mute">Show</dt>
            <dd className="text-ink">{ep.show}</dd>
            <dt className="text-mute">Host</dt>
            <dd className="text-ink">{ep.host}</dd>
            <dt className="text-mute">Recorded</dt>
            <dd className="text-ink">{ep.recordedAt}</dd>
            <dt className="text-mute">Duration</dt>
            <dd className="text-ink">{ep.duration}</dd>
          </dl>
        </div>

        <div className="col-span-12 lg:col-span-7">
          <HudTag color="accent">{ep.number} · {ep.status || 'AIRED'}</HudTag>
          <h1
            className="display-xl mt-6 text-balance text-ink"
            style={{
              fontSize: 'clamp(36px, 5vw, 88px)',
              lineHeight: 0.94,
              letterSpacing: '-0.02em'
            }}
          >
            {ep.title}
          </h1>
          {ep.summary && <p className="mt-8 max-w-2xl text-base text-mute">{ep.summary}</p>}

          <div className="mt-10 flex flex-wrap items-center gap-3">
            {ep.spotifyUrl && (
              <a
                href={ep.spotifyUrl}
                target="_blank"
                rel="noreferrer"
                className="border border-accent bg-accent px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-accent-foreground transition-colors hover:bg-ember hover:border-ember"
              >
                Listen on Spotify →
              </a>
            )}
            {ep.listenUrl && (
              <a
                href={ep.listenUrl}
                target="_blank"
                rel="noreferrer"
                className="border border-border px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-ink transition-colors hover:border-accent hover:text-accent"
              >
                {ep.youtubeId ? 'Watch on YouTube ↗' : 'Listen on the record ↗'}
              </a>
            )}
          </div>

          {ep.youtubeId && (
            <div className="mt-12 aspect-video w-full overflow-hidden border border-border">
              <iframe
                title={ep.title}
                src={`https://www.youtube.com/embed/${ep.youtubeId}`}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          {ep.guest && (
            <section className="mt-12 border-t border-border pt-8">
              <HudTag color="accent">IN THIS EPISODE</HudTag>
              <div className="mt-6 flex items-start gap-5">
                <div className="w-24 shrink-0 sm:w-28">
                  <Portrait
                    alt={`${ep.guest.name} — guest portrait`}
                    seed={`guest-${ep.guest.name}`}
                    ratio="square"
                  />
                </div>
                <div>
                  <h2 className="font-display text-2xl uppercase tracking-display text-ink">
                    {ep.guest.name}
                  </h2>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-mute">
                    {ep.guest.role}
                  </p>
                  <p className="mt-3 max-w-md text-sm text-mute">{ep.guest.blurb}</p>
                </div>
              </div>
            </section>
          )}
        </div>
      </article>

      {sponsors.length > 0 && (
        <section className="mt-20 border-t border-border pt-10">
          <HudTag color="accent">EPISODE SPONSORS</HudTag>
          <p className="mt-4 max-w-2xl text-sm text-mute">
            Use the code at checkout — the offer is yours and it keeps the show on the air.
          </p>
          <ul className="mt-8 grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {sponsors.map((s) => (
              <li key={s.id}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-full flex-col bg-bg p-6 transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ring-offset-2 ring-offset-bg"
                >
                  <span
                    className={`font-mono text-[10px] uppercase tracking-[0.22em] ${
                      s.tier === 'gold' ? 'text-accent' : 'text-mute'
                    }`}
                  >
                    {'// '}
                    {s.tier} sponsor
                  </span>
                  <span className="mt-3 font-display text-xl uppercase tracking-display text-ink transition-colors group-hover:text-accent">
                    {s.name}
                  </span>
                  <span className="mt-2 flex-1 text-sm text-mute">{s.blurb}</span>
                  <span className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-ink">
                    CODE <span className="text-accent">{s.code}</span> ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      <nav className="mt-20 grid grid-cols-1 gap-6 border-t border-border pt-10 sm:grid-cols-2">
        {prev ? (
          <Link
            href={`/episodes/${prev.id}`}
            className="group block border border-border p-6 transition-colors hover:border-accent"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-mute">
              ← Earlier · {prev.number}
            </p>
            <p className="mt-2 font-display text-xl uppercase tracking-display text-ink group-hover:text-accent">
              {prev.title}
            </p>
          </Link>
        ) : (
          <span className="hidden sm:block" />
        )}
        {next ? (
          <Link
            href={`/episodes/${next.id}`}
            className="group block border border-border p-6 text-right transition-colors hover:border-accent"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-mute">
              Newer · {next.number} →
            </p>
            <p className="mt-2 font-display text-xl uppercase tracking-display text-ink group-hover:text-accent">
              {next.title}
            </p>
          </Link>
        ) : (
          <span className="hidden sm:block" />
        )}
      </nav>
    </main>
  )
}

export default EpisodeDetailPage
