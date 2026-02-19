import type { CollectionConfig } from 'payload'
import { googleAuth } from '@/api/users/auth/google'
import { googleCallback } from '@/api/users/auth/google/callback'
import { googleStrategy } from '@/lib/auth/strategy'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    cookies: {
      domain: process.env.NEXT_PUBLIC_SERVER_HOSTNAME!,
      sameSite: 'Lax',
      secure: process.env.NODE_ENV === 'production',
    },
    loginWithUsername: {
      allowEmailLogin: true,
      requireEmail: true,
      requireUsername: true,
    },
    maxLoginAttempts: 5,
    strategies: [googleStrategy],
    tokenExpiration: 60 * 60 * 24 * 7,
    useSessions: true,
  },
  endpoints: [googleAuth, googleCallback],
  fields: [
    {
      tabs: [
        {
          fields: [
            {
              fields: [
                {
                  name: 'providerUserId',
                  type: 'text',
                  admin: {
                    hidden: true,
                    readOnly: true,
                  },
                },
                {
                  name: 'accessToken',
                  type: 'text',
                  admin: {
                    hidden: true,
                    readOnly: true,
                  },
                },
                {
                  name: 'refreshToken',
                  type: 'text',
                  admin: {
                    hidden: true,
                    readOnly: true,
                  },
                },
                {
                  name: 'tokenType',
                  type: 'text',
                  admin: {
                    hidden: true,
                    readOnly: true,
                  },
                },
                {
                  name: 'idToken',
                  type: 'text',
                  admin: {
                    hidden: true,
                    readOnly: true,
                  },
                },
                {
                  name: 'tokenExpiry',
                  type: 'date',
                  admin: {
                    hidden: true,
                    readOnly: true,
                  },
                },
                {
                  name: 'refreshTokenExpiry',
                  type: 'date',
                  admin: {
                    hidden: true,
                    readOnly: true,
                  },
                },
                {
                  name: 'tokenIssuedAt',
                  type: 'date',
                  admin: {
                    hidden: true,
                    readOnly: true,
                  },
                },
                {
                  name: 'authProvider',
                  type: 'select',
                  options: [
                    {
                      label: 'Google',
                      value: 'google',
                    }
                  ]
                }
              ],
              label: 'Strategies',
              name: 'authStrategies',
              type: 'array',
            },
          ],
          label: 'External ID',
          name: 'externalId',
        },
      ],
      type: 'tabs'
    },
  ],
}
