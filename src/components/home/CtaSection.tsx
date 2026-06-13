import Image from 'next/image'
import Link from 'next/link'

interface CtaSectionProps {
  headline?: string
  sub?: string
  ctaLabel?: string
  ctaHref?: string
}

export function CtaSection({
  headline = 'Cada caso tem um caminho. Vamos encontrar o seu.',
  sub = 'Atendimento humano e individual, presencial ou online.',
  ctaLabel = 'Agendar Consulta',
  ctaHref = '/contato',
}: CtaSectionProps) {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: '#3D5C5F', padding: '110px 0' }}
      aria-labelledby="cta-headline"
    >
      {/* Watermark decorative */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none select-none"
        style={{ right: -60, top: '50%', transform: 'translateY(-50%)', height: 420, opacity: 0.08 }}
      >
        <Image
          src="/marcadagua-branco.png"
          alt=""
          width={420}
          height={420}
          style={{ height: 420, width: 'auto' }}
          unoptimized
        />
      </div>

      <div className="relative z-10 max-w-[760px] mx-auto px-6 md:px-14 text-center flex flex-col items-center gap-6">
        <h2
          id="cta-headline"
          className="font-display font-semibold text-white"
          style={{
            fontFamily: 'var(--font-display), Cormorant Garamond, Georgia, serif',
            fontSize: 'clamp(28px, 3.5vw, 42px)',
            lineHeight: 1.2,
          }}
        >
          {headline}
        </h2>
        <p className="text-base md:text-[17px] leading-relaxed max-w-[540px]" style={{ color: '#BDE4DA' }}>
          {sub}
        </p>
        <Link
          href={ctaHref}
          className="inline-block text-[15px] font-semibold transition-colors"
          style={{
            background: '#FFFFFF',
            color: '#3D5C5F',
            padding: '16px 40px',
            borderRadius: 4,
          }}
        >
          {ctaLabel}
        </Link>
      </div>
    </section>
  )
}
