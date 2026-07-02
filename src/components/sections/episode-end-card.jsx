import HudTag from '@/components/motion/hud-tag'
import QrCode from '@/components/motion/qr-code'
import { END_CARD_QR } from '@/constants/site'

/**
 * Episode end-card (SOW §4.10) — the two ~10s on-screen QR codes for the end of each
 * episode: one to Membership, one to Register. Rendered on the episode page so the codes
 * are on-brand and screen-capturable for the video end-cards.
 */
const EpisodeEndCard = () => {
  return (
    <section className="mt-20 border-t border-border pt-10">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <HudTag color="accent">END CARD</HudTag>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-mute">
          ~10s on-screen · scan to join
        </span>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {END_CARD_QR.map((q) => (
          <QrCode key={q.id} href={q.href} label={q.label} caption={q.caption} />
        ))}
      </div>
    </section>
  )
}

export default EpisodeEndCard
