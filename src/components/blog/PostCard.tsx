import Image from 'next/image'
import Link from 'next/link'

interface PostCardProps {
  slug: string
  title: string
  excerpt?: string | null
  publishedAt?: string | null
  coverImage?: { url?: string | null; alt?: string } | null
  category?: { name?: string; slug?: string } | null
}

function formatDate(iso?: string | null): string {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export function PostCard({ slug, title, excerpt, publishedAt, coverImage, category }: PostCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="group block text-inherit no-underline overflow-hidden transition-all hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(61,92,95,0.15)]"
      style={{ borderRadius: 8, border: '1px solid #E4EAE9', background: '#FFFFFF' }}
    >
      {/* Cover image */}
      <div className="relative h-[190px] overflow-hidden" style={{ background: '#BDE4DA' }}>
        {coverImage?.url ? (
          <Image
            src={coverImage.url}
            alt={coverImage.alt ?? title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[13px]" style={{ color: '#89B0AF' }}>Sem imagem</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-6 pb-7">
        <div className="flex items-center gap-3 mb-[14px]">
          {category?.name && (
            <span
              className="inline-block text-[11.5px] font-semibold tracking-[0.08em] uppercase px-3 py-[5px] rounded-full"
              style={{ color: '#3D5C5F', background: '#BDE4DA' }}
            >
              {category.name}
            </span>
          )}
          {publishedAt && (
            <span className="text-[12.5px]" style={{ color: '#3D5C5F' }}>
              {formatDate(publishedAt)}
            </span>
          )}
        </div>

        <h3
          className="font-semibold text-[19px] leading-[1.4] mb-[10px] text-[#111111]"
          style={{ textWrap: 'pretty' } as React.CSSProperties}
        >
          {title}
        </h3>

        {excerpt && (
          <p className="text-[14px] leading-[1.65] text-[#444444] mb-4 line-clamp-3">
            {excerpt}
          </p>
        )}

        <span
          className="text-[14px] font-semibold underline underline-offset-[5px]"
          style={{ color: '#3D5C5F' }}
        >
          Ler mais
        </span>
      </div>
    </Link>
  )
}
