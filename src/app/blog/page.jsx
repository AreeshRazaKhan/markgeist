import Link from 'next/link'

import HudTag from '@/components/motion/hud-tag'
import PageHeader from '@/components/nav/page-header'
import { DISPATCHES } from '@/constants/dispatches'

export const metadata = {
  title: 'Blog — The Oz Cast',
  description:
    'Episode breakdowns, show notes, commentary, and written cuts from The Oz Cast. Read the public takeaways free; the member Breakdown debriefs go deeper.'
}

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })

const PUBLIC_POSTS = DISPATCHES.filter((d) => d.access !== 'member')
const MEMBER_BREAKDOWNS = DISPATCHES.filter((d) => d.access === 'member')

const BlogPage = () => {
  return (
    <main className="relative">
      <PageHeader
        eyebrow={`BLOG · ${PUBLIC_POSTS.length} PUBLIC`}
        title="NOTES FROM"
        accent="THE RECORD."
        lead={
          <>
            Show notes, written cuts, and commentary tied to the episodes. The public takeaways are
            free; the deeper Breakdown debriefs are reserved for members.
            <span className="mt-4 block text-ink">
              Want the next drop first? Join the{' '}
              <Link
                href="/subscribe"
                className="text-accent underline decoration-accent underline-offset-4 transition-colors hover:text-ember focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                newsletter
              </Link>
              .
            </span>
          </>
        }
      />

      <section className="container-x pb-16">
        <HudTag color="accent">PUBLIC · FREE TO READ</HudTag>
        <ul className="mt-6 divide-y divide-border border-y border-border">
          {PUBLIC_POSTS.map((d) => (
            <li key={d.id}>
              <Link
                href={`/blog/${d.id}`}
                className="group flex flex-col gap-4 py-8 transition-colors hover:bg-surface lg:flex-row lg:items-center lg:gap-12 lg:px-6"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-mute lg:w-32 lg:flex-shrink-0">
                  {formatDate(d.date)}
                </p>
                <div className="lg:w-24 lg:flex-shrink-0">
                  <HudTag color="accent">{d.tag}</HudTag>
                </div>
                <div className="flex-1">
                  <h2 className="font-display text-2xl uppercase tracking-display text-ink transition-colors group-hover:text-accent lg:text-3xl">
                    {d.title}
                  </h2>
                  <p className="mt-3 max-w-3xl text-sm text-mute">{d.excerpt}</p>
                </div>
                <span
                  aria-hidden="true"
                  className="hidden font-mono text-xs uppercase tracking-[0.22em] text-mute group-hover:text-accent lg:block"
                >
                  Read →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {MEMBER_BREAKDOWNS.length > 0 && (
        <section className="container-x border-t border-border py-16 lg:py-20">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <HudTag color="accent">MEMBER BREAKDOWN · GATED</HudTag>
            <Link
              href="/membership"
              className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent underline decoration-accent underline-offset-4 transition-colors hover:text-ember focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              Unlock in the Operator Circle →
            </Link>
          </div>
          <ul className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {MEMBER_BREAKDOWNS.map((d) => (
              <li key={d.id}>
                <Link
                  href={`/blog/${d.id}`}
                  className="group relative flex h-full flex-col border border-border bg-surface p-6 transition-colors hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ring-offset-2 ring-offset-bg"
                >
                  <div className="flex items-center justify-between">
                    <HudTag color="accent">{d.tag}</HudTag>
                    <span className="flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.22em] text-mute">
                      <svg viewBox="0 0 12 14" className="h-3 w-3" fill="currentColor" aria-hidden>
                        <path d="M3 6V4a3 3 0 1 1 6 0v2h1v7H2V6h1Zm1 0h4V4a2 2 0 1 0-4 0v2Z" />
                      </svg>
                      Members
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-xl uppercase tracking-display text-ink transition-colors group-hover:text-accent">
                    {d.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm text-mute">{d.excerpt}</p>
                  <span className="mt-5 font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                    Locked · {formatDate(d.date)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  )
}

export default BlogPage
