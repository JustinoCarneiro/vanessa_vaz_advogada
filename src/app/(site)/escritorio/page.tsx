import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export function generateMetadata(): Metadata {
  return {
    title: 'Sobre o Escritório — Vanessa Vaz Marschallinger',
    description:
      'Escritório especializado em Direito Previdenciário em Florianópolis/SC com atendimento online. Conheça nossa missão, valores e diferenciais.',
  }
}

const valores = [
  {
    label: 'Clareza',
    description:
      'Explicamos cada passo sem juridiquês. Você entende o que está sendo feito e por quê.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3D5C5F" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 7l9-4 9 4-9 4-9-4z" />
        <path d="M7 9.5V14c0 1.5 2.2 2.5 5 2.5s5-1 5-2.5V9.5" />
      </svg>
    ),
  },
  {
    label: 'Compromisso',
    description:
      'Assumimos os casos em que podemos ajudar de verdade — e os conduzimos até o fim.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3D5C5F" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3l8 3v6c0 4.5-3.2 7.8-8 9-4.8-1.2-8-4.5-8-9V6l8-3z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    label: 'Acolhimento',
    description:
      'Quem procura advogado previdenciário costuma estar fragilizado. Aqui, é tratado com respeito.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3D5C5F" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 21s-7-5.5-7-11a7 7 0 1114 0c0 5.5-7 11-7 11z" />
        <path d="M9.5 11l1.8 1.8 3.5-3.6" />
      </svg>
    ),
  },
]

const diferenciais = [
  {
    title: 'Atuação exclusivamente previdenciária',
    text: 'Sem dividir foco com outras áreas — profundidade real no INSS.',
  },
  {
    title: 'Atendimento direto com a advogada',
    text: 'Você conversa com quem cuida do seu processo, não com intermediários.',
  },
  {
    title: 'Presencial e online',
    text: 'Em Florianópolis ou de onde você estiver, com o mesmo cuidado.',
  },
  {
    title: 'Acompanhamento transparente',
    text: 'Atualizações claras em cada fase, do protocolo à decisão.',
  },
]

export default function EscritorioPage() {
  return (
    <>
      {/* Hero com foto */}
      <section className="relative overflow-hidden" style={{ height: 520, background: '#2F484B' }}>
        <Image
          src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1800&q=80"
          alt="Ambiente do escritório"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(90deg, rgba(18,32,34,0.78) 0%, rgba(18,32,34,0.45) 55%, rgba(18,32,34,0.25) 100%)' }}
        />
        <div className="relative h-full max-w-[1168px] mx-auto px-14 flex flex-col justify-center">
          <div className="max-w-[560px]">
            <p
              className="text-[13px] font-semibold tracking-[0.16em] uppercase mb-[18px]"
              style={{ color: '#BDE4DA' }}
            >
              O escritório
            </p>
            <h1
              className="font-display font-semibold text-white mb-[18px]"
              style={{
                fontFamily: 'var(--font-display), Cormorant Garamond, Georgia, serif',
                fontSize: 'clamp(32px, 4vw, 52px)',
                lineHeight: 1.12,
                textWrap: 'pretty',
              } as React.CSSProperties}
            >
              Um lugar para ser ouvido com calma
            </h1>
            <p
              className="text-[17px] leading-[1.7]"
              style={{ color: 'rgba(255,255,255,0.92)', textWrap: 'pretty' } as React.CSSProperties}
            >
              Um escritório pensado para acolher quem chega preocupado — com a técnica de uma
              banca especializada e a atenção de quem trata cada caso como único.
            </p>
          </div>
        </div>
      </section>

      {/* Missão */}
      <section style={{ background: '#FFFFFF', padding: '96px 56px' }}>
        <div className="max-w-[880px] mx-auto text-center">
          <p
            className="text-[13px] font-semibold tracking-[0.16em] uppercase mb-5"
            style={{ color: '#3D5C5F' }}
          >
            Nossa missão
          </p>
          <p
            className="font-display font-medium m-0"
            style={{
              fontFamily: 'var(--font-display), Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(22px, 2.5vw, 32px)',
              lineHeight: 1.45,
              color: '#111111',
              textWrap: 'pretty',
            } as React.CSSProperties}
          >
            Garantir que cada pessoa receba do INSS exatamente o que tem direito — nem menos, por
            desinformação; nem mais tarde, por um processo mal conduzido.
          </p>
        </div>
      </section>

      {/* Valores */}
      <section style={{ background: '#BDE4DA', padding: '96px 56px' }}>
        <div className="max-w-[1056px] mx-auto">
          <div className="text-center mb-14">
            <p
              className="text-[13px] font-semibold tracking-[0.16em] uppercase mb-[14px]"
              style={{ color: '#3D5C5F' }}
            >
              No que acreditamos
            </p>
            <h2
              className="font-display font-semibold text-[#111111] m-0"
              style={{
                fontFamily: 'var(--font-display), Cormorant Garamond, Georgia, serif',
                fontSize: 'clamp(28px, 3vw, 38px)',
                lineHeight: 1.2,
              }}
            >
              Valores que guiam cada caso
            </h2>
          </div>
          <div className="grid md:grid-cols-3" style={{ gap: 28 }}>
            {valores.map(({ label, description, icon }) => (
              <div
                key={label}
                className="flex flex-col"
                style={{ background: '#FFFFFF', borderRadius: 8, padding: '40px 32px' }}
              >
                <div
                  className="flex items-center justify-center mb-[22px]"
                  style={{ width: 52, height: 52, borderRadius: '50%', background: '#BDE4DA' }}
                >
                  {icon}
                </div>
                <h3 className="text-[20px] font-semibold text-[#111111] mb-[10px]">{label}</h3>
                <p className="text-[15px] leading-[1.7] m-0" style={{ color: '#444444' }}>
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section style={{ background: '#FFFFFF', padding: '96px 56px' }}>
        <div
          className="max-w-[1056px] mx-auto grid md:grid-cols-[480px_1fr] items-center"
          style={{ gap: '0 72px' }}
        >
          {/* Foto com frame */}
          <div className="relative mb-10 md:mb-0">
            <div
              className="absolute hidden md:block"
              style={{ top: -22, left: -22, width: 140, height: 140, background: '#BDE4DA', borderRadius: 6 }}
              aria-hidden="true"
            />
            <Image
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1100&q=80"
              alt="Detalhe do escritório"
              width={480}
              height={460}
              className="relative block w-full rounded-[6px] object-cover"
              style={{ height: 460 }}
            />
          </div>

          <div>
            <p
              className="text-[13px] font-semibold tracking-[0.16em] uppercase mb-4"
              style={{ color: '#3D5C5F' }}
            >
              Diferenciais
            </p>
            <h2
              className="font-display font-semibold text-[#111111] mb-8"
              style={{
                fontFamily: 'var(--font-display), Cormorant Garamond, Georgia, serif',
                fontSize: 'clamp(26px, 3vw, 36px)',
                lineHeight: 1.2,
                textWrap: 'pretty',
              } as React.CSSProperties}
            >
              O que você encontra aqui
            </h2>
            <div className="flex flex-col" style={{ gap: 26 }}>
              {diferenciais.map(({ title, text }) => (
                <div key={title} className="flex items-start" style={{ gap: 18 }}>
                  <div
                    className="flex items-center justify-center shrink-0"
                    style={{ width: 40, height: 40, borderRadius: '50%', background: '#BDE4DA' }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3D5C5F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12.5l4.5 4.5L19 7.5" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-[17px] font-semibold text-[#111111] mb-1">{title}</h3>
                    <p className="text-[15px] leading-[1.65] m-0" style={{ color: '#444444' }}>{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="relative overflow-hidden"
        style={{ background: '#3D5C5F', padding: '96px 56px' }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/marcadagua-branco.png"
          alt=""
          className="absolute pointer-events-none"
          style={{ right: -60, top: '50%', transform: 'translateY(-50%)', height: 380, width: 'auto', opacity: 0.08 }}
          aria-hidden="true"
        />
        <div className="relative max-w-[720px] mx-auto text-center">
          <h2
            className="font-display font-semibold text-white mb-4"
            style={{
              fontFamily: 'var(--font-display), Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(28px, 3vw, 40px)',
              lineHeight: 1.2,
              textWrap: 'pretty',
            } as React.CSSProperties}
          >
            Conheça o escritório de perto
          </h2>
          <p
            className="text-[16.5px] leading-[1.65] mb-9"
            style={{ color: '#BDE4DA', textWrap: 'pretty' } as React.CSSProperties}
          >
            Agende uma conversa presencial em Florianópolis ou um atendimento online.
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
