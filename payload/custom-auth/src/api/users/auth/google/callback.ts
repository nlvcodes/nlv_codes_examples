import crypto from 'crypto'
import {
  type Endpoint,
  type PayloadRequest,
  type SanitizedPermissions,
  type TypedUser,
  generatePayloadCookie,
  jwtSign,
  parseCookies,
} from 'payload'

import { clearCookie } from '@/lib/auth/cookies'
import { getServerSideURL } from '@/utils/getUrl'

interface AuthResult {
  permissions: SanitizedPermissions
  responseHeaders?: Headers
  user: null | (TypedUser & { _sid?: string; _strategy?: string; collection: 'users' })
}

export const googleCallback: Endpoint = {
  handler: async (req: PayloadRequest): Promise<Response> => {
    const url = new URL(req.url ?? getServerSideURL())
    const code = url.searchParams.get('code')
    const error = url.searchParams.get('error')
    const state = url.searchParams.get('state')
    const cookie = parseCookies(req.headers)
    const codeVerifier = cookie.get('codeVerifier')
    const oauthState = cookie.get('oauthState')
    const clientFlag = cookie.get('clientFlag') === 'true'

    const headers = new Headers()
    clearCookie(headers, 'codeVerifier')
    clearCookie(headers, 'oauthState')
    clearCookie(headers, 'clientFlag')

    if (
      error === 'interaction_required' ||
      error === 'login_required' ||
      error === 'consent_required'
    ) {
      headers.set(
        'Location',
        `${getServerSideURL()}/api/users/auth/google?force_consent=true${clientFlag ? '&client_login=true' : ''}`,
      )
      return new Response(null, { headers, status: 302 })
    }

    const errorRedirect = (reason: string) => {
      headers.set(
        'Location',
        `${getServerSideURL()}/${clientFlag ? 'client' : 'admin/login'}?error=${reason}`,
      )
      return new Response(null, { headers, status: 302 })
    }

    if (!state || !oauthState || state !== oauthState) {
      console.error('Invalid OAuth state', { oauthState, state })
      return errorRedirect('invalid_state')
    }

    if (!code || !codeVerifier) {
      console.error('Missing OAuth parameters', { code, codeVerifier })
      return errorRedirect('missing_parameters')
    }

    try {
      const payload = req.payload
      const authResult = await payload.auth({
        headers: new Headers({
          'x-auth-strategy': 'google',
          'x-oauth-code': code,
          'x-oauth-code-verifier': codeVerifier,
        }),
      })

      const { user } = authResult as AuthResult
      if (!user) {
        console.error('Authentication failed: no user returned')
        return errorRedirect('authentication_failed')
      }
      const collection = payload.collections['users']
      const authConfig = collection.config.auth
      const secret = crypto
        .createHash('sha256')
        .update(payload.config.secret)
        .digest('hex')
        .slice(0, 32)

      const { token } = await jwtSign({
        fieldsToSign: {
          _strategy: user._strategy ?? undefined,
          collection: 'users',
          email: user.email,
          id: user.id,
          sid: user._sid ?? undefined,
        },
        secret,
        tokenExpiration: authConfig.tokenExpiration,
      })

      const cookies = generatePayloadCookie({
        collectionAuthConfig: authConfig,
        cookiePrefix: payload.config.cookiePrefix,
        token: token!,
      })

      headers.set('Location', `${getServerSideURL()}/${clientFlag ? 'client' : 'admin'}`)
      headers.append('Set-Cookie', cookies)
      return new Response(null, {
        headers,
        status: 302,
      })
    } catch {
      return errorRedirect('oauth_failed')
    }
  },
  method: 'get',
  path: '/auth/google/callback',
}
