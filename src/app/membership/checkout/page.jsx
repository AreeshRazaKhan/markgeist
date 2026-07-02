import HudTag from '@/components/motion/hud-tag'
import PageHeader from '@/components/nav/page-header'
import EarlyBirdCheckout from '@/components/sections/early-bird-checkout'
import { MEMBERSHIP_TIERS } from '@/constants/membership'

export const metadata = {
  title: 'Early-Bird Checkout — The Oz Cast',
  description:
    'Reserve a founding-member seat on The Oz Cast before the full portal opens. Lock your founding rate at soft launch.'
}

const CheckoutPage = ({ searchParams }) => {
  const defaultTier = searchParams?.tier ?? ''

  return (
    <main className="relative">
      <PageHeader
        eyebrow="MEMBERSHIP · EARLY-BIRD"
        title="LOCK YOUR"
        accent="FOUNDING RATE."
        lead="First 100 members hold a founding rate before the Operator Circle portal opens. Reserve now; you're onboarded the moment it goes live."
      />

      <section className="container-x grid grid-cols-1 gap-10 pb-32 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <EarlyBirdCheckout tiers={MEMBERSHIP_TIERS} defaultTier={defaultTier} />
        </div>

        <aside className="lg:col-span-5">
          <div className="border border-border bg-surface p-6 lg:p-8">
            <HudTag color="accent">WHY EARLY-BIRD</HudTag>
            <ul className="mt-6 space-y-4 text-sm text-ink">
              <li className="flex gap-3">
                <span aria-hidden className="text-accent">·</span>
                <span>Founding rate held for life — no increase when the portal opens.</span>
              </li>
              <li className="flex gap-3">
                <span aria-hidden className="text-accent">·</span>
                <span>First onboarded into the Operator Circle at Phase 2 go-live.</span>
              </li>
              <li className="flex gap-3">
                <span aria-hidden className="text-accent">·</span>
                <span>Capped run — the founding seat closes at the member limit.</span>
              </li>
            </ul>
            <p className="mt-6 border-t border-border pt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-mute">
              Portal opens Phase 2 · Onboarding by email
            </p>
          </div>
        </aside>
      </section>
    </main>
  )
}

export default CheckoutPage
