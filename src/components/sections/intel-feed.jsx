'use client'

import { useRef } from 'react'
import PropTypes from 'prop-types'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import HudTag from '@/components/motion/hud-tag'
import TextScramble from '@/components/motion/text-scramble'
import SplitReveal from '@/components/motion/split-reveal'
import ColorScrub from '@/components/motion/color-scrub'
import Reveal from '@/components/motion/reveal'
import ArrowButton from '@/components/motion/arrow-button'
import useGsapContext from '@/hooks/use-gsap-context'
import useReducedMotion from '@/hooks/use-reduced-motion'
import { DISPATCHES } from '@/constants/dispatches'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const Marquee = ({ items }) => {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  useGsapContext(
    () => {
      if (reduced) return
      const tl = gsap.to(ref.current, {
        xPercent: -50,
        duration: 36,
        ease: 'none',
        repeat: -1
      })
      return () => tl.kill()
    },
    [reduced],
    ref
  )

  return (
    <div className="overflow-hidden border-y border-border py-6">
      <div ref={ref} className="flex shrink-0 items-center gap-12 whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span key={`${item.id}-${i}`} className="inline-flex items-center gap-6">
            <span className="font-display text-3xl uppercase tracking-display text-ink lg:text-4xl">{item.title}</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-mute">{item.tag}</span>
            <span aria-hidden className="text-accent">×</span>
          </span>
        ))}
      </div>
    </div>
  )
}

Marquee.propTypes = {
  items: PropTypes.array.isRequired
}

const IntelFeed = () => {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  useGsapContext(
    () => {
      if (reduced) return
      gsap.fromTo(
        '[data-dispatch]',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 75%',
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
      id="intel-feed"
      ref={ref}
      className="relative section-y overflow-hidden border-b border-border bg-surface"
    >
      <div className="container-x">
        <Reveal className="mb-10 flex flex-col items-center gap-6 text-center lg:mb-14">
          <HudTag color="accent">
            <TextScramble text="06 — JOURNAL" />
          </HudTag>
          <h2 className="display-xl max-w-5xl text-balance text-[clamp(44px,6vw,104px)] text-ink">
            <ColorScrub as="span" className="block">
              <SplitReveal className="block">DISPATCHES</SplitReveal>
              <SplitReveal className="block italic text-accent" delay={0.08}>FROM THE WIRE.</SplitReveal>
            </ColorScrub>
          </h2>
          <ArrowButton variant="ghost">ALL DISPATCHES</ArrowButton>
        </Reveal>
      </div>

      <Marquee items={DISPATCHES} />

      <div className="container-x mt-16 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {DISPATCHES.map((d) => (
          <a
            key={d.id}
            data-dispatch
            href={d.url}
            target="_blank"
            rel="noreferrer"
            className="group block"
          >
            <div className="flex items-center gap-3">
              <HudTag color="accent">{d.tag}</HudTag>
              <span className="h-px w-4 bg-border" />
              <HudTag color="mute">{new Date(d.date).toISOString().slice(0, 10)}</HudTag>
            </div>
            <h3 className="mt-5 font-display text-3xl uppercase leading-tight tracking-display text-ink transition-colors duration-200 group-hover:text-accent lg:text-4xl">
              {d.title}
            </h3>
            <p className="mt-4 text-base text-mute">{d.excerpt}</p>
            <div className="mt-6 inline-flex items-center gap-2 border-b border-border pb-1 font-mono text-[10px] uppercase tracking-[0.22em] text-accent transition-colors group-hover:border-accent group-hover:text-ember">
              READ ENTRY
              <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}

export default IntelFeed
