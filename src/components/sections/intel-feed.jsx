'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import HudTag from '@/components/motion/hud-tag'
import CornerBrackets from '@/components/motion/corner-brackets'
import SplitReveal from '@/components/motion/split-reveal'
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
        duration: 28,
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
          <span key={`${item.id}-${i}`} className="group inline-flex items-center gap-6 transition-colors hover:text-accent">
            <span className="font-display text-3xl uppercase tracking-display text-ink transition-[letter-spacing,filter] duration-300 group-hover:tracking-tightest group-hover:[filter:blur(0.4px)]">
              {item.title}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-mute">
              {item.tag}
            </span>
            <span className="text-accent">×</span>
          </span>
        ))}
      </div>
    </div>
  )
}

const IntelFeed = () => {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  useGsapContext(
    () => {
      if (reduced) return
      gsap.from('[data-dispatch]', {
        opacity: 0,
        x: -30,
        duration: 0.8,
        stagger: 0.06,
        ease: 'expo.out',
        scrollTrigger: { trigger: ref.current, start: 'top 70%', once: true }
      })
    },
    [reduced],
    ref
  )

  return (
    <section
      id="intel-feed"
      ref={ref}
      className="relative section-y overflow-hidden border-b border-border bg-bg"
    >
      <div className="container-x">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <HudTag color="accent">06 · INTEL FEED</HudTag>
            <h2 className="display-xl mt-4 text-[clamp(40px,6vw,88px)] text-ink">
              <SplitReveal className="block">DISPATCHES</SplitReveal>
              <SplitReveal className="block text-accent" delay={0.08}>FROM THE WIRE.</SplitReveal>
            </h2>
          </div>
          <ArrowButton variant="ghost">ALL DISPATCHES</ArrowButton>
        </div>
      </div>

      <Marquee items={DISPATCHES} />

      <div className="container-x mt-12 grid grid-cols-12 gap-4">
        {DISPATCHES.map((d) => (
          <article
            key={d.id}
            data-dispatch
            className="relative col-span-12 border border-border bg-surface p-6 transition-colors hover:border-accent md:col-span-6 lg:col-span-3"
          >
            <CornerBrackets />
            <div className="flex items-center justify-between">
              <HudTag color="hud">{d.tag}</HudTag>
              <HudTag>{new Date(d.date).toISOString().slice(0, 10)}</HudTag>
            </div>
            <h3 className="mt-6 font-display text-xl uppercase tracking-display text-ink">
              {d.title}
            </h3>
            <p className="mt-3 text-sm text-mute">{d.excerpt}</p>
            <div className="mt-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
              READ FILE <span>→</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default IntelFeed
