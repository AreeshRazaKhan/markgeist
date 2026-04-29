'use client'

import HudTag from '@/components/motion/hud-tag'
import Reveal from '@/components/motion/reveal'
import { SUBSCRIBE_LINKS } from '@/constants/nav'

const SubscribeRow = () => {
  return (
    <section
      id="subscribe"
      aria-label="Subscribe on podcast platforms"
      className="relative border-b border-border bg-bg py-10"
    >
      <Reveal as="div" className="container-x flex flex-col items-center gap-5 lg:flex-row lg:justify-between">
        <HudTag color="accent">SUBSCRIBE WHEREVER YOU LISTEN</HudTag>

        <ul className="flex flex-wrap items-center justify-center gap-2 lg:gap-3">
          {SUBSCRIBE_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 border border-border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-mute transition-colors duration-200 hover:border-accent hover:text-accent"
              >
                <span>{link.label}</span>
                <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">
                  →
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}

export default SubscribeRow
