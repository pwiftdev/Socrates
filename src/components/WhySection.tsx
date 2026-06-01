import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { useRef, type ReactNode } from 'react'

const LETTERS = ['W', 'H', 'Y', '?'] as const

const SCROLL_TRACK_VH = 320

const WHY_FONT = 'clamp(6rem, 30vw, 15rem)'

/** Scroll phases (approx.) — reveal → hold WHY → taglines out → zoom exit */
const HOLD_START = 0.48
const HOLD_END = 0.78
const EXIT_START = 0.78
const TAGLINE_FADE_START = 0.7
const TAGLINE_FADE_END = 0.8

function ScrollLine({
  children,
  scrollYProgress,
  start,
  end,
  className = '',
}: {
  children: ReactNode
  scrollYProgress: MotionValue<number>
  start: number
  end: number
  className?: string
}) {
  const opacity = useTransform(
    scrollYProgress,
    [start, end, TAGLINE_FADE_START, TAGLINE_FADE_END],
    [0, 1, 1, 0],
  )
  const y = useTransform(scrollYProgress, [start, end], [48, 0])
  const scale = useTransform(
    scrollYProgress,
    [start, end, EXIT_START, 1],
    [0.92, 1, 1, 1.15],
  )
  const blur = useTransform(
    scrollYProgress,
    [start, end, TAGLINE_FADE_START, TAGLINE_FADE_END],
    [8, 0, 0, 6],
  )
  const filter = useTransform(blur, (b) => `blur(${b}px)`)

  return (
    <motion.p
      className={className}
      style={{ opacity, y, scale, filter }}
    >
      {children}
    </motion.p>
  )
}

function WhyLetter({
  char,
  index,
  scrollYProgress,
}: {
  char: string
  index: number
  scrollYProgress: MotionValue<number>
}) {
  const start = 0.1 + index * 0.065
  const end = start + 0.12

  const opacity = useTransform(
    scrollYProgress,
    [start, end, HOLD_END, 1],
    [0, 1, 1, 1],
  )
  const y = useTransform(
    scrollYProgress,
    [start, end, EXIT_START, 1],
    [160, 0, 0, -40],
  )
  const letterScale = useTransform(scrollYProgress, [start, end], [0.35, 1])
  const blur = useTransform(
    scrollYProgress,
    [start, end, EXIT_START, 1],
    [22, 0, 0, 4],
  )
  const rotateX = useTransform(scrollYProgress, [start, end], [62, 0])
  const rotate = useTransform(
    scrollYProgress,
    [end, HOLD_START, HOLD_END],
    char === '?' ? [0, -6, -6] : [0, 0, 0],
  )
  const filter = useTransform(blur, (b) => `blur(${b}px)`)

  return (
    <motion.span
      className="inline-block origin-bottom font-display font-light leading-[0.85] text-marble"
      style={{
        fontSize: WHY_FONT,
        opacity,
        y,
        scale: letterScale,
        rotateX,
        rotate,
        filter,
      }}
    >
      {char}
    </motion.span>
  )
}

export function WhySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const backdropScale = useTransform(
    scrollYProgress,
    [0, 0.35, EXIT_START, 1],
    [1.35, 1.1, 1.1, 2.8],
  )
  const backdropOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, HOLD_END, 1],
    [0, 0.55, 0.45, 0.7],
  )

  /** Entrance scale, long hold, then rush toward the viewer */
  const whyZoom = useTransform(
    scrollYProgress,
    [0.12, HOLD_START, HOLD_END, 1],
    [0.72, 1.08, 1.08, 5.5],
  )

  const vignetteOpacity = useTransform(
    scrollYProgress,
    [EXIT_START, 1],
    [0.55, 0.92],
  )

  const hintOpacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.55, 0.65],
    [0, 0.7, 0.7, 0],
  )

  const taglineTop =
    'font-sans text-[clamp(0.65rem,2.2vw,0.95rem)] font-medium uppercase tracking-[0.45em] text-ash md:tracking-[0.55em]'
  const taglineBottom =
    'font-sans text-[clamp(0.7rem,2.4vw,1rem)] font-medium uppercase tracking-[0.42em] text-marble/90 md:tracking-[0.5em]'

  return (
    <section
      ref={sectionRef}
      id="why"
      className="relative border-t border-stone/40 bg-obsidian"
      aria-label="Why"
    >
      <div className="sticky top-0 h-svh w-full overflow-hidden bg-obsidian">
        <motion.div
          className="pointer-events-none absolute inset-0 bg-obsidian"
          style={{ opacity: vignetteOpacity }}
          aria-hidden
        />

        <motion.div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          style={{
            scale: reduceMotion ? 1 : backdropScale,
            opacity: reduceMotion ? 0.35 : backdropOpacity,
          }}
          aria-hidden
        >
          <div className="h-[min(95vw,800px)] w-[min(95vw,800px)] rounded-full bg-patina/15 blur-3xl" />
        </motion.div>

        <div className="relative z-10 flex h-full flex-col items-center justify-center gap-4 px-4 md:gap-6">
          {reduceMotion ? (
            <div className="flex flex-col items-center gap-6 text-center">
              <p className={taglineTop}>The only question</p>
              <p
                className="font-display font-light leading-none text-marble"
                style={{ fontSize: WHY_FONT }}
              >
                WHY?
              </p>
              <p className={taglineBottom}>That matters</p>
            </div>
          ) : (
            <motion.div className="flex flex-col items-center gap-3 text-center md:gap-5">
              <ScrollLine
                scrollYProgress={scrollYProgress}
                start={0.03}
                end={0.12}
                className={taglineTop}
              >
                The only question
              </ScrollLine>

              <motion.div
                className="relative flex origin-center items-end justify-center gap-[0.015em] py-2 md:py-4"
                style={{ scale: whyZoom }}
              >
                {LETTERS.map((char, i) => (
                  <WhyLetter
                    key={char}
                    char={char}
                    index={i}
                    scrollYProgress={scrollYProgress}
                  />
                ))}
              </motion.div>

              <ScrollLine
                scrollYProgress={scrollYProgress}
                start={0.5}
                end={0.6}
                className={taglineBottom}
              >
                That matters
              </ScrollLine>
            </motion.div>
          )}
        </div>

        <motion.p
          className="pointer-events-none absolute bottom-8 left-0 right-0 z-10 text-center font-sans text-[0.6rem] uppercase tracking-[0.45em] text-stone"
          style={reduceMotion ? undefined : { opacity: hintOpacity }}
        >
          Scroll
        </motion.p>
      </div>

      <div style={{ height: `${SCROLL_TRACK_VH}vh` }} aria-hidden />
    </section>
  )
}
