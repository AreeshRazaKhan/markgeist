'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import HudTag from '@/components/motion/hud-tag'
import { cn } from '@/lib/utils'
import { NAV_LINKS } from '@/constants/nav'

const TopNav = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-nav border-b border-transparent transition-colors duration-300',
        scrolled && 'border-border bg-bg/80 backdrop-blur-md'
      )}
    >
      <div className="container-x flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-ink">
            OZ FREQUENCY
          </span>
          <span className="hidden h-3 w-px bg-border md:block" />
          <HudTag color="hud" className="hidden md:inline">SIG · 101.3</HudTag>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-mute transition-colors hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping bg-live opacity-75" />
            <span className="relative inline-flex h-2 w-2 bg-live" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-live">ON AIR</span>
        </div>

        <Sheet>
          <SheetTrigger className="font-mono text-[11px] uppercase tracking-[0.2em] md:hidden">
            MENU
          </SheetTrigger>
          <SheetContent side="right" className="w-[80vw] border-l border-border bg-bg">
            <nav className="mt-12 flex flex-col gap-6">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="font-display text-2xl uppercase tracking-display text-ink"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

export default TopNav
