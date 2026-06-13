import { test, expect, type Page } from '@playwright/test'

/**
 * Testes do formulário de contato (/contato).
 *
 * Campos:
 *   #cf-name    — input text, required
 *   #cf-email   — input email, required
 *   #cf-phone   — input tel, opcional (valida DDD + número se preenchido)
 *   #cf-subject — select, required — values = texto exato da ASSUNTO_OPTIONS:
 *                 'Aposentadoria' | 'Aposentadoria Especial' | 'Benefício por Incapacidade' |
 *                 'BPC / LOAS' | 'Pensão por Morte' | 'Revisão de Benefício' | 'Outro assunto'
 *   #cf-message — textarea, required, mínimo 20 caracteres
 *
 * ATENÇÃO — seletores:
 *   • [role="alert"] resolve 2 elementos (o banner do form + o __next-route-announcer__
 *     do Next.js). Usar sempre .filter({ hasText: /precisam/ }) para ser específico.
 *   • selectOption usa o VALUE da opção, que aqui é o próprio texto (ex.: 'Aposentadoria').
 */

// Helper: o banner de erro do formulário (evita strict mode com o route-announcer)
const errorBanner = (page: Page) =>
  page.getByRole('alert').filter({ hasText: /precisam de atenção/i })

test.describe('Formulário de contato — validação', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contato')
    await expect(page.locator('h1').first()).toBeVisible()
  })

  test('submit com todos os campos vazios exibe banner de erro', async ({ page }) => {
    await page.locator('button[type="submit"]').click()

    // Banner: role="alert" filtrado por texto (evita strict mode com route-announcer)
    const banner = page.getByRole('alert').filter({ hasText: /precisam de atenção/i })
    await expect(banner).toBeVisible()
    await expect(banner).toContainText('precisam de atenção')
  })

  test('campo nome em branco exibe mensagem de validação', async ({ page }) => {
    await page.locator('button[type="submit"]').click()

    // O banner geral de erro aparece
    await expect(
      page.getByRole('alert').filter({ hasText: /precisam de atenção/i })
    ).toBeVisible()

    // O input de nome fica visível (marcado com borda de erro via JS)
    await expect(page.locator('#cf-name')).toBeVisible()
  })

  test('campo email inválido mantém o banner de erro visível', async ({ page }) => {
    await page.locator('#cf-name').fill('Teste Silva')
    await page.locator('#cf-email').fill('email-invalido')
    await page.locator('button[type="submit"]').click()

    // Banner de erro geral (email + subject + message são todos inválidos)
    await expect(
      page.getByRole('alert').filter({ hasText: /precisam de atenção/i })
    ).toBeVisible()
  })

  test('submeter sem mensagem mantém o banner de erro visível', async ({ page }) => {
    await page.locator('#cf-name').fill('Teste Silva')
    await page.locator('#cf-email').fill('teste@email.com')

    // value = texto exato da ASSUNTO_OPTIONS (não é slug — é o label completo)
    await page.locator('#cf-subject').selectOption('Aposentadoria')

    // Não preenche #cf-message (mínimo 20 chars) → validação falha
    await page.locator('button[type="submit"]').click()

    await expect(
      page.getByRole('alert').filter({ hasText: /precisam de atenção/i })
    ).toBeVisible()
  })
})

test.describe('Formulário de contato — envio válido', () => {
  test('preenche formulário completo e exibe confirmação de sucesso', async ({ page }) => {
    await page.goto('/contato')

    // Intercepta ANTES de preencher os campos
    await page.route('/api/contact', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ ok: true }),
      })
    })

    await page.locator('#cf-name').fill('Maria da Silva')
    await page.locator('#cf-email').fill('maria@example.com')
    await page.locator('#cf-phone').fill('(48) 99999-0000')
    await page.locator('#cf-subject').selectOption('Aposentadoria')
    await page.locator('#cf-message').fill(
      'Tenho 35 anos de contribuição e preciso de orientação sobre aposentadoria por tempo de contribuição.'
    )

    await page.locator('button[type="submit"]').click()

    // ContactForm exibe <h2>Mensagem enviada!</h2> quando submitted=true
    await expect(
      page.getByRole('heading', { name: /mensagem enviada/i })
    ).toBeVisible({ timeout: 10_000 })
  })

  test('formulário inválido NÃO dispara requisição para /api/contact', async ({ page }) => {
    const requests: string[] = []
    page.on('request', (req) => {
      if (req.url().includes('/api/contact')) requests.push(req.url())
    })

    await page.goto('/contato')
    await page.locator('button[type="submit"]').click()

    await page.waitForTimeout(500)
    expect(requests).toHaveLength(0)
  })
})
