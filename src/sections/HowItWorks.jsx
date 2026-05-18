/**
 * sections/HowItWorks.jsx
 * 3-step process section — reduces friction by explaining
 * exactly what happens after a visitor submits the form.
 */
import ScrollReveal from '../components/ScrollReveal'
import { CTA_LABEL, CTA_HREF } from '../utils/cta'

const steps = [
  {
    number: '01',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    title: 'Tell Us Your Goal',
    description:
      'Fill out a quick 2-minute form with your current stats, fitness goal, and lifestyle. No fluff — just what we need to build your plan.',
    tag: '2 min form',
  },
  {
    number: '02',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    title: 'Free Consultation Call',
    description:
      'Your coach personally reviews your form and jumps on a WhatsApp call to understand your schedule, preferences, and blockers. Zero obligation.',
    tag: 'Within 24 hrs',
  },
  {
    number: '03',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Start & See Results',
    description:
      'Receive your custom workout + diet plan, and start Day 1. Weekly check-ins and plan adjustments keep you on track all the way to Day 90.',
    tag: 'Results in 90 days',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-dark-800 py-20 md:py-28 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-brand-blue/25 to-transparent" />
      <div className="absolute -bottom-40 right-0 w-[400px] h-[400px] bg-brand-blue/4 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 md:px-10">

        {/* Header */}
        <ScrollReveal className="text-center mb-16">
          <p className="text-brand-blue text-sm font-bold tracking-[0.3em] uppercase mb-3">
            The Process
          </p>
          <h2 className="section-title text-white mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Step one is a free, no-obligation consult — you only start once
            the plan actually fits your life. Three simple steps, zero guesswork.
          </p>
        </ScrollReveal>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative">

          {/* Connector line (desktop only) */}
          <div className="hidden md:block absolute top-14 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px bg-gradient-to-r from-brand-blue/40 via-brand-blue/60 to-brand-blue/40" />

          {steps.map((step, index) => (
            <ScrollReveal key={step.number} delay={index * 120} direction="up">
              <div className="relative bg-dark-700 border border-white/8 rounded-2xl p-7 hover:border-brand-blue/40 transition-all duration-300 hover:-translate-y-1 group">

                {/* Step number — large background */}
                <span className="absolute top-4 right-5 font-display text-6xl text-white/4 group-hover:text-brand-blue/8 transition-colors leading-none select-none">
                  {step.number}
                </span>

                {/* Icon circle */}
                <div className="w-14 h-14 rounded-xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue mb-5 group-hover:bg-brand-blue/15 transition-colors">
                  {step.icon}
                </div>

                {/* Tag */}
                <span className="inline-flex items-center gap-1.5 bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-[10px] font-bold tracking-[0.2em] uppercase rounded-full px-3 py-1 mb-4">
                  <span className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-pulse" />
                  {step.tag}
                </span>

                <h3 className="font-display text-2xl text-white tracking-wider uppercase mb-3">
                  {step.title}
                </h3>
                <p className="text-white/55 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom CTA */}
        <ScrollReveal delay={400} className="text-center mt-14">
          <a href={CTA_HREF} className="btn-primary text-base">
            {CTA_LABEL}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <p className="text-white/30 text-xs mt-3">Free · No commitment · Results guaranteed</p>
        </ScrollReveal>

      </div>
    </section>
  )
}
