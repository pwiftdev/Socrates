
import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { fadeUpVariants, revealTransition } from '@/lib/motion'

type SectionRevealProps = {
  children: ReactNode
  className?: string
  delay?: number
}

/** Scroll-triggered fade/translate wrapper used across sections */
export function SectionReveal({
  children,
  className = '',
  delay = 0,
}: SectionRevealProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, margin: '-8% 0px' }}
      variants={{
        hidden: fadeUpVariants.hidden,
        visible: {
          opacity: 1,
          y: 0,
          transition: { ...revealTransition, delay },
        },
      }}
    >
      {children}
    </motion.div>
  )
}
