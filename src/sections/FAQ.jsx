/**
 * sections/FAQ.jsx
 * Collapsible FAQ section — reduces objections & improves SEO.
 */
import { useState } from 'react'
import ScrollReveal from '../components/ScrollReveal'

const faqs = [
  {
    q: 'Do I need a gym membership to follow the plan?',
    a: 'No gym required. All plans are designed to work with whatever you have — home, gym, hotel room. You will get a customised workout plan based on your available equipment when you sign up.',
  },
  {
    q: 'How much time do I need per day?',
    a: 'Our workouts are designed for busy schedules — typically 30 to 45 minutes per session, 3 to 5 days per week. The diet plan is built around real food you can find anywhere, with no complicated meal prep required.',
  },
  {
    q: 'What if I don\'t see results in 90 days?',
    a: 'If you follow the plan consistently and complete your weekly check-ins, and you still don\'t see meaningful results by Day 90, you get a full refund. No questions asked. We stand behind the system completely.',
  },
  {
    q: 'Can the diet plan be vegetarian or vegan?',
    a: 'Absolutely. When you fill out the intake form, you can specify your dietary preferences. All plans — vegetarian, vegan, or non-veg — are fully personalised to hit your protein and calorie targets.',
  },
  {
    q: 'How do the weekly check-ins work?',
    a: 'Every week, you send your body measurements, photos, and a brief update via WhatsApp. Your coach reviews your progress within 24 hours and provides feedback, adjustments, or motivation. It takes under 5 minutes on your end.',
  },
  {
    q: 'Can I pause or cancel the plan?',
    a: 'Yes. There are no long-term contracts. You can pause for up to 2 weeks (for travel, illness, etc.) and pick up where you left off. If you need to cancel, just let us know — no questions asked.',
  },
  {
    q: 'I travel a lot for work. Can this still work for me?',
    a: 'This system was literally built for people who travel. Your workout plan adapts to hotel gyms, bodyweight-only, or minimal equipment. Your diet plan uses foods available anywhere. Several clients have completed the 90 days while travelling internationally.',
  },
]

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div
      className={`border rounded-xl overflow-hidden transition-all duration-300 ${
        isOpen ? 'border-brand-blue/40 bg-dark-700' : 'border-white/8 bg-dark-700/50 hover:border-white/15'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={isOpen}
      >
        <span className={`font-semibold text-base transition-colors ${isOpen ? 'text-white' : 'text-white/80'}`}>
          {faq.q}
        </span>
        <span
          className={`shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 ${
            isOpen ? 'bg-brand-blue border-brand-blue rotate-45' : 'border-white/20'
          }`}
        >
          <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="px-6 pb-6 text-white/60 text-sm leading-relaxed">
          {faq.a}
        </p>
      </div>
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="bg-dark-900 py-20 md:py-28 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-brand-blue/20 to-transparent" />

      <div className="max-w-4xl mx-auto px-5 md:px-10">

        {/* Header */}
        <ScrollReveal className="text-center mb-14">
          <p className="text-brand-blue text-sm font-bold tracking-[0.3em] uppercase mb-3">
            Got Questions?
          </p>
          <h2 className="section-title text-white mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Everything you need to know before starting your transformation journey.
          </p>
        </ScrollReveal>

        {/* FAQ list */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <ScrollReveal key={i} delay={i * 60}>
              <FAQItem
                faq={faq}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              />
            </ScrollReveal>
          ))}
        </div>

        {/* Still have questions? */}
        <ScrollReveal delay={200} className="mt-12 text-center">
          <p className="text-white/40 text-sm mb-4">Still have a question?</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-brand-blue font-semibold text-sm hover:text-brand-blue-light transition-colors"
          >
            Ask us directly →
          </a>
        </ScrollReveal>
      </div>
    </section>
  )
}
