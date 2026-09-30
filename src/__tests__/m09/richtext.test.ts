import fs from 'fs'
import path from 'path'
import { lexicalToHtml } from '@/lib/lexicalToHtml'

const text = (t: string, format = 0) => ({ type: 'text', text: t, format })
const para = (children: object[], extra: object = {}) => ({ type: 'paragraph', children, format: '', indent: 0, ...extra })

describe('M09 — Formatação do texto do blog (Lexical → HTML)', () => {
  it('mantém parágrafo simples', () => {
    expect(lexicalToHtml([para([text('Olá')])])).toBe('<p>Olá</p>')
  })

  it.each(['left', 'center', 'right', 'justify'])('preserva o alinhamento %s do parágrafo', align => {
    expect(lexicalToHtml([para([text('x')], { format: align })])).toBe(`<p style="text-align:${align}">x</p>`)
  })

  it('preserva o alinhamento em títulos e citações', () => {
    expect(lexicalToHtml([{ type: 'heading', tag: 'h2', format: 'center', children: [text('T')] }]))
      .toBe('<h2 style="text-align:center">T</h2>')
    expect(lexicalToHtml([{ type: 'quote', format: 'justify', children: [text('Q')] }]))
      .toBe('<blockquote style="text-align:justify">Q</blockquote>')
  })

  it('ignora alinhamento desconhecido (sem injetar estilo arbitrário)', () => {
    expect(lexicalToHtml([para([text('x')], { format: 'red;background:url(x)' })])).toBe('<p>x</p>')
  })

  it('converte quebra de linha manual (Shift+Enter) em <br />', () => {
    expect(lexicalToHtml([para([text('a'), { type: 'linebreak' }, text('b')])])).toBe('<p>a<br />b</p>')
  })

  it('preserva recuo do parágrafo', () => {
    expect(lexicalToHtml([para([text('x')], { indent: 2 })])).toBe('<p style="margin-inline-start:4rem">x</p>')
  })

  it('combina alinhamento e recuo', () => {
    expect(lexicalToHtml([para([text('x')], { format: 'justify', indent: 1 })]))
      .toBe('<p style="text-align:justify;margin-inline-start:2rem">x</p>')
  })

  it('mantém negrito, itálico, sublinhado, tachado, código, subscrito e sobrescrito', () => {
    expect(lexicalToHtml([para([text('a', 1), text('b', 2), text('c', 8), text('d', 4), text('e', 16), text('f', 32), text('g', 64)])]))
      .toBe('<p><strong>a</strong><em>b</em><u>c</u><s>d</s><code>e</code><sub>f</sub><sup>g</sup></p>')
  })

  it('escapa HTML no texto', () => {
    expect(lexicalToHtml([para([text('<b>&</b>')])])).toBe('<p>&lt;b&gt;&amp;&lt;/b&gt;</p>')
  })

  it('mantém listas e links', () => {
    const html = lexicalToHtml([{ type: 'list', listType: 'bullet', children: [
      { type: 'listitem', children: [{ type: 'link', fields: { url: 'https://x.com' }, children: [text('l')] }] },
    ] }])
    expect(html).toBe('<ul><li><a href="https://x.com">l</a></li></ul>')
  })
})

describe('M09 — Estilo tipográfico do blog (.prose-vvm)', () => {
  const css = fs.readFileSync(path.resolve(__dirname, '../../app/globals.css'), 'utf-8')
  it.each(['.prose-vvm p', '.prose-vvm h2', '.prose-vvm h3', '.prose-vvm ul', '.prose-vvm ol', '.prose-vvm blockquote', '.prose-vvm a', '.prose-vvm img'])(
    'define %s', sel => expect(css).toContain(sel),
  )

  it('esconde o marcador do item que só embrulha uma sublista (lista aninhada)', () => {
    expect(css).toMatch(/\.prose-vvm li:has\(> (ul|ol):only-child\)[^{]*\{[^}]*list-style:\s*none/)
  })
})
