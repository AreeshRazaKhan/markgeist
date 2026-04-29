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

const Reveal = ({
  as: Tag = 'div',
  y = 24,
  delay = 0,
  duration = 0.9,
  start = 'top 85%',
  stagger = 0,
  className = '',
  children
}) => {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  useGsapContext(
    () => {
      const el = ref.current
      if (!el) return

      const targets = stagger > 0 ? Array.from(el.children) : el

      if (reduced) {
        gsap.set(targets, { autoAlpha: 1, y: 0 })
        return
      }

      gsap.fromTo(
        targets,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration,
          delay,
          ease: 'expo.out',
          stagger,
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: 'play none none reverse'
          }
        }
      )
    },
    [reduced, y, delay, duration, start, stagger],
    ref
  )

  return (
    <Tag ref={ref} className={cn(className)}>
      {children}
    </Tag>
  )
}

Reveal.propTypes = {
  as: PropTypes.elementType,
  y: PropTypes.number,
  delay: PropTypes.number,
  duration: PropTypes.number,
  start: PropTypes.string,
  stagger: PropTypes.number,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
}

export default Reveal
