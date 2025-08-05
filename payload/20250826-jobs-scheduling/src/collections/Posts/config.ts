import {CollectionConfig} from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  versions: {
    drafts: {
      schedulePublish: true,
    }
  },
  fields: [
    {
      type: 'text',
      name: 'title',
    },
    {
      type: 'text',
      name: 'slug',
    },
  ]
}