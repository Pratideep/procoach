/**
 * components/BeforeAfterSlider.jsx
 * Interactive drag slider to compare before and after images.
 * Pure CSS + JS — no external library needed.
 */
import { useRef, useState, useCallback } from 'react'

export default function BeforeAfterSlider({ before, after, alt = '' }) {
  const containerRef = useRef(null)
  const [sliderPct, setSliderPct] = useState(50) // 0–100
  const [dragging, setDragging] = useState(false)

  /** Calculate slider percentage from pointer/touch X position */
  const calcPct = useCallback((clientX) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return 50
    const pct = ((clientX - rect.left) / rect.width) * 100
    return Math.min(100, Math.max(0, pct))
  }, [])

  const onMove = useCallback(
    (clientX) => { if (dragging) setSliderPct(calcPct(clientX)) },
    [dragging, calcPct]
  )

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[3/4] overflow-hidden rounded-xl cursor-col-resize select-none"
      onMouseMove={(e) => onMove(e.clientX)}
      onMouseUp={() => setDragging(false)}
      onMouseLeave={() => setDragging(false)}
      onTouchMove={(e) => onMove(e.touches[0].clientX)}
      onTouchEnd={() => setDragging(false)}
    >
      {/* AFTER image — full-width base layer */}
      <img
        src={after}
        alt={`After – ${alt}`}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
        draggable={false}
      />

      {/* BEFORE image — clipped by slider position */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPct}%` }}
      >
        <img
          src={before}
          alt={`Before – ${alt}`}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ width: containerRef.current?.offsetWidth ?? '100%' }}
          loading="lazy"
          draggable={false}
        />
      </div>

      {/* Labels */}
      <span className="absolute top-3 left-3 bg-black/70 text-white text-xs font-bold px-2.5 py-1 rounded-full tracking-wider z-10">
        BEFORE
      </span>
      <span className="absolute top-3 right-3 bg-brand-blue/90 text-white text-xs font-bold px-2.5 py-1 rounded-full tracking-wider z-10">
        AFTER
      </span>

      {/* Slider handle */}
      <div
        className="absolute top-0 bottom-0 z-20 flex items-center justify-center"
        style={{ left: `${sliderPct}%`, transform: 'translateX(-50%)' }}
        onMouseDown={() => setDragging(true)}
        onTouchStart={() => setDragging(true)}
      >
        <div className="w-0.5 h-full bg-white/80" />
        <div className="absolute w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center gap-0.5 border-2 border-brand-blue">
          {/* Left arrow */}
          <svg className="w-3 h-3 text-brand-blue rotate-180" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
          </svg>
          {/* Right arrow */}
          <svg className="w-3 h-3 text-brand-blue" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
          </svg>
        </div>
      </div>
    </div>
  )
}
