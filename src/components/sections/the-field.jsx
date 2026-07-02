'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import HudTag from '@/components/motion/hud-tag'
import Portrait from '@/components/motion/portrait'
import useGsapContext from '@/hooks/use-gsap-context'
import useReducedMotion from '@/hooks/use-reduced-motion'
import { APPEARANCES } from '@/constants/appearances'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const TheField = () => {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const rightRef = useRef(null)
  const counterRef = useRef(null)
  const nameRef = useRef(null)
  const roleRef = useRef(null)
  const listenRef = useRef(null)
  const progressRef = useRef(null)
  const reduced = useReducedMotion()
  const total = APPEARANCES.length

  useGsapContext(
    () => {
      if (reduced) return
      if (typeof window === 'undefined') return
      if (!window.matchMedia('(min-width: 1024px)').matches) return

      const track = trackRef.current
      const right = rightRef.current
      if (!track || !right) return

      const getDistance = () => Math.max(0, track.scrollWidth - right.clientWidth)

      let prevIdx = -1
      const swapActive = (idx) => {
        if (idx === prevIdx) return
        prevIdx = idx
        const g = APPEARANCES[idx]
        if (counterRef.current) counterRef.current.textContent = String(idx + 1).padStart(2, '0')
        if (nameRef.current) nameRef.current.textContent = g.name
        if (roleRef.current) roleRef.current.textContent = g.role
        if (listenRef.current) listenRef.current.href = g.url
        const targets = [nameRef.current, roleRef.current].filter(Boolean)
        if (targets.length) {
          gsap.killTweensOf(targets)
          gsap.fromTo(
            targets,
            { opacity: 0.2, y: 8 },
            { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
          )
        }
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (st) => {
            const idx = Math.min(total - 1, Math.round(st.progress * (total - 1)))
            swapActive(idx)
          }
        }
      })

      tl.to(track, { x: () => -getDistance(), ease: 'none' })
      if (progressRef.current) {
        tl.to(progressRef.current, { scaleX: 1, ease: 'none' }, '<')
      }
    },
    [reduced],
    sectionRef
  )

  return (
    <section
      id="the-field"
      ref={sectionRef}
      className="relative w-full overflow-hidden border-y border-border bg-bg lg:h-screen"
    >
      {/* HUD label */}
      <div className="absolute left-6 top-8 z-30 lg:left-12 lg:top-10">
        <HudTag color="accent">SHOWS THAT HOSTED OZ</HudTag>
      </div>

      {/* Two-column layout */}
      <div className="flex h-full flex-col lg:flex-row lg:items-center">
        {/* LEFT — fixed heading + dynamic active info */}
        <div className="px-6 pb-12 pt-28 lg:flex-shrink-0 lg:px-12 lg:pb-0 lg:pt-0 lg:w-[44vw]">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
            FIELD · {APPEARANCES.length} STATIONS
          </p>
          <h2
            className="display-xl mt-4 text-balance text-ink"
            style={{
              fontSize: 'clamp(48px, 6.4vw, 116px)',
              lineHeight: 0.96,
              letterSpacing: '-0.02em'
            }}
          >
            <span className="block">SHOWS THAT</span>
            <span className="block italic text-accent">HOSTED OZ.</span>
          </h2>
          <p className="mt-6 max-w-md text-mute">
            {APPEARANCES.length} long-form interviews on the record. Pick a show to listen. Every link
            opens directly to the episode.
          </p>

          {/* Active-slide panel (desktop only) */}
          <div className="mt-10 hidden border-t border-border pt-6 lg:block">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-mute">
              <span ref={counterRef} className="text-ink">01</span>
              <span> / </span>
              <span>{String(total).padStart(2, '0')} · </span>
              <span className="text-accent">NOW PLAYING</span>
            </p>
            <h3
              ref={nameRef}
              className="font-display mt-4 uppercase leading-[0.92] tracking-display text-ink"
              style={{ fontSize: 'clamp(28px, 2.6vw, 48px)' }}
            >
              {APPEARANCES[0].name}
            </h3>
            <p
              ref={roleRef}
              className="mt-2 font-mono text-xs uppercase tracking-[0.22em] text-accent"
            >
              {APPEARANCES[0].role}
            </p>
            <a
              ref={listenRef}
              href={APPEARANCES[0].url}
              target="_blank"
              rel="noreferrer"
              className="group mt-6 inline-flex items-center gap-3 border border-border px-5 py-3 font-mono text-xs uppercase tracking-[0.22em] text-ink transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              Listen on the record
              <span className="transition-transform group-hover:translate-x-1">↗</span>
            </a>
          </div>
        </div>

        {/* RIGHT — sliding track (desktop) / vertical stack (mobile) */}
        <div
          ref={rightRef}
          className="relative w-full overflow-hidden px-6 pb-20 lg:flex lg:flex-1 lg:items-center lg:self-stretch lg:px-0 lg:pb-0"
        >
          <div
            ref={trackRef}
            className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-10 lg:pr-12 lg:will-change-transform"
          >
            {APPEARANCES.map((g, i) => (
              <article
                key={g.name}
                data-slide
                className="relative w-full flex-shrink-0 lg:w-[34vw] lg:max-w-[500px]"
              >
                <div className="relative">
                  <Portrait alt={`${g.name} cover art`} seed={g.name} ratio="portrait" />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3 top-3 font-mono text-[10px] uppercase tracking-[0.22em] text-ink mix-blend-screen"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                {/* Mobile-only meta (left panel doesn't update on mobile) */}
                <div className="mt-4 lg:hidden">
                  <h3 className="font-display text-2xl uppercase tracking-display text-ink">
                    {g.name}
                  </h3>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                    {g.role}
                  </p>
                  <a
                    href={g.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-accent"
                  >
                    Listen ↗
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom progress bar + scroll hint (desktop) */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 hidden h-px bg-border lg:block">
        <div ref={progressRef} className="h-full origin-left scale-x-0 bg-accent" />
      </div>
    </section>
  )
}

export default TheField
