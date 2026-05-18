/**
 * sections/Qualifier.jsx
 * "Is this for you?" — sits right before the offer. Honest qualification
 * raises lead quality and, counter-intuitively, conversion: the right
 * people self-identify and the wrong ones opt out before wasting a consult.
 */
import { Check, X } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'
import { CTA_LABEL, CTA_HREF } from '../utils/cta'
import { trackCta } from '../utils/analytics'

const forYou = [
  'You\'re a busy professional and "find more time" isn\'t realistic advice',
  'You\'ve tried random plans and want one built around your actual life',
  'You\'ll commit to ~30–45 min, 3–5 days a week, and weekly check-ins',
  'You want accountability, not just a PDF you\'ll never open',
]

const notForYou = [
  'You want an overnight shortcut with zero effort',
  'You won\'t follow a plan or send weekly progress updates',
  'You\'re looking for the cheapest option over the right one',
  'You expect results without changing how you eat or train',
]

export default function Qualifier() {
  return (
    <section id="who-its-for" className="bg-dark-900 py-20 md:py-28 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-brand-blue/20 to-transparent" />

      <div className="max-w-5xl mx-auto px-5 md:px-10">
        <ScrollReveal className="text-center mb-14">
          <p className="text-brand-blue text-sm font-bold tracking-[0.3em] uppercase mb-3">
            Honest Fit Check
          </p>
          <h2 className="section-title text-white mb-4">
            Is This <span className="gradient-text">For You?</span>
          </h2>
          <p className="section-subtitle mx-auto">
            I only take on people I can genuinely get results for. Be honest
            with yourself here — it saves us both time.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* For you */}
          <ScrollReveal direction="left">
            <div className="h-full bg-dark-700 border border-brand-green/25 rounded-2xl p-7">
              <h3 className="flex items-center gap-2 font-display text-2xl text-white tracking-wider uppercase mb-5">
                <span className="w-8 h-8 rounded-full bg-brand-green/15 flex items-center justify-center">
                  <Check className="w-4 h-4 text-brand-green-light" strokeWidth={3} />
                </span>
                This is for you
              </h3>
              <ul className="space-y-3">
                {forYou.map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-white/70 text-sm leading-relaxed">
                    <Check className="w-4 h-4 text-brand-green-light shrink-0 mt-0.5" strokeWidth={2.5} />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Not for you */}
          <ScrollReveal direction="right" delay={120}>
            <div className="h-full bg-dark-700 border border-white/8 rounded-2xl p-7">
              <h3 className="flex items-center gap-2 font-display text-2xl text-white/80 tracking-wider uppercase mb-5">
                <span className="w-8 h-8 rounded-full bg-red-500/15 flex items-center justify-center">
                  <X className="w-4 h-4 text-red-400" strokeWidth={3} />
                </span>
                This isn't for you
              </h3>
              <ul className="space-y-3">
                {notForYou.map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-white/45 text-sm leading-relaxed">
                    <X className="w-4 h-4 text-red-400/70 shrink-0 mt-0.5" strokeWidth={2.5} />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={200} className="text-center mt-12">
          <p className="text-white/60 text-base mb-4">Sound like you? Then let's build your plan.</p>
          <a
            href={CTA_HREF}
            onClick={() => trackCta('qualifier')}
            className="btn-primary text-base"
          >
            {CTA_LABEL}
          </a>
        </ScrollReveal>
      </div>
    </section>
  )
}
