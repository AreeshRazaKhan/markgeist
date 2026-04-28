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

const SplitReveal = ({ as: Tag, children, delay, stagger, className }) => {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  useGsapContext(
    () => {
      if (reduced) return
      const el = ref.current
      if (!el) return

      const text = el.textContent ?? ''
      const words = text.trim().split(/\s+/)
      el.textContent = ''
      const spans = words.map((w) => {
        const outer = document.createElement('span')
        outer.style.display = 'inline-block'
        outer.style.overflow = 'hidden'
        outer.style.verticalAlign = 'bottom'
        outer.style.lineHeight = '1'
        const inner = document.createElement('span')
        inner.style.display = 'inline-block'
        inner.style.transform = 'translateY(110%)'
        inner.textContent = w
        outer.appendChild(inner)
        el.appendChild(outer)
        const space = document.createTextNode(' ')
        el.appendChild(space)
        return inner
      })

      gsap.to(spans, {
        yPercent: 0,
        ease: 'expo.out',
        duration: 0.9,
        delay,
        stagger,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true
        }
      })
    },
    [reduced, delay, stagger],
    ref
  )

  return (
    <Tag ref={ref} className={cn(className)}>
      {children}
    </Tag>
  )
}

SplitReveal.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node.isRequired,
  delay: PropTypes.number,
  stagger: PropTypes.number,
  className: PropTypes.string
}

SplitReveal.defaultProps = {
  as: 'span',
  delay: 0,
  stagger: 0.06,
  className: ''
}

export default SplitReveal
