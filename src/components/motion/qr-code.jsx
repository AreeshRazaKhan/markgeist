import PropTypes from 'prop-types'

// QR rendered black-on-white for guaranteed scanning, then framed on-brand.
// Uses a stateless generator (no QR library dependency) served as a plain <img> so the
// Next image optimizer — which the QR API rejects server-side — is not in the path.
const qrSrc = (data, size) =>
  `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&margin=8&data=${encodeURIComponent(data)}`

/**
 * QrCode — square scannable code framed in the tactical card chrome.
 * `href` is the URL the code resolves to; `label` / `caption` are the HUD text around it.
 */
const QrCode = ({ href, label, caption, size = 220 }) => {
  return (
    <figure className="flex flex-col items-center gap-4 border border-border bg-bg p-6 text-center">
      <figcaption className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
        {'// '}
        {label}
      </figcaption>
      <div className="border border-accent">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={qrSrc(href, size)}
          alt={`QR code to ${label}: ${href}`}
          width={size}
          height={size}
          loading="lazy"
          className="block h-auto w-[180px]"
        />
      </div>
      <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-mute">{caption}</p>
    </figure>
  )
}

QrCode.propTypes = {
  href: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  size: PropTypes.number
}

export default QrCode
