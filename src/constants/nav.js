// `primary: true` links render in the lean desktop inline nav.
// Every link (regardless of `primary`) renders in the mobile sheet + footer.
export const NAV_LINKS = [
  { label: 'Episodes', href: '/episodes', primary: true },
  { label: 'Membership', href: '/membership', primary: true },
  { label: 'About Oz', href: '/about', primary: true },
  { label: 'Guests', href: '/guests', primary: true },
  { label: 'Blog', href: '/blog', primary: true },
  { label: 'Events', href: '/events', primary: false },
  { label: 'Merch', href: '/merch', primary: false },
  { label: 'Press', href: '/press', primary: true },
  { label: 'Contact', href: '/contact', primary: false },
  { label: 'Subscribe', href: '/subscribe', primary: false }
]

export const SUBSCRIBE_LINKS = [
  {
    label: 'Spotify',
    code: 'SPT',
    href: 'https://open.spotify.com/episode/4nuvtJt2TqDiJQqQIM84TR'
  },
  {
    label: 'Apple Podcasts',
    code: 'APL',
    href: 'https://podcasts.apple.com/ga/podcast/mark-geist-mortars-miracles-why-he-survived-benghazi/id1674015509?i=1000745708568'
  },
  {
    label: 'YouTube',
    code: 'YT',
    href: 'https://youtu.be/Q9i_es05rWc'
  },
  {
    label: 'RSS',
    code: 'RSS',
    href: '#'
  }
]

export const SOCIAL_LINKS = [
  { label: 'X', href: 'https://x.com/MarkGeistSWP' },
  { label: 'Instagram', href: 'https://www.instagram.com/markozgeist/' },
  { label: 'Facebook', href: 'https://www.facebook.com/markgeist13/' },
  { label: 'YouTube', href: 'https://youtu.be/Q9i_es05rWc' },
  { label: 'Apple', href: 'https://podcasts.apple.com/ga/podcast/mark-geist-mortars-miracles-why-he-survived-benghazi/id1674015509?i=1000745708568' },
  { label: 'Spotify', href: 'https://open.spotify.com/episode/4nuvtJt2TqDiJQqQIM84TR' }
]

export const MISSION_LINKS = [
  { label: 'Shadow Warriors Project', href: 'https://shadowwarriorsproject.org/about-mark-oz-geist/' },
  { label: '13 Hours — The Book', href: 'https://www.amazon.com/13-Hours-Inside-Account-Happened/dp/1455582298' },
  { label: 'Speaking & Booking', href: 'https://teamneverquit.com/speakers/mark-geist/' },
  { label: 'Markgeist.com', href: 'https://markgeist.com/' }
]
