/**
 * sections/Transformations.jsx
 * Transformation showcase with:
 *  - Filter tabs (All / Front / Back)
 *  - Animated stat counters
 *  - Clickable cards that open full-screen Lightbox
 *  - Swipeable Lightbox with CTA inside
 *  - Drag hint tooltip on first card
 *  - CTA banner at the bottom
 */
import { useState, useEffect, useRef } from 'react'
import { Sparkles, User, RefreshCw, Star } from 'lucide-react'
import BeforeAfterSlider from '../components/BeforeAfterSlider'
import Lightbox from '../components/Lightbox'
import ScrollReveal from '../components/ScrollReveal'
import { transformations } from '../utils/transformations'
import { STATS } from '../utils/stats'
import { CTA_LABEL, CTA_HREF } from '../utils/cta'

// ── Animated stat counter ─────────────────────────────────────────────────────
function StatCounter({ target, suffix = '', label }) {
  const [count, setCount] = useState(0)
  const ref     = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const steps = 60
          const increment = target / steps
          let current = 0
          const timer = setInterval(() => {
            current += increment
            if (current >= target) { setCount(target); clearInterval(timer) }
            else setCount(Math.floor(current))
          }, 1500 / steps)
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
      className={`inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 ${
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
function TransformationCard({ t, index, showHint, onClick }) {
  return (
    <ScrollReveal delay={index * 80} direction="up">
      <div
        className={`group relative rounded-2xl overflow-hidden border bg-dark-700 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)] cursor-pointer ${
          t.isCoach
            ? 'border-yellow-500/40 hover:border-yellow-400/60 shadow-[0_0_30px_rgba(234,179,8,0.08)]'
            : 'border-white/5 hover:border-brand-blue/40'
        }`}
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onClick()}
        aria-label={`View ${t.name} transformation`}
      >
        {/* Coach badge */}
        {t.isCoach && (
          <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 bg-yellow-500/90 backdrop-blur-sm text-dark-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg pointer-events-none">
            <Star className="w-3 h-3 fill-current" strokeWidth={0} /> Coach's Journey
          </div>
        )}

        {/* Tap/click hint */}
        {showHint && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 bg-black/80 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full border border-white/10 pointer-events-none animate-bounce-slow">
            <svg className="w-3.5 h-3.5 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Tap to view full screen
          </div>
        )}

        {/* Before/After slider preview */}
        <BeforeAfterSlider
          before={t.before}
          after={t.after}
          alt={`${t.name} transformation`}
        />

        {/* Gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-dark-700 to-transparent pointer-events-none" />

        {/* Info strip */}
        <div className="px-5 py-4 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                t.isCoach
                  ? 'bg-yellow-500/20 border border-yellow-500/40 text-yellow-400'
                  : 'bg-brand-blue/20 border border-brand-blue/30 text-brand-blue'
              }`}>
                {t.name[0]}
              </span>
              <h3 className="font-bold text-white text-base truncate">{t.name}</h3>
              <span className="text-white/25 text-xs">·</span>
              <span className="text-white/40 text-xs font-medium shrink-0">{t.view} view</span>
            </div>
            <p className="text-white/45 text-xs leading-snug line-clamp-1">{t.caption}</p>
          </div>
          <div className="shrink-0 text-center bg-dark-500 border border-white/8 rounded-xl px-3 py-2">
            <p className={`font-display text-xl leading-none tracking-wider ${t.isCoach ? 'text-yellow-400' : 'text-brand-blue'}`}>
              {t.duration.split(' ')[0]}
            </p>
            <p className="text-white/30 text-[10px] uppercase tracking-wider">
              {t.duration.split(' ')[1] || 'wks'}
            </p>
          </div>
        </div>
      </div>
    </ScrollReveal>
  )
}

// ── Main section ─────────────────────────────────────────────────────────────
const FILTERS = ['All', 'Front', 'Back']

export default function Transformations() {
  const [activeFilter, setActiveFilter]         = useState('All')
  const [lightboxIndex, setLightboxIndex]       = useState(null)

  const filtered = activeFilter === 'All'
    ? transformations
    : transformations.filter((t) => t.view === activeFilter)

  // Build lightbox items from current filtered list
  const lightboxItems = filtered.map(t => ({
    before:   t.before,
    after:    t.after,
    name:     t.name,
    caption:  t.caption,
    duration: t.duration,
  }))

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
            Real clients, same proven system. Drag any slider to compare —
            tap a card for the full-screen view.
          </p>

          {/* Filter pills */}
          <div className="flex justify-center gap-2 flex-wrap">
            {FILTERS.map((f) => (
              <FilterPill
                key={f}
                active={activeFilter === f}
                onClick={() => setActiveFilter(f)}
              >
                {f === 'All'
                  ? <><Sparkles className="w-3.5 h-3.5" strokeWidth={2.5} /> All</>
                  : f === 'Front'
                  ? <><User className="w-3.5 h-3.5" strokeWidth={2.5} /> Front</>
                  : <><RefreshCw className="w-3.5 h-3.5" strokeWidth={2.5} /> Back</>}
              </FilterPill>
            ))}
          </div>
        </ScrollReveal>

        {/* ── Stats counters row ─────────────────────────────────────── */}
        <ScrollReveal className="grid grid-cols-3 gap-4 md:gap-8 mb-12 bg-dark-700/60 border border-white/5 rounded-2xl py-6 px-4 md:px-10">
          <StatCounter target={parseInt(STATS.clients, 10)} suffix="+" label="Clients Coached" />
          <StatCounter target={STATS.avgResultWeeks} suffix=" wk" label="Avg. Result Time" />
          <StatCounter target={parseInt(STATS.personalised, 10)} suffix="%" label="Personalised Plans" />
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
                onClick={() => setLightboxIndex(i)}
              />
            ))}
          </div>
        )}

        {/* ── CTA banner ─────────────────────────────────────────────── */}
        <ScrollReveal delay={200} className="mt-14">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-blue-dark via-brand-blue to-brand-blue-light opacity-90" />
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
                  Join {STATS.clients} men who transformed with Coach Pratideep Naik.
                </p>
              </div>
              <div className="flex gap-3 shrink-0">
                <a
                  href={CTA_HREF}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-brand-blue-dark font-bold text-sm rounded-full hover:scale-105 transition-all duration-300 shadow-xl"
                >
                  {CTA_LABEL} →
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>

      </div>

      {/* ── Lightbox ───────────────────────────────────────────────────── */}
      {lightboxIndex !== null && (
        <Lightbox
          items={lightboxItems}
          startIndex={lightboxIndex}
          mode="transformation"
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </section>
  )
}
