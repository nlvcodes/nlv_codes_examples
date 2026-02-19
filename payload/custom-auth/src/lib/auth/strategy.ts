import crypto from 'crypto'
import { google } from 'googleapis'
import type { AuthStrategy, AuthStrategyResult } from 'payload'

import type { User } from '@/payload-types'
import { getServerSideURL } from '@/utils/getUrl'
import { mergeAuth } from '@/utils/mergeAuth'

interface SessionUser extends User {
  _sid?: string
  _strategy?: string
  collection: 'users'
}

const clientId = process.env.GOOGLE_BUSINESS_CLIENT_ID!
const clientSecret = process.env.GOOGLE_BUSINESS_CLIENT_SECRET!

export const googleStrategy: AuthStrategy = {
  async authenticate({ headers, payload }): Promise<AuthStrategyResult> {
    const code = headers.get('x-oauth-code')
    const codeVerifier = headers.get('x-oauth-code-verifier')
    const strategy = headers.get('x-auth-strategy')

    const provider = 'google' as const

    if (strategy !== provider) return { user: null }
    if (!code || !codeVerifier) return { user: null }

    try {
      const oauth2Client = new google.auth.OAuth2({
        clientId,
        clientSecret,
        redirectUri: `${getServerSideURL()}/api/users/auth/google/callback`,
      })

      const { tokens } = await oauth2Client.getToken({ code, codeVerifier })
      if (!tokens.id_token) return { user: null }

      const verify = await oauth2Client.verifyIdToken({
        audience: clientId,
        idToken: tokens.id_token,
      })

      const userInfo = verify.getPayload()
      if (!userInfo) return { user: null }

      if (!userInfo.email_verified) return { user: null }

      const sub = userInfo.sub
      const email = userInfo.email?.toLowerCase()
      if (!sub || !email) return { user: null }

      const user = (
        await payload.find({
          collection: 'users',
          limit: 1,
          pagination: false,
          showHiddenFields: true,
          where: {
            email: {
              equals: email,
            },
          },
        })
      ).docs[0] as SessionUser

      if (!user) return { user: null }

      const existingStrategies = user.externalId?.authStrategies ?? []
      const existing = existingStrategies.find((s) => s.authProvider === provider)

      if (existing?.providerUserId && existing.providerUserId !== sub) return { user: null }

      const collection = payload.collections['users']
      const authConfig = collection.config.auth

      let sid: string | undefined
      const now = new Date()
      const tokenExpInMs = (authConfig.tokenExpiration || 7200) * 1000
      const expiresAt = new Date(now.getTime() + tokenExpInMs)

      if (authConfig.useSessions) {
        sid = crypto.randomUUID()
        const session = {
          createdAt: now.toISOString(),
          expiresAt: expiresAt.toISOString(),
          id: sid,
        }
        user.sessions = Array.isArray(user.sessions)
          ? [...removeExpiredSessions(user.sessions), session]
          : [session]
      }

      const googleUpdate = {
        accessToken: tokens.access_token,
        authProvider: provider,
        idToken: tokens.id_token,
        providerUserId: sub,
        refreshToken: tokens.refresh_token,
        tokenExpiry: tokens.expiry_date ? new Date(tokens.expiry_date).toISOString() : undefined,
        tokenIssuedAt: now.toISOString(),
        tokenType: tokens.token_type ?? 'Bearer',
      }

      const googleAuth = mergeAuth(existing, googleUpdate)
      const authStrategies = [
        ...existingStrategies.filter((s) => s?.authProvider !== provider),
        googleAuth,
      ]

      await payload.db.updateOne({
        collection: 'users',
        data: {
          externalId: {
            ...(user.externalId || {}).authStrategies,
          },
          sessions: user.sessions,
        },
        id: user.id,
        returning: false,
      })

      const sessionUser: SessionUser = {
        ...user,
        _sid: sid,
        _strategy: provider,
        collection: 'users',
      }

      return { user: sessionUser }
    } catch (error) {
      console.error('Google authentication error:', error)
      return { user: null }
    }
  },
  name: 'google',
}

export const removeExpiredSessions = (
  sessions: {
    createdAt?: null | string
    expiresAt: string
    id: string
  }[],
) => {
  const now = new Date()
  return sessions.filter(({expiresAt}) => new Date(expiresAt) > now)
}