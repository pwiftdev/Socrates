import { motion, useReducedMotion } from 'framer-motion'
import { lineRevealVariants, staggerContainer } from '@/lib/motion'

export type QuoteProps = {
  original: string
  twist: string
  attribution?: string
  animate?: boolean
  className?: string
  /** Light text over dark / photographic backgrounds */
  onDark?: boolean
}

export function Quote({
  original,
  twist,
  attribution = '— Socrates, reimagined',
  animate = true,
  className = '',
  onDark = false,
}: QuoteProps) {
  const reduceMotion = useReducedMotion()

  const blockClass = onDark
    ? `quote-block quote-block--on-dark max-w-3xl ${className}`
    : `quote-block max-w-3xl ${className}`

  const quoteClass = onDark
    ? 'font-display text-2xl leading-snug text-white sm:text-3xl md:text-4xl'
    : 'font-display text-2xl leading-snug text-marble sm:text-3xl md:text-4xl'

  const twistClass = onDark
    ? 'mt-5 font-sans text-base leading-relaxed text-white/90 sm:text-lg'
    : 'mt-5 font-sans text-base leading-relaxed text-ash sm:text-lg'

  const footerClass = onDark
    ? 'mt-8 font-sans text-xs uppercase tracking-widest text-white/65'
    : 'mt-8 font-sans text-xs uppercase tracking-widest text-stone'

  const content = (
    <blockquote className={blockClass}>
      <p className={quoteClass}>&ldquo;{original}&rdquo;</p>
      <p className={twistClass}>{twist}</p>
      <footer className={footerClass}>{attribution}</footer>
    </blockquote>
  )

  if (!animate || reduceMotion) {
    return content
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={staggerContainer}
    >
      <motion.blockquote className={blockClass} variants={staggerContainer}>
        <motion.p className={quoteClass} variants={lineRevealVariants}>
          &ldquo;{original}&rdquo;
        </motion.p>
        <motion.p className={twistClass} variants={lineRevealVariants}>
          {twist}
        </motion.p>
        <motion.footer className={footerClass} variants={lineRevealVariants}>
          {attribution}
        </motion.footer>
      </motion.blockquote>
    </motion.div>
  )
}
