'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import HudTag from '@/components/motion/hud-tag'
import TextScramble from '@/components/motion/text-scramble'
import SplitReveal from '@/components/motion/split-reveal'
import ColorScrub from '@/components/motion/color-scrub'
import Reveal from '@/components/motion/reveal'
import Portrait from '@/components/motion/portrait'
import useGsapContext from '@/hooks/use-gsap-context'
import useReducedMotion from '@/hooks/use-reduced-motion'
import { GUESTS } from '@/constants/guests'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const TheField = () => {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  useGsapContext(
    () => {
      if (reduced) return
      gsap.fromTo(
        '[data-guest]',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.06,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    },
    [reduced],
    ref
  )

  return (
    <section
      id="the-field"
      ref={ref}
      className="relative section-y overflow-hidden border-b border-border bg-bg"
    >
      <div className="container-x">
        <Reveal className="mb-12 flex flex-col items-center gap-4 text-center lg:mb-16">
          <HudTag color="accent">
            <TextScramble text={`05 — GUESTS · ${GUESTS.length} OPERATORS`} />
          </HudTag>
          <h2 className="display-xl max-w-5xl text-balance text-[clamp(44px,6vw,104px)] text-ink">
            <ColorScrub as="span" className="block">
              <SplitReveal className="block">SHOWS THAT</SplitReveal>
              <SplitReveal className="block italic text-accent" delay={0.08}>HOSTED OZ.</SplitReveal>
            </ColorScrub>
          </h2>
          <p className="max-w-xl text-mute">
            {GUESTS.length} long-form interviews on the record. Pick a show to listen &mdash; every
            link opens directly to the episode.
          </p>
        </Reveal>

        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {GUESTS.map((g) => (
            <li key={g.name} data-guest>
              <a
                href={g.url}
                target="_blank"
                rel="noreferrer"
                className="group block"
              >
                <Portrait alt={`${g.name} cover art`} seed={g.name} ratio="square" />

                <div className="mt-5">
                  <HudTag color="accent">FEATURED</HudTag>
                  <h3 className="mt-3 font-display text-2xl uppercase leading-tight tracking-display text-ink transition-colors duration-200 group-hover:text-accent lg:text-3xl">
                    {g.name}
                  </h3>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-mute">{g.role}</p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default TheField
