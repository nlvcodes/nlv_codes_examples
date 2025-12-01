import { type CollectionConfig, slugField } from 'payload'

export const Posts: CollectionConfig<'posts'> = {
  slug: 'posts',
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
      name: 'category',
      type: 'relationship',
      relationTo: 'categories'
    }
  ]
}