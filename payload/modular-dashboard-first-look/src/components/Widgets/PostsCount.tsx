import { getPayload } from 'payload'
import config from '@payload-config'
import {Button, Link} from '@payloadcms/ui'
import { getServerSideURL } from '@/utilities/getURL'
import { Post } from '@/payload-types'
import { Author } from 'next/dist/lib/metadata/types/metadata-types'

export const PostCount = async () => {
  const payload = await getPayload({ config })
  const collections = await payload.find({
    collection: 'posts',
    sort: '-createdAt',
    depth: 2,
  })
  const mostRecentPost = collections.docs[0]
  const latestAuthor = (mostRecentPost as Post)?.populatedAuthors?.[0] as Author
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#F5F5F5',
          padding: '1rem',
          borderRadius: '0.5rem',
          border: '1px solid #E5E7EB',
        }}
      >
        <h3 style={{ marginBottom: '1rem' }}>Post Count</h3>
        <div>
          <p style={{ fontSize: '1.2rem' }}>{collections.totalDocs}</p>
        </div>
        <div>
          <Link href={`/admin/collections/posts/create`}>
            <Button size={'small'}>Add Post</Button>
          </Link>
        </div>
        <hr />
        <div>
          Last post published by: {latestAuthor?.name}
        </div>
      </div>
    </>
  )
}

export default PostCount
