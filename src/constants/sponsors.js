// Per-episode sponsors. Phase 1 = static dummy data (swap for real sponsors later).
// Tiers are data labels only — the site keeps its single-accent rule, so gold/silver/
// bronze are rendered by mono label + weight, NOT by literal metallic colors.
// `tier` drives display order and emphasis: gold (lead) → silver → bronze.
export const SPONSOR_TIERS = ['gold', 'silver', 'bronze']

// Sponsor directory. `track` is the show's tracked affiliate path / discount code
// (the "/OZ"-style link) so fans get the offer and the show earns the kickback.
export const SPONSORS = {
  'black-rifle': {
    id: 'black-rifle',
    name: 'Black Rifle Coffee',
    blurb: 'Veteran-founded coffee company. Fuel for the early watch.',
    tier: 'gold',
    code: 'OZ',
    url: 'https://example.com/blackrifle/OZ'
  },
  'nine-line': {
    id: 'nine-line',
    name: 'Nine Line Apparel',
    blurb: 'American-made, veteran-owned apparel and gear.',
    tier: 'gold',
    code: 'OZ15',
    url: 'https://example.com/nineline/OZ15'
  },
  'gruntstyle': {
    id: 'gruntstyle',
    name: 'Grunt Style',
    blurb: 'Pride in the country you love. Built for those who serve.',
    tier: 'silver',
    code: 'OZCAST',
    url: 'https://example.com/gruntstyle/OZCAST'
  },
  'onnit': {
    id: 'onnit',
    name: 'Onnit',
    blurb: 'Total human optimization — supplements and fitness gear.',
    tier: 'silver',
    code: 'OZ10',
    url: 'https://example.com/onnit/OZ10'
  },
  'ka-bar': {
    id: 'ka-bar',
    name: 'KA-BAR Knives',
    blurb: 'The fighting knife that earned its name. Made in the USA.',
    tier: 'bronze',
    code: 'OZKNIFE',
    url: 'https://example.com/kabar/OZKNIFE'
  },
  'sig-sauer': {
    id: 'sig-sauer',
    name: 'SIG SAUER Academy',
    blurb: 'Firearms training from the people who build the sidearm.',
    tier: 'bronze',
    code: 'OZTRAIN',
    url: 'https://example.com/sigacademy/OZTRAIN'
  }
}

// Which sponsors run on which episode (by episode id). Supports single-episode
// sponsors and package deals — assignment is data, editable without a rebuild.
export const EPISODE_SPONSORS = {
  'mtnpod-151': ['black-rifle', 'gruntstyle', 'ka-bar'],
  'srs-74': ['nine-line', 'onnit', 'sig-sauer'],
  'srs-clips-anomaly': ['black-rifle', 'ka-bar'],
  'mizrahi-5': ['nine-line', 'onnit'],
  'usafa-ncls18': ['gruntstyle', 'sig-sauer'],
  'segovia-13h': ['black-rifle', 'nine-line', 'onnit']
}

const TIER_RANK = { gold: 0, silver: 1, bronze: 2 }

/**
 * Returns the resolved, tier-sorted sponsor objects for a given episode id.
 * @param {string} episodeId
 * @returns {Array<object>} sponsors ordered gold → silver → bronze
 */
export const getEpisodeSponsors = (episodeId) =>
  (EPISODE_SPONSORS[episodeId] ?? [])
    .map((id) => SPONSORS[id])
    .filter(Boolean)
    .sort((a, b) => TIER_RANK[a.tier] - TIER_RANK[b.tier])
