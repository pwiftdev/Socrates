import { motion, useReducedMotion } from 'framer-motion'
import { CONTRACT_ADDRESS, SOCIAL } from '@/lib/constants'
import { fadeUpVariants, marbleEase } from '@/lib/motion'
import { CopyAddress } from './CopyAddress'

const FOOTER_LINKS = [
  { label: 'X', href: SOCIAL.twitter },
  { label: 'Telegram', href: SOCIAL.telegram },
  { label: 'Chart', href: SOCIAL.dex },
  { label: 'Buy', href: SOCIAL.buy },
] as const

export function Footer() {
  const reduceMotion = useReducedMotion()

  return (
    <footer className="relative z-20 overflow-hidden border-t border-stone/40 py-20 md:py-24">
      <div
        className="section-surface section-surface--obsidian section-surface--line"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-6 md:px-12">
        <div className="flex flex-col items-center gap-12 text-center md:flex-row md:items-start md:justify-between md:text-left">
          <motion.div
            className="max-w-sm"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: marbleEase }}
          >
            <p className="font-display text-3xl tracking-wide text-marble md:text-4xl">
              $SOCRATES
            </p>
            <p className="inscription mt-6 text-lg leading-relaxed text-ash md:text-xl">
              &ldquo;The unexamined coin is not worth holding.&rdquo;
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col items-center gap-6 md:items-end"
            variants={fadeUpVariants}
            initial={reduceMotion ? false : 'hidden'}
            whileInView="visible"
            viewport={{ once: true }}
          >
            <CopyAddress address={CONTRACT_ADDRESS} compact />

            <nav
              className="flex flex-wrap justify-center gap-6 md:justify-end"
              aria-label="Social links"
            >
              {FOOTER_LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sm uppercase tracking-widest text-ash transition-colors hover:text-marble"
                >
                  {label}
                </a>
              ))}
            </nav>
          </motion.div>
        </div>

        <p className="mt-14 border-t border-stone/30 pt-8 text-center font-sans text-xs leading-relaxed text-stone">
          Not financial advice. This is a memecoin. Trade at your own risk.
        </p>
      </div>
    </footer>
  )
}
