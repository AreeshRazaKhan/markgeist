# The Ozcast — Phase 1 (Public Launch) Checklist

> Scope: **Phase 1 only** — corporate landing, full Ozcast platform, brand, sponsorship
> intake, merch storefront **shell**, and a working early-bird membership checkout.
> Target: **July 13 soft launch**. First episode publishes **August 4**.
> Source: Operation 1776 SOW (OzCast.pdf), §2 / §4 / §7 / §9.
>
> Explicitly OUT of Phase 1 (do not build now): member login portal, dashboard,
> watch history, live Breakdown, AI Q&A, lifecycle email, Nine Line API integration.

---

## 0. Kickoff & Dependencies (must land before production)

- [ ] Confirm scope, brand inputs, and access; lock the Information Architecture
- [ ] Set weekly check-in cadence (Mon/Wed) and name a single point of contact
- [ ] Schedule the joint Nine Line call
- [ ] Receive **"half-robot" hero image** (needed by kickoff)
- [ ] Receive logos + **brand color confirmation** (needed by kickoff)
- [ ] Receive creative folders / images from Justin (needed by kickoff)
- [ ] Obtain domain & DNS access — markgeist.com + Ozcast domain (before launch)
- [ ] Obtain payment processor account/access (before revenue paths)
- [ ] Receive sponsorship deck (Canva link) (before revenue paths)
- [ ] Receive membership tiers, prices & early-bird offer (before checkout build)
- [ ] Receive Spotify channel name + platform links (before soft launch)
- [ ] Confirm cleared Phase 1 payment (starts the production window)

---

## 1. Brand & Design System (§4.1)

- [ ] Define rugged, military-inspired visual identity retaining Mark Geist's signature colors
- [ ] Produce defined palette, type hierarchy, button/section styling, imagery treatment
- [ ] Apply the identity consistently **site-wide** (one approved direction)
- [ ] Build "Ozcast — Hosted by Mark Geist" logo lockup, placed top-left, sized for recognition
- [ ] Build the home hero around the client-provided "half-robot" key image
- [ ] Add branded arrival animation to the hero
- [ ] **Acceptance:** identity consistent on all pages; lockup legible/on-brand; hero renders with supplied asset and is approved on review

---

## 2. Corporate Landing — markgeist.com (§4.2)

- [ ] Build single group landing page: about/mission
- [ ] Add a brief summary block for each property (Ozcast, training, speaking) with onward links
- [ ] Route primary CTAs toward **training** as the downstream conversion (podcast + main site funnel there)
- [ ] Make it mobile-responsive
- [ ] **Acceptance:** all three properties summarized and linked; routing matches agreed funnel; no dead ends

---

## 3. Ozcast Platform — Home / Hero (§4.3)

- [ ] Feature the latest published episode as the **primary play**
- [ ] Add a lean "recent episodes" strip alongside the hero
- [ ] Ensure auto-feature of newest episode
- [ ] Verify play works on **desktop & mobile**
- [ ] (Post-launch) plan to review recent strip against click data

---

## 4. Ozcast Platform — Episode Library & Guests (§4.3)

- [ ] Build episode card: thumbnail + clickable video + short conversation description
- [ ] Use a consistent card layout, ordered **newest-first**
- [ ] Add in-episode guest detail: short guest description (who/what, not full bio) + guest photo, shown inside the episode
- [ ] Do NOT build a separate Guests page (removes redundancy)
- [ ] Support standardized studio guest shot OR a frame pulled from episode footage as fallback
- [ ] **Acceptance:** episodes render uniformly, video plays, descriptions present; guest detail + photo appear inside the episode view; each published episode shows a usable guest image

---

## 5. Sponsorship System (§4.4)

- [ ] Build per-episode sponsor display around **gold / silver / bronze** tiers
- [ ] Make sponsor assignment editable per episode without a rebuild
- [ ] Support per-episode rotation, single-episode sponsors, and package deals (e.g., gold across 10 eps, or 1 ep/month over 6 months)
- [ ] Implement affiliate/discount links carrying the show's tracked path / discount code (e.g., "/OZ"-style)
- [ ] Build **Sponsor-an-Episode** priority page with inquiry form — **no public pricing**
- [ ] Wire submission to notify Mark and create a CRM-tagged sponsorship lead
- [ ] **Acceptance:** sponsors display by tier; assignment editable per episode; links resolve with correct tracked code; form submits, notifies Mark, and creates a tagged CRM lead

---

## 6. Featured Appearances & Press (§4.5)

- [ ] Build dedicated **Featured Appearances** page (Mark as guest on other shows/podcasts), kept visually distinct from Episodes
- [ ] List appearances with links
- [ ] Build the **Press** page but keep it **hidden** at launch
- [ ] Ensure Press page toggles live on request within ~a week
- [ ] **Acceptance:** appearances page lists with links and is distinct from Episodes; press page exists, is hidden, and toggles live on request

---

## 7. Blog / Breakdown Structure (§4.6)

- [ ] Build blog framework scoped strictly to podcast content (show notes, written cuts, commentary tied to an episode) — no general political stances
- [ ] Populate the first blog structure / template
- [ ] Separate public newsletter teaser from gated member "Breakdown" debrief content
- [ ] (Optional) Demonstrate AI-assisted drafting workflow on one episode (transcript → AI draft → human pass in Mark's voice) — *AI usage metered, §11*
- [ ] **Acceptance:** blog template live and first structure populated; public teaser vs gated content clearly separated

---

## 8. Membership — Early-Bird Checkout (Phase 1 portion of §4.7 / §5)

- [ ] Build the **Membership** page: tiers, benefits, early-bird signup
- [ ] Show gated content in an **upsell state** to non-members
- [ ] Build a **functional early-bird membership checkout** (capture + payment) live at soft launch
- [ ] Configure early-bird launch offer (discount % or held founding rate; e.g., "first 100 members") per Mark's final decision
- [ ] Show the members-only portal as **"opening soon"** with email capture
- [ ] Ensure early-bird members are captured so they can be onboarded into the Phase 2 portal later
- [ ] **Acceptance:** early-bird checkout captures members + takes payment at launch; portal shows "opening soon" with email capture
- [ ] *(Portal login, dashboard, watch history, Breakdown, AI Q&A = Phase 2 — NOT in Phase 1)*

---

## 9. Merch Storefront Shell (Phase 1 portion of §4.9)

- [ ] Build on-brand merch **storefront shell** on the Ozcast site
- [ ] Keep buyers on-brand (no off-brand redirect for core items)
- [ ] **Acceptance:** storefront shell present at launch
- [ ] *(Full Nine Line API/automation integration = Phase 3 — NOT in Phase 1)*

---

## 10. CRM, Automations, Analytics & QR Codes (§4.10)

- [ ] Provision dedicated CRM workspace/subaccount: contact database, tags, pipelines, forms, communication rails (sponsors, members, fans)
- [ ] Wire forms and tags
- [ ] Configure automations: sponsor inquiry → Mark routing; membership onboarding; lifecycle triggers
- [ ] Configure analytics: visit / click / lead / conversion tracking
- [ ] Stand up a baseline review dashboard (hero-strip clicks, membership conversions, sponsor-link performance)
- [ ] Build two episode end-card **QR codes** — one to the membership section, one to register (designed for ~10s display)
- [ ] Establish weekly check-in cadence (Mon/Wed) with a single named POC
- [ ] **Acceptance:** CRM provisioned with forms/tags wired; automations fire on triggers; tracking live with baseline dashboard; both QR codes resolve to correct destinations

---

## 11. Contact / Subscribe & Newsletter

- [ ] Build Contact / Subscribe page: general contact + platform links (Spotify, etc.)
- [ ] Add newsletter capture (live at launch)
- [ ] Connect platform channel links as they are confirmed

---

## 12. QA & Soft Launch (§7)

- [ ] Run cross-device QA (desktop & mobile)
- [ ] Confirm analytics is live
- [ ] Confirm newsletter capture works
- [ ] Confirm portal "opening soon" state is live
- [ ] Confirm final links (Spotify) are in place
- [ ] Obtain content approvals / copy sign-off
- [ ] **GO LIVE — July 13**

---

## Soft-Launch Definition — final gate (§2)

All of the following must be true on July 13:

- [ ] markgeist.com corporate landing **live**
- [ ] Ozcast platform **live** with episode framework, sponsor display, and appearances page
- [ ] Sponsor-an-Episode intake form **live** and routing to Mark
- [ ] Merch storefront **shell** present
- [ ] Early-bird membership checkout **functional** (capture + payment)
- [ ] Members-only portal shown as **"opening soon"** with email capture
- [ ] Press page **built but hidden**
- [ ] Blog/Breakdown structure **in place**
- [ ] Newsletter capture **live**
