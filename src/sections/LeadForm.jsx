/**
 * sections/LeadForm.jsx
 * The single conversion point: a real coaching-intake registration form.
 *
 * The FORM is the hero of this section (it was previously buried under a big
 * green "message me on WhatsApp" block). WhatsApp is now a quiet secondary
 * option below it. Required = name, WhatsApp, goal; everything else is
 * optional but captured so the coach gets real context up front.
 *
 * Lead is persisted (utils/leads.js) before the WhatsApp handoff.
 */
import { useState, useRef } from 'react'
import ScrollReveal from '../components/ScrollReveal'
import { WHATSAPP_NUMBER, buildWhatsAppUrl } from '../utils/whatsapp'
import { STATS, showRating } from '../utils/stats'
import { submitLead } from '../utils/leads'
import { track } from '../utils/analytics'
import { CALENDLY_URL, hasCalendly } from '../utils/config'
import { Flame, Dumbbell, Zap, Activity, Weight, Check, AlertCircle } from 'lucide-react'

function FieldError({ children }) {
  return (
    <p className="flex items-center gap-1 text-red-400 text-xs mt-1">
      <AlertCircle className="w-3 h-3 shrink-0" strokeWidth={2.5} />
      {children}
    </p>
  )
}

const GOALS = [
  { value: 'Lose Fat',           label: 'Lose Fat',        Icon: Flame },
  { value: 'Build Muscle',       label: 'Build Muscle',    Icon: Dumbbell },
  { value: 'Body Recomposition', label: 'Body Recomp',     Icon: Zap },
  { value: 'Improve Fitness',    label: 'Improve Fitness', Icon: Activity },
  { value: 'Increase Strength',  label: 'More Strength',   Icon: Weight },
]

const TRUST = [
  'Free consultation — no commitment',
  'Custom plan, not a template',
  'Results in 90 days or money back',
  'Works around your schedule & diet',
]

const EMPTY = {
  name: '', phone: '', email: '', age: '', gender: '', height: '',
  currentWeight: '', targetWeight: '', goal: '', experience: '',
  daysPerWeek: '', notes: '',
}

// Builds a tidy WhatsApp message, skipping any blank optional fields.
function buildMsg(f) {
  const line = (label, v) => (v ? `${label}: ${v}` : null)
  return [
    `New Coaching Registration — Pratideep Naik`,
    ``,
    line('Name', f.name),
    line('WhatsApp', f.phone),
    line('Email', f.email),
    line('Age', f.age),
    line('Gender', f.gender),
    line('Height (cm)', f.height),
    line('Current weight (kg)', f.currentWeight),
    line('Target weight (kg)', f.targetWeight),
    line('Primary goal', f.goal),
    line('Training experience', f.experience),
    line('Days/week available', f.daysPerWeek),
    line('Notes', f.notes),
    ``,
    `Hi Pratideep! I'd like to register for the 90-day program. Please guide me on next steps.`,
  ].filter(Boolean).join('\n')
}

// Shared field styles
const inputCls = (err) =>
  `w-full bg-dark-600 border ${err ? 'border-red-500/70' : 'border-white/10 focus:border-brand-blue'} rounded-xl px-4 py-3 text-white/90 text-sm placeholder-white/20 focus:outline-none transition-colors`
const labelCls = 'block text-white/55 text-xs font-semibold uppercase tracking-wider mb-1.5'

export default function LeadForm() {
  const [form, setForm]   = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const startedRef = useRef(false)
  const markStart = () => {
    if (!startedRef.current) { startedRef.current = true; track('form_start') }
  }
  const set = (k, v) => {
    markStart()
    setForm((p) => ({ ...p, [k]: v }))
    setErrors((p) => ({ ...p, [k]: undefined }))
  }

  /* Secondary: 1-tap WhatsApp, no form */
  const handleDirectWhatsApp = () => {
    submitLead({ source: 'direct_whatsapp' })
    track('whatsapp_open', { source: 'direct_whatsapp' })
    window.open(
      buildWhatsAppUrl('Hi Pratideep! I want to start my fitness transformation. Can we talk?'),
      '_blank', 'noopener,noreferrer'
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const f = Object.fromEntries(Object.entries(form).map(([k, v]) => [k, String(v).trim()]))
    const errs = {}
    if (!f.name)  errs.name = 'Please enter your name'
    if (!f.goal)  errs.goal = 'Please pick your primary goal'
    if (!f.phone) errs.phone = 'Enter your WhatsApp number'
    else if (!/^\d{10}$/.test(f.phone)) errs.phone = 'Enter a valid 10-digit number'
    if (f.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) errs.email = 'Enter a valid email'

    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      document.getElementById(`lf-${Object.keys(errs)[0]}`)?.focus()
      return
    }

    submitLead({ ...f, source: 'registration_form' })
    track('form_submit', { goal: f.goal })
    track('whatsapp_open', { source: 'registration_form' })
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildMsg(f))}`,
      '_blank', 'noopener,noreferrer'
    )
    setSubmitted(true)
  }

  return (
    <section id="contact" className="bg-dark-900 py-20 md:py-28 relative overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.08)_0%,transparent_65%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-5 md:px-10 relative z-10">

        {/* Section header — big and unmissable */}
        <ScrollReveal className="text-center mb-12">
          <p className="text-brand-blue text-sm font-bold tracking-[0.3em] uppercase mb-3">
            Register Now
          </p>
          <h2 className="section-title text-white mb-4">
            Apply for the <span className="gradient-text">90-Day Program</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Fill in your details below — it takes ~2 minutes. I personally
            review every application and reply within 24 hours.
          </p>
        </ScrollReveal>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-start">

          {/* ── Left: trust copy ── */}
          <ScrollReveal direction="left" className="lg:w-2/5 w-full lg:sticky lg:top-28">
            <h3 className="font-display text-3xl text-white tracking-wider uppercase mb-5">
              Why apply?
            </h3>
            <ul className="space-y-3 mb-8">
              {TRUST.map((t) => (
                <li key={t} className="flex items-center gap-2.5 text-white/75 text-base">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-brand-green/15 flex items-center justify-center">
                    <Check className="w-3 h-3 text-brand-green-light" strokeWidth={3} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>

            <div className="flex gap-8 py-6 border-y border-white/8 mb-8">
              {[
                { n: STATS.clients, l: 'Clients Coached' },
                showRating
                  ? { n: `${STATS.rating}★`, l: 'Client Rating' }
                  : { n: `${STATS.avgResultWeeks} wk`, l: 'Avg. Result Time' },
                { n: '90-day', l: 'Guarantee' },
              ].map(({ n, l }) => (
                <div key={l}>
                  <p className="text-white font-display text-2xl tracking-wider">{n}</p>
                  <p className="text-white/35 text-xs mt-1">{l}</p>
                </div>
              ))}
            </div>

            {/* Secondary path — quiet, below the value props */}
            <p className="text-white/40 text-sm mb-2">Prefer to talk first?</p>
            <button
              id="contact-whatsapp-direct"
              onClick={handleDirectWhatsApp}
              className="inline-flex items-center gap-2 text-[#25D366] font-semibold text-sm hover:text-[#34e07a] transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Message the coach on WhatsApp
            </button>
          </ScrollReveal>

          {/* ── Right: the registration form (the hero of this section) ── */}
          <ScrollReveal direction="right" delay={120} className="lg:w-3/5 w-full">
            {submitted ? (
              <div className="card-dark p-8 text-center">
                <div className="w-16 h-16 bg-brand-green/12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-brand-green-light" strokeWidth={2.5} />
                </div>
                <h3 className="text-white font-bold text-2xl mb-2">Application Sent</h3>
                <p className="text-white/60 text-sm mb-6">
                  Your details opened in WhatsApp pre-filled — just hit send.<br />
                  Pratideep will personally reply within 24 hours.
                </p>
                {hasCalendly && (
                  <a
                    href={CALENDLY_URL}
                    target="_blank" rel="noopener noreferrer"
                    onClick={() => track('calendly_open', { source: 'success_state' })}
                    className="btn-primary w-full mb-3"
                  >
                    Or book your free consult call now
                  </a>
                )}
                <button
                  className="btn-outline text-sm px-6 py-3"
                  onClick={() => { setSubmitted(false); setForm(EMPTY); setErrors({}) }}
                >
                  Submit Another Application
                </button>
              </div>
            ) : (
              <form
                id="lead-capture-form"
                onSubmit={handleSubmit}
                noValidate
                className="bg-dark-700 border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl shadow-black/40"
              >
                <div className="mb-6">
                  <h3 className="font-display text-2xl text-white tracking-wider uppercase">
                    Coaching Application
                  </h3>
                  <p className="text-white/35 text-xs mt-1">
                    <span className="text-red-400">*</span> required · ~2 minutes · no spam, ever
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="sm:col-span-2">
                    <label htmlFor="lf-name" className={labelCls}>Full name <span className="text-red-400">*</span></label>
                    <input id="lf-name" type="text" placeholder="e.g. Rahul Sharma"
                      value={form.name} onChange={(e) => set('name', e.target.value)}
                      autoComplete="name" className={inputCls(errors.name)} />
                    {errors.name && <FieldError>{errors.name}</FieldError>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="lf-phone" className={labelCls}>WhatsApp number <span className="text-red-400">*</span></label>
                    <input id="lf-phone" type="tel" placeholder="10-digit mobile"
                      value={form.phone} onChange={(e) => set('phone', e.target.value)}
                      inputMode="numeric" maxLength={10} autoComplete="tel"
                      className={inputCls(errors.phone)} />
                    {errors.phone && <FieldError>{errors.phone}</FieldError>}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="lf-email" className={labelCls}>Email <span className="text-white/25 normal-case">(optional)</span></label>
                    <input id="lf-email" type="email" placeholder="you@email.com"
                      value={form.email} onChange={(e) => set('email', e.target.value)}
                      autoComplete="email" className={inputCls(errors.email)} />
                    {errors.email && <FieldError>{errors.email}</FieldError>}
                  </div>

                  {/* Age / Gender */}
                  <div>
                    <label htmlFor="lf-age" className={labelCls}>Age</label>
                    <input id="lf-age" type="number" min="14" max="90" placeholder="Years"
                      value={form.age} onChange={(e) => set('age', e.target.value)}
                      inputMode="numeric" className={inputCls()} />
                  </div>
                  <div>
                    <label htmlFor="lf-gender" className={labelCls}>Gender</label>
                    <select id="lf-gender" value={form.gender}
                      onChange={(e) => set('gender', e.target.value)} className={inputCls()}>
                      <option value="">Select</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Prefer not to say</option>
                    </select>
                  </div>

                  {/* Height / Current / Target weight */}
                  <div>
                    <label htmlFor="lf-height" className={labelCls}>Height (cm)</label>
                    <input id="lf-height" type="number" min="120" max="230" placeholder="cm"
                      value={form.height} onChange={(e) => set('height', e.target.value)}
                      inputMode="numeric" className={inputCls()} />
                  </div>
                  <div>
                    <label htmlFor="lf-cw" className={labelCls}>Current weight (kg)</label>
                    <input id="lf-cw" type="number" min="30" max="250" placeholder="kg"
                      value={form.currentWeight} onChange={(e) => set('currentWeight', e.target.value)}
                      inputMode="numeric" className={inputCls()} />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="lf-tw" className={labelCls}>Target weight (kg) <span className="text-white/25 normal-case">(optional)</span></label>
                    <input id="lf-tw" type="number" min="30" max="250" placeholder="Where you want to be"
                      value={form.targetWeight} onChange={(e) => set('targetWeight', e.target.value)}
                      inputMode="numeric" className={inputCls()} />
                  </div>

                  {/* Goal chips */}
                  <div className="sm:col-span-2">
                    <p className={labelCls}>Primary goal <span className="text-red-400">*</span></p>
                    <div className="flex flex-wrap gap-2">
                      {GOALS.map(({ value, label, Icon }) => (
                        <button key={value} type="button"
                          onClick={() => set('goal', value)}
                          className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                            form.goal === value
                              ? 'bg-brand-blue text-white shadow-[0_0_15px_rgba(59,130,246,0.4)]'
                              : 'bg-dark-600 border border-white/10 text-white/60 hover:border-white/30 hover:text-white'
                          }`}>
                          <Icon className="w-3.5 h-3.5" strokeWidth={2.5} />
                          {label}
                        </button>
                      ))}
                    </div>
                    {errors.goal && <FieldError>{errors.goal}</FieldError>}
                  </div>

                  {/* Experience / Days per week */}
                  <div>
                    <label htmlFor="lf-exp" className={labelCls}>Training experience</label>
                    <select id="lf-exp" value={form.experience}
                      onChange={(e) => set('experience', e.target.value)} className={inputCls()}>
                      <option value="">Select</option>
                      <option>Complete beginner</option>
                      <option>Some experience</option>
                      <option>Trained for 1+ years</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="lf-days" className={labelCls}>Days/week you can train</label>
                    <select id="lf-days" value={form.daysPerWeek}
                      onChange={(e) => set('daysPerWeek', e.target.value)} className={inputCls()}>
                      <option value="">Select</option>
                      <option>2–3 days</option>
                      <option>3–4 days</option>
                      <option>5+ days</option>
                    </select>
                  </div>

                  {/* Notes */}
                  <div className="sm:col-span-2">
                    <label htmlFor="lf-notes" className={labelCls}>
                      Injuries, health conditions or anything I should know <span className="text-white/25 normal-case">(optional)</span>
                    </label>
                    <textarea id="lf-notes" rows={3} placeholder="e.g. knee injury, vegetarian, lots of travel…"
                      value={form.notes} onChange={(e) => set('notes', e.target.value)}
                      className={inputCls() + ' resize-none'} />
                  </div>
                </div>

                <button
                  id="form-submit"
                  type="submit"
                  className="btn-primary w-full rounded-xl mt-6 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  Send My Application
                </button>
                <p className="text-center text-white/30 text-xs mt-3">
                  Opens WhatsApp with your details pre-filled · I reply within 24 hours
                </p>
              </form>
            )}
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
