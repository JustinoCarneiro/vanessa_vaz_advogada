'use client'

import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react'
import { isPixelActive, isPixelReady, trackContact } from '@/lib/metaPixel'
import { buildWhatsAppUrl, variantFromSearch } from '@/lib/whatsapp'

type WhatsAppCtaProps = {
  /** Link base (sem código de anúncio), o mesmo que o servidor renderiza. */
  href: string
  className: string
  ariaLabel: string
  children: ReactNode
}

// Tempo para o navegador despachar o evento antes de sair da página.
const REDIRECT_DELAY_MS = 250
// Se o script da Meta ainda estiver carregando, espera por ele (no máximo isso) para o evento não se perder.
const PIXEL_WAIT_MS = 1500
const POLL_MS = 50

function leaveWhenSent(href: string) {
  const startedAt = Date.now()
  const check = () => {
    if (isPixelReady()) window.setTimeout(() => window.location.assign(href), REDIRECT_DELAY_MS)
    else if (Date.now() - startedAt >= PIXEL_WAIT_MS) window.location.assign(href)
    else window.setTimeout(check, POLL_MS)
  }
  check()
}

export default function WhatsAppCta({ href: baseHref, className, ariaLabel, children }: WhatsAppCtaProps) {
  const leaving = useRef(false)
  const [href, setHref] = useState(baseHref)

  // A página é estática: o utm_content só existe no navegador. Depois de montar (para não
  // divergir do HTML do servidor), um código V01, V02 ou V03 entra na mensagem do link.
  useEffect(() => {
    const code = variantFromSearch(window.location.search)
    if (code) setHref(buildWhatsAppUrl(code))
  }, [])

  function onClick(event: MouseEvent<HTMLAnchorElement>) {
    if (!isPixelActive()) return // sem consentimento: navegação normal, sem evento
    trackContact()
    const opensElsewhere = event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey
    if (opensElsewhere || event.defaultPrevented) return
    event.preventDefault()
    if (leaving.current) return
    leaving.current = true
    leaveWhenSent(href)
  }

  return (
    <a className={className} href={href} aria-label={ariaLabel} onClick={onClick}>
      {children}
    </a>
  )
}
