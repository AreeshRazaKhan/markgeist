'use client'

import { useRef } from 'react'
import gsap from 'gsap'

import LogoDisplacement from '@/components/webgl/logo-displacement'
import ParallaxLayer from '@/components/motion/parallax-layer'
import SplitReveal from '@/components/motion/split-reveal'
import Magnetic from '@/components/motion/magnetic'
import HudTag from '@/components/motion/hud-tag'
import CornerBrackets from '@/components/motion/corner-brackets'
import ArrowButton from '@/components/motion/arrow-button'
import useGsapContext from '@/hooks/use-gsap-context'
import useReducedMotion from '@/hooks/use-reduced-motion'
import { LATEST_EPISODE } from '@/constants/episodes'

const TransmissionZero = () => {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  useGsapContext(
    () => {
      if (reduced) return
      gsap.from('[data-hero-meta]', {
        opacity: 0,
        y: 20,
        duration: 0.9,
        delay: 0.3,
        stagger: 0.08,
        ease: 'expo.out'
      })
      gsap.fromTo(
        '[data-hero-line]',
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, delay: 0.2, ease: 'expo.out', transformOrigin: 'left center' }
      )
    },
    [reduced],
    ref
  )

  return (
    <section
      id="transmission"
      ref={ref}
      className="relative isolate overflow-hidden border-b border-border bg-bg pt-28 lg:pt-32"
    >
      <div aria-hidden className="absolute inset-0 z-canvas grid-bg opacity-30" />
      <div aria-hidden className="absolute inset-0 z-canvas scanlines opacity-60" />
      <ParallaxLayer
        speed={1.5}
        className="absolute -top-20 right-[-10%] z-canvas h-[480px] w-[480px] opacity-20"
      >
        <div className="h-full w-full rounded-full border border-accent/40" />
        <div className="absolute inset-12 rounded-full border border-accent/30" />
        <div className="absolute inset-24 rounded-full border border-accent/20" />
      </ParallaxLayer>

      <div className="container-x relative z-content grid grid-cols-12 gap-6 pb-12 lg:pb-20">
        <div className="col-span-12 lg:col-span-7">
          <div className="mb-6 flex items-center gap-4">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping bg-live opacity-75" />
              <span className="relative inline-flex h-2 w-2 bg-live" />
            </span>
            <HudTag color="live" className="text-live">{`BROADCAST · ${LATEST_EPISODE.frequency} MHZ`}</HudTag>
            <span data-hero-line className="hidden h-px flex-1 bg-border md:block" />
            <HudTag color="hud" className="hidden md:inline">{LATEST_EPISODE.coordinates}</HudTag>
          </div>

          <h1 className="display-xl text-balance text-[clamp(48px,8vw,128px)] text-ink">
            <SplitReveal as="span" className="block">ONE FREQUENCY.</SplitReveal>
            <SplitReveal as="span" className="block text-accent" delay={0.1}>ONE OPERATOR.</SplitReveal>
            <SplitReveal as="span" className="block" delay={0.2}>NO COVER.</SplitReveal>
          </h1>

          <p className="mt-8 max-w-xl text-pretty text-base text-mute lg:text-lg">
            Mark &ldquo;Oz&rdquo; Geist broadcasts from a country that forgot how to listen.
            Operators, lawmakers, families &mdash; on the record, off the script.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Magnetic radius={120} strength={0.25}>
              <ArrowButton variant="primary">TUNE IN</ArrowButton>
            </Magnetic>
            <ArrowButton variant="ghost">MISSION LOGS</ArrowButton>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6 border-t border-border pt-6 lg:max-w-md">
            <div data-hero-meta>
              <HudTag>EPISODES</HudTag>
              <p className="mt-2 font-display text-3xl text-ink">042</p>
            </div>
            <div data-hero-meta>
              <HudTag>HOURS LOGGED</HudTag>
              <p className="mt-2 font-display text-3xl text-ink">38.6</p>
            </div>
            <div data-hero-meta>
              <HudTag>FREQUENCY</HudTag>
              <p className="mt-2 font-display text-3xl text-accent">101.3</p>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-5">
          <div className="relative aspect-square w-full">
            <CornerBrackets color="accent" />
            <div className="absolute inset-0 p-6">
              <LogoDisplacement src="/logo-oz-mark.svg" className="h-full w-full text-accent" />
            </div>
            <div className="absolute left-4 top-4 flex items-center gap-2">
              <HudTag color="accent">TARGET LOCK</HudTag>
            </div>
            <div className="absolute bottom-4 right-4">
              <HudTag color="hud">DECRYPT · OK</HudTag>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-x relative flex items-center gap-6 py-4">
          <HudTag color="hud">NOW AIRING</HudTag>
          <span className="h-px flex-1 bg-border" />
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink">
            {LATEST_EPISODE.number} &middot; {LATEST_EPISODE.title}
          </p>
          <span className="h-px w-12 bg-border" />
          <HudTag color="hud">{LATEST_EPISODE.duration}</HudTag>
        </div>
      </div>
    </section>
  )
}

export default TransmissionZero
