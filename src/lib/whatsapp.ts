export const WHATSAPP_PHONE = '436704071939'

export const BASE_MESSAGE =
  'Olá, Vanessa! Vim pela página de Previdência no Exterior e gostaria de entender melhor o meu caso.'

/** Códigos dos criativos de anúncio, vindos do início do utm_content. */
export type VariantCode = 'V01' | 'V02' | 'V03'

// Só o início conta: "V03 — INSS ou previdência privada-editao 01" vira V03. O dígito seguinte
// é barrado para "V011" não virar V01. O resto do utm_content nunca entra na mensagem.
const VARIANT_PATTERN = /^\s*V0([1-3])(?!\d)/i

export function parseVariantCode(raw: string | null | undefined): VariantCode | null {
  const match = raw ? VARIANT_PATTERN.exec(raw) : null
  return match ? (`V0${match[1]}` as VariantCode) : null
}

/** Lê o utm_content de uma query string (por exemplo, window.location.search). */
export function variantFromSearch(search: string): VariantCode | null {
  return parseVariantCode(new URLSearchParams(search).get('utm_content'))
}

export function buildMessage(code?: VariantCode | null): string {
  return code ? BASE_MESSAGE.replace('Exterior', `Exterior (${code})`) : BASE_MESSAGE
}

// Destino direto: o wa.me só redireciona para api.whatsapp.com/send. Ir direto poupa um salto de rede,
// e app_absent=0 faz o celular tentar abrir o app na hora. A mensagem chega pré-preenchida.
export function buildWhatsAppUrl(code?: VariantCode | null): string {
  return `https://api.whatsapp.com/send/?${new URLSearchParams({
    phone: WHATSAPP_PHONE,
    text: buildMessage(code),
    type: 'phone_number',
    app_absent: '0',
  })}`
}
