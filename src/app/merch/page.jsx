import HudTag from '@/components/motion/hud-tag'
import CornerBrackets from '@/components/motion/corner-brackets'
import ArrowButton from '@/components/motion/arrow-button'
import PageHeader from '@/components/nav/page-header'

// Phase 1: referral only — no inventory, fulfillment, or ecommerce on this site.
// Swap NINE_LINE_URL for the client's specific Nine Line landing page when supplied.
const NINE_LINE_URL = 'https://www.nineline.com/'

export const metadata = {
  title: 'Merch — The Oz Cast',
  description:
    'Gear from The Oz Cast, fulfilled by Nine Line Apparel. American-made, veteran-owned.'
}

const MerchPage = () => {
  return (
    <main className="relative">
      <PageHeader
        eyebrow="MERCH"
        title="WEAR THE"
        accent="STANDARD."
        lead="Gear runs through Nine Line Apparel — American-made, veteran-owned. No carts to babysit here; the link takes you straight to the line."
      />

      <section className="container-x pb-24">
        <a
          href={NINE_LINE_URL}
          target="_blank"
          rel="noreferrer"
          className="group relative block border border-border bg-surface p-10 transition-colors duration-300 hover:border-accent lg:p-16"
        >
          <CornerBrackets color="accent" />
          <div className="flex flex-col items-center gap-8 text-center">
            <HudTag color="accent">FULFILLED BY</HudTag>
            <p className="font-display text-[clamp(48px,9vw,120px)] uppercase leading-[0.9] tracking-display text-ink transition-colors group-hover:text-accent">
              NINE LINE
              <span className="block italic text-accent pb-[0.06em]">APPAREL.</span>
            </p>
            <p className="max-w-md text-sm text-mute">
              Veteran-owned, American-made apparel and gear. Shop the full line on Nine Line — orders,
              shipping, and returns are handled there.
            </p>
            <ArrowButton as="span" variant="primary">
              Shop Nine Line ↗
            </ArrowButton>
          </div>
        </a>

        <p className="mx-auto mt-10 max-w-xl text-center font-mono text-[10px] uppercase tracking-[0.22em] text-mute">
          Dedicated Oz Cast gear is on the roadmap. For now, the link runs to Nine Line.
        </p>
      </section>
    </main>
  )
}

export default MerchPage
