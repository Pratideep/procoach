/**
 * utils/leads.js
 * Captures the lead BEFORE the WhatsApp handoff so a visitor who fills the
 * form but never hits "send" in WhatsApp is no longer lost.
 *
 * Storage = a Google Sheet behind a Google Apps Script Web App (see
 * LEAD_CAPTURE_SETUP.md for the script + 3-click deploy steps).
 *
 * Notes:
 *  - Until LEADS_ENDPOINT is set, submitLead() is a safe no-op (logs in dev)
 *    so the form keeps working before the sheet is wired up.
 *  - We POST as text/plain to avoid a CORS preflight, and use mode:'no-cors'
 *    because Apps Script can't send CORS headers. The response is opaque by
 *    design — we treat "request sent" as success and never block the user;
 *    the WhatsApp open is the real confirmation for them.
 */

// ⚙️ Paste the Apps Script Web App URL here after deploying (see LEAD_CAPTURE_SETUP.md)
export const LEADS_ENDPOINT = ''

/**
 * Best-effort lead persistence. Never throws — capture must never block the
 * conversion. Returns true if a request was dispatched.
 * @param {{name?:string, phone?:string, goal?:string, source:string}} lead
 */
export async function submitLead(lead) {
  const payload = {
    ...lead,
    page: typeof window !== 'undefined' ? window.location.href : '',
    ts: new Date().toISOString(),
  }

  if (!LEADS_ENDPOINT) {
    if (import.meta.env?.DEV) console.info('[leads] no endpoint set — would save:', payload)
    return false
  }

  try {
    await fetch(LEADS_ENDPOINT, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
      keepalive: true, // survives the page navigating to WhatsApp
    })
    return true
  } catch (err) {
    if (import.meta.env?.DEV) console.warn('[leads] submit failed (non-blocking):', err)
    return false
  }
}
