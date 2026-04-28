/**
 * sections/Transformations.jsx
 * Redesigned transformation showcase with:
 *  - Filter tabs (All / Front / Back)
 *  - Animated stat counters
 *  - Rich cards with drag slider + metadata strip
 *  - Drag hint tooltip on first card
 *  - CTA banner at the bottom
 */
import { useState, useEffect, useRef } from 'react'
import BeforeAfterSlider from '../components/BeforeAfterSlider'
import ScrollReveal from '../components/ScrollReveal'
import { transformations } from '../utils/transformations'
import { buildWhatsAppUrl } from '../utils/whatsapp'

// ── Animated stat counter ─────────────────────────────────────────────────────
function StatCounter({ target, suffix = '', label }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const duration = 1500
          const steps = 60
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

  return (
    <div ref={ref} className="text-center">
      <p className="font-display text-5xl md:text-6xl text-brand-blue tracking-wider leading-none">
        {count}{suffix}
      </p>
      <p className="text-white/40 text-xs font-semibold uppercase tracking-[0.2em] mt-2">{label}</p>
    </div>
  )
}

// ── Filter pill button ────────────────────────────────────────────────────────
function FilterPill({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 ${
        active
          ? 'bg-brand-blue text-white shadow-[0_0_20px_rgba(59,130,246,0.4)]'
          : 'bg-dark-600 text-white/50 hover:text-white border border-white/10 hover:border-white/30'
      }`}
    >
      {children}
    </button>
  )
}

// ── Transformation card ───────────────────────────────────────────────────────
function TransformationCard({ t, index, showHint }) {
  return (
    <ScrollReveal delay={index * 80} direction="up">
      <div className="group relative rounded-2xl overflow-hidden border border-white/5 hover:border-brand-blue/40 bg-dark-700 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)]">

        {/* Drag hint tooltip — shown only on first card */}
        {showHint && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 bg-black/80 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full border border-white/10 pointer-events-none animate-bounce-slow">
            <svg className="w-3.5 h-3.5 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
            </svg>
            Drag to compare
          </div>
        )}

        {/* Before/After slider */}
        <BeforeAfterSlider
          before={t.before}
          after={t.after}
          alt={`${t.name} transformation`}
        />

        {/* Gradient overlay into card info */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-dark-700 to-transparent pointer-events-none" />

        {/* Info strip */}
        <div className="px-5 py-4 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              {/* Avatar initial */}
              <span className="w-7 h-7 rounded-full bg-brand-blue/20 border border-brand-blue/30 flex items-center justify-center text-brand-blue text-xs font-bold shrink-0">
                {t.name[0]}
              </span>
              <h3 className="font-bold text-white text-base truncate">{t.name}</h3>
              <span className="text-white/25 text-xs">·</span>
              <span className="text-white/40 text-xs font-medium shrink-0">{t.view} view</span>
            </div>
            <p className="text-white/45 text-xs leading-snug line-clamp-1">{t.caption}</p>
          </div>

          {/* Duration badge */}
          <div className="shrink-0 text-center bg-dark-500 border border-white/8 rounded-xl px-3 py-2">
            <p className="font-display text-brand-blue text-xl leading-none tracking-wider">{t.duration.split(' ')[0]}</p>
            <p className="text-white/30 text-[10px] uppercase tracking-wider">weeks</p>
          </div>
        </div>
      </div>
    </ScrollReveal>
  )
}

// ── Main section ─────────────────────────────────────────────────────────────
const FILTERS = ['All', 'Front', 'Back']

export default function Transformations() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = activeFilter === 'All'
    ? transformations
    : transformations.filter((t) => t.view === activeFilter)

  return (
    <section id="transformations" className="bg-dark-800 relative overflow-hidden py-20 md:py-28">
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-brand-blue/30 to-transparent" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 md:px-10 relative z-10">

        {/* ── Section header ─────────────────────────────────────────── */}
        <ScrollReveal className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-brand-blue/10 border border-brand-blue/20 rounded-full px-4 py-1.5 mb-5">
            <span className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-pulse" />
            <span className="text-brand-blue text-xs font-bold tracking-[0.25em] uppercase">Real Results</span>
          </div>
          <h2 className="section-title text-white mb-4">
            Client <span className="gradient-text">Transformations</span>
          </h2>
          <p className="section-subtitle mx-auto mb-8">
            Every result below was earned with the same proven system.
            Drag the slider to see the change.
          </p>

          {/* Filter pills */}
          <div className="flex justify-center gap-2 flex-wrap">
            {FILTERS.map((f) => (
              <FilterPill
                key={f}
                active={activeFilter === f}
                onClick={() => setActiveFilter(f)}
              >
                {f === 'All' ? '✦ All' : f === 'Front' ? '👤 Front' : '🔁 Back'}
              </FilterPill>
            ))}
          </div>
        </ScrollReveal>

        {/* ── Stats counters row ─────────────────────────────────────── */}
        <ScrollReveal className="grid grid-cols-3 gap-4 md:gap-8 mb-12 bg-dark-700/60 border border-white/5 rounded-2xl py-6 px-4 md:px-10">
          <StatCounter target={50} suffix="+" label="Clients Transformed" />
          <StatCounter target={12} suffix=" wk" label="Avg. Result Time" />
          <StatCounter target={100} suffix="%" label="Personalised Plans" />
        </ScrollReveal>

        {/* ── Cards grid ─────────────────────────────────────────────── */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-white/30 text-lg">No results for this filter.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {filtered.map((t, i) => (
              <TransformationCard
                key={t.id}
                t={t}
                index={i}
                showHint={i === 0}
              />
            ))}
          </div>
        )}

        {/* ── CTA banner ─────────────────────────────────────────────── */}
        <ScrollReveal delay={200} className="mt-14">
          <div className="relative rounded-3xl overflow-hidden">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-blue-dark via-brand-blue to-brand-blue-light opacity-90" />
            {/* Texture overlay */}
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            />
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6 px-8 py-7">
              <div>
                <p className="font-display text-3xl md:text-4xl text-white tracking-wider uppercase leading-tight">
                  Your Transformation<br/>Starts Today
                </p>
                <p className="text-white/80 text-sm mt-1">
                  Join 50+ men who transformed with Coach Pratideep Naik.
                </p>
              </div>
              <div className="flex gap-3 shrink-0">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-brand-blue-dark font-bold text-sm rounded-full hover:scale-105 transition-all duration-300 shadow-xl"
                >
                  Start Now
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/15 hover:bg-white/25 text-white font-bold text-sm rounded-full transition-all duration-300 border border-white/30"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  )
}
