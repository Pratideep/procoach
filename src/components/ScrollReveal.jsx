/**
 * components/ScrollReveal.jsx
 * Lightweight wrapper that animates children into view when they
 * enter the viewport. Uses IntersectionObserver via react-intersection-observer.
 */
import { useInView } from 'react-intersection-observer'

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,        // delay in ms
  direction = 'up', // 'up' | 'left' | 'right' | 'none'
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  const directionMap = {
    up:    'translateY(40px)',
    left:  'translateX(-40px)',
    right: 'translateX(40px)',
    none:  'translateY(0)',
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity:    inView ? 1 : 0,
        transform:  inView ? 'translate(0)' : directionMap[direction],
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}
