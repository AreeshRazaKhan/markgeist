'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const useLenis = ({ enabled = true } = {}) => {
  const lenisRef = useRef(null)

  useEffect(() => {
    if (!enabled) return undefined

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4
    })
    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)

    const tickerCb = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tickerCb)
    gsap.ticker.lagSmoothing(0)

    const refreshId = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh()
    })

    // Display fonts (Anton, etc.) can swap in after the first refresh, changing
    // the height of giant wordmarks and invalidating scroll-trigger positions.
    let active = true
    document.fonts?.ready.then(() => {
      if (active) ScrollTrigger.refresh()
    })

    return () => {
      active = false
      window.cancelAnimationFrame(refreshId)
      gsap.ticker.remove(tickerCb)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [enabled])

  return lenisRef
}

export default useLenis
