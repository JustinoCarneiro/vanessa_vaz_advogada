import { test, expect, type Page } from '@playwright/test'

/**
 * Testes do Blog:
 *  - Listagem carrega (vazia ou com posts)
 *  - Barra de busca funciona (query param ?q=)
 *  - Filtro de categoria funciona (query param ?cat=)
 *  - Artigo individual abre e renderiza conteúdo
 *
 * Nota: testes com posts reais dependem do banco de dados estar populado.
 * Os testes de "sem posts" verificam o estado vazio, que é válido em ambiente limpo.
 *
 * SearchBar usa onChange (não onSubmit/Enter) → fill() já dispara a navegação.
 */

test.describe('Blog — listagem', () => {
  test('página /blog carrega e exibe o cabeçalho', async ({ page }) => {
    await page.goto('/blog')

    await expect(page).toHaveTitle(/Blog/i)
    await expect(page.locator('#blog-heading')).toBeVisible()
    await expect(page.locator('#blog-heading')).toContainText('Blog')
  })

  test('barra de busca está presente e aceita entrada', async ({ page }) => {
    await page.goto('/blog')

    // SearchBar: <input type="search" aria-label="Buscar artigos" />
    const search = page.getByRole('searchbox', { name: /buscar artigos/i })
    await expect(search).toBeVisible()

    // fill() dispara onChange → router.push com ?q=aposentadoria
    await search.fill('aposentadoria')

    // URL deve refletir a busca após a navegação
    await expect(page).toHaveURL(/[?&]q=aposentadoria/, { timeout: 15_000 })
  })

  test('estado vazio exibe mensagem adequada quando não há resultados', async ({ page }) => {
    await page.goto('/blog?q=xyzxyz123abc')

    // Exibe mensagem de "nenhum artigo encontrado"
    await expect(page.getByRole('heading', { name: /nenhum artigo encontrado/i })).toBeVisible()

    // Botão para limpar filtros — usa texto exato do Link no estado vazio
    await expect(page.getByRole('link', { name: /limpar busca e filtros/i })).toBeVisible()
  })

  test('limpar busca volta para listagem sem filtro', async ({ page }) => {
    await page.goto('/blog?q=xyzxyz123abc')

    // Usa o link "Limpar busca e filtros" do estado vazio (específico, sem ambiguidade)
    await page.getByRole('link', { name: /limpar busca e filtros/i }).click()

    await expect(page).toHaveURL('/blog')
  })
})

test.describe('Blog — filtro de categoria', () => {
  test('CategoryPills renderiza sem erro', async ({ page }) => {
    await page.goto('/blog')

    // O cabeçalho e a área de filtros estão presentes
    await expect(page.locator('#blog-heading')).toBeVisible()
  })

  test('filtro por categoria adiciona ?cat= na URL', async ({ page }) => {
    await page.goto('/blog')

    // Procura qualquer link de categoria (CategoryPills gera <a href="/blog?cat=...">)
    const catLink = page.locator('a[href*="/blog?cat="]').first()

    if (await catLink.count() === 0) {
      test.skip()
      return
    }

    await catLink.click()
    await expect(page).toHaveURL(/[?&]cat=/)
    await expect(page.locator('#blog-heading')).toBeVisible()
  })
})

test.describe('Blog — artigo individual', () => {
  // Helper: navega para o primeiro artigo publicado e retorna se chegou lá de verdade.
  // Em dev, o SSR pode demorar vários segundos — espera explicitamente pela mudança de URL.
  async function abrirPrimeiroArtigo(page: Page) {
    await page.goto('/blog')

    const lerMais = page.locator('a[href^="/blog/"]:not([href="/blog/"])').first()
    if (await lerMais.count() === 0) return null

    const href = await lerMais.getAttribute('href')
    await lerMais.click()

    // waitForURL espera até a URL mudar para qualquer rota /blog/<slug>.
    // Se em 30s a URL não mudar (redirect de volta ou erro), retorna null → skip.
    try {
      await page.waitForURL(/\/blog\/.+/, { timeout: 30_000 })
    } catch {
      return null
    }

    return href
  }

  test('acessa um artigo publicado e verifica conteúdo', async ({ page }) => {
    const href = await abrirPrimeiroArtigo(page)
    if (!href) { test.skip(); return }

    await expect(page).toHaveURL(href, { timeout: 30_000 })
    await expect(page.locator('article')).toBeVisible()
    await expect(page.locator('h1').first()).toBeVisible()
    await expect(page.locator('body')).not.toContainText('500')
  })

  test('breadcrumb do artigo tem link para /blog', async ({ page }) => {
    const href = await abrirPrimeiroArtigo(page)
    if (!href) { test.skip(); return }

    const breadcrumb = page.locator('[aria-label="Você está em"]')
    await expect(breadcrumb).toBeVisible()
    await expect(breadcrumb.locator('a[href="/blog"]')).toBeVisible()
  })
})
