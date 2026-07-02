// Canonical public origin for absolute links (QR codes, share URLs, metadata).
// Swap to the final domain at launch once DNS is live (SOW §0 dependency).
export const SITE_URL = 'https://theozcast.com'

// Episode end-card QR targets (SOW §4.10) — one to membership, one to register.
// Designed for ~10s on-screen display at the end of each episode.
export const END_CARD_QR = [
  {
    id: 'membership',
    label: 'Membership',
    caption: 'Scan for tiers + perks',
    href: `${SITE_URL}/membership`
  },
  {
    id: 'register',
    label: 'Register',
    caption: 'Reserve a founding seat',
    href: `${SITE_URL}/membership/checkout`
  }
]
