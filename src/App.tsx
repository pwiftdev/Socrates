import { Community } from '@/components/Community'
import { Dialogues } from '@/components/Dialogues'
import { Footer } from '@/components/Footer'
import { GrainOverlay } from '@/components/GrainOverlay'
import { Hero } from '@/components/Hero'
import { PhilosopherReborn } from '@/components/PhilosopherReborn'
import { WhySection } from '@/components/WhySection'
import { Roadmap } from '@/components/Roadmap'
import { ScrollProgress, SiteNav } from '@/components/SiteNav'
import { Tokenomics } from '@/components/Tokenomics'

export default function App() {
  return (
    <>
      <ScrollProgress />
      <SiteNav />
      <main>
        <Hero />
        <PhilosopherReborn />
        <WhySection />
        <Dialogues />
        <Tokenomics />
        <Roadmap />
        <Community />
        <Footer />
      </main>
      <GrainOverlay />
    </>
  )
}
