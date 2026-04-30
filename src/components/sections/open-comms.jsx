'use client'

import { useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { toast } from 'sonner'

import HudTag from '@/components/motion/hud-tag'
import SplitReveal from '@/components/motion/split-reveal'
import ColorScrub from '@/components/motion/color-scrub'
import ArrowButton from '@/components/motion/arrow-button'
import Reveal from '@/components/motion/reveal'
import Odometer from '@/components/motion/odometer'
import TextScramble from '@/components/motion/text-scramble'
import useGsapContext from '@/hooks/use-gsap-context'
import useReducedMotion from '@/hooks/use-reduced-motion'
import { cn } from '@/lib/utils'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const OpenComms = () => {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const [subscribing, setSubscribing] = useState(false)

  useGsapContext(
    () => {
      if (reduced) return
      gsap.to('[data-cta-wordmark]', {
        yPercent: -10,
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

  const onSubmit = (e) => {
    e.preventDefault()
    setSubscribing(true)
    setTimeout(() => {
      setSubscribing(false)
      toast.success('You&rsquo;re in', {
        description: 'New episodes will land in your inbox.',
        duration: 3500
      })
      e.target.reset()
    }, 800)
  }

  return (
    <section
      id="newsletter"
      ref={ref}
      className="relative section-y overflow-hidden border-b border-border bg-bg"
    >
      <div className="container-x relative z-content">
        <Reveal className="mb-10 flex flex-col items-center gap-6 text-center lg:mb-12">
          <HudTag color="accent">
            <TextScramble text="07 — NEWSLETTER" />
          </HudTag>
          <div className="flex flex-col items-center gap-2">
            <HudTag color="mute">LISTENERS</HudTag>
            <Odometer
              value={13428}
              className="font-display text-[clamp(56px,10vw,140px)] tracking-display text-ink"
            />
          </div>
          <p className="max-w-md font-mono text-[10px] uppercase tracking-[0.22em] text-mute">
            One email per new episode. No marketing. Receipts only.
          </p>
        </Reveal>

        {/* Giant CTA wordmark — full bleed */}
        <h2
          data-cta-wordmark
          className="full-bleed display-xl whitespace-nowrap text-center text-ink"
          style={{ fontSize: 'clamp(72px, 12vw, 200px)', lineHeight: 0.88, letterSpacing: '-0.02em' }}
        >
          <ColorScrub as="span" className="block">
            <SplitReveal className="block">SAY HELLO,</SplitReveal>
            <SplitReveal className="block italic text-accent" delay={0.08}>OPERATOR.</SplitReveal>
          </ColorScrub>
        </h2>

        {/* Inline single-line form */}
        <form
          onSubmit={onSubmit}
          className="mx-auto mt-12 flex max-w-2xl flex-col items-stretch gap-3 sm:flex-row sm:gap-0"
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            name="email"
            required
            placeholder="you@email.com"
            aria-label="Email address"
            className="flex-1 border border-border bg-transparent px-5 py-4 font-mono text-sm tracking-[0.06em] text-ink placeholder:text-mute focus:border-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          />
          <button
            type="submit"
            disabled={subscribing}
            className={cn(
              'inline-flex items-center justify-center gap-3 border px-6 py-4 font-mono text-xs uppercase tracking-[0.22em] transition-colors duration-200 sm:border-l-0',
              subscribing
                ? 'border-accent bg-accent text-accent-foreground'
                : 'border-accent bg-transparent text-accent hover:bg-accent hover:text-accent-foreground'
            )}
          >
            {subscribing ? 'SENDING…' : 'SUBSCRIBE'}
            <span aria-hidden>→</span>
          </button>
        </form>

        {/* Or — direct platform links */}
        <div className="mx-auto mt-12 flex max-w-3xl flex-col items-center gap-4 border-t border-border pt-10">
          <HudTag color="mute">OR LISTEN DIRECTLY</HudTag>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <ArrowButton
              as="a"
              href="https://open.spotify.com/episode/4nuvtJt2TqDiJQqQIM84TR"
              target="_blank"
              rel="noreferrer"
              variant="ghost"
            >
              SPOTIFY
            </ArrowButton>
            <ArrowButton
              as="a"
              href="https://podcasts.apple.com/ga/podcast/mark-geist-mortars-miracles-why-he-survived-benghazi/id1674015509?i=1000745708568"
              target="_blank"
              rel="noreferrer"
              variant="ghost"
            >
              APPLE PODCASTS
            </ArrowButton>
            <ArrowButton
              as="a"
              href="https://youtu.be/Q9i_es05rWc"
              target="_blank"
              rel="noreferrer"
              variant="ghost"
            >
              YOUTUBE
            </ArrowButton>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OpenComms
