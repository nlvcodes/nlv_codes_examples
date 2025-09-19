// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Settings } from '@/globals/config'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const iconUrl = 'http://localhost:3000/api/media/file/Square%20light.png'
const darkIconUrl = 'http://localhost:3000/api/media/file/Square.png'
const openGraphImageUrl = 'http://localhost:3000/api/media/file/nlv_codes.png'

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      graphics: {
        Logo: '/graphics/Logo/index.tsx#Logos',
        Icon: '/graphics/Icon/index.tsx#Icons',
      }
    },
    meta: {
      icons: [
        {
          fetchPriority: 'high',
          sizes: '32x32',
          type: 'image/png',
          rel: 'icon',
          url: iconUrl,
        },
        {
          fetchPriority: 'high',
          sizes: '32x32',
          type: 'image/png',
          rel: 'icon',
          url: darkIconUrl,
          media: '(prefers-color-scheme: dark)',
        }
      ],
      // title: 'Example',
      titleSuffix: '- White Label',
      description: 'A white label template for Payload CMS',
      applicationName: 'White Label Example',
      openGraph: {
        title: 'White Label Example',
        description: 'A white label template for Payload CMS',
        siteName: 'White Label Example',
        images: [
          {
            url: openGraphImageUrl
          }
        ]
      }
    }
  },
  collections: [Users, Media],
  globals: [Settings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})
