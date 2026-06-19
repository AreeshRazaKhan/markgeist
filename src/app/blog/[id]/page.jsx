import Link from 'next/link'
import { notFound } from 'next/navigation'

import HudTag from '@/components/motion/hud-tag'
import { DISPATCHES } from '@/constants/dispatches'

export const generateStaticParams = () => DISPATCHES.map((d) => ({ id: d.id }))

export const generateMetadata = ({ params }) => {
  const d = DISPATCHES.find((x) => x.id === params.id)
  if (!d) return { title: 'Post not found — The Oz Cast' }
  return { title: `${d.title} — The Oz Cast`, description: d.excerpt }
}

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })

const BlogPostPage = ({ params }) => {
  const d = DISPATCHES.find((x) => x.id === params.id)
  if (!d) return notFound()

  return (
    <main className="container-x section-y">
      <Link
        href="/blog"
        className="font-mono text-[11px] uppercase tracking-[0.22em] text-mute transition-colors hover:text-accent"
      >
        ← All posts
      </Link>

      <article className="mx-auto mt-12 max-w-3xl">
        <div className="flex flex-wrap items-center gap-4">
          <HudTag color="accent">{d.tag}</HudTag>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-mute">
            {formatDate(d.date)}
          </span>
        </div>
        <h1
          className="display-xl mt-6 text-balance text-ink"
          style={{
            fontSize: 'clamp(36px, 5vw, 88px)',
            lineHeight: 0.94,
            letterSpacing: '-0.02em'
          }}
        >
          {d.title}
        </h1>
        <p className="mt-8 text-lg text-mute">{d.excerpt}</p>

        <div className="prose prose-invert mt-12 max-w-none border-t border-border pt-12 text-base text-ink">
          <p>
            This is the written rundown. The full story is in the episode. The post here is the
            headline and the takeaways; the long-form is in the podcast and on the linked partner
            sites.
          </p>
        </div>

        {d.url && (
          <a
            href={d.url}
            target="_blank"
            rel="noreferrer"
            className="mt-12 inline-flex items-center gap-3 border border-accent bg-accent px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-accent-foreground transition-colors hover:bg-ember hover:border-ember"
          >
            Read the full post ↗
          </a>
        )}
      </article>
    </main>
  )
}

export default BlogPostPage
