import { test, expect, type Page } from '@playwright/test'

const route = '/previdencia-no-exterior'
const mensagem = 'Olá, Vanessa! Vim pela página de Previdência no Exterior e gostaria de entender melhor o meu caso.'
// Destino direto do WhatsApp (o wa.me só redireciona para cá): abre a conversa com a mensagem pronta.
const whatsapp = `https://api.whatsapp.com/send/?${new URLSearchParams({ phone: '436704071939', text: mensagem, type: 'phone_number', app_absent: '0' })}`

test('landing abre isolada e apresenta o conteúdo e o contato aprovados', async ({ page }) => {
  const response = await page.goto(route)
  expect(response?.status()).toBe(200)
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Brasil')
  await expect(page.getByRole('navigation')).toHaveCount(0)
  await expect(page.getByRole('contentinfo')).toHaveCount(0)
  await expect(page.locator('form')).toHaveCount(0)
  for (const title of ['Acordos internacionais', 'Proteção do INSS', 'Contribuição do exterior', 'Planejamento da aposentadoria']) {
    await expect(page.getByRole('heading', { name: title, exact: true })).toBeVisible()
  }
  await expect(page.getByText('OAB/RJ 264.772', { exact: false }).first()).toBeVisible()

  // Única exceção deliberada ao CTA único: link discreto pro site institucional,
  // no fechamento, sem concorrer com o WhatsApp em destaque visual.
  const siteLink = page.getByRole('link', { name: /Conheça mais/ })
  await expect(siteLink).toHaveAttribute('href', 'https://www.vanessavazadv.com.br/sobre')
  await expect(siteLink).toHaveAttribute('target', '_blank')

  // Links legais (Política de Cookies) são a outra exceção deliberada: exigência de GDPR/LGPD.
  await expect(page.getByRole('link', { name: 'Política de Cookies' }).first()).toHaveAttribute('href', '/politica-de-cookies')

  const links = page.getByRole('link').filter({ hasNotText: /Conheça mais|Política de Cookies/ })
  expect(await links.count()).toBeGreaterThan(0)
  for (const link of await links.all()) {
    await expect(link).toHaveAttribute('href', whatsapp)
    await expect(link).toHaveAccessibleName(/WhatsApp/)
  }
})

test('landing traz o texto revisado pela cliente, sem placeholders', async ({ page }) => {
  await page.goto(route)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Você contribuiu para o INSS no Brasil? Esses anos podem contar para sua aposentadoria, mesmo morando fora.',
  )
  // CTA com o rótulo novo (hero + barra fixa), nome acessível continua citando o WhatsApp
  const ctas = page.getByRole('link', { name: /WhatsApp/ })
  await expect(ctas).toHaveCount(3)
  for (const cta of await ctas.all()) await expect(cta).toContainText('Quero saber se meus anos contam')

  await expect(page.getByRole('heading', { name: 'Você chama. A gente analisa. Você entende.', level: 2 })).toBeVisible()
  for (const passo of ['Entendemos o seu histórico', 'Analisamos o cenário previdenciário', 'Você entende os próximos passos']) {
    await expect(page.getByRole('heading', { name: passo, level: 3 })).toBeVisible()
  }
  await expect(page.getByText('Os anos que contribuí no Brasil ainda contam?')).toBeVisible()
  await expect(page.getByText('As respostas dependem do seu histórico.', { exact: false })).toBeVisible()
  await expect(page.getByText('Atuação em Direito Previdenciário para brasileiros residentes no exterior.')).toBeVisible()
  await expect(page.getByText('Já atendi brasileiros em mais de 20 países.')).toBeVisible()
  await expect(page.locator('body')).not.toContainText(/xxx/i)
})

test('botões do WhatsApp abrem a conversa direto, com a mensagem pré-preenchida', async ({ page }) => {
  await page.goto(route)
  const ctas = page.getByRole('link', { name: /WhatsApp/ })
  await expect(ctas).toHaveCount(3) // herói, fechamento e barra fixa
  for (const cta of await ctas.all()) {
    const url = new URL((await cta.getAttribute('href'))!)
    // direto em api.whatsapp.com (o wa.me só faz um redirecionamento para cá)
    expect(url.origin + url.pathname).toBe('https://api.whatsapp.com/send/')
    expect(url.searchParams.get('phone')).toBe('436704071939')
    expect(url.searchParams.get('text')).toBe(mensagem)
    expect(url.searchParams.get('app_absent')).toBe('0')
    await expect(cta).not.toHaveAttribute('target', /.+/) // mesma aba: no celular o sistema entrega ao app
  }
})

const comCodigo = (codigo: string) =>
  `Olá, Vanessa! Vim pela página de Previdência no Exterior (${codigo}) e gostaria de entender melhor o meu caso.`
const textosDosBotoes = async (page: Page) =>
  Promise.all(
    (await page.getByRole('link', { name: /WhatsApp/ }).all()).map(async link =>
      new URL((await link.getAttribute('href'))!).searchParams.get('text')),
  )

for (const [codigo, utmContent] of [
  ['V01', 'V01'],
  ['V02', 'V02 - Aposentadoria no exterior'],
  ['V03', 'V03 — INSS ou previdência privada-editao 01'],
] as const) {
  test(`utm_content ${codigo} entra na mensagem dos três botões de WhatsApp, inclusive o fixo`, async ({ page }) => {
    await page.goto(`${route}?utm_source=instagram&utm_medium=paid&utm_content=${encodeURIComponent(utmContent)}&fbclid=abc123`)
    await expect(page.getByRole('link', { name: /WhatsApp/ })).toHaveCount(3) // herói, fechamento e barra fixa
    await expect.poll(() => textosDosBotoes(page)).toEqual([comCodigo(codigo), comCodigo(codigo), comCodigo(codigo)])
    // o resto do nome do anúncio não vai para a mensagem
    expect((await textosDosBotoes(page)).join(' ')).not.toMatch(/INSS ou previd|Aposentadoria no exterior/)
  })
}

for (const [descricao, query] of [
  ['sem utm_content', ''],
  ['utm_content vazio', '?utm_content='],
  ['código desconhecido', '?utm_content=V04%20teste'],
  ['código fora do início', '?utm_content=anuncio%20V01'],
  ['só outros parâmetros', '?utm_source=instagram&fbclid=abc'],
] as const) {
  test(`mensagem atual, sem código: ${descricao}`, async ({ page }) => {
    await page.goto(`${route}${query}`)
    // o aviso de cookies só aparece depois da hidratação: garante que o código já teria sido lido
    await expect(page.getByRole('dialog', { name: /cookies/i })).toBeVisible()
    expect(await textosDosBotoes(page)).toEqual([mensagem, mensagem, mensagem])
  })
}

test('landing tem SEO e compartilhamento próprios', async ({ page }) => {
  await page.goto(route)
  await expect(page).toHaveTitle(/Previdência no exterior.*Vanessa/)
  await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR')
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /brasileiros no exterior/i)
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', new RegExp(`${route}$`))
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', new RegExp(`${route}$`))
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /Previdência no exterior/)
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /\/og-image.png$/)
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image')
})

test('foto desktop cabe entre o cabeçalho e a barra de contato em tela baixa', async ({ page }) => {
  await page.setViewportSize({ width: 1281, height: 634 })
  await page.goto(route)
  await page.evaluate(() => document.fonts.ready)

  const photo = await page.getByRole('img', { name: 'Vanessa Vaz Marschallinger', exact: true }).boundingBox()
  const frame = await page.locator('[class*="photoFrame"]').boundingBox()
  const header = await page.locator('header').boundingBox()
  const contactBar = await page.getByRole('complementary', { name: 'Contato pelo WhatsApp' }).boundingBox()
  const cta = await page.getByRole('link', { name: /WhatsApp/ }).first().boundingBox()

  expect(photo!.width).toBeLessThanOrEqual(200)
  expect(photo!.width / photo!.height).toBeCloseTo(768 / 1364, 2)
  expect(frame!.y - 14).toBeGreaterThanOrEqual(header!.y + header!.height)
  expect(frame!.y + frame!.height + 14).toBeLessThanOrEqual(contactBar!.y)
  expect(cta!.y + cta!.height).toBeLessThanOrEqual(contactBar!.y)
})

for (const width of [320, 390, 768, 1440]) {
  test(`CTA permanece acessível e não encobre o conteúdo em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 })
    await page.goto(route)
    await page.evaluate(() => document.fonts.ready)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    const cta = page.getByRole('link', { name: /WhatsApp/ }).last()
    await expect(cta).toBeInViewport()
    await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }))
    await expect(cta).toBeInViewport()
    const signature = page.getByText('Vanessa Vaz Marschallinger · OAB/RJ 264.772', { exact: true }).last()
    await expect(signature).toBeInViewport()
    const signatureBox = await signature.boundingBox()
    const ctaBox = await cta.boundingBox()
    expect(signatureBox!.y + signatureBox!.height).toBeLessThan(ctaBox!.y)
    expect(ctaBox!.height).toBeGreaterThanOrEqual(44)
  })
}

test('hero mobile mostra primeiro o conteúdo, depois a foto e a seção Brasil e exterior', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto(route)

  const logo = page.getByRole('img', { name: /Vanessa Vaz Marschallinger/ }).first()
  const title = page.getByRole('heading', { level: 1 })
  const heroCta = page.getByRole('link', { name: /WhatsApp/ }).first()
  const credit = page.getByText('Vanessa Vaz Marschallinger · OAB/RJ 264.772', { exact: true }).first()
  const photo = page.getByRole('img', { name: 'Vanessa Vaz Marschallinger', exact: true })

  for (const element of [logo, title, heroCta, credit]) {
    await expect(element).toBeInViewport()
  }
  const heroTextColumn = await title.locator('xpath=../..').boundingBox()
  const heroContent = await title.locator('..').boundingBox()
  const contactBar = await page.getByRole('complementary', { name: 'Contato pelo WhatsApp' }).boundingBox()
  const topSpace = heroContent!.y - heroTextColumn!.y
  const bottomSpace = contactBar!.y - heroContent!.y - heroContent!.height
  expect(Math.abs(topSpace - bottomSpace)).toBeLessThan(30)
  expect((await photo.boundingBox())!.y).toBeGreaterThanOrEqual(contactBar!.y)

  await photo.scrollIntoViewIfNeeded()
  expect((await photo.boundingBox())!.height).toBeGreaterThanOrEqual(500)

  const servicesTitle = page.getByRole('heading', { name: 'Morar fora do Brasil muda as perguntas que você faz sobre sua aposentadoria.' })
  await servicesTitle.scrollIntoViewIfNeeded()
  await expect(servicesTitle).toBeInViewport()
})

test('foto mobile aparece com transição quando entra na tela ao rolar', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto(route)
  const frame = page.locator('[class*="photoFrame"]')

  await expect(frame).toHaveAttribute('data-reveal', 'pending')
  await expect(frame).toHaveCSS('opacity', '0')
  await frame.scrollIntoViewIfNeeded()
  await expect(frame).toHaveAttribute('data-reveal', 'shown')
  await expect(frame).toHaveCSS('opacity', '1')
  const duration = await frame.evaluate(element => parseFloat(getComputedStyle(element).transitionDuration))
  expect(duration).toBeGreaterThan(0)
})

test('foto mobile fica oculta de imediato ao aguardar a rolagem, sem esmaecer na carga', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto(route)
  const frame = page.locator('[class*="photoFrame"]')

  await expect(frame).toHaveAttribute('data-reveal', 'pending')
  // Sem transição no estado de espera: a foto some na hora. Com transição, uma
  // rolagem rápida logo após a carga a mostraria esmaecendo e a revelação
  // recomeçaria de uma opacidade parcial em vez de 0.
  await expect(frame).toHaveCSS('transition-duration', '0s')
})

test('foto mobile anima uma única vez: ao rolar de volta ela segue visível', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto(route)
  const frame = page.locator('[class*="photoFrame"]')
  // Dois quadros bastam para o IntersectionObserver entregar qualquer saída da tela pendente.
  const aguardarQuadros = () => page.evaluate(() => new Promise<void>(resolve => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
  }))

  // espera a hidratação: rolar antes dela deixa a foto visível desde o início (por desenho)
  await expect(frame).toHaveAttribute('data-reveal', 'pending')
  await frame.scrollIntoViewIfNeeded()
  await expect(frame).toHaveAttribute('data-reveal', 'shown')
  await expect(frame).toHaveCSS('opacity', '1')

  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
  await aguardarQuadros()
  await expect(frame).toHaveAttribute('data-reveal', 'shown')
  await expect(frame).toHaveCSS('opacity', '1')
})

test('foto mobile respeita a preferência por movimento reduzido', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto(route)
  const frame = page.locator('[class*="photoFrame"]')

  await expect(frame).toHaveCSS('opacity', '1')
  await expect(frame).toHaveCSS('transition-duration', '0s')
})

test('link discreto do fechamento mantém contraste AA (4,5:1)', async ({ page }) => {
  await page.goto(route)
  const link = page.getByRole('link', { name: /Conheça mais/ })

  // Fórmula WCAG 2.x sobre a cor efetiva (cor do texto x opacidade sobre o primeiro fundo opaco).
  const contraste = await link.evaluate((el: HTMLElement) => {
    const canais = (cor: string) => (cor.match(/[\d.]+/g) ?? []).map(Number)
    const luminancia = ([r, g, b]: number[]) => {
      const linear = (v: number) => { const c = v / 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4 }
      return 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b)
    }
    let fundo = [255, 255, 255]
    for (let no: HTMLElement | null = el; no; no = no.parentElement) {
      const c = canais(getComputedStyle(no).backgroundColor)
      if (c.length >= 3 && (c[3] ?? 1) > 0) { fundo = c.slice(0, 3); break }
    }
    const estilo = getComputedStyle(el)
    const [r, g, b, a = 1] = canais(estilo.color)
    const alfa = a * parseFloat(estilo.opacity)
    const texto = [r, g, b].map((v, i) => v * alfa + fundo[i] * (1 - alfa))
    const [claro, escuro] = [luminancia(texto), luminancia(fundo)].sort((x, y) => y - x)
    return (claro + 0.05) / (escuro + 0.05)
  })

  expect(contraste).toBeGreaterThanOrEqual(4.5)
})

test('CTA é operável por teclado e abre o destino correto', async ({ page }) => {
  await page.goto(route)
  const firstCta = page.getByRole('link', { name: /WhatsApp/ }).first()
  await page.keyboard.press('Tab')
  await expect(firstCta).toBeFocused()
  expect(await firstCta.evaluate(el => getComputedStyle(el).outlineStyle)).not.toBe('none')
  await page.route('**/api.whatsapp.com/**', r => r.fulfill({ body: 'Destino WhatsApp verificado' }))
  await page.keyboard.press('Enter')
  await expect(page).toHaveURL(/^https:\/\/api\.whatsapp\.com\/send\//)
})
