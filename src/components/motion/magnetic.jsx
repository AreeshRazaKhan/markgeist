'use client'

import { useRef } from 'react'
import PropTypes from 'prop-types'

import useMagnetic from '@/hooks/use-magnetic'
import { cn } from '@/lib/utils'

const Magnetic = ({ as: Tag, strength, radius, className, children, ...rest }) => {
  const ref = useRef(null)
  useMagnetic(ref, { strength, radius })

  return (
    <Tag ref={ref} className={cn('inline-block will-change-transform', className)} {...rest}>
      {children}
    </Tag>
  )
}

Magnetic.propTypes = {
  as: PropTypes.elementType,
  strength: PropTypes.number,
  radius: PropTypes.number,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
}

Magnetic.defaultProps = {
  as: 'span',
  strength: 0.3,
  radius: 140,
  className: ''
}

export default Magnetic
