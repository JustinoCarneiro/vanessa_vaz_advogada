import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { RichTextRenderer } from '@/components/blog/RichTextRenderer'
import { Container } from '@/components/ui/Container'
import { CtaSection } from '@/components/home/CtaSection'
import { JsonLd } from '@/components/seo/JsonLd'
import { getPostBySlug, getPosts } from '@/lib/api'

const siteUrl =
  process.env.NEXT_PUBLIC_SERVER_URL?.replace(/\/$/, '') ?? 'https://vvmadvocacia.adv.br'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return { title: 'Artigo não encontrado' }

  return {
    title: `${post.meta?.title ?? post.title} — Blog Vanessa Vaz`,
    description: post.meta?.description ?? post.excerpt ?? undefined,
    openGraph: {
      title: post.meta?.title ?? post.title,
      description: post.meta?.description ?? post.excerpt ?? undefined,
      type: 'article',
      publishedTime: post.publishedAt ?? undefined,
    },
  }
}

export async function generateStaticParams() {
  const result = await getPosts({ limit: 100 })
  return result.docs.map((p) => ({ slug: p.slug ?? '' })).filter((p) => p.slug)
}

function readingTime(content: unknown): number {
  if (!content) return 1
  const json = JSON.stringify(content)
  const words = json.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

function formatFullDate(iso?: string | null): string {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default async function ArtigoPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) notFound()

  const category =
    post.category && typeof post.category !== 'string'
      ? (post.category as { name?: string; slug?: string })
      : null

  const coverImage =
    post.coverImage && typeof post.coverImage !== 'string'
      ? (post.coverImage as { url?: string; alt?: string })
      : null

  const readMin = readingTime(post.content)

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt ?? undefined,
    datePublished: post.publishedAt ?? post.createdAt,
    dateModified: post.updatedAt ?? post.createdAt,
    url: `${siteUrl}/blog/${post.slug}`,
    author: {
      '@type': 'Person',
      name: 'Vanessa Vaz Marschallinger',
      jobTitle: 'Advogada Previdenciarista',
      url: `${siteUrl}/sobre`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'VVM Advocacia Previdenciária',
      url: siteUrl,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/blog/${post.slug}`,
    },
    ...(coverImage?.url ? { image: coverImage.url } : {}),
  }

  return (
    <>
      <JsonLd schema={articleSchema} />
      {/* Breadcrumb */}
      <div
        className="border-b"
        style={{ background: '#FFFFFF', borderColor: '#EDF1F0' }}
      >
        <Container>
          <nav
            className="flex items-center gap-[10px] py-4 text-[13px]"
            aria-label="Você está em"
          >
            <Link href="/" className="font-medium no-underline hover:underline" style={{ color: '#3D5C5F' }}>
              Home
            </Link>
            <span style={{ color: '#89B0AF' }}>›</span>
            <Link href="/blog" className="font-medium no-underline hover:underline" style={{ color: '#3D5C5F' }}>
              Blog
            </Link>
            {category?.name && (
              <>
                <span style={{ color: '#89B0AF' }}>›</span>
                <Link
                  href={`/blog?cat=${category.slug}`}
                  className="font-medium no-underline hover:underline"
                  style={{ color: '#3D5C5F' }}
                >
                  {category.name}
                </Link>
              </>
            )}
            <span style={{ color: '#89B0AF' }}>›</span>
            <span
              className="overflow-hidden text-ellipsis whitespace-nowrap max-w-[420px]"
              style={{ color: '#555555' }}
            >
              {post.title}
            </span>
          </nav>
        </Container>
      </div>

      {/* Hero — capa com título sobreposto */}
      <section
        className="relative overflow-hidden"
        style={{ height: 480, background: '#2F484B' }}
      >
        {coverImage?.url ? (
          <Image
            src={coverImage.url}
            alt={coverImage.alt ?? post.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        ) : null}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, rgba(18,32,34,0.30) 0%, rgba(18,32,34,0.66) 100%)' }}
        />
        <div className="relative h-full max-w-[880px] mx-auto px-6 md:px-14 flex flex-col justify-end pb-14">
          <div className="flex items-center gap-[14px] mb-[18px] flex-wrap">
            {category?.name && (
              <span
                className="inline-block text-[12px] font-semibold tracking-[0.08em] uppercase px-[14px] py-[6px] rounded-full"
                style={{ color: '#111111', background: '#BDE4DA' }}
              >
                {category.name}
              </span>
            )}
            {post.publishedAt && (
              <span className="text-[13.5px]" style={{ color: 'rgba(255,255,255,0.92)' }}>
                {formatFullDate(post.publishedAt)}
              </span>
            )}
            <span style={{ color: 'rgba(255,255,255,0.5)' }}>·</span>
            <span className="text-[13.5px]" style={{ color: 'rgba(255,255,255,0.92)' }}>
              {readMin} min de leitura
            </span>
          </div>

          <h1
            className="font-display font-semibold text-white m-0"
            style={{
              fontFamily: 'var(--font-display), Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(28px, 4vw, 48px)',
              lineHeight: 1.15,
              textWrap: 'pretty',
            } as React.CSSProperties}
          >
            {post.title}
          </h1>
        </div>
      </section>

      {/* Corpo do artigo */}
      <article style={{ background: '#FFFFFF', padding: '72px 0 80px' }}>
        <div className="max-w-[680px] mx-auto px-6">
          {/* Assinatura da autora */}
          <div
            className="flex items-center gap-3 pb-7 mb-9"
            style={{ borderBottom: '1px solid #EDF1F0' }}
          >
            <div>
              <p className="text-[14px] font-semibold text-[#111111] m-0">Vanessa Vaz Marschallinger</p>
              <p className="text-[13px] m-0" style={{ color: '#3D5C5F' }}>
                Advogada previdenciarista · OAB/SC 12.345
              </p>
            </div>
          </div>

          {/* Rich text content */}
          <RichTextRenderer
            content={post.content as Parameters<typeof RichTextRenderer>[0]['content']}
            className="text-[17px] leading-[1.75] text-[#222222]"
          />
        </div>
      </article>

      {/* CTA */}
      <CtaSection
        headline="Precisa de ajuda com seu caso?"
        sub="Cada negativa tem um motivo — e um caminho. Entre em contato e analisamos o seu."
        ctaLabel="Entre em contato"
        ctaHref="/contato"
      />

      {/* Navegação entre artigos (anterior / próximo) */}
      <section className="py-14" style={{ background: '#FFFFFF', borderTop: '1px solid #EDF1F0' }}>
        <Container size="wide">
          <div className="grid md:grid-cols-2 gap-6 max-w-[1056px] mx-auto">
            <Link
              href="/blog"
              className="block no-underline rounded-sm p-7 transition-all hover:-translate-y-1 hover:shadow-[0_12px_26px_rgba(61,92,95,0.14)]"
              style={{ border: '1px solid #E4EAE9' }}
            >
              <p
                className="text-[12.5px] font-semibold tracking-[0.1em] uppercase mb-[10px]"
                style={{ color: '#3D5C5F' }}
              >
                ← Artigo anterior
              </p>
              <p className="text-[17px] font-semibold leading-[1.45] text-[#111111] m-0">
                Ver todos os artigos do Blog
              </p>
            </Link>
            <div
              className="rounded-sm p-7"
              style={{ border: '1px solid #E4EAE9', background: '#F9FBFA' }}
            >
              <p
                className="text-[12.5px] font-semibold tracking-[0.1em] uppercase mb-[10px] text-right"
                style={{ color: '#3D5C5F' }}
              >
                Próximo artigo →
              </p>
              <p className="text-[15px] text-[#555555] text-right m-0">
                Explore mais artigos no Blog
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
