/**
 * utils/analytics.js
 * Provider-agnostic, safe-by-default event tracking for the conversion funnel.
 *
 * Fires to whatever is present on the page — GA4 (`gtag`), Plausible
 * (`plausible`), and/or GTM (`dataLayer`). If none are installed it is a
 * no-op (logs in dev). So this is wired everywhere now and "just works"
 * the moment a snippet is added to index.html — no code changes needed later.
 *
 * To enable: add ONE of these to index.html <head>:
 *   • GA4:        the gtag.js snippet with your G-XXXX id
 *   • Plausible:  <script defer data-domain="yourdomain" src="https://plausible.io/js/script.js"></script>
 *
 * Funnel events used: cta_click, form_submit, whatsapp_open.
 */
export function track(event, props = {}) {
  try {
    if (typeof window === 'undefined') return

    if (typeof window.gtag === 'function') {
      window.gtag('event', event, props)
    }
    if (typeof window.plausible === 'function') {
      window.plausible(event, { props })
    }
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event, ...props })
    }
    if (import.meta.env?.DEV) console.info('[analytics]', event, props)
  } catch {
    /* analytics must never break the UI */
  }
}

/** Convenience for primary CTA clicks. `location` = where it was clicked. */
export const trackCta = (location) => track('cta_click', { location })
