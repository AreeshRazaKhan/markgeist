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
  {
    k: 'Co-author',
    v: (
      <>
        13 Hours:{' '}
        <span className="underline decoration-accent">
          The Inside Account of What Really Happened in Benghazi
        </span>
      </>
    )
  },
  {
    k: 'Co-founder',
    v: <span className="underline decoration-accent">Shadow Warriors Project</span>
  },
  { k: 'Recorded from', v: 'Colorado' }
]

const AboutPage = () => {
  return (
    <main className="relative">
      <PageHeader
        eyebrow="OPERATOR DOSSIER"
        title="LIFETIME OF VALOR,"
        accent="ON THE RECORD."
        lead={
          <>
            Operator-direct. No PR layer. No clipped soundbites. This is the official background
            file on Mark &ldquo;Oz&rdquo; Geist.{' '}
            <span className="font-medium text-ink">
              Marine, Benghazi Annex Security Team member, author, speaker, and host of The Oz Cast.
            </span>
          </>
        }
      />

      <section className="container-x grid grid-cols-12 gap-x-8 gap-y-12 pb-32 lg:gap-x-12">
        <div className="col-span-12 lg:col-span-7">
          <HudTag color="accent">BIO</HudTag>
          <div className="mt-6 space-y-6 text-base text-ink">
            <p>
              Mark &ldquo;Oz&rdquo; Geist served twelve years in the U.S. Marine Corps before
              moving into the private security sector.
            </p>
            <p>
              On September 11–12, 2012, Oz was part of the Annex Security Team at the CIA outpost
              in Benghazi when the compound came under coordinated attack. He is credited with
              helping save more than twenty-five American lives that night.
            </p>
            <p>
              He later co-authored{' '}
              <em className="not-italic">
                13 Hours:{' '}
                <span className="underline decoration-accent">
                  The Inside Account of What Really Happened in Benghazi
                </span>
              </em>
              , the book that became the basis for the Michael Bay film{' '}
              <em className="not-italic">13 Hours</em>. He also
              co-founded{' '}
              <em className="not-italic underline decoration-accent">Shadow Warriors Project</em>, a
              501(c)(3) organization supporting wounded private security contractors and their
              families through K9 service dogs, healing retreats, and direct aid.
            </p>
            <p>
              The Oz Cast is the long-form record: conversations about service, survival,
              leadership, sacrifice, and the fight that continues after the headlines fade.
            </p>
            <p>No scripted PR layer. No curated soundbites. Just the record.</p>
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
