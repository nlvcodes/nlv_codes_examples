// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig, PayloadRequest, TaskConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { resendAdapter } from '@payloadcms/email-resend'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import {Posts} from './collections/Posts/config'
import { schedulePublish } from '@/utilities/jobs/schedulePublish'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
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
  email: resendAdapter({
    defaultFromAddress: 'nick@midlowebdesign.com',
    defaultFromName: 'Nick',
    apiKey: process.env.RESEND_API || '',
  }),
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }) => {
        if (req.user) return true
        return `Bearer ${process.env.CRON_SECRET}` === req.headers.get('Authorization')
      },
    },
    tasks: [
      {
        slug: 'healthCheck',
        handler: async ({ req }) => {
          const results = {
            timestamp: new Date().toISOString(),
            errors: [] as string[],
            checks: {
              database: false,
              api: false,
            },
          }
          try {
            try {
              await req.payload.find({
                collection: 'users',
                limit: 1,
              })
              results.checks.database = true
            } catch (e) {
              // be sure you have your email adapater configured
              await req.payload.sendEmail({
                to: 'nick@nlvogel.com',
                html: `Health check failed: ${e instanceof Error ? e.message : 'Unknown error'}`,
              })
              results.errors.push('Database check failed.')
            }

            try {
              const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

              const response = await fetch(`${serverUrl}/api/health`)
              if (response.ok) {
                results.checks.api = true
              } else {
                results.errors.push(`API health check returned ${response.status}`)
              }
            } catch (e) {
              results.errors.push('API check failed')
            }

            const allHealthy = Object.values(results.checks).every((check) => check)
            if (!allHealthy) {
              req.payload.logger.error('Health check failed')
              await req.payload.sendEmail({
                to: 'nick@nlvogel.com',
                html: `<h2>Health check failed</h2>`,
              })
            } else {
              req.payload.logger.info('All systems healthy')
            }

            return { output: results }
          } catch (e) {
            req.payload.logger.error('Health check error')
            throw e
          }
        },
        retries: 1,
      } as TaskConfig<'healthCheck'>,
      schedulePublish as TaskConfig<'schedulePublish'>,
    ],
  },
})
