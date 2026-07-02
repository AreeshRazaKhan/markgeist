import PropTypes from 'prop-types'
import Image from 'next/image'

// QR is rendered dark-on-bone for reliable scanning, then framed on-brand.
// Uses a stateless generator so no QR library dependency is added.
const qrSrc = (data, size) =>
  `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&margin=0&qzone=2` +
  `&color=0A0A0A&bgcolor=F5F1E8&data=${encodeURIComponent(data)}`

/**
 * QrCode — square scannable code framed in the tactical card chrome.
 * `href` is the URL the code resolves to; `label` / `caption` are the HUD text around it.
 */
const QrCode = ({ href, label, caption, size = 200 }) => {
  return (
    <figure className="flex flex-col items-center gap-4 border border-border bg-bg p-6 text-center">
      <figcaption className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
        {'// '}
        {label}
      </figcaption>
      <div className="border border-accent bg-ink p-2">
        <Image
          src={qrSrc(href, size)}
          alt={`QR code to ${label}: ${href}`}
          width={size}
          height={size}
          className="h-auto w-full max-w-[200px]"
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
