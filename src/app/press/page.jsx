import HudTag from '@/components/motion/hud-tag'
import PageHeader from '@/components/nav/page-header'

export const metadata = {
  title: 'Press — Mark "Oz" Geist',
  description:
    'Press kit, short and long bios, headshots, and booking. For media, podcasters, and event programmers.'
}

const SHORT_BIO =
  'Mark "Oz" Geist — U.S. Marine (1984–1996), Annex Security Team in Benghazi, co-author of 13 Hours, co-founder of Shadow Warriors Project.'

const LONG_BIO = `Mark "Oz" Geist served twelve years in the United States Marine Corps before transitioning to private security. On September 11–12, 2012, he was a member of the Annex Security Team at the CIA outpost in Benghazi during the coordinated attack that killed Ambassador Christopher Stevens, Sean Smith, Glen Doherty, and Tyrone Woods. Oz is credited with helping save more than twenty-five American lives during those thirteen hours.

He co-authored 13 Hours: The Inside Account of What Really Happened in Benghazi (Twelve, 2014) — the basis for the Michael Bay film of the same name. He co-founded the Shadow Warriors Project, a 501(c)(3) supporting wounded contractors and their families through K9 service dogs, healing retreats, and direct aid.

Mark hosts long-form, on-the-record conversations and continues to speak publicly about service, recovery, and the work that came after Benghazi.`

const PressPage = () => {
  return (
    <main className="relative">
      <PageHeader
        eyebrow="PRESS KIT"
        title="PRESS, BOOKING,"
        accent="AND MEDIA RESOURCES."
        lead="For interviews, speaking requests, podcast appearances, and media inquiries, use the official contact channel below. Approved bios, talking points, and media assets are available on request."
      />

      <section className="container-x grid grid-cols-12 gap-x-8 gap-y-16 pb-32 lg:gap-x-12">
        <div className="col-span-12 lg:col-span-7">
          <HudTag color="accent">SHORT BIO · 1 SENTENCE</HudTag>
          <p className="mt-6 text-base text-ink">{SHORT_BIO}</p>

          <div className="mt-12">
            <HudTag color="accent">LONG BIO · 3 PARAGRAPHS</HudTag>
            <div className="mt-6 space-y-5 text-base text-ink">
              {LONG_BIO.split('\n\n').map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          <div className="mt-12">
            <HudTag color="accent">TALKING POINTS</HudTag>
            <ul className="mt-6 space-y-3 text-base text-ink">
              <li>— Benghazi · September 11–12, 2012 · Annex Security Team</li>
              <li>— 13 Hours: book + film · what made it onto the page, what didn&apos;t</li>
              <li>— Shadow Warriors Project · K9s, retreats, direct aid for contractors</li>
              <li>— Long-form interviews, on the record · the work that came after</li>
              <li>— Speaking · service, recovery, leadership, post-traumatic resilience</li>
            </ul>
          </div>
        </div>

        <aside className="col-span-12 lg:col-span-5">
          <HudTag color="accent">BOOKING</HudTag>
          <div className="mt-6 space-y-5 border-t border-border pt-6 font-mono text-[11px] uppercase tracking-[0.22em]">
            <div>
              <p className="text-mute">Speaking</p>
              <a
                href="https://teamneverquit.com/speakers/mark-geist/"
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-block text-ink underline decoration-accent underline-offset-4 hover:text-accent"
              >
                Team Never Quit ↗
              </a>
            </div>
            <div>
              <p className="text-mute">Press inquiries</p>
              <a
                href="/contact"
                className="mt-2 inline-block text-ink underline decoration-accent underline-offset-4 hover:text-accent"
              >
                Contact form →
              </a>
            </div>
            <div>
              <p className="text-mute">Shadow Warriors</p>
              <a
                href="https://shadowwarriorsproject.org/"
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-block text-ink underline decoration-accent underline-offset-4 hover:text-accent"
              >
                shadowwarriorsproject.org ↗
              </a>
            </div>
          </div>

          <div className="mt-12">
            <HudTag color="accent">ASSETS</HudTag>
            <ul className="mt-6 space-y-3 text-sm text-mute">
              <li>— Headshots: available on request via the contact form</li>
              <li>— Logo: /the-oz-cast-logo.png (transparent PNG)</li>
              <li>— Podcast cover art: by request</li>
            </ul>
          </div>
        </aside>
      </section>
    </main>
  )
}

export default PressPage
