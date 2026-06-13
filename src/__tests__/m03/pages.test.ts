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
    it('tem preview do Blog', () => expect(c).toContain('Blog') || expect(c).toContain('publicações'))
  })

  describe('HeroCarousel', () => {
    let c: string
    beforeAll(() => { c = fs.readFileSync(comp('home/HeroCarousel.tsx'), 'utf-8') })

    it('arquivo existe', () => expect(fs.existsSync(comp('home/HeroCarousel.tsx'))).toBe(true))
    it("é 'use client'", () => expect(c).toContain("'use client'"))
    it('usa next/image', () => expect(c).toContain("from 'next/image'"))
    it('tem autoplay com setTimeout ou setInterval', () => expect(c.includes('setInterval') || c.includes('setTimeout')).toBe(true))
    it('limpa o timer no unmount', () => expect(c.includes('clearInterval') || c.includes('clearTimeout')).toBe(true))
    it('tem navegação por dots', () => expect(c).toContain('dot-nav') || expect(c).toContain('tablist'))
    it('tem CTA Fale Comigo', () => expect(c).toContain('Fale Comigo') || expect(c).toContain('/contato'))
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
    it('tem CTA de agendamento', () => expect(c).toContain('Agendar') || expect(c).toContain('contato'))
    it('exporta CtaSection como named export', () => expect(c).toContain('export function CtaSection'))
  })

  describe('Página Sobre', () => {
    let c: string
    beforeAll(() => { c = fs.readFileSync(site('sobre/page.tsx'), 'utf-8') })

    it('arquivo existe', () => expect(fs.existsSync(site('sobre/page.tsx'))).toBe(true))
    it('tem nome Vanessa Vaz Marschallinger', () => expect(c).toContain('Vanessa Vaz Marschallinger'))
    it('tem OAB/SC', () => expect(c).toContain('OAB'))
    it('tem citação de filosofia', () => expect(c).toContain('processo') || expect(c).toContain('advogo'))
    it('tem linha do tempo (trajetória)', () => expect(c).toContain('2014') || expect(c).toContain('Trajetória'))
    it('tem seção CTA de contato', () => expect(c).toContain('contato') || expect(c).toContain('Agendar'))
    it('tem generateMetadata', () => expect(c).toContain('generateMetadata'))
  })

  describe('Página Escritório', () => {
    let c: string
    beforeAll(() => { c = fs.readFileSync(site('escritorio/page.tsx'), 'utf-8') })

    it('arquivo existe', () => expect(fs.existsSync(site('escritorio/page.tsx'))).toBe(true))
    it('tem texto da missão', () => expect(c).toContain('missão') || expect(c).toContain('Missão') || expect(c).toContain('INSS'))
    it('tem valores Clareza, Compromisso, Acolhimento', () => {
      expect(c).toContain('Clareza')
      expect(c).toContain('Compromisso')
      expect(c).toContain('Acolhimento')
    })
    it('tem diferenciais do escritório', () => expect(c).toContain('Diferenciais') || expect(c).toContain('previdenciária'))
    it('tem generateMetadata', () => expect(c).toContain('generateMetadata'))
  })

  describe('Página Serviços', () => {
    let c: string
    beforeAll(() => { c = fs.readFileSync(site('servicos/page.tsx'), 'utf-8') })

    it('arquivo existe', () => expect(fs.existsSync(site('servicos/page.tsx'))).toBe(true))
    it('tem Aposentadorias', () => expect(c).toContain('Aposentadoria'))
    it('tem BPC/LOAS', () => expect(c).toContain('BPC') || expect(c).toContain('LOAS'))
    it('tem Pensão por Morte', () => expect(c).toContain('Pensão'))
    it('tem Revisão de Benefícios', () => expect(c).toContain('Revisão'))
    it('tem CTA individual por serviço', () => expect(c).toContain('Fale') || expect(c).toContain('caso'))
    it('tem generateMetadata', () => expect(c).toContain('generateMetadata'))
  })

  describe('Página Contato (shell)', () => {
    let c: string
    beforeAll(() => { c = fs.readFileSync(site('contato/page.tsx'), 'utf-8') })

    it('arquivo existe', () => expect(fs.existsSync(site('contato/page.tsx'))).toBe(true))
    it('tem título da página', () => expect(c).toContain('Contato') || expect(c).toContain('contato'))
    it('tem email de contato', () => expect(c).toContain('contato@vvmadvocacia'))
    it('tem ContactForm (formulário M06 implementado)', () => expect(c).toContain('ContactForm'))
    it('tem generateMetadata', () => expect(c).toContain('generateMetadata'))
  })
})
