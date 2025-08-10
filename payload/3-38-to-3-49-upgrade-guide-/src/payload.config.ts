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

import { en } from '@payloadcms/translations/languages/en'
import { lv } from '@payloadcms/translations/languages/lv'
import { bnBD } from '@payloadcms/translations/languages/bn-BD'
import { id } from '@payloadcms/translations/languages/id'
import { Posts } from '@/collections/Posts/config'
import { s3Storage } from '@payloadcms/storage-s3'
import {formBuilderPlugin} from '@payloadcms/plugin-form-builder'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  i18n: {
    supportedLanguages: { en, lv, 'bn-BD': bnBD, id },
  },
  queryPresets: {
    filterConstraints: ({req, options}) => (
      !req.user?.roles?.includes('admin')
        ? options.filter(
          (option) => (typeof option === 'string' ? option : option.value) !== 'user'
        ) : options
    ),
    access: {},
    constraints: {},
  },
  folders: {
    slug: 'payload-folders',
    browseByFolder: false,
  },
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    autoLogin: {
      email: 'nick@midlowebdesign.com',
      password: 'test',
    }
  },
  collections: [Users, Media, Posts],
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
    formBuilderPlugin({
      fields: {
        date: true,
      }
    }),
    // s3Storage({
    //   collections: {
    //     media: { signedDownloads: {
    //       expiresIn: 3600,
    //         shouldUseSignedURL: ({collection, filename, req}) => {
    //         if (filename.includes('private')) {
    //           return true
    //         }
    //         return false
    //         }
    //     } },
    //   },
    //   bucket: process.env.S3_BUCKET || '',
    //   config: {
    //     credentials: {
    //       accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
    //       secretAccessKey: process.env.S3_SECRET || '',
    //     },
    //     region: 'auto',
    //     endpoint: process.env.S3_ENDPOINT || '',
    //   },
    // })
  ],
})
