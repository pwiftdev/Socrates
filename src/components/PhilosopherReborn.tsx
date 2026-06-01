import { motion, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { fadeUpVariants, staggerContainer } from '@/lib/motion'
import { PhilosopherScrollStatue } from './philosopher/PhilosopherScrollStatue'
import { SectionHeading } from './ui/SectionHeading'

export function PhilosopherReborn() {
  const reduceMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section
      ref={sectionRef}
      id="philosopher"
      className="relative border-t border-stone/40 bg-obsidian"
    >
      <div className="sticky top-0 h-svh w-full overflow-hidden">
        <div className="relative z-10 flex h-full items-center justify-center px-6 md:px-12 lg:px-16">
          <div className="mx-auto w-full max-w-xl text-center">
            <SectionHeading
              eyebrow="The Philosopher Reborn"
              title="Athens never forgot."
              align="center"
              className="!max-w-none"
            />
            <motion.div
              className="mt-6 space-y-5 font-sans text-base leading-relaxed text-ash md:text-lg"
              variants={staggerContainer}
              initial={reduceMotion ? 'visible' : 'hidden'}
              whileInView="visible"
              viewport={{ once: true, margin: '-5% 0px' }}
            >
              <motion.p variants={fadeUpVariants}>
                The wisest man in Athens died for asking too many questions.
              </motion.p>
              <motion.p variants={fadeUpVariants}>
                2,400 years later, he came back — not in flesh, but on-chain.
              </motion.p>
              <motion.p className="text-marble/90" variants={fadeUpVariants}>
                Wisdom, immortality, and a chart that refuses to be examined.
              </motion.p>
              <motion.p
                className="inscription text-lg text-marble/90 md:text-xl"
                variants={fadeUpVariants}
              >
                &ldquo;The unexamined bag is not worth holding.&rdquo;
              </motion.p>
            </motion.div>
          </div>
        </div>

        <PhilosopherScrollStatue scrollTarget={sectionRef} />
      </div>

      <div className="h-[200vh]" aria-hidden />
    </section>
  )
}
