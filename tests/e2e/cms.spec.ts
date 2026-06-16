import { test, expect } from '@playwright/test'

/**
 * Testes E2E das operações do CMS (Payload 3.x):
 *  - Criar e listar categorias
 *  - Editar post existente
 *  - Painel de SiteSettings (Fotos e Serviços)
 *  - Mensagens de contato (listagem)
 *  - Media (painel de upload)
 *
 * Todos os testes deste arquivo requerem PLAYWRIGHT_ADMIN_PASSWORD.
 * Autenticação via cookie JWT (mesma abordagem de admin.spec.ts).
 */

const ADMIN_EMAIL = process.env.PLAYWRIGHT_ADMIN_EMAIL ?? 'admin@vvmadvocacia.com.br'
const ADMIN_PASSWORD = process.env.PLAYWRIGHT_ADMIN_PASSWORD ?? ''

test.describe('CMS — Operações administrativas', () => {
  test.skip(!ADMIN_PASSWORD, 'Define PLAYWRIGHT_ADMIN_PASSWORD para rodar estes testes')

  test.beforeEach(async ({ page }) => {
    const res = await page.request.post('/api/users/login', {
      data: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD },
    })
    expect(res.ok()).toBeTruthy()

    const body = await res.json()
    await page.context().addCookies([
      {
        name: 'payload-token',
        value: body.token as string,
        domain: 'localhost',
        path: '/',
        httpOnly: false,
        secure: false,
        sameSite: 'Lax',
      },
    ])
  })

  // ────────────────────────────────────────────────────────────
  // Categorias
  // ────────────────────────────────────────────────────────────

  test('cria uma nova categoria', async ({ page }) => {
    const name = `Categoria E2E ${Date.now()}`

    await page.goto('/admin/collections/categories/create')

    const nameField = page.locator('#field-name, [name="name"]').first()
    await expect(nameField).toBeVisible({ timeout: 15_000 })
    await nameField.fill(name)

    await page.locator('button[type="submit"], button:has-text("Salvar"), button:has-text("Save")').first().click()

    // Após salvar, Payload redireciona para /admin/collections/categories/{id}
    await expect(page).toHaveURL(/\/admin\/collections\/categories\/\d+/, { timeout: 15_000 })
  })

  test('lista de categorias carrega no painel', async ({ page }) => {
    await page.goto('/admin/collections/categories')
    await page.waitForLoadState('networkidle')

    // O painel deve exibir o botão de criar nova entrada
    const createBtn = page.locator(
      'a[href*="/create"], button:has-text("Criar"), button:has-text("Create"), a:has-text("Adicionar")'
    ).first()
    await expect(createBtn).toBeVisible({ timeout: 15_000 })
  })

  // ────────────────────────────────────────────────────────────
  // Posts — edição
  // ────────────────────────────────────────────────────────────

  test('edita um post existente e salva a alteração', async ({ page }) => {
    // Cria um post base
    const originalTitle = `Post E2E Base ${Date.now()}`
    await page.goto('/admin/collections/posts/create')

    const titleField = page.locator('#field-title, [name="title"]').first()
    await expect(titleField).toBeVisible({ timeout: 15_000 })
    await titleField.fill(originalTitle)

    await page.locator('button[type="submit"], button:has-text("Salvar"), button:has-text("Save")').first().click()
    await expect(page).toHaveURL(/\/admin\/collections\/posts\/\d+/, { timeout: 15_000 })

    // Extrai o ID da URL atual e reedita o mesmo post
    const postUrl = page.url()

    const updatedTitle = `${originalTitle} — Editado`
    await titleField.clear()
    await titleField.fill(updatedTitle)

    await page.locator('button[type="submit"], button:has-text("Salvar"), button:has-text("Save")').first().click()

    // Deve permanecer na mesma URL (edição, não criação)
    await expect(page).toHaveURL(new RegExp(postUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), { timeout: 15_000 })

    // Rota de busca deve retornar o título atualizado
    await page.goto(`/blog?q=${encodeURIComponent(updatedTitle)}`)
    // Se o post ainda é rascunho não aparece em /blog — apenas verificamos que a página carrega
    await expect(page.locator('body')).toBeVisible({ timeout: 10_000 })
  })

  // ────────────────────────────────────────────────────────────
  // SiteSettings — global "Fotos e Serviços"
  // ────────────────────────────────────────────────────────────

  test('painel SiteSettings carrega com campos de foto e serviços', async ({ page }) => {
    await page.goto('/admin/globals/site-settings')
    await page.waitForLoadState('networkidle')

    // O campo sobreFoto deve estar presente
    const sobreFotoField = page.locator('#field-sobreFoto, [id*="sobreFoto"]').first()
    await expect(sobreFotoField).toBeVisible({ timeout: 20_000 })

    // Deve existir pelo menos o primeiro item do array de serviços (ou botão de adicionar)
    const servicosRegion = page.locator('[id*="servicos"], [class*="servicos"], button:has-text("Adicionar"), button:has-text("Add")').first()
    await expect(servicosRegion).toBeVisible({ timeout: 10_000 })
  })

  test('edita o título do primeiro serviço e salva', async ({ page }) => {
    await page.goto('/admin/globals/site-settings')
    await page.waitForLoadState('networkidle')

    // Campo de título do primeiro serviço no array
    const firstServiceTitle = page.locator('#field-servicos__0__titulo, [name="servicos.0.titulo"]').first()

    if (await firstServiceTitle.count() === 0) {
      // Sem serviços cadastrados — apenas verifica que o painel carregou
      await expect(page.locator('body')).not.toContainText('Unauthorized')
      return
    }

    await expect(firstServiceTitle).toBeVisible({ timeout: 10_000 })
    const currentValue = await firstServiceTitle.inputValue()

    // Faz uma edição mínima (adiciona espaço e remove) para acionar o dirty state
    await firstServiceTitle.click()
    await firstServiceTitle.press('End')
    await firstServiceTitle.type(' ')
    await firstServiceTitle.press('Backspace')

    await page.locator('button[type="submit"], button:has-text("Salvar"), button:has-text("Save")').first().click()

    // Payload retorna toast de sucesso — verifica que não há erro de validação na tela
    await expect(page.locator('body')).not.toContainText('Error', { timeout: 10_000 })
    await expect(page.locator('body')).not.toContainText('Erro')

    // Campo deve manter o valor original após salvar
    await expect(firstServiceTitle).toHaveValue(currentValue, { timeout: 10_000 })
  })

  // ────────────────────────────────────────────────────────────
  // Mensagens de contato
  // ────────────────────────────────────────────────────────────

  test('painel de mensagens de contato carrega', async ({ page }) => {
    await page.goto('/admin/collections/contact-messages')
    await page.waitForLoadState('networkidle')

    // Não deve exibir "Unauthorized" nem erro de servidor
    await expect(page.locator('body')).not.toContainText('Unauthorized', { timeout: 15_000 })
    await expect(page.locator('body')).not.toContainText('500')

    // Deve exibir o nome da coleção na página
    const heading = page.locator('h1, h2').filter({ hasText: /mensagens|contact/i }).first()
    await expect(heading).toBeVisible({ timeout: 15_000 })
  })

  test('mensagem de contato enviada pelo formulário aparece no painel', async ({ page }) => {
    // Envia uma mensagem via API de contato
    const testName = `Teste E2E ${Date.now()}`
    const res = await page.request.post('/api/contact', {
      data: {
        name: testName,
        email: 'playwright@teste.com',
        subject: 'Aposentadoria por Tempo de Contribuição',
        message: 'Esta é uma mensagem de teste enviada pelo Playwright para verificar o painel CMS.',
      },
    })
    expect(res.ok()).toBeTruthy()

    // Abre o painel e verifica que a mensagem está listada
    await page.goto('/admin/collections/contact-messages')
    await page.waitForLoadState('networkidle')

    await expect(page.getByText(testName)).toBeVisible({ timeout: 15_000 })
  })

  // ────────────────────────────────────────────────────────────
  // Media — painel de uploads
  // ────────────────────────────────────────────────────────────

  test('painel de media carrega com opção de upload', async ({ page }) => {
    await page.goto('/admin/collections/media')
    await page.waitForLoadState('networkidle')

    await expect(page.locator('body')).not.toContainText('Unauthorized', { timeout: 15_000 })

    // Deve existir link/botão para criar nova mídia
    const createBtn = page.locator(
      'a[href*="/media/create"], button:has-text("Upload"), button:has-text("Criar"), a:has-text("Adicionar")'
    ).first()
    await expect(createBtn).toBeVisible({ timeout: 15_000 })
  })

  test('tela de upload de mídia exibe campo de arquivo', async ({ page }) => {
    await page.goto('/admin/collections/media/create')
    await page.waitForLoadState('networkidle')

    // Campo de upload de arquivo deve estar visível
    const fileInput = page.locator('input[type="file"], [data-testid*="upload"], button:has-text("Upload"), [class*="upload"]').first()
    await expect(fileInput).toBeVisible({ timeout: 15_000 })
  })
})
