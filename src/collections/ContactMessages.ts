import type { CollectionConfig } from 'payload'

export const ContactMessages: CollectionConfig = {
  slug: 'contact-messages',
  admin: {
    useAsTitle: 'subject',
    defaultColumns: ['name', 'email', 'subject', 'read', 'createdAt'],
    description: 'Mensagens recebidas pelo formulário de contato.',
  },
  access: {
    create: () => true,
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nome',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'E-mail',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Telefone',
    },
    {
      name: 'subject',
      type: 'text',
      required: true,
      label: 'Assunto',
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
      label: 'Mensagem',
    },
    {
      name: 'read',
      type: 'checkbox',
      label: 'Lida',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}
