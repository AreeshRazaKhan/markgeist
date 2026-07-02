// Blog / Breakdown content (SOW §4.6). `access` splits the public newsletter teaser
// from the gated member "Breakdown" debrief so premium analysis isn't given away free:
//   - 'public'  → fully readable; drives newsletter signups.
//   - 'member'  → gated; non-members see a teaser + upsell, not the full debrief.
export const DISPATCHES = [
  {
    id: 'vanishing-children',
    title: "America's Vanishing Children Demand Our Action",
    excerpt:
      '500,000 unaccompanied minors crossed since 2019. Nobody is counting where they ended up.',
    date: '2025-03-14',
    tag: 'BORDER',
    access: 'public',
    url: 'https://markgeist.com/'
  },
  {
    id: 'national-k9',
    title: 'National K9 Service Dogs Save Our Shadow Warriors',
    excerpt:
      'A trained dog is the difference between a contractor coming home and a contractor going further. The work happens at Shadow Warriors Project.',
    date: '2025-03-15',
    tag: 'VETS',
    access: 'public',
    url: 'https://shadowwarriorsproject.org/'
  },
  {
    id: 'hb-1163',
    title: "Washington's New Gun Law Punishes The Wrong People",
    excerpt: 'HB 1163 reads like a press release, not a law. The wrong people pay.',
    date: '2025-03-16',
    tag: 'POLICY',
    access: 'public',
    url: 'https://markgeist.com/'
  },
  {
    id: 'annex-timeline-breakdown',
    title: 'Breakdown: The Annex Timeline, Minute by Minute',
    excerpt:
      'The after-action Oz only gives members — the rooftop sequence walked through in full, with the calls that were made and the ones that never came.',
    date: '2026-01-21',
    tag: 'BREAKDOWN',
    access: 'member',
    url: ''
  },
  {
    id: 'srs-after-action',
    title: 'Breakdown: What the Long-Form Interview Left Out',
    excerpt:
      'The member debrief on the three-hour SRS conversation — the threads that got cut for time and what Oz would add on second thought.',
    date: '2026-01-28',
    tag: 'BREAKDOWN',
    access: 'member',
    url: ''
  }
]
