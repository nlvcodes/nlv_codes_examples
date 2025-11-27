import { getPayload } from 'payload'
import React from 'react'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import { unstable_cache } from 'next/cache'

// export const revalidate = 5

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const payload = await getPayload({ config })
  const {docs} = await payload.find({
    collection: 'pages',
    limit: 0
  })

  return docs.map((doc) => ({
    slug: doc.slug,
  }))
}

export default async function Page({params}: PageProps) {
  const payload = await getPayload({ config })
  const {slug = 'home'} = await params
  const page = await queryPageBySlug({slug})

  const {docs} = await payload.find({
    collection: 'pages',
    limit: 0
  })

  if (!page) {
    return notFound()
  }

  // payload.logger.info('revalidated')

  return (
    <div>
      <h1 style={{color: '#efefef'}}>{page.title}</h1>
      <hr/>
      <p style={{color: '#efefef'}}>{page.text}</p>
      {slug === 'home' && (
        <ul>
          {docs.map((doc) => (
            <li style={{ color: 'white' }} key={doc.id}>{doc.title}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

const queryPageBySlug = unstable_cache(
  async ({slug = 'home'}: {slug: string}) => {
    const payload = await getPayload({config})
    return await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: slug
        }
      },
    }).then(res => res.docs[0])
  },
  [],
  {
    tags: ['pages']
  }
)
