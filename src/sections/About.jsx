/**
 * sections/About.jsx
 * Personal introduction, coaching philosophy, credentials, and mini-stats.
 *
 * Photo display:
 *  - Desktop/tablet (lg+): dual-column vertical auto-scrolling strip
 *  - Mobile (<lg): single-photo horizontal swipe carousel (full width, full body)
 *  - ANY photo tap → opens full-screen gallery lightbox
 */
import { useState, useRef } from 'react'
import { Award, Apple, CalendarDays, Target } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'
import { STATS } from '../utils/stats'
import Lightbox from '../components/Lightbox'

// All coach photos
import coachFront        from '../assets/coach/front.png'
import coachBack         from '../assets/coach/back.jpg'
import coachTriceps      from '../assets/coach/tricpes.jpeg'
import coachLatSpread    from '../assets/coach/lat-spread.jpg'
import coachBackPose     from '../assets/coach/back-pose.jpg'
import coachBackButterfly from '../assets/coach/back-butterfly.jpg'
import coachAesth1       from '../assets/coach/aestheics1.jpg'
import coachAesth2       from '../assets/coach/aestheics2.jpg'
import coachAesth3       from '../assets/coach/aestheics3.jpg'
import coachAesth4       from '../assets/coach/aestheics4.jpg'
import coachAesth5       from '../assets/coach/aestheics5.jpg'

// Ordered: front first, then aesthetic shots, then poses
const allPhotos = [
  { src: coachFront,         alt: 'Coach Pratideep — Front pose' },
  { src: coachAesth1,        alt: 'Coach Pratideep — Aesthetic 1' },
  { src: coachAesth2,        alt: 'Coach Pratideep — Aesthetic 2' },
  { src: coachAesth3,        alt: 'Coach Pratideep — Aesthetic 3' },
  { src: coachBack,          alt: 'Coach Pratideep — Back pose' },
  { src: coachAesth4,        alt: 'Coach Pratideep — Aesthetic 4' },
  { src: coachTriceps,       alt: 'Coach Pratideep — Triceps pose' },
  { src: coachAesth5,        alt: 'Coach Pratideep — Aesthetic 5' },
  { src: coachLatSpread,     alt: 'Coach Pratideep — Lat spread' },
  { src: coachBackPose,      alt: 'Coach Pratideep — Back pose 2' },
  { src: coachBackButterfly, alt: 'Coach Pratideep — Back butterfly' },
]

// Strip columns for desktop scrolling animation
const stripCol1 = [coachFront, coachAesth1, coachBack, coachAesth3, coachLatSpread, coachAesth5]
const stripCol2 = [coachTriceps, coachAesth2, coachBackPose, coachAesth4, coachBackButterfly, coachAesth1]

const journey = [
  { year: '2021', text: 'Started my fitness journey with running, but struggled to see real results.' },
  { year: '2022', text: 'Shifted to proper strength training and nutrition. Began understanding what actually works.' },
  { year: '2023', text: 'Built consistency, improved physique, and started helping friends get results.' },
  { year: '2024', text: '2+ years coaching experience. Helped multiple clients transform using a practical, real-life approach.' },
]

const credentials = [
  { label: 'Certified Coach',                   Icon: Award },
  { label: 'Precision Nutrition',               Icon: Apple },
  { label: `${STATS.yearsTraining} Years Training`, Icon: CalendarDays },
  { label: `${STATS.yearsCoaching} Years Coaching`, Icon: Target },
]

const miniStats = [
  { value: STATS.clients,       label: 'Transformations' },
  { value: STATS.yearsCoaching, label: 'Years Coaching' },
  { value: STATS.yearsTraining, label: 'Years Training' },
]

// ── Mobile swipe carousel ────────────────────────────────────────────────────
function MobileCarousel({ onPhotoTap }) {
  const [current, setCurrent] = useState(0)
  const touchStartX = useRef(null)

  const prev = () => setCurrent(i => (i - 1 + allPhotos.length) % allPhotos.length)
  const next = () => setCurrent(i => (i + 1) % allPhotos.length)

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX }
  const onTouchEnd   = (e) => {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 40) dx < 0 ? next() : prev()
    touchStartX.current = null
  }

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-black/60 bg-dark-900"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Photo */}
      <div
        className="cursor-pointer"
        onClick={() => onPhotoTap(current)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onPhotoTap(current)}
        aria-label="Tap to view full screen"
      >
        <img
          src={allPhotos[current].src}
          alt={allPhotos[current].alt}
          className="w-full aspect-[4/5] object-cover object-top"
          loading="lazy"
          draggable={false}
        />
      </div>

      {/* Tap-to-open hint */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5 pointer-events-none">
        <svg className="w-3 h-3 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        Tap to enlarge
      </div>

      {/* Prev / Next arrows */}
      <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center" aria-label="Previous">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center" aria-label="Next">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {allPhotos.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current ? 'bg-brand-blue w-4 h-1.5' : 'bg-white/30 w-1.5 h-1.5'
            }`}
          />
        ))}
      </div>

      {/* Name badge */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-dark-900/80 backdrop-blur-md border border-white/10 rounded-full px-4 py-1.5 flex items-center gap-2 whitespace-nowrap">
        <span className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-pulse" />
        <span className="text-white font-semibold text-xs tracking-wide">Pratideep Naik</span>
        <span className="text-white/30 text-xs">· Coach</span>
      </div>
    </div>
  )
}

// ── Main section ──────────────────────────────────────────────────────────────
export default function About() {
  const [lightboxIndex, setLightboxIndex] = useState(null)

  return (
    <section id="about" className="bg-dark-800 py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-5 md:px-10">

        {/* Header */}
        <ScrollReveal className="text-center mb-16">
          <p className="text-brand-blue text-sm font-bold tracking-[0.3em] uppercase mb-3">My Story</p>
          <h2 className="section-title text-white mb-2">
            Why I <span className="gradient-text">Coach</span>
          </h2>
          <p className="text-white/40 font-semibold tracking-widest text-sm uppercase mt-3">
            Pratideep Naik · Online Fitness Coach
          </p>
        </ScrollReveal>

        <div className="flex flex-col lg:flex-row gap-12 items-start">

          {/* Left — photos */}
          <ScrollReveal direction="left" className="lg:w-80 xl:w-96 shrink-0 w-full">

            {/* ── MOBILE: swipe carousel ──────────────────────────── */}
            <div className="block lg:hidden">
              <MobileCarousel onPhotoTap={(i) => setLightboxIndex(i)} />
            </div>

            {/* ── DESKTOP: dual-column scrolling strip ────────────── */}
            <div className="hidden lg:block about-strip-wrapper relative h-[540px] overflow-hidden rounded-3xl border border-white/8 shadow-2xl shadow-black/60">
              {/* Fade masks */}
              <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-dark-800 to-transparent z-10 pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-dark-800 to-transparent z-10 pointer-events-none" />

              {/* Tap hint */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-black/70 backdrop-blur-sm text-white text-[11px] font-medium px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5 pointer-events-none whitespace-nowrap">
                <svg className="w-3 h-3 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Tap to enlarge
              </div>

              <div className="flex gap-3 h-full px-3 pt-3">
                {/* Column 1 — scrolls UP */}
                <div className="flex-1 about-strip-up">
                  {[...stripCol1, ...stripCol1].map((src, i) => {
                    const photoIdx = allPhotos.findIndex(p => p.src === src)
                    return (
                      <img
                        key={`col1-${i}`}
                        src={src}
                        alt="Coach Pratideep Naik"
                        className="w-full h-80 object-cover object-top bg-dark-900 rounded-xl mb-3 shadow-lg cursor-pointer hover:opacity-90 transition-opacity"
                        loading="lazy"
                        decoding="async"
                        onClick={() => setLightboxIndex(photoIdx >= 0 ? photoIdx : 0)}
                      />
                    )
                  })}
                </div>

                {/* Column 2 — scrolls DOWN */}
                <div className="flex-1 about-strip-down">
                  {[...stripCol2, ...stripCol2].map((src, i) => {
                    const photoIdx = allPhotos.findIndex(p => p.src === src)
                    return (
                      <img
                        key={`col2-${i}`}
                        src={src}
                        alt="Coach Pratideep Naik"
                        className="w-full h-80 object-cover object-top bg-dark-900 rounded-xl mb-3 shadow-lg cursor-pointer hover:opacity-90 transition-opacity"
                        loading="lazy"
                        decoding="async"
                        onClick={() => setLightboxIndex(photoIdx >= 0 ? photoIdx : 0)}
                      />
                    )
                  })}
                </div>
              </div>

              {/* Name badge */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 bg-dark-900/80 backdrop-blur-md border border-white/10 rounded-full px-5 py-2 flex items-center gap-2 whitespace-nowrap shadow-xl">
                <span className="w-2 h-2 bg-brand-blue rounded-full animate-pulse" />
                <span className="text-white font-semibold text-sm tracking-wide">Pratideep Naik</span>
                <span className="text-white/30 text-xs">· Coach</span>
              </div>
            </div>

            {/* Mini stats */}
            <div className="flex gap-4 mt-6 justify-center lg:justify-start">
              {miniStats.map((s) => (
                <div key={s.label} className="flex-1 bg-dark-700 border border-white/8 rounded-xl py-4 px-3 text-center">
                  <p className="font-display text-2xl text-brand-blue tracking-wider">{s.value}</p>
                  <p className="text-white/40 text-[10px] uppercase tracking-wider mt-1">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Credentials */}
            <div className="flex flex-wrap gap-2 mt-4 justify-center lg:justify-start">
              {credentials.map(({ label, Icon }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 bg-brand-blue/8 border border-brand-blue/20 text-white/70 text-xs font-medium px-3 py-1.5 rounded-full"
                >
                  <Icon className="w-3.5 h-3.5 text-brand-blue" strokeWidth={2} />
                  {label}
                </span>
              ))}
            </div>
          </ScrollReveal>

          {/* Right — text */}
          <div className="flex-1">
            <ScrollReveal direction="right" className="mb-6">
              <p className="text-white/80 text-lg leading-relaxed mb-4">
                I'm <strong className="text-white">Pratideep Naik</strong> — and I've been exactly where you are right now.
                In 2021, I was overweight, out of shape, and had no idea where to start.
                I decided to figure it out — and that decision changed everything.
              </p>
              <p className="text-white/60 text-base leading-relaxed mb-4">
                I went from being embarrassed about my body to building a physique I'm proud of.
                Then I started helping friends do the same — and realised most programs fail people
                not because of the workouts, but because they completely ignore <strong className="text-white">real life</strong>.
              </p>
              <p className="text-white/60 text-base leading-relaxed">
                That's why I built a system around <em>your</em> schedule, your food preferences,
                your equipment (or lack of it). No excuses needed. Just results.
              </p>
            </ScrollReveal>

            {/* Timeline */}
            <ScrollReveal direction="right" delay={150} className="space-y-5 mt-8">
              {journey.map((j) => (
                <div key={j.year} className="flex gap-5 group">
                  <div className="flex flex-col items-center">
                    <span className="font-display text-brand-blue tracking-widest text-xl group-hover:text-brand-blue-light transition-colors">{j.year}</span>
                    <div className="w-px flex-1 bg-white/10 mt-2" />
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed pt-1 pb-4 group-hover:text-white/75 transition-colors">{j.text}</p>
                </div>
              ))}
              <div className="mt-8 pt-6 border-t border-white/5">
                <p className="text-white/80 font-medium italic text-lg leading-relaxed">
                  "Started from confusion. Built through consistency. Proven through results."
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* ── Gallery Lightbox ─────────────────────────────────────────── */}
      {lightboxIndex !== null && (
        <Lightbox
          items={allPhotos}
          startIndex={lightboxIndex}
          mode="gallery"
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </section>
  )
}
