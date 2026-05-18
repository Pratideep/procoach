/**
 * sections/Hero.jsx
 * Full-viewport hero with headline, sub-text, dual CTAs, animated stats,
 * social proof badge, and an animated background.
 */
import { useState, useEffect, useRef } from 'react'
import { buildWhatsAppUrl } from '../utils/whatsapp'
import { ShieldCheck, ArrowRight } from 'lucide-react'
import { CTA_LABEL, CTA_HREF } from '../utils/cta'
import { trackCta } from '../utils/analytics'
import { STATS, showRating } from '../utils/stats'
import coachFront from '../assets/coach/front.png'

// Stat items shown below the headline — all values from the single source of truth
const stats = [
  { value: parseInt(STATS.clients, 10), suffix: '+', label: 'Clients Coached' },
  { value: STATS.avgResultWeeks, suffix: ' wks', label: 'To Visible Results' },
  { value: parseInt(STATS.personalised, 10), suffix: '%', label: 'Personalised Plans' },
]

// Animated counter hook — triggers on first intersection
function useCounter(target, suffix) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const duration = 1400
          const steps = 50
          const increment = target / steps
          let current = 0
          const timer = setInterval(() => {
            current += increment
            if (current >= target) { setCount(target); clearInterval(timer) }
            else setCount(Math.floor(current))
          }, duration / steps)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return { count, ref }
}

function AnimatedStat({ value, suffix, label }) {
  const { count, ref } = useCounter(value, suffix)
  return (
    <div ref={ref}>
      <p className="font-display text-4xl text-brand-blue tracking-wider">
        {count}{suffix}
      </p>
      <p className="text-white/50 text-xs font-medium uppercase tracking-wider mt-0.5">{label}</p>
    </div>
  )
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-dark-900"
    >
      {/* ── Background decorations ──────────────────────────────────── */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-blue/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Grid lines overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* ── Content ─────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10 w-full pt-24 pb-12 flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-0">

        {/* Left — text */}
        <div className="flex-1 text-center lg:text-left">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-brand-blue/10 border border-brand-blue/30 rounded-full px-4 py-1.5 mb-5 animate-fade-in">
            <span className="w-2 h-2 bg-brand-blue rounded-full animate-pulse" />
            <span className="text-brand-blue text-sm font-semibold tracking-wide uppercase">
              Online Fitness Coaching
            </span>
          </div>

          {/* Social proof pill */}
          <div className="flex justify-center lg:justify-start mb-5">
            <div className="inline-flex items-center gap-2 bg-dark-700 border border-white/10 rounded-full px-4 py-2">
              {/* Stars */}
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              {showRating && <span className="text-white font-bold text-sm">{STATS.rating}</span>}
              <span className="text-white/40 text-xs">{showRating ? '· ' : ''}{STATS.clients} transformations</span>
            </div>
          </div>

          {/* Main headline */}
          <h1
            className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-8xl xl:text-9xl leading-none tracking-wide uppercase mb-4"
            style={{ animationDelay: '100ms' }}
          >
            <span className="block text-white">Lose Fat &amp;</span>
            <span className="block gradient-text">Build Muscle</span>
            <span className="block text-white">In 90 Days</span>
          </h1>

          <p className="text-white/60 text-lg md:text-xl max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed font-light">
            For busy men who want real results without living in the gym —
            personalised training + diet, weekly coaching over WhatsApp,
            and a 90-day money-back guarantee.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a
              id="hero-cta-start"
              href={CTA_HREF}
              onClick={() => trackCta('hero')}
              className="btn-primary text-base"
            >
              {CTA_LABEL}
              <ArrowRight className="w-5 h-5" strokeWidth={2} />
            </a>
            <a
              id="hero-cta-whatsapp"
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline text-base"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Message the Coach
            </a>
          </div>

          {/* Animated stats row */}
          <div className="flex gap-8 mt-12 justify-center lg:justify-start">
            {stats.map((s) => (
              <AnimatedStat key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
            ))}
          </div>
        </div>

        {/* Right — coach photo */}
        <div className="flex-1 flex justify-center lg:justify-end relative">
          {/* Glow behind photo */}
          <div className="absolute w-72 h-72 bg-brand-blue/20 rounded-full blur-3xl" />
          <div className="relative w-72 md:w-80 lg:w-96">
            {/* Decorative ring */}
            <div className="absolute inset-0 rounded-2xl border-2 border-brand-blue/20 rotate-3 scale-105" />
            <img
              src={coachFront}
              alt="Coach Pratideep Naik"
              width={384}
              height={600}
              fetchPriority="high"
              decoding="async"
              className="relative rounded-2xl object-contain object-center w-full max-h-[600px] shadow-2xl shadow-black/60"
            />
            {/* Badge overlay */}
            <div className="absolute -bottom-4 -left-4 bg-dark-700 border border-white/10 rounded-xl px-4 py-3 shadow-xl">
              <p className="flex items-center gap-1.5 text-brand-green-light font-bold text-sm">
                <ShieldCheck className="w-4 h-4" strokeWidth={2.5} /> 90-Day Guarantee
              </p>
              <p className="text-white/60 text-xs mt-0.5">Real results or your money back</p>
            </div>

            {/* Social-proof pill (scarcity lives only in the sticky bar + Plans) */}
            <div className="absolute -top-4 -right-4 bg-dark-700 border border-brand-blue/30 rounded-xl px-3 py-2 shadow-xl animate-float">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-brand-blue rounded-full animate-pulse" />
                <p className="text-brand-blue font-bold text-xs">{STATS.clients} transformed</p>
              </div>
              <p className="text-white/40 text-[10px] mt-0.5">Real clients</p>
            </div>
          </div>
        </div>

      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40">
        <span className="text-xs text-white uppercase tracking-widest">Scroll</span>
        <div className="w-px h-8 bg-white/40 animate-bounce-slow" />
      </div>
    </section>
  )
}
