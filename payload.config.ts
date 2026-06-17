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

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

// Aceita www e não-www como origens válidas para CSRF (evita 403 ao fazer upload
// quando o usuário acessa pelo domínio alternativo ao definido em NEXT_PUBLIC_SERVER_URL).
const extraOrigins = serverURL.includes('://www.')
  ? [serverURL.replace('://www.', '://')]
  : [serverURL.replace('://', '://www.')]

const blobToken = process.env.BLOB_READ_WRITE_TOKEN

// Em qualquer deploy na Vercel o filesystem é somente-leitura (exceto /tmp), então
// o Vercel Blob é OBRIGATÓRIO para uploads. Sem o token, o plugin abaixo fica
// ausente, `disableLocalStorage` continua `false` e o Payload tenta gravar o
// arquivo em disco — o que falha com EROFS e devolve um 500 genérico
// ("Something went wrong.") ao salvar imagens no painel. Falhamos cedo e com
// mensagem clara, em vez de degradar silenciosamente para o disco.
if (process.env.VERCEL && !blobToken) {
  throw new Error(
    'BLOB_READ_WRITE_TOKEN ausente neste deploy da Vercel. Conecte um Blob Store ' +
      'PUBLIC ao projeto e defina a variável no ambiente de Production; depois ' +
      'refaça o deploy. Sem ela, os uploads de mídia falham porque o filesystem ' +
      'serverless é somente-leitura.',
  )
}

export default buildConfig({
  serverURL,
  cors: [serverURL, ...extraOrigins],
  csrf: [serverURL, ...extraOrigins],
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
    // Sincroniza o schema automaticamente ao inicializar (sem migrations manuais).
    // Seguro para MVP com admin único — equivalente ao `db push` do drizzle.
    push: true,
  }),
  editor: lexicalEditor(),
  plugins: [
    // Só incluímos o plugin quando há token (produção no Vercel com Blob Store).
    // Passar `enabled: false` não basta: o plugin ainda injeta o componente
    // VercelBlobClientUploadHandler no admin, que precisa estar no importMap.
    // Mantê-lo totalmente ausente sem token evita esse acoplamento.
    ...(blobToken
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
            token: blobToken,
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
