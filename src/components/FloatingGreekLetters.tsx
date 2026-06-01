import { motion, useReducedMotion } from 'framer-motion'
import { GREEK_LETTERS } from '@/lib/constants'

const POSITIONS = [
  { top: '10%', left: '6%', size: 'text-5xl', delay: 0, rotate: -12 },
  { top: '18%', right: '10%', size: 'text-4xl', delay: 1.2, rotate: 8 },
  { top: '42%', left: '4%', size: 'text-6xl', delay: 0.6, rotate: -6 },
  { top: '52%', right: '5%', size: 'text-3xl', delay: 2, rotate: 14 },
  { top: '68%', left: '12%', size: 'text-4xl', delay: 1.5, rotate: -10 },
  { top: '78%', right: '14%', size: 'text-5xl', delay: 0.3, rotate: 6 },
  { top: '32%', left: '16%', size: 'text-2xl', delay: 2.4, rotate: 18 },
  { top: '62%', right: '20%', size: 'text-7xl', delay: 1.8, rotate: -14 },
  { top: '88%', left: '40%', size: 'text-3xl', delay: 0.9, rotate: 4 },
]

export function FloatingGreekLetters() {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) return null

  return (
    <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden" aria-hidden>
      {POSITIONS.map((pos, i) => (
        <motion.span
          key={i}
          className={`absolute font-display text-gold/15 ${pos.size}`}
          style={{
            top: pos.top,
            left: pos.left,
            right: pos.right,
            rotate: pos.rotate,
          }}
          initial={{ opacity: 0.06, y: 0 }}
          animate={{
            opacity: [0.05, 0.18, 0.08],
            y: [0, -24, 0],
            rotate: [pos.rotate, pos.rotate + 6, pos.rotate],
          }}
          transition={{
            duration: 9 + i * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: pos.delay,
          }}
        >
          {GREEK_LETTERS[i % GREEK_LETTERS.length]}
        </motion.span>
      ))}
    </div>
  )
}
