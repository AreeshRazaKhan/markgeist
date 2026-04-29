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
 * ScrubReveal — splits content into word spans and fades each from `from` opacity
 * to 1 in sequence as the user scrolls past the element. Tied to scroll progress
 * via ScrollTrigger scrub. Cinematic "read-along" effect (Cunnet, Studio Pseudo).
 */
const ScrubReveal = ({
  as: Tag = 'p',
  children,
  from = 0.18,
  start = 'top 80%',
  end = 'bottom 60%',
  className = ''
}) => {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  useGsapContext(
    () => {
      const el = ref.current
      if (!el) return

      if (!el.dataset.originalHtml) {
        el.dataset.originalHtml = el.innerHTML
      }
      el.innerHTML = el.dataset.originalHtml

      const wrapTextNodesInWords = (root) => {
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null)
        const textNodes = []
        while (walker.nextNode()) textNodes.push(walker.currentNode)
        textNodes.forEach((node) => {
          if (!node.nodeValue || !node.nodeValue.trim()) return
          const frag = document.createDocumentFragment()
          const parts = node.nodeValue.split(/(\s+)/)
          parts.forEach((p) => {
            if (!p) return
            if (/^\s+$/.test(p)) {
              frag.appendChild(document.createTextNode(p))
            } else {
              const w = document.createElement('span')
              w.className = '__sr-word'
              w.style.display = 'inline-block'
              w.textContent = p
              frag.appendChild(w)
            }
          })
          node.parentNode.replaceChild(frag, node)
        })
      }
      wrapTextNodesInWords(el)
      const words = el.querySelectorAll('.__sr-word')
      if (!words.length) return

      if (reduced) {
        gsap.set(words, { opacity: 1 })
        return
      }

      gsap.set(words, { opacity: from })

      gsap.to(words, {
        opacity: 1,
        ease: 'none',
        stagger: { each: 0.05, from: 'start' },
        scrollTrigger: {
          trigger: el,
          start,
          end,
          scrub: 0.6,
          invalidateOnRefresh: true
        }
      })
    },
    [reduced, from, start, end],
    ref
  )

  return (
    <Tag ref={ref} className={cn(className)}>
      {children}
    </Tag>
  )
}

ScrubReveal.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node.isRequired,
  from: PropTypes.number,
  start: PropTypes.string,
  end: PropTypes.string,
  className: PropTypes.string
}

export default ScrubReveal
