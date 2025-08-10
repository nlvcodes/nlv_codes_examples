import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  disableBulkEdit: false,
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    useSessions: false
  },
  fields: [
    {
      type: 'select',
      name: 'roles',
      hasMany: true,
      options: [
        'admin',
        'user'
      ]
    }
  ],
}
