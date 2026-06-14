import fs from 'fs'
import path from 'path'

const root = path.resolve(__dirname, '../../..')
const api = (p: string) => path.join(root, 'src/app/api', p)
const comp = (p: string) => path.join(root, 'src/components/contact', p)
const page = path.join(root, 'src/app/(site)/contato/page.tsx')

describe('M06 — Formulário de contato + email', () => {
  describe('API route (POST /api/contact)', () => {
    let c: string
    beforeAll(() => { c = fs.readFileSync(api('contact/route.ts'), 'utf-8') })

    it('arquivo existe', () => expect(fs.existsSync(api('contact/route.ts'))).toBe(true))
    it('exporta POST handler', () => expect(c).toContain('export async function POST'))
    it('usa Resend para envio de email', () => expect(c.toLowerCase()).toContain('resend'))
    it('usa RESEND_API_KEY do env', () => expect(c).toContain('RESEND_API_KEY'))
    it('usa CONTACT_EMAIL_TO do env', () => expect(c).toContain('CONTACT_EMAIL_TO'))
    it('valida campos obrigatórios (name, email, subject, message)', () => {
      expect(c).toContain('name')
      expect(c).toContain('email')
      expect(c).toContain('subject')
      expect(c).toContain('message')
    })
    it('retorna 400 em caso de erro de validação', () => expect(c).toContain('400'))
    it('salva mensagem no Payload (ContactMessages)', () => {
      expect(c.includes('contact-messages') || c.includes('ContactMessages')).toBe(true)
    })
    it('retorna 200 com ok:true em sucesso', () => {
      expect(c).toContain('ok')
      expect(c).toContain('200')
    })
  })

  describe('ContactForm (componente cliente)', () => {
    let c: string
    beforeAll(() => { c = fs.readFileSync(comp('ContactForm.tsx'), 'utf-8') })

    it('arquivo existe', () => expect(fs.existsSync(comp('ContactForm.tsx'))).toBe(true))
    it("é 'use client'", () => expect(c).toContain("'use client'"))
    it('exporta ContactForm como named export', () => expect(c).toContain('export function ContactForm'))
    it('tem campo nome', () => {
      expect(c.includes('nome') || c.includes('name')).toBe(true)
    })
    it('tem campo email', () => expect(c).toContain('email'))
    it('tem campo telefone (opcional)', () => expect(c).toContain('phone'))
    it('tem select de assunto com opções', () => {
      expect(c).toContain('<select')
      expect(c).toContain('Aposentadoria')
    })
    it('tem textarea de mensagem', () => expect(c).toContain('<textarea'))
    it('tem validação de erro por campo (cor #B3261E)', () => expect(c).toContain('#B3261E'))
    it('tem banner de erro geral (role=alert)', () => {
      expect(c).toContain('role')
      expect(c).toContain('alert')
    })
    it('tem estado de sucesso inline (Mensagem enviada)', () => expect(c).toContain('Mensagem enviada'))
    it('tem botão submit "Enviar Mensagem"', () => expect(c).toContain('Enviar Mensagem'))
    it('tem estado de loading (Enviando)', () => expect(c).toContain('Enviando'))
    it('faz POST para /api/contact via fetch', () => expect(c).toContain('/api/contact'))
    it('valida mensagem com mínimo de 20 caracteres', () => expect(c).toContain('20'))
    it('microcopy de reasseguramento (1 dia útil)', () => expect(c).toContain('1 dia útil'))
  })

  describe('Página Contato atualizada', () => {
    let c: string
    beforeAll(() => { c = fs.readFileSync(page, 'utf-8') })

    it('importa ContactForm', () => expect(c).toContain('ContactForm'))
    it('tem header com fundo mint (#BDE4DA)', () => expect(c).toContain('BDE4DA'))
    it('tem aside com informações de contato', () => expect(c).toContain('vazvanessamarschallinger@gmail.com'))
    it('tem horário de atendimento', () => expect(c).toContain('9h'))
    it('não tem mais o formulário HTML estático (shell removido)', () => expect(c).not.toContain('TODO'))
  })
})
