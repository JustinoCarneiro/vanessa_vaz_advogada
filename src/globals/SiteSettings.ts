import type { GlobalConfig } from 'payload'
import { ICONES_OPTIONS } from '@/components/servicos/servicosIcons'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Fotos e Serviços',
  admin: {
    group: 'Configurações',
    description: 'Atualize as fotos do site e o conteúdo dos cards de serviços.',
  },
  fields: [
    {
      name: 'sobreFoto',
      label: 'Foto — Sobre Mim',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description:
          'Foto da advogada exibida na página "Sobre Mim" e na home. ' +
          'Use uma foto em formato retrato (vertical), de preferência com rosto e ombros visíveis no centro. ' +
          'Tamanho mínimo recomendado: 800 × 1000 px. Máximo: 5 MB.',
      },
    },
    {
      name: 'escritorioFoto',
      label: 'Foto — Escritório',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description:
          'Foto do ambiente exibida na página "Sobre o Escritório". ' +
          'Use uma foto em formato paisagem (horizontal), mostrando a mesa, sala ou fachada. ' +
          'Tamanho mínimo recomendado: 1200 × 800 px. Máximo: 5 MB.',
      },
    },
    {
      name: 'servicos',
      label: 'Serviços',
      type: 'array',
      minRows: 1,
      maxRows: 7,
      admin: {
        description: 'Edite título, descrição, ícone e itens de cada serviço.',
        initCollapsed: true,
      },
      fields: [
        {
          name: 'icone',
          label: 'Ícone',
          type: 'select',
          required: true,
          defaultValue: 'escudo',
          options: ICONES_OPTIONS,
          admin: {
            description: 'Escolha o ícone que representa este serviço.',
          },
        },
        {
          name: 'titulo',
          label: 'Título',
          type: 'text',
          required: true,
        },
        {
          name: 'descricao',
          label: 'Descrição',
          type: 'textarea',
          required: true,
        },
        {
          name: 'itens',
          label: 'Itens (bullets)',
          type: 'array',
          minRows: 1,
          maxRows: 5,
          fields: [
            {
              name: 'item',
              label: 'Item',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
