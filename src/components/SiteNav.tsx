import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { SOCIAL } from '@/lib/constants'

const LINKS = [
  { label: 'Philosopher', href: '#philosopher' },
  { label: 'Dialogues', href: '#dialogues' },
  { label: 'Tokenomics', href: '#tokenomics' },
  { label: 'Roadmap', href: '#agora' },
  { label: 'Community', href: '#academy' },
] as const

export function SiteNav() {
  const reduceMotion = useReducedMotion()
  const { scrollY } = useScroll()
  const navOpacity = useTransform(scrollY, [0, 60, 100], [0, 0, 1])

  return (
    <motion.header
      className="nav-glass fixed top-0 left-0 right-0 z-40"
      style={reduceMotion ? { opacity: 1 } : { opacity: navOpacity }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3.5 md:px-12">
        <a
          href="#hero"
          className="font-display text-base tracking-wide text-marble hover:text-silver"
        >
          $SOCRATES
        </a>

        <nav
          className="hidden items-center gap-7 md:flex"
          aria-label="Primary"
        >
          {LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="font-sans text-xs uppercase tracking-widest text-ash hover:text-marble"
            >
              {label}
            </a>
          ))}
        </nav>

        <a
          href={SOCIAL.buy}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary marble-glow shrink-0 px-4 py-2 font-sans text-xs uppercase tracking-widest text-marble"
        >
          Buy
        </a>
      </div>
    </motion.header>
  )
}

export function ScrollProgress() {
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()

  if (reduceMotion) return null

  return (
    <motion.div
      className="scroll-progress fixed top-0 left-0 z-[60] h-px w-full origin-left"
      style={{ scaleX: scrollYProgress }}
      aria-hidden
    />
  )
}

export function ScrollCue() {
  const reduceMotion = useReducedMotion()
  if (reduceMotion) return null

  return (
    <motion.div
      className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.6 }}
      aria-hidden
    >
      <motion.span
        className="block h-10 w-px bg-stone/60"
        animate={{ scaleY: [0.5, 1, 0.5], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  )
}
