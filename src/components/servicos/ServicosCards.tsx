'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import type { SiteSettingsServico } from '@/lib/api'

// ─── Ícones fixos (ordem igual aos defaults abaixo) ───────────────────────────

const ICONS: React.ReactNode[] = [
  <svg key="apo" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#3D5C5F" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" />
  </svg>,
  <svg key="esp" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#3D5C5F" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3l8 3v6c0 4.5-3.2 7.8-8 9-4.8-1.2-8-4.5-8-9V6l8-3z" />
  </svg>,
  <svg key="inc" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#3D5C5F" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 20s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.5-7 10-7 10z" />
  </svg>,
  <svg key="bpc" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#3D5C5F" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="8" r="3.5" /><path d="M5 20c.8-3.5 3.6-5.5 7-5.5s6.2 2 7 5.5" />
  </svg>,
  <svg key="pen" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#3D5C5F" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 11l9-7 9 7" /><path d="M5 9.5V20h14V9.5" /><path d="M10 20v-6h4v6" />
  </svg>,
  <svg key="rev" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#3D5C5F" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 11a8 8 0 10-2.3 6.3" /><path d="M20 6v5h-5" />
  </svg>,
]

const IDS = [
  'aposentadorias',
  'aposentadoria-especial',
  'beneficios-incapacidade',
  'bpc-loas',
  'pensao-por-morte',
  'revisao-de-beneficios',
]

// ─── Componentes internos ──────────────────────────────────────────────────────

const CheckIcon = () => (
  <svg
    width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="#3D5C5F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    style={{ flex: '0 0 auto', marginTop: 3 }} aria-hidden="true"
  >
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
)

const ArrowIcon = ({ dir }: { dir: 'prev' | 'next' }) => (
  <svg
    width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true"
  >
    {dir === 'prev' ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
  </svg>
)

type CardProps = {
  id: string
  icon: React.ReactNode
  titulo: string
  descricao: string
  itens: Array<{ item: string; id?: string }>
  className?: string
}

function Card({ id, icon, titulo, descricao, itens, className = '' }: CardProps) {
  return (
    <div
      id={id}
      className={`flex flex-col transition-all hover:-translate-y-[5px] hover:shadow-[0_14px_30px_rgba(61,92,95,0.15)] ${className}`}
      style={{ border: '1px solid #E4EAE9', borderRadius: 8, padding: '40px 38px' }}
    >
      <div
        className="flex items-center justify-center mb-6"
        style={{ width: 56, height: 56, borderRadius: '50%', background: '#BDE4DA' }}
      >
        {icon}
      </div>
      <h3 className="font-semibold text-[#111111] mb-[14px]" style={{ fontSize: 23 }}>
        {titulo}
      </h3>
      <p
        className="leading-[1.7] mb-[22px]"
        style={{ fontSize: 15.5, color: '#333333', textWrap: 'pretty' } as React.CSSProperties}
      >
        {descricao}
      </p>
      <ul className="flex flex-col mb-7" style={{ gap: 10 }}>
        {itens.map(({ item }, i) => (
          <li key={i} className="flex gap-[10px] items-start text-[14.5px] leading-[1.6]" style={{ color: '#333333' }}>
            <CheckIcon />
            {item}
          </li>
        ))}
      </ul>
      <Link
        href={`/contato?assunto=${encodeURIComponent(titulo)}`}
        className="mt-auto self-start inline-block text-[14px] font-semibold transition-colors hover:bg-[#3D5C5F] hover:text-white"
        style={{
          color: '#3D5C5F',
          background: 'none',
          border: '1.5px solid #3D5C5F',
          padding: '12px 26px',
          borderRadius: 4,
          letterSpacing: '0.03em',
          textDecoration: 'none',
        }}
      >
        Fale sobre este caso
      </Link>
    </div>
  )
}

// ─── Componente principal ──────────────────────────────────────────────────────

type Props = {
  cmsServices?: SiteSettingsServico[]
}

export function ServicosCards({ cmsServices }: Props) {
  const services = (cmsServices ?? []).map((s, i) => ({
    id: IDS[i],
    icon: ICONS[i],
    titulo: s.titulo,
    descricao: s.descricao,
    itens: s.itens ?? [],
  }))

  const scrollRef = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)

  function scrollToCard(index: number) {
    const el = scrollRef.current
    if (!el) return
    const card = el.children[index] as HTMLElement
    el.scrollTo({ left: card.offsetLeft - 40, behavior: 'smooth' })
    setCurrent(index)
  }

  function handleScroll() {
    const el = scrollRef.current
    if (!el) return
    const cards = Array.from(el.children) as HTMLElement[]
    const scrollLeft = el.scrollLeft + 40
    let nearestIdx = 0
    let minDist = Infinity
    cards.forEach((card, i) => {
      const dist = Math.abs(card.offsetLeft - scrollLeft)
      if (dist < minDist) { minDist = dist; nearestIdx = i }
    })
    setCurrent(nearestIdx)
  }

  return (
    <>
      {/* Mobile / tablet: carrossel */}
      <div className="md:hidden">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-7 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden -mx-5 pb-2"
          style={{ scrollbarWidth: 'none', paddingLeft: '40px', paddingRight: '40px', scrollPaddingLeft: '40px' }}
        >
          {services.map((s) => (
            <Card key={s.id} {...s} className="snap-start shrink-0 w-[calc(100vw-80px)]" />
          ))}
        </div>

        {/* Navegação: setas + pontos */}
        <div className="flex items-center justify-center gap-4 mt-7">
          <button
            onClick={() => scrollToCard(Math.max(0, current - 1))}
            disabled={current === 0}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-[#3D5C5F] text-[#3D5C5F] disabled:opacity-25 transition-opacity"
            aria-label="Serviço anterior"
          >
            <ArrowIcon dir="prev" />
          </button>

          <div className="flex items-center gap-[6px]">
            {services.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToCard(i)}
                aria-label={`Ir para serviço ${i + 1}`}
                className={`rounded-full transition-all duration-200 ${
                  i === current ? 'w-5 h-[7px] bg-[#3D5C5F]' : 'w-[7px] h-[7px] bg-[#89B0AF]'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => scrollToCard(Math.min(services.length - 1, current + 1))}
            disabled={current === services.length - 1}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-[#3D5C5F] text-[#3D5C5F] disabled:opacity-25 transition-opacity"
            aria-label="Próximo serviço"
          >
            <ArrowIcon dir="next" />
          </button>
        </div>
      </div>

      {/* Desktop: grid 2 colunas */}
      <div className="hidden md:grid md:grid-cols-2" style={{ gap: 28 }}>
        {services.map((s) => (
          <Card key={s.id} {...s} />
        ))}
      </div>
    </>
  )
}
