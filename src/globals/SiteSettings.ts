import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Configurações do Site',
  fields: [
    {
      name: 'sobreFoto',
      label: 'Foto — Sobre Mim',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Foto da advogada exibida na página "Sobre Mim".',
      },
    },
    {
      name: 'escritorioFoto',
      label: 'Foto — Escritório',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Foto do ambiente exibida na página "Sobre o Escritório".',
      },
    },
    {
      name: 'servicos',
      label: 'Serviços',
      type: 'array',
      minRows: 6,
      maxRows: 6,
      admin: {
        description:
          'Edite título, descrição e itens de cada serviço. Mantenha a ordem: ' +
          '1 Aposentadorias · 2 Aposentadoria Especial · 3 Incapacidade · ' +
          '4 BPC/LOAS · 5 Pensão por Morte · 6 Revisão.',
        initCollapsed: true,
      },
      fields: [
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
