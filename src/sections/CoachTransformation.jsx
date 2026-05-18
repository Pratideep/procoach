/**
 * sections/CoachTransformation.jsx
 * Proof #2 (right after the hero): the coach transformed himself first.
 * A coach with a visible result is the single strongest trust asset, so it
 * gets its own narrative section instead of being one card in the grid.
 */
import { useState } from 'react'
import { ShieldCheck, ArrowRight } from 'lucide-react'
import BeforeAfterSlider from '../components/BeforeAfterSlider'
import Lightbox from '../components/Lightbox'
import VideoIntro from '../components/VideoIntro'
import ScrollReveal from '../components/ScrollReveal'
import { CTA_LABEL, CTA_HREF } from '../utils/cta'
import { trackCta } from '../utils/analytics'

import coachBefore  from '../assets/coach/before/B612_20190910_165506_165.jpg'
import coachBefore2 from '../assets/coach/before/IMG20240426212821.jpg'
import coachBefore3 from '../assets/coach/before/Screenshot_2023-01-07-20-53-27-78_99c04817c0de5652397fc8b56c3b3817.jpg'
import coachAfter   from '../assets/coach/front.png'

const galleryItems = [
  { src: coachBefore,  alt: 'Coach Pratideep — before, 2019' },
  { src: coachBefore3, alt: 'Coach Pratideep — before, 2023' },
  { src: coachBefore2, alt: 'Coach Pratideep — before, 2024 (early)' },
  { src: coachAfter,   alt: 'Coach Pratideep — current physique' },
]

export default function CoachTransformation() {
  const [lightboxIndex, setLightboxIndex] = useState(null)

  return (
    <section id="coach-transformation" className="bg-dark-900 py-20 md:py-28 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-px bg-gradient-to-r from-transparent via-brand-blue/30 to-transparent" />
      <div className="absolute -top-40 right-0 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 md:px-10 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">

          {/* Left — before/after */}
          <ScrollReveal direction="left" className="w-full lg:w-1/2">
            <div
              className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-black/60 cursor-pointer"
              onClick={() => setLightboxIndex(0)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setLightboxIndex(0)}
              aria-label="View coach transformation full screen"
            >
              <BeforeAfterSlider before={coachBefore} after={coachAfter} alt="Coach Pratideep transformation" />
            </div>

            {/* Extra angles */}
            <div className="grid grid-cols-3 gap-3 mt-3">
              {galleryItems.slice(1).map((g, i) => (
                <img
                  key={g.alt}
                  src={g.src}
                  alt={g.alt}
                  loading="lazy"
                  decoding="async"
                  onClick={() => setLightboxIndex(i + 1)}
                  className="h-36 sm:h-44 w-full object-cover object-top rounded-xl border border-white/8 bg-dark-700 cursor-pointer hover:opacity-90 transition-opacity"
                />
              ))}
            </div>
          </ScrollReveal>

          {/* Right — story */}
          <ScrollReveal direction="right" delay={120} className="w-full lg:w-1/2">
            <p className="text-brand-blue text-sm font-bold tracking-[0.3em] uppercase mb-3">
              Why Trust Me
            </p>
            <h2 className="section-title text-white mb-5">
              I Built This <span className="gradient-text">Myself First</span>
            </h2>
            <p className="text-white/65 text-lg leading-relaxed mb-4">
              In 2019 I was the guy who avoided photos. No coach, no plan, no
              clue — just frustration. It took me years of trial and error to
              figure out what actually works for a normal person with a normal
              schedule.
            </p>
            <p className="text-white/55 text-base leading-relaxed mb-8">
              That hard-won system is exactly what I now build for my clients —
              so they don't lose the years I did. I won't ask you to do anything
              I haven't done myself.
            </p>

            {/* Renders only if INTRO_VIDEO_URL is set (utils/config.js) */}
            <div className="mb-8 empty:mb-0">
              <VideoIntro />
            </div>

            <div className="flex flex-wrap gap-3 mb-8">
              <span className="inline-flex items-center gap-2 bg-brand-green/10 border border-brand-green/25 text-brand-green-light text-sm font-semibold px-4 py-2 rounded-full">
                <ShieldCheck className="w-4 h-4" strokeWidth={2} />
                Coached by someone who's done it
              </span>
            </div>

            <a
              href={CTA_HREF}
              onClick={() => trackCta('coach_transformation')}
              className="btn-primary text-base"
            >
              {CTA_LABEL}
              <ArrowRight className="w-5 h-5" strokeWidth={2} />
            </a>
          </ScrollReveal>
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          items={galleryItems}
          startIndex={lightboxIndex}
          mode="gallery"
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </section>
  )
}
