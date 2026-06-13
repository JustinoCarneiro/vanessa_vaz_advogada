import { test, expect } from '@playwright/test'

/**
 * Testes de navegação geral:
 *  - Home carrega com carrossel visível
 *  - Cada rota do menu abre sem erro e renderiza um <h1>
 */

test.describe('Home', () => {
  test('carrega e exibe o carrossel', async ({ page }) => {
    await page.goto('/')

    await expect(page).toHaveTitle(/Vanessa/i)

    // Seção do carrossel (aria-label definido no HeroCarousel)
    const carousel = page.locator('[aria-label="Apresentação"]')
    await expect(carousel).toBeVisible()

    // Navegação por dots presente
    const dots = page.locator('[role="tablist"][aria-label="Slides"]')
    await expect(dots).toBeVisible()

    // Pelo menos 3 dots (3 slides)
    await expect(dots.locator('[role="tab"]')).toHaveCount(3)
  })

  test('botão "Fale Comigo" no hero leva a /contato', async ({ page }) => {
    await page.goto('/')
    const cta = page.locator('a[href="/contato"]').first()
    await expect(cta).toBeVisible()
  })
})

test.describe('Menu de navegação', () => {
  const rotas = [
    { label: 'Sobre',      href: '/sobre'      },
    { label: 'Escritório', href: '/escritorio' },
    { label: 'Serviços',   href: '/servicos'   },
    { label: 'Blog',       href: '/blog'       },
  ]

  for (const { label, href } of rotas) {
    test(`clica em "${label}" e a página carrega sem erro`, async ({ page }) => {
      await page.goto('/')

      // Clica no link do menu desktop (hidden md:flex → visível na viewport padrão 1280px)
      const link = page.locator(`nav a[href="${href}"]`).first()
      await expect(link).toBeVisible()
      await link.click()

      await expect(page).toHaveURL(href)

      // Página renderizou um título principal
      await expect(page.locator('h1').first()).toBeVisible()

      // Sem mensagem de erro do Next.js
      await expect(page.locator('body')).not.toContainText('500')
      await expect(page.locator('body')).not.toContainText('Internal Server Error')
    })
  }

  test('botão "Fale Comigo" no menu leva a /contato', async ({ page }) => {
    await page.goto('/')

    // Botão CTA da NavBar (texto exato do componente)
    const faleComigo = page.locator('nav a[href="/contato"]').first()
    await expect(faleComigo).toBeVisible()
    await faleComigo.click()

    await expect(page).toHaveURL('/contato')
    await expect(page.locator('h1').first()).toBeVisible()
  })
})

test.describe('NavBar — mobile', () => {
  test.use({ viewport: { width: 390, height: 844 } }) // iPhone 14

  test('abre o menu hamburguer e exibe os links', async ({ page }) => {
    await page.goto('/')

    // Botão hamburguer visível no mobile
    const burger = page.getByRole('button', { name: /abrir menu/i })
    await expect(burger).toBeVisible()
    await burger.click()

    // Menu expandido com links
    const mobileMenu = page.locator('#mobile-menu')
    await expect(mobileMenu).toBeVisible()
    await expect(mobileMenu.locator('a[href="/sobre"]')).toBeVisible()
    await expect(mobileMenu.locator('a[href="/blog"]')).toBeVisible()
    await expect(mobileMenu.locator('a[href="/contato"]')).toBeVisible()
  })
})
