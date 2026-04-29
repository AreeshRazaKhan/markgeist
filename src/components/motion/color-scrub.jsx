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

/**
 * ColorScrub — scrubs the wrapper's color from `from` (default `mute`) to `to`
 * (default `ink`) as the element passes through the viewport. Works on any
 * descendant text that inherits color (e.g. SplitReveal spans inside an h2).
 */
const ColorScrub = ({
  as: Tag = 'span',
  from = 'hsl(0, 0%, 55%)',
  to = 'hsl(40, 33%, 93%)',
  start = 'top 90%',
  end = 'top 35%',
  className = '',
  children
}) => {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  useGsapContext(
    () => {
      const el = ref.current
      if (!el) return

      if (reduced) {
        el.style.color = to
        return
      }

      gsap.fromTo(
        el,
        { color: from },
        {
          color: to,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start,
            end,
            scrub: 0.5,
            invalidateOnRefresh: true
          }
        }
      )
    },
    [reduced, from, to, start, end],
    ref
  )

  return (
    <Tag ref={ref} className={cn(className)}>
      {children}
    </Tag>
  )
}

ColorScrub.propTypes = {
  as: PropTypes.elementType,
  from: PropTypes.string,
  to: PropTypes.string,
  start: PropTypes.string,
  end: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
}

export default ColorScrub
