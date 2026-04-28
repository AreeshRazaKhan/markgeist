'use client'

import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { Renderer, Program, Mesh, Triangle, Texture } from 'ogl'

import useReducedMotion from '@/hooks/use-reduced-motion'
import { cn } from '@/lib/utils'

const VERT = /* glsl */ `
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`

const FRAG = /* glsl */ `
  precision highp float;
  uniform sampler2D uTex;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uRes;
  varying vec2 vUv;

  // hash + simplex-ish noise
  float hash(vec2 p){return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);}
  float noise(vec2 p){
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  void main(){
    vec2 uv = vUv;
    vec2 m = uMouse;
    float dist = distance(uv, m);
    float ripple = smoothstep(0.35, 0.0, dist);

    float n = noise(uv * 6.0 + uTime * 0.18);
    vec2 disp = vec2(n - 0.5) * 0.018;
    disp += (uv - m) * ripple * 0.06;

    // chromatic shift sampling
    float r = texture2D(uTex, uv + disp * 1.2).r;
    float g = texture2D(uTex, uv + disp * 0.6).g;
    float b = texture2D(uTex, uv + disp * 0.0).b;
    float a = texture2D(uTex, uv + disp).a;

    vec3 col = vec3(r, g, b);

    // subtle scan line
    float scan = sin(uv.y * uRes.y * 1.5 + uTime * 1.2) * 0.04;
    col += scan;

    gl_FragColor = vec4(col, a);
  }
`

const LogoDisplacement = ({ src, className }) => {
  const wrapRef = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap || reduced) return undefined

    let renderer
    let raf
    let mounted = true
    const mouse = { x: 0.5, y: 0.5 }
    const target = { x: 0.5, y: 0.5 }

    const init = async () => {
      try {
        renderer = new Renderer({ alpha: true, dpr: Math.min(window.devicePixelRatio, 2) })
        const gl = renderer.gl
        gl.clearColor(0, 0, 0, 0)
        wrap.appendChild(gl.canvas)
        gl.canvas.style.width = '100%'
        gl.canvas.style.height = '100%'
        gl.canvas.style.display = 'block'

        const tex = new Texture(gl, { generateMipmaps: false, magFilter: gl.LINEAR, minFilter: gl.LINEAR })
        const img = new window.Image()
        img.crossOrigin = 'anonymous'
        await new Promise((res, rej) => {
          img.onload = res
          img.onerror = rej
          img.src = src
        })
        if (!mounted) return
        tex.image = img

        const geo = new Triangle(gl)
        const program = new Program(gl, {
          vertex: VERT,
          fragment: FRAG,
          uniforms: {
            uTex: { value: tex },
            uTime: { value: 0 },
            uMouse: { value: [0.5, 0.5] },
            uRes: { value: [1, 1] }
          },
          transparent: true
        })
        const mesh = new Mesh(gl, { geometry: geo, program })

        const onResize = () => {
          const r = wrap.getBoundingClientRect()
          renderer.setSize(r.width, r.height)
          program.uniforms.uRes.value = [r.width, r.height]
        }
        onResize()
        window.addEventListener('resize', onResize)

        const onMove = (e) => {
          const r = wrap.getBoundingClientRect()
          target.x = (e.clientX - r.left) / r.width
          target.y = 1 - (e.clientY - r.top) / r.height
        }
        window.addEventListener('mousemove', onMove)

        const start = performance.now()
        const tick = () => {
          if (!mounted) return
          const t = (performance.now() - start) / 1000
          mouse.x += (target.x - mouse.x) * 0.08
          mouse.y += (target.y - mouse.y) * 0.08
          program.uniforms.uTime.value = t
          program.uniforms.uMouse.value = [mouse.x, mouse.y]
          renderer.render({ scene: mesh })
          raf = requestAnimationFrame(tick)
        }
        tick()

        return () => {
          window.removeEventListener('resize', onResize)
          window.removeEventListener('mousemove', onMove)
        }
      } catch (err) {
        console.error('[LogoDisplacement]:', err)
      }
      return undefined
    }

    let cleanup
    init().then((c) => {
      cleanup = c
    })

    return () => {
      mounted = false
      if (raf) cancelAnimationFrame(raf)
      if (typeof cleanup === 'function') cleanup()
      if (renderer?.gl?.canvas?.parentNode === wrap) {
        wrap.removeChild(renderer.gl.canvas)
      }
    }
  }, [src, reduced])

  if (reduced) {
    return (
      <div className={cn('relative', className)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" className="h-full w-full object-contain" />
      </div>
    )
  }

  return <div ref={wrapRef} className={cn('relative', className)} />
}

LogoDisplacement.propTypes = {
  src: PropTypes.string.isRequired,
  className: PropTypes.string
}

LogoDisplacement.defaultProps = {
  className: ''
}

export default LogoDisplacement
