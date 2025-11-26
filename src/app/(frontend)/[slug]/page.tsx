import { getPayload } from 'payload'
import React from 'react'
import config from '@/payload.config'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function Page({params}: PageProps) {
  const payload = await getPayload({ config })
  const {slug = 'home'} = await params
  const page = await payload
    .find({
      collection: 'pages',
      where: {
        slug: {
          equals: slug,
        },
      },
    })
    .then((res) => res.docs[0])

  if (!page) {
    return notFound()
  }

  return (
    <div>
      <h1 style={{color: '#efefef'}}>{page.title}</h1>
      <hr/>
      <p style={{color: '#efefef'}}>{page.text}</p>
    </div>
  )
}
