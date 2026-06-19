'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import SplitReveal from '@/components/motion/split-reveal'
import LineReveal from '@/components/motion/line-reveal'
import OrbitBadge from '@/components/motion/orbit-badge'
import RGBSplit from '@/components/motion/rgb-split'
import TextScramble from '@/components/motion/text-scramble'
import HudTag from '@/components/motion/hud-tag'
import ArrowButton from '@/components/motion/arrow-button'
import PlayButton from '@/components/motion/play-button'
import Portrait from '@/components/motion/portrait'
import useGsapContext from '@/hooks/use-gsap-context'
import useReducedMotion from '@/hooks/use-reduced-motion'
import { EPISODES, LATEST_EPISODE } from '@/constants/episodes'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const TILES = EPISODES.slice(0, 4)

const TransmissionZero = () => {
  const ref = useRef(null)
  const wordmarkRef = useRef(null)
  const reduced = useReducedMotion()

  useGsapContext(
    () => {
      if (reduced) return

      // Hero divider line draw
      const lines = ref.current?.querySelectorAll('[data-hero-line]')
      if (lines && lines.length) {
        gsap.fromTo(
          lines,
          { scaleX: 0 },
          { scaleX: 1, duration: 1.2, delay: 0.2, ease: 'expo.out', transformOrigin: 'left center' }
        )
      }

      // Tile strip stagger
      gsap.from('[data-tile]', {
        opacity: 0,
        y: 32,
        duration: 0.9,
        delay: 0.5,
        stagger: 0.08,
        ease: 'expo.out'
      })

      // Giant bottom wordmark — slide up + parallax on scroll
      gsap.from('[data-wordmark]', {
        yPercent: 30,
        opacity: 0,
        duration: 1.4,
        delay: 0.4,
        ease: 'expo.out'
      })
      gsap.to('[data-wordmark]', {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6
        }
      })
    },
    [reduced],
    ref
  )

  return (
    <section
      id="transmission"
      ref={ref}
      className="relative isolate overflow-hidden border-b border-border bg-bg pt-24 lg:pt-28"
    >
      <div aria-hidden className="absolute inset-0 z-canvas grid-bg opacity-30" />
      <div aria-hidden className="absolute inset-0 z-canvas accent-wash" />
      <div aria-hidden className="absolute inset-0 z-canvas scanlines opacity-50" />

      {/* Orbit badge — vertical-middle left, like Cunnet */}
      <div className="pointer-events-none absolute left-4 top-32 z-overlay text-ink lg:left-8 lg:top-1/3">
        <OrbitBadge text="THE OZ CAST · HOSTED BY MARK GEIST · 2026" size={140} duration={32} />
      </div>

      {/* Top corner HUD strip */}
      <div className="container-x relative z-content flex items-center justify-between gap-4 pb-12">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping bg-live opacity-75" />
            <span className="relative inline-flex h-2 w-2 bg-live" />
          </span>
          <HudTag color="accent">{`LATEST · ${LATEST_EPISODE.number} · ${LATEST_EPISODE.duration}`}</HudTag>
        </div>
        <span data-hero-line className="hidden h-px flex-1 bg-border md:block" />
        <HudTag color="mute" className="hidden md:inline">{LATEST_EPISODE.recordedAt}</HudTag>
      </div>

      {/* Centered headline */}
      <div className="container-x relative z-content flex flex-col items-center text-center">
        <h1 className="display-xl mx-auto max-w-5xl text-balance text-[clamp(48px,7vw,116px)] text-ink">
          <SplitReveal as="span" className="block">ONE NIGHT IN BENGHAZI.</SplitReveal>
          <SplitReveal as="span" className="block italic text-accent" delay={0.1}>A LIFETIME ON THE RECORD.</SplitReveal>
        </h1>

        <LineReveal as="p" className="mx-auto mt-8 max-w-2xl text-pretty text-base leading-relaxed text-ink/80 lg:text-lg">
          Marine. Benghazi Annex Security Team. Co-author of <em className="not-italic underline decoration-accent">13 Hours</em>.
          Co-founder of Shadow Warriors Project. Host of The Oz Cast, long-form conversations on
          service, survival, leadership, and what comes after the fight.
        </LineReveal>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <ArrowButton as="a" href={LATEST_EPISODE.listenUrl} target="_blank" rel="noreferrer" variant="primary">
            {`PLAY · ${LATEST_EPISODE.number}`}
          </ArrowButton>
          <ArrowButton as="a" href="#newsletter" variant="ghost">JOIN THE NEWSLETTER</ArrowButton>
        </div>

        {/* 4-tile episode strip */}
        <ul className="mt-16 grid w-full max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">
          {TILES.map((ep) => (
            <li key={ep.id} data-tile>
              <a
                href={ep.listenUrl}
                target="_blank"
                rel="noreferrer"
                className="group relative block overflow-hidden border border-border transition-colors duration-300 hover:border-accent"
                aria-label={`Play ${ep.number} — ${ep.title}`}
              >
                <Portrait alt={`${ep.number} cover art`} seed={ep.id} ratio="square" />
                {/* hover overlay */}
                <span aria-hidden className="absolute inset-0 flex items-center justify-center bg-bg/60 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <PlayButton as="span" size="md" label="" />
                </span>
                {/* corner tag */}
                <span className="absolute left-2 top-2 bg-bg/85 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.22em] text-ink">
                  {ep.number}
                </span>
                <span className="absolute bottom-2 right-2 bg-bg/85 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.22em] text-mute">
                  {ep.duration}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Full-bleed overflowing wordmark */}
      <div className="full-bleed relative z-content mt-20 overflow-hidden lg:mt-28">
        <RGBSplit
          as="h2"
          aria-hidden
          data-wordmark
          offset={22}
          className="display-xl whitespace-nowrap text-center text-ink/95"
          style={{ fontSize: 'clamp(96px, 18vw, 320px)', letterSpacing: '-0.03em', lineHeight: 0.85 }}
        >
          THE <span className="italic text-accent">OZ CAST</span>
        </RGBSplit>
      </div>

      {/* Now playing strip */}
      <div className="border-t border-border">
        <div className="container-x relative flex flex-wrap items-center gap-4 py-4">
          <HudTag color="accent">NOW PLAYING</HudTag>
          <span className="hidden h-px flex-1 bg-border md:block" />
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink">
            {LATEST_EPISODE.number} &middot; {LATEST_EPISODE.title}
          </p>
          <span className="hidden h-px w-12 bg-border md:block" />
          <HudTag color="mute">{LATEST_EPISODE.show}</HudTag>
          <span className="hidden h-px w-8 bg-border md:block" />
          <HudTag color="mute">{LATEST_EPISODE.duration}</HudTag>
        </div>
      </div>
    </section>
  )
}

export default TransmissionZero
