type GreekDividerProps = {
  className?: string
}

export function GreekDivider({ className = '' }: GreekDividerProps) {
  return (
    <div
      className={`flex items-center justify-center gap-4 py-6 ${className}`}
      aria-hidden
    >
      <span className="section-divider h-px w-16 sm:w-24" />
      <svg
        viewBox="0 0 24 24"
        className="h-3 w-3 text-gold/70"
        fill="currentColor"
      >
        <path d="M12 2l1.2 3.6L17 6.8l-3 2.6.9 3.6L12 10.4 9.1 13l.9-3.6-3-2.6 3.8-1.2L12 2z" />
      </svg>
      <span className="section-divider h-px w-16 sm:w-24" />
    </div>
  )
}
