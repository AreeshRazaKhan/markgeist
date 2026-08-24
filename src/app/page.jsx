import TransmissionZero from '@/components/sections/transmission-zero'
import SubscribeRow from '@/components/sections/subscribe-row'
import NowBroadcasting from '@/components/sections/now-broadcasting'
import MembershipPromo from '@/components/sections/membership-promo'
import OperatorDossier from '@/components/sections/operator-dossier'
import SocialProof from '@/components/sections/social-proof'
import MissionLogs from '@/components/sections/mission-logs'
import SitePaused from '@/components/sections/site-paused'
import TheField from '@/components/sections/the-field'
import IntelFeed from '@/components/sections/intel-feed'
import OpenComms from '@/components/sections/open-comms'
import ZoomThrough from '@/components/motion/zoom-through'

// Site is temporarily paused. Set back to false to restore the live homepage.
const SITE_PAUSED = true

const HomePage = () => {
  if (SITE_PAUSED) return <SitePaused />

  return (
    <main className="relative">
      <TransmissionZero />
      <SubscribeRow />
      <NowBroadcasting />
      <MembershipPromo />
      <OperatorDossier />
      <SocialProof />
      <MissionLogs />
      <ZoomThrough prefix="SHOWS THAT " accent="HOSTED OZ.">
        <TheField />
      </ZoomThrough>
      <IntelFeed />
      <OpenComms />
    </main>
  )
}

export default HomePage
