import PropTypes from 'prop-types'

import { cn } from '@/lib/utils'

const PostCard = ({ file, number, name, aspect = 'square' }) => {
  const src = `/social-posts/${file}`

  return (
    <a
      href={src}
      target="_blank"
      rel="noreferrer"
      className="group block border border-border bg-surface transition-colors hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
      aria-label={`Open ${name} full-size in a new tab`}
    >
      <span
        className={cn(
          'relative block w-full overflow-hidden bg-bg',
          aspect === 'story' ? 'aspect-[9/16]' : 'aspect-square'
        )}
      >
        <iframe
          src={src}
          loading="lazy"
          tabIndex={-1}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full border-0"
        />
      </span>
      <span className="flex items-baseline justify-between gap-4 border-t border-border px-4 py-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-mute">
          {number}
        </span>
        <span className="truncate font-mono text-[11px] uppercase tracking-[0.22em] text-ink transition-colors group-hover:text-accent">
          {name} <span aria-hidden="true">↗</span>
        </span>
      </span>
    </a>
  )
}

PostCard.propTypes = {
  file: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  aspect: PropTypes.oneOf(['square', 'story'])
}

export default PostCard
