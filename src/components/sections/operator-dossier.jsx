'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import SplitReveal from '@/components/motion/split-reveal'
import LineReveal from '@/components/motion/line-reveal'
import ScrubReveal from '@/components/motion/scrub-reveal'
import ColorScrub from '@/components/motion/color-scrub'
import Reveal from '@/components/motion/reveal'
import Portrait from '@/components/motion/portrait'
import HudTag from '@/components/motion/hud-tag'
import TextScramble from '@/components/motion/text-scramble'
import useGsapContext from '@/hooks/use-gsap-context'
import useReducedMotion from '@/hooks/use-reduced-motion'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const TAGS = [
  'MARINE',
  'ANNEX SECURITY TEAM',
  'CONTRACTOR',
  'AUTHOR · 13 HOURS',
  'CO-FOUNDER · SHADOW WARRIORS',
  'SPEAKER',
  'FATHER'
]

const OperatorDossier = () => {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  useGsapContext(
    () => {
      if (reduced) return
      // Giant background wordmark — slow scroll-scrub parallax
      gsap.to('[data-bg-wordmark]', {
        yPercent: -18,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top bottom',
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
      id="operator"
      ref={ref}
      className="relative section-y overflow-hidden border-b border-border bg-bg"
    >
      {/* Background wordmark — sits behind copy */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 z-canvas -translate-y-1/2 select-none">
        <h2
          aria-hidden
          data-bg-wordmark
          className="display-xl whitespace-nowrap text-center text-ink/[0.04]"
          style={{ fontSize: 'clamp(160px, 25vw, 400px)', lineHeight: 0.84, letterSpacing: '-0.04em' }}
        >
          ABOUT <span className="italic">OZ</span>
        </h2>
      </div>

      <div className="container-x relative z-content">
        <Reveal className="mb-12 flex flex-col items-center gap-4 text-center lg:mb-16">
          <HudTag color="accent">
            <TextScramble text="03 — ABOUT OZ" />
          </HudTag>
          <h2 className="display-xl max-w-5xl text-balance text-[clamp(44px,6vw,104px)] leading-[0.92] text-ink">
            <ColorScrub as="span" className="block">
              <SplitReveal className="block">A LIFETIME OF</SplitReveal>
              <SplitReveal className="block italic text-accent" delay={0.08}>VALOR ON FILE.</SplitReveal>
            </ColorScrub>
          </h2>
        </Reveal>

        <div className="grid grid-cols-12 gap-x-8 gap-y-12 lg:gap-x-16">
          <div className="col-span-12 lg:col-span-5">
            <Portrait alt="Mark Geist portrait" seed="mark-oz-geist" ratio="portrait" />

            <ul className="mt-8 flex flex-wrap gap-2">
              {TAGS.map((t) => (
                <li
                  key={t}
                  className="border border-border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-mute"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <ScrubReveal as="p" from={0.15} className="font-display text-3xl uppercase leading-tight tracking-display text-ink lg:text-5xl">
              I&rsquo;VE TOLD THIS STORY ENOUGH TIMES TO KNOW WHICH PARTS THE HEADLINES MISS.
            </ScrubReveal>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-mute">
              &mdash; The interviews are where the rest of it lives.
            </p>

            <div className="mt-12 max-w-2xl space-y-6 text-base leading-relaxed text-ink/80 lg:text-lg">
              <LineReveal as="p" stagger={0.06}>
                Enlisted U.S. Marine Corps, 1984. Barracks duty Philippines, 2nd Battalion 9th
                Marines Golf Company, Surveillance &amp; Target Acquisition Platoon. Marine Cadre
                as Anti/Counter-Terrorism Instructor. Intelligence specialty: interrogation, with
                Persian Farsi language qualification.
              </LineReveal>
              <LineReveal as="p" stagger={0.06}>
                Out of uniform: Deputy Sheriff in Teller County, Colorado &mdash; Vice/Narcotics
                liaison and Crimes Against Children investigator. Chief of Police in Fowler,
                Colorado. Bail bonds and bounty hunting on the side. Then 2004 &mdash; Iraq, with
                Triple Canopy on State Department detail, USIS training Iraqi SWAT, and a mentor
                seat with Prime Minister Allawi&rsquo;s security detail.
              </LineReveal>
              <LineReveal as="p" stagger={0.06}>
                11 September 2012, Benghazi. The Annex Security Team holds the line for thirteen
                hours. 25+ Americans evacuated alive. Co-author of the bestseller{' '}
                <em className="not-italic underline decoration-accent">13 Hours: The Inside Account of What Really Happened in Benghazi</em>{' '}
                &mdash; the book that became the film. Co-founder of Shadow Warriors Project:
                service dogs, retreats, and aid for contractors carrying wounds nobody filed.
              </LineReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OperatorDossier
