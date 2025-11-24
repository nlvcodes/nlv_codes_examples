import { CollectionConfig, slugField } from 'payload'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    slugField(),
    {
      name: 'text',
      type: 'text',
    }
  ]
}

export default Pages