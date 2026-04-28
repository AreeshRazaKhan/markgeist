'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import HudTag from '@/components/motion/hud-tag'
import CornerBrackets from '@/components/motion/corner-brackets'
import useGsapContext from '@/hooks/use-gsap-context'
import useReducedMotion from '@/hooks/use-reduced-motion'
import { EPISODES } from '@/constants/episodes'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const NowBroadcasting = () => {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const dialRef = useRef(null)
  const reduced = useReducedMotion()

  useGsapContext(
    () => {
      if (reduced) return
      const track = trackRef.current
      const dial = dialRef.current
      const section = sectionRef.current
      if (!track || !dial || !section) return

      const totalScroll = () => track.scrollWidth - window.innerWidth + 240

      gsap.to(track, {
        x: () => -totalScroll(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${totalScroll()}`,
          scrub: 0.4,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      })

      gsap.to(dial, {
        rotate: 320,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${totalScroll()}`,
          scrub: 0.4,
          invalidateOnRefresh: true
        }
      })
    },
    [reduced],
    sectionRef
  )

  return (
    <section
      id="now-broadcasting"
      ref={sectionRef}
      className="relative h-screen overflow-hidden border-b border-border bg-bg"
    >
      <div aria-hidden className="absolute inset-0 grid-bg opacity-20" />

      <div className="container-x relative z-content flex h-full flex-col">
        <div className="flex items-center justify-between pt-12">
          <div className="flex items-center gap-4">
            <HudTag color="accent">02 · NOW BROADCASTING</HudTag>
            <span className="hidden h-px w-32 bg-border md:block" />
          </div>
          <HudTag color="hud">SCRUB FREQUENCY · DRAG / SCROLL</HudTag>
        </div>

        <div className="relative flex-1">
          <div className="absolute left-0 top-1/2 z-content -translate-y-1/2">
            <div className="relative h-72 w-72">
              <div ref={dialRef} className="absolute inset-0">
                <div className="absolute inset-0 rounded-full border border-border" />
                <div className="absolute inset-4 rounded-full border border-accent/40" />
                <div className="absolute inset-12 rounded-full border border-border" />
                <span className="absolute left-1/2 top-0 h-8 w-px -translate-x-1/2 bg-accent" />
                {Array.from({ length: 36 }).map((_, i) => (
                  <span
                    key={i}
                    className="absolute left-1/2 top-1/2 h-32 w-px origin-top -translate-x-1/2 bg-border"
                    style={{ transform: `translate(-50%, -50%) rotate(${i * 10}deg) translateY(-90px)` }}
                  />
                ))}
              </div>
              <div className="absolute inset-1/3 flex items-center justify-center rounded-full border border-accent bg-bg">
                <span className="font-display text-xl text-accent">101.3</span>
              </div>
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.25em] text-mute">
                MHZ
              </span>
            </div>
          </div>

          <div className="ml-auto flex h-full items-center pl-[22rem]">
            <div ref={trackRef} className="flex shrink-0 items-center gap-6 will-change-transform">
              {EPISODES.map((ep, idx) => (
                <article
                  key={ep.id}
                  className="relative h-[60vh] w-[64vw] shrink-0 border border-border bg-surface p-8 lg:w-[40vw]"
                >
                  <CornerBrackets color={idx === 0 ? 'accent' : 'ink'} />
                  <div className="flex items-start justify-between">
                    <HudTag color={idx === 0 ? 'live' : 'hud'}>{`${ep.number} · ${ep.status}`}</HudTag>
                    <HudTag>{ep.coordinates}</HudTag>
                  </div>
                  <h3 className="display-lg mt-10 max-w-md text-3xl text-ink lg:text-5xl">
                    {ep.title}
                  </h3>
                  <p className="mt-6 max-w-md text-mute">{ep.summary}</p>
                  <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between">
                    <div>
                      <HudTag>FREQUENCY</HudTag>
                      <p className="font-display text-2xl text-accent">{ep.frequency}</p>
                    </div>
                    <div className="text-right">
                      <HudTag>DURATION</HudTag>
                      <p className="font-display text-2xl text-ink">{ep.duration}</p>
                    </div>
                  </div>
                </article>
              ))}
              <div className="h-[60vh] w-[20vw] shrink-0" />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pb-10">
          <HudTag>STATIC · DECODE · LOCK</HudTag>
          <HudTag color="accent">{`${EPISODES.length} TRANSMISSIONS LOGGED`}</HudTag>
        </div>
      </div>
    </section>
  )
}

export default NowBroadcasting
