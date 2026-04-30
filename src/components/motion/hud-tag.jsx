import PropTypes from 'prop-types'

import { cn } from '@/lib/utils'

const HudTag = ({ children, color = 'mute', className = '' }) => {
  const tone =
    color === 'live'
      ? 'text-live'
      : color === 'accent'
      ? 'text-accent'
      : color === 'ink'
      ? 'text-ink'
      : 'text-mute'
  return (
    <span className={cn('font-mono text-[10px] uppercase tracking-[0.2em]', tone, className)}>
      {children}
    </span>
  )
}

HudTag.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(['mute', 'live', 'accent', 'ink']),
  className: PropTypes.string
}

HudTag.displayName = 'HudTag'

export default HudTag
