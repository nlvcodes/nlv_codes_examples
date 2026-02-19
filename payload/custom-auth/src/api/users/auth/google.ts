import crypto from 'crypto'
import { google } from 'googleapis'
import type { Endpoint, PayloadRequest } from 'payload'
import { generateCodeChallenge, generateCodeVerifier, CodeChallengeMethod } from '@/lib/auth/pke'
import { getServerSideURL } from '@/utils/getUrl'
import { appendCookie } from '@/lib/auth/cookies'

const clientId = process.env.GOOGLE_BUSINESS_CLIENT_ID!
const clientSecret = process.env.GOOGLE_BUSINESS_CLIENT_SECRET!

export const googleAuth: Endpoint = {
  handler: async (req: PayloadRequest): Promise<Response> => {
    const url = new URL(req.url ?? '')
    const consentFlag = url.searchParams.get('force_consent') === 'true'

    const clientFlag = url.searchParams.get('client_login') === 'true'

    const oauth2Client = new google.auth.OAuth2({
      clientId,
      clientSecret,
      redirectUri: `${getServerSideURL()}/api/users/auth/google/callback`,
    })

    try {
      const codeVerifier = generateCodeVerifier()
      const codeChallenge = generateCodeChallenge(codeVerifier)
      const state = crypto.randomUUID()

      const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        code_challenge: codeChallenge,
        code_challenge_method: CodeChallengeMethod.S256,
        prompt: consentFlag ? 'consent' : 'none',
        scope: [
          'https://www.googleapis.com/auth/userinfo.email',
          'https://www.googleapis.com/auth/userinfo.profile',
        ],
        state,
      })

      const headers = new Headers()
      appendCookie(headers, 'codeVerifier', codeVerifier)
      appendCookie(headers, 'oauthState', state)
      appendCookie(headers, 'clientFlag', clientFlag ? 'true' : '')

      headers.set('Location', authUrl.toString())
      return new Response(null, {
        headers,
        status: 302,
      })
    } catch {
      const headers = new Headers()
      headers.set(
        'Location',
        `${getServerSideURL()}/${clientFlag ? 'client' : 'admin/login'}?error=oauth_failed`,
      )

      return new Response(null, {
        headers,
        status: 302,
      })
    }
  },
  method: 'get',
  path: '/auth/google',
}
