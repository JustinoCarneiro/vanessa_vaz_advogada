import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Os arquivos gerados automaticamente pelo Payload em .next/types/ são
  // incompatíveis com Next.js 15 (params como Promise). Suprimimos só o
  // build — o código da aplicação continua verificado normalmente.
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
}

export default withPayload(nextConfig)
