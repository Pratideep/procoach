/**
 * utils/config.js
 * Owner-set switches. Everything here is OFF by default and degrades
 * gracefully — the site is fully functional with all of these empty.
 * Fill one in and the related UI turns on automatically (no code changes).
 */

// 30–60s coach intro/welcome video. Accepts a YouTube, Vimeo, or direct
// .mp4 URL. Empty = no video block is rendered.
// Examples:
//   'https://www.youtube.com/embed/XXXXXXXXXXX'
//   'https://player.vimeo.com/video/XXXXXXXXX'
//   'https://.../intro.mp4'
export const INTRO_VIDEO_URL = ''

// Calendly (or any scheduling) link for the free consult call. When set,
// the post-submit success state offers "Book your free consult" so the
// "free call" promise becomes a real booking instead of just WhatsApp.
// Example: 'https://calendly.com/pratideep/consult'
export const CALENDLY_URL = ''

export const hasIntroVideo = Boolean(INTRO_VIDEO_URL)
export const hasCalendly = Boolean(CALENDLY_URL)
