/**
 * components/FunnelTracker.jsx
 * Invisible. Emits the events you need to actually see WHERE visitors drop
 * off, so the funnel can be optimised from data instead of guesses:
 *
 *  - section_view  (once per key section, with its id)
 *  - scroll_depth  (25 / 50 / 75 / 100 %, once each)
 *
 * All no-ops until a GA4 / Plausible snippet is added (see analytics.js).
 */
import { useEffect } from 'react'
import { track } from '../utils/analytics'

// Funnel checkpoints in scroll order.
const SECTION_IDS = [
  'hero',
  'coach-transformation',
  'transformations',
  'how-it-works',
  'plans',
  'contact',
]

export default function FunnelTracker() {
  useEffect(() => {
    // ── Section views ───────────────────────────────────────────────
    const seen = new Set()
    const els = SECTION_IDS
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !seen.has(e.target.id)) {
            seen.add(e.target.id)
            track('section_view', { section: e.target.id })
          }
        }
      },
      { threshold: 0.4 }
    )
    els.forEach((el) => io.observe(el))

    // ── Scroll depth ────────────────────────────────────────────────
    const milestones = [25, 50, 75, 100]
    const fired = new Set()
    const onScroll = () => {
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      if (max <= 0) return
      const pct = Math.round((window.scrollY / max) * 100)
      for (const m of milestones) {
        if (pct >= m && !fired.has(m)) {
          fired.add(m)
          track('scroll_depth', { percent: m })
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return null
}
