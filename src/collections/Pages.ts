import {type CollectionConfig, slugField} from 'payload'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    slugField(),
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media'
    },
    {
      name: 'posts',
      type: 'relationship',
      relationTo: 'posts'
    }
  ]
}