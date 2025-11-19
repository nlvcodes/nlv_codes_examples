import {CollectionConfig} from 'payload'
import {slugField} from 'payload'

export const Page: CollectionConfig = {
  slug: 'pages',
  admin: {
    groupBy: true,
    formatDocURL: ({ defaultURL }) => {
      return defaultURL
    },
  },
  fields: [
    slugField({
      fieldToUse: 'text',
      checkboxName: 'Generate',
    }),
    {
      type: 'text',
      name: 'text',
      admin: {
        // disableGroupBy: true,
      },
    },
    {
      type: 'checkbox',
      name: 'featured',
    },
    {
      name: 'testBlocks',
      type: 'blocks',
      filterOptions: ({ data, user }) => {
        const featured = data.featured

        if (user?.email === 'nick@nlvogel.com') return true

        return featured ? [data.featured] : true
      },
      blocks: [
        {
          slug: 'block1',
          fields: [{ type: 'text', name: 'block1Text' }],
        },
        {
          slug: 'block2',
          fields: [{ type: 'text', name: 'block2Text' }],
        },
      ],
    },
  ],
}