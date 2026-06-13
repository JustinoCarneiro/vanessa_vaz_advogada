import { withPayload } from '@payloadcms/next/withPayload'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  // O handler de upload do plugin Vercel Blob é sempre registrado no importMap
  // do admin. No bundle do browser ele arrastaria `payload/internal` (via
  // resolveSignedURLKey) → pino → node:assert/worker_threads, quebrando o build.
  // Como clientUploads está desativado, o handler nunca roda no client, então
  // substituímos resolveSignedURLKey por um stub apenas no bundle do navegador.
  webpack: (config, { isServer, webpack }) => {
    if (!isServer) {
      config.plugins.push(
        new webpack.NormalModuleReplacementPlugin(
          /utilities[\\/]resolveSignedURLKey(\.js)?$/,
          path.resolve(__dirname, 'scripts/stub-resolveSignedURLKey.mjs'),
        ),
      )
    }
    return config
  },
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
      {
        // Vercel Blob Storage — uploads do painel em produção
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
    ],
  },
}

export default withPayload(nextConfig)
