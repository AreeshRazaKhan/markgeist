'use client'

import HudTag from '@/components/motion/hud-tag'
import Reveal from '@/components/motion/reveal'
import SplitReveal from '@/components/motion/split-reveal'
import ArrowButton from '@/components/motion/arrow-button'
import { MEMBERSHIP_TIERS } from '@/constants/membership'

const MembershipPromo = () => {
  return (
    <section
      id="membership"
      aria-label="Membership"
      className="relative section-y overflow-hidden border-b border-border bg-surface"
    >
      <div aria-hidden className="absolute inset-0 z-canvas ember-wash" />

      <div className="container-x relative z-content grid grid-cols-12 gap-x-8 gap-y-12 lg:gap-x-12">
        <div className="col-span-12 lg:col-span-5">
          <Reveal className="flex flex-col gap-6">
            <HudTag color="accent">MEMBERSHIP</HudTag>
            <h2 className="display-lg text-[clamp(40px,5.5vw,88px)] text-ink">
              <SplitReveal as="span" className="block">GO DEEPER THAN</SplitReveal>
              <SplitReveal as="span" className="block italic text-accent" delay={0.08}>
                THE PUBLIC FEED.
              </SplitReveal>
            </h2>
            <p className="max-w-md text-base text-mute">
              The Oz Cast stays open to everyone. Members get the deeper record: early access,
              ad-free cuts, bonus clips, after-action breakdowns, Q&amp;A sessions, behind-the-scenes
              content, and priority access to future live events.
            </p>
            <div className="flex flex-wrap gap-3">
              <ArrowButton as="a" href="/membership" variant="primary">
                See the tiers
              </ArrowButton>
            </div>
          </Reveal>
        </div>

        <ul className="col-span-12 grid grid-cols-1 gap-4 self-center sm:grid-cols-3 lg:col-span-7">
          {MEMBERSHIP_TIERS.map((t) => (
            <li key={t.id}>
              <a
                href="/membership"
                className={`group flex h-full flex-col border bg-bg p-6 transition-colors duration-300 ${
                  t.featured ? 'border-accent' : 'border-border hover:border-accent'
                }`}
              >
                <HudTag color={t.featured ? 'accent' : 'mute'}>{t.tier}</HudTag>
                <p className="mt-4 font-display text-2xl uppercase tracking-display text-ink">
                  {t.name}
                </p>
                <p className="mt-3 flex items-baseline gap-1">
                  <span className="font-display text-4xl tracking-display text-accent">${t.price}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-mute">
                    {t.cadence}
                  </span>
                </p>
                <p className="mt-4 flex-1 text-xs text-mute">{t.summary}</p>
                <span className="mt-5 font-mono text-[10px] uppercase tracking-[0.22em] text-ink transition-colors group-hover:text-accent">
                  Details →
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default MembershipPromo
