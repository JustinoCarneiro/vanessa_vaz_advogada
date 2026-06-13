import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Administrador',
    plural: 'Administradores',
  },
  admin: {
    useAsTitle: 'email',
    group: 'Configurações',
    description: 'Conta de acesso ao painel. Altere sua senha aqui se necessário.',
    hidden: ({ user }) => Boolean(user),
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nome',
    },
  ],
}
