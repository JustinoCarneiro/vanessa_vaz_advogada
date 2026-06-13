'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Logo } from '../ui/Logo'

const navLinks = [
  { href: '/sobre', label: 'Sobre' },
  { href: '/escritorio', label: 'Escritório' },
  { href: '/servicos', label: 'Serviços' },
  { href: '/blog', label: 'Blog' },
]

export function NavBar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const isActive = (href: string) => pathname === href

  return (
    <nav
      style={{ background: '#3D5C5F', borderBottom: '1px solid rgba(255,255,255,0.12)' }}
      aria-label="Navegação principal"
    >
      {/* ── Desktop ── */}
      <div className="hidden md:flex items-center justify-between h-[88px] px-14 max-w-[1280px] mx-auto">
        <Link href="/" aria-label="Ir para a página inicial">
          <Logo variant="branco" height={52} priority />
        </Link>

        <div className="flex items-center gap-9">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              aria-current={isActive(href) ? 'page' : undefined}
              className="text-sm font-medium tracking-[0.02em] no-underline pb-1 border-b-2 transition-[border-color,color] duration-200"
              style={
                isActive(href)
                  ? { color: '#FFFFFF', fontWeight: 600, borderColor: '#BDE4DA' }
                  : { color: 'rgba(255,255,255,0.9)', borderColor: 'transparent' }
              }
              onMouseEnter={e => {
                if (!isActive(href)) (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.55)'
              }}
              onMouseLeave={e => {
                if (!isActive(href)) (e.currentTarget as HTMLElement).style.borderColor = 'transparent'
              }}
            >
              {label}
            </Link>
          ))}

          <Link
            href="/contato"
            className="text-sm font-semibold tracking-[0.03em] transition-colors hover:bg-[#BDE4DA] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#BDE4DA] focus-visible:outline-offset-[3px]"
            style={{
              color: '#3D5C5F',
              background: '#FFFFFF',
              padding: '13px 28px',
              borderRadius: 4,
            }}
          >
            Fale Comigo
          </Link>
        </div>
      </div>

      {/* ── Mobile header ── */}
      <div
        className="flex md:hidden items-center justify-between h-16 px-5"
        style={{ position: 'relative', zIndex: 3 }}
      >
        <Link href="/" aria-label="Ir para a página inicial">
          <Logo variant="branco" height={38} priority />
        </Link>

        <button
          type="button"
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((v) => !v)}
          className="w-11 h-11 flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3D5C5F] focus-visible:outline-offset-2"
        >
          {menuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </div>

      {/* ── Mobile dropdown menu — sempre no DOM, animado via max-height ── */}
      <div
        id="mobile-menu"
        className="md:hidden absolute left-0 right-0 z-10 bg-white border-b border-[#EDF1F0] flex flex-col px-5 gap-1 overflow-hidden"
        style={{
          boxShadow: menuOpen ? '0 18px 30px rgba(17,17,17,0.12)' : 'none',
          top: 64,
          maxHeight: menuOpen ? 400 : 0,
          paddingTop: menuOpen ? 12 : 0,
          paddingBottom: menuOpen ? 24 : 0,
          transition: 'max-height 0.28s ease, padding 0.28s ease, box-shadow 0.28s ease',
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
        aria-hidden={!menuOpen}
      >
        {navLinks.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            aria-current={isActive(href) ? 'page' : undefined}
            className="text-base font-medium py-[13px] px-1 border-b border-[#F0F4F3] last:border-0 transition-colors hover:text-[#3D5C5F] hover:underline hover:underline-offset-4 hover:decoration-[#3D5C5F]"
            style={{ color: isActive(href) ? '#3D5C5F' : '#111111' }}
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </Link>
        ))}
        <Link
          href="/contato"
          className="mt-[14px] block text-center text-[15px] font-semibold text-white py-[15px] rounded-sm hover:bg-[#2F484B] transition-colors"
          style={{ background: '#3D5C5F' }}
          onClick={() => setMenuOpen(false)}
        >
          Fale Comigo
        </Link>
      </div>
    </nav>
  )
}
