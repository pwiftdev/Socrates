import {
  easeInOut,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { useEffect, useRef, useState, type RefObject } from 'react'
import { HeroModel } from '@/components/hero/HeroModel'

type PhilosopherScrollStatueProps = {
  scrollTarget: RefObject<HTMLElement | null>
}

/** At scroll 0: three-quarter toward copy; at 1: turned the other way */
const SCROLL_ROTATION_FROM = -0.72
const SCROLL_ROTATION_TO = 0.72

const EDGE_INSET = 0

export function PhilosopherScrollStatue({
  scrollTarget,
}: PhilosopherScrollStatueProps) {
  const reduceMotion = useReducedMotion()
  const stageRef = useRef<HTMLDivElement>(null)
  const [viewportW, setViewportW] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200,
  )
  const [stageW, setStageW] = useState(() =>
    typeof window !== 'undefined'
      ? Math.min(window.innerWidth * 0.58, 640)
      : 400,
  )

  useEffect(() => {
    const onResize = () => setViewportW(window.innerWidth)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    const el = stageRef.current
    if (!el) return

    const measure = () => setStageW(el.getBoundingClientRect().width)
    measure()

    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [reduceMotion])

  const { scrollYProgress } = useScroll({
    target: scrollTarget,
    offset: ['start start', 'end end'],
  })

  // left-0 anchor: x is distance from viewport left edge to stage left edge
  const startX = EDGE_INSET
  const endX = Math.max(EDGE_INSET, viewportW - stageW - EDGE_INSET)

  const travelX = useTransform(scrollYProgress, (progress) => {
    const t = easeInOut(progress)
    return startX + (endX - startX) * t
  })

  const stageClass =
    'pointer-events-none absolute top-1/2 left-0 z-[8] aspect-[4/5] w-[min(58vw,640px)] max-h-[min(88vh,860px)]'

  if (reduceMotion) {
    return (
      <div
        ref={stageRef}
        className={`${stageClass} -translate-y-1/2`}
        style={{ left: 'auto', right: EDGE_INSET }}
      >
        <HeroModel bright fitMargin={1.45} className="size-full" />
      </div>
    )
  }

  return (
    <motion.div
      ref={stageRef}
      className={stageClass}
      style={{
        x: travelX,
        y: '-50%',
        willChange: 'transform',
      }}
    >
      <HeroModel
        bright
        fitMargin={1.38}
        scrollProgress={scrollYProgress}
        scrollRotationFrom={SCROLL_ROTATION_FROM}
        scrollRotationTo={SCROLL_ROTATION_TO}
        scrollPanFrom={-0.52}
        scrollPanTo={0.52}
        className="size-full"
      />
    </motion.div>
  )
}
