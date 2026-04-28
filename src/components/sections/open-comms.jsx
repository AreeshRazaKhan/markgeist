'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { toast } from 'sonner'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import HudTag from '@/components/motion/hud-tag'
import CornerBrackets from '@/components/motion/corner-brackets'
import SplitReveal from '@/components/motion/split-reveal'
import ArrowButton from '@/components/motion/arrow-button'
import useGsapContext from '@/hooks/use-gsap-context'
import useReducedMotion from '@/hooks/use-reduced-motion'
import { cn } from '@/lib/utils'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const TARGET_COUNT = 13428

const Counter = () => {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const [val, setVal] = useState(reduced ? TARGET_COUNT : 0)

  useEffect(() => {
    if (reduced || !ref.current) return undefined
    const obj = { v: 0 }
    const tween = gsap.to(obj, {
      v: TARGET_COUNT,
      duration: 2.4,
      ease: 'power3.out',
      onUpdate: () => setVal(Math.floor(obj.v)),
      scrollTrigger: { trigger: ref.current, start: 'top 75%', once: true }
    })
    return () => tween.kill()
  }, [reduced])

  return (
    <div ref={ref}>
      <HudTag color="accent">FREQUENCY UNLOCKED</HudTag>
      <p className="mt-2 font-display text-[clamp(56px,9vw,140px)] leading-none text-ink tabular-nums">
        {val.toLocaleString('en-US')}
      </p>
      <p className="mt-2 text-sm text-mute">operators tuned in</p>
    </div>
  )
}

const OpenComms = () => {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const [transmitting, setTransmitting] = useState(false)

  useGsapContext(
    () => {
      if (reduced) return
      gsap.from('[data-form-row]', {
        opacity: 0,
        y: 16,
        duration: 0.6,
        stagger: 0.06,
        ease: 'expo.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%', once: true }
      })
    },
    [reduced],
    ref
  )

  const onSubmit = (e) => {
    e.preventDefault()
    setTransmitting(true)
    setTimeout(() => {
      setTransmitting(false)
      toast.success('SIGNAL RECEIVED', {
        description: 'You are now on the frequency.',
        duration: 3500
      })
      e.target.reset()
    }, 800)
  }

  return (
    <section
      id="open-comms"
      ref={ref}
      className="relative section-y overflow-hidden border-b border-border bg-bg"
    >
      <div aria-hidden className="absolute inset-0 grid-bg opacity-20" />

      <div className="container-x relative z-content grid grid-cols-12 gap-6">
        <div className="col-span-12 mb-8 flex items-center gap-4">
          <HudTag color="accent">07 · OPEN COMMS</HudTag>
          <span className="h-px flex-1 bg-border" />
          <HudTag color="hud">CHANNEL OPEN</HudTag>
        </div>

        <div className="relative col-span-12 border border-border bg-surface p-8 lg:col-span-7 lg:p-12">
          <CornerBrackets color="accent" />
          <Counter />
          <div className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-8">
            <div>
              <HudTag>SPOTIFY</HudTag>
              <p className="mt-2 font-display text-2xl text-ink">8.4K</p>
            </div>
            <div>
              <HudTag>APPLE</HudTag>
              <p className="mt-2 font-display text-2xl text-ink">3.1K</p>
            </div>
            <div>
              <HudTag>YOUTUBE</HudTag>
              <p className="mt-2 font-display text-2xl text-ink">1.9K</p>
            </div>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <ArrowButton variant="primary">TUNE IN · SPOTIFY</ArrowButton>
            <ArrowButton variant="ghost">APPLE PODCASTS</ArrowButton>
            <ArrowButton variant="ghost">YOUTUBE</ArrowButton>
          </div>
        </div>

        <div className="relative col-span-12 border border-border bg-surface p-8 lg:col-span-5 lg:p-12">
          <CornerBrackets />
          <h3 className="display-lg text-3xl text-ink lg:text-5xl">
            <SplitReveal className="block">JOIN</SplitReveal>
            <SplitReveal className="block text-accent" delay={0.08}>THE FREQUENCY.</SplitReveal>
          </h3>
          <p className="mt-3 text-sm text-mute">
            One transmission per drop. No marketing. Receipts only.
          </p>

          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            <div data-form-row>
              <Label htmlFor="callsign" className="font-mono text-[10px] uppercase tracking-[0.2em] text-mute">
                CALLSIGN
              </Label>
              <Input
                id="callsign"
                name="callsign"
                required
                className="mt-2 border-border bg-bg font-mono uppercase tracking-[0.12em]"
                placeholder="OPERATOR"
              />
            </div>
            <div data-form-row>
              <Label htmlFor="email" className="font-mono text-[10px] uppercase tracking-[0.2em] text-mute">
                COMM CHANNEL
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                className="mt-2 border-border bg-bg font-mono tracking-[0.06em]"
                placeholder="you@frequency.io"
              />
            </div>
            <div data-form-row>
              <Label htmlFor="intent" className="font-mono text-[10px] uppercase tracking-[0.2em] text-mute">
                INTENT
              </Label>
              <Input
                id="intent"
                name="intent"
                className="mt-2 border-border bg-bg"
                placeholder="Booking · Lottery · Listener"
              />
            </div>
            <div data-form-row className="flex items-center gap-3 pt-2">
              <ArrowButton variant="primary" type="submit" disabled={transmitting}>
                {transmitting ? 'TRANSMITTING…' : 'TRANSMIT'}
              </ArrowButton>
              <span className={cn('font-mono text-[10px] uppercase tracking-[0.2em]', transmitting ? 'text-live' : 'text-mute')}>
                {transmitting ? '● ENCODING' : '○ READY'}
              </span>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default OpenComms
