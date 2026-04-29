'use client'

import { useRef } from 'react'
import PropTypes from 'prop-types'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import useGsapContext from '@/hooks/use-gsap-context'
import useReducedMotion from '@/hooks/use-reduced-motion'
import { cn } from '@/lib/utils'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const GLYPHS = '!@#$%^&*()_+-={}[]|\\:;\"\'<>,./?ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

/**
 * TextScramble — letters cycle through random glyphs before locking into the final
 * text. Triggered once when the element scrolls into view. Each character runs its
 * own scramble loop, staggered by index, then settles to the real glyph.
 *
 * Best on tactical labels and short headlines (≤ 40 chars). Long copy will look noisy.
 */
const TextScramble = ({
  as: Tag = 'span',
  text,
  duration = 1.2,
  stagger = 0.04,
  start = 'top 85%',
  className = ''
}) => {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  useGsapContext(
    () => {
      const el = ref.current
      if (!el) return

      // Build per-character spans
      el.innerHTML = ''
      const chars = Array.from(text).map((ch) => {
        const span = document.createElement('span')
        span.dataset.target = ch
        span.textContent = ch === ' ' ? ' ' : ch
        span.style.display = 'inline-block'
        el.appendChild(span)
        return span
      })

      if (reduced) {
        chars.forEach((c) => (c.textContent = c.dataset.target))
        return
      }

      const scramble = (span, charDuration, charDelay) => {
        const target = span.dataset.target
        if (target === ' ' || target === ' ') return null
        const startTime = performance.now() + charDelay * 1000
        const endTime = startTime + charDuration * 1000
        let frameCount = 0
        const tick = (now) => {
          // Still waiting for this char's stagger delay — keep tick alive
          if (now < startTime) return true
          // Past the end — write the real letter and signal removal
          if (now >= endTime) {
            span.textContent = target
            return false
          }
          // Mid-scramble — flicker glyph every other frame
          frameCount += 1
          if (frameCount % 2 === 0) {
            span.textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          }
          return true
        }
        return tick
      }

      let activeTicks = []
      const ticker = () => {
        if (!activeTicks.length) {
          gsap.ticker.remove(ticker)
          return
        }
        const now = performance.now()
        for (let i = activeTicks.length - 1; i >= 0; i--) {
          const fn = activeTicks[i]
          // Tick returns `false` ONLY when its char has settled to its target.
          // Truthy values (true, undefined, etc.) keep the tick alive.
          if (fn(now) === false) activeTicks.splice(i, 1)
        }
      }

      const startScramble = () => {
        activeTicks = []
        chars.forEach((span, i) => {
          if (span.dataset.target !== ' ') {
            // pre-blank so scramble is visible
            span.textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          }
          const fn = scramble(span, duration, i * stagger)
          if (fn) activeTicks.push(fn)
        })
        gsap.ticker.add(ticker)
      }

      const resetScramble = () => {
        gsap.ticker.remove(ticker)
        activeTicks = []
        chars.forEach((span) => {
          span.textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        })
      }

      const trigger = ScrollTrigger.create({
        trigger: el,
        start,
        onEnter: startScramble,
        onEnterBack: startScramble,
        onLeaveBack: resetScramble
      })

      return () => {
        trigger.kill()
        gsap.ticker.remove(ticker)
      }
    },
    [reduced, text, duration, stagger, start],
    ref
  )

  return (
    <Tag ref={ref} className={cn(className)} aria-label={text}>
      {text}
    </Tag>
  )
}

TextScramble.propTypes = {
  as: PropTypes.elementType,
  text: PropTypes.string.isRequired,
  duration: PropTypes.number,
  stagger: PropTypes.number,
  start: PropTypes.string,
  className: PropTypes.string
}

export default TextScramble
