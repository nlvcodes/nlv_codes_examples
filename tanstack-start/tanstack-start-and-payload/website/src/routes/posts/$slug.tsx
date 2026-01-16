import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import {z} from 'zod'
import { Media, Post } from 'cms/src'
import { PaginatedDocs } from 'payload'
import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'

export const Route = createFileRoute('/posts/$slug')({
  component: RouteComponent,
  loader: async ({params: {slug}}) => await getPostBySlug({data: {slug}})
})

export const getPostBySlug = createServerFn()
  .inputValidator(z.object({ slug: z.string() }))
  .handler(async ({ data }) => {
    const { getPayload } = await import('payload')
    const { config } = await import('../../../../cms/src')
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'posts',
      limit: 1,
      where: {
        slug: {
          equals: data.slug,
        },
      },
    })
    return JSON.parse(JSON.stringify(result))
  })

function RouteComponent() {
  const post = Route.useLoaderData()
  const { title, image, content } = (post as unknown as PaginatedDocs<Post>)?.docs[0]

  if (!post) {
    return <div>Loading...</div>
  }

  const featuredImage = image as Media

  return (
    <div className={'m-8'}>
      <h1 className={'text-5xl text-bold'}>{title}</h1>
      {featuredImage && (
        <div>
          <img
            src={`http://localhost:3001${featuredImage.url!}`}
            alt={featuredImage.alt || ''}
            width={640}
            height={360}
          />
        </div>
      )}
      {content && <div dangerouslySetInnerHTML={{ __html: convertLexicalToHTML({data: content}) }}/>}
    </div>
  )
}
