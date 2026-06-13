import type { MetadataRoute } from 'next'
import { getPosts } from '@/lib/api'

const baseUrl =
  process.env.NEXT_PUBLIC_SERVER_URL?.replace(/\/$/, '') ?? 'https://vvmadvocacia.adv.br'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: new Date(), priority: 1.0, changeFrequency: 'weekly' },
    { url: `${baseUrl}/sobre`, lastModified: new Date(), priority: 0.8, changeFrequency: 'monthly' },
    { url: `${baseUrl}/escritorio`, lastModified: new Date(), priority: 0.7, changeFrequency: 'monthly' },
    { url: `${baseUrl}/servicos`, lastModified: new Date(), priority: 0.8, changeFrequency: 'monthly' },
    { url: `${baseUrl}/blog`, lastModified: new Date(), priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/contato`, lastModified: new Date(), priority: 0.7, changeFrequency: 'yearly' },
  ]

  let postPages: MetadataRoute.Sitemap = []
  try {
    const result = await getPosts({ limit: 200 })
    postPages = result.docs
      .filter((p) => p.slug)
      .map((p) => ({
        url: `${baseUrl}/blog/${p.slug}`,
        lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date(),
        priority: 0.7,
        changeFrequency: 'monthly' as const,
      }))
  } catch {
    // DB may not be available at build time — static pages are still indexed
  }

  return [...staticPages, ...postPages]
}
