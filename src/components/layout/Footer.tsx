import Link from 'next/link'
import { Logo } from '../ui/Logo'

const navLinks = [
  { href: '/sobre', label: 'Sobre' },
  { href: '/escritorio', label: 'Escritório' },
  { href: '/servicos', label: 'Serviços' },
  { href: '/brasileiros-no-exterior', label: 'Brasileiros no Exterior' },
  { href: '/blog', label: 'Blog' },
  { href: '/contato', label: 'Contato' },
]

const socialLinks = [
  {
    href: '#',
    label: 'Instagram',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1" fill="#FFFFFF" stroke="none" />
      </svg>
    ),
  },
  {
    href: '#',
    label: 'LinkedIn',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#FFFFFF" aria-hidden="true">
        <path d="M4.98 3.5a2.49 2.49 0 11-.02 4.98 2.49 2.49 0 01.02-4.98zM3 9h4v12H3zM9.5 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.5c0-1.3-.02-3-1.83-3-1.83 0-2.1 1.43-2.1 2.9V21h-3.97z" />
      </svg>
    ),
  },
  {
    href: 'https://wa.me/436704071939',
    label: 'WhatsApp',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 11.5a8.5 8.5 0 01-12.4 7.6L4 20l1-4.4A8.5 8.5 0 1121 11.5z" />
        <path d="M9 9.5c.5 2.5 3 5 5.5 5.5l1-1.5 2 1" />
      </svg>
    ),
  },
]

export function Footer() {
  return (
    <footer style={{ background: '#3D5C5F' }}>
      <div className="max-w-[1168px] mx-auto px-6 md:px-14 pt-[72px]">
        {/* Grid columns */}
        <div
          className="grid gap-12 pb-14"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}
        >
          {/* Logo + tagline */}
          <div className="md:col-span-1" style={{ gridColumn: 'span 1.4 / span 1.4' }}>
            <Logo variant="branco" height={56} className="mb-5" />
            <p
              className="text-sm leading-relaxed max-w-[280px]"
              style={{ color: '#BDE4DA' }}
            >
              Advocacia previdenciária com atendimento humano, próximo e especializado.
            </p>
          </div>

          {/* Navegação */}
          <div>
            <p
              className="text-[13px] font-semibold tracking-[0.14em] uppercase mb-[18px]"
              style={{ color: '#89B0AF' }}
            >
              Navegação
            </p>
            <nav aria-label="Links do rodapé" className="flex flex-col gap-3">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm text-white no-underline hover:underline hover:underline-offset-[5px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#BDE4DA] focus-visible:outline-offset-3"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p
              className="text-[13px] font-semibold tracking-[0.14em] uppercase mb-[18px]"
              style={{ color: '#89B0AF' }}
            >
              Contato
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:vazvanessamarschallinger@gmail.com"
                className="text-[13.5px] text-white no-underline hover:underline hover:underline-offset-[5px] break-words"
              >
                vazvanessamarschallinger<wbr/>@gmail.com
              </a>
              <span className="text-sm text-white">+43 0670 4071939</span>
              <span className="text-sm text-white">Gunskirchen, Áustria</span>
              <span className="text-sm" style={{ color: '#BDE4DA' }}>
                Atendimento internacional
              </span>
            </div>
          </div>

          {/* Redes sociais */}
          <div>
            <p
              className="text-[13px] font-semibold tracking-[0.14em] uppercase mb-[18px]"
              style={{ color: '#89B0AF' }}
            >
              Redes sociais
            </p>
            <div className="flex gap-[14px]">
              {socialLinks.map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center justify-center w-[42px] h-[42px] rounded-full transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#BDE4DA] focus-visible:outline-offset-3"
                  style={{ border: '1px solid rgba(255,255,255,0.4)' }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 py-6"
          style={{ borderTop: '1px solid rgba(255,255,255,0.18)' }}
        >
          <span className="text-[13px]" style={{ color: '#BDE4DA' }}>
            Vanessa Vaz Marschallinger · OAB/RJ 264.772
          </span>
          <span className="text-[13px]" style={{ color: '#BDE4DA' }}>
            © 2026 Vanessa Vaz Marschallinger · Todos os direitos reservados
          </span>
        </div>
      </div>
    </footer>
  )
}
