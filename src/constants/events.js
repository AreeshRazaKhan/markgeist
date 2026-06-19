// Events — speaking, live, and training. Specific dates are supplied by the
// client and announced to members + newsletter first; until then each track
// runs an honest empty-state with a booking / notify path.
export const EVENT_TRACKS = [
  {
    id: 'speaking',
    label: 'SPEAKING',
    title: 'Keynotes & Speaking',
    blurb:
      'Service, recovery, leadership, and post-traumatic resilience, on the record, no PR layer. Booked through Team Never Quit.',
    cta: { label: 'Booking · Team Never Quit', href: 'https://teamneverquit.com/speakers/mark-geist/', external: true }
  },
  {
    id: 'live',
    label: 'LIVE',
    title: 'Live Events',
    blurb:
      'Live recordings, screenings, and meet-ups. Operator Circle members get priority access and member-only dates.',
    cta: { label: 'Get notified first', href: '/subscribe', external: false }
  },
  {
    id: 'training',
    label: 'TRAINING',
    title: 'Training',
    blurb:
      'In-person shooting and protective-detail training is on the roadmap. Members receive training discounts when courses open.',
    cta: { label: 'See membership', href: '/membership', external: false }
  }
]
