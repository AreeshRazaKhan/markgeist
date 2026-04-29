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
 * RGBSplit — renders three stacked copies of the same children: a red copy, an
 * accent copy, and the primary ink copy. On scroll-into-view, the red and accent
 * copies start offset by `offset` pixels and converge into the ink copy.
 * Use mostly on giant wordmarks for a tactical "decoding" feel.
 */
const RGBSplit = ({
  as: Tag = 'div',
  children,
  offset = 18,
  duration = 2.6,
  start = 'top 85%',
  className = '',
  ...rest
}) => {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  useGsapContext(
    () => {
      const el = ref.current
      if (!el) return
      const live = el.querySelector('[data-rgb="live"]')
      const accent = el.querySelector('[data-rgb="accent"]')
      if (!live || !accent) return

      if (reduced) {
        gsap.set([live, accent], { x: 0, y: 0, opacity: 0 })
        return
      }

      // Build a timeline so we can play/reverse the whole effect
      const tl = gsap.timeline({
        paused: true,
        defaults: { duration, ease: 'power3.inOut' }
      })
      tl.fromTo(
        live,
        { x: -offset, y: -offset * 0.4, opacity: 0.85 },
        { x: 0, y: 0, opacity: 0 },
        0
      ).fromTo(
        accent,
        { x: offset, y: offset * 0.4, opacity: 0.85 },
        { x: 0, y: 0, opacity: 0 },
        0.18
      )

      ScrollTrigger.create({
        trigger: el,
        start,
        onEnter: () => tl.play(),
        onLeaveBack: () => tl.reverse()
      })
    },
    [reduced, offset, duration, start],
    ref
  )

  return (
    <Tag ref={ref} className={cn('relative', className)} {...rest}>
      <span aria-hidden data-rgb="live" className="pointer-events-none absolute inset-0 text-live mix-blend-screen">
        {children}
      </span>
      <span aria-hidden data-rgb="accent" className="pointer-events-none absolute inset-0 text-accent mix-blend-screen">
        {children}
      </span>
      <span className="relative">{children}</span>
    </Tag>
  )
}

RGBSplit.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node.isRequired,
  offset: PropTypes.number,
  duration: PropTypes.number,
  start: PropTypes.string,
  className: PropTypes.string
}

export default RGBSplit
