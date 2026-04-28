/**
 * utils/whatsapp.js
 * Generates a WhatsApp click-to-chat URL with a pre-filled message.
 */

// ⚙️  Replace with the coach's actual WhatsApp number (with country code, no +/spaces)
export const WHATSAPP_NUMBER = '919096431261'

export const WHATSAPP_DEFAULT_MSG =
  'Hi! I want to start my 90-day fitness transformation. Can you guide me?'

/**
 * Returns a wa.me link with the given message pre-filled.
 * @param {string} [message]
 * @returns {string}
 */
export function buildWhatsAppUrl(message = WHATSAPP_DEFAULT_MSG) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
