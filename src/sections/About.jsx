/**
 * sections/About.jsx
 * Personal introduction, coaching philosophy, credentials, and mini-stats.
 */
import ScrollReveal from '../components/ScrollReveal'
import coachTriceps from '../assets/coach/tricpes.jpeg'
import coachBack    from '../assets/coach/back.jpg'

const journey = [
  {
    year: '2021',
    text: 'Started my fitness journey with running, but struggled to see real results.',
  },
  {
    year: '2022',
    text: 'Shifted to proper strength training and nutrition. Began understanding what actually works.',
  },
  {
    year: '2023',
    text: 'Built consistency, improved physique, and started helping friends get results.',
  },
  {
    year: '2024',
    text: '2+ years coaching experience. Helped multiple clients transform using a practical, real-life approach.',
  },
]

const credentials = [
  { label: 'Certified Coach', icon: '🏅' },
  { label: 'Precision Nutrition', icon: '🥗' },
  { label: '4+ Years Training', icon: '📆' },
  { label: '2+ Years Coaching', icon: '🎯' },
]

const miniStats = [
  { value: '20+', label: 'Transformations' },
  { value: '2+',  label: 'Years Coaching' },
  { value: '4+',  label: 'Years Training' },
]

export default function About() {
  return (
    <section id="about" className="bg-dark-800 py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-5 md:px-10">

        {/* Header */}
        <ScrollReveal className="text-center mb-16">
          <p className="text-brand-blue text-sm font-bold tracking-[0.3em] uppercase mb-3">
            My Story
          </p>
          <h2 className="section-title text-white mb-2">
            Why I <span className="gradient-text">Coach</span>
          </h2>
          <p className="text-white/40 font-semibold tracking-widest text-sm uppercase mt-3">Pratideep Naik · Online Fitness Coach</p>
        </ScrollReveal>

        <div className="flex flex-col lg:flex-row gap-12 items-start">

          {/* Left — photos + mini stats */}
          <ScrollReveal direction="left" className="flex-1">
            <div className="flex gap-4 justify-center lg:justify-start">
              <img
                src={coachTriceps}
                alt="Coach physique"
                className="w-44 md:w-52 rounded-2xl object-cover h-64 md:h-80 shadow-xl shadow-black/50 mt-8"
                loading="lazy"
              />
              <img
                src={coachBack}
                alt="Coach back pose"
                className="w-44 md:w-52 rounded-2xl object-cover h-64 md:h-80 shadow-xl shadow-black/50"
                loading="lazy"
              />
            </div>

            {/* Mini stats row */}
            <div className="flex gap-4 mt-6 justify-center lg:justify-start">
              {miniStats.map((s) => (
                <div key={s.label} className="flex-1 bg-dark-700 border border-white/8 rounded-xl py-4 px-3 text-center">
                  <p className="font-display text-2xl text-brand-blue tracking-wider">{s.value}</p>
                  <p className="text-white/40 text-[10px] uppercase tracking-wider mt-1">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Credentials */}
            <div className="flex flex-wrap gap-2 mt-4 justify-center lg:justify-start">
              {credentials.map((c) => (
                <span
                  key={c.label}
                  className="inline-flex items-center gap-1.5 bg-brand-blue/8 border border-brand-blue/20 text-white/70 text-xs font-medium px-3 py-1.5 rounded-full"
                >
                  <span>{c.icon}</span>
                  {c.label}
                </span>
              ))}
            </div>
          </ScrollReveal>

          {/* Right — text */}
          <div className="flex-1">
            <ScrollReveal direction="right" className="mb-6">
              <p className="text-white/80 text-lg leading-relaxed mb-4">
                I'm <strong className="text-white">Pratideep Naik</strong> — and I've been exactly where you are right now.
                In 2021, I was overweight, out of shape, and had no idea where to start.
                I decided to figure it out — and that decision changed everything.
              </p>
              <p className="text-white/60 text-base leading-relaxed mb-4">
                I went from being embarrassed about my body to building a physique I'm proud of.
                Then I started helping friends do the same — and realised most programs fail people
                not because of the workouts, but because they completely ignore <strong className="text-white">real life</strong>.
              </p>
              <p className="text-white/60 text-base leading-relaxed">
                That's why I built a system around <em>your</em> schedule, your food preferences,
                your equipment (or lack of it). No excuses needed. Just results.
              </p>
            </ScrollReveal>

            {/* Timeline */}
            <ScrollReveal direction="right" delay={150} className="space-y-5 mt-8">
              {journey.map((j) => (
                <div key={j.year} className="flex gap-5 group">
                  <div className="flex flex-col items-center">
                    <span className="font-display text-brand-blue tracking-widest text-xl group-hover:text-brand-blue-light transition-colors">{j.year}</span>
                    <div className="w-px flex-1 bg-white/10 mt-2" />
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed pt-1 pb-4 group-hover:text-white/75 transition-colors">{j.text}</p>
                </div>
              ))}
              <div className="mt-8 pt-6 border-t border-white/5">
                <p className="text-white/80 font-medium italic text-lg leading-relaxed">
                  "Started from confusion. Built through consistency. Proven through results."
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
