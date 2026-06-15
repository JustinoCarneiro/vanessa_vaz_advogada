import type { Metadata } from 'next'
import { ContactForm } from '@/components/contact/ContactForm'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Container } from '@/components/ui/Container'

export function generateMetadata(): Metadata {
  return {
    title: 'Contato — Vanessa Vaz Marschallinger',
    description:
      'Entre em contato com a advogada previdenciária Vanessa Vaz Marschallinger. Atendimento online para o Brasil e todo o mundo. Retorno em até 1 dia útil.',
    alternates: { canonical: '/contato' },
  }
}

const contactInfo = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3D5C5F" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0, marginTop: 2 }}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 6 9-6" />
      </svg>
    ),
    label: 'Email',
    content: (
      <a href="mailto:vazvanessamarschallinger@gmail.com" className="text-[13px] font-semibold underline underline-offset-[4px] break-words" style={{ color: '#3D5C5F' }}>
        vazvanessamarschallinger@gmail.com
      </a>
    ),
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3D5C5F" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0, marginTop: 2 }}>
        <path d="M12 21s-7-5.5-7-11a7 7 0 1114 0c0 5.5-7 11-7 11z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
    label: 'Localização',
    content: (
      <span className="text-[14px] leading-[1.6] text-[#333333]">
        Gunskirchen, Áustria<br />
        Atendimento internacional
      </span>
    ),
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3D5C5F" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true" style={{ flexShrink: 0, marginTop: 2 }}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3.5 2" />
      </svg>
    ),
    label: 'Horário',
    content: (
      <span className="text-[14px] leading-[1.6] text-[#333333]">
        Segunda a sexta, 9h às 18h
      </span>
    ),
  },
]

const socialLinks = [
  {
    href: '#',
    label: 'Instagram',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3D5C5F" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1" fill="#3D5C5F" stroke="none" />
      </svg>
    ),
  },
  {
    href: '#',
    label: 'LinkedIn',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#3D5C5F" aria-hidden="true">
        <path d="M4.98 3.5a2.49 2.49 0 11-.02 4.98 2.49 2.49 0 01.02-4.98zM3 9h4v12H3zM9.5 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.5c0-1.3-.02-3-1.83-3-1.83 0-2.1 1.43-2.1 2.9V21h-3.97z" />
      </svg>
    ),
  },
  {
    href: 'https://wa.me/436704071939',
    label: 'WhatsApp',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3D5C5F" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 11.5a8.5 8.5 0 01-12.4 7.6L4 20l1-4.4A8.5 8.5 0 1121 11.5z" />
        <path d="M9 9.5c.5 2.5 3 5 5.5 5.5l1-1.5 2 1" />
      </svg>
    ),
  },
]

export default function ContatoPage() {
  return (
    <>
      {/* Header mint */}
      <section
        className="relative overflow-hidden"
        style={{ background: '#BDE4DA', padding: '80px 24px' }}
        aria-labelledby="contato-heading"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/marcadagua-preto.png"
          alt=""
          className="absolute pointer-events-none"
          style={{ right: -50, top: '50%', transform: 'translateY(-50%)', height: 340, width: 'auto', opacity: 0.10 }}
          aria-hidden="true"
        />
        <div className="relative max-w-[760px] mx-auto text-center">
          <h1
            id="contato-heading"
            className="font-display font-semibold text-[#111111] mb-4"
            style={{
              fontFamily: 'var(--font-display), Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(36px, 5vw, 52px)',
              lineHeight: 1.1,
            }}
          >
            Contato
          </h1>
          <p className="text-[17px] leading-[1.65]" style={{ color: '#2A3F41', textWrap: 'pretty' } as React.CSSProperties}>
            Conte a sua situação com calma — cada mensagem é lida pessoalmente, e você recebe
            retorno em até 1 dia útil.
          </p>
        </div>
      </section>

      {/* Formulário + aside */}
      <section className="py-[88px] pb-24" style={{ background: '#FFFFFF' }}>
        <Container>
          <div className="grid lg:grid-cols-[1fr_360px] gap-[72px] items-start max-w-[1056px] mx-auto">
            {/* Formulário */}
            <div>
              <SectionTitle
                overline="Fale Conosco"
                title="Descreva a sua situação"
                className="mb-10"
              />
              <ContactForm />
            </div>

            {/* Aside de informações */}
            <aside
              className="flex flex-col gap-7"
              style={{ background: '#F7FAF9', borderRadius: 8, padding: '36px 32px' }}
            >
              <div>
                <p className="text-[13px] font-semibold tracking-[0.14em] uppercase mb-[6px]" style={{ color: '#3D5C5F' }}>
                  Prefere falar direto?
                </p>
                <p className="text-[14px] leading-[1.65] m-0" style={{ color: '#333333' }}>
                  Todos os canais chegam na mesma caixa — a da Vanessa.
                </p>
              </div>

              {contactInfo.map(({ icon, label, content }) => (
                <div key={label} className="flex gap-[14px] items-start">
                  {icon}
                  <div>
                    <p className="text-[13px] font-semibold text-[#111111] mb-[3px] m-0">{label}</p>
                    {content}
                  </div>
                </div>
              ))}

              {/* Redes sociais */}
              <div className="flex gap-[14px] pt-6" style={{ borderTop: '1px solid #E4EAE9' }}>
                {socialLinks.map(({ href, label, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex items-center justify-center w-[42px] h-[42px] rounded-full transition-colors hover:bg-[#BDE4DA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3D5C5F] focus-visible:outline-offset-3"
                    style={{ border: '1px solid #89B0AF' }}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  )
}
