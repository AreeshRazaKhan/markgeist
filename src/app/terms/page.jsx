import PageHeader from '@/components/nav/page-header'

export const metadata = {
  title: 'Terms of Use — Mark "Oz" Geist',
  description: 'Site terms and content licensing.'
}

const TermsPage = () => {
  return (
    <main className="relative">
      <PageHeader eyebrow="LEGAL" title="TERMS OF" accent="USE." />

      <section className="container-x pb-32">
        <div className="mx-auto max-w-3xl space-y-8 text-base text-ink">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-mute">
            Last updated · 2026-05-01
          </p>

          <h2 className="font-display text-2xl uppercase tracking-display text-ink">
            Use of this site
          </h2>
          <p>
            This site is the personal podcast and journal of Mark &ldquo;Oz&rdquo; Geist. By
            using it you agree to use the content for personal, non-commercial purposes unless
            otherwise authorized in writing.
          </p>

          <h2 className="font-display text-2xl uppercase tracking-display text-ink">
            Content & attribution
          </h2>
          <p>
            Episode titles, summaries, and journal posts are © Mark Geist. Cover art for
            partner shows belongs to those shows. Quote, link, and embed responsibly — credit
            Mark Geist / 13 Hours where appropriate.
          </p>

          <h2 className="font-display text-2xl uppercase tracking-display text-ink">
            No professional advice
          </h2>
          <p>
            Nothing on this site constitutes legal, medical, financial, or military advice.
            Episodes are conversations on the record — they are not advisories.
          </p>

          <h2 className="font-display text-2xl uppercase tracking-display text-ink">
            Third-party services
          </h2>
          <p>
            Listening links to Spotify, Apple Podcasts, and YouTube are subject to those
            services&apos; own terms. We are not responsible for content or behavior on those
            platforms.
          </p>

          <h2 className="font-display text-2xl uppercase tracking-display text-ink">
            Changes
          </h2>
          <p>
            These terms may change. The &ldquo;last updated&rdquo; line above reflects the most
            recent revision.
          </p>

          <h2 className="font-display text-2xl uppercase tracking-display text-ink">
            Contact
          </h2>
          <p>
            Reach out via the{' '}
            <a href="/contact" className="underline decoration-accent underline-offset-4 hover:text-accent">
              contact form
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  )
}

export default TermsPage
