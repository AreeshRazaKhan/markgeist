'use client'

import { useRef, useState } from 'react'

import ParticleField from '@/components/webgl/particle-field'
import HudTag from '@/components/motion/hud-tag'
import CornerBrackets from '@/components/motion/corner-brackets'
import SplitReveal from '@/components/motion/split-reveal'
import { GUESTS } from '@/constants/guests'
import { cn } from '@/lib/utils'

const TheField = () => {
  const [active, setActive] = useState(0)
  const ref = useRef(null)

  return (
    <section
      id="the-field"
      ref={ref}
      className="relative section-y overflow-hidden border-b border-border bg-bg"
    >
      <div className="container-x grid grid-cols-12 gap-6">
        <div className="col-span-12 mb-8 flex items-center gap-4 lg:col-span-12">
          <HudTag color="accent">05 · THE FIELD</HudTag>
          <span className="h-px flex-1 bg-border" />
          <HudTag color="hud">{`${GUESTS.length} OPERATORS · GLOBAL`}</HudTag>
        </div>

        <div className="col-span-12 lg:col-span-8">
          <div className="relative aspect-[16/10] w-full border border-border bg-surface">
            <CornerBrackets color="accent" />
            <ParticleField points={GUESTS} className="absolute inset-0" />
            <div className="absolute left-4 top-4 flex items-center gap-2">
              <HudTag color="hud">SAT · LIVE</HudTag>
            </div>
            <div className="absolute bottom-4 right-4 flex items-center gap-2">
              <HudTag>{`LAT ${GUESTS[active].lat.toFixed(1)}° · LNG ${GUESTS[active].lng.toFixed(1)}°`}</HudTag>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4">
          <h2 className="display-lg text-[clamp(36px,5vw,72px)] text-ink">
            <SplitReveal className="block">THE PEOPLE</SplitReveal>
            <SplitReveal className="block text-accent" delay={0.08}>ON THE WIRE.</SplitReveal>
          </h2>
          <p className="mt-6 text-mute">
            Operators, lawmakers, families. Click a node to lock the dossier.
          </p>

          <ul className="mt-8 max-h-[420px] divide-y divide-border overflow-y-auto border border-border">
            {GUESTS.map((g, i) => (
              <li key={g.name}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  className={cn(
                    'flex w-full items-center justify-between px-4 py-3 text-left font-mono text-xs uppercase tracking-[0.16em] transition-colors',
                    i === active ? 'bg-accent text-accent-foreground' : 'text-ink hover:bg-surface'
                  )}
                >
                  <span>{g.name}</span>
                  <span className={cn('text-[10px] tracking-[0.2em]', i === active ? 'text-accent-foreground/80' : 'text-mute')}>
                    {g.role}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default TheField
