'use client'

import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import useReducedMotion from '@/hooks/use-reduced-motion'
import { cn } from '@/lib/utils'

const PARTICLE_COUNT = 1200

const ParticleField = ({ points = [], className = '' }) => {
  const canvasRef = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const ctx = canvas.getContext('2d')
    if (!ctx) return undefined

    let raf
    let visible = true
    let width = 0
    let height = 0

    const stars = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 0.9 + 0.2,
      speed: Math.random() * 0.0004 + 0.00008,
      tw: Math.random() * Math.PI * 2
    }))

    const projected = (points ?? []).map((p) => ({
      ...p,
      px: (p.lng + 180) / 360,
      py: 1 - (p.lat + 90) / 180,
      pulse: Math.random() * Math.PI * 2
    }))

    const setSize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2)
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    setSize()
    window.addEventListener('resize', setSize)

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
      },
      { threshold: 0.05 }
    )
    observer.observe(canvas)

    const tick = (t) => {
      if (!visible) {
        raf = requestAnimationFrame(tick)
        return
      }
      ctx.clearRect(0, 0, width, height)

      ctx.fillStyle = 'rgba(245, 245, 244, 0.35)'
      stars.forEach((s) => {
        s.tw += 0.02
        const flicker = 0.5 + Math.sin(s.tw) * 0.3
        ctx.globalAlpha = flicker * 0.5
        ctx.beginPath()
        ctx.arc(s.x * width, s.y * height, s.r, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.globalAlpha = 1

      projected.forEach((p) => {
        p.pulse += 0.04
        const x = p.px * width
        const y = p.py * height
        const pulse = 1 + Math.sin(p.pulse) * 0.4
        ctx.strokeStyle = 'hsla(22, 94%, 53%, 0.85)'
        ctx.fillStyle = 'hsla(22, 94%, 53%, 0.18)'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.arc(x, y, 6 * pulse, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()
        ctx.fillStyle = 'hsl(22, 94%, 53%)'
        ctx.beginPath()
        ctx.arc(x, y, 1.6, 0, Math.PI * 2)
        ctx.fill()
      })

      // graticule
      ctx.strokeStyle = 'rgba(245, 245, 244, 0.04)'
      ctx.lineWidth = 1
      const gx = 12
      const gy = 6
      for (let i = 0; i <= gx; i += 1) {
        ctx.beginPath()
        ctx.moveTo((i / gx) * width, 0)
        ctx.lineTo((i / gx) * width, height)
        ctx.stroke()
      }
      for (let i = 0; i <= gy; i += 1) {
        ctx.beginPath()
        ctx.moveTo(0, (i / gy) * height)
        ctx.lineTo(width, (i / gy) * height)
        ctx.stroke()
      }

      raf = requestAnimationFrame(tick)
    }

    if (!reduced) {
      raf = requestAnimationFrame(tick)
    } else {
      tick(0)
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', setSize)
      observer.disconnect()
    }
  }, [points, reduced])

  return <canvas ref={canvasRef} className={cn('h-full w-full', className)} />
}

ParticleField.propTypes = {
  points: PropTypes.arrayOf(
    PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired
    })
  ),
  className: PropTypes.string
}

export default ParticleField
