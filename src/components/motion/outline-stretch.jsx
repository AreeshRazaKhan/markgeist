'use client'

import { useMemo, useRef } from 'react'
import PropTypes from 'prop-types'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import useGsapContext from '@/hooks/use-gsap-context'
import useReducedMotion from '@/hooks/use-reduced-motion'
import { cn } from '@/lib/utils'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * OutlineStretch — scroll-scrubbed reveal. Each character is initially rendered
 * as a hazard-orange outline (`-webkit-text-stroke`) and gently stretched
 * (scaleY 1.4, scaleX 0.88). As the user scrolls past the wordmark, a GSAP
 * timeline scrubs: chars settle to natural scale and the bone (or accent) fill
 * fades in with a left-to-right cascade. More scroll = more revealed; scroll
 * back to un-reveal.
 */
const OutlineStretch = ({
  prefix,
  accent,
  prefixClass = '',
  accentClass = 'italic',
  stretch = 1.18,
  squeeze = 0.92,
  as: Tag = 'h2',
  start = 'top 95%',
  end = 'top 25%',
  scrub = 0.5,
  className = '',
  style,
  ...rest
}) => {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  const chars = useMemo(() => {
    const p = Array.from(prefix).map((ch, i) => ({ ch, key: `p-${i}-${ch}`, italic: false }))
    const a = Array.from(accent).map((ch, i) => ({ ch, key: `a-${i}-${ch}`, italic: true }))
    return [...p, ...a]
  }, [prefix, accent])

  useGsapContext(
    () => {
      const el = ref.current
      if (!el) return
      const spans = Array.from(el.querySelectorAll('[data-ch]'))
      if (!spans.length) return

      // Resolve CSS-var colors to RGB for GSAP color interpolation
      const probe = document.createElement('span')
      probe.style.cssText = 'position:absolute;visibility:hidden;pointer-events:none'
      document.body.appendChild(probe)
      probe.style.color = 'hsl(var(--ink))'
      const inkColor = window.getComputedStyle(probe).color
      probe.style.color = 'hsl(var(--accent))'
      const accentColor = window.getComputedStyle(probe).color
      document.body.removeChild(probe)

      if (reduced) {
        gsap.set(spans, { scaleY: 1, scaleX: 1 })
        spans.forEach((s, i) => {
          s.style.color = chars[i]?.italic ? accentColor : inkColor
          s.style.setProperty('--ol-stroke', '0px')
        })
        return
      }

      // Initial state — outline only, stretched
      gsap.set(spans, { scaleY: stretch, scaleX: squeeze })
      spans.forEach((s) => {
        s.style.color = 'transparent'
        s.style.setProperty('--ol-stroke', '1.5px')
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start,
          end,
          scrub,
          invalidateOnRefresh: true
        }
      })

      const total = spans.length
      const staggerSpan = 0.6
      spans.forEach((s, i) => {
        const isAccent = chars[i]?.italic
        const targetColor = isAccent ? accentColor : inkColor
        const t = (i / Math.max(1, total - 1)) * staggerSpan
        tl.to(s, { scaleY: 1, scaleX: 1, duration: 0.6, ease: 'power2.out' }, t)
        tl.to(s, { color: targetColor, duration: 0.45, ease: 'power2.out' }, t + 0.12)
        tl.to(s, { '--ol-stroke': '0px', duration: 0.45, ease: 'power2.out' }, t + 0.12)
      })
    },
    [reduced, prefix, accent, stretch, squeeze, start, end, scrub],
    ref
  )

  return (
    <Tag
      ref={ref}
      aria-label={`${prefix}${accent}`}
      className={cn('relative whitespace-nowrap', className)}
      style={style}
      {...rest}
    >
      {chars.map(({ ch, key, italic }) => (
        <span
          key={key}
          data-ch
          aria-hidden="true"
          className={cn('inline-block', italic ? accentClass : prefixClass)}
          style={{
            transformOrigin: 'center bottom',
            willChange: 'transform',
            color: 'transparent',
            WebkitTextStrokeColor: 'hsl(var(--accent))',
            WebkitTextStrokeWidth: 'var(--ol-stroke, 1.5px)'
          }}
        >
          {ch === ' ' ? ' ' : ch}
        </span>
      ))}
    </Tag>
  )
}

OutlineStretch.propTypes = {
  prefix: PropTypes.string.isRequired,
  accent: PropTypes.string.isRequired,
  prefixClass: PropTypes.string,
  accentClass: PropTypes.string,
  stretch: PropTypes.number,
  squeeze: PropTypes.number,
  as: PropTypes.elementType,
  start: PropTypes.string,
  end: PropTypes.string,
  scrub: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  className: PropTypes.string,
  style: PropTypes.object
}

export default OutlineStretch
