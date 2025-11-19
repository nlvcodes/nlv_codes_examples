// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { is } from '@payloadcms/translations/languages/is'
import { en } from '@payloadcms/translations/languages/en'
import { ta } from '@payloadcms/translations/languages/ta'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Page } from '@/collections/Page'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    autoRefresh: true,
    user: Users.slug,
    toast: {
      duration: 10000,
      limit: 1,
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  i18n: {
    supportedLanguages: { en, is, ta },
  },
  collections: [Users, Media, Page],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    // storage-adapter-placeholder
  ],
  jobs: {
    tasks: [
      {
        slug: 'testTask',
        onFail: ({ input, job, req: { payload }, taskStatus }) => {},
        onSuccess: (args) => {},
        handler: (args) => {
          return { output: 'test' }
        },
      },
    ],
  },
})
