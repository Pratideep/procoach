/**
 * components/StickyBar.jsx
 * Mobile bottom conversion bar.
 *
 * Was a top slide-down bar (z-60) that collided with the fixed Navbar (z-50)
 * and covered the logo on mobile. It is now a BOTTOM bar, mobile-only
 * (`md:hidden` — desktop already has the persistent nav CTA + footer), which
 * is the higher-converting placement and never fights the nav.
 *
 * Scarcity copy is driven by STATS.spotsLeft (single source of truth) and
 * disappears entirely when that is null.
 */
import { useState, useEffect } from 'react'
import { buildWhatsAppUrl } from '../utils/whatsapp'
import { CTA_LABEL, CTA_HREF } from '../utils/cta'
import { trackCta } from '../utils/analytics'
import { STATS } from '../utils/stats'

export default function StickyBar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Appear once the user is past the hero.
    const handler = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <div
      className={`md:hidden fixed inset-x-0 bottom-0 z-50 transition-transform duration-500 ease-out ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="bg-dark-800/95 backdrop-blur-md border-t border-white/10 px-4 py-3 flex items-center gap-3">
        {/* Left — value / honest scarcity */}
        <div className="min-w-0 flex-1">
          <p className="text-white text-sm font-bold leading-tight truncate">
            Start your 90-day transformation
          </p>
          {STATS.spotsLeft != null ? (
            <p className="text-brand-blue text-[11px] font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-pulse" />
              Only {STATS.spotsLeft} coaching spots open
            </p>
          ) : (
            <p className="text-white/45 text-[11px]">Free consultation · no commitment</p>
          )}
        </div>

        {/* Secondary — message the coach */}
        <a
          href={buildWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Message the coach on WhatsApp"
          className="shrink-0 w-11 h-11 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center text-green-400"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </a>

        {/* Primary — same label/destination as every other primary CTA */}
        <a
          id="sticky-bar-cta"
          href={CTA_HREF}
          onClick={() => trackCta('sticky_bar')}
          className="shrink-0 inline-flex items-center gap-1.5 bg-brand-blue text-white text-sm font-bold px-5 py-3 rounded-full shadow-lg active:scale-95 transition-transform"
        >
          {CTA_LABEL}
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </div>
  )
}
