import Link from 'next/link'

import HudTag from '@/components/motion/hud-tag'
import PageHeader from '@/components/nav/page-header'
import { DISPATCHES } from '@/constants/dispatches'

export const metadata = {
  title: 'Blog — The Oz Cast',
  description:
    'Episode breakdowns, show notes, commentary, and written cuts from The Oz Cast. Read the key takeaways, then go deeper with the full conversation or member-only breakdowns.'
}

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })

const BlogPage = () => {
  return (
    <main className="relative">
      <PageHeader
        eyebrow={`BLOG · ${DISPATCHES.length} POSTS`}
        title="NOTES FROM"
        accent="THE RECORD."
        lead={
          <>
            Episode breakdowns, show notes, commentary, and written cuts from The Oz Cast. Read
            the key takeaways, then go deeper with the full conversation or member-only
            breakdowns.
            <span className="mt-4 block text-ink">
              Want the next breakdown first? Join the{' '}
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

      <section className="container-x pb-24 lg:pb-32">
        <ul className="divide-y divide-border border-y border-border">
          {DISPATCHES.map((d) => (
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
    </main>
  )
}

export default BlogPage
