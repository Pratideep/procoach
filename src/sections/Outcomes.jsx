/**
 * sections/Outcomes.jsx
 * Translates the program's features into life outcomes — builds desire
 * BEFORE the visitor sees price.
 */
import { Battery, Shirt, Dumbbell, CalendarCheck, Brain, TrendingUp } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'
import bodyRecomp from '../assets/coach/body recompo.png'

const outcomes = [
  { Icon: Battery,       title: 'Energy that lasts the day', text: 'No more 3 p.m. crash. Steady energy from food and training that fit your routine.' },
  { Icon: Shirt,         title: 'Clothes that fit again',    text: 'Visible change in the mirror and in how your shirts sit — usually within weeks, not months.' },
  { Icon: Dumbbell,      title: 'Strength you can feel',      text: 'Lifts go up, daily tasks get easier, and you actually look like you train.' },
  { Icon: CalendarCheck, title: 'A routine that survives life', text: 'Travel, work, family — the plan bends around your week instead of breaking.' },
  { Icon: Brain,         title: 'Zero guesswork',             text: 'Exactly what to eat and do each day. No more conflicting advice from the internet.' },
  { Icon: TrendingUp,    title: 'Results that stick',         text: 'You learn the system, so the physique stays after the 90 days — not a crash diet.' },
]

export default function Outcomes() {
  return (
    <section id="outcomes" className="bg-dark-800 py-20 md:py-28 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-px bg-gradient-to-r from-transparent via-brand-blue/25 to-transparent" />

      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <ScrollReveal className="text-center mb-14">
          <p className="text-brand-blue text-sm font-bold tracking-[0.3em] uppercase mb-3">
            What Actually Changes
          </p>
          <h2 className="section-title text-white mb-4">
            More Than a <span className="gradient-text">Number on the Scale</span>
          </h2>
          <p className="section-subtitle mx-auto">
            The plan is the means. This is what you're really signing up for.
          </p>
        </ScrollReveal>

        <div className="flex flex-col lg:flex-row gap-10 items-center">
          {/* Visual */}
          <ScrollReveal direction="left" className="w-full lg:w-2/5 shrink-0">
            <div className="rounded-3xl overflow-hidden border border-white/10 bg-dark-900 shadow-2xl shadow-black/50">
              <img
                src={bodyRecomp}
                alt="Body recomposition — fat loss with muscle retention"
                loading="lazy"
                decoding="async"
                className="w-full object-contain"
              />
            </div>
            <p className="text-white/35 text-xs text-center mt-3">
              Body recomposition: lose fat while keeping (or building) muscle.
            </p>
          </ScrollReveal>

          {/* Outcome grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {outcomes.map(({ Icon, title, text }, i) => (
              <ScrollReveal key={title} delay={i * 70} direction="up">
                <div className="h-full bg-dark-700 border border-white/8 rounded-2xl p-5 hover:border-brand-blue/40 transition-colors duration-300">
                  <div className="w-11 h-11 rounded-xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue mb-4">
                    <Icon className="w-5 h-5" strokeWidth={2} />
                  </div>
                  <h3 className="text-white font-bold text-base mb-1.5">{title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
