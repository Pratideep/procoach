/**
 * components/VideoIntro.jsx
 * Coach intro video. Renders nothing until INTRO_VIDEO_URL is set in
 * utils/config.js — so it's safe to leave mounted.
 *
 * Shows a poster + play button; opens the video in a modal. Supports
 * YouTube / Vimeo (iframe) and direct .mp4 (native <video>).
 */
import { useEffect, useState } from 'react'
import { Play, X } from 'lucide-react'
import { INTRO_VIDEO_URL, hasIntroVideo } from '../utils/config'
import { track } from '../utils/analytics'
import poster from '../assets/coach/front.png'

const isFile = /\.(mp4|webm|mov)(\?|$)/i.test(INTRO_VIDEO_URL)

export default function VideoIntro() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  if (!hasIntroVideo) return null

  return (
    <>
      <button
        onClick={() => { setOpen(true); track('intro_video_play') }}
        className="group relative w-full rounded-2xl overflow-hidden border border-white/10 shadow-xl"
        aria-label="Play coach intro video"
      >
        <img
          src={poster}
          alt="Coach Pratideep Naik"
          loading="lazy"
          decoding="async"
          className="w-full max-h-72 object-cover object-top opacity-70 group-hover:opacity-80 transition-opacity"
        />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="w-16 h-16 rounded-full bg-brand-blue flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.6)] group-hover:scale-110 transition-transform">
            <Play className="w-7 h-7 text-white translate-x-0.5 fill-current" strokeWidth={0} />
          </span>
        </span>
        <span className="absolute bottom-3 left-4 text-white/90 text-sm font-semibold">
          Watch my 60-second story
        </span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setOpen(false)}
        >
          <button
            onClick={() => setOpen(false)}
            aria-label="Close video"
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
          >
            <X className="w-5 h-5" strokeWidth={2} />
          </button>
          <div
            className="w-full max-w-3xl aspect-video rounded-xl overflow-hidden bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            {isFile ? (
              <video src={INTRO_VIDEO_URL} controls autoPlay playsInline className="w-full h-full" />
            ) : (
              <iframe
                src={`${INTRO_VIDEO_URL}${INTRO_VIDEO_URL.includes('?') ? '&' : '?'}autoplay=1`}
                title="Coach intro video"
                className="w-full h-full"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </div>
      )}
    </>
  )
}
