import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { CtaSection } from '@/components/home/CtaSection'
import { getIcone } from '@/components/servicos/servicosIcons'

export function generateMetadata(): Metadata {
  return {
    title: 'Advocacia Previdenciária para Brasileiros no Exterior | INSS',
    description:
      'Atendimento especializado em aposentadorias, acordos internacionais e manutenção de INSS para brasileiros residentes na Europa, Américas e todo o mundo.',
  }
}

const vantagens = [
  {
    num: '01',
    title: 'Fuso horário alinhado',
    text: 'Sendo baseada na Áustria, o atendimento acontece em horário comercial europeu, sem que você precise acordar de madrugada para falar com o Brasil.',
  },
  {
    num: '02',
    title: 'Compreensão da burocracia internacional',
    text: 'Sei exatamente a dificuldade de conseguir documentos em consulados ou órgãos estrangeiros. A estratégia já contempla essas barreiras.',
  },
  {
    num: '03',
    title: 'Comunicação direta e pessoal',
    text: 'Seu processo não passa de mão em mão. Você fala diretamente com a advogada, em português, com total clareza sobre cada etapa.',
  },
  {
    num: '04',
    title: 'Atendimento 100% digital',
    text: 'Da assinatura da procuração até a concessão do benefício, tudo é feito de forma digital e segura, sem necessidade de deslocamentos.',
  },
]

const servicos = [
  {
    icon: 'globo',
    title: 'Acordos Internacionais (Bilaterais)',
    text: 'Soma do tempo de contribuição do Brasil com o tempo trabalhado no país em que você reside atualmente, permitindo a aposentadoria nos dois países de forma proporcional.',
  },
  {
    icon: 'escudo',
    title: 'Manutenção da Qualidade de Segurado',
    text: 'Estratégias para que você não perca a proteção do INSS (como auxílio-doença e pensão por morte para seus dependentes) mesmo morando fora do Brasil há anos.',
  },
  {
    icon: 'dinheiro',
    title: 'Contribuição do Exterior',
    text: 'Como e por que continuar pagando o INSS morando no exterior (como segurado facultativo). Evite pagamentos em códigos errados que o INSS não reconhecerá no futuro.',
  },
  {
    icon: 'relogio',
    title: 'Planejamento de Aposentadoria Global',
    text: 'Cálculo de qual é o momento ideal para pedir a aposentadoria no Brasil, considerando as regras de câmbio, bitributação e acordos previdenciários do seu país de residência.',
  },
]

export default function BrasileirosExteriorPage() {
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
          <p
            className="text-[13px] font-semibold tracking-[0.16em] uppercase mb-4"
            style={{ color: '#BDE4DA' }}
          >
            Atendimento Internacional
          </p>
          <h1
            className="font-display font-semibold text-white mb-[18px]"
            style={{
              fontFamily: 'var(--font-display), Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(32px, 4vw, 52px)',
              lineHeight: 1.1,
              textWrap: 'pretty',
            } as React.CSSProperties}
          >
            Advocacia Previdenciária para Brasileiros no Exterior
          </h1>
          <p
            className="text-[17px] leading-[1.7]"
            style={{ color: '#E4EAE9', textWrap: 'pretty' } as React.CSSProperties}
          >
            Seu tempo trabalhado no Brasil não foi em vão. Estruturamos o seu caso
            para garantir o melhor cenário de aposentadoria internacional, com segurança e atendimento 100% digital.
          </p>
        </div>
      </section>

      {/* Serviços Específicos */}
      <section className="py-20 md:py-[100px]" style={{ background: '#FFFFFF' }}>
        <Container>
          <SectionTitle
            overline="Nossas Soluções"
            title="Como proteger seu futuro morando fora"
            align="center"
            className="mb-12"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-[40px] max-w-[900px] mx-auto">
            {servicos.map(({ icon, title, text }) => (
              <div key={title} className="p-8 rounded-lg" style={{ background: '#F7FAF9', border: '1px solid #EDF1F0' }}>
                <div className="mb-5">{getIcone(icon)}</div>
                <h3 className="text-[19px] font-semibold text-[#111111] mb-3">{title}</h3>
                <p className="text-[15px] leading-[1.65] text-[#333333] m-0">{text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Diferenciais / Por que escolher */}
      <section className="py-20 md:py-[100px]" style={{ background: '#BDE4DA' }}>
        <Container>
          <div
            className="max-w-[1056px] mx-auto grid md:grid-cols-[380px_1fr] items-start"
            style={{ gap: '0 72px' }}
          >
            <div>
              <p
                className="text-[13px] font-semibold tracking-[0.16em] uppercase mb-4"
                style={{ color: '#3D5C5F' }}
              >
                Vantagens
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
                Por que contratar uma advogada que também mora na Europa?
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 mt-8 md:mt-0" style={{ gap: '40px 48px' }}>
              {vantagens.map(({ num, title, text }) => (
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
        </Container>
      </section>

      <CtaSection 
        headline="Proteja seus direitos previdenciários onde você estiver." 
        sub="Agende uma consulta online para analisarmos seu caso internacional."
      />
    </>
  )
}
