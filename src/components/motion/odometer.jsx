'use client'

import { useEffect, useMemo, useRef } from 'react'
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
 * Odometer — column-rolling counter. Each digit lives in its own clipped column
 * containing 0–9 stacked vertically; on scroll-into-view, each column tweens
 * yPercent to land on the right digit. Right-most digit lands first; left-most last.
 * Non-digit characters (commas, etc.) render in fixed positions.
 */
const Odometer = ({ value, duration = 2.4, start = 'top 80%', className = '' }) => {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  // Stable string with thousands separators
  const display = useMemo(() => value.toLocaleString('en-US'), [value])
  const chars = useMemo(() => Array.from(display), [display])

  useGsapContext(
    () => {
      const el = ref.current
      if (!el) return
      const columns = el.querySelectorAll('[data-odo-col]')
      if (!columns.length) return

      const targets = []
      columns.forEach((col) => {
        const digit = parseInt(col.dataset.target, 10)
        targets.push({ col, inner: col.querySelector('[data-odo-inner]'), digit })
      })

      // Each digit row is 1em tall; positioning uses `y` in em units (digit-count-independent)
      if (reduced) {
        targets.forEach(({ inner, digit }) => {
          gsap.set(inner, { y: `-${digit}em` })
        })
        return
      }

      // Build a timeline that rolls all columns from 0 → final position. We render 30 stacked
      // digits (3 cycles of 0–9). The natural end position `-(digit + extraCycles*10)em` lands
      // visually on the correct digit because 0–9 repeats every 10 rows. NO post-complete snap —
      // it desyncs the timeline state and causes visual jumps on reverse.
      const tl = gsap.timeline({ paused: true })
      targets.forEach(({ inner, digit }, i) => {
        const fromRight = targets.length - 1 - i
        // Right-most column = ~1 cycle, each column further left adds half a cycle of spin (cap at 2)
        const extraCycles = Math.min(2, Math.floor(fromRight * 0.5))
        const finalEm = digit + extraCycles * 10
        tl.fromTo(
          inner,
          { y: '0em' },
          {
            y: `-${finalEm}em`,
            duration: duration + fromRight * 0.18,
            ease: 'expo.out'
          },
          0
        )
      })

      ScrollTrigger.create({
        trigger: el,
        start,
        onEnter: () => tl.play(),
        onLeaveBack: () => tl.reverse()
      })
    },
    [reduced, value, duration, start],
    ref
  )

  return (
    <span
      ref={ref}
      className={cn('inline-flex items-baseline tabular-nums leading-none', className)}
      aria-label={display}
    >
      {chars.map((c, i) => {
        if (/\d/.test(c)) {
          return (
            <span
              key={`${c}-${i}`}
              data-odo-col
              data-target={c}
              className="relative inline-block align-baseline"
              style={{
                height: '1em',
                width: '0.6em',
                overflow: 'hidden',
                lineHeight: 1
              }}
              aria-hidden
            >
              <span
                data-odo-inner
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  display: 'block',
                  height: '30em',
                  willChange: 'transform'
                }}
              >
                {Array.from({ length: 30 }).map((_, j) => (
                  <span
                    key={j}
                    style={{
                      display: 'block',
                      height: '1em',
                      width: '0.6em',
                      lineHeight: 1,
                      textAlign: 'center',
                      overflow: 'hidden'
                    }}
                  >
                    {j % 10}
                  </span>
                ))}
              </span>
            </span>
          )
        }
        return (
          <span key={`${c}-${i}`} aria-hidden className="inline-block align-baseline" style={{ lineHeight: 1 }}>
            {c}
          </span>
        )
      })}
    </span>
  )
}

Odometer.propTypes = {
  value: PropTypes.number.isRequired,
  duration: PropTypes.number,
  start: PropTypes.string,
  className: PropTypes.string
}

export default Odometer
