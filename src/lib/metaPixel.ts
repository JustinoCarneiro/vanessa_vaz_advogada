export const PIXEL_ID = '920153360935262'
const PIXEL_SRC = 'https://connect.facebook.net/en_US/fbevents.js'

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void
  queue: unknown[][]
  loaded?: boolean
  version?: string
  push?: unknown
  disablePushState?: boolean
}

declare global {
  interface Window {
    fbq?: Fbq
    _fbq?: Fbq
  }
}

let active = false

export function isPixelActive(): boolean {
  return active
}

/**
 * Carrega o Meta Pixel. Só chamar depois do aceite dos cookies de marketing.
 * Registra um único PageView por abertura da página e desliga os eventos
 * automáticos da Meta (cliques em botão, formulários, mudanças de URL).
 */
export function loadPixel(): void {
  if (active || typeof window === 'undefined') return
  active = true

  if (!window.fbq) {
    // Snippet padrão da Meta: fila até o fbevents.js chegar.
    const fbq = function (...args: unknown[]) {
      if (fbq.callMethod) fbq.callMethod(...args)
      else fbq.queue.push(args)
    } as Fbq
    fbq.push = fbq
    fbq.loaded = true
    fbq.version = '2.0'
    fbq.queue = []
    window.fbq = fbq
    if (!window._fbq) window._fbq = fbq
    const script = document.createElement('script')
    script.async = true
    script.src = PIXEL_SRC
    document.head.appendChild(script)
  }

  const fbq = window.fbq!
  fbq.disablePushState = true
  fbq('set', 'autoConfig', false, PIXEL_ID)
  fbq('init', PIXEL_ID)
  fbq('track', 'PageView')
}

/** O fbevents.js já chegou e processa os eventos na hora (antes disso eles ficam só em fila). */
export function isPixelReady(): boolean {
  return active && typeof window !== 'undefined' && typeof window.fbq?.callMethod === 'function'
}

/** Evento padrão Contact (clique no WhatsApp). Sem pixel ativo, não faz nada. */
export function trackContact(): void {
  if (active) window.fbq?.('track', 'Contact')
}

/** Apaga os cookies do pixel ao retirar o consentimento. */
export function clearPixelCookies(): void {
  const host = window.location.hostname
  const parent = host.split('.').slice(-2).join('.')
  for (const name of ['_fbp', '_fbc']) {
    for (const domain of [host, `.${host}`, `.${parent}`]) {
      document.cookie = `${name}=; Max-Age=0; path=/; domain=${domain}`
    }
    document.cookie = `${name}=; Max-Age=0; path=/`
  }
}
