import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { PostCard } from '@/components/blog/PostCard'
import { SearchBar } from '@/components/blog/SearchBar'
import { CategoryPills } from '@/components/blog/CategoryPills'
import { Container } from '@/components/ui/Container'
import { getPosts, getCategories } from '@/lib/api'

export const metadata: Metadata = {
  title: 'Blog — Vanessa Vaz Marschallinger',
  description:
    'Informação clara sobre INSS, aposentadorias e benefícios para você entender seus direitos antes de qualquer decisão.',
  alternates: { canonical: '/blog' },
}

interface BlogPageProps {
  searchParams: Promise<{ q?: string; cat?: string; page?: string }>
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { q, cat, page: pageParam } = await searchParams
  const page = Number(pageParam ?? '1') || 1
  const limit = 6

  const [postsResult, categories] = await Promise.all([
    getPosts({ query: q, category: cat, page, limit }),
    getCategories(),
  ])

  const { docs: posts, totalPages, totalDocs } = postsResult
  const empty = posts.length === 0

  return (
    <>
      {/* Header mint com busca */}
      <section
        className="relative overflow-hidden"
        style={{ background: '#BDE4DA', padding: '88px 24px 96px' }}
        aria-labelledby="blog-heading"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/marcadagua-preto.png"
          alt=""
          className="absolute pointer-events-none"
          style={{ right: -50, top: '50%', transform: 'translateY(-50%)', height: 360, width: 'auto', opacity: 0.10 }}
          aria-hidden="true"
        />
        <div className="relative max-w-[760px] mx-auto text-center">
          <h1
            id="blog-heading"
            className="font-display font-semibold text-[#111111] mb-4"
            style={{
              fontFamily: 'var(--font-display), Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(36px, 5vw, 52px)',
              lineHeight: 1.1,
            }}
          >
            Blog
          </h1>
          <p className="text-[17px] leading-[1.65] mb-10" style={{ color: '#2A3F41', textWrap: 'pretty' } as React.CSSProperties}>
            Informação clara sobre INSS, aposentadorias e benefícios — para você entender seus
            direitos antes de qualquer decisão.
          </p>
          <Suspense>
            <SearchBar defaultValue={q} />
          </Suspense>
        </div>
      </section>

      {/* Grid + filtros */}
      <section className="py-14 pb-24" style={{ background: '#FFFFFF' }}>
        <Container>
          {/* Filtros de categoria */}
          <div className="mb-5">
            <Suspense>
              <CategoryPills
                categories={categories.map((c) => ({ slug: c.slug ?? '', name: c.name }))}
                activeSlug={cat}
              />
            </Suspense>
          </div>

          {/* Contagem de resultados */}
          {!empty && (
            <p className="text-center text-[13px] mb-10" style={{ color: '#3D5C5F' }}>
              {totalDocs === 1
                ? '1 artigo encontrado'
                : `${totalDocs} artigos encontrados`}
              {totalPages > 1 && ` · página ${page} de ${totalPages}`}
            </p>
          )}

          {/* Grid de posts */}
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
            /* Estado vazio — Nenhum artigo encontrado */
            <div className="flex flex-col items-center py-16 text-center">
              <h2
                className="font-display font-semibold text-[28px] text-[#111111] mb-3"
                style={{ fontFamily: 'var(--font-display), Cormorant Garamond, Georgia, serif' }}
              >
                Nenhum artigo encontrado
              </h2>
              <p className="text-[15px] text-[#444444] mb-6 max-w-[360px]">
                {q || cat
                  ? `Não encontramos resultados para "${q ?? cat}". Tente outro termo ou limpe os filtros.`
                  : 'Nenhum artigo publicado ainda. Volte em breve!'}
              </p>
              {(q || cat) && (
                <Link
                  href="/blog"
                  className="text-[14px] font-semibold text-white transition-colors hover:bg-[#2F484B]"
                  style={{
                    background: '#3D5C5F',
                    padding: '13px 28px',
                    borderRadius: 4,
                  }}
                >
                  Limpar busca e filtros
                </Link>
              )}
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
                  href={`/blog?${buildPageParams({ q, cat, page: page - 1 })}`}
                  className="flex items-center h-11 px-5 rounded-sm text-[14px] font-medium transition-colors hover:bg-[#F0F4F3]"
                  style={{ border: '1px solid #D5DEDC', color: '#3D5C5F' }}
                >
                  ← Anterior
                </Link>
              )}

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <Link
                  key={n}
                  href={`/blog?${buildPageParams({ q, cat, page: n })}`}
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
                  href={`/blog?${buildPageParams({ q, cat, page: page + 1 })}`}
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

function buildPageParams(opts: { q?: string; cat?: string; page?: number }) {
  const p = new URLSearchParams()
  if (opts.q) p.set('q', opts.q)
  if (opts.cat) p.set('cat', opts.cat)
  if (opts.page && opts.page > 1) p.set('page', String(opts.page))
  return p.toString()
}
