/**
 * components/BeforeAfterSlider.jsx
 * Interactive drag/touch slider to compare before and after images.
 *
 * In cards (default) the images fill the frame with object-cover (anchored to
 * the top so faces/torsos stay in view) so the photos read big and bold.
 * In the Lightbox (fullHeight) it switches to object-contain so the full
 * body is visible with no cropping for the detailed view.
 *
 * Both layers are the same full-size box; the BEFORE layer is revealed with
 * clip-path, so the two images stay perfectly aligned at any slider position.
 *
 * Props:
 *  before, after — image src strings
 *  alt           — accessible label
 *  fullHeight    — if true (inside Lightbox), expand + show full body (contain)
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
    : 'aspect-[4/5]'

  // Cards fill the frame (bold); lightbox shows the whole body uncropped.
  const imgFit = fullHeight ? 'object-contain' : 'object-cover object-top'

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
      {/* AFTER image — base layer */}
      <img
        src={after}
        alt={`After – ${alt}`}
        className={`absolute inset-0 w-full h-full ${imgFit}`}
        loading="lazy"
        decoding="async"
        draggable={false}
      />

      {/* BEFORE image — same full-size box, revealed via clip-path */}
      <img
        src={before}
        alt={`Before – ${alt}`}
        className={`absolute inset-0 w-full h-full ${imgFit}`}
        style={{ clipPath: `inset(0 ${100 - sliderPct}% 0 0)` }}
        loading="lazy"
        decoding="async"
        draggable={false}
      />

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
