interface SectionTitleProps {
  /** Pequeno label uppercase acima do título (overline) */
  overline?: string
  title: string
  /** Alinhamento do bloco. Padrão: left */
  align?: 'left' | 'center'
  className?: string
}

export function SectionTitle({
  overline,
  title,
  align = 'left',
  className = '',
}: SectionTitleProps) {
  const textAlign = align === 'center' ? 'text-center' : 'text-left'

  return (
    <div className={`${textAlign} ${className}`}>
      {overline && (
        <p
          className="text-[13px] font-semibold tracking-[0.16em] uppercase mb-4"
          style={{ color: '#3D5C5F' }}
        >
          {overline}
        </p>
      )}
      <h2
        className="font-display font-semibold text-[40px] leading-[1.2] text-[#111111] text-wrap-pretty m-0"
        style={{ fontFamily: 'var(--font-display), Cormorant Garamond, Georgia, serif' }}
      >
        {title}
      </h2>
    </div>
  )
}
