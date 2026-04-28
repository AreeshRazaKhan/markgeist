'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import ParallaxLayer from '@/components/motion/parallax-layer'
import SplitReveal from '@/components/motion/split-reveal'
import HudTag from '@/components/motion/hud-tag'
import CornerBrackets from '@/components/motion/corner-brackets'
import useGsapContext from '@/hooks/use-gsap-context'
import useReducedMotion from '@/hooks/use-reduced-motion'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const FILE_LINES = [
  { label: 'NAME', value: 'GEIST, MARK "OZ"' },
  { label: 'SVC', value: 'USMC · 1984—' },
  { label: 'CLR', value: 'TS / CONTRACT' },
  { label: 'AOR', value: 'IRAQ · BENGHAZI · CONUS' },
  { label: 'CRED', value: '13 HOURS · 25 LIVES' }
]

const OperatorDossier = () => {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  useGsapContext(
    () => {
      if (reduced) return
      gsap.fromTo(
        '[data-redact]',
        { width: '100%' },
        {
          width: 0,
          ease: 'power3.inOut',
          duration: 1.2,
          stagger: 0.08,
          scrollTrigger: { trigger: ref.current, start: 'top 60%', once: true }
        }
      )
      gsap.fromTo(
        '[data-stamp]',
        { scale: 1.4, rotate: -16, opacity: 0 },
        {
          scale: 1,
          rotate: -8,
          opacity: 1,
          ease: 'back.out(2)',
          duration: 0.8,
          delay: 0.6,
          scrollTrigger: { trigger: ref.current, start: 'top 60%', once: true }
        }
      )
    },
    [reduced],
    ref
  )

  return (
    <section
      id="operator"
      ref={ref}
      className="relative section-y overflow-hidden border-b border-border bg-bg"
    >
      <div aria-hidden className="absolute inset-0 grid-bg opacity-20" />
      <ParallaxLayer
        speed={2}
        className="absolute -left-20 top-20 z-canvas h-72 w-72 opacity-10"
      >
        <div className="h-full w-full border border-accent" />
      </ParallaxLayer>

      <div className="container-x relative z-content grid grid-cols-12 gap-6">
        <div className="col-span-12 mb-12 flex items-center gap-4 lg:col-span-12">
          <HudTag color="accent">03 · OPERATOR DOSSIER</HudTag>
          <span className="h-px flex-1 bg-border" />
          <HudTag color="hud">CLASSIFIED · DECLASSIFIED 2026-04-22</HudTag>
        </div>

        <aside className="col-span-12 lg:col-span-5">
          <div className="relative aspect-[4/5] w-full border border-border bg-surface">
            <CornerBrackets color="accent" />
            <div className="absolute inset-0 grid-bg opacity-30" />
            <ParallaxLayer speed={0.6} className="absolute inset-8 flex items-center justify-center">
              <div className="relative h-full w-full">
                <div className="absolute inset-0 rounded-full border border-accent/30" />
                <div className="absolute inset-12 rounded-full border border-accent/40" />
                <div className="absolute inset-24 rounded-full border border-accent/60" />
                <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 bg-accent" />
                <span className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-accent/40" />
                <span className="absolute bottom-0 left-1/2 top-0 w-px -translate-x-1/2 bg-accent/40" />
              </div>
            </ParallaxLayer>
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
              <div>
                <HudTag>SUBJECT</HudTag>
                <p className="mt-1 font-display text-xl text-ink">OZ &middot; LIVE</p>
              </div>
              <div data-stamp className="border border-live px-3 py-2 font-mono text-xs uppercase tracking-[0.25em] text-live">
                CONFIRMED
              </div>
            </div>
          </div>
        </aside>

        <div className="col-span-12 lg:col-span-7">
          <h2 className="display-xl text-[clamp(40px,6vw,88px)] text-ink">
            <SplitReveal className="block">A LIFETIME OF</SplitReveal>
            <SplitReveal className="block text-accent" delay={0.1}>VALOR ON FILE.</SplitReveal>
          </h2>

          <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-2 border border-border bg-surface p-6 lg:max-w-xl">
            {FILE_LINES.map((line) => (
              <div key={line.label} className="contents">
                <HudTag className="self-center">{line.label}</HudTag>
                <p className="font-mono text-sm uppercase tracking-[0.12em] text-ink">{line.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 space-y-4 text-mute">
            <p className="relative max-w-xl text-base lg:text-lg">
              <span data-redact className="absolute inset-y-1 left-0 z-10 bg-ink mix-blend-difference" />
              U.S. Marine Corps in 1984. Counterterrorism focus, Persian Farsi for interrogation work,
              Philippines deployment, Marine units across the southern hemisphere.
            </p>
            <p className="relative max-w-xl text-base lg:text-lg">
              <span data-redact className="absolute inset-y-1 left-0 z-10 bg-ink mix-blend-difference" />
              Deputy Sheriff in Colorado, Police Chief in Fowler. Private investigator. Then Iraq in 2004
              with Triple Canopy and USIS, training Iraqi SWAT teams in counter-IED and direct action.
            </p>
            <p className="relative max-w-xl text-base lg:text-lg">
              <span data-redact className="absolute inset-y-1 left-0 z-10 bg-ink mix-blend-difference" />
              Benghazi, 11 September 2012. The annex team holds the line for thirteen hours. 25 lives saved.
              Co-author of <em className="not-italic underline decoration-accent">13 Hours</em>.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OperatorDossier
