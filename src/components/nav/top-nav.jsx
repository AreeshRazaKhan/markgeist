'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
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
        scrolled && 'border-border bg-bg/85 backdrop-blur-md'
      )}
    >
      <div className="container-x flex h-16 items-center justify-between">
        <Link href="/" className="group flex items-center gap-3" aria-label="The Oz Cast — home">
          <Image
            src="/the-oz-cast-logo.png"
            alt="The Oz Cast — hosted by Mark Geist"
            width={734}
            height={124}
            priority
            className="h-7 w-auto"
          />
          <span className="hidden h-3 w-px bg-border lg:block" />
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-mute lg:inline">
            Hosted by Mark Geist
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
          {NAV_LINKS.filter((l) => l.primary).map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-mute transition-colors hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center lg:flex">
          <Link
            href="/subscribe"
            className="border border-accent bg-transparent px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-accent transition-colors duration-200 hover:bg-accent hover:text-accent-foreground"
          >
            SUBSCRIBE →
          </Link>
        </div>

        <Sheet>
          <SheetTrigger className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink lg:hidden">
            MENU
          </SheetTrigger>
          <SheetContent side="right" className="w-[80vw] border-l border-border bg-bg">
            <SheetTitle className="sr-only">Site navigation</SheetTitle>
            <nav className="mt-12 flex flex-col gap-6">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="font-display text-3xl uppercase tracking-display text-ink hover:text-accent"
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
