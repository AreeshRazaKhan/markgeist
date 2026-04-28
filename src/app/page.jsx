import TopNav from '@/components/nav/top-nav'
import TransmissionZero from '@/components/sections/transmission-zero'
import NowBroadcasting from '@/components/sections/now-broadcasting'
import OperatorDossier from '@/components/sections/operator-dossier'
import MissionLogs from '@/components/sections/mission-logs'
import TheField from '@/components/sections/the-field'
import IntelFeed from '@/components/sections/intel-feed'
import OpenComms from '@/components/sections/open-comms'
import TailCall from '@/components/sections/tail-call'

const HomePage = () => {
  return (
    <>
      <TopNav />
      <main className="relative">
        <TransmissionZero />
        <NowBroadcasting />
        <OperatorDossier />
        <MissionLogs />
        <TheField />
        <IntelFeed />
        <OpenComms />
      </main>
      <TailCall />
    </>
  )
}

export default HomePage
