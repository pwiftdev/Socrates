import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { HERO_IMAGE_PATH, SOCIAL } from '@/lib/constants'
import { fadeUpVariants, marbleEase, staggerContainer } from '@/lib/motion'
import { ScrollCue } from './SiteNav'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const statueY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, 100],
  )
  const imageScale = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [1.05, 1.05] : [1.05, 1.1],
  )
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.25])

  return (
    <section
      ref={ref}
      id="hero"
      className="relative flex min-h-svh items-center overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 z-0 size-full overflow-hidden"
        style={{ y: statueY, scale: imageScale }}
      >
        <img
          src={HERO_IMAGE_PATH}
          alt=""
          className="absolute inset-0 size-full object-cover object-[center_20%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/30 via-obsidian/50 to-obsidian" />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian/95 via-obsidian/55 to-transparent" />
        <div className="vignette absolute inset-0" />
      </motion.div>

      <motion.div
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-start px-6 pb-28 pt-28 md:px-12 lg:px-16"
        style={{ opacity: reduceMotion ? 1 : contentOpacity }}
      >
        <motion.p
          className="section-eyebrow"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: marbleEase }}
        >
          Socrates · On-chain
        </motion.p>

        <motion.h1
          className="mt-4 font-display text-5xl font-normal tracking-wide text-marble sm:text-6xl md:text-7xl lg:text-8xl"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: marbleEase, delay: 0.06 }}
        >
          $SOCRATES
        </motion.h1>

        <motion.p
          className="inscription mt-6 max-w-lg text-lg leading-relaxed text-ash md:text-xl"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: marbleEase, delay: 0.14 }}
        >
          I know that I know nothing…
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
          variants={staggerContainer}
          initial={reduceMotion ? false : 'hidden'}
          animate="visible"
        >
          <motion.a
            href={SOCIAL.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary marble-glow inline-flex items-center justify-center px-8 py-3 font-sans text-sm font-medium uppercase tracking-widest text-marble"
            variants={fadeUpVariants}
          >
            Follow on X
          </motion.a>
          <motion.a
            href={SOCIAL.buy}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary marble-glow inline-flex items-center justify-center px-8 py-3 font-sans text-sm font-medium uppercase tracking-widest text-marble"
            variants={fadeUpVariants}
          >
            Buy $SOCRATES
          </motion.a>
          <motion.div
            variants={fadeUpVariants}
            className="inline-flex items-center gap-2 rounded-full border border-stone bg-charcoal/80 px-4 py-2 font-sans text-sm"
          >
            <span className="text-xs uppercase tracking-widest text-ash">
              Contract
            </span>
            <span className="text-marble">To be announced</span>
          </motion.div>
        </motion.div>
      </motion.div>

      <ScrollCue />

      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-32 bg-gradient-to-t from-obsidian to-transparent"
        aria-hidden
      />
    </section>
  )
}
