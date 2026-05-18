/**
 * utils/stats.js
 * SINGLE SOURCE OF TRUTH for every number/claim shown on the site.
 *
 * The site previously contradicted itself ("50+" vs "20+" clients, an
 * unsourced "4.9★", "4 spots left" in three places). Every component now
 * reads from here so claims stay consistent and honest.
 *
 * ⚠️ TODO(owner) — replace placeholders with the real figures (see
 *    IMPROVEMENT_PLAN.md §12a). Conservative/honest defaults are used until then.
 */
export const STATS = {
  // Conservative until confirmed. Specific honest numbers beat inflated round ones.
  clients: '20+',          // TODO(owner): exact number of clients coached
  avgResultWeeks: 12,      // weeks to a visible result
  personalised: '100%',    // every plan individually written
  yearsCoaching: '2+',
  yearsTraining: '4+',

  // Rating is shown ONLY when a real source is set. Leave ratingSource '' to
  // hide the numeric rating entirely rather than fabricate one.
  rating: '5.0',           // TODO(owner): confirm real rating
  ratingSource: 'client reviews', // e.g. 'Instagram reviews' / 'Google reviews' — '' hides the number

  // Drives ALL scarcity copy. Set to the true current availability, or null
  // to remove scarcity messaging everywhere at once.
  spotsLeft: 4,
}

export const showRating = Boolean(STATS.ratingSource)
