'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const slides = [
  {
    src: '/fotos/IMG_0959.png',
    alt: 'Vanessa Vaz Marschallinger — advogada previdenciária',
  },
  {
    src: '/fotos/IMG_0960.png',
    alt: 'Vanessa Vaz Marschallinger — atendimento jurídico especializado',
  },
  {
    src: '/fotos/IMG_0961.png',
    alt: 'Vanessa Vaz Marschallinger — consultoria previdenciária',
  },
]

export function HeroCarousel() {
  const [active, setActive] = useState(0)

  // Padrão auto-reprogramável: roda novamente sempre que `active` muda → loop genuinamente contínuo
  useEffect(() => {
    const id = setTimeout(() => {
      setActive((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearTimeout(id)
  }, [active])

  return (
    <section
      className="dot-nav-wrap relative h-[560px] md:h-[720px] overflow-hidden"
      style={{ background: '#2F484B' }}
      aria-label="Apresentação"
    >
      {/* Slides — ativo fica no topo via z-index */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0"
          style={{ zIndex: i === active ? 1 : 0 }}
        >
          {/* Key muda quando o slide vira ativo → React remonta → animações reiniciam */}
          <div
            key={i === active ? `a-${active}` : `i-${i}`}
            className="absolute inset-0"
            style={
              i === active
                ? {
                    animation: 'hero-enter 0.8s ease-out forwards, hero-zoom 8s ease-out forwards',
                    willChange: 'opacity, transform',
                  }
                : undefined
            }
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={i === 0}
              className="object-cover"
              style={{ objectPosition: 'center 22%' }}
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 1800px"
            />
          </div>
        </div>
      ))}

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, rgba(18,32,34,0.38) 0%, rgba(18,32,34,0.52) 100%)',
          zIndex: 2,
        }}
      />

      {/* Content */}
      <div
        className="relative flex flex-col justify-center h-full max-w-[1168px] mx-auto px-6 md:px-14"
        style={{ zIndex: 3 }}
      >
        <h1
          className="font-display font-semibold text-white max-w-[640px] mb-5"
          style={{
            fontFamily: 'var(--font-display), Cormorant Garamond, Georgia, serif',
            fontSize: 'clamp(32px, 4.5vw, 56px)',
            lineHeight: 1.15,
          }}
        >
          Seu benefício do INSS — onde quer que você esteja.
        </h1>
        <p
          className="text-white/90 max-w-[520px] mb-9"
          style={{ fontSize: 'clamp(16px, 1.4vw, 18px)', lineHeight: 1.6 }}
        >
          Aposentadorias, benefícios por incapacidade, pensões e acordos bilaterais. Atendimento próximo, estratégia clara, do primeiro requerimento à decisão final.
        </p>
        <div className="flex flex-wrap items-center gap-6">
          <Link
            href="/contato"
            className="inline-block text-[15px] font-semibold tracking-[0.04em] transition-colors hover:bg-[#2F484B] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#BDE4DA] focus-visible:outline-offset-[3px]"
            style={{
              background: '#3D5C5F',
              color: '#FFFFFF',
              border: '1px solid rgba(255,255,255,0.45)',
              padding: '17px 40px',
              borderRadius: 4,
            }}
          >
            Agendar Consulta
          </Link>
          <Link
            href="/brasileiros-no-exterior"
            className="text-[15px] font-semibold text-white no-underline hover:underline hover:underline-offset-4"
          >
            Brasileiros no Exterior →
          </Link>
        </div>
      </div>

      {/* Dot navigation */}
      <div
        className="dot-nav absolute bottom-7 left-1/2 -translate-x-1/2 flex gap-3"
        style={{ zIndex: 4 }}
        role="tablist"
        aria-label="Slides"
      >
        {slides.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === active}
            aria-label={`Slide ${i + 1}`}
            onClick={() => setActive(i)}
            className="w-[11px] h-[11px] rounded-full transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#BDE4DA] focus-visible:outline-offset-2"
            style={{
              border: '1.5px solid #FFFFFF',
              background: i === active ? '#FFFFFF' : 'rgba(255,255,255,0.18)',
            }}
          />
        ))}
      </div>
    </section>
  )
}
