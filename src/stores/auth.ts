import { writable } from 'svelte/store'
import type { Strategy } from '../routes/mfa/mfa'
import { PUBLIC_AUTH_URL } from '$env/static/public'

export interface User {
  email: string
  id: string
  info: {
    phone: string
    deviceId: string
    googleAuth: string
  }
  name: string
  token: string
}

function isUser(obj: unknown): obj is User {
  return (obj as User).token !== undefined
}
export interface MFAChoose {
  hash: string
  strategyList: Strategy[]
}

function isMFAChoose(obj: unknown): obj is MFAChoose {
  return (obj as MFAChoose).hash !== undefined
}

function createCredentialStore() {
  const user = writable<User | null>(null)

  async function login(email: string, password: string): Promise<MFAChoose | null> {
    const config: RequestInit = {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    }
    const url = `${PUBLIC_AUTH_URL}/login`

    const resp = await fetch(url, config)
    if (resp.status !== 200) {
      throw new Error("Login didn't work")
    }
    const resJson = await resp.json()
    if (!isUser(resJson) && !isMFAChoose(resJson)) {
      throw new Error('Login payload is not a credential')
    }
    if (isUser(resJson)) {
      user.set(resJson)
      return null
    }
    return resJson
  }

  async function chooseStrategy(hash: string, strategy: Strategy): Promise<string> {
    const config: RequestInit = {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ hash, strategy })
    }
    const url = `${PUBLIC_AUTH_URL}/mfa/choose`
    const resp = await fetch(url, config)
    if (resp.status !== 200) {
      throw new Error("Choose strategy didn't work")
    }
    const resJson = await resp.json()
    return resJson.hash
  }

  async function loginCode(hash: string, code: string): Promise<void> {
    const config: RequestInit = {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ hash, code })
    }
    const url = `${PUBLIC_AUTH_URL}/mfa/code`
    const resp = await fetch(url, config)
    if (resp.status !== 200) {
      throw new Error("Choose strategy didn't work")
    }
    const resJson = await resp.json()
    if (!isUser(resJson)) {
      throw new Error('LoginCode payload is not a credential')
    }
    user.set(resJson)
  }

  async function logout(token: string) {
    const config: RequestInit = {
      method: 'POST',
      mode: 'cors',
      headers: { Authorization: `Bearer ${token}` }
    }
    const url = `${PUBLIC_AUTH_URL}/logout`
    const resp = await fetch(url, config)
    if (resp.status !== 200) {
      throw new Error("Logout didn't work")
    }
    user.set(null)
  }

  async function refresh(token: string): Promise<string> {
    const config: RequestInit = {
      method: 'GET',
      mode: 'cors',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const url = `${PUBLIC_AUTH_URL}/login/refresh/${token}`
    const resp = await fetch(url, config)
    if (resp.status !== 200) {
      throw new Error("Refresh didn't work")
    }
    const resJson = await resp.json()
    if (!isUser(resJson)) {
      throw new Error('Refresh payload is not a credential')
    }
    user.set(resJson)
    return resJson.token
  }

  return {
    subscribe: user.subscribe,
    login,
    logout,
    refresh,
    chooseStrategy,
    loginCode
  }
}

export const credential = createCredentialStore()
