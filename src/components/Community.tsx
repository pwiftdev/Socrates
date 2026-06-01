import { motion, useReducedMotion } from 'framer-motion'
import { SOCIAL } from '@/lib/constants'
import { fadeUpVariants, staggerContainer } from '@/lib/motion'
import { SectionReveal } from './SectionReveal'
import { SectionHeading } from './ui/SectionHeading'

const LINKS = [
  { label: 'X / Twitter', href: SOCIAL.twitter },
  { label: 'Telegram', href: SOCIAL.telegram },
  { label: 'DexScreener', href: SOCIAL.dex },
] as const

export function Community() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="academy"
      className="relative z-20 overflow-hidden border-t border-stone/40 py-28 md:py-36"
    >
      <div
        className="section-surface section-surface--charcoal section-surface--line"
        aria-hidden
      />
      <div className="section-surface section-surface--lift" aria-hidden />

      <div className="relative mx-auto max-w-2xl px-6 text-center md:px-12">
        <SectionHeading
          eyebrow="Community"
          title="Join the Academy"
          subtitle="The examined community is worth joining."
          align="center"
          className="mx-auto"
        />

        <SectionReveal delay={0.1}>
          <motion.div
            className="mt-12 grid gap-3 sm:grid-cols-3"
            variants={staggerContainer}
            initial={reduceMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            viewport={{ once: true }}
          >
            {LINKS.map(({ label, href }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeUpVariants}
                className="link-tile marble-glow rounded-md"
              >
                {label}
              </motion.a>
            ))}
          </motion.div>

          <motion.a
            href={SOCIAL.buy}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-accent marble-glow mt-8 inline-flex items-center justify-center rounded-md px-10 py-4 font-sans text-sm font-medium uppercase tracking-widest"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Buy $SOCRATES
          </motion.a>
        </SectionReveal>
      </div>
    </section>
  )
}
