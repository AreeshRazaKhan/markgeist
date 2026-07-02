import HudTag from '@/components/motion/hud-tag'
import CornerBrackets from '@/components/motion/corner-brackets'
import ArrowButton from '@/components/motion/arrow-button'
import Portrait from '@/components/motion/portrait'
import PageHeader from '@/components/nav/page-header'

// Phase 1: storefront SHELL only — dummy product tiles, no cart/checkout. Full Nine
// Line fulfillment integration lands in Phase 3. Swap NINE_LINE_URL + products later.
const NINE_LINE_URL = 'https://www.nineline.com/'

const PRODUCTS = [
  { id: 'tee-otr', name: 'On The Record Tee', price: 32, tag: 'Apparel' },
  { id: 'hoodie-annex', name: 'Annex Heavyweight Hoodie', price: 68, tag: 'Apparel' },
  { id: 'cap-reticle', name: 'Reticle Trucker Cap', price: 28, tag: 'Headwear' },
  { id: 'mug-watch', name: 'Early Watch Coffee Mug', price: 18, tag: 'Drinkware' },
  { id: 'patch-oz', name: 'Oz Cast Morale Patch', price: 12, tag: 'Kit' },
  { id: 'flag-swp', name: 'Shadow Warriors Flag', price: 40, tag: 'Kit' }
]

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
        lead="Gear runs through Nine Line Apparel: American-made, veteran-owned. No carts to babysit here; the link takes you straight to the line."
      />

      <section className="container-x pb-20">
        <div className="flex items-baseline justify-between border-b border-border pb-5">
          <HudTag color="accent">THE LINE</HudTag>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-mute">
            Fulfilled by Nine Line
          </span>
        </div>
        <ul className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p) => (
            <li key={p.id} className="group">
              <a
                href={NINE_LINE_URL}
                target="_blank"
                rel="noreferrer"
                className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ring-offset-2 ring-offset-bg"
              >
                <div className="relative overflow-hidden border border-border transition-colors group-hover:border-accent">
                  <Portrait alt={`${p.name} — product shot`} seed={`merch-${p.id}`} ratio="square" />
                  <span className="absolute left-3 top-3 border border-border bg-bg/70 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.22em] text-mute">
                    {p.tag}
                  </span>
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-3">
                  <h2 className="font-display text-xl uppercase tracking-display text-ink transition-colors group-hover:text-accent">
                    {p.name}
                  </h2>
                  <span className="shrink-0 font-mono text-sm text-accent">${p.price}</span>
                </div>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-mute">
                  Shop on Nine Line ↗
                </p>
              </a>
            </li>
          ))}
        </ul>
      </section>

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
              Veteran-owned, American-made apparel and gear. Shop the full line on Nine Line. Orders,
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
