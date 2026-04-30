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
 * ZoomThrough — sticky-overlay curtain rip + sequential horizontal slider.
 *
 * Architecture (key change from prior versions):
 *   - The rip is a `position: sticky` overlay with NO background, no pin.
 *     The two heading halves animate to anchor at the viewport's top and
 *     bottom edges and stay there for as long as the wrapped section is
 *     in view (sticky behavior keeps them locked to viewport edges).
 *   - The wrapped section sits BELOW the sticky overlay in document flow
 *     and rises into the viewport as the user scrolls. Its own ScrollTrigger
 *     pin engages naturally when its top reaches viewport top — which is
 *     exactly when the rip animation completes (end at `+=100vh`).
 *   - No static preview, no pin conflicts. The user sees: halves separating,
 *     halves anchored at top/bottom, the wrapped section scrolling up into
 *     the middle gap, slider engaging — one continuous experience.
 *
 * Bidirectional via scrub. prefers-reduced-motion = static end-state.
 */
const ZoomThrough = ({
  prefix,
  accent,
  scrollLength = '100%',
  size = 'clamp(56px, 11vw, 200px)',
  textClass = 'text-ink',
  accentClass = 'text-accent italic',
  children,
  ...rest
}) => {
  const ref = useRef(null)
  const ripRef = useRef(null)
  const bgRef = useRef(null)
  const topRef = useRef(null)
  const bottomRef = useRef(null)
  const ruleRef = useRef(null)
  const dotLeftRef = useRef(null)
  const dotRightRef = useRef(null)
  const reduced = useReducedMotion()

  useGsapContext(
    () => {
      if (reduced) return
      const root = ref.current
      const bg = bgRef.current
      const top = topRef.current
      const bottom = bottomRef.current
      const rule = ruleRef.current
      const dotL = dotLeftRef.current
      const dotR = dotRightRef.current
      if (!root || !top || !bottom || !rule) return

      // Initial — both halves merged at viewport center, looking like one heading.
      gsap.set(top, { y: '50vh', yPercent: -50, scale: 1 })
      gsap.set(bottom, { y: '-50vh', yPercent: 50, scale: 1 })
      gsap.set(rule, { scaleX: 0, transformOrigin: 'center center' })
      gsap.set([dotL, dotR], { autoAlpha: 0 })
      if (bg) gsap.set(bg, { opacity: 1 })

      // Phase 1 — the rip itself. Halves separate from center to top/bottom
      // edges over the first `scrollLength` of scroll. Halves stay full-color
      // (bone + accent orange) throughout this phase.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: `+=${scrollLength}`,
          scrub: 0.6,
          invalidateOnRefresh: true
        }
      })

      tl.to([top, bottom], { scale: 1.18, ease: 'power2.in', duration: 0.3 }, 0)
      tl.to(top, { y: 0, yPercent: 0, ease: 'power3.inOut', duration: 0.7 }, 0.25)
      tl.to(bottom, { y: 0, yPercent: 0, ease: 'power3.inOut', duration: 0.7 }, 0.25)
      tl.to(rule, { scaleX: 1, ease: 'expo.out', duration: 0.5 }, 0.4)
      tl.to([dotL, dotR], { autoAlpha: 1, ease: 'power1.out', duration: 0.12 }, 0.62)

      // Orange centerline (rule + dots) disappears BEFORE the slider becomes
      // visible, so it never sits on top of the slider's content.
      tl.to([rule, dotL, dotR], { autoAlpha: 0, ease: 'power2.out', duration: 0.15 }, 0.78)

      // Solid bg holds opaque while the wrapped section is rising into view
      // from below — hides it during the climb. Snaps to transparent in the
      // last beat of the rip so the slider is revealed exactly as the halves
      // settle at top/bottom and TheField's pin engages at viewport top.
      if (bg) {
        tl.to(bg, { opacity: 0, ease: 'none', duration: 0.08 }, 0.92)
      }

      // Phase 2 — AFTER the halves settle at top/bottom edges, smoothly fade
      // them to a desaturated low-opacity watermark so they recede into the
      // background while the slider is the focus.
      const baseLen = parseFloat(scrollLength)
      const fadeTl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: `top top-=${baseLen}%`,
          end: `top top-=${baseLen + 50}%`,
          scrub: 0.6,
          invalidateOnRefresh: true
        }
      })
      fadeTl.fromTo(
        [top, bottom],
        { opacity: 1, filter: 'saturate(1) brightness(1)' },
        {
          opacity: 0.32,
          filter: 'saturate(0.18) brightness(0.85)',
          ease: 'power2.out',
          duration: 1
        },
        0
      )
    },
    [reduced, scrollLength],
    ref
  )

  const headingNode = (
    <h2
      className={cn(
        'display-xl whitespace-nowrap text-center will-change-transform',
        textClass
      )}
      style={{
        fontSize: size,
        lineHeight: 0.86,
        letterSpacing: '-0.03em',
        textShadow: '0 0 24px hsl(var(--bg) / 0.85)'
      }}
    >
      {prefix}
      {accent && <span className={cn('pb-[0.08em]', accentClass)}>{accent}</span>}
    </h2>
  )

  return (
    <section ref={ref} className="relative">
      {/* Sticky rip overlay — NO background. Stays locked to viewport while
          the section is in view. Halves animate to top/bottom edges and stay. */}
      <div
        ref={ripRef}
        aria-hidden="true"
        className="pointer-events-none sticky top-0 z-[35] h-screen w-full overflow-hidden"
      >
        {/* Solid bg cover — hides the wrapped section while it rises into
            view; fades out at the very end of the rip animation. */}
        <div ref={bgRef} className="absolute inset-0 z-0 bg-bg" />

        {/* Centerline reticle rule + accent dots */}
        <div className="absolute inset-x-0 top-1/2 z-[1] flex -translate-y-1/2 items-center justify-center">
          <span
            ref={dotLeftRef}
            className="block h-1 w-1 bg-accent"
            style={{ marginRight: 'clamp(8px, 1.2vw, 16px)' }}
          />
          <div
            ref={ruleRef}
            className="h-px w-[min(72vw,1100px)] bg-accent"
            style={{ boxShadow: '0 0 16px hsl(var(--accent) / 0.6)' }}
          />
          <span
            ref={dotRightRef}
            className="block h-1 w-1 bg-accent"
            style={{ marginLeft: 'clamp(8px, 1.2vw, 16px)' }}
          />
        </div>

        {/* Top half — anchored to viewport TOP edge */}
        <div
          ref={topRef}
          className="absolute left-0 right-0 top-0 z-[2] flex justify-center will-change-transform"
          style={{ clipPath: 'inset(0 0 50% 0)', transformOrigin: 'center center' }}
        >
          {headingNode}
        </div>

        {/* Bottom half — anchored to viewport BOTTOM edge */}
        <div
          ref={bottomRef}
          className="absolute bottom-0 left-0 right-0 z-[2] flex justify-center will-change-transform"
          style={{ clipPath: 'inset(50% 0 0 0)', transformOrigin: 'center center' }}
        >
          {headingNode}
        </div>

      </div>

      {/* Wrapped section — sits below the sticky ripRef in flow. Its top
          reaches viewport top (and its own pin engages) at the same scroll
          position where the rip's animation completes. */}
      {children}
    </section>
  )
}

ZoomThrough.propTypes = {
  prefix: PropTypes.node.isRequired,
  accent: PropTypes.node,
  scrollLength: PropTypes.string,
  size: PropTypes.string,
  textClass: PropTypes.string,
  accentClass: PropTypes.string,
  children: PropTypes.node
}

export default ZoomThrough
