import type { ReactNode } from 'react'
import { SectionReveal } from '../SectionReveal'

type SectionHeadingProps = {
  eyebrow: string
  title: string
  subtitle?: ReactNode
  align?: 'left' | 'center'
  className?: string
  /** Light text for use over photography */
  onDark?: boolean
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className = '',
  onDark = false,
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'mx-auto text-center' : 'text-left'

  return (
    <SectionReveal className={`max-w-2xl ${alignClass} ${className}`}>
      <p className={onDark ? 'section-eyebrow text-white/70' : 'section-eyebrow'}>
        {eyebrow}
      </p>
      <h2
        className={`section-title mt-3 text-3xl md:text-4xl lg:text-[2.75rem] ${onDark ? 'text-white' : ''}`}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={`section-subtitle mt-4 ${onDark ? 'text-white/85' : ''}`}
        >
          {subtitle}
        </p>
      ) : null}
    </SectionReveal>
  )
}
