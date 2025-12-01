import { CollectionConfig, slugField } from 'payload'
import { revalidateDelete, revalidatePage } from '@/collections/hooks/revalidatePage'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    slugField(),
    {
      name: 'text',
      type: 'text',
    }
  ],
  hooks: {
    afterChange: [
      revalidatePage,
    ],
    afterDelete: [
      revalidateDelete
    ]
  }
}

export default Pages