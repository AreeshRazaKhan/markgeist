import PropTypes from 'prop-types'

import { cn } from '@/lib/utils'

const CornerBrackets = ({ className, color }) => {
  const stroke = color === 'accent' ? 'border-accent' : 'border-ink/70'
  return (
    <span aria-hidden className={cn('pointer-events-none absolute inset-0', className)}>
      <span className={cn('absolute left-0 top-0 h-3 w-3 border-l border-t', stroke)} />
      <span className={cn('absolute right-0 top-0 h-3 w-3 border-r border-t', stroke)} />
      <span className={cn('absolute bottom-0 left-0 h-3 w-3 border-b border-l', stroke)} />
      <span className={cn('absolute bottom-0 right-0 h-3 w-3 border-b border-r', stroke)} />
    </span>
  )
}

CornerBrackets.propTypes = {
  className: PropTypes.string,
  color: PropTypes.oneOf(['ink', 'accent'])
}

CornerBrackets.defaultProps = {
  className: '',
  color: 'ink'
}

export default CornerBrackets
