import type { CollectionConfig } from 'payload'
import { lexicalEditor, BlocksFeature, UploadFeature } from '@payloadcms/richtext-lexical'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  enableQueryPresets: true,
  auth: true,
  fields: [
    {
      type: 'richText',
      name: 'lexical',
      editor: lexicalEditor({
        admin: {
          hideAddBlockButton: true,
          hideDraggableBlockElement: true,
        },
        features: () => [
          UploadFeature({}),
          BlocksFeature({
            blocks: [
              {
                slug: 'testBlock',
                fields: [
                  {
                    type: 'text',
                    name: 'Text',
                  },
                ],
              },
            ],
          }),
        ],
      }),
    },
    {
      type: 'blocks',
      name: 'blocks',
      blocks: [
        {
          slug: 'testBlock',
          fields: [
            {
              type: 'text',
              name: 'Text',
            },
          ],
        },
      ],
    },
    // Email added by default
    // Add more fields as needed
  ],
}
