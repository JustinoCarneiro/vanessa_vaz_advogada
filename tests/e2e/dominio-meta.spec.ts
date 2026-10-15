import { test, expect } from '@playwright/test'

// Código gerado pela Meta (Business Manager) para verificar vanessavazadv.com.br.
const codigo = 'dan0rpptj618givpi13s3y9ptc4qpr'

test('a página inicial traz a metatag de verificação de domínio da Meta, uma única vez', async ({ page }) => {
  const response = await page.goto('/')
  expect(response?.status()).toBe(200)
  const tag = page.locator('head meta[name="facebook-domain-verification"]')
  await expect(tag).toHaveCount(1)
  await expect(tag).toHaveAttribute('content', codigo)
})

// O verificador da Meta lê o HTML bruto, sem executar JavaScript, e não sabemos qual User-Agent ele usa.
// A tag precisa estar dentro do <head> para todos: pelo metadata do Next, no `next dev`, ela iria para o corpo.
for (const [nome, userAgent] of [
  ['navegador comum', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36'],
  ['facebookexternalhit', 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)'],
  ['meta-externalagent', 'meta-externalagent/1.1 (+https://developers.facebook.com/docs/sharing/webmasters/crawler)'],
] as const) {
  test(`HTML bruto da página inicial tem a metatag dentro do <head> (${nome})`, async ({ request }) => {
    const html = await (await request.get('/', { headers: { 'user-agent': userAgent } })).text()
    const tag = html.indexOf('<meta name="facebook-domain-verification" content="' + codigo + '"')
    expect(tag).toBeGreaterThan(-1)
    expect(tag).toBeLessThan(html.indexOf('</head>'))
  })
}
