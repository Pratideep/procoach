/**
 * sections/LeadForm.jsx
 * Upgraded lead capture form — collects detailed client info and opens
 * WhatsApp with a fully pre-filled qualification message.
 * No backend required.
 */
import { useState, useRef } from 'react'
import ScrollReveal from '../components/ScrollReveal'
import { WHATSAPP_NUMBER } from '../utils/whatsapp'

// ── Constants ─────────────────────────────────────────────────────────────────

const GOALS = [
  'Lose Fat',
  'Build Muscle',
  'Body Recomposition',
  'Improve Fitness',
  'Increase Strength',
]

const EXPERIENCE_LEVELS = ['Beginner', 'Intermediate', 'Advanced']

const ACTIVITY_LEVELS = [
  'Sedentary (desk job)',
  'Lightly active',
  'Active',
  'Very active',
]

const DIET_PREFS = ['Vegetarian', 'Non-vegetarian', 'Eggetarian']

const TIMELINES = [
  'Just exploring',
  'Want to start this week',
  'Urgent (event/shoot)',
]

const INITIAL = {
  name: '',
  age: '',
  height: '',
  weight: '',
  goal: '',
  experience: '',
  activity: '',
  diet: '',
  timeline: '',
  phone: '',
  injuries: '',
}

// ── WhatsApp message builder ──────────────────────────────────────────────────

function buildMessage(f) {
  return [
    `🔥 New Client Inquiry — ProCoach`,
    ``,
    `Name: ${f.name}`,
    `Age: ${f.age} yrs`,
    `Height: ${f.height} cm`,
    `Weight: ${f.weight} kg`,
    `Goal: ${f.goal}`,
    `Experience: ${f.experience}`,
    `Activity Level: ${f.activity}`,
    `Diet Preference: ${f.diet}`,
    `Timeline: ${f.timeline}`,
    `Injuries / Medical: ${f.injuries.trim() || 'None'}`,
    ``,
    `WhatsApp: ${f.phone}`,
    ``,
    `Please guide me on next steps! 🙏`,
  ].join('\n')
}

// ── Validation ────────────────────────────────────────────────────────────────

function validate(f) {
  const e = {}
  if (!f.name.trim())             e.name       = 'Name is required'
  if (!f.age)                     e.age        = 'Age is required'
  else if (f.age < 15 || f.age > 60) e.age    = 'Age must be 15–60'
  if (!f.height)                  e.height     = 'Height is required'
  else if (f.height < 120 || f.height > 220) e.height = 'Height must be 120–220 cm'
  if (!f.weight)                  e.weight     = 'Weight is required'
  else if (f.weight < 30 || f.weight > 200)  e.weight = 'Weight must be 30–200 kg'
  if (!f.goal)                    e.goal       = 'Please select a goal'
  if (!f.experience)              e.experience = 'Please select your experience'
  if (!f.activity)                e.activity   = 'Please select your activity level'
  if (!f.diet)                    e.diet       = 'Please select your diet preference'
  if (!f.timeline)                e.timeline   = 'Please select a timeline'
  if (!f.phone.trim())            e.phone      = 'WhatsApp number is required'
  else if (!/^\d{10}$/.test(f.phone.trim())) e.phone = 'Enter a valid 10-digit number'
  return e
}

// ── Main component ────────────────────────────────────────────────────────────

export default function LeadForm() {
  const [form, setForm]           = useState(INITIAL)
  const [errors, setErrors]       = useState({})
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const isFormDirty = Object.values(form).some((v) => v !== '')

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      // Scroll to first error
      const firstKey = Object.keys(errs)[0]
      document.getElementById(`form-${firstKey}`)?.focus()
      return
    }
    const msg = buildMessage(form)
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,
      '_blank',
      'noopener,noreferrer'
    )
    setSubmitted(true)
  }

  return (
    <section id="contact" className="bg-dark-900 py-20 md:py-28 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.06)_0%,transparent_70%)] pointer-events-none" />

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
              Fill out the form and I'll personally reach out to you on WhatsApp
              within 24 hours with a custom plan built around your life.
            </p>

            {/* Trust signals */}
            <ul className="space-y-3">
              {[
                '✅ Free consultation call — no commitment',
                '✅ Custom plan, not a copy-paste template',
                '✅ Results in 90 days or money back',
                '✅ Works around your schedule & diet',
              ].map((t) => (
                <li key={t} className="text-white/70 text-base">{t}</li>
              ))}
            </ul>

            {/* Stat mini-row */}
            <div className="flex gap-8 mt-10 pt-8 border-t border-white/5">
              {[
                { n: '50+', l: 'Clients Transformed' },
                { n: '4.9★', l: 'Average Rating' },
                { n: '90-day', l: 'Guarantee' },
              ].map(({ n, l }) => (
                <div key={l}>
                  <p className="text-white font-display text-2xl tracking-wider">{n}</p>
                  <p className="text-white/30 text-xs mt-1">{l}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* ── Right: form ────────────────────────────────────────────── */}
          <ScrollReveal direction="right" delay={150} className="flex-1 w-full">
            {submitted ? (
              // ── Success state ───────────────────────────────────────────
              <div className="card-dark p-8 text-center">
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-white font-bold text-2xl mb-2">WhatsApp Opened!</h3>
                <p className="text-white/60 text-sm mb-6">
                  Your details have been pre-filled. Just hit send —<br />
                  Pratideep will reply within 24 hours.
                </p>
                <button
                  className="btn-outline text-sm px-6 py-3"
                  onClick={() => { setSubmitted(false); setForm(INITIAL); setErrors({}) }}
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              // ── Form ──────────────────────────────────────────────────
              <form
                id="lead-capture-form"
                onSubmit={handleSubmit}
                noValidate
                className="card-dark p-6 md:p-8 space-y-5"
              >
                <h3 className="font-display text-2xl text-white tracking-wider uppercase mb-1">
                  Get Your Free Consultation
                </h3>
                <p className="text-white/30 text-xs mb-4">
                  Takes 60 seconds · No spam · 100% free
                </p>

                {/* ── Full Name ── */}
                <Field
                  id="form-name"
                  label="Full Name"
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={handleChange}
                  error={errors.name}
                  autoComplete="name"
                />

                {/* ── Age + Height ── */}
                <div className="grid grid-cols-2 gap-4">
                  <Field
                    id="form-age"
                    label="Age"
                    type="number"
                    name="age"
                    placeholder="e.g. 28"
                    value={form.age}
                    onChange={handleChange}
                    error={errors.age}
                    min={15}
                    max={60}
                  />
                  <Field
                    id="form-height"
                    label="Height (cm)"
                    type="number"
                    name="height"
                    placeholder="e.g. 175"
                    value={form.height}
                    onChange={handleChange}
                    error={errors.height}
                    min={120}
                    max={220}
                  />
                </div>

                {/* ── Weight + Goal ── */}
                <div className="grid grid-cols-2 gap-4">
                  <Field
                    id="form-weight"
                    label="Weight (kg)"
                    type="number"
                    name="weight"
                    placeholder="e.g. 80"
                    value={form.weight}
                    onChange={handleChange}
                    error={errors.weight}
                    min={30}
                    max={200}
                  />
                  <SelectField
                    id="form-goal"
                    label="Your Goal"
                    name="goal"
                    options={GOALS}
                    value={form.goal}
                    onChange={handleChange}
                    error={errors.goal}
                  />
                </div>

                {/* ── Experience + Activity ── */}
                <div className="grid grid-cols-2 gap-4">
                  <SelectField
                    id="form-experience"
                    label="Experience Level"
                    name="experience"
                    options={EXPERIENCE_LEVELS}
                    value={form.experience}
                    onChange={handleChange}
                    error={errors.experience}
                  />
                  <SelectField
                    id="form-activity"
                    label="Activity Level"
                    name="activity"
                    options={ACTIVITY_LEVELS}
                    value={form.activity}
                    onChange={handleChange}
                    error={errors.activity}
                  />
                </div>

                {/* ── Diet + Timeline ── */}
                <div className="grid grid-cols-2 gap-4">
                  <SelectField
                    id="form-diet"
                    label="Diet Preference"
                    name="diet"
                    options={DIET_PREFS}
                    value={form.diet}
                    onChange={handleChange}
                    error={errors.diet}
                  />
                  <SelectField
                    id="form-timeline"
                    label="Timeline"
                    name="timeline"
                    options={TIMELINES}
                    value={form.timeline}
                    onChange={handleChange}
                    error={errors.timeline}
                  />
                </div>

                {/* ── WhatsApp Number ── */}
                <Field
                  id="form-phone"
                  label="WhatsApp Number"
                  type="tel"
                  name="phone"
                  placeholder="10-digit mobile number"
                  value={form.phone}
                  onChange={handleChange}
                  error={errors.phone}
                  autoComplete="tel"
                  inputMode="numeric"
                  maxLength={10}
                />

                {/* ── Injuries / Medical (optional) ── */}
                <TextareaField
                  id="form-injuries"
                  label="Injuries / Medical Conditions"
                  name="injuries"
                  placeholder="Any injuries or medical conditions? (optional)"
                  value={form.injuries}
                  onChange={handleChange}
                />

                {/* ── Submit ── */}
                <button
                  id="form-submit"
                  type="submit"
                  className="btn-primary w-full rounded-xl mt-2 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  Send via WhatsApp
                </button>

                <p className="text-center text-white/25 text-xs pt-1">
                  I will personally contact you within 24 hours. 🙏
                </p>
              </form>
            )}
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

// ── Reusable: text/number input ───────────────────────────────────────────────

function Field({
  id, label, type, name, placeholder, value,
  onChange, error, className = '', ...rest
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-white/60 text-xs font-semibold uppercase tracking-wider mb-1.5">
        {label}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full bg-dark-600 border ${
          error ? 'border-red-500/70 focus:border-red-500' : 'border-white/10 focus:border-brand-blue'
        } rounded-xl px-4 py-3 text-white/90 text-sm placeholder-white/20 focus:outline-none transition-colors duration-200`}
        {...rest}
      />
      {error && (
        <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  )
}

// ── Reusable: select dropdown ─────────────────────────────────────────────────

function SelectField({ id, label, name, options, value, onChange, error, className = '' }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-white/60 text-xs font-semibold uppercase tracking-wider mb-1.5">
        {label}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full bg-dark-600 border ${
          error ? 'border-red-500/70 focus:border-red-500' : 'border-white/10 focus:border-brand-blue'
        } rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors duration-200 ${
          value ? 'text-white/90' : 'text-white/30'
        }`}
      >
        <option value="" disabled>Select…</option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-dark-700 text-white">{o}</option>
        ))}
      </select>
      {error && (
        <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  )
}

// ── Reusable: textarea ────────────────────────────────────────────────────────

function TextareaField({ id, label, name, placeholder, value, onChange }) {
  return (
    <div>
      <label htmlFor={id} className="block text-white/60 text-xs font-semibold uppercase tracking-wider mb-1.5">
        {label}{' '}
        <span className="text-white/20 normal-case font-normal">(optional)</span>
      </label>
      <textarea
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={3}
        className="w-full bg-dark-600 border border-white/10 focus:border-brand-blue rounded-xl px-4 py-3 text-white/90 text-sm placeholder-white/20 focus:outline-none transition-colors duration-200 resize-none"
      />
    </div>
  )
}
