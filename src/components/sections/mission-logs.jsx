'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import HudTag from '@/components/motion/hud-tag'
import CornerBrackets from '@/components/motion/corner-brackets'
import SplitReveal from '@/components/motion/split-reveal'
import useGsapContext from '@/hooks/use-gsap-context'
import useReducedMotion from '@/hooks/use-reduced-motion'
import { EPISODES } from '@/constants/episodes'
import { cn } from '@/lib/utils'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const SPANS = ['col-span-12 lg:col-span-7 row-span-2', 'col-span-12 lg:col-span-5', 'col-span-6 lg:col-span-4', 'col-span-6 lg:col-span-3', 'col-span-6 lg:col-span-5', 'col-span-6 lg:col-span-7']

const THREAT_TONE = {
  CRITICAL: 'text-live border-live',
  ELEVATED: 'text-accent border-accent',
  CLASSIFIED: 'text-hud border-hud',
  NOMINAL: 'text-mute border-border'
}

const Card = ({ ep, span, lead }) => {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  useGsapContext(
    () => {
      if (reduced) return
      const el = ref.current
      if (!el) return
      const r = el.querySelector('[data-shift-r]')
      const g = el.querySelector('[data-shift-g]')
      const b = el.querySelector('[data-shift-b]')

      const onMove = (e) => {
        const rect = el.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width - 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5
        gsap.to(r, { x: x * 8, y: y * 4, duration: 0.5, ease: 'power2.out' })
        gsap.to(b, { x: x * -8, y: y * -4, duration: 0.5, ease: 'power2.out' })
        gsap.to(g, { x: x * 2, y: y * 1, duration: 0.5, ease: 'power2.out' })
      }
      const onLeave = () => {
        gsap.to([r, g, b], { x: 0, y: 0, duration: 0.6, ease: 'power3.out' })
      }
      el.addEventListener('mousemove', onMove)
      el.addEventListener('mouseleave', onLeave)
      return () => {
        el.removeEventListener('mousemove', onMove)
        el.removeEventListener('mouseleave', onLeave)
      }
    },
    [reduced],
    ref
  )

  return (
    <article
      ref={ref}
      className={cn(
        'group relative overflow-hidden border border-border bg-surface p-6 transition-colors duration-300 hover:border-accent',
        span
      )}
    >
      <CornerBrackets color="ink" />
      <div className="flex items-start justify-between">
        <HudTag color="hud">{ep.number}</HudTag>
        <span className={cn('border px-2 py-1 font-mono text-[9px] uppercase tracking-[0.2em]', THREAT_TONE[ep.threat])}>
          {ep.threat}
        </span>
      </div>

      <div className="relative mt-8">
        <h3
          data-shift-g
          className={cn(
            'font-display uppercase tracking-display text-ink',
            lead ? 'text-3xl lg:text-6xl' : 'text-2xl lg:text-3xl'
          )}
        >
          {ep.title}
        </h3>
        <h3
          data-shift-r
          aria-hidden
          className={cn(
            'pointer-events-none absolute inset-0 mix-blend-screen text-live opacity-0 transition-opacity duration-300 group-hover:opacity-80 font-display uppercase tracking-display',
            lead ? 'text-3xl lg:text-6xl' : 'text-2xl lg:text-3xl'
          )}
        >
          {ep.title}
        </h3>
        <h3
          data-shift-b
          aria-hidden
          className={cn(
            'pointer-events-none absolute inset-0 mix-blend-screen text-hud opacity-0 transition-opacity duration-300 group-hover:opacity-80 font-display uppercase tracking-display',
            lead ? 'text-3xl lg:text-6xl' : 'text-2xl lg:text-3xl'
          )}
        >
          {ep.title}
        </h3>
      </div>

      {lead && <p className="mt-6 max-w-md text-mute">{ep.summary}</p>}

      <div className="mt-8 flex items-end justify-between">
        <HudTag>{ep.coordinates}</HudTag>
        <HudTag color="accent">{ep.duration}</HudTag>
      </div>
    </article>
  )
}

const MissionLogs = () => {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  useGsapContext(
    () => {
      if (reduced) return
      gsap.from('[data-card]', {
        opacity: 0,
        y: 40,
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
      id="mission-logs"
      ref={ref}
      className="relative section-y border-b border-border bg-bg"
    >
      <div className="container-x">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <HudTag color="accent">04 · MISSION LOGS</HudTag>
            <h2 className="display-xl mt-4 text-[clamp(40px,6vw,88px)] text-ink">
              <SplitReveal className="block">CASE FILES,</SplitReveal>
              <SplitReveal className="block text-accent" delay={0.08}>UNCUT.</SplitReveal>
            </h2>
          </div>
          <p className="hidden max-w-sm text-mute lg:block">
            Each transmission tagged with threat level, frequency, and field coordinates. Hover to
            decrypt.
          </p>
        </div>

        <div className="grid auto-rows-[minmax(220px,auto)] grid-cols-12 gap-4">
          {EPISODES.map((ep, i) => (
            <div key={ep.id} data-card className={SPANS[i % SPANS.length]}>
              <Card ep={ep} span="h-full w-full" lead={i === 0} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default MissionLogs
