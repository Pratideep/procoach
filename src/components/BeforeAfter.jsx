/**
 * components/BeforeAfter.jsx
 * Static side-by-side before/after — both full images always visible
 * (object-contain, nothing cropped, no slider/swipe to operate).
 *
 * Props:
 *  before, after — image src strings
 *  alt           — accessible label
 *  full          — taller layout for the Lightbox detail view
 */
export default function BeforeAfter({ before, after, alt = '', full = false }) {
  const cell = full
    ? 'h-[58vh] max-h-[calc(100vh-240px)]'
    : 'aspect-[3/4]'

  const Img = ({ src, label, side }) => (
    <figure className={`relative ${cell} bg-dark-900 overflow-hidden`}>
      <img
        src={src}
        alt={`${label} – ${alt}`}
        className="absolute inset-0 w-full h-full object-contain"
        loading="lazy"
        decoding="async"
        draggable={false}
      />
      <figcaption
        className={`absolute top-3 ${side === 'left' ? 'left-3 bg-black/80' : 'right-3 bg-brand-blue/90'} text-white text-xs font-bold px-2.5 py-1 rounded-full tracking-wider`}
      >
        {label}
      </figcaption>
    </figure>
  )

  return (
    <div className="grid grid-cols-2 gap-1 rounded-xl overflow-hidden bg-dark-900">
      <Img src={before} label="BEFORE" side="left" />
      <Img src={after} label="AFTER" side="right" />
    </div>
  )
}
