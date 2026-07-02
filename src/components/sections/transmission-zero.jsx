'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import SplitReveal from '@/components/motion/split-reveal'
import LineReveal from '@/components/motion/line-reveal'
import RGBSplit from '@/components/motion/rgb-split'
import CornerBrackets from '@/components/motion/corner-brackets'
import Magnetic from '@/components/motion/magnetic'
import HudTag from '@/components/motion/hud-tag'
import ArrowButton from '@/components/motion/arrow-button'
import PlayButton from '@/components/motion/play-button'
import useGsapContext from '@/hooks/use-gsap-context'
import useReducedMotion from '@/hooks/use-reduced-motion'
import { EPISODES, LATEST_EPISODE } from '@/constants/episodes'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// The home hero is built around the client-provided "half-robot" key image (SOW §4.1).
// Until that asset is delivered, HERO_IMAGE stays null and an on-brand placeholder renders
// in the exact same slot. To swap in the final art: drop the file in /public and set
// HERO_IMAGE to its path, e.g. '/hero-half-robot.png'. No other change is needed.
const HERO_IMAGE = null
const HERO_IMAGE_PLACEHOLDER = 'https://picsum.photos/seed/mark-oz-geist-half-robot/1000/1250'

const TILES = EPISODES.slice(0, 4)

const TransmissionZero = () => {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  useGsapContext(
    () => {
      if (reduced) return

      // Half-robot key image wipes up on arrival
      gsap.from('[data-hero-figure]', {
        clipPath: 'inset(0 0 100% 0)',
        opacity: 0,
        duration: 1.3,
        delay: 0.15,
        ease: 'expo.out'
      })

      const lines = ref.current?.querySelectorAll('[data-hero-line]')
      if (lines?.length) {
        gsap.fromTo(
          lines,
          { scaleX: 0 },
          { scaleX: 1, duration: 1.2, delay: 0.2, ease: 'expo.out', transformOrigin: 'left center' }
        )
      }

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

  const heroSrc = HERO_IMAGE || HERO_IMAGE_PLACEHOLDER

  return (
    <section
      id="transmission"
      ref={ref}
      className="relative isolate overflow-hidden border-b border-border bg-bg pt-24 lg:pt-28"
    >
      <div aria-hidden className="absolute inset-0 z-canvas grid-bg opacity-30" />
      <div aria-hidden className="absolute inset-0 z-canvas accent-wash" />
      <div aria-hidden className="absolute inset-0 z-canvas scanlines opacity-50" />

      {/* Top corner HUD strip */}
      <div className="container-x relative z-content flex items-center justify-between gap-4 pb-10">
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

      {/* Image-forward hero — the half-robot key image anchors the right, copy + primary play left */}
      <div className="container-x relative z-content grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <h1 className="display-xl max-w-3xl text-balance text-[clamp(44px,6.4vw,104px)] text-ink">
            <SplitReveal as="span" className="block">ONE NIGHT IN BENGHAZI.</SplitReveal>
            <SplitReveal as="span" className="block italic text-accent" delay={0.1}>A LIFETIME ON THE RECORD.</SplitReveal>
          </h1>

          <LineReveal as="p" className="mt-8 max-w-xl text-pretty text-base leading-relaxed text-ink/80 lg:text-lg">
            Marine. Benghazi Annex Security Team. Co-author of <em className="not-italic underline decoration-accent">13 Hours</em>.
            Co-founder of Shadow Warriors Project. Host of The Oz Cast, long-form conversations on
            service, survival, leadership, and what comes after the fight.
          </LineReveal>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Magnetic>
              <ArrowButton as="a" href={LATEST_EPISODE.listenUrl} target="_blank" rel="noreferrer" variant="primary">
                {`PLAY · ${LATEST_EPISODE.number}`}
              </ArrowButton>
            </Magnetic>
            <ArrowButton as={Link} href="#newsletter" variant="ghost">JOIN THE NEWSLETTER</ArrowButton>
          </div>
        </div>

        {/* Half-robot key image */}
        <figure data-hero-figure className="relative lg:col-span-5">
          <div className="relative border border-border">
            <CornerBrackets color="accent" />
            <div className="relative aspect-[4/5] overflow-hidden bg-surface">
              <Image
                src={heroSrc}
                alt='Mark "Oz" Geist'
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover grayscale-[0.2] contrast-[1.05]"
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-bg via-bg/10 to-transparent" />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-tr from-accent/15 via-transparent to-transparent mix-blend-multiply" />
              <div aria-hidden className="absolute inset-0 grain pointer-events-none" />
            </div>
            <figcaption className="absolute bottom-3 left-3 z-overlay">
              <HudTag color="accent">MARK &quot;OZ&quot; GEIST</HudTag>
            </figcaption>
            {!HERO_IMAGE && (
              <span
                aria-hidden
                className="absolute right-3 top-3 z-overlay bg-bg/85 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.22em] text-mute"
              >
                {'// KEY ART PENDING'}
              </span>
            )}
          </div>
        </figure>
      </div>

      {/* Recent-episodes strip */}
      <div className="container-x relative z-content mt-16">
        <div className="mb-5 flex items-center justify-between border-b border-border pb-4">
          <HudTag color="mute">RECENT EPISODES</HudTag>
          <ArrowButton as={Link} href="/episodes" variant="ghost" className="px-3 py-2">
            ALL EPISODES
          </ArrowButton>
        </div>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">
          {TILES.map((ep) => (
            <li key={ep.id} data-tile>
              <Link
                href={`/episodes/${ep.id}`}
                className="group relative block overflow-hidden border border-border transition-colors duration-300 hover:border-accent"
                aria-label={`Play ${ep.number} ${ep.title}`}
              >
                <div className="relative aspect-square overflow-hidden bg-surface">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://picsum.photos/seed/${ep.id}/600/600`}
                    alt={`${ep.number} cover art`}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover grayscale-[0.25] contrast-[1.05]"
                  />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-tr from-accent/20 via-bg/10 to-bg/60 mix-blend-multiply" />
                  <div aria-hidden className="absolute inset-0 grain pointer-events-none" />
                </div>
                <span aria-hidden className="absolute inset-0 flex items-center justify-center bg-bg/60 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <PlayButton as="span" size="md" label="" />
                </span>
                <span className="absolute left-2 top-2 bg-bg/85 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.22em] text-ink">
                  {ep.number}
                </span>
                <span className="absolute bottom-2 right-2 bg-bg/85 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.22em] text-mute">
                  {ep.duration}
                </span>
              </Link>
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
