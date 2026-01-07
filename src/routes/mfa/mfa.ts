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
	const url = `${process.env.AUTH_URL}/mfa/${userId}`
	const resp = await fetch(url, config)
	if (resp.status !== 200) {
		throw new Error("Refresh didn't work")
	}
	const resJson = await resp.json()
	if (!(resJson.resp instanceof Array)) {
		throw new Error('Refresh payload is not a credential')
	}
	console.log(resJson)
	return resJson.resp as Strategy[]
}

export async function createMfa(
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
	const url = `${process.env.AUTH_URL}/mfa`
	const resp = await fetch(url, config)
	if (resp.status !== 200) {
		throw new Error("Refresh didn't work")
	}
	return resp.json()
}
