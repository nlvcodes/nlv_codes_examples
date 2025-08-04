import {CollectionConfig} from 'payload'

export const Page: CollectionConfig = {
  slug: 'pages',
  fields: [
    {
      type: 'text',
      name: 'slug',
    },
    {
      type: 'text',
      name: 'title',
    }
  ],
}