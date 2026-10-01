import sitemap from '@/app/sitemap'
import { getPosts } from '@/lib/api'

jest.mock('@/lib/api', () => ({
  getPosts: jest.fn().mockResolvedValue({ docs: [] }),
  getCategories: jest.fn().mockResolvedValue([]),
}))

describe('M08 — descoberta da landing', () => {
  it('inclui a landing no sitemap sem remover as páginas institucionais', async () => {
    const entries = await sitemap()
    const paths = entries.map(entry => new URL(entry.url).pathname)
    expect(paths).toEqual(expect.arrayContaining([
      '/', '/sobre', '/escritorio', '/servicos', '/blog', '/contato', '/previdencia-no-exterior',
    ]))
  })

  it('mantém a landing acessível ao buscador mesmo quando o CMS está indisponível', async () => {
    jest.mocked(getPosts).mockRejectedValueOnce(new Error('CMS indisponível'))
    const entries = await sitemap()
    expect(entries.some(entry => new URL(entry.url).pathname === '/previdencia-no-exterior')).toBe(true)
  })
})
