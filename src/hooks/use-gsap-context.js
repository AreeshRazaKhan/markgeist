'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/**
 * Run a GSAP setup function inside a scoped context that auto-cleans on unmount.
 * @param {(ctx: gsap.Context) => void} fn
 * @param {Array} deps
 * @param {React.RefObject<HTMLElement>=} scopeRef
 */
const useGsapContext = (fn, deps = [], scopeRef) => {
  const ctxRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(fn, scopeRef?.current ?? undefined)
    ctxRef.current = ctx
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return ctxRef
}

export default useGsapContext
