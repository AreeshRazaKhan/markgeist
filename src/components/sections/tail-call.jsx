'use client'

import { useState } from 'react'
import Link from 'next/link'

import HudTag from '@/components/motion/hud-tag'
import CornerBrackets from '@/components/motion/corner-brackets'
import { NAV_LINKS, SOCIAL_LINKS } from '@/constants/nav'
import { cn } from '@/lib/utils'

const Switch = ({ label, active, onToggle }) => (
  <button
    type="button"
    onClick={onToggle}
    className="group flex items-center justify-between border border-border bg-surface px-4 py-3 text-left font-mono text-[11px] uppercase tracking-[0.18em] transition-colors hover:border-accent"
  >
    <span className={cn(active ? 'text-ink' : 'text-mute')}>{label}</span>
    <span
      className={cn(
        'relative inline-flex h-5 w-9 items-center border transition-colors',
        active ? 'border-accent bg-accent/10' : 'border-border bg-bg'
      )}
    >
      <span
        className={cn(
          'absolute top-1/2 h-3 w-3 -translate-y-1/2 transition-all',
          active ? 'left-[20px] bg-accent' : 'left-1 bg-mute'
        )}
      />
    </span>
  </button>
)

const TailCall = () => {
  const [signals, setSignals] = useState({ live: true, beacon: true, encrypt: false })

  return (
    <footer className="relative border-t border-border bg-bg">
      <div className="container-x grid grid-cols-12 gap-6 py-16">
        <div className="col-span-12 lg:col-span-5">
          <div className="relative h-32 w-full border border-border bg-surface p-4">
            <CornerBrackets color="accent" />
            <div className="absolute inset-0 grid-bg opacity-30" />
            <div className="relative flex h-full flex-col justify-between">
              <HudTag color="hud">COCKPIT · 101.3 MHZ</HudTag>
              <div className="flex items-center gap-3">
                <span className="relative flex h-2 w-2">
                  <span className={cn('absolute inline-flex h-full w-full opacity-75', signals.live ? 'animate-ping bg-live' : 'bg-mute')} />
                  <span className={cn('relative inline-flex h-2 w-2', signals.live ? 'bg-live' : 'bg-mute')} />
                </span>
                <span className="font-display text-3xl uppercase tracking-display text-ink">
                  OZ FREQUENCY
                </span>
              </div>
            </div>
          </div>

          <p className="mt-6 max-w-sm text-sm text-mute">
            Transmissions originate from a fortified position somewhere in Colorado. Coordinates withheld.
          </p>
        </div>

        <div className="col-span-12 lg:col-span-3">
          <HudTag color="accent">CHANNELS</HudTag>
          <ul className="mt-4 space-y-2">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="font-mono text-xs uppercase tracking-[0.18em] text-ink hover:text-accent">
                  {l.label} →
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-12 lg:col-span-4">
          <HudTag color="accent">SIGNAL CONTROL</HudTag>
          <div className="mt-4 grid gap-2">
            <Switch label="LIVE INDICATOR" active={signals.live} onToggle={() => setSignals((s) => ({ ...s, live: !s.live }))} />
            <Switch label="BEACON" active={signals.beacon} onToggle={() => setSignals((s) => ({ ...s, beacon: !s.beacon }))} />
            <Switch label="ENCRYPT" active={signals.encrypt} onToggle={() => setSignals((s) => ({ ...s, encrypt: !s.encrypt }))} />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {SOCIAL_LINKS.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="border border-border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-mute hover:border-accent hover:text-accent"
              >
                {s.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-x flex flex-wrap items-center justify-between gap-4 py-6">
          <HudTag>EOF · CLIENT RESPONSE LLC · 2026</HudTag>
          <HudTag color="hud">PRIVACY · STATIC OUT</HudTag>
        </div>
      </div>
    </footer>
  )
}

export default TailCall
