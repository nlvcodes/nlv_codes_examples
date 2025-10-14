'use server'
import { getPayload } from 'payload'
import config from '@payload-config'
import {revalidatePath} from 'next/cache'

export async function submit(formData: FormData) {
  const payload = await getPayload({ config })
  const title = formData.get('title') as string
  console.log(`${title} logged`)
  await payload.create({
    collection: 'submissions',
    data: {
      title,
    },
  })
  revalidatePath('/')
}