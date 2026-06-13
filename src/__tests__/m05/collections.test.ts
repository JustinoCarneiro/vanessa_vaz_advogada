import fs from 'fs'
import path from 'path'

const root = path.resolve(__dirname, '../../..')
const col = (name: string) => path.join(root, 'src/collections', name)

describe('M05 — Coleções Payload', () => {
  // ────────────────────────────────────────────────────────────
  // Posts
  // ────────────────────────────────────────────────────────────
  describe('Posts', () => {
    let content: string

    beforeAll(() => {
      content = fs.readFileSync(col('Posts.ts'), 'utf-8')
    })

    it('arquivo existe', () => {
      expect(fs.existsSync(col('Posts.ts'))).toBe(true)
    })

    it("slug é 'posts'", () => {
      expect(content).toContain("slug: 'posts'")
    })

    it('tem campo title obrigatório', () => {
      expect(content).toContain("name: 'title'")
      expect(content).toContain('required: true')
    })

    it('tem campo slug com unique e index', () => {
      expect(content).toContain("name: 'slug'")
      expect(content).toContain('unique: true')
      expect(content).toContain('index: true')
    })

    it('tem campo status com opções draft e published', () => {
      expect(content).toContain("name: 'status'")
      expect(content).toContain('draft')
      expect(content).toContain('published')
    })

    it('tem campo category como relationship', () => {
      expect(content).toContain("name: 'category'")
      expect(content).toContain("type: 'relationship'")
      expect(content).toContain("'categories'")
    })

    it('tem campo coverImage como upload', () => {
      expect(content).toContain("name: 'coverImage'")
      expect(content).toContain("type: 'upload'")
      expect(content).toContain("'media'")
    })

    it('tem campo excerpt', () => {
      expect(content).toContain("name: 'excerpt'")
    })

    it('tem campo content como richText', () => {
      expect(content).toContain("name: 'content'")
      expect(content).toContain("type: 'richText'")
    })

    it('tem campo meta como group', () => {
      expect(content).toContain("name: 'meta'")
      expect(content).toContain("type: 'group'")
    })

    it('tem campo publishedAt como date', () => {
      expect(content).toContain("name: 'publishedAt'")
      expect(content).toContain("type: 'date'")
    })

    it('tem controle de acesso read que restringe publicados', () => {
      expect(content).toContain('access')
      expect(content).toContain('published')
    })
  })

  // ────────────────────────────────────────────────────────────
  // Categories
  // ────────────────────────────────────────────────────────────
  describe('Categories', () => {
    let content: string

    beforeAll(() => {
      content = fs.readFileSync(col('Categories.ts'), 'utf-8')
    })

    it('arquivo existe', () => {
      expect(fs.existsSync(col('Categories.ts'))).toBe(true)
    })

    it("slug é 'categories'", () => {
      expect(content).toContain("slug: 'categories'")
    })

    it('tem campo name obrigatório', () => {
      expect(content).toContain("name: 'name'")
      expect(content).toContain('required: true')
    })

    it('tem campo slug com unique', () => {
      expect(content).toContain("name: 'slug'")
      expect(content).toContain('unique: true')
    })

    it('tem campo description como textarea', () => {
      expect(content).toContain("name: 'description'")
      expect(content).toContain("type: 'textarea'")
    })
  })

  // ────────────────────────────────────────────────────────────
  // ContactMessages
  // ────────────────────────────────────────────────────────────
  describe('ContactMessages', () => {
    let content: string

    beforeAll(() => {
      content = fs.readFileSync(col('ContactMessages.ts'), 'utf-8')
    })

    it('arquivo existe', () => {
      expect(fs.existsSync(col('ContactMessages.ts'))).toBe(true)
    })

    it("slug é 'contact-messages'", () => {
      expect(content).toContain("slug: 'contact-messages'")
    })

    it('tem campo name obrigatório', () => {
      expect(content).toContain("name: 'name'")
      expect(content).toContain('required: true')
    })

    it('tem campo email do tipo email', () => {
      expect(content).toContain("name: 'email'")
      expect(content).toContain("type: 'email'")
    })

    it('tem campo phone opcional', () => {
      expect(content).toContain("name: 'phone'")
    })

    it('tem campo subject obrigatório', () => {
      expect(content).toContain("name: 'subject'")
    })

    it('tem campo message obrigatório', () => {
      expect(content).toContain("name: 'message'")
    })

    it('tem campo read como checkbox com defaultValue false', () => {
      expect(content).toContain("name: 'read'")
      expect(content).toContain("type: 'checkbox'")
      expect(content).toContain('defaultValue: false')
    })

    it('acesso create é público', () => {
      expect(content).toContain('create')
      expect(content).toContain('true')
    })

    it('acesso read é restrito a admin', () => {
      expect(content).toContain('read')
      expect(content).toContain('user')
    })
  })

  // ────────────────────────────────────────────────────────────
  // Media
  // ────────────────────────────────────────────────────────────
  describe('Media', () => {
    let content: string

    beforeAll(() => {
      content = fs.readFileSync(col('Media.ts'), 'utf-8')
    })

    it('arquivo existe', () => {
      expect(fs.existsSync(col('Media.ts'))).toBe(true)
    })

    it("slug é 'media'", () => {
      expect(content).toContain("slug: 'media'")
    })

    it('tem configuração de upload', () => {
      expect(content).toContain('upload')
    })

    it('restringe mimeTypes a imagens', () => {
      expect(content).toContain('image/')
    })

    it('tem campo alt obrigatório', () => {
      expect(content).toContain("name: 'alt'")
      expect(content).toContain('required: true')
    })
  })

  // ────────────────────────────────────────────────────────────
  // payload.config.ts integra todas as coleções
  // ────────────────────────────────────────────────────────────
  describe('payload.config.ts', () => {
    let content: string

    beforeAll(() => {
      content = fs.readFileSync(path.join(root, 'payload.config.ts'), 'utf-8')
    })

    it('importa Posts', () => {
      expect(content).toContain('Posts')
    })

    it('importa Categories', () => {
      expect(content).toContain('Categories')
    })

    it('importa ContactMessages', () => {
      expect(content).toContain('ContactMessages')
    })

    it('importa Media', () => {
      expect(content).toContain('Media')
    })

    it('inclui todas as coleções no array collections', () => {
      const collectionsBlock = content.match(/collections:\s*\[([^\]]+)\]/s)?.[1] ?? ''
      expect(collectionsBlock).toContain('Users')
      expect(collectionsBlock).toContain('Posts')
      expect(collectionsBlock).toContain('Categories')
      expect(collectionsBlock).toContain('ContactMessages')
      expect(collectionsBlock).toContain('Media')
    })
  })
})
