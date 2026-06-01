import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { DIALOGUE_QUOTES, DIALOGUES_IMAGE_PATH } from '@/lib/constants'
import { Quote } from './Quote'
import { SectionHeading } from './ui/SectionHeading'

export function Dialogues() {
  const containerRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const bgY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? ['0%', '0%'] : ['-5%', '8%'],
  )

  return (
    <section
      id="dialogues"
      ref={containerRef}
      className="relative border-t border-stone/40"
    >
      <div className="pointer-events-none sticky top-0 z-0 h-0 overflow-visible">
        <motion.div
          className="relative h-svh w-full overflow-hidden"
          style={{ y: bgY }}
          aria-hidden
        >
          <img
            src={DIALOGUES_IMAGE_PATH}
            alt=""
            className="absolute inset-0 size-full object-cover object-[center_30%] grayscale"
          />
          <div className="absolute inset-0 bg-obsidian/75" />
          <div className="absolute inset-0 bg-charcoal/45" />
          <div className="vignette absolute inset-0" />
        </motion.div>
      </div>

      <div className="relative z-10">
        <div className="mx-auto max-w-6xl px-6 pb-12 pt-24 md:px-12 lg:px-16 md:pt-28">
          <SectionHeading
            eyebrow="The Dialogues"
            title="Inscriptions for the holder"
            subtitle="Classical lines, updated for the chart."
            align="center"
            className="mx-auto"
            onDark
          />
        </div>

        {DIALOGUE_QUOTES.map((q, index) => (
          <article
            key={q.original}
            className="flex min-h-[80vh] items-center px-6 py-16 md:px-12 lg:px-16"
          >
            <div className="mx-auto w-full max-w-4xl">
              <Quote
                original={q.original}
                twist={q.twist}
                animate
                onDark
                className={index % 2 === 1 ? 'quote-block--end md:ml-auto md:text-right' : ''}
              />
            </div>
          </article>
        ))}

        {/* Solid tail so sticky bg does not bleed into sections below */}
        <div className="relative z-20 h-32 bg-gradient-to-b from-transparent to-charcoal" aria-hidden />
      </div>
    </section>
  )
}
