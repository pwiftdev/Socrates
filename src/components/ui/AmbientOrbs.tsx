type AmbientOrbsProps = {
  variant?: 'gold' | 'patina' | 'both'
}

export function AmbientOrbs({ variant = 'both' }: AmbientOrbsProps) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {(variant === 'gold' || variant === 'both') && (
        <>
          <div className="ambient-orb ambient-orb-gold -left-[10%] top-[15%] h-[40vmin] w-[40vmin]" />
          <div className="ambient-orb ambient-orb-gold right-[5%] bottom-[10%] h-[35vmin] w-[35vmin] opacity-60" />
        </>
      )}
      {(variant === 'patina' || variant === 'both') && (
        <div className="ambient-orb ambient-orb-patina left-[30%] top-[50%] h-[50vmin] w-[50vmin] opacity-50" />
      )}
    </div>
  )
}
