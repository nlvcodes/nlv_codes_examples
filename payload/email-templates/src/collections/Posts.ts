import { CollectionConfig, slugField } from 'payload'
import { Media } from '@/payload-types'
import NewPostAlert from '../../emails/new-post-alert'
import { render } from '@react-email/components'

export const Posts: CollectionConfig = {
  slug: 'posts',
  fields: [
    slugField(),
    {type: 'text', name: 'title'},
    {
      type: 'richText',
      name: 'summary',
    },
    {
      type: 'upload',
      name: 'image',
      relationTo: 'media'
    },
    {
      type: 'date',
      name: 'date'
    }
  ],
  hooks: {
    afterChange: [
      async ({req: {payload}, operation, doc}) => {
      if (operation === 'create') {
        const {url, ...rest} = doc.image as Media
        const html = await render(
          NewPostAlert({
            ...doc,
            image: {
              url: `${process.env.PAYLOAD_PUBLIC_SERVER_URL}${url}`,
              ...rest
            },
          }),
        )
        await payload.sendEmail({
          to: ['nick@nlvogel.com'],
          subject: `New post, ${doc.title}, is now available!`,
          html
        })
      }
      }
    ]
  }
}