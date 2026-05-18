/**
 * utils/transformations.js
 * Centralised data for CLIENT transformation cards.
 * The coach's own transformation now lives in its own dedicated proof
 * section (sections/CoachTransformation.jsx) so it isn't shown twice.
 * Each entry maps a "before" image and an "after" image with metadata.
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


// ── Transformation data ───────────────────────────────────────────────────────
export const transformations = [
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

