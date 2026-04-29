'use client'

import PropTypes from 'prop-types'
import Image from 'next/image'

import { cn } from '@/lib/utils'

const placeholderUrl = (seed) =>
  `https://picsum.photos/seed/${encodeURIComponent(seed)}/800/1000`

/**
 * Portrait — square / portrait aspect-controlled image surface for podcast cover art / host portraits.
 * - When `src` is provided, renders a next/image with grain + duotone overlay.
 * - When no `src`, renders a deterministic Picsum placeholder image (seeded by `seed` or `alt`).
 */
const Portrait = ({ src, alt, seed, ratio = 'square', fill = false, className = '' }) => {
  const aspect = fill
    ? 'h-full w-full'
    : ratio === 'square'
    ? 'aspect-square'
    : ratio === 'portrait'
    ? 'aspect-[4/5]'
    : 'aspect-[3/4]'

  const url = src || placeholderUrl(seed || alt || 'oz')

  if (src) {
    return (
      <div className={cn('relative overflow-hidden bg-surface', aspect, className)}>
        <Image
          src={url}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover grayscale-[0.15] contrast-[1.05]"
          priority
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-tr from-accent/15 via-transparent to-bg/30 mix-blend-multiply" />
        <div aria-hidden className="absolute inset-0 grain pointer-events-none" />
      </div>
    )
  }

  return (
    <div className={cn('relative overflow-hidden border border-border bg-surface', aspect, className)}>
      {/* Placeholder image (Picsum) — swap to a real <Image> when assets land */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={url}
        alt={alt}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover grayscale-[0.25] contrast-[1.05]"
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-tr from-accent/20 via-bg/10 to-bg/60 mix-blend-multiply" />
      <div aria-hidden className="absolute inset-0 grain pointer-events-none" />
    </div>
  )
}

Portrait.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string.isRequired,
  seed: PropTypes.string,
  ratio: PropTypes.oneOf(['square', 'portrait', 'wide-portrait']),
  fill: PropTypes.bool,
  className: PropTypes.string
}

export default Portrait
