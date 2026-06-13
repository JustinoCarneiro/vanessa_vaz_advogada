import type { MetadataRoute } from 'next'

const baseUrl =
  process.env.NEXT_PUBLIC_SERVER_URL?.replace(/\/$/, '') ?? 'https://vvmadvocacia.adv.br'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
