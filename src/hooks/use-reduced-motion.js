'use client'

import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

const useReducedMotion = () => {
  const [prefers, setPrefers] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(QUERY)
    setPrefers(mq.matches)
    const handler = (e) => setPrefers(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return prefers
}

export default useReducedMotion
