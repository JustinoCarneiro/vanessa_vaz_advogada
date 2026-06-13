import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Arquivo',
    plural: 'Arquivos e Imagens',
  },
  admin: {
    description: 'Imagens enviadas para o site. Formatos aceitos: JPG, PNG, WebP e SVG.',
    group: 'Configurações',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Texto alternativo (acessibilidade)',
      admin: {
        description: 'Descreva a imagem para leitores de tela e SEO.',
      },
    },
  ],
  upload: {
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 900,
        height: 600,
        position: 'centre',
      },
      {
        name: 'hero',
        width: 1800,
        height: undefined,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'],
  },
}
