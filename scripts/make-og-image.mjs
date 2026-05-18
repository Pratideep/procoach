/**
 * scripts/make-og-image.mjs
 * Generates public/og-image.jpg (1200×630) — the social-share card.
 * Run: npm run og:image  (re-run if the headline/photo changes)
 */
import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'

const W = 1200
const H = 630

const photo = await sharp('src/assets/coach/front.png')
  .resize({ width: 560, height: H, fit: 'cover', position: 'top' })
  .toBuffer()

// Soft fade so the photo blends into the dark panel on its left edge.
const fade = Buffer.from(
  `<svg width="560" height="${H}"><defs><linearGradient id="g" x1="0" x2="1">
     <stop offset="0" stop-color="#0D0F14" stop-opacity="1"/>
     <stop offset="0.45" stop-color="#0D0F14" stop-opacity="0"/>
   </linearGradient></defs><rect width="560" height="${H}" fill="url(#g)"/></svg>`
)

const text = Buffer.from(`
  <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <style>
      .brand  { fill:#60A5FA; font:700 26px sans-serif; letter-spacing:6px; }
      .h      { fill:#FFFFFF; font:800 76px sans-serif; }
      .accent { fill:#60A5FA; }
      .sub    { fill:#9AA4B2; font:400 28px sans-serif; }
      .chip   { fill:#22C55E; font:700 24px sans-serif; }
    </style>
    <text x="80" y="150" class="brand">PRATIDEEP NAIK</text>
    <text x="78" y="280" class="h">Lose Fat &amp;</text>
    <text x="78" y="362" class="h accent">Build Muscle</text>
    <text x="78" y="444" class="h">In 90 Days</text>
    <text x="80" y="510" class="sub">Online transformation coaching, around your schedule.</text>
    <text x="80" y="565" class="chip">✓ 90-day money-back guarantee</text>
  </svg>`
)

await mkdir('public', { recursive: true })
await sharp({ create: { width: W, height: H, channels: 4, background: '#0D0F14' } })
  .composite([
    { input: photo, left: W - 560, top: 0 },
    { input: fade, left: W - 560, top: 0 },
    { input: text, left: 0, top: 0 },
  ])
  .jpeg({ quality: 82 })
  .toFile('public/og-image.jpg')

console.log('✓ public/og-image.jpg written (1200x630)')
