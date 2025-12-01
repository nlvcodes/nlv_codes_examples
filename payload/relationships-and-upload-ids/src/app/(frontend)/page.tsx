import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import type { Category, Post } from '@/payload-types'

import config from '@/payload.config'
import './styles.css'

export default async function HomePage() {
  const payload = await getPayload({config})
  const {docs} = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'home'
      }
    },
    depth: 0
  })

  // console.log(docs[0])

  const image = docs[0].image
  const post = docs[0].posts as Post

  const {title, slug, id} = post

  const filename = typeof image !== 'string' ? image?.filename : undefined
  const categoryTitle = (post.category as Category)?.title

  console.log(
  'filename:', filename,
  '\ncategoryTitle:', categoryTitle,
  '\npostTitle:', title,
  '\npostSlug:', slug,
  '\npostId:', id
)

  return <h1>Home Page</h1>
}
