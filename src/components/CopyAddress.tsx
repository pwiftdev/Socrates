import { useCallback, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { hoverTransition } from '@/lib/motion'

type CopyAddressProps = {
  address: string
  className?: string
  compact?: boolean
}

export function CopyAddress({
  address,
  className = '',
  compact = false,
}: CopyAddressProps) {
  const [copied, setCopied] = useState(false)
  const reduceMotion = useReducedMotion()

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(address)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }, [address])

  return (
    <motion.button
      type="button"
      onClick={copy}
      className={`marble-glow inline-flex items-center gap-2 rounded-full border border-stone bg-charcoal/80 px-4 py-2 font-sans text-sm text-ash ${className}`}
      whileHover={reduceMotion ? undefined : { borderColor: 'var(--color-silver)' }}
      transition={hoverTransition}
      aria-label="Copy contract address"
    >
      <span
        className={`font-mono text-silver ${compact ? 'max-w-[140px] truncate text-xs sm:max-w-none sm:text-sm' : 'text-xs sm:text-sm'}`}
      >
        {address}
      </span>
      <span className="shrink-0 text-xs uppercase tracking-widest text-marble">
        {copied ? 'Copied' : 'Copy'}
      </span>
    </motion.button>
  )
}
