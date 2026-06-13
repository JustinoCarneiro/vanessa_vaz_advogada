import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

interface RichTextRendererProps {
  content: SerializedEditorState | null | undefined
  className?: string
}

type SerializedNode = {
  type: string
  tag?: string
  version?: number
  children?: SerializedNode[]
  text?: string
  format?: number
  url?: string
  listType?: string
  fields?: { url?: string; alt?: string; caption?: string }
  value?: { url?: string; alt?: string }
}

function serializeChildren(nodes: SerializedNode[]): string {
  return nodes.map(serializeNode).join('')
}

function serializeNode(node: SerializedNode): string {
  switch (node.type) {
    case 'text': {
      let t = escHtml(node.text ?? '')
      const f = node.format ?? 0
      if (f & 1) t = `<strong>${t}</strong>`
      if (f & 2) t = `<em>${t}</em>`
      if (f & 8) t = `<u>${t}</u>`
      if (f & 4) t = `<s>${t}</s>`
      if (f & 16) t = `<code>${t}</code>`
      return t
    }
    case 'paragraph':
      return `<p>${serializeChildren(node.children ?? [])}</p>`
    case 'heading':
      return `<${node.tag}>${serializeChildren(node.children ?? [])}</${node.tag}>`
    case 'quote':
      return `<blockquote>${serializeChildren(node.children ?? [])}</blockquote>`
    case 'list':
      return node.listType === 'number'
        ? `<ol>${serializeChildren(node.children ?? [])}</ol>`
        : `<ul>${serializeChildren(node.children ?? [])}</ul>`
    case 'listitem':
      return `<li>${serializeChildren(node.children ?? [])}</li>`
    case 'link': {
      const href = node.fields?.url ?? '#'
      return `<a href="${escAttr(href)}">${serializeChildren(node.children ?? [])}</a>`
    }
    case 'upload': {
      const src = node.value?.url ?? ''
      const alt = node.value?.alt ?? ''
      return src ? `<figure><img src="${escAttr(src)}" alt="${escAttr(alt)}" /></figure>` : ''
    }
    default:
      if (node.children) return serializeChildren(node.children)
      return ''
  }
}

function escHtml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function escAttr(s: string) {
  return s.replace(/"/g, '&quot;')
}

export function RichTextRenderer({ content, className = '' }: RichTextRendererProps) {
  if (!content?.root?.children) return null

  const html = serializeChildren(content.root.children as SerializedNode[])

  return (
    <div
      className={`prose-vvm ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
