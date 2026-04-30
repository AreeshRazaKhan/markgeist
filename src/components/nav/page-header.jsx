import PropTypes from 'prop-types'

import HudTag from '@/components/motion/hud-tag'
import { cn } from '@/lib/utils'

const PageHeader = ({ eyebrow, title, accent, lead, className = '' }) => {
  return (
    <header className={cn('container-x section-y', className)}>
      <div className="mx-auto max-w-4xl text-center">
        {eyebrow && (
          <HudTag color="accent" className="inline-block">
            {eyebrow}
          </HudTag>
        )}
        <h1
          className="display-xl mt-6 text-balance text-ink"
          style={{
            fontSize: 'clamp(44px, 7vw, 116px)',
            lineHeight: 0.92,
            letterSpacing: '-0.02em'
          }}
        >
          {title}
          {accent && (
            <span className="block italic text-accent pb-[0.08em]">{accent}</span>
          )}
        </h1>
        {lead && <p className="mx-auto mt-8 max-w-2xl text-base text-mute">{lead}</p>}
      </div>
    </header>
  )
}

PageHeader.propTypes = {
  eyebrow: PropTypes.string,
  title: PropTypes.string.isRequired,
  accent: PropTypes.string,
  lead: PropTypes.node,
  className: PropTypes.string
}

export default PageHeader
