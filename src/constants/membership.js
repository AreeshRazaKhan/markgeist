// The Oz Cast membership — three tiers. The podcast stays publicly accessible;
// membership adds value, it is not a paywall. Tier numbering follows the brief
// (Tier 3 = entry, Tier 1 = Operator Circle), presented entry → flagship.
export const MEMBERSHIP_TIERS = [
  {
    id: 'tier-3',
    tier: 'TIER 3',
    name: 'Supporting',
    price: 25,
    cadence: '/mo',
    summary: 'Early access, ad-free, and the bonus cuts.',
    benefits: [
      'Early episode access',
      'Ad-free listening',
      'Bonus clips',
      'Member-only content'
    ],
    featured: false
  },
  {
    id: 'tier-2',
    tier: 'TIER 2',
    name: 'Inner Circle',
    price: 50,
    cadence: '/mo',
    summary: 'Everything in Tier 3, plus the after-action room.',
    benefits: [
      'Everything in Tier 3',
      'Exclusive after-action breakdowns',
      'Monthly Q&A sessions',
      'Private community access'
    ],
    featured: false
  },
  {
    id: 'tier-1',
    tier: 'TIER 1',
    name: 'Operator Circle',
    price: 100,
    cadence: '/mo',
    summary: 'Everything in Tier 2, plus behind-the-scenes and live-event priority.',
    benefits: [
      'Everything in Tier 2',
      'Behind-the-scenes content',
      'Exclusive insights',
      'Training discounts',
      'Priority access to live events',
      'Premium member experiences'
    ],
    featured: true
  }
]

// Examples of what member-only content may include — used as supporting copy.
export const MEMBER_CONTENT = [
  'Behind-the-scenes footage',
  'Guest conversations before recordings',
  'Range footage',
  'Training clips',
  'Bonus segments',
  'Member-only Q&A sessions'
]
