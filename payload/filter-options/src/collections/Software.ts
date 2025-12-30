import {type CollectionConfig, slugField} from 'payload'

export const Software: CollectionConfig = {
  slug: 'software',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    slugField({useAsSlug: 'name'}),
    {
      type: 'checkbox',
      name: 'isDiscontinued',
      defaultValue: false,
    },
    {
      type: 'text',
      name: 'name',
      required: true
    },
    {
      type: 'relationship',
      relationTo: 'brands',
      name: 'brand',
    }
  ]
}