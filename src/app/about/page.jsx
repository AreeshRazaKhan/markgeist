import HudTag from '@/components/motion/hud-tag'
import PageHeader from '@/components/nav/page-header'

export const metadata = {
  title: 'About Oz — Mark "Oz" Geist',
  description:
    'Marine. Annex Security Team in Benghazi. Co-author of 13 Hours. Co-founder of Shadow Warriors Project.'
}

const FACTS = [
  { k: 'Service', v: 'U.S. Marine Corps · 1984–1996' },
  { k: 'Operator', v: 'Annex Security Team · Benghazi' },
  { k: 'Date of action', v: 'September 11–12, 2012' },
  { k: 'Credited with', v: 'Helping save 25+ Americans' },
  { k: 'Co-author', v: '13 Hours: The Inside Account of What Really Happened in Benghazi' },
  { k: 'Co-founder', v: 'Shadow Warriors Project' },
  { k: 'Recorded from', v: 'Colorado' }
]

const AboutPage = () => {
  return (
    <main className="relative">
      <PageHeader
        eyebrow="OPERATOR DOSSIER"
        title="A LIFETIME OF"
        accent="VALOR ON FILE."
        lead="Operator-direct. On the record. The interviews here are long-form because the story is long."
      />

      <section className="container-x grid grid-cols-12 gap-x-8 gap-y-12 pb-32 lg:gap-x-12">
        <div className="col-span-12 lg:col-span-7">
          <HudTag color="accent">BIO</HudTag>
          <div className="mt-6 space-y-6 text-base text-ink">
            <p>
              Mark &ldquo;Oz&rdquo; Geist served twelve years in the U.S. Marine Corps before
              shifting into the private security sector. On September 11–12, 2012, he was a
              member of the Annex Security Team at the CIA outpost in Benghazi when the
              compound came under coordinated attack. He is credited with helping save more
              than twenty-five American lives that night.
            </p>
            <p>
              He co-authored{' '}
              <em className="not-italic underline decoration-accent">
                13 Hours: The Inside Account of What Really Happened in Benghazi
              </em>{' '}
              — the basis for the Michael Bay film of the same name — and co-founded the{' '}
              <em className="not-italic underline decoration-accent">Shadow Warriors Project</em>,
              a 501(c)(3) supporting wounded contractors and their families with K9 service dogs,
              healing retreats, and direct aid.
            </p>
            <p>
              This podcast is the long-form record. Conversations Oz has chosen to do, with
              hosts who don&apos;t cut. No PR layer. No curated soundbites. The interviews, on
              the record.
            </p>
          </div>
        </div>

        <aside className="col-span-12 lg:col-span-5">
          <HudTag color="accent">FILE</HudTag>
          <dl className="mt-6 grid grid-cols-1 gap-y-5 border-t border-border pt-6 font-mono text-[11px] uppercase tracking-[0.22em]">
            {FACTS.map((f) => (
              <div key={f.k} className="grid grid-cols-3 gap-4">
                <dt className="col-span-1 text-mute">{f.k}</dt>
                <dd className="col-span-2 text-ink">{f.v}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </section>
    </main>
  )
}

export default AboutPage
