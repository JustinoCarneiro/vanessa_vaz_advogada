export type SerializedNode = {
  type: string
  tag?: string
  version?: number
  children?: SerializedNode[]
  text?: string
  format?: number | string
  indent?: number
  url?: string
  listType?: string
  fields?: { url?: string; alt?: string; caption?: string }
  value?: { url?: string; alt?: string }
}

const ALIGNMENTS = new Set(['left', 'center', 'right', 'justify'])

/** style="…" com alinhamento e recuo do bloco; vazio quando não há nada a preservar. */
function blockStyle(node: SerializedNode): string {
  const rules: string[] = []
  if (typeof node.format === 'string' && ALIGNMENTS.has(node.format)) rules.push(`text-align:${node.format}`)
  if (typeof node.indent === 'number' && node.indent > 0) rules.push(`margin-inline-start:${node.indent * 2}rem`)
  return rules.length ? ` style="${rules.join(';')}"` : ''
}

function escHtml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function escAttr(s: string) {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;')
}

function serializeNode(node: SerializedNode): string {
  switch (node.type) {
    case 'text': {
      let t = escHtml(node.text ?? '')
      const f = typeof node.format === 'number' ? node.format : 0
      if (f & 1) t = `<strong>${t}</strong>`
      if (f & 2) t = `<em>${t}</em>`
      if (f & 8) t = `<u>${t}</u>`
      if (f & 4) t = `<s>${t}</s>`
      if (f & 16) t = `<code>${t}</code>`
      if (f & 32) t = `<sub>${t}</sub>`
      if (f & 64) t = `<sup>${t}</sup>`
      return t
    }
    case 'linebreak':
      return '<br />'
    case 'tab':
      return '&emsp;'
    case 'paragraph':
      return `<p${blockStyle(node)}>${lexicalToHtml(node.children ?? [])}</p>`
    case 'heading':
      return `<${node.tag}${blockStyle(node)}>${lexicalToHtml(node.children ?? [])}</${node.tag}>`
    case 'quote':
      return `<blockquote${blockStyle(node)}>${lexicalToHtml(node.children ?? [])}</blockquote>`
    case 'list':
      return node.listType === 'number'
        ? `<ol>${lexicalToHtml(node.children ?? [])}</ol>`
        : `<ul>${lexicalToHtml(node.children ?? [])}</ul>`
    case 'listitem':
      return `<li>${lexicalToHtml(node.children ?? [])}</li>`
    case 'link': {
      const href = node.fields?.url ?? '#'
      return `<a href="${escAttr(href)}">${lexicalToHtml(node.children ?? [])}</a>`
    }
    case 'upload': {
      const src = node.value?.url ?? ''
      const alt = node.value?.alt ?? ''
      return src ? `<figure><img src="${escAttr(src)}" alt="${escAttr(alt)}" /></figure>` : ''
    }
    default:
      if (node.children) return lexicalToHtml(node.children)
      return ''
  }
}

export function lexicalToHtml(nodes: SerializedNode[]): string {
  return nodes.map(serializeNode).join('')
}
