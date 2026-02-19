import crypto from 'crypto';

export enum CodeChallengeMethod {
  Plain = 'plain',
  S256 = 'S256'
}

export function generateCodeChallenge(codeVerifier: string) {
  const hash = crypto.createHash('sha256').update(codeVerifier).digest()
  return base64URLEncode(hash)
}

export function generateCodeVerifier() {
  return base64URLEncode(crypto.randomBytes(32))
}

function base64URLEncode(buffer: Buffer) {
  return buffer.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
}