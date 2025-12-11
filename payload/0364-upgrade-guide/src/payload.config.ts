// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig, inMemoryKVAdapter } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { is } from '@payloadcms/translations/languages/is'
import { en } from '@payloadcms/translations/languages/en'
import { ta } from '@payloadcms/translations/languages/ta'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Page } from '@/collections/Page'
import { Documents } from '@/collections/Documents'
import { adapter } from 'next/dist/server/web/adapter'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  kv: inMemoryKVAdapter(),
  localization: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'fr']
  },
  admin: {
    components: {
      settingsMenu: [
        {
          path: '@/components/settingsMenuItem/index.tsx',
        },
      ],
    },
    autoRefresh: true,
    user: Users.slug,
    toast: {
      duration: 10000,
      limit: 1,
      position: 'bottom-center'
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  i18n: {
    supportedLanguages: { en, is, ta },
  },
  collections: [Users, Media, Page, Documents],
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
    access: {
      queue: ({ req }) => req?.user?.email === 'nick@nlvogel.com',
      cancel: ({ req }) => req?.user?.email === 'nick@nlvogel.com',
    },
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
