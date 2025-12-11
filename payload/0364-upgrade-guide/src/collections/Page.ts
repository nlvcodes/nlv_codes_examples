import { CollectionConfig, type TextField } from 'payload'
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
    {
      type: 'upload',
      name: 'upload',
      relationTo: ['media', 'documents'],
    },
    {
      type: 'date',
      name: 'date',
      timezone: {
        defaultTimezone: 'UTC',
        supportedTimezones: [
          { label: 'Coordinated Universal Time', value: 'UTC' },
          { label: 'New York', value: 'America/New_York' },
          { label: 'Los Angeles', value: 'America/Los_Angeles' },
        ],
      },
    },
    slugField({
      fieldToUse: 'text',
      checkboxName: 'Generate',
      overrides: (field) => {
        ;(field.fields[1] as TextField).label = 'Custom'
        return field
      },
    }),
    {
      type: 'text',
      localized: true,
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