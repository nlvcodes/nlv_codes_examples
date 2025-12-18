import { CollectionConfig, slugField } from 'payload'
import { lexicalHTMLField } from '@payloadcms/richtext-lexical'

export const Posts: CollectionConfig = {
  slug: 'posts',
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
    },
    lexicalHTMLField({
      lexicalFieldName: 'body',
      htmlFieldName: 'html',
    })
  ]
}