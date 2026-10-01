import { CONSENT_KEY, parseConsent, serializeConsent } from '@/lib/consent'
import { PIXEL_ID } from '@/lib/metaPixel'

describe('M10 — Consentimento de cookies (landing)', () => {
  it('usa a chave versionada de armazenamento', () => expect(CONSENT_KEY).toBe('vvm-consent-v1'))

  it('sem valor salvo = ainda sem decisão', () => {
    expect(parseConsent(null)).toBeNull()
    expect(parseConsent('')).toBeNull()
  })

  it('serializa e lê de volta a escolha (aceite)', () => {
    const raw = serializeConsent(true, 1_700_000_000_000)
    expect(parseConsent(raw)).toEqual({ marketing: true, decidedAt: 1_700_000_000_000 })
  })

  it('serializa e lê de volta a escolha (recusa)', () => {
    expect(parseConsent(serializeConsent(false, 5))).toEqual({ marketing: false, decidedAt: 5 })
  })

  it.each(['{', 'null', '[]', '{"marketing":"sim"}', '{"marketing":true}', '{"marketing":true,"decidedAt":"x"}'])(
    'valor inválido (%s) conta como sem decisão, nunca como aceite', raw => {
      expect(parseConsent(raw)).toBeNull()
    },
  )

  it('usa o ID do pixel informado pela Claudia', () => expect(PIXEL_ID).toBe('920153360935262'))
})
