import fs from 'fs'
import path from 'path'

const root = path.resolve(__dirname, '../../..')
const blog = (p: string) => path.join(root, 'src/app/(site)/blog', p)
const comp = (p: string) => path.join(root, 'src/components/blog', p)
const lib = (p: string) => path.join(root, 'src/lib', p)

describe('M04 — Blog público', () => {
  describe('API helper (src/lib/api.ts)', () => {
    let c: string
    beforeAll(() => { c = fs.readFileSync(lib('api.ts'), 'utf-8') })

    it('arquivo existe', () => expect(fs.existsSync(lib('api.ts'))).toBe(true))
    it('exporta getPosts', () => expect(c).toContain('getPosts'))
    it('exporta getPostBySlug', () => expect(c).toContain('getPostBySlug'))
    it('exporta getCategories', () => expect(c).toContain('getCategories'))
    it('usa Payload local API (getPayload)', () => expect(c).toContain('getPayload'))
    it('filtra posts com status published', () => expect(c).toContain('published'))
    it('suporta paginação (limit/page)', () => expect(c).toContain('limit'))
  })

  describe('PostCard', () => {
    let c: string
    beforeAll(() => { c = fs.readFileSync(comp('PostCard.tsx'), 'utf-8') })

    it('arquivo existe', () => expect(fs.existsSync(comp('PostCard.tsx'))).toBe(true))
    it('exporta PostCard como named export', () => expect(c).toContain('export function PostCard'))
    it('tem pill de categoria', () => expect(c).toContain('category') || expect(c).toContain('cat'))
    it('tem data do post', () => expect(c).toContain('publishedAt'))
    it('tem título do post', () => expect(c).toContain('title'))
    it('tem excerpt', () => expect(c).toContain('excerpt'))
    it('tem "Ler mais"', () => expect(c).toContain('Ler mais'))
    it('usa next/image para a capa', () => expect(c).toContain("from 'next/image'"))
    it('link aponta para /blog/[slug]', () => expect(c).toContain('/blog/'))
    it('tem hover elevation', () => expect(c).toContain('hover:-translate-y') || expect(c).toContain('hover:shadow'))
  })

  describe('SearchBar', () => {
    let c: string
    beforeAll(() => { c = fs.readFileSync(comp('SearchBar.tsx'), 'utf-8') })

    it('arquivo existe', () => expect(fs.existsSync(comp('SearchBar.tsx'))).toBe(true))
    it("é 'use client'", () => expect(c).toContain("'use client'"))
    it('tem input de busca', () => expect(c).toContain('<input'))
    it('tem ícone de lupa (SVG)', () => expect(c).toContain('<svg') || expect(c).toContain('search'))
    it('usa useRouter ou router.push', () => expect(c).toContain('router'))
    it('atualiza URL via searchParams', () => expect(c).toContain('searchParams') || expect(c).toContain('URLSearchParams'))
    it('exporta SearchBar como named export', () => expect(c).toContain('export function SearchBar'))
  })

  describe('CategoryPills', () => {
    let c: string
    beforeAll(() => { c = fs.readFileSync(comp('CategoryPills.tsx'), 'utf-8') })

    it('arquivo existe', () => expect(fs.existsSync(comp('CategoryPills.tsx'))).toBe(true))
    it("é 'use client'", () => expect(c).toContain("'use client'"))
    it('tem botões de pill', () => expect(c).toContain('<button'))
    it('tem estilo de pill ativo vs inativo', () => expect(c).toContain('active') || expect(c).toContain('selected') || expect(c).toContain('Todas'))
    it('exporta CategoryPills como named export', () => expect(c).toContain('export function CategoryPills'))
    it('usa router para navegar', () => expect(c).toContain('router') || expect(c).toContain('push'))
  })

  describe('RichTextRenderer', () => {
    let c: string
    beforeAll(() => { c = fs.readFileSync(comp('RichTextRenderer.tsx'), 'utf-8') })

    it('arquivo existe', () => expect(fs.existsSync(comp('RichTextRenderer.tsx'))).toBe(true))
    it('exporta RichTextRenderer', () => expect(c).toContain('export function RichTextRenderer'))
    it('recebe prop content', () => expect(c).toContain('content'))
  })

  describe('Página Blog (listagem)', () => {
    let c: string
    beforeAll(() => { c = fs.readFileSync(blog('page.tsx'), 'utf-8') })

    it('arquivo existe', () => expect(fs.existsSync(blog('page.tsx'))).toBe(true))
    it('importa SearchBar', () => expect(c).toContain('SearchBar'))
    it('importa CategoryPills', () => expect(c).toContain('CategoryPills'))
    it('importa PostCard', () => expect(c).toContain('PostCard'))
    it('usa searchParams', () => expect(c).toContain('searchParams'))
    it('tem estado vazio (Nenhum artigo)', () => expect(c).toContain('Nenhum artigo'))
    it('tem header da página (fundo mint)', () => expect(c).toContain('BDE4DA') || expect(c).toContain('mint'))
    it('tem paginação', () => expect(c).toContain('page') && (expect(c).toContain('Anterior') || expect(c).toContain('Próxima')))
    it('tem generateMetadata ou export const metadata', () => expect(c).toMatch(/generateMetadata|export const metadata/))
  })

  describe('Página Artigo ([slug])', () => {
    let c: string
    beforeAll(() => { c = fs.readFileSync(blog('[slug]/page.tsx'), 'utf-8') })

    it('arquivo existe', () => expect(fs.existsSync(blog('[slug]/page.tsx'))).toBe(true))
    it('tem generateMetadata dinâmica', () => expect(c).toContain('generateMetadata'))
    it('tem generateStaticParams', () => expect(c).toContain('generateStaticParams'))
    it('tem breadcrumb com Home › Blog', () => expect(c).toContain('Home') && expect(c).toContain('/blog'))
    it('tem hero com capa e título sobreposto', () => expect(c).toContain('coverImage') || expect(c).toContain('cover'))
    it('tem renderizador de conteúdo rich text', () => expect(c).toContain('RichText') || expect(c).toContain('content'))
    it('tem CTA de contato', () => expect(c).toContain('/contato'))
    it('tem navegação entre artigos (anterior/próximo)', () => expect(c).toContain('anterior') || expect(c).toContain('Próximo'))
    it('renderiza not-found para slug inválido', () => expect(c).toContain('notFound'))
  })
})
