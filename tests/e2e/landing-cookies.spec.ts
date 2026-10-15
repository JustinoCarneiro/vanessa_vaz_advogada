import { test, expect, type Page } from '@playwright/test'

const route = '/previdencia-no-exterior'
const whatsappUrl = /^https:\/\/api\.whatsapp\.com\/send\//
const whatsappGlob = '**/api.whatsapp.com/**'
const PIXEL_ID = '920153360935262'
const fbevents = '**/connect.facebook.net/**/fbevents.js'

// O script real da Meta nunca é carregado nos testes: a requisição é interceptada e contada.
// Sem o script, o stub do snippet padrão guarda as chamadas em fbq.queue.
async function stubPixel(page: Page) {
  const requests: string[] = []
  await page.route(fbevents, route => {
    requests.push(route.request().url())
    return route.fulfill({ contentType: 'application/javascript', body: '/* stub */' })
  })
  return requests
}
const fbqCalls = (page: Page) =>
  page.evaluate(() => {
    const w = window as unknown as { fbq?: { queue: ArrayLike<unknown>[] } }
    return w.fbq ? w.fbq.queue.map(entry => Array.from(entry)) : null
  })
const banner = (page: Page) => page.getByRole('dialog', { name: /cookies/i })

test('sem decisão: banner com 3 opções e nada da Meta carregado', async ({ page }) => {
  const requests = await stubPixel(page)
  await page.goto(route)
  await expect(banner(page)).toBeVisible()
  for (const nome of ['Aceitar', 'Recusar', 'Gerenciar preferências']) {
    await expect(banner(page).getByRole('button', { name: nome })).toBeVisible()
  }
  expect(await fbqCalls(page)).toBeNull()
  expect(requests).toHaveLength(0)
  await expect(page.locator('script[src*="facebook"]')).toHaveCount(0)
})

test('recusar: banner some, pixel nunca carrega e a escolha é lembrada', async ({ page }) => {
  const requests = await stubPixel(page)
  await page.goto(route)
  await banner(page).getByRole('button', { name: 'Recusar' }).click()
  await expect(banner(page)).toBeHidden()
  await page.reload()
  await expect(banner(page)).toBeHidden()
  expect(await fbqCalls(page)).toBeNull()
  expect(requests).toHaveLength(0)
})

test('aceitar: pixel carrega uma vez, com init e um único PageView', async ({ page }) => {
  const requests = await stubPixel(page)
  await page.goto(route)
  await banner(page).getByRole('button', { name: 'Aceitar' }).click()
  await expect(banner(page)).toBeHidden()
  await expect.poll(() => requests.length).toBe(1)
  const calls = (await fbqCalls(page))!
  expect(calls.filter(c => c[0] === 'init')).toEqual([['init', PIXEL_ID]])
  expect(calls.filter(c => c[0] === 'track')).toEqual([['track', 'PageView']])
  // sem eventos automáticos de botão/formulário da Meta
  expect(calls).toContainEqual(['set', 'autoConfig', false, PIXEL_ID])
})

test('aceite lembrado: cada abertura da página registra um PageView', async ({ page }) => {
  await stubPixel(page)
  await page.goto(route)
  await banner(page).getByRole('button', { name: 'Aceitar' }).click()
  await page.reload()
  await expect(banner(page)).toBeHidden()
  await expect.poll(async () => (await fbqCalls(page))?.filter(c => c[1] === 'PageView').length).toBe(1)
})

test('gerenciar preferências: marketing começa desligado e salvar sem marcar equivale a recusar', async ({ page }) => {
  const requests = await stubPixel(page)
  await page.goto(route)
  await banner(page).getByRole('button', { name: 'Gerenciar preferências' }).click()
  const marketing = banner(page).getByRole('checkbox', { name: /marketing/i })
  await expect(marketing).not.toBeChecked()
  await expect(banner(page).getByRole('checkbox', { name: /necessários/i })).toBeDisabled()
  await banner(page).getByRole('button', { name: 'Salvar preferências' }).click()
  await expect(banner(page)).toBeHidden()
  expect(requests).toHaveLength(0)
})

test('gerenciar preferências: marcar marketing e salvar carrega o pixel', async ({ page }) => {
  const requests = await stubPixel(page)
  await page.goto(route)
  await banner(page).getByRole('button', { name: 'Gerenciar preferências' }).click()
  await banner(page).getByRole('checkbox', { name: /marketing/i }).check()
  await banner(page).getByRole('button', { name: 'Salvar preferências' }).click()
  await expect.poll(() => requests.length).toBe(1)
})

test('rodapé legal: link da Política de Cookies e reabertura das preferências', async ({ page }) => {
  await stubPixel(page)
  await page.goto(route)
  await banner(page).getByRole('button', { name: 'Recusar' }).click()
  await expect(page.getByRole('link', { name: 'Política de Cookies' })).toHaveAttribute('href', '/politica-de-cookies')
  await page.getByRole('button', { name: 'Preferências de cookies' }).click()
  await expect(banner(page)).toBeVisible()
})

test('política de cookies abre, descreve o Meta Pixel e volta para a landing', async ({ page }) => {
  const response = await page.goto('/politica-de-cookies')
  expect(response?.status()).toBe(200)
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Política de Cookies')
  await expect(page.locator('main')).toContainText('Meta Pixel')
  await expect(page.getByRole('link', { name: /Voltar/ })).toHaveAttribute('href', route)
})

test('WhatsApp sem consentimento: navega direto, sem evento', async ({ page }) => {
  await stubPixel(page)
  await page.route(whatsappGlob, r => r.fulfill({ body: 'wa' }))
  await page.goto(route)
  await page.getByRole('link', { name: /WhatsApp/ }).first().click()
  await expect(page).toHaveURL(whatsappUrl)
})

test('WhatsApp com consentimento: registra Contact antes de sair da página', async ({ page }) => {
  await stubPixel(page)
  await page.route(whatsappGlob, r => r.fulfill({ body: 'wa' }))
  await page.goto(route)
  await banner(page).getByRole('button', { name: 'Aceitar' }).click()
  await expect.poll(async () => (await fbqCalls(page))?.length ?? 0).toBeGreaterThan(0)

  await page.getByRole('link', { name: /WhatsApp/ }).first().click({ noWaitAfter: true })
  // o evento entra na fila enquanto a página ainda é a landing (redirecionamento adiado)
  const durante = await page.evaluate(() => ({
    url: location.pathname,
    fila: ((window as unknown as { fbq: { queue: ArrayLike<unknown>[] } }).fbq.queue).length &&
      Array.from((window as unknown as { fbq: { queue: ArrayLike<unknown>[] } }).fbq.queue).map(e => Array.from(e)),
  }))
  expect(durante.url).toBe(route)
  expect((durante.fila as unknown[][]).filter(c => c[1] === 'Contact')).toEqual([['track', 'Contact']])
  await expect(page).toHaveURL(whatsappUrl)
})

test('cada botão do WhatsApp dispara um único Contact, e só ao ser acionado', async ({ page }) => {
  await stubPixel(page)
  await page.route(whatsappGlob, r => r.fulfill({ body: 'wa' }))
  await page.goto(route)
  await banner(page).getByRole('button', { name: 'Aceitar' }).click()
  await expect.poll(async () => (await fbqCalls(page))?.length ?? 0).toBeGreaterThan(0)
  expect((await fbqCalls(page))!.filter(c => c[1] === 'Contact')).toHaveLength(0)
  await page.getByRole('link', { name: /WhatsApp/ }).last().click({ noWaitAfter: true })
  const contatos = await page.evaluate(() =>
    Array.from((window as unknown as { fbq: { queue: ArrayLike<unknown>[] } }).fbq.queue).map(e => Array.from(e)).filter(c => c[1] === 'Contact').length)
  expect(contatos).toBe(1)
})

// ── Envio real do evento: o stub abaixo imita o fbevents.js (processa a fila e dispara uma
// requisição ao /tr da Meta, com keepalive). A rede da Meta é interceptada e nada sai de verdade.
const pixelScript = `
  (function () {
    var f = window.fbq;
    f.callMethod = function () {
      var a = [].slice.call(arguments);
      if (a[0] === 'track') fetch('https://www.facebook.com/tr/?id=${PIXEL_ID}&ev=' + a[1], { keepalive: true, mode: 'no-cors' });
    };
    (f.queue || []).forEach(function (q) { f.callMethod.apply(f, q); });
    f.queue = [];
  })();`

async function livePixel(page: Page, { atrasoMs = 0 } = {}) {
  const ordem: string[] = []
  await page.route(fbevents, async route => {
    if (atrasoMs) await new Promise(r => setTimeout(r, atrasoMs))
    await route.fulfill({ contentType: 'application/javascript', body: pixelScript })
  })
  await page.route('**/www.facebook.com/tr/**', route => {
    ordem.push(new URL(route.request().url()).searchParams.get('ev') ?? '?')
    return route.fulfill({ status: 204, body: '' })
  })
  await page.route(whatsappGlob, route => { ordem.push('whatsapp'); return route.fulfill({ body: 'wa' }) })
  return ordem
}

test('Contact é ENVIADO à Meta antes de o navegador ir para o wa.me', async ({ page }) => {
  const ordem = await livePixel(page)
  await page.goto(route)
  await banner(page).getByRole('button', { name: 'Aceitar' }).click()
  await expect.poll(() => ordem.includes('PageView')).toBe(true)
  await page.getByRole('link', { name: /WhatsApp/ }).first().click()
  await expect(page).toHaveURL(whatsappUrl)
  expect(ordem).toEqual(['PageView', 'Contact', 'whatsapp'])
})

test('clique logo após aceitar, com o script da Meta lento: Contact ainda sai antes do wa.me', async ({ page }) => {
  const ordem = await livePixel(page, { atrasoMs: 900 })
  await page.goto(route)
  await banner(page).getByRole('button', { name: 'Aceitar' }).click()
  await page.getByRole('link', { name: /WhatsApp/ }).first().click()
  await expect(page).toHaveURL(whatsappUrl, { timeout: 8000 })
  expect(ordem.indexOf('Contact')).toBeGreaterThan(-1)
  expect(ordem.indexOf('Contact')).toBeLessThan(ordem.indexOf('whatsapp'))
  expect(ordem.filter(e => e === 'Contact')).toHaveLength(1)
})

test('sem consentimento nenhuma requisição à Meta, mesmo após clicar no WhatsApp', async ({ page }) => {
  const ordem = await livePixel(page)
  await page.goto(route)
  await banner(page).getByRole('button', { name: 'Recusar' }).click()
  await page.getByRole('link', { name: /WhatsApp/ }).first().click()
  await expect(page).toHaveURL(whatsappUrl)
  expect(ordem).toEqual(['whatsapp'])
})

test('retirar o consentimento: recarrega sem pixel e apaga os cookies da Meta', async ({ page }) => {
  const ordem = await livePixel(page)
  await page.goto(route)
  await banner(page).getByRole('button', { name: 'Aceitar' }).click()
  await expect.poll(() => ordem.includes('PageView')).toBe(true)
  await page.evaluate(() => { document.cookie = '_fbp=fb.1.123.456; path=/'; document.cookie = '_fbc=fb.1.123.abc; path=/' })

  await page.getByRole('button', { name: 'Preferências de cookies' }).click()
  await banner(page).getByRole('checkbox', { name: /marketing/i }).uncheck()
  await Promise.all([page.waitForLoadState('load'), banner(page).getByRole('button', { name: 'Salvar preferências' }).click()])
  await expect(banner(page)).toBeHidden()
  expect(await page.evaluate(() => document.cookie)).not.toMatch(/_fbp|_fbc/)
  await page.waitForTimeout(500)
  expect(ordem).toEqual(['PageView']) // nada novo depois da retirada
  await page.getByRole('link', { name: /WhatsApp/ }).first().click()
  await expect(page).toHaveURL(whatsappUrl)
  expect(ordem).toEqual(['PageView', 'whatsapp'])
})

test('armazenamento bloqueado: o banner volta a cada abertura, mas o aceite vale na sessão', async ({ page }) => {
  const ordem = await livePixel(page)
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', { get() { throw new DOMException('bloqueado', 'SecurityError') } })
  })
  await page.goto(route)
  await banner(page).getByRole('button', { name: 'Aceitar' }).click()
  await expect.poll(() => ordem.includes('PageView')).toBe(true)
  await page.reload()
  await expect(banner(page)).toBeVisible()
})

test('teclado: dá para recusar só com Tab e Enter, e o foco não é roubado ao abrir a página', async ({ page }) => {
  await livePixel(page)
  await page.goto(route)
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: /WhatsApp/ }).first()).toBeFocused()
  const recusar = banner(page).getByRole('button', { name: 'Recusar' })
  await recusar.focus()
  await expect(recusar).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(banner(page)).toBeHidden()
})

// Os três botões (herói, fechamento, barra fixa), no celular e no desktop, já com o aceite.
for (const [nome, viewport] of [['celular', { width: 390, height: 844 }], ['desktop', { width: 1440, height: 900 }]] as const) {
  for (const [indice, onde] of [[0, 'herói'], [1, 'fechamento'], [2, 'barra fixa']] as const) {
    test(`botão do WhatsApp (${onde}) no ${nome}: Contact enviado e depois abre a conversa`, async ({ page }) => {
      await page.setViewportSize(viewport)
      const ordem = await livePixel(page)
      await page.goto(route)
      await banner(page).getByRole('button', { name: 'Aceitar' }).click()
      await expect.poll(() => ordem.includes('PageView')).toBe(true)
      const botao = page.getByRole('link', { name: /WhatsApp/ }).nth(indice)
      await botao.scrollIntoViewIfNeeded()
      const href = new URL((await botao.getAttribute('href'))!)
      await botao.click()
      await expect(page).toHaveURL(whatsappUrl)
      expect(ordem).toEqual(['PageView', 'Contact', 'whatsapp'])
      expect(new URL(page.url()).searchParams.get('text')).toBe(href.searchParams.get('text'))
    })
  }
}


// ── Código do anúncio (utm_content) na mensagem: o clique leva o código e o Contact não muda ──
const mensagemComCodigo = (codigo: string) =>
  `Olá, Vanessa! Vim pela página de Previdência no Exterior (${codigo}) e gostaria de entender melhor o meu caso.`
const utm = (codigo: string) => `?utm_source=instagram&utm_content=${encodeURIComponent(`${codigo} — nome completo do anúncio`)}`

test('com utm_content e sem consentimento: abre o WhatsApp direto, com o código, sem evento', async ({ page }) => {
  const ordem = await livePixel(page)
  await page.goto(`${route}${utm('V02')}`)
  await banner(page).getByRole('button', { name: 'Recusar' }).click()
  await page.getByRole('link', { name: /WhatsApp/ }).first().click()
  await expect(page).toHaveURL(whatsappUrl)
  expect(new URL(page.url()).searchParams.get('text')).toBe(mensagemComCodigo('V02'))
  expect(ordem).toEqual(['whatsapp'])
})

test('com utm_content e com consentimento: Contact sai antes de abrir o WhatsApp com o código', async ({ page }) => {
  const ordem = await livePixel(page)
  await page.goto(`${route}${utm('V03')}`)
  await banner(page).getByRole('button', { name: 'Aceitar' }).click()
  await expect.poll(() => ordem.includes('PageView')).toBe(true)
  await page.getByRole('link', { name: /WhatsApp/ }).first().click()
  await expect(page).toHaveURL(whatsappUrl)
  expect(new URL(page.url()).searchParams.get('text')).toBe(mensagemComCodigo('V03'))
  expect(ordem).toEqual(['PageView', 'Contact', 'whatsapp'])
})

for (const indice of [0, 1, 2]) {
  test(`o botão ${['do herói', 'do fechamento', 'fixo'][indice]} leva o código V01 (celular, com consentimento)`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    const ordem = await livePixel(page)
    await page.goto(`${route}${utm('V01')}`)
    await banner(page).getByRole('button', { name: 'Aceitar' }).click()
    await expect.poll(() => ordem.includes('PageView')).toBe(true)
    const botao = page.getByRole('link', { name: /WhatsApp/ }).nth(indice)
    await botao.scrollIntoViewIfNeeded()
    await botao.click()
    await expect(page).toHaveURL(whatsappUrl)
    expect(new URL(page.url()).searchParams.get('text')).toBe(mensagemComCodigo('V01'))
    expect(ordem).toEqual(['PageView', 'Contact', 'whatsapp'])
  })
}
