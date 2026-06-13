import type { Metadata } from 'next'
import Link from 'next/link'

export function generateMetadata(): Metadata {
  return {
    title: 'Serviços — Vanessa Vaz Marschallinger',
    description:
      'Aposentadorias, aposentadoria especial, benefícios por incapacidade, BPC/LOAS, pensão por morte e revisão. Conheça todos os serviços de advocacia previdenciária.',
  }
}

const CheckIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#3D5C5F"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ flex: '0 0 auto', marginTop: 3 }}
    aria-hidden="true"
  >
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
)

const services = [
  {
    id: 'aposentadorias',
    title: 'Aposentadorias',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#3D5C5F" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3.5 2" />
      </svg>
    ),
    description:
      'Análise completa do seu histórico contributivo para identificar a melhor regra — por idade, tempo de contribuição ou transição — antes de qualquer protocolo. O pedido certo, feito na hora certa, evita anos de espera.',
    items: ['Planejamento previdenciário', 'Contagem e correção do CNIS', 'Requerimento e acompanhamento no INSS'],
  },
  {
    id: 'aposentadoria-especial',
    title: 'Aposentadoria Especial',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#3D5C5F" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3l8 3v6c0 4.5-3.2 7.8-8 9-4.8-1.2-8-4.5-8-9V6l8-3z" />
      </svg>
    ),
    description:
      'Reconhecimento do tempo trabalhado em condições insalubres ou perigosas — saúde, indústria, transporte, segurança. A diferença entre a negativa e a concessão costuma estar na qualidade da prova técnica.',
    items: ['Análise de PPP e LTCAT', 'Conversão de tempo especial em comum', 'Recurso administrativo e ação judicial'],
  },
  {
    id: 'beneficios-incapacidade',
    title: 'Benefícios por Incapacidade',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#3D5C5F" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 20s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.5-7 10-7 10z" />
      </svg>
    ),
    description:
      'Auxílio-doença e aposentadoria por invalidez: preparação para a perícia médica, prorrogação de benefício e contestação de alta indevida — para que a doença não vire também um problema de renda.',
    items: ['Preparação documental para a perícia', 'Prorrogação e restabelecimento', 'Contestação de alta indevida'],
  },
  {
    id: 'bpc-loas',
    title: 'BPC / LOAS',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#3D5C5F" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 20c.8-3.5 3.6-5.5 7-5.5s6.2 2 7 5.5" />
      </svg>
    ),
    description:
      'Benefício assistencial para pessoas com deficiência e idosos a partir de 65 anos em situação de baixa renda. Acompanhamento desde o CadÚnico até a via judicial, quando o INSS nega indevidamente.',
    items: ['Avaliação dos requisitos do benefício', 'Comprovação de renda e deficiência', 'Requerimento, recurso e ação judicial'],
  },
  {
    id: 'pensao-por-morte',
    title: 'Pensão por Morte',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#3D5C5F" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 11l9-7 9 7" />
        <path d="M5 9.5V20h14V9.5" />
        <path d="M10 20v-6h4v6" />
      </svg>
    ),
    description:
      'Orientação completa aos dependentes — cônjuge, filhos, companheiros em união estável — com a sensibilidade que o momento exige e a atenção técnica que os prazos impõem.',
    items: ['Habilitação de dependentes', 'Comprovação de união estável e dependência', 'Prazos, retroativos e duração do benefício'],
  },
  {
    id: 'revisao-de-beneficios',
    title: 'Revisão de Benefícios',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#3D5C5F" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 11a8 8 0 10-2.3 6.3" />
        <path d="M20 6v5h-5" />
      </svg>
    ),
    description:
      'Reanálise do cálculo do benefício já concedido: vínculos não computados, salários ignorados e erros de fator. Quando o INSS erra na conta, a diferença é sua por direito.',
    items: ['Conferência integral do cálculo', 'Inclusão de vínculos e salários ignorados', 'Revisão administrativa e judicial'],
  },
]

const diferenciais = [
  {
    num: '01',
    title: 'Especialização exclusiva',
    text: 'Só Direito Previdenciário — profundidade em vez de generalidade.',
  },
  {
    num: '02',
    title: 'Atendimento direto',
    text: 'Você fala com a advogada do seu caso, não com um setor de atendimento.',
  },
  {
    num: '03',
    title: 'Transparência em cada fase',
    text: 'Você sabe o que está acontecendo no seu processo — sem juridiquês.',
  },
  {
    num: '04',
    title: 'Onde você estiver',
    text: 'Atendimento presencial em Florianópolis e online em todo o Brasil.',
  },
]

export default function ServicosPage() {
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
        <div
          className="max-w-[1168px] mx-auto grid sm:grid-cols-2"
          style={{ gap: 28 }}
        >
          {services.map(({ id, title, icon, description, items }) => (
            <div
              key={id}
              id={id}
              className="flex flex-col transition-all hover:-translate-y-[5px] hover:shadow-[0_14px_30px_rgba(61,92,95,0.15)]"
              style={{ border: '1px solid #E4EAE9', borderRadius: 8, padding: '40px 38px' }}
            >
              <div
                className="flex items-center justify-center mb-6"
                style={{ width: 56, height: 56, borderRadius: '50%', background: '#BDE4DA' }}
              >
                {icon}
              </div>
              <h3
                className="font-semibold text-[#111111] mb-[14px]"
                style={{ fontSize: 23 }}
              >
                {title}
              </h3>
              <p
                className="leading-[1.7] mb-[22px]"
                style={{ fontSize: 15.5, color: '#333333', textWrap: 'pretty' } as React.CSSProperties}
              >
                {description}
              </p>
              <ul className="flex flex-col mb-7" style={{ gap: 10 }}>
                {items.map((item) => (
                  <li key={item} className="flex gap-[10px] items-start text-[14.5px] leading-[1.6]" style={{ color: '#333333' }}>
                    <CheckIcon />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href={`/contato?assunto=${encodeURIComponent(title)}`}
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
          ))}
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
