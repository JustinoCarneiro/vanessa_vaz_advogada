export const CONSENT_KEY = 'vvm-consent-v1'

export type Consent = { marketing: boolean; decidedAt: number }

/** Só um valor bem formado conta como decisão; qualquer outra coisa = ainda sem decisão. */
export function parseConsent(raw: string | null): Consent | null {
  if (!raw) return null
  try {
    const value = JSON.parse(raw) as Partial<Consent> | null
    if (value && typeof value.marketing === 'boolean' && typeof value.decidedAt === 'number') {
      return { marketing: value.marketing, decidedAt: value.decidedAt }
    }
  } catch {
    // JSON inválido: tratado como sem decisão
  }
  return null
}

export function serializeConsent(marketing: boolean, now: number = Date.now()): string {
  return JSON.stringify({ marketing, decidedAt: now } satisfies Consent)
}

export function readConsent(): Consent | null {
  try {
    return parseConsent(window.localStorage.getItem(CONSENT_KEY))
  } catch {
    return null
  }
}

export function saveConsent(marketing: boolean): void {
  try {
    window.localStorage.setItem(CONSENT_KEY, serializeConsent(marketing))
  } catch {
    // armazenamento bloqueado: a escolha vale só nesta abertura
  }
}
