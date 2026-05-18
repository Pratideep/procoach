/**
 * components/Navbar.jsx
 * Fixed top navigation bar with smooth scroll links, active section
 * highlighting, "Book Free Call" CTA, and mobile hamburger.
 */
import { useState, useEffect } from 'react'
import { buildWhatsAppUrl } from '../utils/whatsapp'
import { CTA_LABEL, CTA_HREF } from '../utils/cta'
import { trackCta } from '../utils/analytics'

// Order mirrors the page's scroll order so the nav reads as the journey.
const links = [
  { label: 'Results', href: '#transformations' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'About', href: '#about' },
  { label: 'Pricing', href: '#plans' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Scroll-spy: highlight the link for the section currently in view.
  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1))
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActiveId(visible.target.id)
      },
      // Bias the trigger band to the upper-middle of the viewport.
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5, 1] }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-dark-900/95 backdrop-blur-md border-b border-white/5 py-3' : 'bg-transparent py-5'
        }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-10 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex flex-col leading-none group" aria-label="Pratideep Naik — Online Transformation Coach">
          <span className="font-display text-2xl tracking-widest text-white group-hover:text-brand-blue transition-colors">
            PRATIDEEP <span className="text-brand-blue">NAIK</span>
          </span>
          <span className="hidden sm:block text-white/40 text-[10px] font-semibold uppercase tracking-[0.25em] mt-0.5">
            Online Transformation Coach
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => {
            const active = activeId === l.href.slice(1)
            return (
              <li key={l.label}>
                <a
                  href={l.href}
                  aria-current={active ? 'true' : undefined}
                  className={`relative text-sm font-medium tracking-wide transition-colors ${
                    active ? 'text-white' : 'text-white/60 hover:text-white'
                  }`}
                >
                  {l.label}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-0.5 rounded-full bg-brand-blue transition-all duration-300 ${
                      active ? 'w-full' : 'w-0'
                    }`}
                  />
                </a>
              </li>
            )
          })}
        </ul>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          {/* WhatsApp quick link */}
          <a
            href={buildWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 text-white/70 hover:text-white text-sm font-medium transition-colors"
          >
            <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            WhatsApp
          </a>

          {/* Primary CTA */}
          <a
            id="nav-cta-book"
            href={CTA_HREF}
            onClick={() => trackCta('nav')}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-blue hover:bg-brand-blue-dark text-white text-sm font-bold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]"
          >
            {CTA_LABEL}
          </a>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          id="nav-menu-toggle"
        >
          <div className={`w-6 h-0.5 bg-white transition-all ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
          <div className={`w-6 h-0.5 bg-white mt-1.5 transition-all ${menuOpen ? 'opacity-0' : ''}`} />
          <div className={`w-6 h-0.5 bg-white mt-1.5 transition-all ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-dark-800 border-t border-white/5 px-5 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-white/80 font-medium text-base"
            >
              {l.label}
            </a>
          ))}
          <a
            href={CTA_HREF}
            onClick={() => setMenuOpen(false)}
            className="btn-primary w-full text-center mt-2"
          >
            {CTA_LABEL}
          </a>
          {/* Secondary: talk to a human */}
          <a
            href={buildWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-center gap-2 text-green-400 font-medium text-sm py-2"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            {/* secondary */}
            Message the coach
          </a>
        </div>
      )}
    </nav>
  )
}
