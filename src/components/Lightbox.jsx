/**
 * components/Lightbox.jsx
 * Full-screen swipeable image viewer.
 *
 * Two modes:
 *  - mode="transformation" → both full before/after images side by side
 *  - mode="gallery"        → single images, arrows/swipe to browse
 *
 * Props:
 *  items      — array of { before, after, name, caption, duration } (transformation)
 *               or array of { src, alt } (gallery)
 *  startIndex — which item to open first
 *  mode       — "transformation" | "gallery"
 *  onClose    — callback to close
 */
import { useEffect, useRef, useState, useCallback } from 'react'
import BeforeAfter from './BeforeAfter'
import { buildWhatsAppUrl } from '../utils/whatsapp'

export default function Lightbox({ items = [], startIndex = 0, mode = 'transformation', onClose }) {
  const [current, setCurrent] = useState(startIndex)
  const touchStartX = useRef(null)
  const overlayRef = useRef(null)

  const total = items.length
  const item  = items[current]

  const prev = useCallback(() => setCurrent(i => (i - 1 + total) % total), [total])
  const next = useCallback(() => setCurrent(i => (i + 1) % total), [total])

  /* ── Keyboard navigation ──────────────────────────────────────── */
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape')      onClose()
      if (e.key === 'ArrowLeft')   prev()
      if (e.key === 'ArrowRight')  next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, prev, next])

  /* ── Prevent body scroll while open ──────────────────────────── */
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  /* ── Touch swipe ─────────────────────────────────────────────── */
  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX }
  const onTouchEnd   = (e) => {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 50) dx < 0 ? next() : prev()
    touchStartX.current = null
  }

  if (!item) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] flex flex-col bg-black/95 backdrop-blur-sm"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* ── Top bar ──────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-5 py-4 shrink-0">
        <div className="flex items-center gap-3">
          {mode === 'transformation' && (
            <span className="text-white/50 text-sm">
              {item.name && <span className="text-white font-semibold">{item.name}</span>}
              {item.duration && <span className="text-white/40"> · {item.duration}</span>}
            </span>
          )}
          {mode === 'gallery' && (
            <span className="text-white/50 text-sm">{item.alt || 'Coach Photo'}</span>
          )}
        </div>

        <div className="flex items-center gap-4">
          {/* Dot counter */}
          <div className="flex gap-1.5">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  i === current ? 'bg-brand-blue w-4' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
          {/* Close */}
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── Main image area ───────────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center relative min-h-0 px-4">

        {/* Prev arrow */}
        {total > 1 && (
          <button
            onClick={prev}
            className="absolute left-2 md:left-6 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
            aria-label="Previous"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Content */}
        <div className="w-full max-w-4xl h-full flex items-center justify-center">
          {mode === 'transformation' ? (
            /* Transformation mode — both full images side by side */
            <div className="w-full max-h-[calc(100vh-220px)]">
              <BeforeAfter
                before={item.before}
                after={item.after}
                alt={item.name || ''}
                full
              />
              {item.caption && (
                <p className="text-white/50 text-sm text-center mt-3">{item.caption}</p>
              )}
            </div>
          ) : (
            /* Gallery mode — single image */
            <img
              src={item.src}
              alt={item.alt || 'Coach photo'}
              decoding="async"
              className="max-w-full max-h-[calc(100vh-220px)] object-contain rounded-xl"
              draggable={false}
            />
          )}
        </div>

        {/* Next arrow */}
        {total > 1 && (
          <button
            onClick={next}
            className="absolute right-2 md:right-6 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
            aria-label="Next"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>

      {/* ── Bottom CTA bar ────────────────────────────────────────── */}
      <div className="shrink-0 px-5 py-4 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-white/50 text-sm text-center sm:text-left">
          {mode === 'transformation'
            ? 'Use the arrows to see more results'
            : 'Use the arrows to browse · Tap outside to close'}
        </p>
        <div className="flex gap-3">
          <a
            href={buildWhatsAppUrl('Hi Pratideep! I just saw your transformations and I want to start my own. Can we talk?')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-blue hover:bg-brand-blue-dark text-white font-bold text-sm rounded-full transition-all duration-300 hover:scale-105 shadow-lg shadow-brand-blue/30"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            Start My Transformation
          </a>
        </div>
      </div>
    </div>
  )
}
