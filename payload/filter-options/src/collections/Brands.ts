import { type CollectionConfig, slugField } from 'payload'

export const Brands: CollectionConfig = {
  slug: 'brands',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    slugField({useAsSlug: 'name'}),
    {
      name: 'name',
      type: 'text',
      required: true
    }
  ]
}