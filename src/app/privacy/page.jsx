import PageHeader from '@/components/nav/page-header'

export const metadata = {
  title: 'Privacy Policy — Mark "Oz" Geist',
  description: 'How this site handles your data.'
}

const PrivacyPage = () => {
  return (
    <main className="relative">
      <PageHeader eyebrow="LEGAL" title="PRIVACY" accent="POLICY." />

      <section className="container-x pb-32">
        <div className="mx-auto max-w-3xl space-y-8 text-base text-ink">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-mute">
            Last updated · 2026-05-01
          </p>

          <h2 className="font-display text-2xl uppercase tracking-display text-ink">
            What we collect
          </h2>
          <p>
            This site collects only what you submit directly — your name, email, and message
            via the contact form. We do not sell or share your information with third parties
            for marketing.
          </p>

          <h2 className="font-display text-2xl uppercase tracking-display text-ink">
            Cookies and analytics
          </h2>
          <p>
            We use minimal first-party storage to remember preferences (theme, reduced-motion).
            We may use privacy-respecting analytics to understand traffic in aggregate. No
            personally identifying analytics profiles are built.
          </p>

          <h2 className="font-display text-2xl uppercase tracking-display text-ink">
            Newsletter
          </h2>
          <p>
            If you subscribe to the newsletter, your email is stored only to send you the
            newsletter. Unsubscribe is one click in every issue.
          </p>

          <h2 className="font-display text-2xl uppercase tracking-display text-ink">
            Third-party links
          </h2>
          <p>
            Episode pages link out to Spotify, Apple Podcasts, YouTube, and partner sites.
            Those services run under their own privacy policies once you click through.
          </p>

          <h2 className="font-display text-2xl uppercase tracking-display text-ink">
            Contact
          </h2>
          <p>
            Questions or requests about your data — use the{' '}
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

export default PrivacyPage
