'use client'

import PropTypes from 'prop-types'

import useLenis from '@/hooks/use-lenis'
import useReducedMotion from '@/hooks/use-reduced-motion'

const LenisProvider = ({ children }) => {
  const reduced = useReducedMotion()
  useLenis({ enabled: !reduced })
  return children
}

LenisProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default LenisProvider
