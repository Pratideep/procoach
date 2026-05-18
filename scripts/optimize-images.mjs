/**
 * scripts/optimize-images.mjs
 * One-time / repeatable downscale + recompress of web image copies in src/assets.
 * Pristine originals are preserved in "asseets for fitness site/".
 *
 * Run: node scripts/optimize-images.mjs
 *
 * Photos are shipped at most ~600px wide in cards and ~1200px in the full-screen
 * lightbox, so a 1600px long edge covers retina + lightbox with headroom.
 */
import sharp from 'sharp'
import { readdir, stat, rename } from 'node:fs/promises'
import { join, extname } from 'node:path'

const ROOTS = ['src/assets/coach', 'src/assets/clients']
const MAX_EDGE = 1600

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name)
    if (entry.isDirectory()) yield* walk(p)
    else yield p
  }
}

const fmt = (n) => (n / 1024 / 1024).toFixed(2) + 'MB'
let beforeTotal = 0
let afterTotal = 0

for (const root of ROOTS) {
  for await (const file of walk(root)) {
    const ext = extname(file).toLowerCase()
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue

    const before = (await stat(file)).size
    beforeTotal += before

    const pipeline = sharp(file).rotate().resize({
      width: MAX_EDGE,
      height: MAX_EDGE,
      fit: 'inside',
      withoutEnlargement: true,
    })

    if (ext === '.png') {
      pipeline.png({ quality: 80, effort: 9, compressionLevel: 9, palette: true })
    } else {
      pipeline.jpeg({ quality: 78, mozjpeg: true })
    }

    const tmp = file + '.tmp'
    await pipeline.toFile(tmp)
    await rename(tmp, file)

    const after = (await stat(file)).size
    afterTotal += after
    console.log(`${file}  ${fmt(before)} -> ${fmt(after)}`)
  }
}

console.log(`\nTOTAL  ${fmt(beforeTotal)} -> ${fmt(afterTotal)}  (${Math.round((1 - afterTotal / beforeTotal) * 100)}% smaller)`)
