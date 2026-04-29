'use client'

import { useId, useRef } from 'react'
import PropTypes from 'prop-types'
import gsap from 'gsap'

import useGsapContext from '@/hooks/use-gsap-context'
import useReducedMotion from '@/hooks/use-reduced-motion'
import { cn } from '@/lib/utils'

/**
 * OrbitBadge — circular text mark with a small reticle in the middle.
 * Rotates continuously (slow) when motion is allowed.
 *
 * Pass `text` ending in a separator token (e.g. " · "); component duplicates the
 * string twice along the path so it reads continuously around the circle.
 */
const OrbitBadge = ({
  text = 'A PERSONAL PODCAST · MARK GEIST · 2026',
  size = 132,
  duration = 28,
  className = ''
}) => {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const id = useId().replace(/:/g, '')
  const pathId = `orbit-${id}`

  // Build a circle path centered in viewBox 100x100, radius 38, ~circumference 238
  // The path starts at top (cx=50, cy=12) and arcs clockwise through itself.
  const cx = 50
  const cy = 50
  const r = 38

  useGsapContext(
    () => {
      const el = ref.current
      if (!el || reduced) return undefined
      const tween = gsap.to(el, {
        rotation: 360,
        ease: 'none',
        duration,
        repeat: -1,
        transformOrigin: 'center center'
      })
      return () => tween.kill()
    },
    [reduced, duration],
    ref
  )

  const display = `${text}  ·  ${text}  ·  `

  return (
    <div
      aria-hidden
      className={cn('relative inline-flex items-center justify-center', className)}
      style={{ width: size, height: size }}
    >
      <svg
        ref={ref}
        viewBox="0 0 100 100"
        width={size}
        height={size}
        className="absolute inset-0"
      >
        <defs>
          <path
            id={pathId}
            d={`M ${cx},${cy} m -${r},0 a ${r},${r} 0 1,1 ${r * 2},0 a ${r},${r} 0 1,1 -${r * 2},0`}
          />
        </defs>
        <text
          fill="currentColor"
          className="font-mono"
          style={{ fontSize: 6.4, letterSpacing: '0.18em' }}
        >
          <textPath href={`#${pathId}`} startOffset="0">
            {display}
          </textPath>
        </text>
      </svg>

      {/* Reticle in the middle (matches logo) */}
      <span
        aria-hidden
        className="relative flex h-7 w-7 items-center justify-center rounded-full border border-accent"
      >
        <span aria-hidden className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-accent/70" />
        <span aria-hidden className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-accent/70" />
        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
      </span>
    </div>
  )
}

OrbitBadge.propTypes = {
  text: PropTypes.string,
  size: PropTypes.number,
  duration: PropTypes.number,
  className: PropTypes.string
}

export default OrbitBadge
