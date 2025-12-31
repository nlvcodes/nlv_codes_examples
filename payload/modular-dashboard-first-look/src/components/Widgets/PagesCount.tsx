import { getPayload } from 'payload'
import config from '@payload-config'
import { Button, Link } from '@payloadcms/ui'

export const PageCount = async () => {
  const payload = await getPayload({ config })
  const collections = await payload.find({
    collection: 'pages',
  })
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#F5F5F5',
          padding: '1rem',
          borderRadius: '0.5rem',
          border: '1px solid #E5E7EB'
        }}
      >
        <h3 style={{ marginBottom: '1rem' }}>Page Count</h3>
        <div>
          <p style={{ fontSize: '1.2rem' }}>{collections.totalDocs}</p>
        </div>
        <div>
          <Link href={`/admin/collections/pages/create`}>
            <Button size={"small"}>Add Page</Button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default PageCount
