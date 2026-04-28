/**
 * components/StickyBar.jsx
 * Thin sticky conversion bar that slides in from the top
 * after the user scrolls past the hero (~400px).
 */
import { useState, useEffect } from 'react'

export default function StickyBar() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const handler = () => {
      setVisible(window.scrollY > 400)
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  if (dismissed) return null

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-[60] transition-transform duration-500 ease-out ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="bg-gradient-to-r from-brand-blue-dark via-brand-blue to-brand-blue-light">
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">

          {/* Left — urgency message */}
          <div className="flex items-center gap-2 min-w-0">
            <span className="shrink-0 text-base">🔥</span>
            <p className="text-white text-xs sm:text-sm font-semibold truncate">
              <span className="hidden sm:inline">Limited spots: </span>
              Only <span className="font-black underline decoration-white/60">4 openings</span> left this month
            </p>
          </div>

          {/* Right — CTA + close */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              id="sticky-bar-cta"
              href="#contact"
              className="inline-flex items-center gap-1.5 bg-white text-brand-blue-dark text-xs font-black px-4 py-1.5 rounded-full hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Start Now
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <button
              onClick={() => setDismissed(true)}
              className="text-white/70 hover:text-white transition-colors p-1"
              aria-label="Dismiss"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
