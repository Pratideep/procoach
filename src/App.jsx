/**
 * App.jsx
 * Root component — assembles all sections and global UI elements.
 */
import Navbar          from './components/Navbar'
import StickyBar       from './components/StickyBar'
import WhatsAppButton  from './components/WhatsAppButton'

import Hero                from './sections/Hero'
import CoachTransformation from './sections/CoachTransformation'
import Transformations     from './sections/Transformations'
import HowItWorks          from './sections/HowItWorks'
import Outcomes            from './sections/Outcomes'
import About               from './sections/About'
import Testimonials        from './sections/Testimonials'
import Qualifier           from './sections/Qualifier'
import Plans               from './sections/Plans'
import Guarantee           from './sections/Guarantee'
import FAQ                 from './sections/FAQ'
import LeadForm            from './sections/LeadForm'
import Footer              from './sections/Footer'

export default function App() {
  return (
    <>
      {/* Fixed top navigation */}
      <Navbar />

      {/* Mobile bottom conversion bar — appears on scroll */}
      <StickyBar />

      {/*
        Section order = conversion order:
        hook → PROOF (coach, then clients) → process → desire → TRUST
        (coach story, words) → fit check → price → risk reversal →
        objections → apply. Price only appears after proof + trust.
      */}
      <main>
        <Hero />
        <CoachTransformation />
        <Transformations />
        <HowItWorks />
        <Outcomes />
        <About />
        <Testimonials />
        <Qualifier />
        <Plans />
        <Guarantee />
        <FAQ />
        <LeadForm />
      </main>

      <Footer />

      {/* Always-visible floating WhatsApp button (desktop) */}
      <WhatsAppButton />
    </>
  )
}
