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
 * LineReveal — wraps each rendered text line in a clipped mask + GSAP-animates each
 * line up from below on scroll-enter (cinematic per-line reveal). Re-runs on resize
 * so re-flowed lines stay correctly grouped.
 *
 * Use on paragraphs / multi-line copy. For single headings use SplitReveal (word-level).
 */
const LineReveal = ({
  as: Tag = 'p',
  children,
  delay = 0,
  stagger = 0.08,
  duration = 1,
  start = 'top 85%',
  className = ''
}) => {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  useGsapContext(
    () => {
      const el = ref.current
      if (!el) return

      // Capture original HTML on first run so we can re-build on resize without losing content
      if (!el.dataset.originalHtml) {
        el.dataset.originalHtml = el.innerHTML
      }

      const buildLines = () => {
        // Restore original markup, then split text nodes into per-word inline spans
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
                w.className = '__lr-word'
                w.style.display = 'inline-block'
                w.textContent = p
                frag.appendChild(w)
              }
            })
            node.parentNode.replaceChild(frag, node)
          })
        }
        wrapTextNodesInWords(el)

        // Group word-spans by their offsetTop to determine "lines"
        const wordSpans = Array.from(el.querySelectorAll('.__lr-word'))
        if (!wordSpans.length) return []

        const lines = []
        let currentTop = null
        let currentGroup = []
        wordSpans.forEach((w) => {
          const top = w.offsetTop
          if (currentTop === null || Math.abs(top - currentTop) > 2) {
            if (currentGroup.length) lines.push(currentGroup)
            currentGroup = [w]
            currentTop = top
          } else {
            currentGroup.push(w)
          }
        })
        if (currentGroup.length) lines.push(currentGroup)

        // Wrap each line in an outer mask + inner translate container
        const lineWrappers = lines.map((group) => {
          const outer = document.createElement('span')
          outer.className = '__lr-line'
          outer.style.display = 'block'
          outer.style.clipPath = 'inset(-0.2em -0.2em 0 -0.2em)'
          outer.style.webkitClipPath = 'inset(-0.2em -0.2em 0 -0.2em)'
          outer.style.lineHeight = 'inherit'

          const inner = document.createElement('span')
          inner.className = '__lr-line-inner'
          inner.style.display = 'block'
          inner.style.willChange = 'transform, opacity'

          // Move group nodes (and any whitespace text between them) into the inner
          const first = group[0]
          const last = group[group.length - 1]
          const range = document.createRange()
          range.setStartBefore(first)
          range.setEndAfter(last)
          const frag = range.extractContents()
          inner.appendChild(frag)
          outer.appendChild(inner)
          // Insert outer in place of where the group used to live
          // (the parent had the words inline; after extract, the gap is at the range start)
          range.insertNode(outer)

          return inner
        })

        return lineWrappers
      }

      let inners = buildLines()

      if (reduced) {
        gsap.set(inners, { yPercent: 0, autoAlpha: 1 })
        return
      }

      const tween = gsap.fromTo(
        inners,
        { yPercent: 110, autoAlpha: 0 },
        {
          yPercent: 0,
          autoAlpha: 1,
          duration,
          delay,
          stagger,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: 'play none none reverse'
          }
        }
      )
      const trigger = tween.scrollTrigger

      // Rebuild on resize (lines re-flow at different widths)
      let resizeRaf
      const onResize = () => {
        if (resizeRaf) cancelAnimationFrame(resizeRaf)
        resizeRaf = requestAnimationFrame(() => {
          trigger.kill()
          inners = buildLines()
          gsap.set(inners, { yPercent: 0, autoAlpha: 1 })
        })
      }
      window.addEventListener('resize', onResize)

      return () => {
        window.removeEventListener('resize', onResize)
        if (resizeRaf) cancelAnimationFrame(resizeRaf)
      }
    },
    [reduced, delay, stagger, duration, start],
    ref
  )

  return (
    <Tag ref={ref} className={cn(className)}>
      {children}
    </Tag>
  )
}

LineReveal.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node.isRequired,
  delay: PropTypes.number,
  stagger: PropTypes.number,
  duration: PropTypes.number,
  start: PropTypes.string,
  className: PropTypes.string
}

export default LineReveal
