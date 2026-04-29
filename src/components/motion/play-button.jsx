import PropTypes from 'prop-types'

import { cn } from '@/lib/utils'

const PlayButton = ({ as: Tag = 'button', size = 'md', label = 'PLAY', className = '', ...rest }) => {
  const sizes = {
    sm: 'h-10 w-10 [&_svg]:h-3 [&_svg]:w-3',
    md: 'h-14 w-14 [&_svg]:h-4 [&_svg]:w-4',
    lg: 'h-20 w-20 [&_svg]:h-6 [&_svg]:w-6'
  }
  return (
    <Tag
      aria-label={label}
      className={cn(
        'group relative inline-flex items-center justify-center bg-accent text-accent-foreground transition-colors duration-200 hover:bg-ember',
        sizes[size],
        className
      )}
      {...rest}
    >
      <svg viewBox="0 0 12 14" fill="currentColor" aria-hidden>
        <polygon points="0,0 12,7 0,14" />
      </svg>
    </Tag>
  )
}

PlayButton.propTypes = {
  as: PropTypes.elementType,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  label: PropTypes.string,
  className: PropTypes.string
}

export default PlayButton
