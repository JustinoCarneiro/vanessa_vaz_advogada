import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import type { Where } from 'payload'
import config from '@payload-config'

const LIMIT_DEFAULT = 6

// Cache de 60s em produção; em dev o Next.js ignora o cache por padrão.
// Tags permitem invalidação pontual via revalidateTag() após publicações.

async function _getPosts(options?: {
  query?: string
  category?: string
  page?: number
  limit?: number
}) {
  const payload = await getPayload({ config })
  const { query, category, page = 1, limit = LIMIT_DEFAULT } = options ?? {}

  const where: Where = { status: { equals: 'published' } }

  if (category) where['category.slug'] = { equals: category }

  if (query) {
    where['or'] = [
      { title: { like: query } },
      { excerpt: { like: query } },
    ]
  }

  return payload.find({
    collection: 'posts',
    where,
    sort: '-publishedAt',
    page,
    limit,
    depth: 1,
  })
}

async function _getPostBySlug(slug: string) {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'posts',
    where: {
      slug: { equals: slug },
      status: { equals: 'published' },
    },
    depth: 2,
    limit: 1,
  })

  return result.docs[0] ?? null
}

async function _getCategories() {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'categories',
    sort: 'name',
    limit: 100,
  })

  return result.docs
}

// Versões cacheadas — revalidam a cada 60s e aceitam invalidação por tag.
// Buscas com filtros dinâmicos (query/category) não são cacheadas para evitar
// cache miss explosion com muitas combinações de parâmetros.

export async function getPosts(options?: Parameters<typeof _getPosts>[0]) {
  const hasFilter = options?.query || options?.category

  if (hasFilter) {
    // Busca filtrada — não cacheia (parâmetros dinâmicos do usuário)
    return _getPosts(options)
  }

  return unstable_cache(
    () => _getPosts(options),
    ['posts', `page-${options?.page ?? 1}`, `limit-${options?.limit ?? LIMIT_DEFAULT}`],
    { revalidate: 60, tags: ['posts'] }
  )()
}

export async function getPostBySlug(slug: string) {
  return unstable_cache(
    () => _getPostBySlug(slug),
    ['post', slug],
    { revalidate: 60, tags: ['posts', `post-${slug}`] }
  )()
}

export async function getCategories() {
  return unstable_cache(
    () => _getCategories(),
    ['categories'],
    { revalidate: 300, tags: ['categories'] }
  )()
}

// Tipos mínimos para os campos do Global (evita depender do generate:types)
export type SiteSettingsMedia = { id: number; url?: string | null }
export type SiteSettingsServico = {
  icone?: string | null
  titulo: string
  descricao: string
  itens?: Array<{ item: string; id?: string }>
  id?: string
}
export type SiteSettingsData = {
  sobreFoto?: SiteSettingsMedia | number | null
  escritorioFoto?: SiteSettingsMedia | number | null
  servicos?: SiteSettingsServico[]
}

export function extractMediaUrl(
  field: SiteSettingsMedia | number | null | undefined,
): string | null {
  if (!field || typeof field === 'number') return null
  return field.url ?? null
}

async function _getSiteSettings(): Promise<SiteSettingsData> {
  const payload = await getPayload({ config })
  return payload.findGlobal({ slug: 'site-settings', depth: 1 }) as Promise<SiteSettingsData>
}

export async function getSiteSettings(): Promise<SiteSettingsData> {
  return unstable_cache(
    () => _getSiteSettings(),
    ['site-settings'],
    { revalidate: 3600, tags: ['site-settings'] },
  )()
}
