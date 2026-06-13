import fs from 'fs'
import path from 'path'

const root = path.resolve(__dirname, '../../..')

describe('M01 — Infrastructure', () => {
  describe('package.json', () => {
    let pkg: Record<string, unknown>

    beforeAll(() => {
      pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf-8'))
    })

    it('deve existir na raiz', () => {
      expect(fs.existsSync(path.join(root, 'package.json'))).toBe(true)
    })

    it('deve ter next 15.x como dependência', () => {
      const deps = pkg.dependencies as Record<string, string>
      expect(deps?.next).toMatch(/15\./)
    })

    it('deve ter payload como dependência', () => {
      const deps = pkg.dependencies as Record<string, string>
      expect(deps?.payload).toBeDefined()
    })

    it('deve ter @payloadcms/db-postgres como dependência', () => {
      const deps = pkg.dependencies as Record<string, string>
      expect(deps?.['@payloadcms/db-postgres']).toBeDefined()
    })

    it('deve ter @payloadcms/richtext-lexical como dependência', () => {
      const deps = pkg.dependencies as Record<string, string>
      expect(deps?.['@payloadcms/richtext-lexical']).toBeDefined()
    })

    it('deve ter tailwindcss como devDependência', () => {
      const dev = pkg.devDependencies as Record<string, string>
      expect(dev?.tailwindcss).toBeDefined()
    })

    it('deve ter typescript como devDependência', () => {
      const dev = pkg.devDependencies as Record<string, string>
      expect(dev?.typescript).toBeDefined()
    })
  })

  describe('.env.example', () => {
    let content: string

    beforeAll(() => {
      content = fs.readFileSync(path.join(root, '.env.example'), 'utf-8')
    })

    it('deve existir na raiz', () => {
      expect(fs.existsSync(path.join(root, '.env.example'))).toBe(true)
    })

    it('deve documentar DATABASE_URI', () => {
      expect(content).toContain('DATABASE_URI')
    })

    it('deve documentar PAYLOAD_SECRET', () => {
      expect(content).toContain('PAYLOAD_SECRET')
    })

    it('deve documentar RESEND_API_KEY', () => {
      expect(content).toContain('RESEND_API_KEY')
    })

    it('deve documentar CONTACT_EMAIL_TO', () => {
      expect(content).toContain('CONTACT_EMAIL_TO')
    })
  })

  describe('Configuração Next.js', () => {
    it('next.config.mjs deve existir', () => {
      expect(fs.existsSync(path.join(root, 'next.config.mjs'))).toBe(true)
    })

    it('next.config.mjs deve referenciar withPayload', () => {
      const content = fs.readFileSync(path.join(root, 'next.config.mjs'), 'utf-8')
      expect(content).toContain('withPayload')
    })

    it('tailwind.config.ts deve existir', () => {
      expect(fs.existsSync(path.join(root, 'tailwind.config.ts'))).toBe(true)
    })

    it('tailwind.config.ts deve mapear cores VVM', () => {
      const content = fs.readFileSync(path.join(root, 'tailwind.config.ts'), 'utf-8')
      expect(content).toContain('#3D5C5F')
      expect(content).toContain('#BDE4DA')
    })

    it('postcss.config.js deve existir', () => {
      expect(fs.existsSync(path.join(root, 'postcss.config.js'))).toBe(true)
    })

    it('tsconfig.json deve existir', () => {
      expect(fs.existsSync(path.join(root, 'tsconfig.json'))).toBe(true)
    })

    it('tsconfig.json deve ter alias @payload-config', () => {
      const tsconfig = JSON.parse(fs.readFileSync(path.join(root, 'tsconfig.json'), 'utf-8'))
      const paths = tsconfig?.compilerOptions?.paths
      expect(paths?.['@payload-config']).toBeDefined()
    })
  })

  describe('Payload CMS', () => {
    it('payload.config.ts deve existir', () => {
      expect(fs.existsSync(path.join(root, 'payload.config.ts'))).toBe(true)
    })

    it('payload.config.ts deve configurar db-postgres', () => {
      const content = fs.readFileSync(path.join(root, 'payload.config.ts'), 'utf-8')
      expect(content).toContain('postgresAdapter')
      expect(content).toContain('DATABASE_URI')
    })

    it('payload.config.ts deve usar lexicalEditor', () => {
      const content = fs.readFileSync(path.join(root, 'payload.config.ts'), 'utf-8')
      expect(content).toContain('lexicalEditor')
    })

    it('payload.config.ts deve referenciar PAYLOAD_SECRET', () => {
      const content = fs.readFileSync(path.join(root, 'payload.config.ts'), 'utf-8')
      expect(content).toContain('PAYLOAD_SECRET')
    })

    it('coleção Users deve existir', () => {
      expect(fs.existsSync(path.join(root, 'src/collections/Users.ts'))).toBe(true)
    })

    it('coleção Users deve habilitar auth', () => {
      const content = fs.readFileSync(path.join(root, 'src/collections/Users.ts'), 'utf-8')
      expect(content).toContain('auth')
    })
  })

  describe('Estrutura App Router', () => {
    it('root layout do site deve existir (via route group)', () => {
      expect(fs.existsSync(path.join(root, 'src/app/(site)/layout.tsx'))).toBe(true)
    })

    it('src/app/(site)/page.tsx deve existir (home via route group)', () => {
      expect(fs.existsSync(path.join(root, 'src/app/(site)/page.tsx'))).toBe(true)
    })

    it('src/app/globals.css deve existir com diretivas Tailwind', () => {
      const file = path.join(root, 'src/app/globals.css')
      expect(fs.existsSync(file)).toBe(true)
      const content = fs.readFileSync(file, 'utf-8')
      expect(content).toContain('@tailwind')
    })

    it('rota Payload admin deve existir', () => {
      const file = path.join(
        root,
        'src/app/(payload)/admin/[[...segments]]/page.tsx',
      )
      expect(fs.existsSync(file)).toBe(true)
    })

    it('rota Payload API deve existir', () => {
      const file = path.join(root, 'src/app/(payload)/api/[...slug]/route.ts')
      expect(fs.existsSync(file)).toBe(true)
    })

    it('importMap do Payload admin deve existir', () => {
      const file = path.join(root, 'src/app/(payload)/admin/importMap.js')
      expect(fs.existsSync(file)).toBe(true)
    })
  })
})
