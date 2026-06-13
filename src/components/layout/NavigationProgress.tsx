'use client'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export function NavigationProgress() {
  const pathname = usePathname()
  const prevPath = useRef(pathname)
  const [width, setWidth]     = useState(0)
  const [visible, setVisible] = useState(false)
  const growTimer  = useRef<ReturnType<typeof setTimeout> | null>(null)
  const hideTimer  = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Detecta clique em qualquer link interno e inicia a barra
  useEffect(() => {
    function onLinkClick(e: MouseEvent) {
      const anchor = (e.target as Element).closest('a[href]') as HTMLAnchorElement | null
      if (!anchor) return

      const href = anchor.getAttribute('href') ?? ''
      if (
        !href ||
        href.startsWith('#') ||
        href.startsWith('mailto') ||
        href.startsWith('tel') ||
        href.startsWith('http') ||
        href.startsWith('//')
      ) return

      const dest = href.split('?')[0]
      if (dest === pathname) return   // mesma página — não mostra barra

      // Limpa timers anteriores
      if (growTimer.current) clearTimeout(growTimer.current)
      if (hideTimer.current) clearTimeout(hideTimer.current)

      // Inicia: aparece em 15% e cresce até ~72% enquanto carrega
      setVisible(true)
      setWidth(15)
      growTimer.current = setTimeout(() => setWidth(72), 120)
    }

    document.addEventListener('click', onLinkClick)
    return () => document.removeEventListener('click', onLinkClick)
  }, [pathname])

  // Quando o pathname muda, a navegação terminou — completa a barra e some
  useEffect(() => {
    if (pathname === prevPath.current) return
    prevPath.current = pathname

    if (growTimer.current) clearTimeout(growTimer.current)

    setWidth(100)
    hideTimer.current = setTimeout(() => {
      setVisible(false)
      setWidth(0)
    }, 380)
  }, [pathname])

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: 3,
        width: `${width}%`,
        background: '#BDE4DA',
        zIndex: 9999,
        pointerEvents: 'none',
        opacity: visible ? 1 : 0,
        transition: width === 100
          ? 'width 0.2s ease-out'          // completa rápido
          : width === 0
            ? 'opacity 0.3s ease 0.1s'     // fade-out sem mover
            : 'width 1.2s cubic-bezier(0.1, 0.6, 0.4, 1)', // cresce devagar
      }}
    />
  )
}
