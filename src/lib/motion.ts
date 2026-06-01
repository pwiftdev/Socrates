import type { Transition, Variants } from 'framer-motion'

export const marbleEase = [0.22, 1, 0.36, 1] as const

export const revealTransition: Transition = {
  duration: 0.5,
  ease: marbleEase,
}

export const hoverTransition: Transition = {
  duration: 0.25,
  ease: marbleEase,
}

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: revealTransition,
  },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

export const lineRevealVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: marbleEase },
  },
}

export const cardHoverVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: revealTransition,
  },
}
