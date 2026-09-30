import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { lexicalToHtml, type SerializedNode } from '@/lib/lexicalToHtml'

interface RichTextRendererProps {
  content: SerializedEditorState | null | undefined
  className?: string
}

export function RichTextRenderer({ content, className = '' }: RichTextRendererProps) {
  if (!content?.root?.children) return null

  const html = lexicalToHtml(content.root.children as SerializedNode[])

  return (
    <div
      className={`prose-vvm ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
