import fs from 'fs'
import path from 'path'

const root = path.resolve(__dirname, '../../..')
const ui = (f: string) => path.join(root, 'src/components/ui', f)
const layout = (f: string) => path.join(root, 'src/components/layout', f)

describe('M02 — Componentes base', () => {
  describe('Existência dos arquivos', () => {
    it('Button.tsx existe', () => expect(fs.existsSync(ui('Button.tsx'))).toBe(true))
    it('Logo.tsx existe', () => expect(fs.existsSync(ui('Logo.tsx'))).toBe(true))
    it('Container.tsx existe', () => expect(fs.existsSync(ui('Container.tsx'))).toBe(true))
    it('SectionTitle.tsx existe', () => expect(fs.existsSync(ui('SectionTitle.tsx'))).toBe(true))
    it('NavBar.tsx existe', () => expect(fs.existsSync(layout('NavBar.tsx'))).toBe(true))
    it('Footer.tsx existe', () => expect(fs.existsSync(layout('Footer.tsx'))).toBe(true))
  })

  describe('Button', () => {
    let c: string
    beforeAll(() => { c = fs.readFileSync(ui('Button.tsx'), 'utf-8') })

    it('aceita variante primary', () => expect(c).toContain('primary'))
    it('aceita variante secondary', () => expect(c).toContain('secondary'))
    it('aceita variante ghost', () => expect(c).toContain('ghost'))
    it('usa cor teal-dark (#3D5C5F) no primary', () => expect(c).toContain('#3D5C5F'))
    it('usa cor mint (#BDE4DA) no hover secondary', () => expect(c).toContain('#BDE4DA'))
    it('exporta Button como named export', () => expect(c).toContain('export function Button'))
  })

  describe('Logo', () => {
    let c: string
    beforeAll(() => { c = fs.readFileSync(ui('Logo.tsx'), 'utf-8') })

    it("aceita variante 'dourado'", () => expect(c).toContain('dourado'))
    it("aceita variante 'branco'", () => expect(c).toContain('branco'))
    it('usa next/image', () => expect(c).toContain("from 'next/image'"))
    it('mapeia logo-dourado.png', () => expect(c).toContain('logo-dourado'))
    it('mapeia logo-teal.png', () => expect(c).toContain('logo-teal'))
    it('exporta Logo como named export', () => expect(c).toContain('export function Logo'))
  })

  describe('Container', () => {
    let c: string
    beforeAll(() => { c = fs.readFileSync(ui('Container.tsx'), 'utf-8') })

    it('tem classe max-w para largura máxima', () => expect(c).toContain('max-w'))
    it('tem mx-auto para centralizar', () => expect(c).toContain('mx-auto'))
    it('tem padding horizontal responsivo', () => expect(c).toContain('px-'))
    it('exporta Container como named export', () => expect(c).toContain('export function Container'))
  })

  describe('SectionTitle', () => {
    let c: string
    beforeAll(() => { c = fs.readFileSync(ui('SectionTitle.tsx'), 'utf-8') })

    it('tem prop overline (label acima do título)', () => expect(c).toContain('overline'))
    it('usa fonte display para o h2', () => expect(c).toContain('font-display'))
    it('usa cor teal-dark para overline', () => expect(c).toContain('#3D5C5F'))
    it('suporta alinhamento center', () => expect(c).toContain('center'))
    it('exporta SectionTitle como named export', () => expect(c).toContain('export function SectionTitle'))
  })

  describe('NavBar', () => {
    let c: string
    beforeAll(() => { c = fs.readFileSync(layout('NavBar.tsx'), 'utf-8') })

    it("link 'Sobre' presente", () => expect(c).toContain('Sobre'))
    it("link 'Escritório' presente", () => expect(c).toContain('Escritório'))
    it("link 'Serviços' presente", () => expect(c).toContain('Serviços'))
    it("link 'Blog' presente", () => expect(c).toContain('Blog'))
    it("link 'Fale Comigo' presente", () => expect(c).toContain('Fale Comigo'))
    it('tem menu hamburguer mobile', () => expect(c).toContain('menu'))
    it('usa fundo teal-dark (#3D5C5F)', () => expect(c).toContain('#3D5C5F'))
    it('usa next/link', () => expect(c).toContain("from 'next/link'"))
    it('usa Logo component', () => expect(c).toContain('Logo'))
    it('é client component', () => expect(c).toContain("'use client'"))
    it('exporta NavBar como named export', () => expect(c).toContain('export function NavBar'))
  })

  describe('Footer', () => {
    let c: string
    beforeAll(() => { c = fs.readFileSync(layout('Footer.tsx'), 'utf-8') })

    it('tem placeholder OAB/SC', () => expect(c).toContain('OAB'))
    it("link 'Sobre' presente", () => expect(c).toContain('Sobre'))
    it('tem email de contato atualizado', () => expect(c).toContain('vazvanessamarschallinger@gmail.com'))
    it('usa fundo teal-dark (#3D5C5F)', () => expect(c).toContain('#3D5C5F'))
    it('usa next/link', () => expect(c).toContain("from 'next/link'"))
    it('usa Logo component', () => expect(c).toContain('Logo'))
    it('tem ícone Instagram', () => expect(c).toContain('Instagram'))
    it('tem ícone LinkedIn', () => expect(c).toContain('LinkedIn'))
    it('exporta Footer como named export', () => expect(c).toContain('export function Footer'))
  })

  describe('layout.tsx — fonts', () => {
    let c: string
    beforeAll(() => {
      c = fs.readFileSync(path.join(root, 'src/app/(site)/layout.tsx'), 'utf-8')
    })

    it('carrega Montserrat via next/font', () => expect(c).toContain('Montserrat'))
    it('carrega Cormorant_Garamond via next/font', () => expect(c).toContain('Cormorant_Garamond'))
    it('define --font-body como CSS var', () => expect(c).toContain('--font-body'))
    it('define --font-display como CSS var', () => expect(c).toContain('--font-display'))
  })
})
