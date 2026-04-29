'use client'

import Image from 'next/image'
import Link from 'next/link'

import HudTag from '@/components/motion/hud-tag'
import RGBSplit from '@/components/motion/rgb-split'
import { MISSION_LINKS, NAV_LINKS, SOCIAL_LINKS, SUBSCRIBE_LINKS } from '@/constants/nav'
import { LATEST_EPISODE } from '@/constants/episodes'

const TailCall = () => {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-bg">
      {/* Giant overflowing wordmark — full bleed */}
      <div className="full-bleed relative pt-20 lg:pt-24">
        <RGBSplit
          as="h2"
          aria-hidden
          offset={18}
          className="display-xl whitespace-nowrap text-center text-ink"
          style={{ fontSize: 'clamp(88px, 16vw, 280px)', lineHeight: 0.86, letterSpacing: '-0.03em' }}
        >
          ON THE <span className="italic text-accent">RECORD.</span>
        </RGBSplit>
      </div>

      <div className="container-x py-16 lg:py-20">
        {/* Tactical sign-off */}
        <div className="mb-16 flex flex-col items-center gap-4 text-center">
          <HudTag color="accent">EOF · STATIC OUT</HudTag>
          <p className="font-display text-3xl uppercase leading-tight tracking-display text-ink lg:text-5xl">
            THANKS FOR LISTENING.
            <span className="block italic text-accent">TALK SOON.</span>
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-mute">
            &mdash; Mark &ldquo;Oz&rdquo; Geist · Recording from Colorado
          </p>
        </div>

        <div className="grid grid-cols-12 gap-8 border-t border-border pt-12 lg:gap-12">
          {/* Brand block */}
          <div className="col-span-12 lg:col-span-4">
            <Image
              src="/mark-geist-logo.png"
              alt="Mark Geist"
              width={1500}
              height={135}
              className="h-10 w-auto"
            />
            <p className="mt-6 max-w-sm text-sm text-mute">
              Marine. Annex Security Team. Co-author of <em className="not-italic underline decoration-accent">13 Hours</em>.
              Co-founder of Shadow Warriors Project.
            </p>
            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-mute">
              Latest · {LATEST_EPISODE.number} · {LATEST_EPISODE.duration}
            </p>
          </div>

          {/* Site nav */}
          <div className="col-span-6 lg:col-span-2">
            <HudTag color="accent">Pages</HudTag>
            <ul className="mt-4 space-y-2">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="font-mono text-xs uppercase tracking-[0.18em] text-ink hover:text-accent">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* External / mission links */}
          <div className="col-span-6 lg:col-span-3">
            <HudTag color="accent">External</HudTag>
            <ul className="mt-4 space-y-2">
              {MISSION_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-xs uppercase tracking-[0.18em] text-ink hover:text-accent"
                  >
                    {l.label} ↗
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Subscribe + social */}
          <div className="col-span-12 lg:col-span-3">
            <HudTag color="accent">Listen</HudTag>
            <ul className="mt-4 space-y-2">
              {SUBSCRIBE_LINKS.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-xs uppercase tracking-[0.18em] text-ink hover:text-accent"
                  >
                    {l.label} →
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <HudTag color="mute">Social</HudTag>
              <div className="mt-3 flex flex-wrap gap-2">
                {SOCIAL_LINKS.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="border border-border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-mute hover:border-accent hover:text-accent"
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Colophon */}
      <div className="border-t border-border">
        <div className="container-x flex flex-wrap items-center justify-between gap-4 py-6">
          <HudTag color="mute">© 2026 Client Response LLC · All rights reserved</HudTag>
          <HudTag color="mute">Privacy · Static Out</HudTag>
        </div>
      </div>
    </footer>
  )
}

export default TailCall
