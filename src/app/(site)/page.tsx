import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { HeroCarousel } from '@/components/home/HeroCarousel'
import { ServiceCard } from '@/components/home/ServiceCard'
import { CtaSection } from '@/components/home/CtaSection'
import { PostCard } from '@/components/blog/PostCard'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Container } from '@/components/ui/Container'
import { JsonLd } from '@/components/seo/JsonLd'
import { getPosts } from '@/lib/api'

const siteUrl =
  process.env.NEXT_PUBLIC_SERVER_URL?.replace(/\/$/, '') ?? 'https://vvmadvocacia.adv.br'

const legalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: 'Vanessa Vaz Marschallinger — Advocacia Previdenciária',
  description:
    'Escritório especializado em Direito Previdenciário: aposentadorias, BPC/LOAS, pensão por morte, revisão de benefícios.',
  url: siteUrl,
  telephone: '',
  email: 'contato@vvmadvocacia.adv.br',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Florianópolis',
    addressRegion: 'SC',
    addressCountry: 'BR',
  },
  areaServed: 'Brasil',
  founder: {
    '@type': 'Person',
    name: 'Vanessa Vaz Marschallinger',
    jobTitle: 'Advogada Previdenciarista',
  },
  knowsAbout: [
    'Direito Previdenciário',
    'Aposentadorias INSS',
    'BPC/LOAS',
    'Pensão por Morte',
    'Revisão de Benefícios',
  ],
}

export const metadata: Metadata = {
  title: 'Vanessa Vaz Marschallinger — Advocacia Previdenciária',
  description:
    'Especialista em Direito Previdenciário em Florianópolis/SC. Aposentadorias, BPC/LOAS, pensão por morte, revisão de benefícios e mais.',
}

const services = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3D5C5F" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" />
      </svg>
    ),
    title: 'Aposentadorias',
    description: 'Por idade, tempo de contribuição e regras de transição — planejamento e concessão.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3D5C5F" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
        <path d="M12 3l8 4.5v5c0 4-3.3 7.7-8 9-4.7-1.3-8-5-8-9v-5L12 3z" />
      </svg>
    ),
    title: 'Aposentadoria Especial',
    description: 'Reconhecimento de tempo em atividades insalubres ou perigosas, com prova técnica.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3D5C5F" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    title: 'Benefícios por Incapacidade',
    description: 'Auxílio-doença e aposentadoria por invalidez — da perícia médica ao recurso.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3D5C5F" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
    title: 'BPC/LOAS',
    description: 'Benefício assistencial para idosos e pessoas com deficiência em situação de baixa renda.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3D5C5F" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><path d="M9 22V12h6v10" />
      </svg>
    ),
    title: 'Pensão por Morte',
    description: 'Orientação completa e acolhedora para dependentes em um momento delicado.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3D5C5F" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
        <path d="M23 4v6h-6" /><path d="M1 20v-6h6" /><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
      </svg>
    ),
    title: 'Revisão de Benefícios',
    description: 'Reanálise de valores e correção de erros de cálculo em benefícios já concedidos.',
  },
]

export default async function HomePage() {
  let recentPosts: Awaited<ReturnType<typeof getPosts>>['docs'] = []
  try {
    const result = await getPosts({ limit: 3, page: 1 })
    recentPosts = result.docs
  } catch {
    recentPosts = []
  }

  return (
    <>
      <JsonLd schema={legalServiceSchema} />
      <HeroCarousel />

      {/* Quem é Vanessa */}
      <section className="py-20 md:py-[100px]" style={{ background: '#FFFFFF' }}>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_420px] gap-10 md:gap-[80px] items-center">
            {/* Text column */}
            <div>
              <p
                className="text-[13px] font-semibold tracking-[0.16em] uppercase mb-4"
                style={{ color: '#3D5C5F' }}
              >
                Quem é Vanessa
              </p>
              <h2
                className="font-display font-semibold mb-6"
                style={{
                  fontFamily: 'var(--font-display), Cormorant Garamond, Georgia, serif',
                  fontSize: 'clamp(28px, 3.5vw, 40px)',
                  lineHeight: 1.2,
                  color: '#111111',
                }}
              >
                Ao seu lado em cada etapa, da análise do caso à decisão final.
              </h2>
              <p className="leading-relaxed mb-4" style={{ fontSize: 17, color: '#333333', lineHeight: 1.7 }}>
                Sou Vanessa Vaz Marschallinger, advogada especializada em Direito Previdenciário. Atuo ao lado de quem teve o benefício negado, cortado ou reduzido pelo INSS — com escuta atenta, estratégia clara e acompanhamento próximo do início ao fim do processo.
              </p>
              <p className="leading-relaxed mb-9" style={{ fontSize: 17, color: '#333333', lineHeight: 1.7 }}>
                Cada caso recebe análise individual: aqui você não é um número de protocolo.
              </p>
              <Link
                href="/sobre"
                className="inline-block text-[15px] font-semibold no-underline hover:underline"
                style={{ color: '#3D5C5F' }}
              >
                Conheça minha trajetória →
              </Link>
            </div>

            {/* Image column with decorative menta frame */}
            <div className="relative">
              {/* Decorative menta offset block — desktop only */}
              <div
                aria-hidden="true"
                className="absolute hidden md:block"
                style={{ top: 24, left: 24, right: -24, bottom: -24, background: '#BDE4DA', borderRadius: 6 }}
              />
              {/* Photo */}
              <div
                className="relative overflow-hidden h-[320px] md:h-[520px]"
                style={{ borderRadius: 6, zIndex: 1 }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=900&q=80"
                  alt="Vanessa Vaz Marschallinger, advogada previdenciária"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 420px"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Áreas de atuação */}
      <section className="py-20 md:py-[100px]" style={{ background: '#BDE4DA' }}>
        <Container>
          <SectionTitle
            overline="Áreas de Atuação"
            title="Como posso ajudar você"
            align="center"
            className="mb-12"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[28px]">
            {services.map((s) => (
              <ServiceCard key={s.title} {...s} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/servicos"
              className="inline-block text-[15px] font-semibold no-underline hover:underline"
              style={{ color: '#3D5C5F' }}
            >
              Ver todos os serviços →
            </Link>
          </div>
        </Container>
      </section>

      <CtaSection />

      {/* Blog — publicações recentes */}
      <section className="py-20 md:py-[100px]" style={{ background: '#FFFFFF' }}>
        <Container>
          <div className="flex items-end justify-between mb-12">
            <SectionTitle
              overline="Conteúdo"
              title="Últimas publicações do Blog"
            />
            <Link
              href="/blog"
              className="hidden md:inline-block text-[15px] font-semibold no-underline hover:underline shrink-0 ml-8"
              style={{ color: '#3D5C5F' }}
            >
              Ver todos os artigos →
            </Link>
          </div>

          {recentPosts.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {recentPosts.map((post) => (
                <PostCard
                  key={post.id}
                  slug={post.slug ?? ''}
                  title={post.title}
                  excerpt={post.excerpt}
                  publishedAt={post.publishedAt}
                  coverImage={
                    post.coverImage && typeof post.coverImage !== 'string'
                      ? { url: (post.coverImage as { url?: string }).url, alt: (post.coverImage as { alt?: string }).alt }
                      : null
                  }
                  category={
                    post.category && typeof post.category !== 'string'
                      ? { name: (post.category as { name?: string }).name, slug: (post.category as { slug?: string }).slug }
                      : null
                  }
                />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="overflow-hidden"
                  style={{ borderRadius: 8, border: '1px solid #EDF1F0', background: '#FFFFFF' }}
                >
                  <div className="h-48 relative" style={{ background: '#BDE4DA' }} />
                  <div className="p-6">
                    <p className="text-[12px] font-semibold tracking-[0.14em] uppercase mb-2" style={{ color: '#3D5C5F' }}>
                      Em breve
                    </p>
                    <h3 className="font-semibold text-[19px] leading-snug text-[#111111] mb-3">
                      Artigos em breve
                    </h3>
                    <p className="text-sm leading-relaxed text-[#666666]">
                      Os primeiros artigos do blog serão publicados em breve. Acompanhe!
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 text-center md:hidden">
            <Link href="/blog" className="text-sm font-semibold" style={{ color: '#3D5C5F' }}>
              Ver todos os artigos →
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}
