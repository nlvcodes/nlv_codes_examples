import { CollectionConfig, type TextField } from 'payload'
import { slugField } from 'payload'
import slugify from 'slugify'

export const Page: CollectionConfig = {
  slug: 'pages',
  versions: {
    drafts: {
      localizeStatus: true
    },
  },
  admin: {
    groupBy: true,
    formatDocURL: ({ defaultURL }) => {
      return defaultURL
    },
    components: {
      edit: {
        Status: '/components/settingsMenuItem/index.tsx',
      },
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
          { label: 'New York', value: '-08:30' },
          { label: 'Los Angeles', value: 'America/Los_Angeles' },
        ],
        override: ({ baseField }) => ({
          ...baseField,
          admin: {
            ...baseField.admin,
            disableListColumn: true,
          },
        }),
      },
    },
    slugField({
      fieldToUse: 'text',
      useAsSlug: 'text',
      slugify: ({ valueToSlugify }) => slugify(valueToSlugify, { lower: true }),
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
