import TopNav from '@/components/nav/top-nav'
import TransmissionZero from '@/components/sections/transmission-zero'
import SubscribeRow from '@/components/sections/subscribe-row'
import NowBroadcasting from '@/components/sections/now-broadcasting'
import OperatorDossier from '@/components/sections/operator-dossier'
import MissionLogs from '@/components/sections/mission-logs'
import TheField from '@/components/sections/the-field'
import IntelFeed from '@/components/sections/intel-feed'
import OpenComms from '@/components/sections/open-comms'
import TailCall from '@/components/sections/tail-call'
import ZoomThrough from '@/components/motion/zoom-through'

const HomePage = () => {
  return (
    <>
      <TopNav />
      <main className="relative">
        <TransmissionZero />
        <SubscribeRow />
        <NowBroadcasting />
        <OperatorDossier />
        <MissionLogs />
        <ZoomThrough prefix="SHOWS THAT " accent="HOSTED OZ.">
          <TheField />
        </ZoomThrough>
        <IntelFeed />
        <OpenComms />
      </main>
      <TailCall />
    </>
  )
}

export default HomePage
