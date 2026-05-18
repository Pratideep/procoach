/**
 * sections/LeadForm.jsx
 * Frictionless lead capture — three tiers of effort:
 *  1. 1-tap WhatsApp (zero form, highest motivation)
 *  2. Quick 3-field form (60 seconds)
 *  3. Full details (expandable, optional)
 *
 * No backend required — sends everything to WhatsApp.
 */
import { useState } from 'react'
import ScrollReveal from '../components/ScrollReveal'
import { WHATSAPP_NUMBER, buildWhatsAppUrl } from '../utils/whatsapp'
import { STATS, showRating } from '../utils/stats'
import { submitLead } from '../utils/leads'
import { track } from '../utils/analytics'

// ── Quick form options ────────────────────────────────────────────────────────
const GOALS = [
  { value: 'Lose Fat',            label: '🔥 Lose Fat' },
  { value: 'Build Muscle',        label: '💪 Build Muscle' },
  { value: 'Body Recomposition',  label: '⚡ Body Recomp' },
  { value: 'Improve Fitness',     label: '🏃 Improve Fitness' },
  { value: 'Increase Strength',   label: '🏋️ More Strength' },
]

// ── WhatsApp message builders ─────────────────────────────────────────────────
function buildQuickMsg(name, goal) {
  return [
    `New Coaching Enquiry — Pratideep Naik`,
    ``,
    `Name: ${name}`,
    `Goal: ${goal}`,
    ``,
    `Hi Pratideep! I want to start my transformation. Please guide me on next steps! 🙏`,
  ].join('\n')
}

// ── Main component ────────────────────────────────────────────────────────────
export default function LeadForm() {
  const [name, setName]       = useState('')
  const [phone, setPhone]     = useState('')
  const [goal, setGoal]       = useState('')
  const [errors, setErrors]   = useState({})
  const [submitted, setSubmitted] = useState(false)

  /* 1-tap direct WhatsApp — no form */
  const handleDirectWhatsApp = () => {
    // Record the intent (no PII available on this path) before handing off.
    submitLead({ source: 'direct_whatsapp' })
    track('whatsapp_open', { source: 'direct_whatsapp' })
    window.open(
      buildWhatsAppUrl('Hi Pratideep! I want to start my fitness transformation. Can we talk?'),
      '_blank',
      'noopener,noreferrer'
    )
  }

  /* Quick 3-field form submit */
  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = {}
    if (!name.trim())             errs.name  = 'Please enter your name'
    if (!goal)                    errs.goal  = 'Please pick a goal'
    if (!phone.trim())            errs.phone = 'Enter your WhatsApp number'
    else if (!/^\d{10}$/.test(phone.trim())) errs.phone = 'Enter a valid 10-digit number'

    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    // Persist the lead FIRST (fire-and-forget with keepalive so it survives the
    // navigation to WhatsApp, and so the popup stays inside the click gesture).
    submitLead({ name: name.trim(), phone: phone.trim(), goal, source: 'quick_form' })
    track('form_submit', { goal })
    track('whatsapp_open', { source: 'quick_form' })

    const msg = buildQuickMsg(name, goal)
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,
      '_blank',
      'noopener,noreferrer'
    )
    setSubmitted(true)
  }

  return (
    <section id="contact" className="bg-dark-900 py-20 md:py-28 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.07)_0%,transparent_65%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 md:px-10 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-start">

          {/* ── Left: copy ─────────────────────────────────────────────── */}
          <ScrollReveal direction="left" className="flex-1">
            <p className="text-brand-blue text-sm font-bold tracking-[0.3em] uppercase mb-3">
              Start Today
            </p>
            <h2 className="section-title text-white mb-6">
              Ready to <span className="gradient-text">Transform?</span>
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-md">
              Message me directly on WhatsApp — or fill the quick form and I'll reach out personally within 24 hours.
            </p>

            {/* Trust signals */}
            <ul className="space-y-3 mb-10">
              {[
                '✅ Free consultation — no commitment',
                '✅ Custom plan, not a template',
                '✅ Results in 90 days or money back',
                '✅ Works around your schedule & diet',
              ].map((t) => (
                <li key={t} className="text-white/70 text-base">{t}</li>
              ))}
            </ul>

            {/* Stat mini-row */}
            <div className="flex gap-8 pt-8 border-t border-white/5">
              {[
                { n: STATS.clients, l: 'Clients Coached' },
                showRating
                  ? { n: `${STATS.rating}★`, l: 'Client Rating' }
                  : { n: `${STATS.avgResultWeeks} wk`, l: 'Avg. Result Time' },
                { n: '90-day', l: 'Guarantee' },
              ].map(({ n, l }) => (
                <div key={l}>
                  <p className="text-white font-display text-2xl tracking-wider">{n}</p>
                  <p className="text-white/30 text-xs mt-1">{l}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* ── Right: CTA tiers ────────────────────────────────────────── */}
          <ScrollReveal direction="right" delay={150} className="flex-1 w-full">
            {submitted ? (
              /* Success state */
              <div className="card-dark p-8 text-center">
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-white font-bold text-2xl mb-2">WhatsApp Opened! 🎉</h3>
                <p className="text-white/60 text-sm mb-6">
                  Your details are pre-filled. Just hit send —<br />
                  Pratideep will reply within 24 hours.
                </p>
                <button
                  className="btn-outline text-sm px-6 py-3"
                  onClick={() => { setSubmitted(false); setName(''); setPhone(''); setGoal(''); setErrors({}) }}
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <div className="space-y-4">

                {/* ── Tier 1: 1-tap WhatsApp (most prominent) ── */}
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#25D366]/20 to-[#128C7E]/20 border border-[#25D366]/40 p-6">
                  <div className="absolute top-4 right-4 bg-[#25D366]/20 border border-[#25D366]/30 text-[#25D366] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                    Fastest
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#25D366]/20 flex items-center justify-center shrink-0">
                      <svg className="w-6 h-6 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-bold text-lg mb-1">Message Coach Directly</h3>
                      <p className="text-white/50 text-sm mb-4">One tap — no form. Opens WhatsApp instantly.</p>
                      <button
                        id="contact-whatsapp-direct"
                        onClick={handleDirectWhatsApp}
                        className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#25D366] hover:bg-[#20b558] text-white font-bold text-base rounded-2xl transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-[#25D366]/20"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                        </svg>
                        Start on WhatsApp Now
                      </button>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-white/8" />
                  <span className="text-white/30 text-xs font-semibold uppercase tracking-widest">or fill quick form</span>
                  <div className="flex-1 h-px bg-white/8" />
                </div>

                {/* ── Tier 2: Quick 3-field form ── */}
                <form
                  id="lead-capture-form"
                  onSubmit={handleSubmit}
                  noValidate
                  className="card-dark p-6 space-y-4"
                >
                  <div>
                    <h3 className="font-display text-xl text-white tracking-wider uppercase mb-0.5">Quick Enquiry</h3>
                    <p className="text-white/30 text-xs">60 seconds · No spam · 100% free</p>
                  </div>

                  {/* Name */}
                  <div>
                    <label htmlFor="qf-name" className="block text-white/50 text-xs font-semibold uppercase tracking-wider mb-1.5">
                      Your Name
                    </label>
                    <input
                      id="qf-name"
                      type="text"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => { setName(e.target.value); setErrors(p => ({ ...p, name: undefined })) }}
                      autoComplete="name"
                      className={`w-full bg-dark-600 border ${errors.name ? 'border-red-500/70' : 'border-white/10 focus:border-brand-blue'} rounded-xl px-4 py-3 text-white/90 text-sm placeholder-white/20 focus:outline-none transition-colors`}
                    />
                    {errors.name && <p className="text-red-400 text-xs mt-1">⚠ {errors.name}</p>}
                  </div>

                  {/* Goal chips */}
                  <div>
                    <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-2">Your Goal</p>
                    <div className="flex flex-wrap gap-2">
                      {GOALS.map((g) => (
                        <button
                          key={g.value}
                          type="button"
                          onClick={() => { setGoal(g.value); setErrors(p => ({ ...p, goal: undefined })) }}
                          className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                            goal === g.value
                              ? 'bg-brand-blue text-white shadow-[0_0_15px_rgba(59,130,246,0.4)]'
                              : 'bg-dark-600 border border-white/10 text-white/60 hover:border-white/30 hover:text-white'
                          }`}
                        >
                          {g.label}
                        </button>
                      ))}
                    </div>
                    {errors.goal && <p className="text-red-400 text-xs mt-1">⚠ {errors.goal}</p>}
                  </div>

                  {/* WhatsApp number */}
                  <div>
                    <label htmlFor="qf-phone" className="block text-white/50 text-xs font-semibold uppercase tracking-wider mb-1.5">
                      WhatsApp Number
                    </label>
                    <input
                      id="qf-phone"
                      type="tel"
                      placeholder="10-digit mobile number"
                      value={phone}
                      onChange={(e) => { setPhone(e.target.value); setErrors(p => ({ ...p, phone: undefined })) }}
                      inputMode="numeric"
                      maxLength={10}
                      autoComplete="tel"
                      className={`w-full bg-dark-600 border ${errors.phone ? 'border-red-500/70' : 'border-white/10 focus:border-brand-blue'} rounded-xl px-4 py-3 text-white/90 text-sm placeholder-white/20 focus:outline-none transition-colors`}
                    />
                    {errors.phone && <p className="text-red-400 text-xs mt-1">⚠ {errors.phone}</p>}
                  </div>

                  {/* Submit */}
                  <button
                    id="form-submit"
                    type="submit"
                    className="btn-primary w-full rounded-xl mt-1 flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    Send via WhatsApp
                  </button>

                  <p className="text-center text-white/25 text-xs">
                    I'll personally contact you within 24 hours 🙏
                  </p>
                </form>

              </div>
            )}
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
