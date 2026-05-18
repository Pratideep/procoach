/**
 * sections/Testimonials.jsx
 * Social proof section — real client quotes with star ratings in an
 * infinite horizontal marquee carousel.
 */
import { useState } from 'react'
import ScrollReveal from '../components/ScrollReveal'
import { STATS, showRating } from '../utils/stats'

// Real client after-photos for avatars
import piyushPhoto  from '../assets/clients/piyush_after1.jpeg'
import vaibhavPhoto from '../assets/clients/vaibhao_front_curr.jpeg'

const testimonials = [
  {
    id: 1,
    name: 'Piyush Meshram',
    duration: '12 Weeks',
    result: 'Lost 8 kg of fat',
    quote:
      'I had tried multiple diets and workout videos before but nothing stuck. Coach Pratideep gave me a plan that fit around my work schedule — and I started seeing results within the first 3 weeks. The daily WhatsApp check-ins kept me honest.',
    stars: 5,
    initials: 'PM',
    photo: piyushPhoto,
  },
  {
    id: 2,
    name: 'Vaibhav Kopare',
    duration: '10 Weeks',
    result: 'Full body recomposition',
    quote:
      'Complete body recomposition in 10 weeks. No gym, no extreme diet. Pratideep adjusted my plan every 4 weeks based on how my body was responding — it never felt like a one-size-fits-all approach. Highly recommend.',
    stars: 5,
    initials: 'VK',
    photo: vaibhavPhoto,
  },
  {
    id: 3,
    name: 'Piyush Meshram',
    duration: '12 Weeks',
    result: 'Visible back definition',
    quote:
      'The back transformation was something I never thought would be possible working from home with no gym. Coach Pratideep\'s programming was spot on. The before/after photos honestly don\'t do it justice — I feel completely different.',
    stars: 5,
    initials: 'PM',
    photo: piyushPhoto,
  },
  {
    id: 4,
    name: 'Vaibhav Kopare',
    duration: '10 Weeks',
    result: 'Stronger + leaner',
    quote:
      'I was sceptical at first — online coaching felt impersonal. But Pratideep replied to every message, every question, every doubt. The weekly measurement tracking showed progress even on weeks when I thought nothing was happening.',
    stars: 5,
    initials: 'VK',
    photo: vaibhavPhoto,
  },
  // Only real, verifiable clients are listed. Padded/anonymous entries were
  // removed — credibility comes from depth, not volume (see IMPROVEMENT_PLAN §9).
]

// Duplicate for seamless infinite scroll
const doubled = [...testimonials, ...testimonials]

function Stars({ count }) {
  return (
    <div className="flex gap-0.5 mb-3">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

function TestimonialCard({ t }) {
  return (
    <div className="flex-shrink-0 w-80 bg-dark-700 border border-white/8 rounded-2xl p-6 mx-3 hover:border-brand-blue/30 transition-colors duration-300">
      <Stars count={t.stars} />
      <p className="text-white/75 text-sm leading-relaxed mb-5 line-clamp-4">
        &ldquo;{t.quote}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        {/* Avatar — real photo if available, else styled initials */}
        {t.photo ? (
          <img
            src={t.photo}
            alt={t.name}
            className="w-10 h-10 rounded-full object-cover object-center border-2 border-brand-blue/40 shrink-0 shadow-md"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-brand-blue/20 border border-brand-blue/30 flex items-center justify-center text-brand-blue text-xs font-bold shrink-0">
            {t.initials}
          </div>
        )}
        <div>
          <p className="text-white font-semibold text-sm">{t.name}</p>
          <p className="text-brand-blue text-xs font-medium">{t.result} · {t.duration}</p>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const [paused, setPaused] = useState(false)

  return (
    <section id="testimonials" className="bg-dark-900 py-20 md:py-28 overflow-hidden relative">
      <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-blue/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-5 md:px-10 mb-12">
        <ScrollReveal className="text-center">
          <p className="text-brand-blue text-sm font-bold tracking-[0.3em] uppercase mb-3">
            Client Reviews
          </p>
          <h2 className="section-title text-white mb-4">
            What Clients Are <span className="gradient-text">Saying</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Real results from real people — coached by Pratideep Naik.
          </p>

          {/* Aggregate rating — only shows a number when a real source exists */}
          <div className="inline-flex items-center gap-3 mt-6 bg-dark-700 border border-white/5 rounded-2xl px-5 py-3">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            {showRating && <span className="text-white font-bold text-lg">{STATS.rating}</span>}
            <span className="text-white/40 text-sm">
              {showRating ? `· ${STATS.clients} clients · ${STATS.ratingSource}` : `${STATS.clients} clients coached`}
            </span>
          </div>
        </ScrollReveal>
      </div>

      {/* Marquee track — tap anywhere to pause on mobile */}
      <div
        className="relative cursor-pointer select-none"
        onClick={() => setPaused(p => !p)}
        aria-label={paused ? 'Resume' : 'Pause scrolling'}
      >
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-dark-900 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-dark-900 to-transparent z-10 pointer-events-none" />

        {/* Row 1 — scrolls left */}
        <div className={`flex mb-4 ${paused ? 'marquee-paused' : 'marquee-left'}`}>
          {doubled.map((t, i) => (
            <TestimonialCard key={`a-${t.id}-${i}`} t={t} />
          ))}
        </div>

        {/* Row 2 — scrolls right */}
        <div className={`flex ${paused ? 'marquee-paused' : 'marquee-right'}`}>
          {[...doubled].reverse().map((t, i) => (
            <TestimonialCard key={`b-${t.id}-${i}`} t={t} />
          ))}
        </div>

        {/* Pause/resume hint — mobile only */}
        <div className="flex justify-center mt-5">
          <div className="inline-flex items-center gap-2 bg-dark-700/80 border border-white/8 rounded-full px-4 py-1.5 text-white/40 text-xs">
            {paused ? (
              <><svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"/></svg> Tap to resume</>
            ) : (
              <><svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"/></svg> Tap to pause</>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
