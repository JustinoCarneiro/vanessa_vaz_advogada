import { test, expect } from '@playwright/test'

/**
 * Testes do painel admin (Payload CMS 3.x):
 *  - /admin protegido: exibe login (redirect via JS, não HTTP)
 *  - Login com credenciais válidas abre o painel
 *  - Criar post como rascunho
 *  - Publicar post e verificar em /blog
 *
 * Payload 3.x faz o redirect /admin → /admin/login via JavaScript (React Router),
 * não via HTTP 302. Por isso usamos waitForURL com timeout generoso.
 *
 * Credenciais de teste via variáveis de ambiente:
 *   PLAYWRIGHT_ADMIN_EMAIL    (padrão: admin@vvmadvocacia.com.br)
 *   PLAYWRIGHT_ADMIN_PASSWORD (sem padrão — testes de CRUD são pulados se não definida)
 *
 * Para rodar localmente:
 *   PLAYWRIGHT_ADMIN_EMAIL=seu@email PLAYWRIGHT_ADMIN_PASSWORD=suasenha npm run test:e2e:chrome -- tests/e2e/admin.spec.ts
 */

const ADMIN_EMAIL = process.env.PLAYWRIGHT_ADMIN_EMAIL ?? 'admin@vvmadvocacia.com.br'
const ADMIN_PASSWORD = process.env.PLAYWRIGHT_ADMIN_PASSWORD ?? ''

const ADMIN_URL = '/admin'
const COLLECTIONS_URL = '/admin/collections/posts'

test.describe('Admin — acesso não autenticado', () => {
  // Estes testes podem ser lentos (compilação Payload + redirect JS)
  test.slow()

  test('/admin protegido: exibe formulário de login', async ({ page }) => {
    await page.goto(ADMIN_URL)

    // Payload 3.x faz redirect via JS — aguarda até 25s.
    // Se não redirecionar, aceita que o form esteja inline na própria /admin.
    await page.waitForURL(/\/admin\/login/, { timeout: 25_000 }).catch(() => {
      // redirect não ocorreu — o form pode estar inline; continuamos verificando o form
    })

    // Em ambos os casos deve haver um campo de email visível após a hidratação
    const emailInput = page.locator(
      'input[name="email"], input[type="email"], input[id*="email" i]'
    ).first()
    await expect(emailInput).toBeVisible({ timeout: 20_000 })
  })

  test('página de login exibe campos de autenticação', async ({ page }) => {
    await page.goto(`${ADMIN_URL}/login`)

    const emailInput = page.locator(
      'input[name="email"], input[type="email"], input[id*="email" i]'
    ).first()
    await expect(emailInput).toBeVisible({ timeout: 20_000 })

    const passwordInput = page.locator(
      'input[name="password"], input[type="password"], input[id*="password" i]'
    ).first()
    await expect(passwordInput).toBeVisible()

    const submitBtn = page.locator(
      'button[type="submit"], button:has-text("Entrar"), button:has-text("Login"), button:has-text("Sign In")'
    ).first()
    await expect(submitBtn).toBeVisible()
  })
})

test.describe('Admin — login e CRUD de posts', () => {
  // Pula TODO o grupo se a variável não estiver definida.
  // Desta forma o beforeEach nunca é invocado e o describe aparece como ⊘ no UI,
  // não como ❌ (que ocorria quando test.skip() era chamado dentro do beforeEach).
  test.skip(!ADMIN_PASSWORD, 'Define PLAYWRIGHT_ADMIN_PASSWORD para rodar estes testes')

  test.beforeEach(async ({ page }) => {
    // Login via API REST do Payload (mais rápido que preencher o form a cada teste)
    const res = await page.request.post('/api/users/login', {
      data: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD },
    })
    expect(res.ok()).toBeTruthy()

    const body = await res.json()
    const token: string = body.token

    await page.context().addCookies([
      {
        name: 'payload-token',
        value: token,
        domain: 'localhost',
        path: '/',
        httpOnly: false,
        secure: false,
        sameSite: 'Lax',
      },
    ])
  })

  test('painel admin abre após login sem redirecionar para /login', async ({ page }) => {
    await page.goto(ADMIN_URL)
    await page.waitForLoadState('networkidle')
    await expect(page).not.toHaveURL(/\/login/)
    await expect(page.locator('body')).not.toContainText('Unauthorized')
  })

  test('cria um post novo como rascunho', async ({ page }) => {
    const title = `Post E2E Rascunho ${Date.now()}`

    await page.goto(`${COLLECTIONS_URL}/create`)

    const titleField = page.locator('#field-title, [name="title"]').first()
    await expect(titleField).toBeVisible({ timeout: 15_000 })
    await titleField.fill(title)

    // Status já é "Rascunho" por padrão (defaultValue: 'draft' na collection).
    // Não precisa interagir com o campo.

    await page.locator('button[type="submit"], button:has-text("Salvar"), button:has-text("Save")').first().click()

    // Após salvar, Payload navega para /admin/collections/posts/{id}.
    // Mais confiável que verificar o toast (que coexiste com label "Created:" na página).
    await expect(page).toHaveURL(/\/admin\/collections\/posts\/\d+/, { timeout: 15_000 })
  })

  test('publica um post e ele aparece em /blog', async ({ page }) => {
    const title = `Post E2E Publicado ${Date.now()}`

    await page.goto(`${COLLECTIONS_URL}/create`)

    const titleField = page.locator('#field-title, [name="title"]').first()
    await expect(titleField).toBeVisible({ timeout: 15_000 })
    await titleField.fill(title)

    const excerptField = page.locator('#field-excerpt, [name="excerpt"]').first()
    if (await excerptField.count() > 0) {
      await excerptField.fill('Artigo de teste publicado pelo Playwright.')
    }

    // Payload 3.x — react-select: abre dropdown clicando no controle,
    // depois clica na opção pelo role="option" + nome exato do label da collection.
    await page.locator('#field-status').click()
    await expect(page.getByRole('option', { name: 'Publicado' })).toBeVisible({ timeout: 5_000 })
    await page.getByRole('option', { name: 'Publicado' }).click()

    // Confirma que o campo mudou para "Publicado" antes de salvar
    await expect(page.locator('#field-status')).toContainText('Publicado', { timeout: 5_000 })

    await page.locator('button[type="submit"], button:has-text("Salvar"), button:has-text("Save")').first().click()
    await expect(page).toHaveURL(/\/admin\/collections\/posts\/\d+/, { timeout: 15_000 })

    // Busca pelo título para ignorar o cache de página estática do Next.js
    await page.goto(`/blog?q=${encodeURIComponent(title)}`)
    await expect(page.getByText(title)).toBeVisible({ timeout: 10_000 })
  })
})
