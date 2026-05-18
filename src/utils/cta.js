/**
 * utils/cta.js
 * Single source of truth for the conversion call-to-action.
 *
 * The site previously had 3 different primary labels ("Start My
 * Transformation" / "Book Free Call" / "Get Started") pointing at a mix of
 * the form and raw WhatsApp. Every PRIMARY button now uses one label and
 * goes to ONE place: the Apply/Lead-capture section (#contact), where the
 * lead is captured before the WhatsApp handoff.
 *
 * WhatsApp stays available only as the explicit SECONDARY "talk to a human"
 * path, never as a primary button — so no lead can bypass capture.
 *
 * The label is A/B tested (experiment `primary_cta`). It resolves ONCE at
 * module load and stays a constant, so every primary button across the site
 * shows the same variant and consuming components need no changes.
 */
import { getVariant } from './abtest'

const CTA_LABELS = {
  get_my_free_plan:    'Get My Free Plan',
  start_transformation:'Start My Transformation',
}

export const CTA_LABEL = CTA_LABELS[getVariant('primary_cta')] ?? CTA_LABELS.get_my_free_plan

// Soft/secondary label for "I'd rather just chat" affordances.
export const CTA_SECONDARY_LABEL = 'Message the coach'

// All primary CTAs scroll to the single conversion section.
export const CTA_HREF = '#contact'
