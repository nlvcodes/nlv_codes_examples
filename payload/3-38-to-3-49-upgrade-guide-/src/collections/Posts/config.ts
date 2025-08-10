import type {CollectionConfig} from 'payload'
import { FixedToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { CustomIcon } from '@/app/components/CustomIcon'

export const Posts: CollectionConfig = {
  slug: 'posts',
  trash: true,
  admin: {
    groupBy: true,
  },
  folders: {
    browseByFolder: false,
  },
  fields: [
    {
      type: 'text',
      name: 'category'
    },
    {
      type: 'array',
      name: 'copyAndPasteArray',
      fields: [
        {
          type: 'text',
          name: 'copy'
        }
      ]
    },
    {
      type: 'upload',
      name: 'media',
      relationTo: 'media'
    },
    {
      type: 'checkbox',
      name: 'noOption1',
    },
    {
      name: 'select',
      type: 'select',
      options: [
        {
          label: 'One',
          value: 'one',
        },
        {
          label: 'Two',
          value: 'two',
        },
        {
          label: 'Three',
          value: 'three',
        },
      ],
      filterOptions: ({options, data, siblingData, req: {user, payload}}) => !user?.roles?.includes('admin')
        ? options.filter(
          (option) => (typeof option === 'string' ? option : option.value) !== 'one'
        ) : options,
    },
    {
      type: 'group',
      name: 'namedGroup',
      fields: [
        { type: 'text', name: 'name' }
      ]
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({defaultFeatures}) => [
          ...defaultFeatures,
          FixedToolbarFeature({
            customGroups: {
              'text': {
                order: 100,
                type: 'buttons'
              }
            }
          })
        ]
      })
    },
    {
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          validate: (value: any, args: any) => args.overrideAccess && value
        },
        { name: 'description', type: 'text' },
      ]
    }
  ],
  hooks: {
    beforeOperation: [
      async ({operation, req: {payload}}) => {
      // await payload.findDistinct({
      //   collection: 'posts',
      //   field: 'title'
      // })
        if (operation === 'resetPassword') {}
      }
    ],
    afterChange: [
      async ({data}) => {
        console.log(data)
      }
    ]
  }
}