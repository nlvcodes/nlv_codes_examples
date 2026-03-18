// @/collections/Posts.ts
import { CollectionConfig, slugField } from 'payload'
import { BlocksFeature, lexicalEditor } from '@payloadcms/richtext-lexical'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    slugField(),
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'body',
      type: 'richText',
      editor: lexicalEditor({
        features: ({defaultFeatures}) => ([
          ...defaultFeatures,
          BlocksFeature({
            blocks: [
              {
                slug: 'textAndMedia',
                interfaceName: 'TextAndMediaProps',
                fields: [
                  {
                    name: 'text',
                    type: 'richText',
                  },
                  {
                    name: 'media',
                    type: 'upload',
                    relationTo: 'media',
                  }
                ]
              }
            ]
          })
        ])
      }),
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
    }
  ],
}