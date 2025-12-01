import {type CollectionConfig, slugField} from 'payload'

export const Categories: CollectionConfig<'categories'> = {
  slug: 'categories',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    slugField()
  ]
}