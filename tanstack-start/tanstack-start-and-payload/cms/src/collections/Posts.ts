import {CollectionConfig, slugField } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  fields: [
    slugField(),
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    }
  ]
}