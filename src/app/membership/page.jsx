import HudTag from '@/components/motion/hud-tag'
import CornerBrackets from '@/components/motion/corner-brackets'
import ArrowButton from '@/components/motion/arrow-button'
import PageHeader from '@/components/nav/page-header'
import { cn } from '@/lib/utils'
import { MEMBERSHIP_TIERS, MEMBER_CONTENT } from '@/constants/membership'

export const metadata = {
  title: 'Membership — The Oz Cast',
  description:
    'Three membership tiers for The Oz Cast. The podcast stays free; membership adds early access, ad-free listening, after-action breakdowns, and the Operator Circle.'
}

const MembershipPage = () => {
  return (
    <main className="relative">
      <PageHeader
        eyebrow="MEMBERSHIP"
        title="GO BEYOND"
        accent="THE PUBLIC FEED."
        lead="The Oz Cast stays public. Membership gives listeners deeper access: early episodes, ad-free cuts, bonus clips, after-action breakdowns, Q&A sessions, behind-the-scenes content, training discounts, and priority access to future live events."
      />

      <section className="container-x grid grid-cols-1 gap-6 pb-24 md:grid-cols-3 lg:gap-8">
        {MEMBERSHIP_TIERS.map((t) => (
          <article
            key={t.id}
            className={cn(
              'group relative flex flex-col border bg-surface p-7 transition-colors duration-300 lg:p-8',
              t.featured ? 'border-accent' : 'border-border hover:border-accent'
            )}
          >
            {t.featured && <CornerBrackets color="accent" />}

            <div className="flex items-center justify-between">
              <HudTag color={t.featured ? 'accent' : 'mute'}>{t.tier}</HudTag>
              {t.featured && (
                <span className="bg-accent px-2 py-1 font-mono text-[9px] uppercase tracking-[0.22em] text-accent-foreground">
                  Flagship
                </span>
              )}
            </div>

            <h2 className="mt-5 font-display text-3xl uppercase tracking-display text-ink lg:text-4xl">
              {t.name}
            </h2>

            <div className="mt-4 flex items-baseline gap-1">
              <span className="font-display text-5xl tracking-display text-accent">${t.price}</span>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-mute">{t.cadence}</span>
            </div>

            <p className="mt-4 text-sm text-mute">{t.summary}</p>

            <ul className="mt-6 flex-1 space-y-3 border-t border-border pt-6 text-sm text-ink">
              {t.benefits.map((b) => (
                <li key={b} className="flex gap-3">
                  <span aria-hidden className="text-accent">·</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <ArrowButton
              as="a"
              href="/subscribe"
              variant={t.featured ? 'primary' : 'ghost'}
              className="mt-8 w-full justify-center"
            >
              {`Join · $${t.price}`}
            </ArrowButton>
          </article>
        ))}
      </section>

      <section className="container-x border-t border-border py-20 lg:py-24">
        <div className="grid grid-cols-12 gap-x-8 gap-y-10 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-5">
            <HudTag color="accent">WHAT MEMBERS GET</HudTag>
            <h2 className="mt-6 font-display text-3xl uppercase leading-[0.95] tracking-display text-ink lg:text-5xl">
              The cuts that don&apos;t
              <span className="block italic text-accent pb-[0.06em]">make the feed.</span>
            </h2>
          </div>
          <ul className="col-span-12 grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 lg:col-span-7">
            {MEMBER_CONTENT.map((c) => (
              <li
                key={c}
                className="flex items-center gap-3 bg-bg px-5 py-6 font-mono text-[11px] uppercase tracking-[0.2em] text-ink"
              >
                <span aria-hidden className="text-accent">{'//'}</span>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}

export default MembershipPage
