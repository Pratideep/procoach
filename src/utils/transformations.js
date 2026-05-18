/**
 * utils/transformations.js
 * Centralised data for all client transformation cards.
 * Each entry maps a "before" image and an "after" image with metadata.
 * Images live in /src/assets/clients/ (clients) and /src/assets/coach/ (coach self)
 */

// ── Import all client images ──────────────────────────────────────────────────
import piyushBefore from '../assets/clients/piyush_before1.jpeg'
import piyushAfter  from '../assets/clients/piyush_after1.jpeg'
import piyushBeforeBack from '../assets/clients/piyush_before_back.jpeg'
import piyushAfterBack  from '../assets/clients/piyush_after_back.jpeg'
import vaibhavBefore from '../assets/clients/vaibhao_prev_front.jpeg'
import vaibhavAfter  from '../assets/clients/vaibhao_front_curr.jpeg'
import vaibhavBeforeBack from '../assets/clients/vaibhav_prev_back.jpeg'
import vaibhavAfterBack  from '../assets/clients/vaibhav_curr_back.jpeg'

// ── Coach self-transformation images ─────────────────────────────────────────
import coachBefore from '../assets/coach/before/B612_20190910_165506_165.jpg'
import coachAfter  from '../assets/coach/front.png'


// ── Transformation data ───────────────────────────────────────────────────────
export const transformations = [
  // ── Coach's own transformation (leads the section) ─────────────────────────
  {
    id: 0,
    name: 'Pratideep Naik',
    duration: '3 Years',
    caption: 'The coach\'s own journey — from struggling to building a physique worth coaching from',
    before: coachBefore,
    after: coachAfter,
    view: 'Front',
    isCoach: true,
  },
  {
    id: 1,
    name: 'Piyush Meshram',
    duration: '12 Weeks',
    caption: 'Lost 8 kg of fat while preserving muscle mass',
    before: piyushBefore,
    after: piyushAfter,
    view: 'Front',
  },
  {
    id: 2,
    name: 'Piyush Meshram',
    duration: '12 Weeks',
    caption: 'Visible back definition after consistent training',
    before: piyushBeforeBack,
    after: piyushAfterBack,
    view: 'Back',
  },
  {
    id: 3,
    name: 'Vaibhav Kopare',
    duration: '10 Weeks',
    caption: 'Complete body recomposition — leaner and stronger',
    before: vaibhavBefore,
    after: vaibhavAfter,
    view: 'Front',
  },
  {
    id: 4,
    name: 'Vaibhav Kopare',
    duration: '10 Weeks',
    caption: 'Significant back-muscle development in 10 weeks',
    before: vaibhavBeforeBack,
    after: vaibhavAfterBack,
    view: 'Back',
  },
]

