/**
 * utils/abtest.js
 * Tiny, dependency-free client-side A/B harness.
 *
 * - A visitor is assigned a stable variant per experiment (persisted in
 *   localStorage) so they see the same thing on every visit.
 * - Assignment fires an `experiment_view` analytics event, so once a GA4 /
 *   Plausible snippet is live you can compare variant → cta_click /
 *   form_submit with zero further code.
 * - Storage blocked / unavailable → everyone gets the control (variant[0]),
 *   so it can never break the page.
 *
 * To add an experiment: add a key here, then read it with getVariant('key').
 * To end one: delete the key (callers fall back to their own default).
 */
import { track } from './analytics'

// variants[0] is always the control.
export const EXPERIMENTS = {
  hero_headline: ['control', 'outcome'],
  primary_cta:   ['get_my_free_plan', 'start_transformation'],
}

function assign(name, variants) {
  const key = `ab_${name}`
  try {
    let v = window.localStorage.getItem(key)
    if (!v || !variants.includes(v)) {
      v = variants[Math.floor(Math.random() * variants.length)]
      window.localStorage.setItem(key, v)
    }
    return v
  } catch {
    return variants[0]
  }
}

const cache = {}

/** Returns the assigned variant string for an experiment (control on miss). */
export function getVariant(name) {
  const variants = EXPERIMENTS[name]
  if (!variants) return undefined
  if (!(name in cache)) {
    cache[name] = assign(name, variants)
    track('experiment_view', { experiment: name, variant: cache[name] })
  }
  return cache[name]
}
