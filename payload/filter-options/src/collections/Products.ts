import { type CollectionConfig, slugField } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    slugField({useAsSlug: 'name'}),
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      type: 'relationship',
      relationTo: 'brands',
      name: 'brand',
    },
    {
      type: 'number',
      name: 'stock',
    }
  ]
}