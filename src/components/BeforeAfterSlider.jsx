/**
 * components/BeforeAfterSlider.jsx
 * Interactive drag/touch slider to compare before and after images.
 * Uses object-contain so full body is always visible — no cropping.
 *
 * Props:
 *  before, after — image src strings
 *  alt           — accessible label
 *  fullHeight    — if true (inside Lightbox), expands to fill available height
 */
import { useRef, useState, useCallback } from 'react'

export default function BeforeAfterSlider({ before, after, alt = '', fullHeight = false }) {
  const containerRef = useRef(null)
  const [sliderPct, setSliderPct]   = useState(50)
  const [dragging, setDragging]     = useState(false)
  const [touchActive, setTouchActive] = useState(false)

  const calcPct = useCallback((clientX) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return 50
    return Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100))
  }, [])

  const onMove = useCallback(
    (clientX) => { if (dragging) setSliderPct(calcPct(clientX)) },
    [dragging, calcPct]
  )

  const onTouchMove = useCallback(
    (e) => {
      e.stopPropagation() // prevent lightbox swipe when dragging slider
      if (touchActive) setSliderPct(calcPct(e.touches[0].clientX))
    },
    [touchActive, calcPct]
  )

  const heightClass = fullHeight
    ? 'h-full max-h-[calc(100vh-220px)]'
    : 'aspect-[3/4]'

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${heightClass} overflow-hidden rounded-xl cursor-col-resize select-none bg-dark-900`}
      onMouseMove={(e) => onMove(e.clientX)}
      onMouseUp={() => setDragging(false)}
      onMouseLeave={() => setDragging(false)}
      onTouchMove={onTouchMove}
      onTouchEnd={() => setTouchActive(false)}
    >
      {/* AFTER image — base layer, object-contain keeps full body */}
      <img
        src={after}
        alt={`After – ${alt}`}
        className="absolute inset-0 w-full h-full object-contain"
        loading="lazy"
        draggable={false}
      />

      {/* BEFORE image — clipped by slider */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPct}%` }}
      >
        <img
          src={before}
          alt={`Before – ${alt}`}
          className="absolute inset-0 h-full object-contain"
          style={{ width: containerRef.current?.offsetWidth ?? '100%' }}
          loading="lazy"
          draggable={false}
        />
      </div>

      {/* Labels */}
      <span className="absolute top-3 left-3 bg-black/80 text-white text-xs font-bold px-2.5 py-1 rounded-full tracking-wider z-10 pointer-events-none">
        BEFORE
      </span>
      <span className="absolute top-3 right-3 bg-brand-blue/90 text-white text-xs font-bold px-2.5 py-1 rounded-full tracking-wider z-10 pointer-events-none">
        AFTER
      </span>

      {/* Slider handle */}
      <div
        className="absolute top-0 bottom-0 z-20 flex items-center justify-center"
        style={{ left: `${sliderPct}%`, transform: 'translateX(-50%)' }}
        onMouseDown={() => setDragging(true)}
        onTouchStart={() => setTouchActive(true)}
      >
        <div className="w-0.5 h-full bg-white/80" />
        <div className="absolute w-11 h-11 bg-white rounded-full shadow-2xl flex items-center justify-center gap-0.5 border-2 border-brand-blue">
          <svg className="w-3 h-3 text-brand-blue rotate-180" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
          </svg>
          <svg className="w-3 h-3 text-brand-blue" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
          </svg>
        </div>
      </div>
    </div>
  )
}
