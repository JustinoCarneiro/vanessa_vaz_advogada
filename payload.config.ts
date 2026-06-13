import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

import { Users } from './src/collections/Users'
import { Posts } from './src/collections/Posts'
import { Categories } from './src/collections/Categories'
import { ContactMessages } from './src/collections/ContactMessages'
import { Media } from './src/collections/Media'
import { SiteSettings } from './src/globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  admin: {
    user: Users.slug,
    meta: {
      title: 'VVM Advocacia — Painel',
      description: 'Painel de administração — Vanessa Vaz Marschallinger',
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Posts, Categories, ContactMessages, Media],
  globals: [SiteSettings],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  editor: lexicalEditor(),
  plugins: [
    // Só incluímos o plugin quando há token (produção no Vercel com Blob Store).
    // Passar `enabled: false` não basta: o plugin ainda injeta o componente
    // VercelBlobClientUploadHandler no admin, que precisa estar no importMap.
    // Mantê-lo totalmente ausente sem token evita esse acoplamento.
    ...(process.env.BLOB_READ_WRITE_TOKEN
      ? [
          vercelBlobStorage({
            enabled: true,
            collections: {
              media: {
                // Desativa o proxy do Payload para arquivos de mídia.
                // Com true, afterRead usa adapter.generateURL → URL direta do Blob CDN
                // (*.public.blob.vercel-storage.com já está em next.config remotePatterns).
                disablePayloadAccessControl: true,
              },
            },
            token: process.env.BLOB_READ_WRITE_TOKEN,
          }),
        ]
      : []),
  ],
  sharp,
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  upload: {
    limits: {
      fileSize: 5_000_000,
    },
  },
})
