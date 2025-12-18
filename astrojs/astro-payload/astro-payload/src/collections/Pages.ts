import { CollectionConfig, slugField } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  fields: [
    slugField(),
    {
      type: 'text',
      name: 'title',
      required: true,
    },
    {
      type: 'richText',
      name: 'body',
      required: true,
    }
  ]
}