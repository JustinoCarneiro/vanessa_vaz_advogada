import fs from 'fs'
import path from 'path'

const root = path.resolve(__dirname, '../../..')
const r = (p: string) => path.join(root, p)

describe('M07 — SEO estrutural', () => {
  describe('sitemap.ts', () => {
    let c: string
    beforeAll(() => { c = fs.readFileSync(r('src/app/sitemap.ts'), 'utf-8') })

    it('arquivo existe', () => expect(fs.existsSync(r('src/app/sitemap.ts'))).toBe(true))
    it('exporta função default', () => expect(c).toContain('export default'))
    it('usa NEXT_PUBLIC_SERVER_URL', () => expect(c).toContain('NEXT_PUBLIC_SERVER_URL'))
    it('inclui página raiz (home)', () => expect(c).toContain('${baseUrl}'))
    it('inclui /sobre', () => expect(c).toContain('/sobre'))
    it('inclui /escritorio', () => expect(c).toContain('/escritorio'))
    it('inclui /servicos', () => expect(c).toContain('/servicos'))
    it('inclui /blog', () => expect(c).toContain('/blog'))
    it('inclui /contato', () => expect(c).toContain('/contato'))
    it('busca posts publicados dinamicamente', () => expect(c).toContain('getPosts'))
    it('tem priority para páginas', () => expect(c).toContain('priority'))
    it('tem lastModified', () => expect(c).toContain('lastModified'))
  })

  describe('robots.ts', () => {
    let c: string
    beforeAll(() => { c = fs.readFileSync(r('src/app/robots.ts'), 'utf-8') })

    it('arquivo existe', () => expect(fs.existsSync(r('src/app/robots.ts'))).toBe(true))
    it('exporta função default', () => expect(c).toContain('export default'))
    it('bloqueia /api/', () => expect(c).toContain('/api/'))
    it('bloqueia /admin/', () => expect(c).toContain('/admin/'))
    it('permite / (raiz)', () => expect(c).toContain("allow: '/'"))
    it('aponta para sitemap.xml', () => expect(c).toContain('sitemap.xml'))
    it('usa NEXT_PUBLIC_SERVER_URL', () => expect(c).toContain('NEXT_PUBLIC_SERVER_URL'))
  })

  describe('Root layout (metadata global)', () => {
    let c: string
    beforeAll(() => { c = fs.readFileSync(r('src/app/(site)/layout.tsx'), 'utf-8') })

    it('tem metadataBase', () => expect(c).toContain('metadataBase'))
    it('tem openGraph', () => expect(c).toContain('openGraph'))
    it('tem twitter card', () => expect(c).toContain('twitter'))
    it('tem locale pt_BR', () => expect(c).toContain('pt_BR'))
    it('tem robots index,follow', () => expect(c.includes('index') && c.includes('follow')).toBe(true))
    it('tem lang="pt-BR" no html', () => expect(c).toContain('pt-BR'))
    it('tem keywords previdenciárias', () => expect(c).toContain('previdenci'))
  })

  describe('JsonLd (componente Schema.org)', () => {
    let c: string
    beforeAll(() => { c = fs.readFileSync(r('src/components/seo/JsonLd.tsx'), 'utf-8') })

    it('arquivo existe', () => expect(fs.existsSync(r('src/components/seo/JsonLd.tsx'))).toBe(true))
    it('exporta JsonLd como named export', () => expect(c).toContain('export function JsonLd'))
    it('usa type application/ld+json', () => expect(c).toContain('application/ld+json'))
    it('usa dangerouslySetInnerHTML', () => expect(c).toContain('dangerouslySetInnerHTML'))
    it('serializa o schema com JSON.stringify', () => expect(c).toContain('JSON.stringify'))
    it('recebe prop schema', () => expect(c).toContain('schema'))
  })

  describe('Schema.org — Home (LegalService)', () => {
    let c: string
    beforeAll(() => { c = fs.readFileSync(r('src/app/(site)/page.tsx'), 'utf-8') })

    it('importa JsonLd', () => expect(c).toContain('JsonLd'))
    it('tem schema @type LegalService ou LocalBusiness', () => expect(c).toMatch(/LegalService|LocalBusiness/))
    it('tem name da advogada/escritório', () => expect(c).toContain('Vanessa Vaz'))
    it('tem url da propriedade', () => expect(c).toContain('@context'))
    it('tem telephone ou email de contato', () => expect(c).toMatch(/telephone|email/))
  })

  describe('Schema.org — Artigo (Article)', () => {
    let c: string
    beforeAll(() => { c = fs.readFileSync(r('src/app/(site)/blog/[slug]/page.tsx'), 'utf-8') })

    it('importa JsonLd', () => expect(c).toContain('JsonLd'))
    it('tem schema @type Article ou BlogPosting', () => expect(c).toMatch(/Article|BlogPosting/))
    it('tem headline do artigo', () => expect(c).toContain('headline'))
    it('tem author com name Vanessa', () => expect(c.includes('author') && c.includes('Vanessa')).toBe(true))
    it('tem datePublished', () => expect(c).toContain('datePublished'))
    it('tem @context schema.org', () => expect(c).toContain('schema.org'))
  })

  describe('SEO — todas as páginas institucionais têm generateMetadata', () => {
    const pages = [
      'src/app/(site)/sobre/page.tsx',
      'src/app/(site)/escritorio/page.tsx',
      'src/app/(site)/servicos/page.tsx',
      'src/app/(site)/contato/page.tsx',
      'src/app/(site)/blog/[slug]/page.tsx',
    ]

    pages.forEach((p) => {
      it(`${p.replace('src/app/(site)/', '')} tem generateMetadata`, () => {
        const c = fs.readFileSync(r(p), 'utf-8')
        expect(c).toContain('generateMetadata')
      })
    })
  })
})
