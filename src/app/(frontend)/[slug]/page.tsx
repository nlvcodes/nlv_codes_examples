import { getPayload } from 'payload'
import React from 'react'
import config from '@/payload.config'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function Page({params}: PageProps) {
  const payload = await getPayload({ config })
  const {slug = 'home'} = await params
  const { title, text } = await payload
    .find({
      collection: 'pages',
      where: {
        slug: {
          equals: slug,
        },
      },
    })
    .then((res) => res.docs[0])

  return (
    <div>
      <h1 style={{color: '#efefef'}}>{title}</h1>
      <hr/>
      <p style={{color: '#efefef'}}>{text}</p>
    </div>
  )
}
