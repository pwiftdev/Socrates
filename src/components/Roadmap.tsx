import { motion, useReducedMotion } from 'framer-motion'
import { ROADMAP_PHASES } from '@/lib/constants'
import { fadeUpVariants, staggerContainer } from '@/lib/motion'
import { SectionHeading } from './ui/SectionHeading'

export function Roadmap() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="agora"
      className="relative z-20 overflow-hidden border-t border-stone/40 py-28 md:py-36"
    >
      <div
        className="section-surface section-surface--obsidian section-surface--line"
        aria-hidden
      />

      <div className="relative mx-auto max-w-3xl px-6 md:px-12">
        <SectionHeading
          eyebrow="Roadmap"
          title="Three acts"
          subtitle="From launch to immortality — the dialogue in three movements."
          align="center"
          className="mx-auto"
        />

        <motion.ol
          className="relative mt-16 space-y-5"
          variants={staggerContainer}
          initial={reduceMotion ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-8% 0px' }}
        >
          {ROADMAP_PHASES.map((phase, i) => (
            <motion.li
              key={phase.numeral}
              variants={fadeUpVariants}
              className="roadmap-step flex flex-col gap-5 rounded-md sm:flex-row sm:items-start sm:gap-8"
            >
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-patina/40 bg-obsidian font-display text-2xl text-marble">
                {phase.numeral}
              </span>
              <div className="sm:pt-1">
                <p className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-patina">
                  Act {i + 1}
                </p>
                <h3 className="mt-1 font-display text-2xl text-marble md:text-3xl">
                  {phase.title}
                </h3>
                <p className="mt-3 font-sans text-base leading-relaxed text-ash">
                  {phase.description}
                </p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  )
}
