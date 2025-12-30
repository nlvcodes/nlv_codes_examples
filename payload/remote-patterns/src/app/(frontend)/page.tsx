import { getPayload } from 'payload'
import React from 'react'
import config from '@/payload.config'
import Image from 'next/image'

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const image = await payload.find({
    collection: 'media',
    limit: 1,
  }).then(res => res.docs[0])

  const {url, width, height, alt} = image

  return (
    <div>
      <Image src={url!} alt={alt} width={width || 400} height={height || 400} />
    </div>
  )
}
