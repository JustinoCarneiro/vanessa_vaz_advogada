import {
  BASE_MESSAGE,
  WHATSAPP_PHONE,
  buildMessage,
  buildWhatsAppUrl,
  parseVariantCode,
  variantFromSearch,
} from '@/lib/whatsapp'

describe('M08 — código do anúncio (V01, V02, V03) na mensagem do WhatsApp', () => {
  describe('buildMessage', () => {
    it('sem código mantém a mensagem atual', () => {
      expect(BASE_MESSAGE).toBe('Olá, Vanessa! Vim pela página de Previdência no Exterior e gostaria de entender melhor o meu caso.')
      expect(buildMessage()).toBe(BASE_MESSAGE)
      expect(buildMessage(null)).toBe(BASE_MESSAGE)
    })

    it.each(['V01', 'V02', 'V03'] as const)('com %s insere o código entre parênteses depois de "Exterior"', code => {
      expect(buildMessage(code)).toBe(
        `Olá, Vanessa! Vim pela página de Previdência no Exterior (${code}) e gostaria de entender melhor o meu caso.`,
      )
    })
  })

  describe('parseVariantCode (só o início do utm_content conta)', () => {
    it.each([
      ['V01', 'V01'],
      ['V02', 'V02'],
      ['V03', 'V03'],
      ['V03 — INSS ou previdência privada-editao 01', 'V03'], // exemplo real do anúncio
      ['V01 - Aposentadoria no exterior', 'V01'],
      ['V02_nome-do-anuncio', 'V02'],
      ['v02 em minúscula', 'V02'],
      ['  V01 com espaço antes', 'V01'],
    ])('reconhece %j como %s', (raw, esperado) => {
      expect(parseVariantCode(raw)).toBe(esperado)
    })

    it.each([
      [null], [undefined], [''], ['   '],
      ['V04'], ['V00'], ['V1'], ['V10'], ['V011'], ['V031 extra'],
      ['anúncio V01'], ['X V02'], ['teste'], ['01'], ['VV01'],
    ])('ignora %j (mantém a mensagem sem código)', raw => {
      expect(parseVariantCode(raw as string | null | undefined)).toBeNull()
    })
  })

  describe('variantFromSearch (lê o utm_content da URL)', () => {
    it('lê o código mesmo com outros parâmetros e com o nome completo do anúncio codificado', () => {
      const nome = encodeURIComponent('V03 — INSS ou previdência privada-editao 01')
      expect(variantFromSearch(`?utm_source=instagram&utm_medium=paid&utm_content=${nome}&fbclid=abc`)).toBe('V03')
    })

    it('sem utm_content, ou vazio, não há código', () => {
      expect(variantFromSearch('')).toBeNull()
      expect(variantFromSearch('?utm_source=instagram')).toBeNull()
      expect(variantFromSearch('?utm_content=')).toBeNull()
    })

    it('com o parâmetro repetido, vale o primeiro', () => {
      expect(variantFromSearch('?utm_content=V02&utm_content=V03')).toBe('V02')
    })

    it('utm_content com valor fora dos três códigos não gera código', () => {
      expect(variantFromSearch('?utm_content=V09%20teste')).toBeNull()
    })
  })

  describe('buildWhatsAppUrl', () => {
    it('abre a conversa direto, com o número certo e a mensagem decodificável', () => {
      const url = new URL(buildWhatsAppUrl('V01'))
      expect(url.origin + url.pathname).toBe('https://api.whatsapp.com/send/')
      expect(url.searchParams.get('phone')).toBe(WHATSAPP_PHONE)
      expect(url.searchParams.get('type')).toBe('phone_number')
      expect(url.searchParams.get('app_absent')).toBe('0')
      expect(url.searchParams.get('text')).toBe(buildMessage('V01'))
    })

    it('sem código, o link é o atual', () => {
      expect(new URL(buildWhatsAppUrl()).searchParams.get('text')).toBe(BASE_MESSAGE)
    })

    it('o resto do utm_content nunca vai para a mensagem', () => {
      const code = parseVariantCode('V03 — texto-secreto-do-anuncio')
      expect(buildWhatsAppUrl(code)).not.toContain('secreto')
      expect(buildMessage(code)).not.toContain('secreto')
    })
  })
})
