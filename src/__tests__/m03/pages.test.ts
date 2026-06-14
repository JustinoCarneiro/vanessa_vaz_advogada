import fs from 'fs'
import path from 'path'

const root = path.resolve(__dirname, '../../..')
const site = (p: string) => path.join(root, 'src/app/(site)', p)
const comp = (p: string) => path.join(root, 'src/components', p)

describe('M03 — Páginas institucionais', () => {
  describe('Layout público (site)', () => {
    let c: string
    beforeAll(() => { c = fs.readFileSync(site('layout.tsx'), 'utf-8') })

    it('(site)/layout.tsx existe', () => expect(fs.existsSync(site('layout.tsx'))).toBe(true))
    it('importa NavBar', () => expect(c).toContain('NavBar'))
    it('importa Footer', () => expect(c).toContain('Footer'))
    it('renderiza children entre NavBar e Footer', () => expect(c).toContain('children'))
  })

  describe('Home — page.tsx', () => {
    let c: string
    beforeAll(() => { c = fs.readFileSync(site('page.tsx'), 'utf-8') })

    it('(site)/page.tsx existe', () => expect(fs.existsSync(site('page.tsx'))).toBe(true))
    it('usa HeroCarousel', () => expect(c).toContain('HeroCarousel'))
    it('tem seção Quem é Vanessa', () => expect(c).toContain('Vanessa'))
    it('tem seção Áreas de atuação', () => expect(c).toContain('atuação'))
    it('tem seção CTA', () => expect(c).toContain('CtaSection'))
    it('tem seção Brasileiros no Exterior', () => expect(c).toContain('ExteriorSection'))
    it('tem preview do Blog', () => expect(c.includes('Blog') || c.includes('publicações')).toBe(true))
  })

  describe('HeroCarousel', () => {
    let c: string
    beforeAll(() => { c = fs.readFileSync(comp('home/HeroCarousel.tsx'), 'utf-8') })

    it('arquivo existe', () => expect(fs.existsSync(comp('home/HeroCarousel.tsx'))).toBe(true))
    it("é 'use client'", () => expect(c).toContain("'use client'"))
    it('usa next/image', () => expect(c).toContain("from 'next/image'"))
    it('tem autoplay com setTimeout ou setInterval', () => expect(c.includes('setInterval') || c.includes('setTimeout')).toBe(true))
    it('limpa o timer no unmount', () => expect(c.includes('clearInterval') || c.includes('clearTimeout')).toBe(true))
    it('tem navegação por dots', () => expect(c.includes('dot-nav') || c.includes('tablist')).toBe(true))
    it('tem CTA Fale Comigo', () => expect(c.includes('Fale Comigo') || c.includes('/contato')).toBe(true))
    it('tem 3 slides configurados', () => {
      const imgMatches = c.match(/unsplash\.com/g) ?? []
      expect(imgMatches.length).toBeGreaterThanOrEqual(3)
    })
  })

  describe('ServiceCard', () => {
    let c: string
    beforeAll(() => { c = fs.readFileSync(comp('home/ServiceCard.tsx'), 'utf-8') })

    it('arquivo existe', () => expect(fs.existsSync(comp('home/ServiceCard.tsx'))).toBe(true))
    it('tem prop icon', () => expect(c).toContain('icon'))
    it('tem prop title', () => expect(c).toContain('title'))
    it('tem prop description', () => expect(c).toContain('description'))
    it('exporta ServiceCard como named export', () => expect(c).toContain('export function ServiceCard'))
    it('tem hover elevação', () => expect(c).toContain('hover:-translate-y'))
  })

  describe('CtaSection', () => {
    let c: string
    beforeAll(() => { c = fs.readFileSync(comp('home/CtaSection.tsx'), 'utf-8') })

    it('arquivo existe', () => expect(fs.existsSync(comp('home/CtaSection.tsx'))).toBe(true))
    it('usa fundo teal-dark (#3D5C5F)', () => expect(c).toContain('#3D5C5F'))
    it('tem CTA de agendamento', () => expect(c.includes('Agendar') || c.includes('contato')).toBe(true))
    it('exporta CtaSection como named export', () => expect(c).toContain('export function CtaSection'))
  })

  describe('Página Sobre', () => {
    let c: string
    beforeAll(() => { c = fs.readFileSync(site('sobre/page.tsx'), 'utf-8') })

    it('arquivo existe', () => expect(fs.existsSync(site('sobre/page.tsx'))).toBe(true))
    it('tem nome Vanessa Vaz Marschallinger', () => expect(c).toContain('Vanessa Vaz Marschallinger'))
    it('tem OAB/SC', () => expect(c).toContain('OAB'))
    it('tem citação de filosofia', () => expect(c.includes('processo') || c.includes('advogo')).toBe(true))
    it('tem linha do tempo (trajetória)', () => expect(c.includes('2014') || c.includes('Trajetória')).toBe(true))
    it('tem seção CTA de contato', () => expect(c.includes('contato') || c.includes('Agendar')).toBe(true))
    it('tem generateMetadata', () => expect(c).toContain('generateMetadata'))
  })

  describe('Página Escritório', () => {
    let c: string
    beforeAll(() => { c = fs.readFileSync(site('escritorio/page.tsx'), 'utf-8') })

    it('arquivo existe', () => expect(fs.existsSync(site('escritorio/page.tsx'))).toBe(true))
    it('tem texto da missão', () => expect(c.includes('missão') || c.includes('Missão') || c.includes('INSS')).toBe(true))
    it('tem valores Clareza, Compromisso, Acolhimento', () => {
      expect(c).toContain('Clareza')
      expect(c).toContain('Compromisso')
      expect(c).toContain('Acolhimento')
    })
    it('tem diferenciais do escritório', () => expect(c.includes('Diferenciais') || c.includes('previdenciária')).toBe(true))
    it('tem generateMetadata', () => expect(c).toContain('generateMetadata'))
  })

  describe('Página Serviços', () => {
    let c: string
    beforeAll(() => { c = fs.readFileSync(site('servicos/page.tsx'), 'utf-8') })

    it('arquivo existe', () => expect(fs.existsSync(site('servicos/page.tsx'))).toBe(true))
    it('tem Aposentadorias', () => expect(c).toContain('Aposentadoria'))
    it('tem BPC/LOAS', () => expect(c.includes('BPC') || c.includes('LOAS')).toBe(true))
    it('tem Pensão por Morte', () => expect(c.toLowerCase()).toContain('pensão'))
    it('tem Revisão de Benefícios', () => expect(c.toLowerCase()).toContain('revisão'))
    it('tem CTA individual por serviço', () => expect(c.includes('Fale') || c.includes('caso')).toBe(true))
    it('tem generateMetadata', () => expect(c).toContain('generateMetadata'))
  })

  describe('Página Contato (shell)', () => {
    let c: string
    beforeAll(() => { c = fs.readFileSync(site('contato/page.tsx'), 'utf-8') })

    it('arquivo existe', () => expect(fs.existsSync(site('contato/page.tsx'))).toBe(true))
    it('tem título da página', () => expect(c.includes('Contato') || c.includes('contato')).toBe(true))
    it('tem email de contato', () => expect(c).toContain('vazvanessamarschallinger@gmail.com'))
    it('tem ContactForm (formulário M06 implementado)', () => expect(c).toContain('ContactForm'))
    it('tem generateMetadata', () => expect(c).toContain('generateMetadata'))
  })

  describe('Página Brasileiros no Exterior', () => {
    let c: string
    beforeAll(() => { c = fs.readFileSync(site('brasileiros-no-exterior/page.tsx'), 'utf-8') })

    it('arquivo existe', () => expect(fs.existsSync(site('brasileiros-no-exterior/page.tsx'))).toBe(true))
    it('tem generateMetadata para SEO', () => expect(c).toContain('generateMetadata'))
    it('menciona Acordos Internacionais', () => expect(c.includes('Acordos') || c.includes('Internacionais')).toBe(true))
    it('possui a CtaSection', () => expect(c).toContain('CtaSection'))
  })
})
