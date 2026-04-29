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

const isInViewport = (el) => {
  const rect = el.getBoundingClientRect()
  const vh = window.innerHeight || document.documentElement.clientHeight
  return rect.top < vh && rect.bottom > 0
}

const SplitReveal = ({ as: Tag = 'span', children, delay = 0, stagger = 0.06, className = '' }) => {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  useGsapContext(
    () => {
      const el = ref.current
      if (!el) return

      const text = el.textContent ?? ''
      const words = text.trim().split(/\s+/)
      el.textContent = ''

      const spans = words.map((w) => {
        const outer = document.createElement('span')
        outer.style.display = 'inline-block'
        outer.style.verticalAlign = 'bottom'
        outer.style.lineHeight = '1'
        // Clip only the bottom edge so the initial translateY hides the word,
        // while letting italic skew extend freely off the top / left / right.
        outer.style.clipPath = 'inset(-0.4em -0.4em 0 -0.4em)'
        outer.style.webkitClipPath = 'inset(-0.4em -0.4em 0 -0.4em)'
        const inner = document.createElement('span')
        inner.style.display = 'inline-block'
        inner.textContent = w
        outer.appendChild(inner)
        el.appendChild(outer)
        const space = document.createTextNode(' ')
        el.appendChild(space)
        return inner
      })

      gsap.set(spans, { yPercent: reduced ? 0 : 110 })

      if (reduced) return

      // If already in view at mount, play immediately + still wire reverse on scroll-back
      if (isInViewport(el)) {
        gsap.to(spans, {
          yPercent: 0,
          ease: 'expo.out',
          duration: 0.9,
          delay,
          stagger
        })
      }

      gsap.fromTo(
        spans,
        { yPercent: 110 },
        {
          yPercent: 0,
          ease: 'expo.out',
          duration: 0.9,
          delay,
          stagger,
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      )
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

export default SplitReveal
