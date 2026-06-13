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

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
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
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  editor: lexicalEditor(),
  plugins: [
    vercelBlobStorage({
      // Ativo apenas quando a variável estiver presente (produção no Vercel)
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
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
