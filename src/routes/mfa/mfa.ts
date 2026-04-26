import { PUBLIC_AUTH_URL } from '$env/static/public'

export enum Strategy {
  PHONE = 'PHONE',
  EMAIL = 'EMAIL',
  GA = 'GOOGLE_AUTHENTICATOR'
}

export async function listMfa(userId: string, token: string): Promise<Strategy[]> {
  const config: RequestInit = {
    method: 'GET',
    mode: 'cors',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const url = `${PUBLIC_AUTH_URL}/mfa/${userId}`
  const resp = await fetch(url, config)
  if (resp.status !== 200) {
    throw new Error("MFA listing didn't work")
  }
  const resJson = await resp.json()
  if (!(resJson.resp instanceof Array)) {
    throw new Error('Refresh payload is not a credential')
  }
  return resJson.resp as Strategy[]
}

export async function createMfa(
  userId: string,
  strategy: Strategy,
  token: string,
  code: string,
  secret: string | null
): Promise<{ mfaId: string }> {
  const config: RequestInit = {
    method: 'POST',
    mode: 'cors',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userId, strategy, code, secret })
  }
  const url = `${PUBLIC_AUTH_URL}/mfa`
  const resp = await fetch(url, config)
  if (resp.status !== 200) {
    throw new Error("MFA creation didn't work")
  }
  return resp.json()
}

export async function verifyMfa(
  userId: string,
  strategy: Strategy,
  token: string
): Promise<{ mfaId: string }> {
  const config: RequestInit = {
    method: 'POST',
    mode: 'cors',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userId, strategy })
  }
  const url = `${PUBLIC_AUTH_URL}/mfa/verify`
  const resp = await fetch(url, config)
  if (resp.status !== 200) {
    throw new Error("MFA creation didn't work")
  }
  return resp.json()
}
