import PropTypes from 'prop-types'

import { cn } from '@/lib/utils'

const HudTag = ({ children, color, className }) => {
  const tone =
    color === 'live' ? 'text-live' : color === 'accent' ? 'text-accent' : color === 'hud' ? 'text-hud' : 'text-mute'
  return (
    <span className={cn('font-mono text-[10px] uppercase tracking-[0.2em]', tone, className)}>
      {`// ${children}`}
    </span>
  )
}

HudTag.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(['mute', 'live', 'accent', 'hud']),
  className: PropTypes.string
}

HudTag.defaultProps = {
  color: 'mute',
  className: ''
}

export default HudTag
