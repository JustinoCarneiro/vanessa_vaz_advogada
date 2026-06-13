import { defineConfig, devices } from '@playwright/test'
import { config } from 'dotenv'

// Carrega .env.local automaticamente (mesmo arquivo usado pelo Next.js).
// As variáveis PLAYWRIGHT_* ficam disponíveis em process.env para os testes.
config({ path: '.env.local' })

/**
 * Rodar os testes:
 *   npm run test:e2e          → todos os browsers
 *   npm run test:e2e:chrome   → apenas chromium
 *   npm run test:e2e:ui       → UI interativa do Playwright
 *
 * O servidor precisa estar rodando em http://localhost:3000 antes de executar.
 * Para iniciar: PORT=3000 npm run dev
 *
 * navigationTimeout: 90 s — cobre a compilação inicial do Next.js em dev mode.
 * actionTimeout: 15 s    — tempo para localizar e interagir com elementos.
 */
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,       // sequencial dentro do arquivo; evita competição pelo servidor dev
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  // worker único: admin.spec.ts roda antes de blog.spec.ts (ordem alfabética).
  // Os testes de artigo individual dependem dos posts criados pelo admin.
  workers: 1,
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    baseURL: 'http://localhost:3000',
    navigationTimeout: 90_000,  // Next.js dev pode demorar na primeira compilação
    actionTimeout: 15_000,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
})
