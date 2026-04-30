'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import HudTag from '@/components/motion/hud-tag'
import TextScramble from '@/components/motion/text-scramble'
import SplitReveal from '@/components/motion/split-reveal'
import ColorScrub from '@/components/motion/color-scrub'
import Reveal from '@/components/motion/reveal'
import PlayButton from '@/components/motion/play-button'
import Portrait from '@/components/motion/portrait'
import useGsapContext from '@/hooks/use-gsap-context'
import useReducedMotion from '@/hooks/use-reduced-motion'
import { EPISODES } from '@/constants/episodes'
import { cn } from '@/lib/utils'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const FILTERS = ['ALL', 'CRITICAL', 'ELEVATED', 'CLASSIFIED', 'NOMINAL']

const MissionLogs = () => {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  const [filter, setFilter] = useState('ALL')
  const [visible, setVisible] = useState(EPISODES)

  // Pill indicator
  const pillRef = useRef(null)
  const pillButtonsRef = useRef({})

  // Tile grid
  const gridRef = useRef(null)
  const tilesAnimating = useRef(false)

  // First-mount entry stagger (kept, but we tag a flag so filter changes use a different anim)
  useGsapContext(
    () => {
      if (reduced) return
      gsap.fromTo(
        '[data-tile]',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.07,
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

  // Move the active-pill indicator when filter changes
  useLayoutEffect(() => {
    const pill = pillRef.current
    const target = pillButtonsRef.current[filter]
    if (!pill || !target) return
    const pillParent = pill.parentElement
    if (!pillParent) return
    const parentRect = pillParent.getBoundingClientRect()
    const targetRect = target.getBoundingClientRect()
    const x = targetRect.left - parentRect.left
    const y = targetRect.top - parentRect.top
    const w = targetRect.width
    const h = targetRect.height
    if (reduced) {
      gsap.set(pill, { x, y, width: w, height: h, autoAlpha: 1 })
      return
    }
    gsap.to(pill, {
      x,
      y,
      width: w,
      height: h,
      autoAlpha: 1,
      duration: 0.55,
      ease: 'power3.inOut'
    })
  }, [filter, reduced])

  // Filter change → fade tiles out, swap data, fade in
  const handleFilterChange = (next) => {
    if (next === filter || tilesAnimating.current) return
    if (reduced) {
      setFilter(next)
      setVisible(next === 'ALL' ? EPISODES : EPISODES.filter((e) => e.threat === next))
      return
    }
    tilesAnimating.current = true
    const tiles = gridRef.current?.querySelectorAll('[data-tile]')
    const out = gsap.to(tiles, {
      opacity: 0,
      y: 24,
      filter: 'blur(6px)',
      duration: 0.32,
      stagger: { each: 0.025, from: 'start' },
      ease: 'power2.in',
      onComplete: () => {
        setFilter(next)
        setVisible(next === 'ALL' ? EPISODES : EPISODES.filter((e) => e.threat === next))
      }
    })
    return out
  }

  // After data swap, animate the new tiles in
  useEffect(() => {
    if (reduced) {
      tilesAnimating.current = false
      return
    }
    const tiles = gridRef.current?.querySelectorAll('[data-tile]')
    if (!tiles || !tiles.length) {
      tilesAnimating.current = false
      return
    }
    gsap.fromTo(
      tiles,
      { opacity: 0, y: 32, filter: 'blur(8px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.7,
        stagger: { each: 0.045, from: 'start' },
        ease: 'power3.out',
        onComplete: () => {
          tilesAnimating.current = false
        }
      }
    )
  }, [visible, reduced])

  return (
    <section id="mission-logs" ref={ref} className="relative section-y border-b border-border bg-bg">
      <div className="container-x">
        <Reveal className="mb-10 flex flex-col items-center gap-6 text-center lg:mb-14">
          <HudTag color="accent">
            <TextScramble text="04 — EPISODE ARCHIVE" />
          </HudTag>
          <h2 className="display-xl max-w-5xl text-balance text-[clamp(44px,6vw,104px)] leading-[0.92] text-ink">
            <ColorScrub as="span" className="block">
              <SplitReveal className="block">CASE FILES,</SplitReveal>
              <SplitReveal className="block italic text-accent" delay={0.08}>UNCUT.</SplitReveal>
            </ColorScrub>
          </h2>

          {/* Filter pill bar with sliding active indicator */}
          <div
            role="tablist"
            aria-label="Episode filters"
            className="relative mt-4 inline-flex flex-wrap items-center justify-center gap-2"
          >
            {/* The orange pill that slides */}
            <span
              ref={pillRef}
              aria-hidden
              className="pointer-events-none absolute left-0 top-0 z-0 bg-accent opacity-0 will-change-transform"
              style={{ transformOrigin: 'top left' }}
            />

            {FILTERS.map((f) => (
              <button
                key={f}
                ref={(el) => {
                  if (el) pillButtonsRef.current[f] = el
                }}
                type="button"
                role="tab"
                aria-selected={filter === f}
                onClick={() => handleFilterChange(f)}
                className={cn(
                  'relative z-content border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
                  filter === f
                    ? 'border-accent bg-accent text-accent-foreground'
                    : 'border-border text-mute hover:border-accent hover:text-accent'
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </Reveal>

        {/* 3-column editorial grid */}
        <ul
          ref={gridRef}
          className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16"
        >
          {visible.map((ep) => (
            <li key={ep.id} data-tile>
              <a
                href={ep.listenUrl}
                target="_blank"
                rel="noreferrer"
                className="group block"
                aria-label={`Play ${ep.number} — ${ep.title}`}
              >
                <div className="relative overflow-hidden">
                  <Portrait alt={`${ep.number} cover art`} seed={ep.id} ratio="square" />
                  <span aria-hidden className="absolute inset-0 flex items-center justify-center bg-bg/60 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    <PlayButton as="span" size="md" label="" />
                  </span>
                </div>

                <div className="mt-5 flex items-center gap-3">
                  <HudTag color="accent">{ep.number}</HudTag>
                  <span className="h-px w-4 bg-border" />
                  <HudTag color="mute">{ep.duration}</HudTag>
                </div>

                <h3 className="mt-3 font-display text-2xl uppercase leading-tight tracking-display text-ink transition-colors duration-200 group-hover:text-accent lg:text-3xl">
                  {ep.title}
                </h3>

                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-mute">
                  {ep.show}
                </p>
              </a>
            </li>
          ))}

          {/* Empty state */}
          {visible.length === 0 && (
            <li data-tile className="col-span-full py-12 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-mute">
                NO EPISODES CLASSIFIED · {filter}
              </p>
            </li>
          )}
        </ul>
      </div>
    </section>
  )
}

export default MissionLogs
