import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PostCard } from '@/components/blog/PostCard'
import { Container } from '@/components/ui/Container'
import { getPosts, getCategories } from '@/lib/api'

interface Props {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ page?: string }>
}

export async function generateStaticParams() {
  const categories = await getCategories()
  return categories
    .filter((c) => c.slug)
    .map((c) => ({ slug: c.slug as string }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const categories = await getCategories()
  const category = categories.find((c) => c.slug === slug)
  if (!category) return {}
  return {
    title: `${category.name} — Blog · Vanessa Vaz Marschallinger`,
    description:
      `Artigos sobre ${category.name}: informação clara sobre INSS, aposentadorias e benefícios previdenciários.`,
    openGraph: {
      title: `${category.name} — Blog · VVM Advocacia`,
      description: `Artigos sobre ${category.name}: informação clara sobre seus direitos previdenciários.`,
    },
  }
}

export default async function CategoriaPage({ params, searchParams }: Props) {
  const { slug } = await params
  const { page: pageParam } = await searchParams
  const page = Number(pageParam ?? '1') || 1
  const limit = 6

  const [postsResult, categories] = await Promise.all([
    getPosts({ category: slug, page, limit }),
    getCategories(),
  ])

  const category = categories.find((c) => c.slug === slug)
  if (!category) notFound()

  const { docs: posts, totalPages, totalDocs } = postsResult
  const empty = posts.length === 0

  return (
    <>
      {/* Header menta */}
      <section
        className="relative overflow-hidden"
        style={{ background: '#BDE4DA', padding: '88px 24px 96px' }}
        aria-labelledby="categoria-heading"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/marcadagua-preto.png"
          alt=""
          className="absolute pointer-events-none"
          style={{
            right: -50,
            top: '50%',
            transform: 'translateY(-50%)',
            height: 360,
            width: 'auto',
            opacity: 0.10,
          }}
          aria-hidden="true"
        />
        <div className="relative max-w-[760px] mx-auto text-center">
          <p
            className="text-[13px] font-semibold tracking-[0.16em] uppercase mb-4"
            style={{ color: '#2A3F41' }}
          >
            Blog · Categoria
          </p>
          <h1
            id="categoria-heading"
            className="font-display font-semibold text-[#111111] mb-5"
            style={{
              fontFamily: 'var(--font-display), Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(36px, 5vw, 52px)',
              lineHeight: 1.1,
            }}
          >
            {category.name}
          </h1>
          {category.description && (
            <p
              className="text-[17px] leading-[1.65]"
              style={{ color: '#2A3F41', textWrap: 'pretty' } as React.CSSProperties}
            >
              {category.description}
            </p>
          )}
        </div>
      </section>

      {/* Grid + navegação */}
      <section className="py-14 pb-24" style={{ background: '#FFFFFF' }}>
        <Container>
          {/* Pills de categoria — links diretos para /blog/categoria/[slug] */}
          <div
            className="flex flex-wrap gap-3 justify-center mb-10"
            role="group"
            aria-label="Filtrar por categoria"
          >
            <Link
              href="/blog"
              className="text-[13px] font-semibold tracking-[0.03em] px-5 py-[10px] rounded-full transition-colors"
              style={{ color: '#3D5C5F', background: '#FFFFFF', border: '1px solid #89B0AF' }}
            >
              Todas
            </Link>
            {categories.map((c) => {
              const active = c.slug === slug
              return (
                <Link
                  key={c.slug}
                  href={`/blog/categoria/${c.slug}`}
                  aria-current={active ? 'page' : undefined}
                  className="text-[13px] font-semibold tracking-[0.03em] px-5 py-[10px] rounded-full transition-colors"
                  style={
                    active
                      ? { color: '#FFFFFF', background: '#3D5C5F', border: '1px solid #3D5C5F' }
                      : { color: '#3D5C5F', background: '#FFFFFF', border: '1px solid #89B0AF' }
                  }
                >
                  {c.name}
                </Link>
              )
            })}
          </div>

          {/* Contagem */}
          {!empty && (
            <p className="text-center text-[13px] mb-10" style={{ color: '#3D5C5F' }}>
              {totalDocs === 1 ? '1 artigo' : `${totalDocs} artigos`}
              {totalPages > 1 && ` · página ${page} de ${totalPages}`}
            </p>
          )}

          {/* Grid */}
          {!empty ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  slug={post.slug ?? ''}
                  title={post.title}
                  excerpt={post.excerpt}
                  publishedAt={post.publishedAt}
                  coverImage={
                    post.coverImage && typeof post.coverImage !== 'string'
                      ? {
                          url: (post.coverImage as { url?: string }).url,
                          alt: (post.coverImage as { alt?: string }).alt,
                        }
                      : null
                  }
                  category={
                    post.category && typeof post.category !== 'string'
                      ? {
                          name: (post.category as { name?: string }).name,
                          slug: (post.category as { slug?: string }).slug,
                        }
                      : null
                  }
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center py-16 text-center">
              <h2
                className="font-display font-semibold text-[28px] text-[#111111] mb-3"
                style={{ fontFamily: 'var(--font-display), Cormorant Garamond, Georgia, serif' }}
              >
                Nenhum artigo nesta categoria
              </h2>
              <p className="text-[15px] text-[#444444] mb-6 max-w-[360px]">
                Ainda não publicamos artigos em {category.name}. Volte em breve!
              </p>
              <Link
                href="/blog"
                className="text-[14px] font-semibold text-white transition-colors hover:bg-[#2F484B]"
                style={{ background: '#3D5C5F', padding: '13px 28px', borderRadius: 4 }}
              >
                Ver todos os artigos
              </Link>
            </div>
          )}

          {/* Paginação */}
          {!empty && totalPages > 1 && (
            <nav
              className="flex justify-center items-center gap-[10px] mt-14"
              aria-label="Paginação"
            >
              {page > 1 && (
                <Link
                  href={`/blog/categoria/${slug}${page - 1 > 1 ? `?page=${page - 1}` : ''}`}
                  className="flex items-center h-11 px-5 rounded-sm text-[14px] font-medium transition-colors hover:bg-[#F0F4F3]"
                  style={{ border: '1px solid #D5DEDC', color: '#3D5C5F' }}
                >
                  ← Anterior
                </Link>
              )}

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <Link
                  key={n}
                  href={`/blog/categoria/${slug}${n > 1 ? `?page=${n}` : ''}`}
                  aria-current={n === page ? 'page' : undefined}
                  className="flex items-center justify-center w-11 h-11 rounded-sm text-[14px] font-semibold transition-colors hover:bg-[#F0F4F3]"
                  style={
                    n === page
                      ? { background: '#3D5C5F', color: '#FFFFFF', border: '1px solid #3D5C5F' }
                      : { background: '#FFFFFF', color: '#3D5C5F', border: '1px solid #D5DEDC' }
                  }
                >
                  {n}
                </Link>
              ))}

              {page < totalPages && (
                <Link
                  href={`/blog/categoria/${slug}?page=${page + 1}`}
                  className="flex items-center h-11 px-5 rounded-sm text-[14px] font-medium transition-colors hover:bg-[#F0F4F3]"
                  style={{ border: '1px solid #D5DEDC', color: '#3D5C5F' }}
                >
                  Próxima →
                </Link>
              )}
            </nav>
          )}
        </Container>
      </section>
    </>
  )
}
