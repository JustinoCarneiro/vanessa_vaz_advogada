import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import CookieConsent from '@/components/landing/CookieConsent'
import CookiePreferencesButton from '@/components/landing/CookiePreferencesButton'
import ScrollRevealPhoto from '@/components/landing/ScrollRevealPhoto'
import WhatsAppCta from '@/components/landing/WhatsAppCta'
import { getIcone } from '@/components/servicos/servicosIcons'
import styles from './page.module.css'

const title = 'Previdência no exterior | Vanessa Vaz Marschallinger'
const description =
  'Orientação previdenciária para brasileiros no exterior: aposentadoria, INSS, acordos internacionais e planejamento com atendimento em português e 100% digital.'
const whatsappMessage =
  'Olá, Vanessa! Vim pela página de Previdência no Exterior e gostaria de entender melhor o meu caso.'
// Destino direto: o wa.me só redireciona para api.whatsapp.com/send. Ir direto poupa um salto de rede,
// e app_absent=0 faz o celular tentar abrir o app na hora. A mensagem chega pré-preenchida.
const whatsapp = `https://api.whatsapp.com/send/?${new URLSearchParams({
  phone: '436704071939',
  text: whatsappMessage,
  type: 'phone_number',
  app_absent: '0',
})}`
const siteUrl = 'https://www.vanessavazadv.com.br/sobre'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/previdencia-no-exterior' },
  authors: [{ name: 'Vanessa Vaz Marschallinger' }],
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Vanessa Vaz Marschallinger — Advocacia Previdenciária',
    url: '/previdencia-no-exterior',
    title,
    description,
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Vanessa Vaz Marschallinger — Advocacia Previdenciária',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og-image.png'],
  },
}

const ctaLabel = 'Quero saber se meus anos contam'

const questions = [
  'Os anos que contribuí no Brasil ainda contam?',
  'Vale a pena continuar pagando INSS morando fora?',
  'Posso aproveitar contribuições feitas nos dois países?',
  'Estou contribuindo da forma correta?',
  'E se eu voltar ao Brasil, o que acontece com meu histórico previdenciário?',
]

const steps = [
  {
    title: 'Entendemos o seu histórico',
    text: 'Brasil, país onde vive, idade, contribuições e objetivos. Esse é o ponto de partida.',
  },
  {
    title: 'Analisamos o cenário previdenciário',
    text: 'INSS, vínculos, acordos aplicáveis e alternativas que merecem estudo no seu caso.',
  },
  {
    title: 'Você entende os próximos passos',
    text: 'Orientação clara sobre quais caminhos fazem sentido para a sua situação.',
  },
]

const services = [
  {
    icon: 'globo',
    title: 'Acordos internacionais',
    text: 'Esclarecemos como o tempo de contribuição no Brasil e no país em que você vive pode ser analisado à luz dos acordos internacionais em vigor.',
  },
  {
    icon: 'escudo',
    title: 'Proteção do INSS',
    text: 'Explicamos o que é a qualidade de segurado e o que ela representa para quem mora fora do Brasil.',
  },
  {
    icon: 'dinheiro',
    title: 'Contribuição do exterior',
    text: 'Explicamos como funcionam os códigos de pagamento e as formas de contribuição para quem vive fora do Brasil.',
  },
  {
    icon: 'relogio',
    title: 'Planejamento da aposentadoria',
    text: 'Avaliamos os fatores que influenciam o momento de planejar sua aposentadoria.',
  },
]

const advantages = [
  {
    icon: 'relogio',
    title: 'Fuso horário alinhado',
    text: 'Atendimento em horário comercial europeu, sem que você precise adaptar sua rotina ao fuso brasileiro.',
  },
  {
    icon: 'globo',
    title: 'Vivência internacional',
    text: 'Vanessa também vive fora do Brasil e conhece, na prática, os desafios de lidar com documentos, consulados e rotinas entre países.',
  },
  {
    icon: 'telefone',
    title: 'Conversa direta',
    text: 'Você fala diretamente com a advogada, em português, com clareza sobre cada etapa.',
  },
  {
    icon: 'rede',
    title: 'Atendimento 100% digital',
    text: 'Atendimento, documentação e acompanhamento organizados online, sem deslocamentos desnecessários.',
  },
]

function WhatsAppLink() {
  return (
    <WhatsAppCta href={whatsapp} className={styles.cta} ariaLabel={`${ctaLabel} — falar pelo WhatsApp`}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 11.5a8.5 8.5 0 0 1-12.4 7.6L4 20l1-4.4A8.5 8.5 0 1 1 21 11.5Z" />
        <path d="M9 8.5c.5 3 3 5.5 6 6l1-1.5-2-1-1 1M9 8.5l1.5-1 1 2-1 1" />
      </svg>
      {ctaLabel}
      <span aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 7h10v10" />
          <path d="M7 17 17 7" />
        </svg>
      </span>
    </WhatsAppCta>
  )
}

export default function PrevidenciaExteriorPage() {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.heroGrid}>
          <header className={styles.header}>
            <div className={styles.logoBlock}>
              <Image
                src="/logo-teal.png"
                alt="Vanessa Vaz Marschallinger — Advocacia Previdenciária"
                width={2920}
                height={840}
                className={styles.logo}
                priority
              />
            </div>
            <span className={styles.headerNote}>Na Europa. Perto de você.</span>
          </header>
          <div className={styles.heroTextCol}>
            <div className={styles.heroContent}>
              <p className={styles.eyebrow}>Previdência para brasileiros no exterior</p>
              <h1 id="landing-title">
                <span>Você contribuiu para o INSS no Brasil?</span>{' '}
                <span className={styles.h1Sub}>Esses anos podem contar para sua aposentadoria, mesmo morando fora.</span>
              </h1>
              <p className={styles.lead}>
                Advocacia previdenciária 100% digital para brasileiros no exterior, com atendimento em português.
              </p>
              <WhatsAppLink />
              <p className={styles.heroCredit}>Vanessa Vaz Marschallinger · OAB/RJ 264.772</p>
            </div>
          </div>
          <div className={styles.heroPhotoCol}>
            <span className={styles.heroPhotoAccent} aria-hidden="true" />
            <ScrollRevealPhoto className={styles.photoFrame}>
              <Image
                src="/fotos/vanessa-retrato.jpg"
                alt="Vanessa Vaz Marschallinger"
                width={768}
                height={1364}
                className={styles.photo}
                priority
              />
            </ScrollRevealPhoto>
          </div>
        </div>
        <main id="conteudo">
          <section className={styles.questions} aria-labelledby="questions-title">
            <div className={styles.container}>
              <p className={styles.eyebrow}>Para quem mora fora</p>
              <h2 id="questions-title">Morar fora do Brasil muda as perguntas que você faz sobre sua aposentadoria.</h2>
              <ul className={styles.questionGrid}>
                {questions.map(question => <li key={question}>{question}</li>)}
              </ul>
              <p className={styles.transition}>
                As respostas dependem do seu histórico. É por isso que cada caso precisa ser analisado individualmente.
              </p>
            </div>
          </section>

          <section className={styles.steps} aria-labelledby="steps-title">
            <div className={styles.container}>
              <p className={styles.eyebrow}>Como funciona a análise</p>
              <h2 id="steps-title">Você chama. A gente analisa. Você entende.</h2>
              <ol className={styles.stepGrid}>
                {steps.map((step, index) => (
                  <li key={step.title}>
                    <span className={styles.stepNumber} aria-hidden="true">{index + 1}</span>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section className={styles.services} aria-labelledby="services-title">
            <div className={styles.container}>
              <p className={styles.eyebrow}>O que analisamos</p>
              <h2 id="services-title">É isso que analisamos no seu caso.</h2>
              <div className={styles.serviceGrid}>
                {services.map((service) => (
                  <article className={styles.service} key={service.title}>
                    <span className={styles.iconCircle} aria-hidden="true">{getIcone(service.icon)}</span>
                    <h3>{service.title}</h3>
                    <p>{service.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className={styles.advantages} aria-labelledby="advantages-title">
            <div className={styles.container}>
              <p className={styles.eyebrow}>Próximo de você, mesmo à distância</p>
              <h2 id="advantages-title">Uma advogada que entende a sua realidade.</h2>
              <div className={styles.bio}>
                <p className={styles.bioName}>Vanessa Vaz Marschallinger</p>
                <p>Advogada · OAB/RJ 264.772</p>
                <p>Atuação em Direito Previdenciário para brasileiros residentes no exterior.</p>
                <p>Já atendi brasileiros em mais de 20 países.</p>
              </div>
              <div className={styles.advantageGrid}>
                {advantages.map(advantage => (
                  <article key={advantage.title}>
                    <span className={styles.iconCircleAlt} aria-hidden="true">{getIcone(advantage.icon)}</span>
                    <h3>{advantage.title}</h3>
                    <p>{advantage.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className={styles.closing} aria-labelledby="contact-title">
            <div className={styles.container}>
              <p className={styles.eyebrow}>Seu próximo passo</p>
              <h2 id="contact-title">Entenda se os anos que você contribuiu no Brasil podem contar para sua aposentadoria.</h2>
              <p>Converse diretamente com a advogada e entenda quais são os próximos passos no seu caso.</p>
              <p className={styles.tagline}>Você chama. A gente analisa. Você entende.</p>
              <div className={styles.closingCta}><WhatsAppLink /></div>
              <p className={styles.signature}>Vanessa Vaz Marschallinger · OAB/RJ 264.772</p>
              <a className={styles.siteLink} href={siteUrl} target="_blank" rel="noopener noreferrer">
                Conheça mais sobre a advogada e o escritório
              </a>
              <div className={styles.legal}>
                <Link href="/politica-de-cookies">Política de Cookies</Link>
                <CookiePreferencesButton className={styles.legalButton} />
              </div>
            </div>
          </section>
        </main>
      </div>
      <aside className={styles.contactBar} aria-label="Contato pelo WhatsApp">
        <div className={styles.contactBarInner}>
          <p>Atendimento em português, de onde você estiver.</p>
          <WhatsAppLink />
        </div>
      </aside>
      <CookieConsent />
    </div>
  )
}
