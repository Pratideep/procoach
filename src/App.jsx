/**
 * App.jsx
 * Root component — assembles all sections and global UI elements.
 */
import Navbar          from './components/Navbar'
import StickyBar       from './components/StickyBar'
import WhatsAppButton  from './components/WhatsAppButton'

import Hero            from './sections/Hero'
import HowItWorks      from './sections/HowItWorks'
import Transformations from './sections/Transformations'
import Testimonials    from './sections/Testimonials'
import Plans           from './sections/Plans'
import About           from './sections/About'
import FAQ             from './sections/FAQ'
import LeadForm        from './sections/LeadForm'
import Footer          from './sections/Footer'

export default function App() {
  return (
    <>
      {/* Fixed top navigation */}
      <Navbar />

      {/* Sticky urgency bar — appears on scroll */}
      <StickyBar />

      {/*
        Section order = conversion order: hook → PROOF → process → TRUST →
        words → price → objections → apply. Price now comes after the visitor
        trusts the results and the coach (was before About/Testimonials).
        Transformations leads with the coach's own before/after (transformations[0],
        isCoach) so credibility lands immediately after the hero.
      */}
      <main>
        <Hero />
        <Transformations />
        <HowItWorks />
        <About />
        <Testimonials />
        <Plans />
        <FAQ />
        <LeadForm />
      </main>

      <Footer />

      {/* Always-visible floating WhatsApp button */}
      <WhatsAppButton />
    </>
  )
}
