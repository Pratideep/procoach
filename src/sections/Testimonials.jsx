/**
 * sections/Testimonials.jsx
 * Social proof — real client quotes in a static, readable grid.
 * (Was an auto-scrolling marquee, which hurt readability and surfaced the
 * now-removed padded entries; depth > motion for a paid offer.)
 */
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
    <div className="h-full bg-dark-700 border border-white/8 rounded-2xl p-6 hover:border-brand-blue/30 transition-colors duration-300">
      <Stars count={t.stars} />
      <p className="text-white/75 text-sm leading-relaxed mb-5">
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
  return (
    <section id="testimonials" className="bg-dark-900 py-20 md:py-28 relative">
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

      {/* Curated grid — readable, static, real clients only */}
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.id} delay={i * 80} direction="up">
              <TestimonialCard t={t} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
