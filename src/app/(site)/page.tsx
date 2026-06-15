import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { HeroCarousel } from '@/components/home/HeroCarousel'
import { ServiceCard } from '@/components/home/ServiceCard'
import { CtaSection } from '@/components/home/CtaSection'
import { ExteriorSection } from '@/components/home/ExteriorSection'
import { PostCard } from '@/components/blog/PostCard'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Container } from '@/components/ui/Container'
import { JsonLd } from '@/components/seo/JsonLd'
import { getPosts, getSiteSettings, extractMediaUrl } from '@/lib/api'
import { getIcone } from '@/components/servicos/servicosIcons'

const siteUrl =
  process.env.NEXT_PUBLIC_SERVER_URL?.replace(/\/$/, '') ?? 'https://vvmadvocacia.adv.br'

const legalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: 'Vanessa Vaz Marschallinger — Advocacia Previdenciária',
  description:
    'Escritório especializado em Direito Previdenciário: aposentadorias, BPC/LOAS, pensão por morte, revisão de benefícios.',
  url: siteUrl,
  email: 'vazvanessamarschallinger@gmail.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Gunskirchen',
    addressRegion: 'Áustria',
    addressCountry: 'AT',
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
    'Especialista em Direito Previdenciário na Áustria com atendimento internacional. Aposentadorias, BPC/LOAS, pensão por morte, acordos bilaterais e mais.',
  alternates: { canonical: '/' },
}


export default async function HomePage() {
  let recentPosts: Awaited<ReturnType<typeof getPosts>>['docs'] = []
  try {
    const result = await getPosts({ limit: 3, page: 1 })
    recentPosts = result.docs
  } catch {
    recentPosts = []
  }

  const settings = await getSiteSettings()
  const fotoUrl = extractMediaUrl(settings.sobreFoto)
  const services = (settings.servicos ?? []).map((s) => ({
    icon: getIcone(s.icone),
    title: s.titulo,
    description: s.descricao,
  }))

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
                Sou Vanessa Vaz Marschallinger, advogada especializada em Direito Previdenciário. Baseada na Áustria, atendo brasileiros no Brasil e em mais de 20 países — com escuta atenta, estratégia clara e acompanhamento próximo.
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
                className="relative overflow-hidden h-[420px] md:h-[560px]"
                style={{ borderRadius: 6, zIndex: 1 }}
              >
                {fotoUrl ? (
                  <Image
                    src={fotoUrl}
                    alt="Vanessa Vaz Marschallinger, advogada previdenciária"
                    fill
                    className="object-cover"
                    style={{ objectPosition: 'center 30%' }}
                    sizes="(max-width: 768px) 100vw, 420px"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ background: '#BDE4DA' }}
                  >
                    <p className="text-[13px] font-semibold text-[#3D5C5F] tracking-wide uppercase">
                      Foto não configurada
                    </p>
                  </div>
                )}
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

      <ExteriorSection />

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
