import { CollectionConfig, slugField } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  fields: [
    slugField(),
    {
      type: 'textarea',
      name: 'summary',
      admin: {
        rows: 3
      }
    },
    {
      type: 'upload',
      name: 'image',
      relationTo: 'media'
    },
    {
      type: 'date',
      name: 'date'
    }
  ]
}