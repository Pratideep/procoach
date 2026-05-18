/**
 * sections/Guarantee.jsx
 * Standalone risk-reversal block, placed right after Plans so it lands the
 * moment the visitor is weighing the price.
 */
import { ShieldCheck, ArrowRight } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'
import { CTA_LABEL, CTA_HREF } from '../utils/cta'
import { trackCta } from '../utils/analytics'

export default function Guarantee() {
  return (
    <section id="guarantee" className="bg-dark-800 py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.08)_0%,transparent_65%)] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-5 md:px-10 text-center relative z-10">
        <ScrollReveal>
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-brand-green/12 border border-brand-green/30 text-brand-green-light mb-7">
            <ShieldCheck className="w-10 h-10" strokeWidth={1.8} />
          </div>

          <h2 className="section-title text-white mb-5">
            The 90-Day <span className="text-brand-green-light">Money-Back</span> Guarantee
          </h2>

          <p className="text-white/65 text-lg leading-relaxed mb-4">
            Follow the plan and complete your weekly check-ins. If you don't see
            real, visible progress by Day 90, you get a <strong className="text-white">full refund</strong> — no
            forms, no arguments.
          </p>
          <p className="text-white/45 text-sm leading-relaxed mb-9">
            I can offer this because the system works when you work it. The risk
            sits with me, not you — all you're risking is staying exactly where
            you are today.
          </p>

          <a
            href={CTA_HREF}
            onClick={() => trackCta('guarantee')}
            className="btn-primary text-base"
          >
            {CTA_LABEL}
            <ArrowRight className="w-5 h-5" strokeWidth={2} />
          </a>
          <p className="text-white/30 text-xs mt-4">
            Results may vary and depend on your consistency. Individual commitment required.
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
