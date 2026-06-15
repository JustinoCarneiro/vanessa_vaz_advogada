import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getSiteSettings, extractMediaUrl } from '@/lib/api'

export function generateMetadata(): Metadata {
  return {
    title: 'Sobre Mim — Vanessa Vaz Marschallinger',
    description: 'Conheça Vanessa Vaz Marschallinger, advogada especialista em Direito Previdenciário com OAB/RJ 264.772. Atendimento no Brasil e exterior.',
    alternates: { canonical: '/sobre' },
  }
}

const timeline = [
  {
    year: '2014',
    title: 'Graduação em Direito — UFSC',
    text: 'Monografia sobre o acesso de trabalhadores rurais aos benefícios do INSS.',
  },
  {
    year: '2015',
    title: 'OAB/RJ e início da advocacia',
    text: 'Primeiros anos em escritório de direito social, atendendo segurados do INSS.',
  },
  {
    year: '2017',
    title: 'Especialização em Direito Previdenciário',
    text: 'Pós-graduação com ênfase em processo previdenciário e regime próprio.',
  },
  {
    year: '2019',
    title: 'Escritório próprio, foco exclusivo',
    text: 'Fundação da banca dedicada 100% ao Direito Previdenciário.',
  },
  {
    year: '2022',
    title: 'Membro do IBDP',
    text: 'Instituto Brasileiro de Direito Previdenciário — atualização constante em teses e jurisprudência.',
  },
  {
    year: '2025',
    title: 'Atendimento internacional',
    text: 'Consultas e acompanhamento a distância, com a mesma proximidade do presencial, para o Brasil e mais de 20 países.',
  },
]

export default async function SobrePage() {
  const settings = await getSiteSettings()
  const fotoUrl = extractMediaUrl(settings.sobreFoto)

  return (
    <>
      {/* Intro: foto + apresentação */}
      <section className="px-5 md:px-14 py-16 md:py-24" style={{ background: '#FFFFFF' }}>
        <div
          className="max-w-[1056px] mx-auto grid md:grid-cols-[1fr_420px] items-center"
          style={{ gap: '0 80px' }}
        >
          <div className="order-2 md:order-1">
            <p
              className="text-[13px] font-semibold tracking-[0.16em] uppercase mb-[18px]"
              style={{ color: '#3D5C5F' }}
            >
              Sobre mim
            </p>
            <h1
              className="font-display font-semibold text-[#111111] mb-[14px]"
              style={{
                fontFamily: 'var(--font-display), Cormorant Garamond, Georgia, serif',
                fontSize: 'clamp(32px, 4vw, 48px)',
                lineHeight: 1.12,
                textWrap: 'pretty',
              } as React.CSSProperties}
            >
              Vanessa Vaz Marschallinger
            </h1>
            <p className="text-[15px] font-semibold mb-7" style={{ color: '#3D5C5F' }}>
              Advogada previdenciarista · OAB/RJ 264.772
            </p>
            <p
              className="text-[17px] leading-[1.75] mb-4"
              style={{ color: '#333333', textWrap: 'pretty' } as React.CSSProperties}
            >
              Escolhi o Direito Previdenciário ao ver de perto o que uma negativa do INSS faz com a
              vida de uma família: a renda que falta, a doença que não espera, a sensação de falar
              com um sistema que não escuta.
            </p>
            <p
              className="text-[17px] leading-[1.75]"
              style={{ color: '#333333', textWrap: 'pretty' } as React.CSSProperties}
            >
              Desde então, minha atuação tem um único foco: traduzir esse sistema para quem precisa
              dele — e fazer cada caso andar com estratégia, prazo e transparência.
            </p>
          </div>

          {/* Foto com frame decorativo menta */}
          <div className="relative order-1 md:order-2 mb-10 md:mb-0">
            <div
              className="absolute hidden md:block"
              style={{
                top: 24,
                left: 24,
                right: -24,
                bottom: -24,
                background: '#BDE4DA',
                borderRadius: 6,
              }}
              aria-hidden="true"
            />
            {fotoUrl ? (
              <Image
                src={fotoUrl}
                alt="Retrato profissional de Vanessa"
                width={420}
                height={540}
                className="relative block w-full rounded-[6px] object-cover object-top"
                style={{ height: 540 }}
                priority
              />
            ) : (
              <div
                className="relative w-full rounded-[6px] flex items-center justify-center"
                style={{ height: 540, background: '#BDE4DA' }}
              >
                <p className="text-[13px] font-semibold text-[#3D5C5F] tracking-wide uppercase">
                  Foto não configurada
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Filosofia */}
      <section
        className="relative overflow-hidden px-5 md:px-14 py-16 md:py-[104px]"
        style={{ background: '#3D5C5F' }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/marcadagua-branco.png"
          alt=""
          className="absolute pointer-events-none"
          style={{ left: -70, bottom: -70, height: 380, width: 'auto', opacity: 0.08 }}
          aria-hidden="true"
        />
        <blockquote className="relative max-w-[880px] mx-auto text-center m-0 p-0">
          <p
            className="font-display m-0 mb-7"
            style={{
              fontFamily: 'var(--font-display), Cormorant Garamond, Georgia, serif',
              fontStyle: 'italic',
              fontWeight: 500,
              fontSize: 'clamp(24px, 3vw, 38px)',
              lineHeight: 1.4,
              color: '#FFFFFF',
              textWrap: 'pretty',
            } as React.CSSProperties}
          >
            &ldquo;Por trás de cada processo existe uma pessoa esperando uma resposta. Eu advogo
            para que ela não espere sozinha.&rdquo;
          </p>
          <footer
            className="text-[14px] font-semibold tracking-[0.14em] uppercase"
            style={{ color: '#BDE4DA' }}
          >
            Filosofia de trabalho
          </footer>
        </blockquote>
      </section>

      {/* Bio + Trajetória */}
      <section className="px-5 md:px-14 py-16 md:py-24" style={{ background: '#FFFFFF' }}>
        <div
          className="max-w-[1056px] mx-auto grid md:grid-cols-[380px_1fr] items-start"
          style={{ gap: '0 72px' }}
        >
          <div>
            <p
              className="text-[13px] font-semibold tracking-[0.16em] uppercase mb-4"
              style={{ color: '#3D5C5F' }}
            >
              Trajetória
            </p>
            <h2
              className="font-display font-semibold text-[#111111] mb-5"
              style={{
                fontFamily: 'var(--font-display), Cormorant Garamond, Georgia, serif',
                fontSize: 'clamp(28px, 3vw, 38px)',
                lineHeight: 1.2,
                textWrap: 'pretty',
              } as React.CSSProperties}
            >
              Formação e caminho até aqui
            </h2>
            <p
              className="text-[15.5px] leading-[1.75]"
              style={{ color: '#333333', textWrap: 'pretty' } as React.CSSProperties}
            >
              Mais de uma década dedicada exclusivamente ao Direito Previdenciário — da graduação à
              especialização, do balcão do INSS aos tribunais superiores.
            </p>
          </div>

          {/* Linha do tempo */}
          <ol
            className="flex flex-col mt-8 md:mt-0"
            style={{ borderLeft: '2px solid #89B0AF', gap: 40, paddingTop: 8, paddingBottom: 8 }}
          >
            {timeline.map(({ year, title, text }, i) => (
              <li key={i} className="relative" style={{ paddingLeft: 36 }}>
                <span
                  className="absolute"
                  style={{
                    left: -7,
                    top: 6,
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    background: '#3D5C5F',
                    border: '3px solid #FFFFFF',
                    boxShadow: '0 0 0 1px #89B0AF',
                  }}
                  aria-hidden="true"
                />
                <div
                  className="font-display font-semibold leading-none mb-2"
                  style={{
                    fontFamily: 'var(--font-display), Cormorant Garamond, Georgia, serif',
                    fontSize: 26,
                    color: '#3D5C5F',
                  }}
                >
                  {year}
                </div>
                <div className="text-[17px] font-semibold text-[#111111] mb-[6px]">{title}</div>
                <p className="text-[15px] leading-[1.65] text-[#444444] m-0">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section
        className="relative overflow-hidden px-5 md:px-14 py-14 md:py-[88px]"
        style={{ background: '#BDE4DA' }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/marcadagua-preto.png"
          alt=""
          className="absolute pointer-events-none"
          style={{
            right: -50,
            top: '50%',
            transform: 'translateY(-50%)',
            height: 340,
            width: 'auto',
            opacity: 0.10,
          }}
          aria-hidden="true"
        />
        <div className="relative max-w-[720px] mx-auto text-center">
          <h2
            className="font-display font-semibold text-[#111111] mb-4"
            style={{
              fontFamily: 'var(--font-display), Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(28px, 3vw, 38px)',
              lineHeight: 1.2,
              textWrap: 'pretty',
            } as React.CSSProperties}
          >
            Vamos conversar sobre o seu caso?
          </h2>
          <p
            className="text-[16.5px] leading-[1.65] mb-9"
            style={{ color: '#2A3F41', textWrap: 'pretty' } as React.CSSProperties}
          >
            Presencial na Áustria ou online, de onde você estiver.
          </p>
          <Link
            href="/contato"
            className="inline-block text-[15px] font-semibold transition-colors hover:bg-[#2F484B]"
            style={{
              background: '#3D5C5F',
              color: '#FFFFFF',
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
