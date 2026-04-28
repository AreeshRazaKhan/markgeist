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

const ParallaxLayer = ({ speed, className, children }) => {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  useGsapContext(
    () => {
      if (reduced) return
      const el = ref.current
      if (!el) return
      gsap.to(el, {
        yPercent: -speed * 12,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      })
    },
    [speed, reduced],
    ref
  )

  return (
    <div ref={ref} className={cn('will-change-transform', className)}>
      {children}
    </div>
  )
}

ParallaxLayer.propTypes = {
  speed: PropTypes.number,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
}

ParallaxLayer.defaultProps = {
  speed: 1,
  className: ''
}

export default ParallaxLayer
