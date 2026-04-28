/**
 * sections/Plans.jsx
 * Two pricing tiers: Monthly (₹1,999/mo) and 3-Month Bundle (₹4,999 one-time).
 */
import ScrollReveal from '../components/ScrollReveal'
import { buildWhatsAppUrl } from '../utils/whatsapp'

const includes = [
  { icon: '💪', text: 'Customised Workout Plan' },
  { icon: '🥗', text: 'Personalised Diet Plan' },
  { icon: '📅', text: 'Weekly Progress Check-ins' },
  { icon: '💬', text: 'Daily WhatsApp Support' },
  { icon: '📊', text: 'Body Measurements Tracking' },
  { icon: '🔄', text: 'Plan Adjustments Every 4 Weeks' },
]

const bundlePerks = [
  { icon: '🎯', text: 'Everything in Monthly' },
  { icon: '💰', text: 'Save ₹1,998 vs monthly' },
  { icon: '⚡', text: 'Priority Response (within 2 hrs)' },
  { icon: '🏆', text: '90-Day Transformation Guarantee' },
  { icon: '📞', text: 'Monthly 1-on-1 Video Call' },
  { icon: '🔥', text: 'Bonus: Supplement Guide PDF' },
]

export default function Plans() {
  return (
    <section id="plans" className="bg-dark-900 py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-5 md:px-10">

        {/* Header */}
        <ScrollReveal className="text-center mb-16">
          <p className="text-brand-blue text-sm font-bold tracking-[0.3em] uppercase mb-3">
            Simple Pricing
          </p>
          <h2 className="section-title text-white mb-4">
            Choose Your <span className="gradient-text">Plan</span>
          </h2>
          <p className="section-subtitle mx-auto">
            No hidden costs. Two options — pick the one that suits your commitment level.
          </p>
        </ScrollReveal>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">

          {/* ── Monthly Plan ── */}
          <ScrollReveal delay={0}>
            <div className="relative rounded-3xl bg-gradient-to-b from-dark-600 to-dark-700 border border-white/10 p-7 shadow-xl overflow-hidden h-full flex flex-col">
              {/* Top glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

              <div className="mb-5">
                <h3 className="font-display text-2xl text-white tracking-wider uppercase mb-1">
                  Monthly
                </h3>
                <p className="text-white/40 text-sm">Flexible. Cancel anytime.</p>
              </div>

              {/* Price */}
              <div className="flex items-end gap-1.5 mb-6">
                <span className="text-white/50 text-lg font-light">₹</span>
                <span className="font-display text-6xl text-white leading-none tracking-wider">1,999</span>
                <span className="text-white/50 text-sm mb-2">/month</span>
              </div>

              {/* Features */}
              <ul className="space-y-2.5 mb-8 flex-1">
                {includes.map((item) => (
                  <li key={item.text} className="flex items-center gap-3 text-white/70 text-sm">
                    <span className="text-base">{item.icon}</span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                id="plans-cta-monthly"
                href="#contact"
                className="block w-full text-center py-3.5 border-2 border-white/20 hover:border-brand-blue text-white font-bold rounded-xl transition-all duration-300 hover:text-brand-blue"
              >
                Get Started
              </a>
              <p className="text-center text-white/25 text-xs mt-3">No contracts. Cancel anytime.</p>
            </div>
          </ScrollReveal>

          {/* ── 3-Month Bundle — recommended ── */}
          <ScrollReveal delay={120}>
            <div className="relative rounded-3xl bg-gradient-to-b from-dark-600 to-dark-700 border border-brand-blue/30 p-7 shadow-2xl shadow-brand-blue/10 overflow-hidden h-full flex flex-col hover:shadow-brand-blue/20 transition-all duration-500">
              {/* Top glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-60 h-px bg-gradient-to-r from-transparent via-brand-blue to-transparent" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-16 bg-brand-blue/10 blur-2xl" />

              {/* Badges row */}
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <span className="inline-flex items-center gap-1 bg-brand-blue/10 border border-brand-blue/25 text-brand-blue text-[10px] font-bold tracking-wider uppercase rounded-full px-3 py-1">
                  🔥 Best Value
                </span>
                <span className="inline-flex items-center gap-1 bg-red-500/10 border border-red-500/25 text-red-400 text-[10px] font-bold tracking-wider uppercase rounded-full px-3 py-1">
                  <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
                  4 spots left
                </span>
              </div>

              <div className="mb-4">
                <h3 className="font-display text-2xl text-white tracking-wider uppercase mb-1">
                  3-Month Bundle
                </h3>
                <p className="text-white/40 text-sm">Full 90-day transformation.</p>
              </div>

              {/* Price */}
              <div className="mb-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white/30 text-sm line-through">₹5,997</span>
                  <span className="bg-green-500/15 border border-green-500/25 text-green-400 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full">Save ₹998</span>
                </div>
                <div className="flex items-end gap-1.5 mb-1">
                  <span className="text-white/50 text-lg font-light">₹</span>
                  <span className="font-display text-6xl text-white leading-none tracking-wider">4,999</span>
                </div>
                <p className="text-white/30 text-xs mb-5">one-time · ≈ ₹1,666/month</p>
              </div>

              {/* Bundle perks */}
              <ul className="space-y-2.5 mb-8 flex-1">
                {bundlePerks.map((item) => (
                  <li key={item.text} className="flex items-center gap-3 text-white/80 text-sm">
                    <span className="text-base">{item.icon}</span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                id="plans-cta-bundle"
                href="#contact"
                className="block w-full text-center btn-primary rounded-xl"
              >
                Start My Transformation
              </a>
              <p className="text-center text-white/30 text-xs mt-3">90-day money back guarantee.</p>
            </div>
          </ScrollReveal>
        </div>

        {/* Guarantee strip */}
        <ScrollReveal delay={200} className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 bg-dark-700 border border-white/5 rounded-2xl px-6 py-4">
            <span className="text-3xl">💯</span>
            <div className="text-left">
              <p className="text-white font-semibold text-sm">90-Day Money Back Guarantee</p>
              <p className="text-white/40 text-xs">If you follow the plan and see no results, you get a full refund.</p>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  )
}
