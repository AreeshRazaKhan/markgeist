'use client'

import { useRef } from 'react'

import HudTag from '@/components/motion/hud-tag'
import TextScramble from '@/components/motion/text-scramble'
import Reveal from '@/components/motion/reveal'
import LineReveal from '@/components/motion/line-reveal'
import PlayButton from '@/components/motion/play-button'
import Portrait from '@/components/motion/portrait'
import ArrowButton from '@/components/motion/arrow-button'
import { LATEST_EPISODE } from '@/constants/episodes'

const NowBroadcasting = () => {
  const ref = useRef(null)

  return (
    <section
      id="latest-episode"
      ref={ref}
      className="relative section-y border-b border-border bg-bg"
    >
      <div className="container-x">
        <Reveal className="mb-12 flex flex-col items-center text-center lg:mb-16">
          <HudTag color="accent">
            <TextScramble text="LATEST EPISODE" />
          </HudTag>
          <h2 className="display-xl mt-4 max-w-5xl text-balance text-[clamp(44px,6vw,104px)] leading-[0.96] text-ink">
            The most recent <span className="italic text-accent">conversation.</span>
          </h2>
        </Reveal>

        <article className="grid grid-cols-12 items-stretch gap-x-8 gap-y-10 lg:gap-x-12">
          {/* Cover art */}
          <div className="relative col-span-12 lg:col-span-5">
            <Portrait
              alt={`${LATEST_EPISODE.number} cover art — ${LATEST_EPISODE.title}`}
              seed={LATEST_EPISODE.id}
              ratio="square"
            />
            <div className="absolute right-3 top-3">
              <a
                href={LATEST_EPISODE.listenUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`Play ${LATEST_EPISODE.number}`}
              >
                <PlayButton as="span" size="lg" label={`Play ${LATEST_EPISODE.number}`} />
              </a>
            </div>
          </div>

          {/* Content */}
          <div className="col-span-12 flex flex-col justify-center lg:col-span-7">
            <div className="flex flex-wrap items-center gap-3">
              <HudTag color="accent">{`${LATEST_EPISODE.number} · ${LATEST_EPISODE.status}`}</HudTag>
              <span className="h-px w-6 bg-border" />
              <HudTag color="mute">{LATEST_EPISODE.show}</HudTag>
            </div>

            <h3 className="display-lg mt-6 text-[clamp(34px,4.5vw,72px)] uppercase tracking-display text-ink">
              {LATEST_EPISODE.title}
            </h3>

            <LineReveal as="p" className="mt-8 max-w-2xl text-pretty text-base leading-relaxed text-ink/80 lg:text-lg">
              {LATEST_EPISODE.summary}
            </LineReveal>

            <div className="mt-10 flex flex-wrap gap-x-12 gap-y-3 border-t border-border pt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-mute">
              <div>
                <span className="block text-mute">Host</span>
                <span className="mt-1 block text-ink">{LATEST_EPISODE.host}</span>
              </div>
              <div>
                <span className="block text-mute">Recorded</span>
                <span className="mt-1 block text-ink">{LATEST_EPISODE.recordedAt}</span>
              </div>
              <div>
                <span className="block text-mute">Duration</span>
                <span className="mt-1 block text-accent">{LATEST_EPISODE.duration}</span>
              </div>
              <div>
                <span className="block text-mute">Threat</span>
                <span className="mt-1 block text-live">{LATEST_EPISODE.threat}</span>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <ArrowButton
                as="a"
                href={LATEST_EPISODE.listenUrl}
                target="_blank"
                rel="noreferrer"
                variant="primary"
              >
                {`PLAY · ${LATEST_EPISODE.duration}`}
              </ArrowButton>
              <ArrowButton as="a" href="#mission-logs" variant="ghost">
                ARCHIVE
              </ArrowButton>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}

export default NowBroadcasting
