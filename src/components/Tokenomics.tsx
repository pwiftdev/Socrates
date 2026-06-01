import { motion, useReducedMotion } from 'framer-motion'
import { TOKENOMICS } from '@/lib/constants'
import { cardHoverVariants, staggerContainer } from '@/lib/motion'
import { SectionHeading } from './ui/SectionHeading'

export function Tokenomics() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="tokenomics"
      className="relative z-20 overflow-hidden border-t border-stone/40 py-28 md:py-36"
    >
      <div
        className="section-surface section-surface--charcoal section-surface--line"
        aria-hidden
      />
      <div className="section-surface section-surface--lift" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-6 md:px-12 lg:px-16">
        <SectionHeading
          eyebrow="Tokenomics"
          title="On the ledger"
          subtitle="Supply, tax, and contract — carved for transparency."
          align="center"
          className="mx-auto"
        />

        <motion.div
          className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          variants={staggerContainer}
          initial={reduceMotion ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-8% 0px' }}
        >
          {TOKENOMICS.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={cardHoverVariants}
              whileHover={reduceMotion ? undefined : { y: -4 }}
              className="stat-card rounded-md p-7"
            >
              <span className="font-display text-3xl text-patina/25">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="mt-4 font-sans text-[0.7rem] uppercase tracking-[0.2em] text-ash">
                {stat.label}
              </p>
              <p className="mt-2 font-display text-2xl leading-tight text-marble md:text-[1.75rem]">
                {stat.value}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
