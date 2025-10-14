'use server'
import {getPayload} from 'payload'
import config from '@payload-config'
import {revalidatePath} from 'next/cache'

export async function deleteItem(id: string) {
  const payload = await getPayload({config})
  await payload.delete({
    collection: 'submissions',
    id
  })
  console.log(`item ${id} deleted successfully.`)
  revalidatePath('/')
  return {message: 'successfully delete item.'}
}