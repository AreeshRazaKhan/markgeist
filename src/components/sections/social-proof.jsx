'use client'

import HudTag from '@/components/motion/hud-tag'
import Portrait from '@/components/motion/portrait'
import Reveal from '@/components/motion/reveal'
import SplitReveal from '@/components/motion/split-reveal'
import TextScramble from '@/components/motion/text-scramble'
import { PRESS_OUTLETS, PRESS_APPEARANCES } from '@/constants/press'

const SocialProof = () => {
  return (
    <section
      id="social-proof"
      aria-label="Press and media appearances"
      className="relative section-y overflow-hidden border-b border-border bg-bg"
    >
      <div className="container-x relative z-content">
        <Reveal className="flex flex-col items-center gap-6 text-center">
          <HudTag color="accent">
            <TextScramble text="AS SEEN ON" />
          </HudTag>
          <h2 className="display-lg max-w-3xl text-balance text-[clamp(40px,6vw,96px)] text-ink">
            <SplitReveal as="span" className="block">ON THE RECORD,</SplitReveal>
            <SplitReveal as="span" className="block italic text-accent" delay={0.08}>
              EVERYWHERE
            </SplitReveal>
          </h2>
        </Reveal>

        {/* Outlet wordmark wall */}
        <Reveal
          as="ul"
          className="mt-14 grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-3 lg:grid-cols-6"
        >
          {PRESS_OUTLETS.map((o) => (
            <li
              key={o}
              className="flex items-center justify-center bg-bg px-4 py-8 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-mute"
            >
              {o}
            </li>
          ))}
        </Reveal>

        {/* Notable appearances */}
        <ul className="mt-14 divide-y divide-border border-y border-border">
          {PRESS_APPEARANCES.map((a) => (
            <li key={a.id}>
              <a
                href={a.href}
                target="_blank"
                rel="noreferrer"
                className="group relative flex flex-col gap-2 py-6 pl-6 transition-colors duration-200 hover:bg-surface sm:flex-row sm:items-center sm:justify-between sm:gap-6"
              >
                <span
                  aria-hidden
                  className="absolute left-0 top-0 h-full w-0.5 origin-top scale-y-0 bg-accent transition-transform duration-300 group-hover:scale-y-100"
                />
                <div className="flex items-center gap-4">
                  <div className="w-14 shrink-0 sm:w-16">
                    <Portrait alt={`${a.outlet} cover art`} seed={a.id} ratio="square" />
                  </div>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                      {a.kind}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-mute">
                      {a.outlet}
                    </span>
                  </div>
                </div>
                <span className="text-sm text-ink transition-colors group-hover:text-accent sm:max-w-xl sm:text-right">
                  {a.title} <span aria-hidden>↗</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default SocialProof
