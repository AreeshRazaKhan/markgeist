'use client'

import { useState } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'sonner'

import HudTag from '@/components/motion/hud-tag'
import { cn } from '@/lib/utils'

/**
 * Early-bird membership checkout (SOW §8).
 * Phase 1 captures the founding member (name / email / tier) so they can be onboarded
 * into the Phase 2 portal at go-live. The payment block is a UI stub: the live processor
 * (Stripe) is wired at launch config — see PAYMENT_LIVE. Card fields stay disabled until
 * then so no card data is ever collected by this placeholder form.
 */
const PAYMENT_LIVE = false

const EarlyBirdCheckout = ({ tiers, defaultTier }) => {
  const initial = tiers.find((t) => t.id === defaultTier)?.id || tiers[0].id
  const [tierId, setTierId] = useState(initial)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  const tier = tiers.find((t) => t.id === tierId) || tiers[0]

  const onSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      // TODO(launch): POST capture to CRM + create Stripe subscription when PAYMENT_LIVE.
      await new Promise((r) => setTimeout(r, 700))
      setDone(true)
      toast("You're in.", {
        description: `Founding seat reserved on ${tier.name}. Watch your inbox for portal onboarding.`
      })
    } catch (err) {
      console.error('[EarlyBirdCheckout]:', err)
      toast('Reservation failed.', { description: 'Try again in a moment.' })
    } finally {
      setSubmitting(false)
    }
  }

  if (done) {
    return (
      <div className="border border-accent bg-accent/[0.06] p-8 lg:p-10">
        <HudTag color="accent">FOUNDING SEAT RESERVED</HudTag>
        <h2 className="mt-5 font-display text-3xl uppercase tracking-display text-ink lg:text-4xl">
          You&apos;re in.
        </h2>
        <p className="mt-4 max-w-md text-sm text-mute">
          Your founding rate on <span className="text-ink">{tier.name}</span> is locked at
          {' '}
          <span className="text-accent">${tier.price}{tier.cadence}</span>. When the Operator
          Circle portal opens, you&apos;re onboarded first — no re-signup, no rate change.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="border border-border bg-surface p-6 lg:p-8">
      <HudTag color="accent">EARLY-BIRD CHECKOUT</HudTag>

      <fieldset className="mt-6">
        <legend className="font-mono text-[10px] uppercase tracking-[0.22em] text-mute">
          Select tier
        </legend>
        <div className="mt-3 grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-3">
          {tiers.map((t) => (
            <label
              key={t.id}
              className={cn(
                'flex cursor-pointer flex-col gap-1 bg-bg p-4 transition-colors',
                t.id === tierId ? 'bg-steel' : 'hover:bg-steel/60'
              )}
            >
              <span className="flex items-center gap-2">
                <input
                  type="radio"
                  name="tier"
                  value={t.id}
                  checked={t.id === tierId}
                  onChange={() => setTierId(t.id)}
                  className="h-3 w-3 accent-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ring-offset-2 ring-offset-bg"
                />
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-mute">
                  {t.tier}
                </span>
              </span>
              <span className="font-display text-lg uppercase tracking-display text-ink">
                {t.name}
              </span>
              <span className="font-mono text-xs text-accent">
                ${t.price}
                <span className="text-mute">{t.cadence}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="fullName" className="font-mono text-[10px] uppercase tracking-[0.22em] text-mute">
            Full name
          </label>
          <input
            id="fullName"
            name="fullName"
            required
            autoComplete="name"
            className="mt-2 block w-full border border-border bg-bg px-4 py-3 font-mono text-sm text-ink focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ring-offset-2 ring-offset-bg"
          />
        </div>
        <div>
          <label htmlFor="memberEmail" className="font-mono text-[10px] uppercase tracking-[0.22em] text-mute">
            Email
          </label>
          <input
            id="memberEmail"
            name="memberEmail"
            type="email"
            required
            autoComplete="email"
            placeholder="you@domain.com"
            className="mt-2 block w-full border border-border bg-bg px-4 py-3 font-mono text-sm lowercase text-ink placeholder:text-mute focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ring-offset-2 ring-offset-bg"
          />
        </div>
      </div>

      {/* Payment block — UI stub until the processor is wired at launch (PAYMENT_LIVE). */}
      <div className="mt-6 border border-border bg-bg p-5">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-mute">
            Payment
          </span>
          {!PAYMENT_LIVE && (
            <span className="border border-border px-2 py-1 font-mono text-[9px] uppercase tracking-[0.22em] text-accent">
              Connects at launch
            </span>
          )}
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="cardNumber" className="font-mono text-[10px] uppercase tracking-[0.22em] text-mute">
              Card number
            </label>
            <input
              id="cardNumber"
              name="cardNumber"
              inputMode="numeric"
              disabled={!PAYMENT_LIVE}
              placeholder="•••• •••• •••• ••••"
              aria-describedby="payment-note"
              className="mt-2 block w-full border border-border bg-surface px-4 py-3 font-mono text-sm text-ink placeholder:text-mute focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ring-offset-2 ring-offset-bg disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <div>
            <label htmlFor="cardExpiry" className="font-mono text-[10px] uppercase tracking-[0.22em] text-mute">
              Expiry
            </label>
            <input
              id="cardExpiry"
              name="cardExpiry"
              disabled={!PAYMENT_LIVE}
              placeholder="MM / YY"
              className="mt-2 block w-full border border-border bg-surface px-4 py-3 font-mono text-sm text-ink placeholder:text-mute focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ring-offset-2 ring-offset-bg disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <div>
            <label htmlFor="cardCvc" className="font-mono text-[10px] uppercase tracking-[0.22em] text-mute">
              CVC
            </label>
            <input
              id="cardCvc"
              name="cardCvc"
              disabled={!PAYMENT_LIVE}
              placeholder="•••"
              className="mt-2 block w-full border border-border bg-surface px-4 py-3 font-mono text-sm text-ink placeholder:text-mute focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ring-offset-2 ring-offset-bg disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </div>
        <p id="payment-note" className="mt-3 text-xs text-mute">
          Secure payment connects at soft launch. Reserve now to lock your founding rate; card is
          charged when the processor goes live and your seat is confirmed.
        </p>
      </div>

      <div className="mt-6 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 sm:flex-row sm:items-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-mute">
          Founding rate
          {' '}
          <span className="text-accent">${tier.price}{tier.cadence}</span>
          {' · '}
          <span className="text-ink">{tier.name}</span>
        </p>
        <button
          type="submit"
          disabled={submitting}
          className="border border-accent bg-accent px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-accent-foreground transition-colors hover:border-ember hover:bg-ember disabled:opacity-50"
        >
          {submitting ? 'Reserving…' : 'Reserve founding seat →'}
        </button>
      </div>
    </form>
  )
}

EarlyBirdCheckout.propTypes = {
  tiers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      tier: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      cadence: PropTypes.string.isRequired
    })
  ).isRequired,
  defaultTier: PropTypes.string
}

EarlyBirdCheckout.defaultProps = {
  defaultTier: ''
}

export default EarlyBirdCheckout
