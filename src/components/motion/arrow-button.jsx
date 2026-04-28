'use client'

import { forwardRef } from 'react'
import PropTypes from 'prop-types'

import { cn } from '@/lib/utils'

const ArrowButton = forwardRef(
  ({ as: Tag, variant, className, children, ...rest }, ref) => {
    const base =
      'group relative inline-flex items-center gap-3 px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]'
    const tones = {
      primary: 'bg-accent text-accent-foreground hover:bg-ink hover:text-bg',
      ghost: 'border border-border text-ink hover:border-accent hover:text-accent',
      hud: 'border border-border text-hud hover:border-hud'
    }
    return (
      <Tag ref={ref} className={cn(base, tones[variant], className)} {...rest}>
        <span>{children}</span>
        <span className="transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">
          →
        </span>
      </Tag>
    )
  }
)

ArrowButton.displayName = 'ArrowButton'

ArrowButton.propTypes = {
  as: PropTypes.elementType,
  variant: PropTypes.oneOf(['primary', 'ghost', 'hud']),
  className: PropTypes.string,
  children: PropTypes.node.isRequired
}

ArrowButton.defaultProps = {
  as: 'button',
  variant: 'primary',
  className: ''
}

export default ArrowButton
