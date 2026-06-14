import type { Metadata } from 'next'
import Link from 'next/link'
import { ServicosCards } from '@/components/servicos/ServicosCards'
import { getSiteSettings } from '@/lib/api'

export function generateMetadata(): Metadata {
  return {
    title: 'Serviços — Vanessa Vaz Marschallinger',
    description:
      'Aposentadorias, aposentadoria especial, benefícios por incapacidade, BPC/LOAS, pensão por morte e revisão. Conheça todos os serviços de advocacia previdenciária.',
  }
}

const diferenciais = [
  {
    num: '01',
    title: 'Vivência internacional',
    text: 'Conheço a realidade do brasileiro no exterior por dentro — e isso faz diferença na qualidade do atendimento.',
  },
  {
    num: '02',
    title: 'Atendimento direto',
    text: 'Você fala com a advogada do seu caso — não com um setor de atendimento.',
  },
  {
    num: '03',
    title: 'Onde você estiver',
    text: 'Online em todo o Brasil e em mais de 20 países, com horário compatível com a Europa.',
  },
  {
    num: '04',
    title: 'Especialização exclusiva',
    text: 'Só Direito Previdenciário — profundidade em vez de generalidade, aqui e no exterior.',
  },
]

export default async function ServicosPage() {
  const settings = await getSiteSettings()

  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden px-5 md:px-14 pt-16 md:pt-24 pb-16 md:pb-[104px]"
        style={{ background: '#3D5C5F' }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/marcadagua-branco.png"
          alt=""
          className="absolute pointer-events-none"
          style={{ right: -60, top: '50%', transform: 'translateY(-50%)', height: 400, width: 'auto', opacity: 0.08 }}
          aria-hidden="true"
        />
        <div className="relative max-w-[760px] mx-auto text-center">
          <h1
            className="font-display font-semibold text-white mb-[18px]"
            style={{
              fontFamily: 'var(--font-display), Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(36px, 4vw, 52px)',
              lineHeight: 1.1,
            }}
          >
            Serviços
          </h1>
          <p
            className="text-[17px] leading-[1.7]"
            style={{ color: '#BDE4DA', textWrap: 'pretty' } as React.CSSProperties}
          >
            Atuação exclusiva em Direito Previdenciário — do primeiro requerimento à ação judicial,
            com acompanhamento próximo em cada etapa.
          </p>
        </div>
      </section>

      {/* Cards de serviço */}
      <section className="px-5 md:px-14 pt-14 md:pt-[88px] pb-16 md:pb-24" style={{ background: '#FFFFFF' }}>
        <div className="max-w-[1168px] mx-auto">
          <ServicosCards cmsServices={settings.servicos} />
        </div>
      </section>

      {/* Diferenciais */}
      <section className="px-5 md:px-14 py-16 md:py-24" style={{ background: '#BDE4DA' }}>
        <div
          className="max-w-[1056px] mx-auto grid md:grid-cols-[380px_1fr] items-start"
          style={{ gap: '0 72px' }}
        >
          <div>
            <p
              className="text-[13px] font-semibold tracking-[0.16em] uppercase mb-4"
              style={{ color: '#3D5C5F' }}
            >
              Diferenciais
            </p>
            <h2
              className="font-display font-semibold text-[#111111]"
              style={{
                fontFamily: 'var(--font-display), Cormorant Garamond, Georgia, serif',
                fontSize: 'clamp(28px, 3vw, 38px)',
                lineHeight: 1.2,
                textWrap: 'pretty',
              } as React.CSSProperties}
            >
              Por que escolher a Vanessa
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 mt-8 md:mt-0" style={{ gap: '40px 48px' }}>
            {diferenciais.map(({ num, title, text }) => (
              <div key={num}>
                <div
                  className="font-display font-medium leading-none mb-3"
                  style={{
                    fontFamily: 'var(--font-display), Cormorant Garamond, Georgia, serif',
                    fontSize: 36,
                    color: '#3D5C5F',
                  }}
                >
                  {num}
                </div>
                <h3 className="text-[18px] font-semibold text-[#111111] mb-2">{title}</h3>
                <p className="text-[14.5px] leading-[1.65] m-0" style={{ color: '#2A3F41' }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section
        className="relative overflow-hidden px-5 md:px-14 py-16 md:py-24"
        style={{ background: '#3D5C5F' }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/marcadagua-branco.png"
          alt=""
          className="absolute pointer-events-none"
          style={{ right: -60, top: '50%', transform: 'translateY(-50%)', height: 380, width: 'auto', opacity: 0.08 }}
          aria-hidden="true"
        />
        <div className="relative max-w-[760px] mx-auto text-center">
          <h2
            className="font-display font-semibold text-white mb-4"
            style={{
              fontFamily: 'var(--font-display), Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(28px, 3vw, 40px)',
              lineHeight: 1.2,
              textWrap: 'pretty',
            } as React.CSSProperties}
          >
            Não encontrou a sua situação aqui?
          </h2>
          <p
            className="text-[16.5px] leading-[1.65] mb-9"
            style={{ color: '#BDE4DA', textWrap: 'pretty' } as React.CSSProperties}
          >
            Cada caso previdenciário é único. Descreva o seu e eu indico o melhor caminho.
          </p>
          <Link
            href="/contato"
            className="inline-block text-[15px] font-semibold transition-colors hover:bg-[#BDE4DA]"
            style={{
              background: '#FFFFFF',
              color: '#3D5C5F',
              padding: '17px 44px',
              borderRadius: 4,
              letterSpacing: '0.04em',
              textDecoration: 'none',
            }}
          >
            Agendar Consulta
          </Link>
        </div>
      </section>
    </>
  )
}
