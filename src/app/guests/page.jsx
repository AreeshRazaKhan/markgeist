import { redirect } from 'next/navigation'

// The separate Guests page is retired (SOW §4.3 — guest detail now lives inside each
// episode). "Guests" as a public destination is superseded by Featured Appearances.
const GuestsPage = () => {
  redirect('/appearances')
}

export default GuestsPage
